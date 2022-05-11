import { Jumbotron } from '../components/jumbotron';
import Layout from '../components/layout';

import { getSortedPosts, Post } from '../utils/posts';

export async function getStaticProps() {
  const allPosts = getSortedPosts();
  console.log(allPosts);
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
          {allPosts.map(({ id, data: {date, title, categories, tags} }) => (
            <li className="" key={id}>
              <article>
                <>
                  {title}
                  <br />
                  {categories}
                  <br />
                  {tags?.join(', ')}
                  <br />
                  {date}
                </>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}