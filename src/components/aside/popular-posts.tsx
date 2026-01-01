"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowTrendingUpIcon, FolderOpenIcon } from '@heroicons/react/24/outline';

interface PostView {
    postId: string;
    title?: string;
    viewCount: number;
}

interface RecentArticle {
    id: string;
    data: {
        title?: string;
    };
}

export interface PopularPostsProps {
    recentArticles: RecentArticle[]; // 最近的博客作为后备数据
    idTitleMap: Record<string, string>; // 文章ID到标题的映射
}

const DAYS = 7;
const LIMIT = 5;

export default function PopularPosts({ recentArticles = [], idTitleMap = {} }: PopularPostsProps) {
    const [popularPosts, setPopularPosts] = useState<PostView[]>([]);
    const [loading, setLoading] = useState(true);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://wycode.cn/api/v1/popular-posts?days=${DAYS}&limit=${LIMIT}`
                );
                const data = await response.json();
                if (data.success && Array.isArray(data.payload) && data.payload.length > 0) {
                    const posts: PostView[] = data.payload.map((item: { id: string; view_count: number }) => ({
                        postId: item.id,
                        viewCount: item.view_count,
                    }));
                    setPopularPosts(posts);
                    setUseFallback(false);
                } else {
                    // 如果没有热门博客数据，使用最近的博客作为后备
                    if (recentArticles && recentArticles.length > 0) {
                        const fallbackPosts: PostView[] = recentArticles.slice(0, LIMIT).map((article) => ({
                            postId: article.id,
                            title: article.data.title,
                            viewCount: 0
                        }));
                        setPopularPosts(fallbackPosts);
                        setUseFallback(true);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch popular posts:', error);
                // 如果请求失败，也使用最近的博客作为后备
                if (recentArticles && recentArticles.length > 0) {
                    const fallbackPosts: PostView[] = recentArticles.slice(0, LIMIT).map((article) => ({
                        postId: article.id,
                        title: article.data.title,
                        viewCount: 0
                    }));
                    setPopularPosts(fallbackPosts);
                    setUseFallback(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPopularPosts();
    }, [recentArticles]);

    if (loading) {
        return (
            <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title flex items-center">
                        <ArrowTrendingUpIcon className="mr-2 h-5 w-5" />
                        热门文章
                    </h3>
                    <div className="animate-pulse space-y-2">
                        {Array(LIMIT).fill(0).map((_, index) => (
                            <div key={index} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (popularPosts.length === 0) {
        return null;
    }

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <ArrowTrendingUpIcon className="mr-2 h-5 w-5" />
                    {useFallback ? '最新文章' : '热门文章'}
                </h3>
                <ul className="space-y-3 ml-4">
                    {popularPosts.map((post, index) => (
                        <li key={post.postId} className="flex items-start justify-between gap-2">
                            <Link
                                href={`/blog/${post.postId}`}
                                className="text-sm hover:text-sky-500 dark:hover:text-sky-400 transition-colors line-clamp-1 hover:underline"
                            >
                                <span className="text-sm font-bold mr-2">
                                    {index + 1}.
                                </span>{post.title || idTitleMap[post.postId] || post.postId}
                            </Link>
                            {!useFallback && (
                                <span className="self-end flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                                    {post.viewCount}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                <Link
                    href="/blog"
                    className="btn btn-sm btn-ghost text-sm hover:text-info justify-start"
                >
                    <FolderOpenIcon className="mr-2 h-5 w-5" />
                    所有文章
                </Link>
            </div>
        </div>
    );
}