import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import moment from 'moment';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  id: string,
  file: string,
  content?: string,
  data: {
    date: string,
    title: string,
    tags: string[],
    categories: string
  }
  excerpt?: string,
}

export function getSortedPosts(): Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts: Post[] = fileNames.map((fileName) => {
    // Replace ".md" from file name to get id
    const file = fileName.replace(/\.md$/, '.html');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult: { data: any } = matter(fileContents, { excerpt_separator: '<!--more-->' });

    matterResult.data.date = moment(matterResult.data.date).format('YYYY-MM-DD');
    // Combine the data with the id
    return {
      id: `${matterResult.data.date}-${file}`,
      file: fileName,
      ...matterResult,
    };
  });
  // Sort posts by date
  return allPosts.sort(({ data: {date: a} }, { data: {date: b} }) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const allPosts = getSortedPosts();

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return allPosts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export function getPost(id: string) {
  const allPosts = getSortedPosts();
  const post = allPosts.find(it => it.id === id);
  return post;
}