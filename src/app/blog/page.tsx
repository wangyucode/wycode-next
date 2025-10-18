import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { getSortedPosts } from "@/utils/posts-processor";
import Aside from "@/components/aside";

export default async function BlogListPage() {
    const posts = await getSortedPosts();

    if (process.env.NODE_ENV === 'development') {
        posts.forEach(post => {
            console.log(`${post.data.title} - https://wycode.cn/blog/${post.id}`);
        })
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center mb-4">
                                <ArchiveBoxIcon className="mr-2 h-6 w-6" />
                                所有文章
                                <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                                    ({posts.length} 篇文章)
                                </span>
                            </h1>

                            {/* 简化的文章列表，只显示标题和日期 */}
                            <div className="space-y-3">
                                {posts.map(({ id, data: { title, date } }) => (
                                    <div key={id} className="border-b border-base-content/10 pb-3 last:border-b-0 last:pb-0">
                                        <Link href={`/blog/${id}`} className="flex justify-between hover:text-sky-500 transition-colors">
                                            <h3 className="text-lg font-medium">{title}</h3>
                                            <div className="flex items-center mt-1 text-sm text-base-content/50">
                                                <CalendarIcon className="inline mr-1 h-4 w-4" />
                                                {date}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 右侧边栏，使用现有的Aside组件 */}
                <Aside recentArticles={posts.slice(0, 5)} />
            </div>
        </div>
    );
}

export const metadata: Metadata = {
    title: '博客文章 | 王郁的小站',
    description: '分享技术心得与学习笔记',
    pagination: {
        previous: '/',
        next: '/blog/2',
    },
};