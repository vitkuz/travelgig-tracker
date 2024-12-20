import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
// import { Filter } from 'lucide-react';
// import { SearchBar } from './SearchBar';
import {useFilters} from "@/context/FilterContext";
import {SearchBar} from "@/component/SearchBar";
// import { useFilters } from '../contexts/FilterContext';

interface FiltersProps {
    domains: string[];
    daysAgo: string[];
}

export function Filters({ domains, daysAgo }: FiltersProps) {
    const { currentFilters, updateCurrentFilters } = useFilters();

    return (
        <>
            <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                    <SearchBar
                        searchQuery={currentFilters.searchQuery}
                        setSearchQuery={(searchQuery: any) => updateCurrentFilters({ searchQuery })}
                    />
                </Col>
                <Col md={6}>
                    <div className="d-flex gap-3 align-items-center justify-content-md-end">
                        <Form.Select
                            size="sm"
                            value={currentFilters.timeFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({
                                timeFilter: e.target.value || null
                            })}
                            style={{ minWidth: '150px' }}
                        >
                            <option value="">All Sources</option>
                            {daysAgo.map(dayAgo => (
                                <option key={dayAgo} value={dayAgo}>
                                    {dayAgo}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Select
                            size="sm"
                            value={currentFilters.domainFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({
                                domainFilter: e.target.value || null
                            })}
                            style={{ minWidth: '150px' }}
                        >
                            <option value="">All Sources</option>
                            {domains.map(domain => (
                                <option key={domain} value={domain}>
                                    {domain}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Check
                            type="checkbox"
                            id="show-liked"
                            label="Show Liked Only"
                            checked={currentFilters.showLiked}
                            onChange={(e) => updateCurrentFilters({
                                showLiked: e.target.checked
                            })}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}