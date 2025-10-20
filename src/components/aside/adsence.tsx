'use client';

import Script from "next/script";

export function AdSenseCard() {
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <AdSenseContent />
            </div>
        </div>
    )
}

export function AdSenseContent() {
    return (
        <>
            <Script
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4650660107955528"
                crossOrigin="anonymous"
                onLoad={() => {
                    ((window as any).adsbygoogle || []).push({});
                }}
            />
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4650660107955528"
                data-ad-slot="6505490608"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </>
    )
}