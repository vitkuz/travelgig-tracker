import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { JobWithInteraction } from '@/types';
import {useJobData} from "@/hooks/useJobsData";

interface JobContextType {
    jobs: JobWithInteraction[];
    isLoading: boolean;
    error: string | null;
    handleLike: (job: JobWithInteraction) => void;
    handleDislike: (job: JobWithInteraction) => void;
}

const JobContext = createContext<JobContextType | null>(null);

const getRelativeDate = (timestamp: number) => {
    const now = Date.now();
    const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const daysDifference = Math.floor((now - timestamp) / millisecondsInDay);

    if (daysDifference === 0) {
        return 'today';
    } else if (daysDifference === 1) {
        return '1 day ago';
    } else {
        return `${daysDifference} days ago`;
    }
};

export function JobProvider({ children }: { children: ReactNode }) {
    const { jobs: fetchedJobs, isLoading, error } = useJobData();
    const [jobInteractions, setJobInteractions] = useLocalStorage<Record<string, { liked?: boolean; disliked?: boolean }>>('jobInteractions', {});

    const jobs: JobWithInteraction[] = fetchedJobs.map(job => ({
        ...job,
        scrapedDaysAgo: getRelativeDate(job.scrapedDateTimestamp),
        liked: jobInteractions[job.viewMoreUrl]?.liked || false,
        disliked: jobInteractions[job.viewMoreUrl]?.disliked || false,
    }));

    const handleLike = (job: JobWithInteraction) => {
        setJobInteractions(prev => ({
            ...prev,
            [job.viewMoreUrl]: {
                ...prev[job.viewMoreUrl],
                liked: !job.liked,
                disliked: false,
            },
        }));
    };

    const handleDislike = (job: JobWithInteraction) => {
        setJobInteractions(prev => ({
            ...prev,
            [job.viewMoreUrl]: {
                ...prev[job.viewMoreUrl],
                disliked: !job.disliked,
                liked: false,
            },
        }));
    };

    return (
        <JobContext.Provider value={{ jobs, isLoading, error, handleLike, handleDislike }}>
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