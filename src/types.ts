export type Job = {

    timeAgoText?: string;
    viewMoreUrl: string;
    salary?: string;
    type?: string;
    location?: string;
    scrapedDateTimestamp: number;
    postDateTimestamp?: number;
    company?: string;
    ttl?: number;
    details?: string[];
    description?: string;
    title?: string;
    //
    scrapedDaysAgo: string;
    daysAgo: string;
    domain: string;
};


export interface SearchFilters {
    timeFilter: string | null;
    domainFilter: string | null;
    showLiked: boolean;
    searchQuery: string;
}

export interface SavedFilter extends SearchFilters {
    id: string;
    name: string;
    createdAt: number;
}

export interface JobWithInteraction extends Job {
    liked?: boolean;
    disliked?: boolean;
}