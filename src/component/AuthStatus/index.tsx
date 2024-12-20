'use client';

import React from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import { TelegramAuthButton } from '../TelegramAuthButton';

export function AuthStatus() {
    const { user, error } = useAuth();

    if (error) {
        return (
            <Alert variant="info" className="mb-3 d-flex justify-content-between align-items-center">
                <span>Authentication failed. Please log in through our Telegram bot.</span>
                <TelegramAuthButton />
            </Alert>
        );
    }

    if (user?.isAuthenticated) {
        return (
            <Alert variant="success" className="mb-3">
                You can now create filters and set up Telegram notifications for new job matches.
            </Alert>
        );
    }

    return (
        <Alert variant="info" className="mb-3 d-flex justify-content-between align-items-center">
            <span>To save filters and receive notifications, please log in through our Telegram bot.</span>
            <TelegramAuthButton />
        </Alert>
    );
}