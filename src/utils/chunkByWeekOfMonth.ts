import {Job} from "@/types";
import {getDomain} from "@/utils/getDomain";
import {getRelativeDateForFilters} from "@/utils/date";

export const chunkByDaysSinceToday = (data: Job[]): Job[][] => {
    const groupedByDays = data.reduce((acc, job) => {
        const scrapedDaysAgo = getRelativeDateForFilters(job.scrapedDateTimestamp as number);
        job.scrapedDaysAgo = scrapedDaysAgo;
        job.domain = getDomain(job.viewMoreUrl as string);

        if (!acc[scrapedDaysAgo]) acc[scrapedDaysAgo] = [];
        acc[scrapedDaysAgo].push(job);

        return acc;
    }, {} as Record<string, Job[]>);

    return Object.keys(groupedByDays).map(key => groupedByDays[key]);
};

export const getFilters = (jobs: any)  => {
    const uniqueDomains = new Set(
        jobs.map((job: any) => {
            const hostname = new URL(job.viewMoreUrl).hostname;
            return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
        })
    );

    const scrapedDaysAgo = new Set(
        jobs.map((job: any) => getRelativeDateForFilters(job.scrapedDateTimestamp))
    );

    // const postedDaysAgo = new Set(
    //     jobs.map((job: any) => getDaysAgo(job.postDateTimestamp))
    // );

    const locations = new Set(
        jobs.map((job: any) => job.location)
    );

    return {
        domains: Array.from(uniqueDomains),
        scrapedDaysAgo: Array.from(scrapedDaysAgo),
        // postedDaysAgo: Array.from(postedDaysAgo),
        locations: Array.from(locations)
    };
};


export const getDaysAgo = (timestamp: number): string => {
    const now = Date.now();
    const msInADay = 24 * 60 * 60 * 1000;

    if (timestamp > now) {
        // throw new Error("Timestamp cannot be in the future");
    }

    const elapsedDays = Math.floor((now - timestamp) / msInADay);

    return `${elapsedDays} day${elapsedDays !== 1 ? "s" : ""} ago`;
};
