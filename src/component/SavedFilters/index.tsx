import React, { useState } from 'react';
import {Row, Col, Badge} from 'react-bootstrap';
import { useFilters } from '@/context/FilterContext';
import { useTranslation } from '@/i18n/context';
import { FilterCard } from './FilterCard';
import { LoadingSpinner } from '@/component/LoadingSpinner';

export function SavedFilters() {
    const {
        savedFilters,
        isLoading,
        deleteSavedFilter,
        applySavedFilter,
        toggleFilterNotification,
    } = useFilters();
    const { t } = useTranslation();

    const [deletingFilterId, setDeletingFilterId] = useState<string | null>(null);
    const [togglingNotificationId, setTogglingNotificationId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingFilterId(id);
        try {
            await deleteSavedFilter(id);
        } finally {
            setDeletingFilterId(null);
        }
    };

    const handleToggleNotification = async (id: string) => {
        setTogglingNotificationId(id);
        try {
            await toggleFilterNotification(id);
        } finally {
            setTogglingNotificationId(null);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">{t('filters.savedFilters')}</h6>
                <Badge bg="secondary" className="ms-2">
                    {t('filters.savedFiltersLimit', { count: savedFilters.length, max: 3 })}
                </Badge>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {savedFilters.map((filter) => (
                    <Col key={filter.id}>
                        <FilterCard
                            filter={filter}
                            onDelete={handleDelete}
                            onApply={() => applySavedFilter(filter)}
                            onToggleNotification={handleToggleNotification}
                            isDeleting={deletingFilterId === filter.id}
                            isTogglingNotification={togglingNotificationId === filter.id}
                        />
                    </Col>
                ))}
            </Row>

            {savedFilters.length === 0 && (
                <div className="text-center text-muted py-5">
                    <p>{t('filters.noSavedFilters')}</p>
                    <p className="small">{t('filters.saveFilterHelp')}</p>
                </div>
            )}
        </>
    );
}