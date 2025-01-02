import React from 'react';
import { Badge } from 'react-bootstrap';

interface UserInfoProps {
    userId: string;
    balance: number;
}

export function UserInfo({ userId, balance }: UserInfoProps) {
    return (
        <div className="ms-auto d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
                <span className="text-light me-2">ID:</span>
                <Badge bg="secondary">{userId}</Badge>
            </div>
            <div className="d-flex align-items-center">
                <span className="text-light me-2">Credits:</span>
                <Badge bg="success">{balance}</Badge>
            </div>
        </div>
    );
}