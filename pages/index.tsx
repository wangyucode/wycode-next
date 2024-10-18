import ArticleItem from '../components/article/article-item';
import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getCategories, getPageCount, getPagedPosts, getPostTitles, getTags} from '../utils/posts.mjs';
import Hot from "../components/aside/hot";
import Pager from '../components/pager';
import About from '../components/aside/about';
import Highlight from '../components/highlight';
import { Post } from '../components/types';
import CategoryComponent from '../components/aside/category';
import Tags from '../components/aside/tag';
import Ad from '../components/aside/ad';

export const PAGE_SIZE = 5;

export async function getStaticProps() {
  const posts = await getPagedPosts(1, PAGE_SIZE);
  const pageCount = await getPageCount(PAGE_SIZE);
  const postTitles = await getPostTitles();
  const categories = await getCategories();
  const tags = await getTags();
  return {
    props: {
      posts,
      pageCount,
      postTitles,
      categories,
      tags
    },
  };
}

export default function Home({ posts, pageCount, postTitles, categories, tags }: any) {
  return (
    <Layout>
      <Jumbotron />
      <div className="px-4 flex flex-col lg:flex-row max-w-6xl mx-auto">
        <ul className="min-w-0">
          {posts.map((post: Post) => (
            <li className="border-b last:border-0 border-slate-400/30 py-4 max-w-full" key={post.id}>
              <ArticleItem post={post} withExcerpt />
            </li>
          ))}
          <Pager page={1} total={pageCount} />
        </ul>
        <aside className="lg:basis-72 lg:shrink-0 lg:ml-16">
          {/* <Hot postTitles={postTitles} /> */}
          <About />
          <CategoryComponent categories={categories}/>
          <Tags tags={tags} />
          <Ad />
        </aside>
      </div>
      <Highlight />
    </Layout>
  );
}