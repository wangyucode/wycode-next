"use client";
import { useEffect } from 'react';

interface BlogViewCounterProps {
    postId: string;
}

export default function BlogViewCounter({ postId }: BlogViewCounterProps) {
    useEffect(() => {
        if (window.location.hostname === 'localhost') return;
        fetch(`https://wycode.cn/api/v1/blog-view?id=${postId}`);
    }, [postId]);

    return null; // 这个组件不渲染任何可见内容
}