'use client'
// import JobCards from "@/component/JobsCards";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {FilterProvider} from "@/context/FilterContext";
import {JobProvider} from "@/context/JobContext";
import HomePageContent from "@/component/HomePageContent";

export default function Home() {
    return (
        <JobProvider>
            <FilterProvider>
                <Container fluid>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h1 className="mb-0">Lily&#39;s Job Tracker</h1>
                        </Col>
                    </Row>
                    <HomePageContent/>
                </Container>
            </FilterProvider>
        </JobProvider>
    );
}
