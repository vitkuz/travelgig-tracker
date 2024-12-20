import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Filters } from './components/Filters';
// import { JobList } from './components/JobList';
// import { SavedFilters } from './components/SavedFilters';
// import { useJobs } from './contexts/JobContext';
// import { useFilters } from './contexts/FilterContext';
// import { filterJobs, extractDomains } from './utils/jobFilters';
import {useJobs} from "@/context/JobContext";
import {useFilters} from "@/context/FilterContext";
import {extractDaysAgo, extractDomains, filterJobs} from "@/utils";
import {Filters} from "@/component/Filters";
import {JobList} from "@/component/JobList";
import {SavedFilters} from "@/component/SavedFilters";
import {UserInfo} from "@/component/UserInfo";
// import JobCards from "@/component/JobsCards";

function HomePageContent() {
    const { jobs } = useJobs();
    const { currentFilters } = useFilters();

    const domains = useMemo(() => extractDomains(jobs), [jobs]);
    const daysAgo = useMemo(() => extractDaysAgo(jobs), [jobs]);
    const filteredJobs = useMemo(
        () => filterJobs(jobs, currentFilters),
        [jobs, currentFilters]
    );

    return (
        <Container className="py-5">
            <Row>
                <Col md={12}>
                    <UserInfo />
                    <SavedFilters />
                    <Filters domains={domains} daysAgo={daysAgo}/>
                    <JobList jobs={filteredJobs} />
                </Col>
            </Row>
        </Container>
    );
}
export default HomePageContent;