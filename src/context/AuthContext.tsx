'use client';

import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import { AuthContextType, AuthUser } from '@/types/auth';
import { validateAuth } from '@/services/authService';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {parseAuthParams} from "@/utils/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useLocalStorage<AuthUser | null>('auth_user', null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (userId: string, secret: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const isValid = await validateAuth(userId, secret);

            if (isValid) {
                setUser({
                    userId,
                    secret,
                    isAuthenticated: true
                });
            } else {
                setError('Authentication failed');
                setUser(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [setUser]);

    const logout = useCallback(() => {
        setUser(null);
        setError(null);
    }, [setUser]);

    useEffect(() => {
        const handleAuth = async () => {
            const { userId, secret } = parseAuthParams();

            if (userId && secret && !user) {
                await login(userId, secret);
            }
        };

        handleAuth();
    }, [login, user]);


    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}