import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Job, JobWithInteraction } from '@/types';
import {getRelativeDateForFilters} from '@/utils/date';

interface JobInteraction {
    liked?: boolean;
    disliked?: boolean;
}

export function useJobInteractions(jobs: Job[]) {
    const [jobInteractions, setJobInteractions] = useLocalStorage<Record<string, JobInteraction>>('jobInteractions', {});

    const jobsWithInteractions: JobWithInteraction[] = jobs.map(job => ({
        ...job,
        scrapedDaysAgo: getRelativeDateForFilters(job.scrapedDateTimestamp),
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

    return {
        jobsWithInteractions,
        handleLike,
        handleDislike
    };
}