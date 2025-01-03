interface DateFormatOptions {
    weekday?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
    day?: 'numeric' | '2-digit';
}

export const formatDate = (
    date: Date | string | number,
    locale: string = 'en',
    options: DateFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
): string => {
    const dateObject = new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(dateObject);
};

export const getRelativeTime = (
    date: Date | string | number,
    locale: string = 'en'
): string => {
    const timeMs = new Date(date).getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
    const deltaMinutes = Math.round(deltaSeconds / 60);
    const deltaHours = Math.round(deltaMinutes / 60);
    const deltaDays = Math.round(deltaHours / 24);

    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (Math.abs(deltaSeconds) < 60) {
        return formatter.format(deltaSeconds, 'second');
    } else if (Math.abs(deltaMinutes) < 60) {
        return formatter.format(deltaMinutes, 'minute');
    } else if (Math.abs(deltaHours) < 24) {
        return formatter.format(deltaHours, 'hour');
    } else {
        return formatter.format(deltaDays, 'day');
    }
};