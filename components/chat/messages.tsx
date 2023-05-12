import { ServerStackIcon } from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";

export interface Message {
  type: MessageType;
  content?: any;
  time?: string;
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
  OFFLINE = "offline",
  ERROR = "error",
  CREATED = "created",
  WELCOME = "welcome",
}

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, i) => (
        <Message key={i} message={message} lastMessage={messages[i - 1]} />
      ))}
    </>
  );
}

function Message(
  { message, lastMessage }: { message: Message; lastMessage?: Message },
) {
  const isSystem = message.sender === "system";
  const hue = isSystem ? 0 : Number.parseInt(message.sender as string) * 29;
  const lastSentTime = parseISO(lastMessage?.time)?.getTime() || 0;
  const time = parseISO(message.time).getTime() - lastSentTime > 1000 * 60
    ? format(parseISO(message.time) , "HH:mm")
    : null;
  return (
    <>
      {time && (
        <p className="text-center text-xs">
          {time}
        </p>
      )}
      <div
        className={`flex gap-2 mt-2 ${
          message.isSelf ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className="h-8 w-8 shrink-0 p-1 rounded-lg bg-sky-600 text-center text-white"
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
        <p className="px-2 py-1 break-all rounded-lg border border-slate-400/30">
          {message.content}
        </p>
        <div className="w-8 shrink-0"></div>
      </div>
    </>
  );
}
