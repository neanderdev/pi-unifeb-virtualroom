import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';

import { api } from '../services/apiClient';

interface User {
    ra_user: number;
    email_user: string;
    cpf_cnpj_user: string;
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

export function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    authChannel.postMessage('signOut');

    Router.push('/login');
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
                    signOut();
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
                const { ra_user, email_user, cpf_cnpj_user, roles } = response.data;

                setUser({ ra_user, email_user, cpf_cnpj_user, roles });
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

            const { ra_user, email_user, cpf_cnpj_user, roles, token, refresh_token } = response.data;

            setCookie(
                undefined,
                'nextauth.token',
                token,
                {
                    maxAge: 60 * 60 * 15, // 15 hours
                    path: '/',
                }
            );
            setCookie(
                undefined,
                'nextauth.refreshToken',
                refresh_token,
                {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                }
            );

            setUser({
                ra_user, email_user, cpf_cnpj_user, roles
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