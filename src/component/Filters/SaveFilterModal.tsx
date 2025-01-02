import React from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import { useTranslation } from "@/i18n/context";

interface SaveFilterModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (e: React.FormEvent) => Promise<void>;
    filterName: string;
    onFilterNameChange: (value: string) => void;
    error: string | null;
    isSaving: boolean;
}

export function SaveFilterModal({
                                    show,
                                    onHide,
                                    onSave,
                                    filterName,
                                    onFilterNameChange,
                                    error,
                                    isSaving
                                }: SaveFilterModalProps) {
    const { t } = useTranslation();

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t('filters.saveFilterTitle')}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSave}>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}
                    <Form.Group>
                        <Form.Label>{t('filters.filterNameLabel')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('filters.filterNamePlaceholder')}
                            value={filterName}
                            onChange={(e) => onFilterNameChange(e.target.value)}
                            required
                            disabled={isSaving}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={onHide}
                        disabled={isSaving}
                    >
                        {t('common.cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSaving || !filterName.trim()}
                    >
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}