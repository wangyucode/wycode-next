---
title: 使用Vite构建React项目
date: 2023-11-11 18:23:00
tags:
  - React
  - JavaScript
category: Frontend
---

![Vite](https://vitejs.cn/vite3-cn/logo-with-shadow.png)

# 使用 Vite 构建 React 项目

在前端开发领域，构建工具一直是不可或缺的一部分。Vite 是一个快速、简单的构建工具，它可以帮助我们快速搭建 React 项目并提供出色的开发体验。本文将介绍如何使用 Vite 构建 React 项目，包括 Vite 的简介、项目搭建步骤以及适配老版本浏览器的方法。

<!--more-->

## 什么是 Vite

[Vite](https://vitejs.dev/) 是一个由 Evan You（Vue.js 的创始人）创建的构建工具，它的目标是提供快速的开发体验。Vite 不仅支持 Vue.js，还可以用于构建 React、Preact，Svelte 和其他前端框架的项目。它采用了 ES 模块的方式加载模块，因此在开发过程中非常快速。

## 项目搭建步骤

要使用 Vite 构建 React 项目，首先确保你已经安装了 [Node.js](https://nodejs.org/)。接下来，按照以下步骤进行操作：

1. **初始化项目**：`npm create vite@latest web-vite --template react`
2. **进入项目文件夹**: `cd web-vite`
3. **安装依赖**: `npm install`
4. **启动开发服务器**: `npm run dev`

至此，你可以在代码编辑器中修改 React 组件并实时查看更改。

## 构建发布项目：

当项目准备好发布时，运行以下命令构建项目：`npm run build`, 构建后的文件将存储在 dist 文件夹中，可以用于部署到生产环境。

## 配置静态资源公共基础路径

为了让 build 可以在任何目录下部署，这里将资源路径改为相对路径

```js
export default defineConfig({
  base: "./",
});
```

## 适配老版本浏览器

默认情况下，Vite 构建的项目将会生成适用于现代浏览器的代码。

- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88

如果你需要支持老版本浏览器，你可以按照以下步骤进行操作：

1. **安装插件**: `npm i -D @vitejs/plugin-legacy`
2. **配置插件**:

这里假设需要支持 chrome52

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    legacy({
      targets: ["chrome 52"],
    }),
  ],
});
```

现在，你的 Vite React 项目应该可以在老版本浏览器中正常运行了。

使用 Vite 构建 React 项目是一种快速而愉快的开发体验，同时还能够通过简单的配置适配老版本浏览器。希望这篇博客对你有所帮助，让你更轻松地开始构建 React 应用程序。
