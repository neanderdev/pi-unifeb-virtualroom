import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';

import { api } from '../services/apiClient';
import { queryClient } from '../services/queryClient';
import { AuthTokenError } from '../services/errors/AuthTokenError';

interface User {
    ra_user: number;
    email_user: string;
    cpf_cnpj_user: string;
    name_user: string;
    avatar: string;
    roles: string;
};

interface SignInCredentials {
    ra: number;
    senha: string;
};

interface AuthContextData {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    user: User,
    isAuthenticated: boolean;
};

interface AuthProviderProps {
    children: ReactNode,
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
    queryClient.invalidateQueries();

    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    if (broadcast) authChannel.postMessage('signOut');

    if (process.browser) {
        Router.push('/login');
    } else {
        return Promise.reject(new AuthTokenError());
    };
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    const toast = useToast();

    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut(false);
                    // authChannel.close();
                    break;
                case "signIn":
                    window.location.replace("http://localhost:3000/rooms");
                    break;
                default:
                    break;
            }
        };
    }, []);

    useEffect(() => {
        // const { 'nextauth.token': token } = parseCookies();
        const { 'nextauth.refreshToken': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { ra_user, email_user, cpf_cnpj_user, roles, avatar, name_user } = response.data;

                setUser({ ra_user, email_user, cpf_cnpj_user, roles, avatar, name_user });
            }).catch(() => {
                signOut();
            });
        }
    }, []);

    async function signIn({ ra, senha }: SignInCredentials) {
        try {
            const response = await api.post('login', {
                ra, senha
            });

            const { ra_user, email_user, cpf_cnpj_user, roles, token, refresh_token, avatar, name_user } = response.data;

            setCookie(
                undefined,
                'nextauth.token',
                token,
                {
                    maxAge: 60 * 60 * 2, // 2 hours
                    path: '/',
                    sameSite: 'strict',
                }
            );
            setCookie(
                undefined,
                'nextauth.refreshToken',
                refresh_token,
                {
                    maxAge: 60 * 60 * 24 * 1, // 1 days
                    path: '/',
                    sameSite: 'strict',
                }
            );

            setUser({
                ra_user, email_user, cpf_cnpj_user, roles, avatar, name_user
            });

            api.defaults.headers['Authorization'] = `Beared ${token}`;

            await toast({
                title: 'Sucesso ao fazer o login',
                description: `Você será redirecionado para salas de aulas virtuais`,
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top-right",
            });

            Router.push('/rooms');

            authChannel.postMessage('signIn');
        } catch (error) {
            toast({
                title: 'Falha ao fazer o login',
                description: `${error.response?.data?.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: "top-right",
            });

            // console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}