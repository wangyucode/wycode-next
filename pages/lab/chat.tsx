import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import JoinChatDialog from "../../components/chat/join-dialog";
import Messages, { Message, MessageType } from "../../components/chat/messages";
import { XMarkIcon } from "@heroicons/react/24/outline";

let ws;
let heartbeat;

export default function Chat() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  let [playerCount, setPlayerCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return () => {
      ws?.close();
      heartbeat?.clearInterval();
    };
  }, []);

  const setupListeners = () => {
    ws.onopen = () => {
      heartbeat = setInterval(() => {
        ws.send(JSON.stringify({ type: "ping" }));
      }, 5000);
      setIsDialogOpen(false);
    };
    ws.onmessage = (e) => {
      const msg: Message = JSON.parse(e.data);
      if (msg.type === MessageType.PONG) {
      } else if (msg.type === MessageType.CREATED) {
        setRoomId(msg.content);
      } else if (msg.type === MessageType.JOIN) {
        msg.content = `${msg.content.id}号玩家 加入了房间`;
        setPlayerCount(++playerCount);
        messages.push(msg);
        setMessages([...messages]);
      } else {
        messages.push(msg);
        setMessages([...messages]);
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 0);
    };
  };

  const onJoin = (key) => {
    if (!key) return;
    ws = new WebSocket(`ws://localhost:8083/api/v1/ws/join?type=1&id=${key}`);
    setupListeners();
  };

  const onCreate = () => {
    ws = new WebSocket("ws://localhost:8083/api/v1/ws/create?type=1");
    setupListeners();
  };

  const send = () => {
    if (!message) return;
    ws.send(JSON.stringify({ type: MessageType.TEXT, content: message }));
    setMessage("");
  };

  return (
    <Layout>
      <div className="flex flex-col p-4 mx-auto w-full max-w-3xl h-content gap-2">
        <div className="grow">
          <div className="flex gap-2 justify-between border-b pb-2 border-slate-700/30 dark:border-slate-300/30">
            {roomId && (
              <>
                <span>房间号：{roomId}</span>
                <span>玩家数量：{playerCount}</span>
                <button className="px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2">
                  <XMarkIcon className="w-6" />
                </button>
              </>
            )}
          </div>

          <Messages messages={messages} />
        </div>
        <div className="relative w-full">
          <input
            className="block w-full h-12 pl-3 pr-12 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="absolute right-3 bottom-3 hover:text-slate-800 dark:hover:text-white hover:scale-110 transition-transform"
            onClick={send}
          >
            <PaperAirplaneIcon className="w-6" />
          </button>
        </div>
      </div>
      <JoinChatDialog
        open={isDialogOpen}
        onJoin={onJoin}
        onCreate={onCreate}
        hasError={hasError}
      />
    </Layout>
  );
}
