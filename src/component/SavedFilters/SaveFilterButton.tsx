'use client';

import React from 'react';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';

interface SaveFilterButtonProps {
    canAddMore: boolean;
    onClick: () => void;
    savedCount: number;
    maxFilters?: number;
}

export function SaveFilterButton({
                                     canAddMore,
                                     onClick,
                                     savedCount,
                                     maxFilters = 3
                                 }: SaveFilterButtonProps) {
    const popover = (
        <Popover id="save-filter-limit-popover">
            <Popover.Body>
                You can save up to {maxFilters} filters. Please delete an existing filter to save a new one.
            </Popover.Body>
        </Popover>
    );

    const button = (
        <Button
            variant="outline-primary"
            size="sm"
            onClick={onClick}
            disabled={!canAddMore}
            className="d-inline-flex align-items-center gap-2"
        >
            <span>Save Current Filters</span>
            <Badge
                bg={canAddMore ? "primary" : "secondary"}
                className="ms-1"
            >
                {savedCount}/{maxFilters}
            </Badge>
        </Button>
    );

    if (!canAddMore) {
        return (
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="left"
                overlay={popover}
            >
                <span>{button}</span>
            </OverlayTrigger>
        );
    }

    return button;
}