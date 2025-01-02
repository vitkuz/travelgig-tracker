import { apiClient } from './api/client';
import { AUTH_ENDPOINTS } from './api/endpoints';
import type { UserProfile } from '@/types/auth';

export async function validateAuth(
    userId: string,
    secret: string
): Promise<[boolean, UserProfile | null]> {
    try {
        const authResponse = await apiClient.get(AUTH_ENDPOINTS.validate(userId, secret));

        if (authResponse.status !== 200) {
            return [false, null];
        }

        const profile: UserProfile = authResponse.data;
        return [true, profile];
    } catch (error) {
        console.error('Auth validation error:', error);
        return [false, null];
    }
}