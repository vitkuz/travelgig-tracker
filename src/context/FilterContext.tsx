'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import type { FilterContextType } from '@/types/filters';

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
    const filterState = useSearchFilters();

    return (
        <FilterContext.Provider value={filterState}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}