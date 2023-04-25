import { Fragment, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";

export default function Chat() {
  let [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    //websocket connection
    const ws = new WebSocket("ws://localhost:8083/api/v1/ws/create?type=chat");
    ws.onopen = () => {
      ws.send("Hello, world");
      console.log("connected");
    };
    ws.onmessage = (e) => {
      console.log(e);
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
    return () => { //unmount
      ws.close();
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-full max-w-3xl h-content py-4">
        <div className="grow">
        </div>
        <div className="relative w-full">
          <input className="block w-full h-12 pl-3 pr-12 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30" />
          <button className="absolute right-3 bottom-3 hover:text-slate-800 dark:hover:text-white hover:scale-110 transition-transform">
            <PaperAirplaneIcon className="w-6" />
          </button>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/30 flex min-h-full items-center justify-center p-4 text-center"
      >
        <Transition
          appear
          show={isOpen}
          enter="ease-out duration-2000"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-2000"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
          as={Fragment}
        >
          <Dialog.Panel className="w-full max-w-md overflow-hidden bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800">
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </Layout>
  );
}
