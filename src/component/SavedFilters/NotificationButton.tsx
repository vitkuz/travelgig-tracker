import React from 'react';
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons';
// import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';

interface NotificationButtonProps {
    hasNotification: boolean;
    onClick: () => void;
    disabled?: boolean;
    isToggling: boolean;
}

export function NotificationButton({
                                       hasNotification,
                                       onClick,
                                       disabled,
                                       isToggling
                                   }: NotificationButtonProps) {
    const { t } = useTranslation();

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="notification-tooltip">
                    {t('notifications.tooltip')}
                </Tooltip>
            }
        >
            <span>
                <Button
                    variant={hasNotification ? "success" : "outline-secondary"}
                    size="sm"
                    onClick={onClick}
                    disabled={disabled || isToggling}
                >
                    {isToggling ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-1"
                            />
                            {t('common.updating')}
                        </>
                    ) : (
                        <FontAwesomeIcon icon={hasNotification ? faBellSolid : faBellSolid} />
                    )}
                </Button>
            </span>
        </OverlayTrigger>
    );
}