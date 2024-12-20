import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
// import { JobCard } from './JobCard';
import {useJobs} from "@/context/JobContext";
import {JobCard} from "@/component/JobCard";
import {Job} from "@/types";
// import { useJobs } from '../contexts/JobContext';

export function JobList({ jobs }: any) {
    const { isLoading, error } = useJobs();

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-3">
                {error}
            </Alert>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted fs-5">No jobs found matching your filters</p>
            </div>
        );
    }

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {jobs.map((job: Job) => (
                <Col key={job.viewMoreUrl}>
                    <JobCard job={job} />
                </Col>
            ))}
        </Row>
    );
}