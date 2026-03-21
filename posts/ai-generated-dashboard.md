---
title: AI-Powered Data Visualizer - AI 驱动的数据库可视化面板
date: 2026-03-21 12:00:00
tags:
  - Next.js
  - AI
  - SQLite
  - Data Visualization
category: Fullstack
---

![AI-Powered Data Visualizer](/images/20260321_dashboard.jpg)

在日常开发和数据分析中，我们经常需要从数据库中提取关键信息并将其可视化。虽然有很多优秀的 BI 工具（如 Metabase, Superset 等），但它们对于个人开发者或小型项目来说，往往存在以下问题：

1. **学习成本高**：需要学习复杂的 SQL 编写和报表配置流程。
2. **部署繁琐**：通常需要配套复杂的后端服务和权限管理系统。
3. **响应不够直观**：从数据到图表的转化过程不够"智能"，依然需要大量手动调整。

为了解决这些痛点，我开发了 **AI-Powered Data Visualizer**。它的目标非常明确：**让数据可视化变得像聊天一样简单**。

*   **AI 智能驱动**：通过自然语言对话，自动生成 SQL 并转化为可视化图表。
*   **全栈 Next.js 架构**：极致的响应速度和现代化的 UI 体验。

同时，这也是一个非常好的 `Next.js + AI` 全栈开发实践项目。

<!--more-->

## 技术栈选择 (Why this way?)

为了实现智能化和易用性的目标，技术栈的选择至关重要。

### 核心框架：Next.js + TypeScript

*   **Next.js**：作为 React 生态中最成熟的全栈框架，提供了极佳的开发体验和性能表现。
*   **TypeScript**：保证了代码的健壮性和可维护性，特别是在处理复杂的 AI 响应数据时。

### AI 交互：Vercel AI SDK + OpenAI/DeepSeek

*   **Vercel AI SDK**：提供了流式输出（Streaming）和高度集成的 AI 钩子，让聊天界面极其流畅。
*   **多模型支持**：支持 Doubao, OpenAI, Anthropic, DeepSeek 等主流 AI 提供商，灵活切换。

### 数据可视化：Vega-Lite

*   **Vega-Lite**：一种声明式的高级可视化语法。AI 只需生成 JSON 配置，即可渲染出美观、交互性强的图表，非常适合与 AI 结合。

### 数据库：SQLite + Knex.js

*   **SQLite**：轻量级且零配置，非常适合作为可视化工具的后端存储或分析对象。
*   **Knex.js**：强大的 SQL 查询构建器，方便 AI 生成和执行安全的数据库操作。

## 技术实现细节与亮点

### 1. 智能数据架构分析

系统会自动扫描数据库表结构（Schema），并将关键信息作为上下文提供给 AI。这使得 AI 能够理解数据之间的关联，从而生成准确的分析建议，而无需用户手动输入复杂的 SQL。

### 2. 声明式图表生成

不同于 ECharts 等命令式框架，Vega-Lite 允许 AI 通过描述"数据如何映射到图形属性"来生成图表。
这种方式极大地降低了 AI 生成错误代码的概率，同时也让生成的图表具备了统一的风格和高度的自定义能力。

### 3. 灵活的持久化存储

用户通过对话生成的图表，可以一键保存到个人仪表盘（Dashboard）中。仪表盘状态使用 **Zustand** 进行轻量级状态管理，并持久化到本地数据库，方便随时查看。

### 4. 安全性设计 (Read-Only)

数据安全至关重要。系统默认以**只读模式**（Read-Only）连接用户数据库，确保 AI 即使在极端情况下也不会修改或删除原始数据。同时内置了管理密码保护，防止未授权的配置访问。

## 功能与使用

### 主要功能

*   **自然语言对话**：通过"帮我统计上个月的销售趋势"等指令生成图表。
*   **多数据库支持**：适配 MySQL, PostgreSQL 和 SQLite。
*   **可视化建议**：AI 会根据数据特征自动推荐合适的图表类型。
*   **自定义仪表盘**：自由组织、编辑和保存 AI 生成的图表。

### 快速部署

推荐使用 Docker 进行部署，极其简单：

```bash
docker run -d \
  -p 3000:3000 \
  -e API_KEY=your_api_key \
  -e ADMIN_PASSWORD=your_secure_password \
  -v /path/to/your/db:/app/data/db/sqlite.db:ro \
  --name ai-dashboard \
  wangyucode/ai-generated-dashboard
```

### 配置说明

*   `API_KEY`：AI 服务的密钥。
*   `ADMIN_PASSWORD`：管理界面的登录密码。
*   挂载目录：将你的 SQLite 数据库文件挂载到容器的 `/app/data/db/sqlite.db` 即可开始分析。

## 总结

如果你正在寻找一个能帮你快速从数据库中"挖掘"价值，且无需编写代码的可视化工具，**AI-Powered Data Visualizer** 绝对值得一试。

项目地址：https://github.com/wangyucode/ai-generated-dashboard

本文原始发表于 <https://wycode.cn/blog/openclaw-docker>，转载请注明出处
