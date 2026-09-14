// 每篇文章的 agent 可读文档就是 posts/{pid}.md 原文。
// App Router 无法表达 `/blog/{pid}.md` 这种带后缀的动态路由
// （目录名必须整体形如 `[pid]` 才会被解析为动态参数），
// 因此在 `next build` 之后用纯 Node（跨平台）把原文拷入 out/blog/。
// 随现有 SFTP 流程自动上线，部署零改动。
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "posts");
const destDir = path.join(root, "out", "blog");

mkdirSync(destDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.endsWith(".md"));
for (const file of files) {
  copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}

console.log(`gen-blog-md: copied ${files.length} posts to out/blog/`);
