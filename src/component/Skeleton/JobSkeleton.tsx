import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

export function JobSkeleton() {
    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex flex-column gap-3">
                    <div className="skeleton-loader w-15 h-20 mx-auto"></div>
                    <div className="skeleton-loader w-50 h-25 mx-auto"></div>
                    <div className="skeleton-loader w-30 h-20 mx-auto"></div>
                    <div className="skeleton-loader w-40 h-20 mx-auto"></div>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <div className="skeleton-loader w-20 h-30"></div>
                        <div className="skeleton-loader w-20 h-30"></div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export function JobSkeletonGrid() {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {[...Array(6)].map((_, index) => (
                <Col key={index}>
                    <JobSkeleton />
                </Col>
            ))}
        </Row>
    );
}