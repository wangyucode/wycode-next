"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    let id = localStorage.getItem("ai_chat_user_id");
    if (!id) {
      id = "visitor_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("ai_chat_user_id", id);
    }
    setUserId(id);
  }, []);

  // useChat hook — 转发到 /api/v1/ai
  const [input, setInput] = useState("");
  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/v1/ai",
      body: {
        user_id: userId,
      },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* AI 按钮 — 保持原有 badge 样式 */}
      <div className="indicator">
        <span className="indicator-item badge badge-info badge-xs badge-soft badge-outline h-5 w-5 right-1 top-1">AI</span>
        <button
          className="btn btn-ghost btn-circle"
          title="AI 秘书"
          onClick={() => setIsOpen(true)}
        >
          <img src="/ai.png" alt="AI" className="w-full rounded-full" />
        </button>
      </div>

      {/* 聊天弹窗 */}
      {mounted && isOpen && createPortal(
        <dialog className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box p-0 flex flex-col h-[85vh] sm:h-[70vh] max-w-2xl overflow-hidden shadow-2xl bg-base-100">
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-4 py-3 bg-base-200/80 backdrop-blur z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="/ai.png" alt="AI" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">秘书Agent</h3>
                  <span className="text-xs text-success flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    随时待命
                  </span>
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-base-100">
              {messages.length === 0 && (
                <div className="text-center text-base-content py-10">
                  <p className="text-lg font-medium mb-2">你好呀 👋 我是王郁的秘书Agent</p>
                  <p className="text-sm">关于他的博客、项目或技术栈，都可以问我哦！</p>
                  <p className="text-sm mt-1">有悄悄话，我也可以帮你转达~</p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full border border-base-300">
                        <img src="/ai.png" alt="AI" />
                      </div>
                    </div>
                  )}
                  <div className="chat-header mb-1 opacity-70 text-xs">
                    {msg.role === "user" ? "我" : "秘书Agent"}
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.role === "user" ? "chat-bubble-primary" : "bg-base-200 text-base-content"
                    }`}
                  >
                    {msg.parts?.map((part, index) => {
                      if (part.type === "text") {
                        return msg.role === "assistant" ? (
                          <div key={index} className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {part.text}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div key={index} className="whitespace-pre-wrap">{part.text}</div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}

              {/* 加载指示器 */}
              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full border border-base-300">
                      <img src="/ai.png" alt="AI" />
                    </div>
                  </div>
                  <div className="chat-header mb-1 opacity-70 text-xs">秘书Agent</div>
                  <div className="chat-bubble bg-base-200 text-base-content">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}

              {/* 错误提示 */}
              {error && (
                <div className="flex justify-center mt-4">
                  <div className="alert alert-error text-sm py-2 px-4 rounded-lg">
                    <span>{error.message || "网络异常，请重试"}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-3 bg-base-200/80 backdrop-blur z-10 border-t border-base-300">
              <form onSubmit={handleSubmit} className="join w-full">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                  placeholder="和她说点什么..."
                  className="input input-bordered join-item flex-1 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="btn btn-primary join-item px-6"
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <PaperAirplaneIcon className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsOpen(false)}>关闭</button>
          </form>
        </dialog>,
        document.body
      )}
    </>
  );
}
