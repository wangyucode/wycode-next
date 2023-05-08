import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function JoinChatDialog(
  { open, hasError, onJoin, onCreate }: {
    open: boolean;
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
      }, 1000);
    }
  }, [hasError]);

  const onClickJoin = () => {
    onJoin(key);
  };

  return (
    <Transition
      appear
      show={open}
    >
      <Dialog
        onClose={() => {}}
        className="fixed inset-0 bg-black/30 flex min-h-full items-center justify-center p-4 text-center"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="scale-50"
          enterTo="scale-100"
          leave="ease-in duration-200"
          leaveFrom="scale-100"
          leaveTo="scale-50"
        >
          <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800">
            <ul className="text-left text-sm">
              <li>💡 请输入房间号加入聊天室</li>
              <li>🔒 所有人退出房间后, 聊天记录自动清空</li>
            </ul>

            <div className="mt-2 flex gap-2">
              <input
                className={`${
                  hasErrorRing ? "ring-red-500 ring-2 " : ""
                }grow px-2 py-1 rounded border border-slate-700/30 dark:border-slate-300/30 focus-visible:outline-0 focus-visible:ring-2`}
                placeholder="房间号"
                maxLength={4}
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                }}
              />
              <button
                className="px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                onClick={onClickJoin}
              >
                加入
              </button>
            </div>
            <div className="my-2 flex gap-2 items-center">
              <div className="grow h-px bg-slate-700/30 dark:bg-slate-300/30" />
              或
              <div className="grow h-px bg-slate-700/30 dark:bg-slate-300/30" />
            </div>
            <button
              className="w-full px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
              onClick={onCreate}
            >
              创建房间
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
