"use client";

import { useEffect, useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Comment from "./comment";
import { key, app } from "./comment";

function BannerMsg({ type, msg }: any) {
    let colorClasses = 'bg-sky-300/50 text-sky-500 border-sky-500 dark:bg-sky-500/50 dark:text-sky-100 dark:border-sky-300'
    if (type === 'error') colorClasses = 'bg-rose-300/50 text-rose-500 border-rose-500 dark:bg-rose-500/50 dark:text-rose-100 dark:border-rose-300'
    return (
        <p className={`py-2 px-4 my-2 rounded-lg border ${colorClasses}`}>{msg}</p>
    );
}

export default function Comments() {
    // 获取当前页面的topic
    if (typeof window !== 'undefined') {
        var topic = window.location.pathname.match(/.*\/([\w-]+)$/)?.[1];
    }

    const [replying, setReplying] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    function onChangeContent(event: any) {
        setError("");
        setInfo("");
        setContent(event.target.value);
    }

    function onChangeEmail(event: any) {
        setError("");
        setInfo("");
        setEmail(event.target.value);
    }

    useEffect(() => {
        if (!topic) return;

        const storedEmail = localStorage.getItem("wycode.username");
        if (storedEmail) setEmail(storedEmail);
        fetch(`https://wycode.cn/api/v1/comment?a=${app}&k=${key}&t=${topic}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("query->", res);
                if (res && res.success) {
                    setComments(res.payload);
                }
            });
    }, [topic]);

    function handleReply() {
        if (!content) {
            setInfo("");
            setError("内容不能为空");
            return;
        }
        if (!/^\S+@\w+(\.[\w]+)+$/.test(email)) {
            setInfo("");
            setError("请输入正确的Email地址。您的Email不会被公开。");
            return;
        }
        localStorage.setItem("wycode.username", email);
        setLoading(true);
        const comment: any = {
            key,
            app,
            topic,
            content,
            user: email,
            to: replying
                ? {
                    user: replying.user,
                    content: replying.content,
                }
                : null,
            like: 0,
            type: 0,
        };
        fetch("https://wycode.cn/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(comment),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("newComment->", res);
                if (res && res.success) {
                    setContent("");
                    setReplying(null);
                    comment._id = res.payload;
                    let username = comment.user.charAt(0);
                    const atIndex = comment.user.lastIndexOf("@");
                    username += new Array(atIndex).fill("*").join("");
                    username += comment.user.substring(atIndex);
                    comment.user = username;
                    comment.createTime = new Date();
                    setComments([...comments, comment]);
                    setInfo("发布成功");
                } else {
                    setError(`发布失败：${res.message}`);
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }

    return (
        <div className="card flex flex-col mt-4 p-4 shadow bg-base-100">
            <h3 className="text-lg font-bold">评论区</h3>
            {comments.length
                ? comments.map((comment: any) => {
                    // 从comment对象中解构出key属性，避免通过展开运算符传递
                    const { key, ...commentProps } = comment;
                    return (
                        <Comment key={comment._id} setReplying={setReplying} {...commentProps} />
                    );
                })
                : <p className="text-slate-500 text-center">暂无评论</p>}
            {replying &&
                (
                    <p className="flex mt-2 px-2 py-1 border-l-4 border-sky-500 bg-sky-100 transition-colors duration-700 dark:bg-sky-900 text-sm">
                        <span className="mr-1 text-sky-400">@{replying.user}</span>
                        <span className="flex-1">{replying.content}</span>
                        <button onClick={() => setReplying(null)}>
                            <XMarkIcon className="w-4 inline" />
                        </button>
                    </p>
                )}
            {error && <BannerMsg type="error" msg={error} />}
            {info && <BannerMsg msg={info} />}
            <textarea
                placeholder="评论内容..."
                rows={3}
                onChange={onChangeContent}
                value={content}
                className="mt-2 py-2 px-4 border bg-slate-500/5 rounded border-slate-400/30"
            >
            </textarea>
            <div className="flex mt-2">
                <input
                    placeholder="邮箱（不会被公开）"
                    value={email}
                    onChange={onChangeEmail}
                    className="grow min-w-0 px-4 py-2 bg-slate-500/5 border rounded-l focus-visible:outline-0 focus-visible:ring-2 border-slate-400/30"
                />
                <button
                    onClick={handleReply}
                    disabled={loading}
                    className="flex items-center min-w-max px-4 py-2 bg-sky-600 disabled:bg-slate-500 hover:bg-sky-500 rounded-r text-slate-100 active:ring-2 disabled:active:ring-0 border-slate-400/30"
                >
                    <PaperAirplaneIcon className="w-4 inline mr-1" />回复
                </button>
            </div>
        </div>
    );
}