'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';

export function UserInfo() {
    const { user } = useAuth();

    if (!user?.isAuthenticated) {
        return null;
    }

    return (
        <Card className="mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="text-muted small">Telegram User Id</div>
                    <div className="fw-bold">{user.userId}</div>
                </div>
                <div className="text-end">
                    <div className="text-muted small">Available Credits</div>
                    <div className="fw-bold text-success">{user.profile?.balance}</div>
                </div>
            </Card.Body>
        </Card>
    );
}