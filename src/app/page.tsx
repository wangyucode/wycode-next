import Articles from "@/components/articles";
import { getPagedPosts } from "@/utils/posts-processor";

const PAGE_SIZE = 5;

export default async function Home() {

  const articles = await getPagedPosts(1, PAGE_SIZE);

  return (
    <>
      <Articles articles={articles} withExcerpt />
      <aside className="lg:flex-1">
        <ul>
          <li><a href="#">相关资源1</a></li>
          <li><a href="#">相关资源2</a></li>
        </ul>
      </aside>
    </>
  );
}
