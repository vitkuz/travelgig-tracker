'use client';

import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import { useFilters } from '@/context/FilterContext';
import { FilterCard } from './FilterCard';
import {SaveFilterButton} from "@/component/SavedFilters/SaveFilterButton";

export function SavedFilters() {
    const {
        savedFilters,
        saveCurrentFilters,
        deleteSavedFilter,
        applySavedFilter,
        toggleFilterNotification,
        canAddMore
    } = useFilters();

    const [showModal, setShowModal] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            saveCurrentFilters(filterName);
            setFilterName('');
            setShowModal(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save filter');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Saved Filters</h6>
                <SaveFilterButton
                    canAddMore={canAddMore}
                    onClick={() => setShowModal(true)}
                    savedCount={savedFilters.length}
                />
            </div>

            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {savedFilters.map((filter) => (
                    <Col key={filter.id}>
                        <FilterCard
                            filter={filter}
                            onDelete={deleteSavedFilter}
                            onApply={() => applySavedFilter(filter)}
                            onToggleNotification={toggleFilterNotification}
                        />
                    </Col>
                ))}
            </Row>

            {savedFilters.length === 0 && (
                <div className="text-center text-muted py-5">
                    <p>No saved filters yet</p>
                    <p className="small">Save your current filter settings to quickly apply them later (max 3)</p>
                </div>
            )}

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setError(null);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Current Filters</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        {error && (
                            <Alert variant="danger" className="mb-3">
                                {error}
                            </Alert>
                        )}
                        <Form.Group>
                            <Form.Label>Filter Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a name for your filter"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                You can save up to 3 filters
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowModal(false);
                            setError(null);
                        }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Filter
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}