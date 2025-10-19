'use client'

import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
}

export default function AiButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    function handleOpen() {
        dialogRef.current?.showModal();
    }

    const handleSend = () => {
        if (inputValue.trim()) {
            const newUserMessage: Message = {
                id: Date.now().toString(),
                content: inputValue.trim(),
                sender: 'user'
            };

            setMessages([...messages, newUserMessage]);
            setInputValue('');

            // 模拟AI回复
            setTimeout(() => {
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    content: `我正在思考您的问题："${inputValue.trim()}"。请稍等片刻...`,
                    sender: 'ai'
                };
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handlePresetQuestion = (question: string) => {
        const presetMessage: Message = {
            id: Date.now().toString(),
            content: question,
            sender: 'user'
        };

        setMessages([...messages, presetMessage]);

        // 模拟AI回复预置问题
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: `这是关于"${question}"的回答。我会根据相关内容为您提供详细信息。`,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const presetQuestions = [
        "你是谁？你能做什么？",
        "请推荐几个有关<Docker>的文章",
        "你如何评价王郁？"
    ];

    return (
        <>
            <div className="indicator">
                <span className="indicator-item badge badge-info badge-xs badge-soft badge-outline h-5 w-5 right-1 top-1">AI</span>
                <button className="btn btn-ghost btn-circle" title="AI" onClick={handleOpen}>
                    <img src="/ai.png" alt="AI" className="w-full rounded-full" />
                </button>
            </div>
            <dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
                <div className="modal-box min-h-1/2 flex flex-col" style={{ transition: "translate .3s ease-out, scale .3s ease-out, box-shadow .3s ease-out;" }}>
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-ghost btn-circle absolute top-2 right-2" title="关闭">
                            <XMarkIcon className="size-5 text-base-content" />
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">
                        王郁的秘书
                    </h3>

                    {/* 聊天内容区域 */}
                    <div className="flex-1 overflow-y-auto mb-4 p-2">
                        {messages.length === 0 ? (
                            // 初始状态展示
                            <div className="flex flex-col items-center justify-center h-full py-8 space-y-6">
                                <img
                                    src="/ai.png"
                                    alt="AI Assistant"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                                />
                                <p className="text-center text-base-content/80 max-w-xs">
                                    我是王郁的AI助手，有什么想问的？
                                </p>
                                <div className="w-full space-y-2">
                                    {presetQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePresetQuestion(question)}
                                            className="w-full text-left px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // 消息列表
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                                                ? 'bg-primary text-primary-content rounded-tr-none'
                                                : 'bg-base-200 rounded-tl-none'}`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* 输入区域 */}
                    <div className="join w-full">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="输入问题..."
                            className="join-item input flex-1"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="join-item btn btn-primary"
                        >
                            <PaperAirplaneIcon className="size-5" />
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}