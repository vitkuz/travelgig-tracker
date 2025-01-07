import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from '@/i18n/context';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container fluid>
                <div className="d-flex flex-column align-items-center gap-3">
                    <div className="d-flex justify-content-center gap-4">
                        <a
                            href="https://t.me/travelgig_bot?start=login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light"
                        >
                            <FontAwesomeIcon icon={faTelegram} size="2x" />
                        </a>
                        <a
                            href="https://www.instagram.com/lily.travelgirl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </div>
                    <div className="text-center">
                        {t('footer.copyright')}
                    </div>
                </div>
            </Container>
        </footer>
    );
}