'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { parseAuthParams } from '@/utils/auth';

export function useAuthRedirect() {
    const { login, user, error } = useAuth();

    useEffect(() => {
        const handleAuth = async () => {
            const { userId, secret } = parseAuthParams();

            if (userId && secret && !user) {
                await login(userId, secret);
            }
        };

        handleAuth();
    }, [login, user]);

    return {
        isAuthenticated: Boolean(user),
        error
    };
}