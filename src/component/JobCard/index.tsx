import React, { useState } from 'react';
import { Card, Button, Badge, Collapse } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';
import type { JobWithInteraction } from "@/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMoneyBill, faBriefcase, faBuilding, faChevronDown, faChevronUp, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { getDomain } from "@/utils/getDomain";
import {getRelativeTime} from "@/utils/dateUtils";
// import {useJobs} from "@/context/JobContext";

interface JobHeaderProps {
    job: JobWithInteraction;
}

export function JobHeader({ job }: JobHeaderProps) {
    // const { handleLike, handleDislike } = useJobs();

    return (
        <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex flex-column">
                <h5 className="mb-1">{job.title}</h5>
                <div className="text-muted small">{job.company}</div>
            </div>
            <div className="d-flex gap-2">
                {/*<Button*/}
                {/*    variant={job.liked ? "danger" : "outline-danger"}*/}
                {/*    // size="sm"*/}
                {/*    onClick={() => handleLike(job)}*/}
                {/*    className="d-flex align-items-center"*/}
                {/*    title="Like"*/}
                {/*>*/}
                {/*    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">*/}
                {/*        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>*/}
                {/*    </svg>*/}
                {/*</Button>*/}
            </div>
        </div>
    );
}

interface JobMetadataProps {
    job: JobWithInteraction;
}

function JobMetadata({ job }: JobMetadataProps) {
    return (
        <div className="d-flex flex-wrap gap-2 mb-3">
            {job.industry && (
                <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faBuilding} size="sm" />
                    {job.industry}
                </Badge>
            )}
            {job.location && (
                <Badge bg="dark" className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faLocationDot} size="sm" />
                    {job.location}
                </Badge>
            )}
            {job.salary && (
                <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faMoneyBill} size="sm" />
                    {job.salary}
                </Badge>
            )}
            {job.type && (
                <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faBriefcase} size="sm" />
                    {job.type}
                </Badge>
            )}
            {job.shortDescription && (
                <p>
                    {job.shortDescription}
                </p>
            )}
        </div>
    );
}

interface JobCardProps {
    job: JobWithInteraction;
}

export function JobCard({ job }: JobCardProps) {
    const [open, setOpen] = useState(false);
    const { t, language } = useTranslation();
    const domain = getDomain(job.viewMoreUrl);

    return (
        <Card className="h-100 shadow-sm hover-shadow">
            <Card.Body className="d-flex flex-column">
                <JobHeader
                    job={job}
                />
                <JobMetadata job={job} />

                <div className="mb-3">
                    <Button
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="job-description"
                        aria-expanded={open}
                        className="p-0 d-flex align-items-center gap-2"
                    >
                        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} size="sm" />
                        {open ? t('jobs.hideDetails') : t('jobs.showDetails')}
                    </Button>
                    <Collapse in={open}>
                        <div id="job-description" className="mt-2">
                            {job.description}
                        </div>
                    </Collapse>
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                        {getRelativeTime(job.scrapedDateTimestamp, language)}
                    </Badge>
                    <Button
                        href={job.viewMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                        className="ms-2 d-flex align-items-center gap-2"
                    >
                        {t('jobs.openOn', { domain })}
                        <FontAwesomeIcon icon={faExternalLink} size="sm" />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}