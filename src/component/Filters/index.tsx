import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';
import { useFilters } from "@/context/FilterContext";
import { useJobs } from "@/context/JobContext";
import { SaveFilterModal } from './SaveFilterModal';
import { SaveFilterButton } from "@/component/SavedFilters/SaveFilterButton";

export function Filters() {
    const {
        currentFilters,
        updateCurrentFilters,
        resetFilters,
        saveCurrentFilters,
        canAddMore
    } = useFilters();
    const { t } = useTranslation();
    const { filterOptions } = useJobs();
    const [showModal, setShowModal] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const hasActiveFilters = currentFilters.searchQuery ||
        currentFilters.timeFilter ||
        currentFilters.domainFilter ||
        currentFilters.locationFilter ||
        currentFilters.industryFilter ||
        currentFilters.showLiked;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await saveCurrentFilters(filterName);
            setFilterName('');
            setShowModal(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save filter');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">{t('filters.title')}</h6>
            </div>
            <div className="mb-4 mt-4">
                <div className="row g-3">
                    <div className="col-md-4 d-flex">
                        <Form.Control
                            type="text"
                            placeholder={t('filters.searchPlaceholder')}
                            value={currentFilters.searchQuery}
                            onChange={(e) => updateCurrentFilters({searchQuery: e.target.value})}
                        />
                    </div>

                    <div className="col-md-2 d-flex">
                        <Form.Select
                            value={currentFilters.timeFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({timeFilter: e.target.value || null})}
                        >
                            <option value="">{t('filters.allTime')}</option>
                            {filterOptions.daysAgo.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-2 d-flex">
                        <Form.Select
                            value={currentFilters.domainFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({domainFilter: e.target.value || null})}
                        >
                            <option value="">{t('filters.allDomains')}</option>
                            {filterOptions.domains.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-2 d-flex">
                        <Form.Select
                            value={currentFilters.locationFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({locationFilter: e.target.value || null})}
                        >
                            <option value="">{t('filters.allLocations')}</option>
                            {filterOptions.locations.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-2 d-flex">
                        <Form.Select
                            value={currentFilters.industryFilter ?? ''}
                            onChange={(e) => updateCurrentFilters({industryFilter: e.target.value || null})}
                        >
                            <option value="">{t('filters.allIndustries')}</option>
                            {filterOptions.industries.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-2 d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            onClick={resetFilters}
                            disabled={!hasActiveFilters}
                            className="d-inline-flex"
                            title={t('filters.resetFilter')}
                        >
                            <span>{t('filters.resetFilter')}</span>
                        </Button>

                        <SaveFilterButton
                            canAddMore={canAddMore}
                            onClick={() => setShowModal(true)}
                            disabled={!hasActiveFilters}
                            hasSearchQuery={Boolean(currentFilters.searchQuery.trim())}
                        />
                    </div>
                </div>
            </div>

            <SaveFilterModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setError(null);
                }}
                onSave={handleSave}
                filterName={filterName}
                onFilterNameChange={setFilterName}
                error={error}
                isSaving={isSaving}
            />
        </>
    );
}