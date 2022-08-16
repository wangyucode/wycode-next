import {getSortedPosts} from './utils/posts.js';

export async function send() {
  const posts = await getSortedPosts();

  const algoliasearch = require('algoliasearch');

  const client = algoliasearch('0UX0P1HN6Y', process.argv[2]);

  const index = client.initIndex('wycode');

  posts.forEach(console.log);
  // posts.forEach((post) => index.saveObject({ ...post, objectID: post.id }));
  // index
  //   .search('test_record')
  //   .then(({ hits }) => console.log(hits[0]))
  //   .catch(console.error);
}

send();

exports.default = send;