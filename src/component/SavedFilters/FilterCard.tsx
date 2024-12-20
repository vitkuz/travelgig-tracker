'use client';

import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import type { SavedFilter } from '@/types/filters';
import { formatDate } from '@/utils/date';

interface FilterCardProps {
    filter: SavedFilter;
    onDelete: (id: string) => void;
    onApply: () => void;
    onToggleNotification: (id: string) => void;
}

export function FilterCard({
                               filter,
                               onDelete,
                               onApply,
                               onToggleNotification
                           }: FilterCardProps) {
    const { user } = useAuth();

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <Card.Title>{filter.name}</Card.Title>
                        <Card.Subtitle className="text-muted">
                            Created {formatDate(filter.createdAt)}
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex gap-2">
                        {user?.isAuthenticated && (
                            <Button
                                variant={filter.hasNotification ? "success" : "outline-secondary"}
                                size="sm"
                                onClick={() => onToggleNotification(filter.id)}
                            >
                                🔔 Notifications
                            </Button>
                        )}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(filter.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="mb-2">Active Filters:</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {filter.timeFilter && (
                            <Badge bg="info">Time: {filter.timeFilter}</Badge>
                        )}
                        {filter.domainFilter && (
                            <Badge bg="info">Source: {filter.domainFilter}</Badge>
                        )}
                        {filter.showLiked && (
                            <Badge bg="info">Liked Only</Badge>
                        )}
                        {filter.searchQuery && (
                            <Badge bg="info">Search: {filter.searchQuery}</Badge>
                        )}
                        {!filter.timeFilter && !filter.domainFilter && !filter.showLiked && !filter.searchQuery && (
                            <span className="text-muted">No active filters</span>
                        )}
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={onApply}
                    className="w-100"
                >
                    Apply Filter
                </Button>
            </Card.Body>
        </Card>
    );
}