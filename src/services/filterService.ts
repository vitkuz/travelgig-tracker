import { SavedFilter } from '@/types/filters';
import * as localStorage from './storage/local';
import * as remoteStorage from './storage/remote';

export async function loadFilters(userId: string | null): Promise<SavedFilter[]> {
    try {
        if (!userId) {
            return localStorage.getLocalFilters();
        }
        return await remoteStorage.getRemoteFilters(userId);
    } catch (error) {
        console.error('Error loading filters:', error);
        // Fallback to local storage if API fails
        return localStorage.getLocalFilters();
    }
}

export async function saveFilter(userId: string | null, filter: SavedFilter): Promise<void> {
    if (!userId) {
        localStorage.saveLocalFilter(filter);
        return;
    }
    await remoteStorage.saveRemoteFilter(userId, filter);
}

export async function deleteFilter(userId: string | null, filterId: string): Promise<void> {
    if (!userId) {
        localStorage.deleteLocalFilter(filterId);
        return;
    }
    await remoteStorage.deleteRemoteFilter(userId, filterId);
}

export async function updateFilter(userId: string | null, filterId: string, updates: Partial<SavedFilter>): Promise<void> {
    if (!userId) {
        const filter = { ...localStorage.getLocalFilters().find(f => f.id === filterId), ...updates };
        localStorage.updateLocalFilter(filter as SavedFilter);
        return;
    }
    await remoteStorage.updateRemoteFilter(userId, filterId, updates);
}