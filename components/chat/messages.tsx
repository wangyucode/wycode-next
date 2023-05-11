import { ServerStackIcon } from "@heroicons/react/24/outline";

export interface Message {
  type: MessageType;
  content?: any;
  time?: Date;
  sender?: string | number;
  isSelf?: boolean;
}

export enum MessageType {
  TEXT = "text",
  PING = "ping",
  PONG = "pong",
  JOIN = "join",
  RECONNECT = "reconnect",
  LEAVE = "leave",
  ERROR = "error",
  CREATED = "created",
  WELCOME = "welcome",
}

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, i) => <Message key={i} message={message} />)}
    </>
  );
}

function Message({ message }: { message: Message }) {
  const isSystem = message.sender === "system";
  const hue = isSystem ? 0 : Number.parseInt(message.sender) * 29;
  return (
    <div
      className={`flex gap-2 mt-2 ${message.isSelf ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className="h-8 w-8 p-1 rounded-lg bg-sky-600 text-center text-white"
        style={hue ? { backgroundColor: `hsl(${hue}, 60%, 40%)` } : {}}
      >
        {isSystem
          ? <ServerStackIcon className="h-full w-full" />
          : (
            <span className="h-full w-full text-white font-bold">
              {message.sender}
            </span>
          )}
      </div>
      <p className="px-2 py-1 bg-white rounded-lg border border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800">
        {message.content}
      </p>
    </div>
  );
}
