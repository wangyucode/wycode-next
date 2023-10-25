import { useEffect, useState } from "react";
import Modal from "../modal";

export default function ApiKeyDialog({setTracks}) {
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(true);
    const [hasErrorRing, setHasErrorRing] = useState(false);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const cachedKey = localStorage.getItem("vending-api-key");
        if (cachedKey) fetchGoods(cachedKey);
    }, []);

    function onClickSet() {
        if (apiKey) {
            fetchGoods(apiKey);
        } else {
            setHasErrorRing(true);
        }
    }

    async function fetchGoods(key: string) {
        const res = await fetch("https://wycode.cn/api/v1/vending/goods", { headers: { "X-API-Key": key } });
        if (res.status == 200) {
            const data = await res.json();
            if (data.success) {
                setApiKeyModalOpen(false);
                setTracks(data.payload);
                localStorage.setItem("vending-api-key", key);
            }
        } else {
            setHasErrorRing(true);
        }
    }

    return (

        <Modal isOpen={apiKeyModalOpen} setIsOpen={setApiKeyModalOpen} canClose={false}>
            <input
                className={`${hasErrorRing ? "ring-red-500 ring-2 " : ""
                    }w-full px-2 py-1 rounded border border-slate-400/30 focus-visible:outline-0 focus-visible:ring-2`}
                placeholder="API key"
                maxLength={10}
                value={apiKey}
                onChange={(e) => {
                    setHasErrorRing(false);
                    setApiKey(e.target.value);
                }}
                onKeyUp={(e) => { if (e.key === "Enter") onClickSet() }}
            />
            <button
                className="w-full mt-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                onClick={onClickSet}
            >
                确定
            </button>
        </Modal>
    )
}