import { useEffect, useState } from "react";

import CodeDialog from "./code-dialog";
import { Tag } from "antd";

export default function Codes({ apiKey, tracks }) {
    const [codeDialogOpen, setCodeDialogOpen] = useState(false);
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        if (apiKey) fetchCodes();
    }, [apiKey]);


    function newCode() {
        setCodeDialogOpen(true);
    }

    async function fetchCodes() {
        const res = await fetch("https://wycode.cn/api/v1/vending/code", { headers: { "X-API-Key": apiKey } });
        if (res.status == 200) {
            const data = await res.json();
            if (data.success) {
                setCodes(data.payload);
            }
        }
    }


    return (
        <>
            <div className="p-2">
                <button
                    className="w-full mb-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                    onClick={newCode}>新增取货码</button>

                {codes.map(t => (
                    <div className="border-b flex items-center" key={t._id}>
                        <div className="flex text-sm p-2 gap-2">
                            <strong>{t.code}</strong>
                            {t.goods.map(g => <Tag key={g.track} color="blue">{g.track}号{g.count}件</Tag>)}
                        </div>
                    </div>
                )
                )}
            </div>
            <CodeDialog {...{ apiKey,codeDialogOpen, setCodeDialogOpen, tracks, fetchCodes }} />
        </>

    )
}


