import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";

import { getPost, getAllPostIds } from '@/utils/posts-processor';
import { MarkdownRenderer } from '@/utils/posts-processor';

export default async function PostDetail({ params }: { params: Promise<{ pid: string }> }) {
    const { pid } = await params
    const post = await getPost(pid);

    if (!post) {
        return <div>文章未找到</div>;
    }

    const { data: { date, title, category, tags }, content } = post;
    const cid = category.replaceAll(" ", "-").toLowerCase();

    return (
        <div className="container mx-auto w-full">
            <article className="card shadow bg-base-100 p-4">
                <h1 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold text-center">{title}</h1>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <span className="flex items-center">
                        <CalendarIcon className="inline mr-1" height={20} width={20} />
                        {date}
                    </span>
                    <Link href={`/blog/category/${cid}`} className="hover:text-sky-400 flex items-center">
                        <ArchiveBoxIcon className="inline mr-1 h-5 mb-0.5" />
                        {category}
                    </Link>
                </div>
                {tags && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <TagIcon className="inline mr-1" height={20} width={20} />
                        {tags}
                    </div>
                )}
                <div className="mt-8">
                    <MarkdownRenderer source={content} className="prose max-w-full" />
                </div>
            </article>
            {/* 评论组件暂时省略，后续可以添加 */}
        </div>
    );
}

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts.map((post) => ({
        pid: post.params.pid,
    }));
}

export async function generateMetadata({ params }: { params: { pid: string } }): Promise<Metadata> {
    const post = await getPost(params.pid);

    if (!post) {
        return {
            title: '文章未找到',
        };
    }

    const { data: { title, tags }, excerpt } = post;

    return {
        title: `${title} | 王郁的小站`,
        description: excerpt || title,
        keywords: tags || title,
    };
}