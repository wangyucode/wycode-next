'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";



export default function AiButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isSdkScriptReady, setIsSdkScriptReady] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [token, setToken] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isDialogOpen || !isSdkScriptReady) return;
        if (!token) {
            fetchToken();
            return;
        }
        if (isInitialized) return;
        const cozeWebSDK = (window as any).CozeWebSDK;
        new cozeWebSDK.AppWebSDK({
            token,
            "appId": "7562846280679014446",
            "container": "#coze-app",
            "userInfo": {
                "id": "",
                "url": "",
                "nickname": "尊贵的访客"
            }
        });
        setIsInitialized(true);
    }, [isDialogOpen, isSdkScriptReady, token]);

    const handleOpen = () => {
        dialogRef.current?.showModal();
        setIsDialogOpen(true);
    };

    const fetchToken = async () => {
        const res = await fetch('https://wycode.cn/api/v1/coze/token');
        const data = await res.json();
        setToken(data.payload.access_token);
        // const expiresIn = data.payload.expires_in * 1000 - new Date().getTime();
        const expiresIn = 15 * 60 * 1000; // 15分钟
        console.log("token:", data.payload, expiresIn);
        setTimeout(() => {
            setToken("");
            setIsInitialized(false);
        }, expiresIn);
    }

    return (
        <>
            <div className="indicator">
                <span className="indicator-item badge badge-info badge-xs badge-soft badge-outline h-5 w-5 right-1 top-1">AI</span>
                <button className="btn btn-ghost btn-circle" title="AI" onClick={handleOpen}>
                    <img src="/ai.png" alt="AI" className="w-full rounded-full" />
                </button>
            </div>
            <dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef} onClose={() => setIsDialogOpen(false)}>
                <div className="modal-box min-h-3/4 flex flex-col relative items-center justify-center" style={{ transition: "translate .3s ease-out, scale .3s ease-out, box-shadow .3s ease-out" }}>
                    <div className="loading loading-infinity w-16 h-16" title="加载中..."></div>
                    <div id="coze-app" className="absolute top-0 left-0 right-0 bottom-0"></div>
                    <form method="dialog" className="modal-backdrop z-10">
                        <button className="btn btn-sm btn-ghost btn-circle absolute top-2 right-2" title="关闭">
                            <XMarkIcon className="size-5 text-base-content" />
                        </button>
                    </form>
                </div>
            </dialog>
            <Script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/builder-web-sdk/0.1.1-beta.1/dist/umd/index.js" strategy="afterInteractive" onLoad={() => setIsSdkScriptReady(true)} />
        </>
    );
}