import React, {useState} from 'react';
import {Card, Button, Badge, Collapse} from 'react-bootstrap';
import Link from 'next/link';
import {Job} from "@/types";
import {getDomain} from "@/utils/getDomain";

interface JobCardProps {
    job: Job;
    savedJobs: Job[];
    clickSave: (job:any) => void
}

const JobCard: React.FC<JobCardProps> = ({ job, clickSave, savedJobs }) => {
    const {
        title,
        company,
        location,
        scrapedDaysAgo,
        description,
        salary,
        type,
        viewMoreUrl,
    } = job;

    const [open, setOpen] = useState(false);

    const isSaved = savedJobs.some(savedJob => savedJob.viewMoreUrl === job.viewMoreUrl)

    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center mb-3">

                    <div className="text-center text-muted">{scrapedDaysAgo}</div>
                    <h4 className="text-center">{title}, {location}</h4>
                    <div className="text-center text-muted">{company}</div>
                    <div className="text-center text-muted">{salary} | {type}</div>
                    <Button
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="job-description"
                        aria-expanded={open}
                        className="p-0"
                    >
                        {open ? 'Hide Details' : 'Show Details'}
                    </Button>
                </div>
                <Collapse in={open}>
                    <div>
                        {description}
                    </div>
                </Collapse>
                <div className="d-flex flex-row gap-3 justify-content-center align-items-center mt-3">
                    {
                        viewMoreUrl && (<Link href={viewMoreUrl} passHref target="_blank">
                            <Button variant="primary">
                                Open on {getDomain(viewMoreUrl)}
                            </Button>
                        </Link>)
                    }
                    {
                        isSaved ? (
                            <Button variant="success" onClick={() => clickSave(job)}>Save</Button>
                        ) : (<Button variant="danger" onClick={() => clickSave(job)}>Remove</Button>)
                    }

                </div>
            </Card.Body>
        </Card>
    )
};

export default JobCard;
