import { getSortedPosts } from "./posts-processor";

export const BASE_URL = "https://wycode.cn";

export interface MainPageInfo {
  name: string;
  doc: string;
  description: string;
}

export const MAIN_PAGES: MainPageInfo[] = [
  {
    name: "首页",
    doc: `${BASE_URL}/llms/home.md`,
    description: "博客首页，最新文章与站点导航",
  },
  {
    name: "博客",
    doc: `${BASE_URL}/llms/blog.md`,
    description: "全部文章列表，支持按分类/标签浏览",
  },
  {
    name: "关于我",
    doc: `${BASE_URL}/llms/about.md`,
    description: "个人简介、技术栈与联系方式",
  },
  {
    name: "应用",
    doc: `${BASE_URL}/llms/apps.md`,
    description: "在线工具与应用集合",
  },
  {
    name: "AI高考成绩榜",
    doc: `${BASE_URL}/llms/gaokao.md`,
    description: "大模型高考成绩榜",
  },
  {
    name: "缺氧",
    doc: `${BASE_URL}/llms/oni.md`,
    description: "Oxygen Not Included 游戏攻略/工具",
  },
  {
    name: "剪贴板",
    doc: `${BASE_URL}/llms/clipboard.md`,
    description: "在线剪贴板工具",
  },
];

/** 清洗摘要：去掉图片/链接标记、多余空白，压缩为单行 */
export function cleanExcerpt(raw: string): string {
  return raw
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/[#>*`~\-_|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 150);
}

function describePost(post: {
  id: string;
  data: Record<string, string>;
  excerpt?: string;
}): string {
  const { date = "", category = "" } = post.data;
  const tags = Array.isArray(post.data.tags)
    ? (post.data.tags as unknown as string[]).join("/")
    : (post.data.tags ?? "");
  const meta = [date, category, tags].filter(Boolean).join(" | ");
  const excerpt = post.excerpt ? cleanExcerpt(post.excerpt) : "";
  const desc = [meta, excerpt].filter(Boolean).join(" —— ");
  return `- [${post.data.title}](${BASE_URL}/blog/${post.id}.md): ${desc}`;
}

export async function buildLlmsTxt(): Promise<string> {
  const posts = await getSortedPosts();
  const lines: string[] = [
    "# 王郁的小站",
    "",
    "> 王郁（Wang Yu）的个人博客 wycode.cn。全栈开发者，内容涵盖前端（React/Next.js）、后端（Java/Spring）、移动端、Docker/Linux 运维、AI 应用等，文章以中文为主。",
    "",
    "## 主要页面",
    "",
    ...MAIN_PAGES.map((p) => `- [${p.name}](${p.doc}): ${p.description}`),
    "",
    "## 博客文章",
    "",
    ...posts.map(describePost),
    "",
    "## 可选",
    "",
    `- [全部文章全文](${BASE_URL}/llms-full.txt): 所有博客文章的 markdown 全文拼接`,
    `- [分类列表](${BASE_URL}/blog/category): 按分类浏览（HTML 页面）`,
    `- [标签列表](${BASE_URL}/blog/tag): 按标签浏览（HTML 页面）`,
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    "",
  ];
  return lines.join("\n");
}

export async function buildLlmsFull(): Promise<string> {
  const posts = await getSortedPosts();
  const lines: string[] = [
    "# 王郁的小站 - 全部文章全文",
    "",
    "> 王郁（Wang Yu）的个人博客 wycode.cn 所有文章的 markdown 全文拼接，按发布日期倒序排列。单篇文章的 agent 可读文档见 llms.txt 中的博客文章列表。",
    "",
    "## 目录",
    "",
    ...posts.map(
      (p) => `- [${p.data.title}](#${p.id}): ${p.data.date ?? ""}`,
    ),
    "",
  ];
  for (const post of posts) {
    lines.push("---", "", `## ${post.data.title}`, "");
    lines.push(
      `> 原文: ${BASE_URL}/blog/${post.id} | Agent 文档: ${BASE_URL}/blog/${post.id}.md | 日期: ${post.data.date ?? ""} | 分类: ${post.data.category ?? ""}`,
      "",
      `<a id="${post.id}"></a>`,
      "",
      post.content.trim(),
      "",
    );
  }
  return lines.join("\n");
}
