import React, { useState } from 'react';
import { Card, Button, Badge, Collapse } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';
import type { JobWithInteraction } from "@/types";
import { getDomain } from "@/utils/getDomain";
import {getRelativeDate} from "@/utils/date";
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
            {job.location && (
                <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    {job.location}
                </Badge>
            )}
            {job.salary && (
                <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                    {job.salary}
                </Badge>
            )}
            {job.type && (
                <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1z"/>
                    </svg>
                    {job.type}
                </Badge>
            )}
            {/*<Badge bg="light" text="dark" className="d-flex align-items-center gap-1">*/}
            {/*    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">*/}
            {/*        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>*/}
            {/*        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>*/}
            {/*    </svg>*/}
            {/*    {job.scrapedDaysAgo}*/}
            {/*</Badge>*/}
        </div>
    );
}

interface JobCardProps {
    job: JobWithInteraction;
}

export function JobCard({ job }: JobCardProps) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
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
                        className="p-0"
                    >
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
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {getRelativeDate(job.scrapedDateTimestamp)}
                        {/*{job.scrapedDaysAgo}*/}
                    </Badge>
                    <Button
                        href={job.viewMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                        className="ms-2"
                    >
                        {t('jobs.openOn', { domain })}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}