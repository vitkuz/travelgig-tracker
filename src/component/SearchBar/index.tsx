import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
        <InputGroup>
            <Form.Control
                type="text"
                placeholder="Search jobs by title, company, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0 ps-0"
            />
        </InputGroup>
    );
}