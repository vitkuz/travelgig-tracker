import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Filters} from "@/component/Filters";
import {JobList} from "@/component/JobList";
import {SavedFilters} from "@/component/SavedFilters";
import {Navbar} from "@/component/Navbar";
import {Footer} from "@/component/Footer";

function HomePageContent() {
    return (
        <div className="min-vh-100 d-flex flex-column">
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
            <Footer />
        </div>
    );
}

export default HomePageContent;