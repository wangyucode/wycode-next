import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ReplyIcon, XIcon} from "@heroicons/react/outline";
import Comment from "./comment";
import BannerMsg from "../banner-msg";

export const key = '114c03ec4d6f40a4a1490a5638d8141d';
export const app = 'wycode'

export default function Comments() {

    const topic = useRouter().asPath.substring(1);
    const [replying, setReplying] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    function onChangeContent(event: any) {
        setError('');
        setInfo('');
        setContent(event.target.value);
    }

    function onChangeEmail(event: any) {
        setError('');
        setInfo('');
        setEmail(event.target.value);
    }

    useEffect(() => {
        const storedEmail = localStorage.getItem('wycode.username');
        if (storedEmail) setEmail(storedEmail);
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
        if (!content) {
            setInfo('');
            setError('内容不能为空');
            return;
        }
        if (!/^\S+@\w+(\.[\w]+)+$/.test(email)) {
            setInfo('');
            setError('请输入正确的Email地址。您的Email不会被公开。');
            return;
        }
        localStorage.setItem('wycode.username', email);
        setLoading(true);
        const comment: any = {
            key,
            app,
            topic,
            content,
            fromUserName: email,
            to: replying ? {
                user: replying.user,
                content: replying.content
            } : null,
            like: 0,
            type: 0
        };
        fetch('https://wycode.cn/node/comments', { method: 'POST', body: JSON.stringify(comment), headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(res => {
                console.log('newComment->', res);
                if (res && res.success) {
                    setContent('');
                    setReplying(null);
                    comment._id = res.payload;
                    let username = comment.fromUserName.charAt(0);
                    const atIndex = comment.fromUserName.lastIndexOf('@');
                    username += new Array(atIndex).fill('*').join('');
                    username += comment.fromUserName.substring(atIndex);
                    comment.user = username;
                    comment.createTime = new Date();
                    setComments([...comments, comment])
                    setInfo('发布成功');
                } else {
                    setError(`发布失败：${res.message}`);
                }
            })
            .catch(setError)
            .finally(()=>setLoading(false));
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
        {error && <BannerMsg type="error" msg={error}/>}
        {info && <BannerMsg msg={info}/>}
        <textarea placeholder="评论内容..."
                  rows={3}
                  onChange={onChangeContent}
                  value={content}
                  className="mt-2 py-2 px-4 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30"></textarea>
        <div className="flex mt-2">
            <input placeholder="邮箱（不会被公开）"
                   value={email}
                   onChange={onChangeEmail}
                   className="flex-1 px-4 py-2 bg-slate-500/5 border rounded-l focus-visible:outline-0 focus-visible:ring-2 border-slate-700/30 dark:border-slate-300/30"/>
            <button
                onClick={handleReply}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-sky-600 disabled:bg-slate-500 hover:bg-sky-700 rounded-r text-slate-100 active:ring-2 disabled:active:ring-0 border-slate-700/30 dark:border-slate-300/30">
                <ReplyIcon className="w-4 inline mr-1"/>回复
            </button>
        </div>
    </div>);
}