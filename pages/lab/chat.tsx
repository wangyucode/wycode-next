import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import JoinChatDialog from "../../components/chat/join-dialog";

export default function Chat() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
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

  const onJoin = (key) => {
    if (!key) return;
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col p-4 mx-auto w-full max-w-3xl h-content gap-2">
        <div className="grow">
        </div>
        <div className="relative w-full">
          <input className="block w-full h-12 pl-3 pr-12 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30" />
          <button className="absolute right-3 bottom-3 hover:text-slate-800 dark:hover:text-white hover:scale-110 transition-transform">
            <PaperAirplaneIcon className="w-6" />
          </button>
        </div>
      </div>
      <JoinChatDialog open={isDialogOpen} onJoin={onJoin} />
    </Layout>
  );
}
