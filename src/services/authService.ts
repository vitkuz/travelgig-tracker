import { apiClient } from './api/client';
import { AUTH_ENDPOINTS } from './api/endpoints';
import type { AuthUser } from '@/types/auth';

export async function validateAuth(userId: string, secret: string): Promise<boolean> {
    try {
        const response = await apiClient.get(AUTH_ENDPOINTS.validate(userId, secret));
        return response.status === 200;
    } catch (error) {
        console.error('Auth validation error:', error);
        return false;
    }
}