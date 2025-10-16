import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";
import { getRandomColorById } from '@/utils/style-utils';

import { getPost, getAllPostIds } from '@/utils/posts-processor';
import { MarkdownRenderer } from '@/utils/posts-processor';
import Comments from '@/components/comments';
import BlogViewCounter from '@/components/aside/blog-view-counter';

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
                <div className="flex justify-between text-sm mb-4 flex-wrap gap-2">
                    <span className="flex items-center">
                        <CalendarIcon className="inline mr-1 h-5" />{date}
                    </span>
                    <Link
                        href={`/blog/category/${cid}`}
                        className={`flex items-center px-3 py-1 ${getRandomColorById(cid)} text-sm rounded-full`}
                    >
                        <ArchiveBoxIcon className="inline mr-1 h-4 mb-0.5" />{category}
                    </Link>
                </div>
                {tags && Array.isArray(tags) && tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <TagIcon className="inline h-5" />
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog/tag/${tag.replaceAll(" ", "-").toLowerCase()}`}
                                    className={`px-2 ${getRandomColorById(tag)} text-sm rounded-full`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-8">
                    <MarkdownRenderer source={content} className="prose max-w-full" />
                </div>
            </article>
            <Comments />
            <BlogViewCounter postId={pid} />
        </div>
    );
}

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts.map((post) => ({
        pid: post.params.pid,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ pid: string }> }): Promise<Metadata> {
    const { pid } = await params
    const post = await getPost(pid);

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