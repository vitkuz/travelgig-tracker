import React from 'react';
import { Spinner } from 'react-bootstrap';

export function LoadingSpinner() {
    return (
        <div className="text-center py-4">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}