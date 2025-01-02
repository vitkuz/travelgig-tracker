import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from '@/i18n/context';

const TELEGRAM_BOT_URL = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL;

export function TelegramAuthButton() {
    const { t } = useTranslation();

    const handleLogin = () => {
        if (!TELEGRAM_BOT_URL) {
            console.error('Telegram bot URL is not configured');
            return;
        }
        window.open(`${TELEGRAM_BOT_URL}?start=login`, '_blank', 'noopener,noreferrer');
    };

    return (
        <Button
            variant="primary"
            onClick={handleLogin}
            className="d-flex align-items-center gap-2"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.892-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.016.122.033.391.019.482z"/>
            </svg>
            {t('auth.loginWithTelegram')}
        </Button>
    );
}