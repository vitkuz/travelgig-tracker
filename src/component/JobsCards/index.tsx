'use client'
import React, {useCallback, useEffect, useState} from 'react';
import axios, { AxiosError } from 'axios';
import JobCard from "@/JobCard";
import { Job } from "@/types";
import { Badge, Col, Row, Form } from "react-bootstrap";
import {chunkByDaysSinceToday, getFilters} from "@/utils/chunkByWeekOfMonth";
import { getRandomCssColor } from "@/utils/rendomCssColor";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {debounce} from "@/utils/debounce";

// Static JSON file URL
const STATIC_JSON_URL = 'https://travelgig-scrapers-stack-travelgigscrapersbucket4d-d3xp9qd9n3lf.s3.us-east-1.amazonaws.com/jobs.json';

const JobCards = () => {
    // other state and hooks
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");

    // Debounced handler for the search input
    const updateSearchQuery = useCallback(
        debounce((value: string) => {
            setDebouncedQuery(value.toLowerCase());
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value); // Update immediate input
        updateSearchQuery(value); // Trigger debounce
    };

    const [savedJobs, setSavedJobs] = useLocalStorage<any[]>('savedJobs', []);
    const [jobsFromServer, setJobsFromServer] = useState<Job[]>([]);
    const [jobs, setJobs] = useState<Job[][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const [count, setCount] = useState(0);
    const [domains, setDomains] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [scrapedDaysAgo, setScrapedDaysAgo] = useState<string[]>([]);
    const [postedDaysAgo, setPostedDaysAgo] = useState<string[]>([]);

    const [domainFilter, setDomainFilter] = useState<string[]>([]);
    const [locationFilter, setLocationFilter] = useState<string[]>([]);
    const [daysAgoFilter, setDaysAgoFilter] = useState<string[]>([]);
    const [savedFilter, setSavedFilter] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get<Job[]>(STATIC_JSON_URL);

                const jobs = response.data
                    .sort((a: Job, b: Job) => {
                        if (a.postDateTimestamp && b.postDateTimestamp) {
                            const dateA = new Date(a.postDateTimestamp).getTime();
                            const dateB = new Date(b.postDateTimestamp).getTime();
                            return dateB - dateA;
                        }
                        return 1; // Sort in descending order (most recent first)
                    });

                setCount(jobs.length);
                setJobsFromServer(jobs);
                const {domains, scrapedDaysAgo, locations} = getFilters(jobs);
                console.log(domains);
                setDomains(domains as string[]);
                console.log(scrapedDaysAgo);
                setScrapedDaysAgo(scrapedDaysAgo as string[]);
                setPostedDaysAgo(postedDaysAgo as string[]);
                console.log(locations);
                setLocations(locations as string[]);
                setJobs(chunkByDaysSinceToday(jobs));
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>Error: {String(error)}</p>;

    const handleSave = (job: any) => {
        const exists = savedJobs.some(savedJob => savedJob.viewMoreUrl === job.viewMoreUrl);
        if (exists) {
            const newSavedJobs = savedJobs.filter(savedJob => savedJob.viewMoreUrl !== job.viewMoreUrl);
            setSavedJobs(newSavedJobs);
        } else {
            const newSavedJobs = [...savedJobs, job];
            setSavedJobs(newSavedJobs);
        }
    };

    return (
        <>
            <div className="d-flex gap-3 justify-content-center align-items-center">
                <Form.Check
                    type="checkbox"
                    label="Show saved Jobs Only"
                    checked={savedFilter}
                    onChange={(e) => setSavedFilter(e.target.checked)}
                />
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center">
                <Form.Select
                    size="sm"
                    value={domainFilter ?? []}
                    onChange={(e) =>
                        setDomainFilter(
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                    style={{ minWidth: '150px' }}
                    multiple
                >
                    {domains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select
                    size="sm"
                    value={daysAgoFilter ?? []}
                    onChange={(e) =>
                        setDaysAgoFilter(
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                    style={{ minWidth: '150px' }}
                    multiple
                >
                    {scrapedDaysAgo.map((dayAgoStr) => (
                        <option key={dayAgoStr} value={dayAgoStr}>
                            {dayAgoStr}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select
                    size="sm"
                    value={locationFilter ?? []}
                    onChange={(e) =>
                        setLocationFilter(
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                    style={{ minWidth: '150px' }}
                    multiple
                >
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </Form.Select>
            </div>

            <div>
                <div className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Search jobs by location, title, or details"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {jobs.map((chunk, index) => {

                const filtered = chunk
                    .filter(j => savedFilter ? savedJobs.some(savedJob => savedJob.viewMoreUrl === j.viewMoreUrl) : true)
                    .filter(j =>
                        domainFilter.length > 0
                            ? domainFilter.includes(j.domain)
                            : true
                    )
                    .filter(j =>
                        daysAgoFilter.length > 0
                            ? daysAgoFilter.includes(j.scrapedDaysAgo.toString())
                            : true
                    )
                    .filter(j =>
                        locationFilter.length > 0
                            ? locationFilter.includes(j.location!)
                            : true
                    )
                    .filter(j =>
                        (j.location ?? '').toLowerCase().includes(debouncedQuery) ||
                        (j.title ?? '').toLowerCase().includes(debouncedQuery) ||
                        (j.company ?? '').toLowerCase().includes(debouncedQuery)
                        // (j.description ?? '').toLowerCase().includes(debouncedQuery)
                    );

                if (filtered.length === 0) return;

                return (
                    <Row key={index}>
                        <Col style={{background: '#474747'}}>
                            <div className="text-center">
                                <p>{chunk[0].scrapedDaysAgo}</p>
                                <Badge className="m-4">{chunk.length} / {filtered.length}</Badge>
                            </div>
                            {filtered
                                .map((job) => (
                                    <Row key={job.viewMoreUrl} className="justify-content-center align-items-center">
                                        <Col xs={12} sm={12}>
                                            <JobCard job={job} clickSave={handleSave} savedJobs={savedJobs}/>
                                        </Col>
                                    </Row>
                                ))}
                        </Col>
                    </Row>
                );
            })}
        </>
    );
};

export default JobCards;
