import React from 'react';
import {Row, Col, Alert, Badge} from 'react-bootstrap';
import { useJobs } from "@/context/JobContext";
import { useFilters } from "@/context/FilterContext";
import { useTranslation } from '@/i18n/context';
import { JobCard } from "@/component/JobCard";
import { shouldShowJob } from "@/utils";
import { LoadingSpinner } from '@/component/LoadingSpinner';

export function JobList() {
    const { jobs, isLoading, error } = useJobs();
    const { currentFilters } = useFilters();
    const { t } = useTranslation();

    const visibilityMap = shouldShowJob(jobs, currentFilters);
    const visibleCount = Object.values(visibilityMap).filter(Boolean).length;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-3">
                {error}
            </Alert>
        );
    }

    if (visibleCount === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted fs-5">{t('jobs.noJobsFound')}</p>
                <Badge bg="secondary" className="ms-2">
                    {t('jobs.jobCount', { filtered: visibleCount, total: jobs.length })}
                </Badge>
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">{t('jobs.title')}</h6>
                <Badge bg="secondary" className="ms-2">
                    {t('jobs.jobCount', { filtered: visibleCount, total: jobs.length })}
                </Badge>
            </div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {jobs.map((job) => (
                    <Col
                        key={job.viewMoreUrl}
                        style={{ display: visibilityMap[job.viewMoreUrl] ? 'block' : 'none' }}
                    >
                        <JobCard job={job}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}