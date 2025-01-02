import { SavedFilter } from '@/types/filters';

export function getLocalFilters(): SavedFilter[] {
    const filters = localStorage.getItem('savedFilters');
    return filters ? JSON.parse(filters) : [];
}

export function saveLocalFilter(filter: SavedFilter): void {
    const filters = getLocalFilters();
    filters.push(filter);
    localStorage.setItem('savedFilters', JSON.stringify(filters));
}

export function deleteLocalFilter(filterId: string): void {
    const filters = getLocalFilters();
    const updatedFilters = filters.filter(f => f.id !== filterId);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
}

export function updateLocalFilter(updatedFilter: SavedFilter): void {
    const filters = getLocalFilters();
    const updatedFilters = filters.map(filter =>
        filter.id === updatedFilter.id ? updatedFilter : filter
    );
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
}