export const getDomain = (url: string) => {
    try {
        const hostname = new URL(url).hostname;
        return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
    } catch (error) {
        console.error("Invalid URL:", error);
        return '';
    }
};