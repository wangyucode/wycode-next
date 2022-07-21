import ArticleItem from '../components/article/article-item';
import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getPageCount, getPagedPosts, Post } from '../utils/posts';
import Hot from "../components/aside/hot";
import Pager from '../components/pager';
import About from '../components/aside/about';
import Highlight from '../components/highlight';

export const PAGE_SIZE = 5;

export async function getStaticProps() {
  const posts = await getPagedPosts(1, PAGE_SIZE);
  const pageCount = await getPageCount(PAGE_SIZE);
  return {
    props: {
      posts,
      pageCount
    },
  };
}

export default function Home({ posts, pageCount }: { posts: Post[], pageCount: number }) {
  return (
    <Layout>
      <Jumbotron />
      <div className="px-4 flex flex-col lg:flex-row max-w-7xl mx-auto">
        <ul className="min-w-0">
          {posts.map(post => (
            <li className="border-b last:border-0 border-slate-700/30 dark:border-slate-300/30 py-4 max-w-full" key={post.id}>
              <ArticleItem post={post} withExcerpt />
            </li>
          ))}
          <Pager page={1} total={pageCount} />
        </ul>
        <aside className="lg:basis-72 lg:shrink-0 lg:ml-16">
          <Hot />
          <About />
        </aside>
      </div>
      <Highlight/>
    </Layout>
  );
}