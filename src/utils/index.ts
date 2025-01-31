import {JobWithInteraction} from "@/types";
import {SearchFilters} from "@/types/filters";
import {getDomain} from "@/utils/getDomain";

export function shouldShowJob(
    jobs: JobWithInteraction[],
    filters: SearchFilters
): Record<string, boolean> {
    const normalizedQuery = filters.searchQuery.toLowerCase().trim();

    return jobs.reduce((acc, job) => {
        const matchesSearch = !normalizedQuery || [
            job.title,
            job.shortDescription
        ].some(field =>
            field?.toLowerCase().includes(normalizedQuery)
        );

        acc[job.viewMoreUrl] = <boolean>(
            matchesSearch &&
            (!filters.timeFilter || job.scrapedDaysAgo === filters.timeFilter) &&
            (!filters.domainFilter || job.domain === filters.domainFilter) &&
            (!filters.locationFilter || job.location === filters.locationFilter) &&
            (!filters.industryFilter || job.industry === filters.industryFilter) &&
            (!filters.showLiked || job.liked)
        );
        return acc;
    }, {} as Record<string, boolean>);
}

export function extractDomains(jobs: JobWithInteraction[]): string[] {
    const uniqueDomains = new Set(
        jobs.map(job => new URL(job.viewMoreUrl).hostname)
    );
    return Array.from(uniqueDomains);
}

export function extractDaysAgo(jobs: JobWithInteraction[]): string[] {
    const uniqueScrapedDaysAgo = new Set(
        jobs.map(job => job.scrapedDaysAgo)
    );
    return Array.from(uniqueScrapedDaysAgo);
}