import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type {SavedFilter, SearchFilters} from "@/types";
// import type { SearchFilters, SavedFilter } from '../types/filters';

export function useSearchFilters() {
    const [savedFilters, setSavedFilters] = useLocalStorage<SavedFilter[]>('savedFilters', []);
    const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
        timeFilter: null,
        domainFilter: null,
        showLiked: false,
        searchQuery: '',
    });

    const saveCurrentFilters = useCallback((name: string) => {
        const newFilter: SavedFilter = {
            ...currentFilters,
            id: crypto.randomUUID(),
            name,
            createdAt: Date.now(),
        };
        setSavedFilters(prev => [...prev, newFilter]);
    }, [currentFilters, setSavedFilters]);

    const deleteSavedFilter = useCallback((id: string) => {
        setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    }, [setSavedFilters]);

    const applySavedFilter = useCallback((filter: SavedFilter) => {
        setCurrentFilters({
            timeFilter: filter.timeFilter,
            domainFilter: filter.domainFilter,
            showLiked: filter.showLiked,
            searchQuery: filter.searchQuery,
        });
    }, []);

    const updateCurrentFilters = useCallback((updates: Partial<SearchFilters>) => {
        setCurrentFilters((prev: any) => ({ ...prev, ...updates }));
    }, []);

    return {
        savedFilters,
        currentFilters,
        saveCurrentFilters,
        deleteSavedFilter,
        applySavedFilter,
        updateCurrentFilters,
    };
}