import type { Job, JobWithInteraction } from '@/types';

export interface JobContextType {
    jobs: JobWithInteraction[];
    isLoading: boolean;
    error: string | null;
    filterOptions: {
        domains: string[];
        daysAgo: string[];
        locations: string[];
    };
    handleLike: (job: JobWithInteraction) => void;
    handleDislike: (job: JobWithInteraction) => void;
}