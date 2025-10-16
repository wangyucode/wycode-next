"use client";
import { useEffect } from 'react';

interface PageViewCounterProps {
    postId: string;
}

export default function PageViewCounter({ postId }: PageViewCounterProps) {
    useEffect(() => {
        if (window.location.hostname === 'localhost') return;
        fetch(`https://wycode.cn/api/v1/blog-view?id=${postId}`);
    }, [postId]);

    return null; // 这个组件不渲染任何可见内容
}