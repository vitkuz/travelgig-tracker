import React from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import type { SavedFilter } from '@/types/filters';
import { formatDate } from '@/utils/date';
import { NotificationButton } from './NotificationButton';
import { useTranslation } from '@/i18n/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faGlobe, faIndustry, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

interface FilterCardProps {
    filter: SavedFilter;
    onDelete: (id: string) => void;
    onApply: () => void;
    onToggleNotification: (id: string) => void;
    isDeleting: boolean;
    isTogglingNotification: boolean;
}

export function FilterCard({
                               filter,
                               onDelete,
                               onApply,
                               onToggleNotification,
                               isDeleting,
                               isTogglingNotification
                           }: FilterCardProps) {
    const { t, language } = useTranslation();
    const { user } = useAuth();

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        {
                            filter.name && (
                                <h5 className="mb-1">{filter.name}</h5>
                            )
                        }
                        {
                            filter.createdAt && (
                                <div className="text-muted">
                                    {t('filters.createdAt', {date: formatDate(filter.createdAt, language)})}
                                </div>
                            )
                        }
                    </div>
                    <div className="d-flex gap-2">
                        {user?.isAuthenticated && (
                            <NotificationButton
                                hasNotification={filter.hasNotification}
                                onClick={() => onToggleNotification(filter.id)}
                                disabled={isDeleting}
                                isToggling={isTogglingNotification}
                            />
                        )}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(filter.id)}
                            disabled={isDeleting || isTogglingNotification}
                        >
                            {isDeleting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-1"
                                    />
                                    {t('common.deleting')}
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                                    {t('common.delete')}
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mb-3">
                    {/*<p className="mb-2">{t('filters.activeFilters')}</p>*/}
                    <div className="d-flex flex-wrap gap-2">
                        {filter.timeFilter && (
                            <Badge bg="info" className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faClock} />
                                {filter.timeFilter}
                            </Badge>
                        )}
                        {filter.domainFilter && (
                            <Badge bg="info" className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faGlobe} />
                                {filter.domainFilter}
                            </Badge>
                        )}
                        {filter.industryFilter && (
                            <Badge bg="info" className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faIndustry} />
                                {filter.industryFilter}
                            </Badge>
                        )}
                        {filter.showLiked && (
                            <Badge bg="info" className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faHeart} />
                                {t('filters.likedOnly')}
                            </Badge>
                        )}
                        {filter.searchQuery && (
                            <Badge bg="info" className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faSearch} />
                                {filter.searchQuery}
                            </Badge>
                        )}
                        {!filter.timeFilter && !filter.domainFilter && !filter.industryFilter && !filter.showLiked && !filter.searchQuery && (
                            <span className="text-muted">{t('filters.noActiveFilters')}</span>
                        )}
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={onApply}
                    className="w-100"
                    disabled={isDeleting || isTogglingNotification}
                >
                    {t('filters.applyFilter')}
                </Button>
            </Card.Body>
        </Card>
    );
}