import { ONE_DAY_MS, ONE_HOUR_MS, ONE_MINUTE_MS, ONE_SECOND_MS } from './constants';

export interface TimeDifference {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function calculateTimeDifference(timestamp: number): TimeDifference {
    const diffMs = Date.now() - timestamp;

    const days = Math.floor(diffMs / ONE_DAY_MS);
    const hours = Math.floor((diffMs % ONE_DAY_MS) / ONE_HOUR_MS);
    const minutes = Math.floor((diffMs % ONE_HOUR_MS) / ONE_MINUTE_MS);
    const seconds = Math.floor((diffMs % ONE_MINUTE_MS) / ONE_SECOND_MS);

    return { days, hours, minutes, seconds };
}

const translations = {
    en: {
        today: 'today',
        yesterday: 'yesterday',
        daysAgo: (days: number) => `${days} days ago`
    },
    ru: {
        today: 'сегодня',
        yesterday: 'вчера',
        daysAgo: (days: number) => `${days} ${getDaysDeclension(days)} назад`
    }
} as const;

function getDaysDeclension(days: number): string {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней';
    if (lastDigit === 1) return 'день';
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
    return 'дней';
}

export function getRelativeDateForFilters(timestamp: number, locale: 'en' | 'ru' = 'en'): string {
    const { days } = calculateTimeDifference(timestamp);
    const t = translations[locale];

    switch (days) {
        case 0:
            return t.today;
        case 1:
            return t.yesterday;
        default:
            return t.daysAgo(days);
    }
}