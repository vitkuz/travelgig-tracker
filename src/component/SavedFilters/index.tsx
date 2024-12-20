import React, {useState} from 'react';
import {Button, ListGroup, Modal, Form, Badge} from 'react-bootstrap';
import {useFilters} from "@/context/FilterContext";
// import { BookmarkPlus, Trash2 } from 'lucide-react';
// import { useFilters } from '../contexts/FilterContext';

export function SavedFilters() {
    const {savedFilters, saveCurrentFilters, deleteSavedFilter, applySavedFilter} = useFilters();
    const [showModal, setShowModal] = useState(false);
    const [filterName, setFilterName] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        saveCurrentFilters(filterName);
        setFilterName('');
        setShowModal(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Saved Filters</h6>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowModal(true)}
                    className="d-flex align-items-center gap-2"
                >
                    Save Current
                </Button>
            </div>

            {savedFilters.map((filter) => (

                <>
                    <Badge
                        key={filter.id}
                        // className="d-flex justify-content-between align-items-center"
                        // action
                        onClick={() => applySavedFilter(filter)}
                    >
                        {filter.name}
                    </Badge>
                    <span onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedFilter(filter.id);
                    }}>Удалить</span>
                </>
            ))}
            {savedFilters.length === 0 && (
                <div className="text-muted text-center">
                    No saved filters yet
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Current Filters</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Filter Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a name for your filter"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
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