import { useState, useEffect, useMemo } from 'react';
import { fetchJobs } from '@/services/jobService';
import { extractUniqueValues } from '@/utils/filters';
import type { Job } from '@/types';
import {getDomain} from "@/utils/getDomain";
import {getRelativeDateForFilters} from "@/utils/dateFilters";
// import {getRelativeDateForFilters} from "@/utils/date";

export function useJobData(language: 'ru' | 'en' = 'en') {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadJobs() {
            try {
                setIsLoading(true);
                const fetchedJobs = await fetchJobs();
                const jobsWithFields = fetchedJobs.map(job => {
                    const domain = getDomain(job.viewMoreUrl);
                    const scrapedDaysAgo = getRelativeDateForFilters(job.scrapedDateTimestamp, language);
                    return {
                        ...job,
                        domain,
                        scrapedDaysAgo,
                        // @ts-expect-error //todo: fix types later
                        location: typeof job.location === 'object' && job.location !== null ? `${job.location.town}, ${job.location.country}` : job.location
                    }
                }).sort((a, b) => b.scrapedDateTimestamp - a.scrapedDateTimestamp);
                // todo: add virtual filed here
                setJobs(jobsWithFields);
                setError(null);
            } catch (err) {
                setError('Failed to load jobs. Please try again later.');
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        }

        loadJobs();
    }, [language]);

    // todo:!

    const domains = useMemo(() => extractUniqueValues(jobs, 'domain'), [jobs]);
    const daysAgo = useMemo(() => extractUniqueValues(jobs, 'scrapedDaysAgo'), [jobs]);
    const locations = useMemo(() => extractUniqueValues(jobs, 'location'), [jobs]);
    const industries = useMemo(() => extractUniqueValues(jobs, 'industry'), [jobs]);

    return {
        jobs,
        isLoading,
        error,
        filterOptions: {
            domains,
            daysAgo,
            locations,
            industries
        }
    };
}