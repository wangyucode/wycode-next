import type { MetadataRoute } from "next";
import {
  getSortedPosts,
  getCategories,
  getTags,
} from "../utils/posts-processor";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有文章、分类和标签
  const [posts, categories, tags] = await Promise.all([
    getSortedPosts(),
    getCategories(),
    getTags(),
  ]);

  // 基础URL
  const baseUrl = "https://wycode.cn";

  // 网站主要页面
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // 生成所有文章的sitemap条目
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.data.date), // 使用文章的实际发布日期
    changeFrequency: "monthly",
    priority: 0.7, // 文章页面优先级略低于博客列表页
  }));

  // 生成所有分类页面的sitemap条目
  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.params.cid}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 生成所有标签页面的sitemap条目
  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag.params.cid}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 合并所有页面条目
  return [...mainPages, ...categoryEntries, ...tagEntries, ...postEntries];
}
