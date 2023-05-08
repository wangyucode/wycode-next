import { ServerStackIcon } from "@heroicons/react/24/outline";

export interface Message {
  type: MessageType;
  content?: any;
  time?: Date;
  sender?: string;
}

export enum MessageType {
  TEXT = "text",
  PING = "ping",
  PONG = "pong",
  JOIN = "join",
  LEAVE = "leave",
  ERROR = "error",
  CREATED = "created",
}

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, i) => (
        <div key={i} className="flex gap-2 mt-2">
            <div className="h-8 w-8 p-1 rounded-lg bg-sky-600">
                <ServerStackIcon className="h-full w-full" />
            </div>
            <p className="px-2 py-1 bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800">{message.content}</p>
          
        </div>
      ))}
    </>
  );
}
