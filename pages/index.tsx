import ArticleItem from '../components/article/article-item';
import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getSortedPosts, Post } from '../utils/posts';
import Hot from "../components/aside/hot";

export async function getStaticProps() {
  const allPosts = await getSortedPosts();
  return {
    props: {
      allPosts,
    },
  };
}

export default function Home({ allPosts }: { allPosts: Post[] }) {
  return (
    <Layout>
      <Jumbotron />
      <div className="px-4 flex flex-col lg:flex-row max-w-7xl mx-auto">
        <ul className="min-w-0">
          {allPosts.map(post => (
            <li className="border-b last:border-0 border-slate-700/30 dark:border-slate-300/30 py-4 max-w-full" key={post.id}>
              <ArticleItem post={post} withExcerpt/>
            </li>
          ))}
        </ul>
        <aside className="lg:basis-72 lg:shrink-0 lg:ml-16">
          <Hot allPosts={allPosts}/>
        </aside>
      </div>
    </Layout>
  );
}