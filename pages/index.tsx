import ArticleItem from '../components/article/article-item';
import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getSortedPosts, Post } from '../utils/posts';

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
    <Layout blog>
      <Jumbotron />
      <div className="px-4 flex flex-col lg:flex-row max-w-7xl mx-auto">
        <ul className="min-w-0">
          {allPosts.map(post => (
            <li className="border-b last:border-0 border-slate-900/10 dark:border-slate-300/10 py-4 max-w-full" key={post.id}>
              <ArticleItem post={post} withExcerpt/>
            </li>
          ))}
        </ul>
        <aside className="basis-96 shrink-0 bg-amber-600 md:ml-8">
          <div>热门文章</div>
        </aside>
      </div>
    </Layout>
  );
}