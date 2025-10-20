import { Metadata } from 'next';
import Articles from '@/components/articles';
import Pagination from '@/components/pagination';
import Aside from '@/components/aside';
import { getPagedPosts, getPageCount, getIdTitleMap } from '@/utils/posts-processor';

const PAGE_SIZE = 5;

interface BlogPageProps {
  params: Promise<{
    page: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  const articles = await getPagedPosts(currentPage, PAGE_SIZE);
  const totalPages = await getPageCount(PAGE_SIZE);
  const idTitleMap = await getIdTitleMap();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Articles articles={articles} withExcerpt />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
        <Aside recentArticles={articles} idTitleMap={idTitleMap} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const totalPages = await getPageCount(PAGE_SIZE);

  // 从第2页开始生成静态路径，因为第1页是 /
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  return {
    title: `博客 - 第${currentPage}页 | 王郁的小站`,
    description: `王郁的小站博客 - 第${currentPage}页`,
    pagination: {
      previous: currentPage > 2 ? `/blog/${currentPage - 1}` : '/',
      next: `/blog/${currentPage + 1}`,
    },
  };
}