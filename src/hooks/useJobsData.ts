import { useState, useEffect } from 'react';
import { fetchJobs } from '@/services/jobService';
import type { Job } from '@/types';

export function useJobData() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadJobs() {
            try {
                setIsLoading(true);
                const fetchedJobs = await fetchJobs();
                setJobs(fetchedJobs);
                setError(null);
            } catch (err) {
                setError('Failed to load jobs. Please try again later.');
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        }

        loadJobs();
    }, []);

    return { jobs, isLoading, error };
}