import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';

interface SaveFilterButtonProps {
    canAddMore: boolean;
    onClick: () => void;
    disabled?: boolean;
    hasSearchQuery: boolean;
}

export function SaveFilterButton({
                                     canAddMore,
                                     onClick,
                                     disabled,
                                     hasSearchQuery
                                 }: SaveFilterButtonProps) {
    const { t } = useTranslation();

    const getPopover = () => {
        if (!canAddMore) {
            return (
                <Popover id="save-filter-limit-popover">
                    <Popover.Body>
                        {t('filters.filterLimit')}
                    </Popover.Body>
                </Popover>
            );
        }

        if (!hasSearchQuery) {
            return (
                <Popover id="save-filter-query-popover">
                    <Popover.Body>
                        {t('filters.searchQueryRequired')}
                    </Popover.Body>
                </Popover>
            );
        }

        return null;
    };

    const button = (
        <Button
            onClick={onClick}
            disabled={disabled || !canAddMore || !hasSearchQuery}
            className="d-inline-flex"
            title={t('filters.saveFilter')}
        >
            <span>{t('filters.saveFilter')}</span>
        </Button>
    );

    const popover = getPopover();
    if (popover) {
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