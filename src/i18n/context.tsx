import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { en } from './translations/en';
import { ru } from './translations/ru';
import type { Language, LanguageContextType } from './types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const translations = { en, ru };

function getLanguageFromURL(): Language | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    return (lang === 'en' || lang === 'ru') ? lang : null;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

    useEffect(() => {
        const urlLang = getLanguageFromURL();
        if (urlLang) {
            setLanguage(urlLang);
        }
    }, [setLanguage]);

    const t = useCallback((key: string, params?: Record<string, string | number>) => {
        const keys = key.split('.');
        let value = keys.reduce((obj, key) => obj?.[key], translations[language] as any);

        if (typeof value !== 'string') {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        if (params) {
            Object.entries(params).forEach(([key, val]) => {
                value = value.replace(`{${key}}`, String(val));
            });
        }

        return value;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}