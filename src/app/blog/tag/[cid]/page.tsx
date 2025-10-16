import { Metadata } from 'next';
import Link from 'next/link';
import { TagIcon, CalendarIcon } from "@heroicons/react/24/outline";

import { getPostsByTag, getTags } from "@/utils/posts-processor";
import Aside from "@/components/aside";

export default async function TagPage({ params }: { params: Promise<{ cid: string }> }) {
    const { cid } = await params;
    const posts = await getPostsByTag(cid);

    // 如果没有找到该标签的文章，返回错误信息
    if (!posts || posts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">标签不存在</h1>
                <p className="text-slate-600 dark:text-slate-400">未找到该标签下的文章</p>
            </div>
        );
    }

    // 获取标签名称（从第一篇文章中获取，需要找到匹配的标签）
    const allTags = await getTags();
    const tagInfo = allTags.find(tag => tag.params.cid === cid);
    const tagName = tagInfo ? tagInfo.params.name : cid;

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center mb-4">
                                <TagIcon className="mr-2 h-6 w-6" />
                                {tagName}
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

// 生成静态参数
export async function generateStaticParams() {
    const tags = await getTags();
    return tags.map((tag) => ({
        cid: tag.params.cid,
    }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ cid: string }> }): Promise<Metadata> {
    const { cid } = await params;
    const posts = await getPostsByTag(cid);

    if (!posts || posts.length === 0) {
        return {
            title: '标签不存在 | 王郁的小站',
            description: '未找到该标签下的文章',
        };
    }

    // 获取标签名称
    const allTags = await getTags();
    const tagInfo = allTags.find(tag => tag.params.cid === cid);
    const tagName = tagInfo ? tagInfo.params.name : cid;

    return {
        title: `${tagName} | 王郁的小站`,
        description: `查看所有关于 ${tagName} 的文章，共 ${posts.length} 篇`,
        keywords: [tagName, '王郁的小站', '博客'],
    };
}