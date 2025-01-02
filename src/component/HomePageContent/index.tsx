import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Filters} from "@/component/Filters";
import {JobList} from "@/component/JobList";
import {SavedFilters} from "@/component/SavedFilters";
import {Navbar} from "@/component/Navbar";

function HomePageContent() {
    return (
        <>
            <Navbar/>
            <Container>
                <Row>
                    <Col md={12}>
                        <SavedFilters/>
                        <Filters/>
                        <JobList/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePageContent;