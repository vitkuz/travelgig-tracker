export function formatDate(timestamp: number, language: 'en' | 'ru' = 'en'): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const translations = {
        en: {
            justNow: 'just now',
            minuteAgo: 'minute ago',
            minutesAgo: 'minutes ago',
            hourAgo: 'hour ago',
            hoursAgo: 'hours ago',
            dayAgo: 'day ago',
            daysAgo: 'days ago'
        },
        ru: {
            justNow: 'только что',
            minuteAgo: 'минуту назад',
            minutesAgo: 'минут назад',
            hourAgo: 'час назад',
            hoursAgo: 'часов назад',
            dayAgo: 'день назад',
            daysAgo: 'дней назад'
        }
    };

    const t = translations[language];

    if (diffInSeconds < 60) {
        return t.justNow;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? t.minuteAgo : t.minutesAgo}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? t.hourAgo : t.hoursAgo}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} ${diffInDays === 1 ? t.dayAgo : t.daysAgo}`;
    }

    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function getRelativeDate(timestamp: number): string {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 0) {
        return 'today';
    } else if (diffInDays === 1) {
        return 'yesterday';
    } else {
        return `${diffInDays} days ago`;
    }
}

export function getRelativeDateForFilters(timestamp: number): string {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 0) {
        return 'today';
    } else if (diffInDays === 1) {
        return 'yesterday';
    } else {
        return `${diffInDays} days ago`;
    }
}