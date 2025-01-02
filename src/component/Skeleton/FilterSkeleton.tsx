import React from 'react';
import { Card } from 'react-bootstrap';

export function FilterSkeleton() {
    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="skeleton-loader w-25 h-20"></div>
                    <div className="skeleton-loader w-15 h-20"></div>
                </div>
                <div className="d-flex gap-2 mb-3">
                    <div className="skeleton-loader w-10 h-15"></div>
                    <div className="skeleton-loader w-10 h-15"></div>
                    <div className="skeleton-loader w-10 h-15"></div>
                </div>
            </Card.Body>
        </Card>
    );
}