import ArticleItem from '../components/article/article-item';
import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getCategories, getPageCount, getPagedPosts, getPostTitles} from '../utils/posts';
import Hot from "../components/aside/hot";
import Pager from '../components/pager';
import About from '../components/aside/about';
import Highlight from '../components/highlight';
import { Post } from '../components/types';
import CategoryComponent from '../components/aside/category';

export const PAGE_SIZE = 5;

export async function getStaticProps() {
  const posts = await getPagedPosts(1, PAGE_SIZE);
  const pageCount = await getPageCount(PAGE_SIZE);
  const postTitles = await getPostTitles();
  const categories = await getCategories();
  return {
    props: {
      posts,
      pageCount,
      postTitles,
      categories
    },
  };
}

export default function Home({ posts, pageCount, postTitles, categories }: any) {
  return (
    <Layout>
      <Jumbotron />
      <div className="px-4 flex flex-col lg:flex-row max-w-7xl mx-auto">
        <ul className="min-w-0">
          {posts.map((post: Post) => (
            <li className="border-b last:border-0 border-slate-700/30 dark:border-slate-300/30 py-4 max-w-full" key={post.id}>
              <ArticleItem post={post} withExcerpt />
            </li>
          ))}
          <Pager page={1} total={pageCount} />
        </ul>
        <aside className="lg:basis-72 lg:shrink-0 lg:ml-16">
          <Hot postTitles={postTitles} />
          <CategoryComponent categories={categories}/>
          <About />
        </aside>
      </div>
      <Highlight />
    </Layout>
  );
}