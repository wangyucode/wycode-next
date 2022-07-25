import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {format} from 'date-fns';
import {remark} from 'remark';
import html from 'remark-html';
import {rehype} from 'rehype';

const addClasses = require('rehype-add-classes');
const postsDirectory = path.join(process.cwd(), 'posts');

let cachedPosts: Post[];

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
    if(cachedPosts) return cachedPosts;
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts: Post[] = await Promise.all(fileNames.map(async (fileName) => {
        // Replace ".md" from file name to get id
        const file = fileName.replace(/\.md$/, '.html');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents, {excerpt_separator: '<!--more-->'});

        matterResult.data.date = format(matterResult.data.date, 'yyyy-MM-dd');

        // Use remark to convert markdown into HTML string
        const processor = remark().use(html);
        const processedExcerpt = await processor.process(matterResult.excerpt || '');
        const processedContent = await processor.process(matterResult.content);

        const classProcessor = rehype()
            .data('settings', {fragment: true})
            .use(addClasses, {
                'img': 'mx-auto max-h-80',
                'p': 'mb-4',
                'blockquote': 'px-4 border-l-4 border-slate-500 text-slate-500',
                'blockquote > p': 'indent-0',
                'h2': 'text-xl font-bold mb-4 pb-4 border-b border-slate-700/30 dark:border-slate-300/30',
                'h3': 'text-lg font-bold mb-4',
                'code': 'px-1 py-0.5 mx-1 bg-slate-200 text-slate-800 dark:text-slate-200 dark:bg-slate-700 rounded-md text-sm font-mono',
                'pre': 'mb-4 p-4 bg-slate-200 dark:bg-slate-700 rounded-md overflow-auto max-w-full',
                'pre > code': '!p-0 !m-0'
            });

        const excerptHtml = classProcessor.processSync(processedExcerpt).toString();
        const contentHtml = classProcessor.processSync(processedContent).toString();
        // Combine the data with the id
        return {
            id: file,
            file: fileName,
            excerptHtml,
            contentHtml,
            ...matterResult,
        };
    }));
    // Sort posts by date
    cachedPosts = allPosts.sort(({data: {date: a}}, {data: {date: b}}) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
    return cachedPosts;
}

export async function getPagedPosts(page: number, size: number): Promise<Post[]> {
    const allPosts = await getSortedPosts();
    const start  = (page-1)*size;
    const end = start+ size;
    return allPosts.slice(start, end);
}

export async function getPageCount(size: number): Promise<number>{
    const allPosts = await getSortedPosts();
    return Math.ceil(allPosts.length / size);
}

export async function getAllPostIds(): Promise<{params: {id: string}}[]> {
    const allPosts = await getSortedPosts();
    return allPosts.map((post) => {
        return {
            params: {
                id: post.id,
            },
        };
    });
}

export async function getPost(id: string): Promise<Post | undefined> {
    const allPosts = await getSortedPosts();
    return allPosts.find(it => it.id === id);
}

export async function getPostTitles(): Promise<any[]> {
    const allPosts = await getSortedPosts();
    return allPosts.map((post) => [post.id, post.data.title]);
}
