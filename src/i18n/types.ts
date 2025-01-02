export type TranslationKey = keyof typeof import('./translations/en').en;
export type NestedKeyOf<T> = T extends object ? {
    [K in keyof T]: `${K & string}${T[K] extends object ? `.${NestedKeyOf<T[K]>}` : ''}`
}[keyof T] : never;

export type Language = 'en' | 'ru';

export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}