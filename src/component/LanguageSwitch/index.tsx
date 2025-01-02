import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';
import type { Language } from '@/i18n/types';

export function LanguageSwitch() {
    const { language, setLanguage } = useTranslation();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            variant="outline-light"
            size="sm"
            onClick={toggleLanguage}
        >
            {language === 'en' ? 'RU' : 'EN'}
        </Button>
    );
}