'use client'

import { useState } from "react";

interface IframeWithProgressProps {
    src: string;
    className?: string;
}

export default function IframeWithProgress({ src, className }: IframeWithProgressProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex-1 flex flex-col relative">
            {isLoading && (
                <div className="absolute top-0 px-4 w-full z-20">
                    <progress className="progress h-1 progress-primary rounded-none block" />
                </div>
            )}
            <iframe
                className={`flex-1 card shadow border-none w-full bg-base-100 ${className || ''}`}
                src={src}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
