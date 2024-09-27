import { useEffect, useState } from "react";
import Modal from "../modal";
import FormField from "../form-field";

export default function GoodsDialog({apiKey, goodsDialogOpen, setGoodsDialogOpen, editingGoods,fetchGoods }) {

    const [track, setTrack] = useState(undefined);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(undefined);
    const [stock, setStock] = useState(undefined);
    const [capacity, setCapacity] = useState(undefined);
    const [originalPrice, setOriginalPrice] = useState(undefined);
    const [imageCount, setImageCount] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTrack(editingGoods?.track);
        setName(editingGoods?.name);
        setPrice(editingGoods?.price);
        setStock(editingGoods?.stock);
        setCapacity(editingGoods?.capacity);
        setOriginalPrice(editingGoods?.originalPrice);
        setImageCount(editingGoods?.images.length);
    }, [editingGoods]);

    async function onSubmit() {
        if(!track) return;
        setLoading(true);
        await fetch(`https://wycode.cn/api/v1/vending/goods`, {
            headers: { "X-API-Key": apiKey, "Content-Type": "application/json"},
            method: "PUT",
            body: JSON.stringify({track, name, price, stock, capacity, originalPrice, imageCount})
        });
        fetchGoods();
        setGoodsDialogOpen(false);
        setLoading(false);
    }
    return (
        <Modal isOpen={goodsDialogOpen} setIsOpen={setGoodsDialogOpen}>
            <FormField inputOptions={{
                placeholder: "货道号*",
                max: 110,
                min: 1,
                type: "number",
                value: track,
                onChange: e => setTrack(Number.parseInt(e.target.value))
            }} />

            <FormField inputOptions={{
                placeholder: "名称",
                value: name,
                onChange: e => setName(e.target.value)
            }} />
            <FormField inputOptions={{
                placeholder: "库存",
                value: stock,
                type: "number",
                onChange: e => setStock(Number.parseInt(e.target.value))
            }} />
            <FormField inputOptions={{
                placeholder: "容量",
                value: capacity,
                type: "number",
                onChange: e => setCapacity(Number.parseInt(e.target.value))
            }} />
            <FormField inputOptions={{
                placeholder: "价格（分）",
                value: price,
                type: "number",
                onChange: e => setPrice(Number.parseInt(e.target.value))
            }} />
            <FormField inputOptions={{
                placeholder: "原价（分）",
                value: originalPrice,
                type: "number",
                onChange: e => setOriginalPrice(Number.parseInt(e.target.value))
            }} />
            <FormField inputOptions={{
                placeholder: "详情图数量",
                value: imageCount,
                type: "number",
                onChange: e => setImageCount(Number.parseInt(e.target.value))
            }} />
            <button
                className="w-full px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                onClick={onSubmit}
                disabled={loading}
            >
                确定
            </button>
        </Modal>
    )
}