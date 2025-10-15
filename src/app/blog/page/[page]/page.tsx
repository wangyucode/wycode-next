import { Metadata } from 'next';
import Articles from '@/components/articles';
import Pagination from '@/components/pagination';
import { getPagedPosts, getPageCount } from '@/utils/posts-processor';

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

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Articles articles={articles} withExcerpt />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
        <aside className="lg:flex-1">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">相关资源</h2>
              <ul className="menu menu-sm">
                <li><a href="#">相关资源1</a></li>
                <li><a href="#">相关资源2</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const totalPages = await getPageCount(PAGE_SIZE);
  
  // 从第2页开始生成静态路径，因为第1页是 /blog
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
  };
}