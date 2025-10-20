import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki';

export interface Post {
  id: string;
  file: string;
  data: Record<string, string>;
  excerpt?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');
let cachedPosts: Post[] | null = null;

const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
})

// 获取所有排序后的文章
export async function getSortedPosts(): Promise<Post[]> {
  if (cachedPosts) return cachedPosts;

  // 获取 /posts 目录下的文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(fileNames.map(async (fileName) => {
    // 从文件名中去除 ".md" 得到 id
    const file = fileName.replace(/\.md$/, '');

    // 读取 markdown 文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析文章元数据
    const matterResult = matter(fileContents, { excerpt_separator: '<!--more-->' });

    matterResult.excerpt = matterResult.excerpt || '';

    // 格式化日期
    matterResult.data.date = format(new Date(matterResult.data.date), 'yyyy-MM-dd');

    // 返回包含 id 和数据的文章对象
    return {
      id: file,
      file: fileName,
      ...matterResult,
    };
  }));

  // 按日期排序文章（最新的在前）
  cachedPosts = allPosts.sort(({ data: { date: a } }, { data: { date: b } }) => {
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

// 分页获取文章
export async function getPagedPosts(page: number, size: number): Promise<Post[]> {
  const allPosts = await getSortedPosts();
  const start = (page - 1) * size;
  const end = start + size;
  return allPosts.slice(start, end);
}

// 获取总页数
export async function getPageCount(size: number): Promise<number> {
  const allPosts = await getSortedPosts();
  return Math.ceil(allPosts.length / size);
}

// 获取所有文章的 ID
export async function getAllPostIds(): Promise<{ params: { pid: string } }[]> {
  const allPosts = await getSortedPosts();
  return allPosts.map((post) => {
    return {
      params: {
        pid: post.id,
      },
    };
  });
}

// 根据 ID 获取单个文章
export async function getPost(id: string): Promise<Post | undefined> {
  const allPosts = await getSortedPosts();
  return allPosts.find(it => it.id === id);
}

// 获取所有文章的标题和 ID
export async function getPostTitles(): Promise<[string, string][]> {
  const allPosts = await getSortedPosts();
  return allPosts.map(post => [post.id, post.data.title]);
}

// 获取文章ID到标题的映射
export async function getIdTitleMap(): Promise<Record<string, string>> {
  const allPosts = await getSortedPosts();
  const idTitleMap: Record<string, string> = {};
  allPosts.forEach(post => {
    idTitleMap[post.id] = post.data.title;
  });
  return idTitleMap;
}

// 获取所有分类
export async function getCategories(): Promise<{ params: { name: string; count: number; cid: string } }[]> {
  const allPosts = await getSortedPosts();
  const categories: { params: { name: string; count: number; cid: string } }[] = [];

  allPosts.forEach(post => {
    const category = categories.find(c => c.params.name === post.data.category);
    if (category) {
      category.params.count++;
    } else {
      categories.push({
        params: {
          name: post.data.category,
          count: 1,
          cid: post.data.category.replaceAll(" ", "-").toLowerCase()
        }
      });
    }
  });

  // 按文章数量排序
  categories.sort((a, b) => b.params.count - a.params.count);
  return categories;
}

// 根据分类 ID 获取文章
export async function getPostsByCategory(cid: string): Promise<Post[]> {
  const allPosts = await getSortedPosts();
  return allPosts.filter(post => post.data.category.replaceAll(" ", "-").toLowerCase() === cid);
}

// 获取所有标签
export async function getTags(): Promise<{ params: { name: string; count: number; cid: string } }[]> {
  const allPosts = await getSortedPosts();
  const tags: { params: { name: string; count: number; cid: string } }[] = [];

  allPosts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach((postTag: string) => {
        const tag = tags.find(t => t.params.name === postTag);
        if (tag) {
          tag.params.count++;
        } else {
          tags.push({
            params: {
              name: postTag,
              count: 1,
              cid: postTag.replaceAll(" ", "-").toLowerCase()
            }
          });
        }
      });
    }
  });

  // 按标签名称排序
  tags.sort((a, b) => a.params.cid < b.params.cid ? -1 : 1);
  return tags;
}

// 根据标签 ID 获取文章
export async function getPostsByTag(cid: string): Promise<Post[]> {
  const allPosts = await getSortedPosts();
  return allPosts.filter(post =>
    post.data.tags &&
    Array.isArray(post.data.tags) &&
    post.data.tags.some(tag => tag.replaceAll(" ", "-").toLowerCase() === cid)
  );
}

// 创建 ReactMarkdown 组件包装器，用于在前端渲染 markdown
interface MarkdownRendererProps {
  source?: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source, className }: MarkdownRendererProps) => {
  if (!source) return null;

  // 自定义组件配置
  const components: Components = {
    img: (attr) => (
      <figure className="flex flex-col items-center">
        <img {...attr} className="mx-auto max-h-64 max-w-72" />
        {attr.alt && <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-1">{attr.alt}</figcaption>}
      </figure>
    ),
    // h2: ({ children }) => (
    //   <h2 className="text-xl font-bold py-2 border-b border-slate-400/30 mb-2">{children}</h2>
    // ),
    // h3: ({ children }) => (
    //   <h3 className="text-lg font-bold mb-4">{children}</h3>
    // ),
    // p: ({ children }) => (
    //   <p>{children}</p>
    // ),
    // a: ({ href = '', children }) => (
    //   <a href={href || ''} className="text-sky-500 hover:text-sky-400">{children}</a>
    // ),
    // blockquote: ({ children }) => (
    //   <blockquote className="px-4 py-1 border-l-4 border-slate-500 text-slate-700 dark:text-slate-300 bg-slate-300 dark:bg-slate-700 transition-colors">
    //     {children}
    //   </blockquote>
    // ),
    pre: ({ children }) => {
      // 提取语言类名，格式通常是 language-javascript
      const lang = (children as ReactElement<{ className?: string }>).props?.className?.match(/language-([a-z]+)/)?.[1];
      const code = React.Children.toArray(children).map(child =>
        typeof child === 'string' ? child : React.isValidElement(child) ? (child.props as { children: string }).children : ''
      ).join('');
      return lang ? <div dangerouslySetInnerHTML={{ __html: highlighter.codeToHtml(code, { lang, themes: { light: 'vitesse-light', dark: 'vitesse-dark' }, defaultColor: 'light-dark()' }) }}></div> : <pre>{children}</pre>
    },
  };

  return (
    <div className="prose max-w-full">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeUnwrapImages]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
};
