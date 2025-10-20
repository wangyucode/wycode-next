'use client';

import Script from "next/script"

export default function Analytics() {
    return (
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4K6SC2FLZE" onLoad={() => {
            const dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) { dataLayer.push(args); }
            gtag('js', new Date());
            gtag('config', 'G-4K6SC2FLZE');
        }} />
    );
}