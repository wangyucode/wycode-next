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
      <section>
        <ul className="">
          {allPosts.map(post => (
            <li className="" key={post.id}>
              <ArticleItem post={post} withExcerpt/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}