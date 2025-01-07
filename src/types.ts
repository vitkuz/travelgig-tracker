export type Job = {

    timeAgoText?: string;
    viewMoreUrl: string;
    salary?: string;
    type?: string;
    industry?: string;
    shortDescription?: string;
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

export interface JobWithInteraction extends Job {
    liked?: boolean;
    disliked?: boolean;
}