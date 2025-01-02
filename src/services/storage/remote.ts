import { SavedFilter } from '@/types/filters';
import { apiClient } from '../api/client';
import { FILTER_ENDPOINTS } from '../api/endpoints';

export async function getRemoteFilters(userId: string): Promise<SavedFilter[]> {
    try {
        const response = await apiClient.get(FILTER_ENDPOINTS.list(userId));
        return response.data?.filters || [];
    } catch (error) {
        console.error('Failed to load remote filters:', error);
        throw error;
    }
}

export async function saveRemoteFilter(userId: string, filter: SavedFilter): Promise<void> {
    try {
        await apiClient.post(FILTER_ENDPOINTS.create(userId), {
            userId,
            ...filter
        });
    } catch (error) {
        console.error('Failed to save remote filter:', error);
        throw error;
    }
}

export async function deleteRemoteFilter(userId: string, filterId: string): Promise<void> {
    try {
        await apiClient.delete(FILTER_ENDPOINTS.delete(userId, filterId));
    } catch (error) {
        console.error('Failed to delete remote filter:', error);
        throw error;
    }
}

export async function updateRemoteFilter(userId: string, filterId: string, updates: Partial<SavedFilter>): Promise<void> {
    try {
        await apiClient.put(FILTER_ENDPOINTS.update(userId, filterId), {
            userId,
            ...updates
        });
    } catch (error) {
        console.error('Failed to update remote filter:', error);
        throw error;
    }
}