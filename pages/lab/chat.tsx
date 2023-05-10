import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatDialog from "../../components/chat/join-dialog";
import Messages, { Message, MessageType } from "../../components/chat/messages";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/modal";
import JoinDialog from "../../components/chat/join-dialog";
import ReconnectDialog from "../../components/chat/reconnect-dialog";
import { ca } from "date-fns/locale";

let ws;
let heartbeat;

export default function Chat() {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isReconnectDialogOpen, setIsReconnectDialogOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let [roomId, setRoomId] = useState("");
  let [userId, setUserId] = useState("");
  let [playerCount, setPlayerCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    showDialog();
    return () => {
      ws?.close();
      clearInterval(heartbeat);
    };
  }, []);

  const showDialog = () => {
    if (localStorage.getItem("chat-rid") && localStorage.getItem("chat-uid")) {
      setIsReconnectDialogOpen(true);
      setIsJoinDialogOpen(false);
    } else {
      setIsJoinDialogOpen(true);
      setIsReconnectDialogOpen(false);
    }
  };

  const setupListeners = () => {
    ws.onopen = () => {
      heartbeat = setInterval(() => {
        ws.send(JSON.stringify({ type: "ping" }));
      }, 5000);
    };
    ws.onmessage = (e) => {
      const msg: Message = JSON.parse(e.data);
      console.log(msg);
      if (msg.type === MessageType.PONG) {
      } else if (msg.type === MessageType.CREATED) {
        roomId = msg.content;
        setRoomId(msg.content);
      } else if (msg.type === MessageType.JOIN) {
        msg.content = `${msg.content}号玩家 加入了房间`;
        setPlayerCount(++playerCount);
        messages.push(msg);
        setMessages([...messages]);
      } else if (msg.type === MessageType.LEAVE) {
        msg.content = `${msg.content}号玩家 离开了房间`;
        setPlayerCount(--playerCount);
        messages.push(msg);
        setMessages([...messages]);
      } else if (msg.type === MessageType.WELCOME) {
        userId = msg.content;
        setUserId(msg.content);
        localStorage.setItem("chat-rid", roomId);
        localStorage.setItem("chat-uid", msg.content);
      } else {
        if (msg.sender === userId) msg.isSelf = true;
        messages.push(msg);
        setMessages([...messages]);
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
      clearInterval(heartbeat);
      setHasError(true);
      setRoomId("");
      setPlayerCount(0);
      setMessages([]);
      showDialog();
    };
  };

  const onJoin = (key) => {
    if (!key) return;
    ws = new WebSocket(`ws://localhost:8083/api/v1/ws/join?type=1&id=${key}`);
    setupListeners();
    setIsJoinDialogOpen(false);
  };

  const onCreate = () => {
    ws = new WebSocket("ws://localhost:8083/api/v1/ws/create?type=1");
    setupListeners();
    setIsJoinDialogOpen(false);
  };

  const reconnect = () => {
  };

  const cancel = () => {
    localStorage.removeItem("chat-rid");
    localStorage.removeItem("chat-uid");
    showDialog();
  };

  const leave = () => {
    ws.send(JSON.stringify({ type: MessageType.LEAVE }));
    cancel();
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
                <span>你是：{userId}号</span>
                <button
                  className="px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                  onClick={leave}
                >
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
      <Modal isOpen={isJoinDialogOpen}>
        <JoinDialog onJoin={onJoin} onCreate={onCreate} hasError={hasError} />
      </Modal>
      <Modal isOpen={isReconnectDialogOpen}>
        <ReconnectDialog onConnect={reconnect} onCancel={cancel} />
      </Modal>
    </Layout>
  );
}