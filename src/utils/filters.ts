import type { Job } from '@/types';

export function extractUniqueValues(jobs: Job[], key: keyof Job): string[] {
    const values = jobs
        .map(job => job[key])
        .filter((value): value is string =>
            value !== undefined &&
            value !== null &&
            value !== ''
        );

    return Array.from(new Set(values)).sort();
}