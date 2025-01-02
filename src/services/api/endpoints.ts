export const AUTH_ENDPOINTS = {
    validate: (userId: string, secret: string) =>
        `/auth/validate?userId=${userId}&secret=${secret}`,
};

export const FILTER_ENDPOINTS = {
    base: process.env.FILTERS_API,
    update: (userId:string, filterId: string) => `${FILTER_ENDPOINTS.base}/users/${userId}/filters/${filterId}`,
    list: (userId: string) => `${FILTER_ENDPOINTS.base}/users/${userId}/filters`,
    create: (userId:string) => `${FILTER_ENDPOINTS.base}/users/${userId}/filters`,
    delete: (userId:string, filterId: string) => `${FILTER_ENDPOINTS.base}/users/${userId}/filters/${filterId}`,
};