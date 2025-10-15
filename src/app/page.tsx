import Articles from "@/components/articles";
import Pagination from "@/components/pagination";
import { getPagedPosts, getPageCount } from "@/utils/posts-processor";

const PAGE_SIZE = 5;

export default async function Home() {

  const articles = await getPagedPosts(1, PAGE_SIZE);
  const totalPages = await getPageCount(PAGE_SIZE);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Articles articles={articles} withExcerpt />
          <Pagination currentPage={1} totalPages={totalPages} />
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
