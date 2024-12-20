import type { Job } from '@/types';

const STATIC_JSON_URL = 'https://travelgig-scrapers-stack-travelgigscrapersbucket4d-d3xp9qd9n3lf.s3.us-east-1.amazonaws.com/jobs.json';

export async function fetchJobs(): Promise<Job[]> {
    try {
        const response = await fetch(STATIC_JSON_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}