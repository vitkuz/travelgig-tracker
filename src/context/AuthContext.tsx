'use client';

import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import type {AuthContextType, AuthUser, UserProfile} from '@/types/auth';
import {parseAuthParams} from "@/utils/auth";
import {validateAuth} from "@/services/authService";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { userId, secret } = parseAuthParams();

    const login = useCallback(async (userId: string, secret: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const [isValid, userProfile] = await validateAuth(userId, secret);

            if (isValid) {
                setUser({
                    userId,
                    secret,
                    isAuthenticated: true,
                    profile: userProfile as UserProfile
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
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    useEffect(() => {
        if (userId && secret) {
            login(userId, secret)
        } else {
            setIsLoading(false);
            setUser(null);
            setError(null);
        }
    }, [login, userId, secret]);

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