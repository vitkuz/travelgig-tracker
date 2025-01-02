import { useState, useCallback, useEffect } from 'react';
import type { SavedFilter, SearchFilters } from '@/types/filters';
import * as filterService from '@/services/filterService';
import { useAuth } from '@/context/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const MAX_FILTERS = 3;

const initialFilters: SearchFilters = {
    timeFilter: null,
    domainFilter: null,
    locationFilter: null,
    showLiked: false,
    searchQuery: '',
};

export function useSearchFilters() {
    const { user } = useAuth();
    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
    const [localFilters, setLocalFilters] = useLocalStorage<SavedFilter[]>('savedFilters', []);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFilters, setCurrentFilters] = useState<SearchFilters>(initialFilters);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                setIsLoading(true);
                const filters = await filterService.loadFilters(user?.userId ?? null);
                setSavedFilters(filters);
            } catch (error) {
                console.error('Error loading filters:', error);
                setSavedFilters(localFilters);
            } finally {
                setIsLoading(false);
            }
        };
        loadFilters();
    }, [user?.userId, localFilters]);

    const resetFilters = useCallback(() => {
        setCurrentFilters(initialFilters);
    }, []);

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

        if (user?.isAuthenticated) {
            await filterService.saveFilter(user.userId, newFilter);
        } else {
            const updatedFilters = [...localFilters, newFilter];
            setLocalFilters(updatedFilters);
        }
        setSavedFilters(prev => [...prev, newFilter]);
    }, [currentFilters, savedFilters.length, user?.isAuthenticated, user?.userId, localFilters, setLocalFilters]);

    const deleteSavedFilter = useCallback(async (id: string) => {
        if (user?.isAuthenticated) {
            await filterService.deleteFilter(user.userId, id);
        } else {
            const updatedFilters = localFilters.filter(filter => filter.id !== id);
            setLocalFilters(updatedFilters);
        }
        setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    }, [user?.isAuthenticated, user?.userId, localFilters, setLocalFilters]);

    const applySavedFilter = useCallback((filter: SavedFilter) => {
        setCurrentFilters({
            timeFilter: filter.timeFilter,
            domainFilter: filter.domainFilter,
            locationFilter: filter.locationFilter,
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

        try {
            if (user?.isAuthenticated) {
                await filterService.updateFilter(user.userId, id, {
                    hasNotification: !filter.hasNotification
                });
            } else {
                const updatedFilters = localFilters.map(f =>
                    f.id === id ? updatedFilter : f
                );
                setLocalFilters(updatedFilters);
            }

            setSavedFilters(prev => prev.map(f =>
                f.id === id ? updatedFilter : f
            ));
        } catch (error) {
            console.error('Failed to toggle notification:', error);
        }
    }, [savedFilters, user?.isAuthenticated, user?.userId, localFilters, setLocalFilters]);

    return {
        savedFilters,
        currentFilters,
        isLoading,
        saveCurrentFilters,
        deleteSavedFilter,
        applySavedFilter,
        updateCurrentFilters,
        resetFilters,
        toggleFilterNotification,
        canAddMore: savedFilters.length < MAX_FILTERS,
    };
}