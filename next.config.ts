import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: { unoptimized: true },
    crossOrigin: 'anonymous',
    env: {
        NEXT_PUBLIC_WEBSOCKET_URL: 'wss://mr35py1rf2.execute-api.us-east-1.amazonaws.com/prod/',
        AUTH_API: 'https://ipgz7wpkd3.execute-api.us-east-1.amazonaws.com/prod/auth/validate',
    }
};

export default nextConfig;
