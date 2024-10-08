import { getSortedPosts } from './utils/posts.mjs';
import algoliasearch from 'algoliasearch';

async function send() {
  const posts = await getSortedPosts();
  // @ts-ignore
  const client = algoliasearch.default('0UX0P1HN6Y', process.argv[2]);

  const index = client.initIndex('wycode');

  // posts.forEach(console.log);
  posts.forEach((post) => index.saveObject({ ...post, objectID: post.id }));
  index
    .search('angular')
    .then(({ hits }) => console.log(hits[0]))
    .catch(console.error);
}

send();