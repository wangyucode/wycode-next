import Image from "next/image";

import Layout from "../components/layout";
import BannerMsg from "../components/banner-msg";
import clipboardImg from "../public/lab/clipboard.jpg";
import { ArrowLeftIcon, SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Comments from "../components/comment/comments";

export default function Clipboard() {

    const [showResult, setShowResult] = useState(false);
    const [content, setContent] = useState('');
    const [remark, setRemark] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');

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
                    setRemark(res.payload.tips);
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
            content,
            tips: remark
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

    function changeRemark(event: any) {
        setRemark(event.target.value);
    }

    function onClickReturn() {
        setShowResult(false);
    }

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
                {showResult ? (
                    <form className="w-full sm:w-96 md:w-[32rem] lg:w-[56rem]" onSubmit={save}>
                        <textarea
                            className="block h-96 w-full py-2 px-4 border bg-slate-500/5 rounded border-slate-700/30 dark:border-slate-300/30"
                            disabled={loading}
                            value={content}
                            onChange={changeContent}
                            maxLength={5000}
                            autoFocus
                        />
                        <input type="text"
                            maxLength={1024}
                            disabled={loading}
                            className="block w-full mt-2 px-4 py-2 bg-slate-500/5 rounded border border-slate-700/30 dark:border-slate-300/30 focus-visible:outline-0 focus-visible:ring-2"
                            onChange={changeRemark}
                            value={remark}
                            placeholder="备注" />
                        {error && <BannerMsg type="error" msg={error} />}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 w-full block mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-green-600 hover:bg-green-500 active:ring-2">
                            <SearchIcon className="w-4 inline mr-1" />保存
                        </button>
                        <button
                            disabled={loading}
                            onClick={onClickReturn}
                            className="px-4 py-2 w-full mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2">
                            <ArrowLeftIcon className="w-4 inline mr-1" />返回
                        </button>
                    </form>
                ) : (
                    <form className="w-full sm:w-96 flex flex-col" onSubmit={query}>
                        <BannerMsg type="info" msg="跨平台剪切板2.0已上线，获取新版查询码请扫描下方小程序码，查看属于自己的剪切板！" />
                        <div className="mx-auto"><Image src={clipboardImg} /></div>
                        {error && <BannerMsg type="error" msg={error} />}
                        <input type="text"
                            autoFocus
                            maxLength={5}
                            disabled={loading}
                            className="px-4 py-2 bg-slate-500/5 rounded border border-slate-700/30 dark:border-slate-300/30 focus-visible:outline-0 focus-visible:ring-2"
                            onChange={changeKey}
                            value={key}
                            placeholder="查询码（在小程序获得）" />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 mt-2 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2">
                            <SearchIcon className="w-4 inline mr-1" />查询
                        </button>
                    </form>
                )}
                <Comments />
            </div>
        </Layout>
    );
}