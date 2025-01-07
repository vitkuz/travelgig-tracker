import React from 'react';
import {Navbar as BSNavbar, Container, Badge, Spinner} from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/context';
import { TelegramAuthButton } from "@/component/TelegramAuthButton";
import { LanguageSwitch } from '@/component/LanguageSwitch';
import Image from 'next/image';

export function Navbar() {
    const { user, error, isLoading, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <BSNavbar bg="dark" variant="dark" className="mb-4">
            <Container fluid>
                <div className="d-flex flex-column flex-md-row w-100 gap-3 align-items-center">
                    <BSNavbar.Brand className="oswald d-flex align-items-center gap-2">
                        <Image src="/favicon.png" alt="Logo" width={32} height={32} />
                        Travelgig Tracker
                    </BSNavbar.Brand>
                    <div className="ms-md-auto d-flex flex-column flex-md-row align-items-center gap-3">
                        <LanguageSwitch />
                        {
                            isLoading ? (
                                <>
                                    <Spinner animation="border" size="sm" variant="light"/>
                                </>
                            ) : (
                                !user && <TelegramAuthButton/>
                            )
                        }
                        {user?.isAuthenticated && (
                            <>
                                <div className="d-flex align-items-center">
                                    <span className="text-light me-2">{t('auth.userId')}:</span>
                                    <Badge bg="secondary">{user.userId}</Badge>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="text-light me-2">{t('auth.credits')}:</span>
                                    <Badge bg="success">{user.profile.balance}</Badge>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </BSNavbar>
    );
}