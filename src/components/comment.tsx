"use client";

import { format, formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
    HandThumbUpIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as ThumbUpSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const key = "114c03ec4d6f40a4a1490a5638d8141d";
export const app = "wycode";

export default function Comment(
    { _id, user, content, to, createTime, like, setReplying, topic }: any,
) {
    const createDate = new Date(createTime);
    const dateDistance = new Date().getTime() - createDate.getTime();
    const date = dateDistance > 3600 * 1000 * 24 * 30
        ? format(createDate, "yyyy-MM-dd")
        : formatDistanceToNow(new Date(createTime), {
            locale: zhCN,
            addSuffix: true,
        });

    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(like);

    function handleLike() {
        if (isLike) {
            return;
        }

        setIsLike(true);
        setLikeCount(likeCount + 1);

        const comment = {
            key,
            app,
            topic,
            toId: _id,
            type: 1,
        };
        fetch("https://wycode.cn/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(comment),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("like->", res);
            });
    }

    function handleReply() {
        setReplying({ _id, user, content });
    }

    return (
        <div className="py-2 border-b border-slate-400/30">
            <div className="flex text-sm">
                <div className="flex flex-col ml-2 flex-1 text-slate-500">
                    <div>{user}</div>
                    <div>{date}</div>
                </div>
                <button
                    className="flex items-center px-2 text-sky-500 hover:text-sky-400"
                    onClick={handleLike}
                >
                    {isLike
                        ? <ThumbUpSolidIcon className="w-4 inline mr-1" />
                        : <HandThumbUpIcon className="w-4 inline mr-1" />}
                    {likeCount}
                </button>
                <button
                    className="flex items-center px-2 rounded text-sky-500 hover:text-sky-400 focus:ring-2"
                    onClick={handleReply}
                >
                    <PaperAirplaneIcon className="w-4 inline mr-1" />回复
                </button>
            </div>
            {to &&
                (
                    <p className="ml-2 mt-2 px-2 py-1 border-l-4 border-sky-500 bg-sky-100 transition-colors duration-700 dark:bg-sky-900 text-sm">
                        <span className="mr-1 text-sky-400">@{to.user}</span>
                        {to.content}
                    </p>
                )}
            <p className="ml-2 mt-2">{content}</p>
        </div>
    );
}