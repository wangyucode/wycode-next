import { Metadata } from 'next';
import Link from 'next/link';
import { ArchiveBoxIcon, CalendarIcon } from "@heroicons/react/24/outline";

import { getPostsByCategory, getCategories } from "@/utils/posts-processor";
import Aside from "@/components/aside";

export default async function CategoryPage({ params }: { params: Promise<{ cid: string }> }) {
    const { cid } = await params;
    const posts = await getPostsByCategory(cid);

    // 如果没有找到该分类的文章，返回错误信息
    if (!posts || posts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">分类不存在</h1>
                <p className="text-slate-600 dark:text-slate-400">未找到该分类下的文章</p>
            </div>
        );
    }

    // 获取分类名称（从第一篇文章中获取）
    const categoryName = posts[0].data.category;

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center mb-4">
                                <ArchiveBoxIcon className="mr-2 h-6 w-6" />
                                {categoryName}
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
    const categories = await getCategories();
    return categories.map((category) => ({
        cid: category.params.cid,
    }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ cid: string }> }): Promise<Metadata> {
    const { cid } = await params;
    const posts = await getPostsByCategory(cid);

    if (!posts || posts.length === 0) {
        return {
            title: '分类不存在 | 王郁的小站',
            description: '未找到该分类下的文章',
        };
    }

    const categoryName = posts[0].data.category;

    return {
        title: `${categoryName} | 王郁的小站`,
        description: `查看所有关于 ${categoryName} 的文章，共 ${posts.length} 篇`,
        keywords: [categoryName, '王郁的小站', '博客'],
    };
}