'use client'

import { useCallback, useEffect, useRef, useState } from "react";

// 子页面校验的消息来源，写死不能用 '*'
const THEME_TARGET_ORIGIN = 'https://wycode.cn';

type Theme = 'cupcake' | 'luxury';

interface IframeWithProgressProps {
    src: string;
    className?: string;
    // 是否把主站主题同步给 iframe：首帧带 query，之后走 postMessage
    syncTheme?: boolean;
}

// 站点只有 cupcake / luxury 两个主题，其它值一律按亮色处理
function getCurrentTheme(): Theme {
    return document.documentElement.dataset.theme === 'luxury' ? 'luxury' : 'cupcake';
}

// src 本身可能已经带 query，用 URL 对象拼接 theme 参数
function withThemeQuery(src: string): string {
    try {
        const url = new URL(src, window.location.href);
        url.searchParams.set('theme', getCurrentTheme());
        return url.toString();
    } catch (error) {
        console.warn('iframe 地址解析失败:', error);
        return src;
    }
}

export default function IframeWithProgress({ src, className, syncTheme = false }: IframeWithProgressProps) {
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    // 开启同步时首帧地址要等客户端挂载后才能算（服务端没有 document，硬算会造成 hydration 不一致），
    // 算出来之后就锁死：主题变化绝不改 src，否则 iframe 整页重载会闪屏
    const [themedSrc, setThemedSrc] = useState<string>();

    const postTheme = useCallback(() => {
        iframeRef.current?.contentWindow?.postMessage(
            { type: 'theme', theme: getCurrentTheme() },
            THEME_TARGET_ORIGIN
        );
    }, []);

    useEffect(() => {
        if (!syncTheme) return;

        // 只在第一次计算，之后不再覆盖
        setThemedSrc(prev => prev ?? withThemeQuery(src));

        // 创建并启动MutationObserver监听主题变化
        try {
            const observer = new MutationObserver(() => {
                postTheme();
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });

            // 清理函数
            return () => observer.disconnect();
        } catch (error) {
            console.warn('主题变化监听失败:', error);
        }
    }, [syncTheme, src, postTheme]);

    const handleLoad = () => {
        // 地址还没算出来时 iframe 停在 about:blank，浏览器同样会触发 load，忽略掉
        if (syncTheme && !themedSrc) return;
        setIsLoading(false);
        // iframe 里的 message 监听可能刚绑好，加载完成后补发一次当前主题
        if (syncTheme) postTheme();
    };

    return (
        <div className="flex-1 flex flex-col relative">
            {isLoading && (
                <div className="absolute top-0 px-4 w-full z-20">
                    <progress className="progress h-1 progress-primary rounded-none block" />
                </div>
            )}
            <iframe
                ref={iframeRef}
                className={`flex-1 card shadow border-none w-full bg-base-100 ${className || ''}`}
                src={syncTheme ? themedSrc : src}
                onLoad={handleLoad}
            />
        </div>
    );
}
