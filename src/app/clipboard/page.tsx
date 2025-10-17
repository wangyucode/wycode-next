'use client'
import { useState, useRef, useEffect } from 'react'
import { ArrowUturnLeftIcon, CloudArrowUpIcon, ExclamationCircleIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Comments from '@/components/comments'

export default function ClipboardPage() {
    const queryRef = useRef<HTMLInputElement>(null)
    const [showResult, setShowResult] = useState(false)
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [key, setKey] = useState('')

    useEffect(() => {
        queryRef?.current?.focus()
    }, [])

    const query = async (event?: React.FormEvent) => {
        if (event) event.preventDefault()
        if (key.length < 4) {
            setError('查询码不正确！')
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`https://wycode.cn/api/v1/clipboard/${key}`)
            const data = await res.json()
            if (data && data.success) {
                setShowResult(true)
                setContent(data.payload.content)
            } else {
                setError('查询码不正确！')
            }
        } catch (_) {
            setError('查询失败，请重试')
        } finally {
            setLoading(false)
        }
    }

    const save = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        const data = {
            _id: key,
            content,
        }
        try {
            const res = await fetch('https://wycode.cn/api/v1/clipboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const result = await res.json()
            if (result && result.success) {
                alert('保存成功！')
            } else {
                setError('保存失败！')
            }
        } catch (_) {
            setError('保存失败，请重试')
        } finally {
            setLoading(false)
        }
    }

    const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setKey(event.target.value)
    }

    const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    const onClickReturn = () => {
        setShowResult(false)
    }

    const onKeyUpQuery = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            query()
        }
    }

    return (
        <div className="container max-w-5xl mx-auto p-4">
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h1 className="text-2xl font-bold mb-4 text-center">跨平台剪切板</h1>

                    {showResult ? (
                        <div className="space-y-4">
                            <div className="relative">
                                <textarea
                                    className="textarea textarea-lg w-full h-96 bg-base-200 resize-none rounded-lg"
                                    disabled={loading}
                                    value={content}
                                    onChange={changeContent}
                                    maxLength={5000}
                                    autoFocus
                                    placeholder="剪切板内容"
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error alert-soft flex items-center gap-2">
                                    <ExclamationCircleIcon className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    disabled={loading}
                                    onClick={onClickReturn}
                                    className="btn flex-1"
                                >
                                    <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
                                    返回
                                </button>
                                <button
                                    onClick={save}
                                    disabled={loading}
                                    className="btn btn-success flex-1"
                                >
                                    <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                                    保存
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="alert alert-info alert-soft flex items-center gap-2">
                                <InformationCircleIcon className="w-5 h-5" />
                                <span>跨平台剪切板2.0已上线，获取新版查询码请扫描下方小程序码，查看属于自己的剪切板！</span>
                            </div>

                            <div className="flex justify-center">
                                <img
                                    src="/apps/clipboard.jpg"
                                    alt="小程序码"
                                    className="max-w-64 rounded-lg shadow-md"
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error alert-soft flex items-center gap-2">
                                    <ExclamationCircleIcon className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={query} className="join w-full">
                                <input
                                    type="text"
                                    autoFocus
                                    maxLength={5}
                                    disabled={loading}
                                    className="input join-item flex-1"
                                    onChange={changeKey}
                                    onKeyUp={onKeyUpQuery}
                                    value={key}
                                    ref={queryRef}
                                    placeholder="查询码（在小程序获得）"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-success join-item"
                                >
                                    <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                                    {loading ? '查询中...' : '查询'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Comments />
        </div >
    )
}