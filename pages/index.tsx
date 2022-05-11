import Link from 'next/link';
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
      <section className="px-4">
        <ul className="">
          {allPosts.map(post => (
            <li className="border-b last:border-0 border-slate-900/10 dark:border-slate-300/10 py-4" key={post.id}>
              <ArticleItem post={post} withExcerpt/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}