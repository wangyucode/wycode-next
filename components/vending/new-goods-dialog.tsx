import { useEffect, useState } from "react";
import Modal from "../modal";

export default function NewGoodsDialog({ newGoodsDialogOpen, setNewGoodsDialogOpen }) {

    const [track, setTrack] = useState(null);

    function onSubmit(){

    }

    return (

        <Modal isOpen={newGoodsDialogOpen} setIsOpen={setNewGoodsDialogOpen}>
            <input
                className={'w-full px-2 py-1 rounded border border-slate-400/30 focus-visible:outline-0 focus-visible:ring-2'}
                placeholder="货道号"
                max={110}
                min={1}
                type="number"
                value={track}
                onChange={(e) => {
                    setTrack(e.target.value);
                }}
            />
            <button
                className="w-full mt-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                onClick={onSubmit}
            >
                确定
            </button>
        </Modal>
    )
}