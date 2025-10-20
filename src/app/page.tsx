import Articles from "@/components/articles";
import Pagination from "@/components/pagination";
import { getPagedPosts, getPageCount, getIdTitleMap } from "@/utils/posts-processor";
import Aside from '@/components/aside';

const PAGE_SIZE = 5;

export default async function Home() {

  const articles = await getPagedPosts(1, PAGE_SIZE);
  const totalPages = await getPageCount(PAGE_SIZE);
  const idTitleMap = await getIdTitleMap();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Articles articles={articles} withExcerpt />
          <Pagination currentPage={1} totalPages={totalPages} />
        </div>
        <Aside recentArticles={articles} idTitleMap={idTitleMap} />
      </div>
    </div>
  );
}
