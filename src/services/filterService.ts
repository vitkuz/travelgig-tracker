import { SavedFilter } from '@/types/filters';
import * as localStorage from './storage/local';
import * as remoteStorage from './storage/remote';

export async function getFilters(userId: string | null): Promise<SavedFilter[]> {
    if (!userId) {
        return localStorage.getLocalFilters();
    }
    return remoteStorage.getRemoteFilters(userId);
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
    await remoteStorage.deleteRemoteFilter(filterId);
}

export async function updateFilter(userId: string | null, filter: SavedFilter): Promise<void> {
    if (!userId) {
        localStorage.updateLocalFilter(filter);
        return;
    }
    await remoteStorage.updateRemoteFilter(filter);
}