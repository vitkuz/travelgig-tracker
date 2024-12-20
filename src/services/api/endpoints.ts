export const AUTH_ENDPOINTS = {
    validate: (userId: string, secret: string) =>
        `/auth/validate?userId=${userId}&secret=${secret}`
};