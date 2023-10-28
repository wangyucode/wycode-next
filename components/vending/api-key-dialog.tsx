import { useEffect, useRef, useState } from "react";
import Modal from "../modal";

export default function ApiKeyDialog({ apiKeyModalOpen, setApiKeyModalOpen, setApiKey, wrongApiKey, toggleWrong }) {

    const inputRef = useRef(null);

    function onClickSet() {
        const key = inputRef.current.value;
        key ? setApiKey(key) : toggleWrong(true);
    }

    return (

        <Modal isOpen={apiKeyModalOpen} setIsOpen={setApiKeyModalOpen} canClose={false}>
            <input
                ref={inputRef}
                className={`${wrongApiKey ? "ring-red-500 ring-2 " : ""}w-full px-2 py-1 rounded border border-slate-400/30 focus-visible:outline-0 focus-visible:ring-2`}
                placeholder="API key"
                maxLength={10}
                style={{ animation: `${wrongApiKey ? 'horizontal-shaking 0.5s' : 'none'}` }}
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