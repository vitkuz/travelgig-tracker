import React, {useState} from 'react';
import {Badge, Button, Card, Collapse} from 'react-bootstrap';
// import { JobHeader } from './JobHeader';
// import { JobInfo } from './JobInfo';
// import { JobDescription } from './JobDescription';
// import { JobFooter } from './JobFooter';
import type {Job, JobWithInteraction} from "@/types";
import {useJobs} from "@/context/JobContext";
// import type { JobWithInteraction } from '../../types';

interface JobCardProps {
    job: Job;
}

interface JobFooterProps {
    job: JobWithInteraction;
}

interface JobHeaderProps {
    job: JobWithInteraction;
}

export function JobHeader({ job }: JobHeaderProps) {
    const { handleLike, handleDislike } = useJobs();

    return (
        <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="mb-0">{job.title}</h5>
            <div className="d-flex gap-2">
                <Button
                    variant={job.liked ? "success" : "light"}
                    size="sm"
                    onClick={() => handleLike(job)}
                    className="d-flex align-items-center"
                >
                    {/*<ThumbsUp size={16} />*/}+
                </Button>
                <Button
                    variant={job.disliked ? "danger" : "light"}
                    size="sm"
                    onClick={() => handleDislike(job)}
                    className="d-flex align-items-center"
                >
                    {/*<ThumbsDown size={16} />*/}-
                </Button>
            </div>
        </div>
    );
}

export function JobFooter({ job }: JobFooterProps) {
    const domain = new URL(job.viewMoreUrl).hostname;

    return (
        <div className="mt-auto d-flex justify-content-between align-items-center">
            <Badge bg="light" text="dark">
                {domain}
            </Badge>
            <Button
                href={job.viewMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
            >
                View Details
            </Button>
        </div>
    );
}

interface JobInfoProps {
    job: JobWithInteraction;
}

export function JobInfo({ job }: JobInfoProps) {
    return (
        <div className="small text-muted mb-3">
            <div className="d-flex align-items-center mb-1">
                {/*<Building2 size={14} className="me-2" />*/}
                <span>{job.company}</span>
            </div>
            <div className="d-flex align-items-center mb-1">
                {/*<MapPin size={14} className="me-2" />*/}
                <span>{job.location}</span>
            </div>
            <div className="d-flex align-items-center mb-1">
                {/*<Briefcase size={14} className="me-2" />*/}
                <span>{job.salary}</span>
            </div>
            <div className="d-flex align-items-center">
                {/*<Clock size={14} className="me-2" />*/}
                <span>{job.scrapedDaysAgo}</span>
            </div>
        </div>
    );
}

export function JobCard({ job }: JobCardProps) {
    const [open, setOpen] = useState(false);
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
                <JobHeader job={job} />
                <JobInfo job={job} />
                <Button
                    variant="link"
                    onClick={() => setOpen(!open)}
                    aria-controls="job-description"
                    aria-expanded={open}
                    className="p-0"
                >
                    {open ? 'Hide Details' : 'Show Details'}
                </Button>
                <Collapse in={open}>
                    <div>
                        {job.description}
                    </div>
                </Collapse>
                <JobFooter job={job} />
            </Card.Body>
        </Card>
    );
}