import { Metadata } from 'next';
import Articles from '@/components/articles';
import { getPagedPosts } from '@/utils/posts-processor';

const PAGE_SIZE = 5;

export default async function BlogListPage() {
    const articles = await getPagedPosts(1, PAGE_SIZE);

    return (
        <div className="container mx-auto px-4">
            <Articles articles={articles} />
        </div>
    );
}

export const metadata: Metadata = {
    title: '博客文章 | 王郁的小站',
    description: '分享技术心得与学习笔记',
};