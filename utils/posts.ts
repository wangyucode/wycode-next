import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import moment from 'moment';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  id: string,
  file: string,
  content: string,
  data: { [key: string]: any }
  excerpt?: string,
  contentHtml: string,
  excerptHtml: string
}

export async function getSortedPosts(): Promise<Post[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts: Post[] = await Promise.all(fileNames.map(async (fileName) => {
    // Replace ".md" from file name to get id
    const file = fileName.replace(/\.md$/, '.html');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { excerpt_separator: '<!--more-->' });

    matterResult.data.date = moment(matterResult.data.date).format('YYYY-MM-DD');

    // Use remark to convert markdown into HTML string
    const processor = remark().use(html);
    const processedExcerpt = await processor.process(matterResult.excerpt || '');
    const processedContent = await processor.process(matterResult.content);
    const excerptHtml = processedExcerpt.toString();
    const contentHtml = processedContent.toString();
    // Combine the data with the id
    return {
      id: `${matterResult.data.date}-${file}`,
      file: fileName,
      excerptHtml,
      contentHtml,
      ...matterResult,
    };
  }));
  // Sort posts by date
  return allPosts.sort(({ data: { date: a } }, { data: { date: b } }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getAllPostIds() {
  const allPosts = await getSortedPosts();

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

export async function getPost(id: string) {
  const allPosts = await getSortedPosts();
  const post = allPosts.find(it => it.id === id);
  return post;
}
