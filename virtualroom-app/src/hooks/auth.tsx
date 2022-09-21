import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
} from 'react';
import { Alert } from 'react-native';

import { api } from '../services/api';

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
    isLogging: boolean;
    isAuthenticated: boolean;
};

interface AuthProviderProps {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [isLogging, setIsLogging] = useState(false);

    const isAuthenticated = !!data;

    async function signIn({ ra, senha }: SignInCredentials) {
        try {
            setIsLogging(true);

            const response = await api.post('/login', {
                ra,
                senha,
            });

            const { ra_user, email_user, cpf_cnpj_user, roles, token, refresh_token, avatar, name_user } = response.data;

            setData({
                ra_user,
                email_user,
                cpf_cnpj_user,
                roles,
                avatar,
                name_user
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setIsLogging(false);
        } catch (error: any) {
            console.log(error);

            setIsLogging(false);

            return Alert.alert(
                'Falha ao fazer o login',
                `${error.response?.data?.message ?? error.message}`,
            )
        }
    }

    async function signOut() {
        try {
            setData({} as User);
        } catch (error: any) {
            console.log(error);

            return Alert.alert(
                'Erro na atualização',
                'Não foi possível atualizar os dados do usuário!'
            )
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                isLogging,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };