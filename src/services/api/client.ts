import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.AUTH_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});