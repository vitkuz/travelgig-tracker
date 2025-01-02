const isTimeAgoPattern = (text: string): RegExpMatchArray | null => {
    const timeAgoPattern = /(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i;
    return text.match(timeAgoPattern);
};

const isDatePattern = (text: string): RegExpMatchArray | null => {
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    return text.match(datePattern);
};

const parseTimeAgoMatch = (match: RegExpMatchArray, now: Date): number => {
    const [, value, unit] = match;
    const quantity = parseInt(value, 10);

    const units: Record<string, 'Seconds' | 'Minutes' | 'Hours' | 'Date' | 'Month' | 'FullYear'> = {
        second: 'Seconds',
        minute: 'Minutes',
        hour: 'Hours',
        day: 'Date',
        week: 'Date',
        month: 'Month',
        year: 'FullYear',
    };

    if (unit === 'week') now.setDate(now.getDate() - quantity * 7);
    else if (unit === 'month') now.setMonth(now.getMonth() - quantity);
    else if (unit === 'year') now.setFullYear(now.getFullYear() - quantity);
    else now[`set${units[unit]}`](now[`get${units[unit]}`]() - quantity);

    return now.getTime(); // Return timestamp
};

const calculateElapsedTime = (timestamp: number, currentTimestamp: number): string => {
    const elapsedMilliseconds = currentTimestamp - timestamp;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) return `${elapsedDays} days ago`;
    if (elapsedHours > 0) return `${elapsedHours} hours ago`;
    if (elapsedMinutes > 0) return `${elapsedMinutes} minutes ago`;
    return `${elapsedSeconds} seconds ago`;
};

const formatTimestampToHumanReadable = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB'); // Format as "DD-MM-YYYY"
};

export const parseRelativeDate = (text: string): [number | null, string | null, string | null] => {
    const currentTimestamp = Date.now();

    // Check for "time ago" pattern
    const timeAgoMatch = isTimeAgoPattern(text);
    if (timeAgoMatch) {
        const timestamp = parseTimeAgoMatch(timeAgoMatch, new Date(currentTimestamp));
        const sinceTime = calculateElapsedTime(timestamp, currentTimestamp);
        const humanReadable = formatTimestampToHumanReadable(timestamp);
        return [timestamp, sinceTime, humanReadable];
    }

    // Check for "DD-MM-YYYY" date format
    const dateParts = isDatePattern(text);
    if (dateParts) {
        const [, day, month, year] = dateParts;
        const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
        const timestamp = parsedDate.getTime();
        const sinceTime = calculateElapsedTime(timestamp, currentTimestamp);
        const humanReadable = formatTimestampToHumanReadable(timestamp);
        return [timestamp, sinceTime, humanReadable];
    }

    // Return tuple with all entries as null if neither relative nor absolute date is valid
    return [null, null, null];
};

// Usage examples
// console.log(parseRelativeDate("2 days ago")); // Expected: [timestamp for 2 days ago, elapsed time, "DD-MM-YYYY"]
// console.log(parseRelativeDate("3 hours ago")); // Expected: [timestamp for 3 hours ago, elapsed time, "DD-MM-YYYY"]
// console.log(parseRelativeDate("24-10-2024")); // Expected: [timestamp for 24-10-2024, elapsed time, "24-10-2024"]
