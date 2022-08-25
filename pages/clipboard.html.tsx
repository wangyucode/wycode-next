import Image from "next/image";

import Layout from "../components/layout";
import BannerMsg from "../components/banner-msg";
import clipboardImg from "../public/lab/clipboard.jpg";
import { ArrowLeftIcon, MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Comments from "../components/comment/comments";
import { KeyCode } from "../components/types";

export default function Clipboard() {

    const queryRef = useRef<HTMLInputElement>(null);
    const [showResult, setShowResult] = useState(false);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');

    useEffect(() => {
        queryRef?.current?.focus();
    },[]);

    function query(event: any) {
        event.preventDefault();
        if (key.length < 4) {
            setError('查询码不正确！');
            return;
        }
        setLoading(true);
        fetch(`https://wycode.cn/node/clipboard/${key}`)
            .then((res) => res.json())
            .then(res => {
                console.log('query->', res);
                if (res && res.success) {
                    setShowResult(true);
                    setContent(res.payload.content);
                } else {
                    setError('查询码不正确！');
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }

    function save(event: any) {
        event.preventDefault();
        setLoading(true);
        const data = {
            _id: key,
            content
        };
        fetch('https://wycode.cn/node/clipboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log('handleSave->', res);
                if (res && res.success) {
                    alert('保存成功！');
                } else {
                    setError('保存失败！');
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));

    }

    function changeKey(event: any) {
        setError('');
        setKey(event.target.value);
    }

    function changeContent(event: any) {
        setContent(event.target.value);
    }

    function onClickReturn() {
        setShowResult(false);
    }

    function onKeyUpQuery(event: any) {
        if(event.keyCode === KeyCode.Enter){
            query(event);
        }
    }

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
                {showResult ? (
                    <div className="w-full sm:w-96 md:w-[32rem] lg:w-[56rem]">
                        <textarea
                            className="block h-96 w-full py-2 px-4 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30"
                            disabled={loading}
                            value={content}
                            onChange={changeContent}
                            maxLength={5000}
                            autoFocus
                        />
                        {error && <BannerMsg type="error" msg={error} />}
                        <button
                            onClick={save}
                            disabled={loading}
                            className="px-4 py-2 w-full block mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-green-600 hover:bg-green-500 active:ring-2">
                            <CheckIcon className="w-4 inline mr-1" />保存
                        </button>
                        <button
                            disabled={loading}
                            onClick={onClickReturn}
                            className="px-4 py-2 w-full mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2">
                            <ArrowLeftIcon className="w-4 inline mr-1" />返回
                        </button>
                    </div>
                ) : (
                    <div className="w-full sm:w-96 flex flex-col">
                        <BannerMsg type="info" msg="跨平台剪切板2.0已上线，获取新版查询码请扫描下方小程序码，查看属于自己的剪切板！" />
                        <div className="mx-auto"><Image src={clipboardImg} /></div>
                        {error && <BannerMsg type="error" msg={error} />}
                        <input type="text"
                            autoFocus
                            maxLength={5}
                            disabled={loading}
                            className="px-4 py-2 bg-slate-500/5 rounded border border-slate-700/30 dark:border-slate-300/30 focus-visible:outline-0 focus-visible:ring-2"
                            onChange={changeKey}
                            onKeyUp={onKeyUpQuery}
                            value={key}
                            ref={queryRef}
                            placeholder="查询码（在小程序获得）" />
                        <button
                            onClick={query}
                            disabled={loading}
                            className="px-4 py-2 mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2">
                            <MagnifyingGlassIcon className="w-4 inline mr-1" />查询
                        </button>
                    </div>
                )}
                <Comments />
            </div>
        </Layout>
    );
}