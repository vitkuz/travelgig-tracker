import type { JobWithInteraction } from '@/types';

export interface JobContextType {
    jobs: JobWithInteraction[];
    isLoading: boolean;
    error: string | null;
    filterOptions: {
        domains: string[];
        daysAgo: string[];
        locations: string[];
        industries: string[];
    };
    handleLike: (job: JobWithInteraction) => void;
    handleDislike: (job: JobWithInteraction) => void;
}