import React, { createContext, useContext, ReactNode } from 'react';
import { useJobInteractions } from '@/hooks/useJobInteractions';
import { useJobData } from '@/hooks/useJobsData';
import type { JobContextType } from '@/types/jobs';

const JobContext = createContext<JobContextType | null>(null);

export function JobProvider({ children }: { children: ReactNode }) {
    const { jobs: fetchedJobs, isLoading, error, filterOptions } = useJobData();
    const { jobsWithInteractions, handleLike, handleDislike } = useJobInteractions(fetchedJobs);

    return (
        <JobContext.Provider value={{
            jobs: jobsWithInteractions,
            isLoading,
            error,
            filterOptions,
            handleLike,
            handleDislike
        }}>
            {children}
        </JobContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
}