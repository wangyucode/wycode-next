import { useState } from "react";
import Layout from "../../components/layout";
import ApiKeyDialog from "../../components/vending/api-key-dialog";
import NewGoodsDialog from "../../components/vending/new-goods-dialog";

export default function Vending() {
    const [tracks, setTracks] = useState([]);
    const [newGoodsDialogOpen, setNewGoodsDialogOpen] = useState(false);

    return (
        <Layout>
            <div className="p-2">
                <button
                    className="w-full mb-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                    onClick={()=>setNewGoodsDialogOpen(true)}
                >新增商品</button>

                {tracks.map(t => (
                    <div className="border-b flex items-center">
                        <img src={t.mainImg} width={64} height={64} alt="mainImg" />
                        <div className="flex flex-col text-sm px-2 items-start">
                            <p>{t.name}</p>
                            <p><span className="rounded bg-sky-500 text-white font-bold px-1 mr-2">{t.type}</span>详情图：{t.images.length}张</p>
                            <p><span className="rounded bg-green-500 text-white font-bold px-1 mr-2">{t.track}</span><span className="text-red-500 font-bold mr-2">{(t.price / 100).toFixed(2)}</span><span className="line-through mr-2">{(t.originalPrice / 100).toFixed(2)}</span>剩{t.stock}件</p>
                        </div>
                    </div>
                )
                )}
            </div>

            <ApiKeyDialog setTracks={setTracks} />
            <NewGoodsDialog newGoodsDialogOpen={newGoodsDialogOpen} setNewGoodsDialogOpen={setNewGoodsDialogOpen} />
        </Layout>
    );
}