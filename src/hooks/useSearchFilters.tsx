import { useState, useCallback, useEffect } from 'react';
import type { SavedFilter, SearchFilters } from '@/types/filters';
import * as filterService from '@/services/filterService';
import { useAuth } from '@/context/AuthContext';

const MAX_FILTERS = 3;

export function useSearchFilters() {
    const { user } = useAuth();
    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
    const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
        timeFilter: null,
        domainFilter: null,
        showLiked: false,
        searchQuery: '',
    });

    useEffect(() => {
        const loadFilters = async () => {
            const filters = await filterService.getFilters(user?.userId ?? null);
            setSavedFilters(filters);
        };
        loadFilters();
    }, [user?.userId]);

    const saveCurrentFilters = useCallback(async (name: string) => {
        if (savedFilters.length >= MAX_FILTERS) {
            throw new Error(`You can only save up to ${MAX_FILTERS} filters`);
        }

        const newFilter: SavedFilter = {
            ...currentFilters,
            id: crypto.randomUUID(),
            name,
            createdAt: Date.now(),
            hasNotification: false,
        };

        await filterService.saveFilter(user?.userId ?? null, newFilter);
        setSavedFilters(prev => [...prev, newFilter]);
    }, [currentFilters, savedFilters.length, user?.userId]);

    const deleteSavedFilter = useCallback(async (id: string) => {
        await filterService.deleteFilter(user?.userId ?? null, id);
        setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    }, [user?.userId]);

    const applySavedFilter = useCallback((filter: SavedFilter) => {
        setCurrentFilters({
            timeFilter: filter.timeFilter,
            domainFilter: filter.domainFilter,
            showLiked: filter.showLiked,
            searchQuery: filter.searchQuery,
        });
    }, []);

    const updateCurrentFilters = useCallback((updates: Partial<SearchFilters>) => {
        setCurrentFilters(prev => ({ ...prev, ...updates }));
    }, []);

    const toggleFilterNotification = useCallback(async (id: string) => {
        const filter = savedFilters.find(f => f.id === id);
        if (!filter) return;

        const updatedFilter = {
            ...filter,
            hasNotification: !filter.hasNotification,
        };

        await filterService.updateFilter(user?.userId ?? null, updatedFilter);
        setSavedFilters(prev => prev.map(f =>
            f.id === id ? updatedFilter : f
        ));
    }, [savedFilters, user?.userId]);

    return {
        savedFilters,
        currentFilters,
        saveCurrentFilters,
        deleteSavedFilter,
        applySavedFilter,
        updateCurrentFilters,
        toggleFilterNotification,
        canAddMore: savedFilters.length < MAX_FILTERS,
    };
}