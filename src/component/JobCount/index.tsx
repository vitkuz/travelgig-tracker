import React from 'react';
import { Badge } from 'react-bootstrap';

interface JobCountProps {
    filteredCount: number;
    totalCount: number;
}

export function JobCount({ filteredCount, totalCount }: JobCountProps) {
    return (
        <Badge bg="secondary" className="ms-2">
            {filteredCount} / {totalCount} jobs
        </Badge>
    );
}