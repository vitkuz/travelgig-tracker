export function parseAuthParams(): { userId: string | null; secret: string | null } {
    if (typeof window === 'undefined') {
        return { userId: null, secret: null };
    }

    const searchParams = new URLSearchParams(window.location.search);
    return {
        userId: searchParams.get('userId'),
        secret: searchParams.get('secret')
    };
}