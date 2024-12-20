import { SavedFilter } from '@/types/filters';
import { apiClient } from '../api/client';

const FILTER_ENDPOINTS = {
    list: (userId: string) => `/filters/${userId}`,
    save: '/filters',
    delete: (filterId: string) => `/filters/${filterId}`,
    update: (filterId: string) => `/filters/${filterId}`,
};

export async function getRemoteFilters(userId: string): Promise<SavedFilter[]> {
    try {
        // Mock API call to DynamoDB
        // const response = await apiClient.get(FILTER_ENDPOINTS.list(userId));
        // return response.data;
        return [];
    } catch (error) {
        console.error('Failed to fetch remote filters:', error);
        return [];
    }
}

export async function saveRemoteFilter(userId: string, filter: SavedFilter): Promise<void> {
    try {
        // Mock API call to DynamoDB
        // await apiClient.post(FILTER_ENDPOINTS.save, { userId, filter });
    } catch (error) {
        console.error('Failed to save remote filter:', error);
        throw error;
    }
}

export async function deleteRemoteFilter(filterId: string): Promise<void> {
    try {
        // Mock API call to DynamoDB
        // await apiClient.delete(FILTER_ENDPOINTS.delete(filterId));
    } catch (error) {
        console.error('Failed to delete remote filter:', error);
        throw error;
    }
}

export async function updateRemoteFilter(filter: SavedFilter): Promise<void> {
    try {
        // Mock API call to DynamoDB
        // await apiClient.put(FILTER_ENDPOINTS.update(filter.id), filter);
    } catch (error) {
        console.error('Failed to update remote filter:', error);
        throw error;
    }
}