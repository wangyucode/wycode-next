import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ReplyIcon, XIcon} from "@heroicons/react/outline";
import Comment from "./comment";

export const key = '114c03ec4d6f40a4a1490a5638d8141d';
export const app = 'wycode'

export default function Comments() {

    const topic = useRouter().asPath.substring(1);
    const [replying, setReplying] = useState<any>(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://wycode.cn/node/comments?a=${app}&k=${key}&t=${topic}`)
            .then((res) => res.json())
            .then(res => {
                console.log('query->', res);
                if (res && res.success) {
                    setComments(res.payload);
                }
            });
    }, []);

    function handleReply() {
        alert("正在施工...");
        // if (!this.content) {
        //     this.errorMsg = '内容不能为空';
        //     return;
        // }
        // if (!/^\S+@\w+(\.[\w]+)+$/.test(this.username)) {
        //     this.errorMsg = '请输入正确的Email地址。您的Email不会被公开。';
        //     return;
        // }
        // this.loading = true;
        // var comment = {
        //     key: this.key,
        //     app: this.app,
        //     topic: this.path,
        //     content: this.content,
        //     fromUserName: this.username,
        //     to: this.toComment ? {
        //         user: this.toComment.user,
        //         content: this.toComment.content
        //     } : undefined,
        //     like: 0,
        //     type: 0
        // };
        // localStorage.setItem('wycode.username', this.username);
        // fetch(server + '/node/comments', { method: 'POST', body: JSON.stringify(comment), headers: { 'Content-Type': 'application/json' } })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log('newComment->', res);
        //         this.loading = false;
        //         if (res && res.success) {
        //             this.content = '';
        //             this.toComment = null;
        //             comment._id = res.payload;
        //             var username = comment.fromUserName.charAt(0);
        //             var atIndex = comment.fromUserName.lastIndexOf('@');
        //             username += new Array(atIndex).fill('*').join('');
        //             username += comment.fromUserName.substring(atIndex);
        //             comment.user = username;
        //             comment.createTime = "刚刚";
        //             this.comments.push(comment);
        //             this.successMsg = '发布成功';
        //             this.errorMsg = '';
        //         } else {
        //             this.errorMsg = '发布失败：' + res.message
        //         }
        //     });
    }

    return (<div className="flex flex-col border-t w-full border-slate-700/30 dark:border-slate-300/30 mt-8 p-4">
        {comments.length ? comments.map((comment: any) => <Comment key={comment._id}
                                                                   setReplying={setReplying} {...comment}/>) :
            <p className="text-slate-500 text-center">暂无评论</p>}
        {replying &&
            <p className="flex mt-2 px-2 py-1 border-l-4 border-sky-500 bg-sky-100 transition-colors duration-700 dark:bg-sky-900 text-sm">
                <span className="mr-1 text-sky-400">@{replying.user}</span>
                <span className="flex-1">{replying.content}</span>
                <button onClick={() => setReplying(null)}><XIcon className="w-4 inline"/></button>
            </p>}
        <textarea placeholder="评论内容..." rows={3}
                  className="mt-2 py-2 px-4 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30"></textarea>
        <div className="flex mt-2">
            <input placeholder="邮箱（不会被公开）"
                   className="flex-1 px-4 py-2 bg-slate-500/5 border rounded-l focus-visible:outline-0 focus-visible:ring-2 border-slate-700/30 dark:border-slate-300/30"/>
            <button
                onClick={handleReply}
                className="flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-r text-slate-100 active:ring-2 border-slate-700/30 dark:border-slate-300/30">
                <ReplyIcon className="w-4 inline mr-1"/>回复
            </button>
        </div>
    </div>);
}