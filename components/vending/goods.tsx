import { useEffect, useState } from "react";
import ApiKeyDialog from "./api-key-dialog";
import GoodsDialog from "./goods-dialog";

export default function Goods({apiKey, setApiKey}) {
    const [tracks, setTracks] = useState([]);
    const [goodsDialogOpen, setGoodsDialogOpen] = useState(false);
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(true);
    const [editingGoods, setEditingGoods] = useState(null);
    const [wrongApiKey, setWrongApiKey] = useState(false);

    useEffect(() => {
        if (apiKey) fetchGoods();
    }, [apiKey]);

    async function fetchGoods() {
        const res = await fetch("https://wycode.cn/api/v1/vending/goods", { headers: { "X-API-Key": apiKey } });
        if (res.status == 200) {
            const data = await res.json();
            if (data.success) {
                setApiKeyModalOpen(false);
                setTracks(data.payload);
                localStorage.setItem("vending-api-key", apiKey);
            }
        } else {
            setApiKey('');
            toggleWrong();
        }
    }

    function toggleWrong() {
        setWrongApiKey(true);
        setTimeout(() => setWrongApiKey(false), 500);
    }

    function newGoods() {
        setEditingGoods(null);
        setGoodsDialogOpen(true);
    }

    function editGoods(t) {
        setEditingGoods(t);
        setGoodsDialogOpen(true);
    }

    return (
        <>
            <div className="p-2">
                <button
                    className="w-full mb-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                    onClick={newGoods}
                >新增商品</button>

                {tracks.map(t => (
                    <div className="border-b flex items-center" key={t.track} onClick={() => editGoods(t)}>
                        <img src={t.mainImg} width={64} height={64} alt="mainImg" />
                        <div className="flex flex-col text-sm px-2 items-start">
                            <p>{t.name}</p>
                            <p><span className="rounded bg-sky-500 text-white font-bold px-1 mr-2">{t.type}</span>详情图：{t.images.length}张</p>
                            <p><span className="rounded bg-green-500 text-white font-bold px-1 mr-2">{t.track}</span><span className="text-red-500 font-bold mr-2">{(t.price / 100).toFixed(2)}</span><span className="line-through mr-2">{(t.originalPrice / 100).toFixed(2)}</span><span className="mr-2">剩{t.stock}件</span>{t.capacity || 0 - t.stock}空位</p>
                        </div>
                    </div>
                )
                )}
            </div>

            <ApiKeyDialog {...{ setApiKey, apiKeyModalOpen, setApiKeyModalOpen, wrongApiKey, toggleWrong }} />
            <GoodsDialog {...{ apiKey, goodsDialogOpen, setGoodsDialogOpen, editingGoods }} />
        </>
    );
}