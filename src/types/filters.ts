export interface SearchFilters {
    timeFilter: string | null;
    domainFilter: string | null;
    showLiked: boolean;
    searchQuery: string;
}

export interface SavedFilter extends SearchFilters {
    id: string;
    name: string;
    createdAt: number;
    hasNotification: boolean;
}

export interface FilterContextType {
    savedFilters: SavedFilter[];
    currentFilters: SearchFilters;
    saveCurrentFilters: (name: string) => void;
    deleteSavedFilter: (id: string) => void;
    applySavedFilter: (filter: SavedFilter) => void;
    updateCurrentFilters: (updates: Partial<SearchFilters>) => void;
    toggleFilterNotification: (id: string) => void;
    canAddMore: boolean;
}