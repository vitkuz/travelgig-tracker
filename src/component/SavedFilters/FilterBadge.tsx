'use client';

import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';

interface FilterBadgeProps {
    id: string;
    name: string;
    hasNotification: boolean;
    onDelete: (id: string) => void;
    onApply: () => void;
    onToggleNotification: (id: string) => void;
}

export function FilterBadge({
                                id,
                                name,
                                hasNotification,
                                onDelete,
                                onApply,
                                onToggleNotification
                            }: FilterBadgeProps) {
    const { user } = useAuth();

    return (
        <div className="d-inline-flex align-items-center gap-2 me-2 mb-2">
            <Badge
                bg="secondary"
                className="cursor-pointer"
                onClick={onApply}
                style={{ cursor: 'pointer' }}
            >
                {name}
            </Badge>

            <Button
                variant="link"
                size="sm"
                className="p-0 text-danger"
                onClick={() => onDelete(id)}
            >
                ×
            </Button>

            {user?.isAuthenticated && (
                <Button
                    variant="link"
                    size="sm"
                    className={`p-0 ${hasNotification ? 'text-success' : 'text-muted'}`}
                    onClick={() => onToggleNotification(id)}
                >
                    🔔
                </Button>
            )}
        </div>
    );
}