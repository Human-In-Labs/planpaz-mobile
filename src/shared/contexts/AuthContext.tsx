import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getToken } from '../services/storage';
import { logout as logoutRequest } from '../api/auth';
import { getMinhasConfiguracoes, UserSettings } from '../api/user';

interface AuthContextValue {
    user: UserSettings | null;
    isLoadingUser: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<UserSettings | null>;
    setUser: (user: UserSettings | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserSettings | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    const refreshUser = useCallback(async () => {
        const token = await getToken();

        if (!token) {
            setUser(null);
            return null;
        }

        try {
            setIsLoadingUser(true);
            const settings = await getMinhasConfiguracoes();
            setUser(settings);
            return settings;
        } catch (error) {
            console.log('[AuthContext] Erro ao carregar usuário:', error);
            return null;
        } finally {
            setIsLoadingUser(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await logoutRequest();
        setUser(null);
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingUser,
                isAuthenticated: !!user,
                refreshUser,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}
