import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function JoinDialog(
  { hasError, onJoin, onCreate }: {
    hasError: boolean;
    onJoin: (key: string) => void;
    onCreate: () => void;
  },
) {
  const [key, setKey] = useState("");
  const [hasErrorRing, setHasErrorRing] = useState(false);

  useEffect(() => {
    if (hasError) {
      setHasErrorRing(true);
      setKey("");
      setTimeout(() => {
        setHasErrorRing(false);
      }, 2000);
    }
  }, [hasError]);

  const onClickJoin = () => {
    onJoin(key);
  };

  return (
    <>
      <ul className="text-left text-sm">
        <li>💡 请输入房间号加入房间</li>
        <li>🔒 所有人退出房间后, 记录会被清理</li>
      </ul>

      <div className="mt-2 flex gap-2">
        <input
          className={`${
            hasErrorRing ? "ring-red-500 ring-2 " : ""
          }grow px-2 py-1 rounded border border-slate-400/30 focus-visible:outline-0 focus-visible:ring-2`}
          placeholder="房间号"
          maxLength={4}
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
          onKeyUp={(e) => {if (e.key === "Enter") onClickJoin()}}
        />
        <button
          className="px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
          onClick={onClickJoin}
        >
          加入
        </button>
      </div>
      <div className="my-2 flex gap-2 items-center">
        <div className="grow h-px border-slate-400/30" />
        或
        <div className="grow h-px border-slate-400/30" />
      </div>
      <button
        className="w-full px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
        onClick={onCreate}
      >
        创建房间
      </button>
    </>
  );
}
