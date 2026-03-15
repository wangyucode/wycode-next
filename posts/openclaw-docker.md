---
title: 如何使用 Docker 安全地部署 OpenClaw (龙虾)
date: 2026-03-16 10:00:00
tags:
- Docker
- OpenClaw
- AI
category: AI
---

![OpenClaw](https://ts3.tc.mm.bing.net/th/id/OIP-C.62zMyXVhuvfDknsQBUJEZgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3)

> OpenClaw (龙虾) 是一个强大的个人 AI 助手，它可以连接各种消息平台并执行工具。本文介绍如何通过 Docker Compose 安全地部署 OpenClaw，并解析其中的关键配置。

<!--more-->

OpenClaw 提供了强大的 AI 能力，但也意味着它需要访问你的文件、工具和 API 密钥。因此，**安全性**是部署时的首要考量。

参考这个 GitHub 仓库：[wangyucode/openclaw-docker-compose](https://github.com/wangyucode/openclaw-docker-compose)

## 部署步骤

### 1. 克隆仓库与配置环境

首先，克隆部署配置仓库：

```bash
git clone https://github.com/wangyucode/openclaw-docker-compose.git
cd openclaw-docker-compose
```

复制并编辑 `.env` 文件，填入你的 API 密钥和其他配置：

```bash
cp .env.example .env
vi .env
```

### 2. 执行初始化 (Onboarding)

在启动网关之前，需要运行一次初始化命令来生成必要的配置文件：

```bash
docker compose run --rm openclaw-cli onboard
```

### 3. 启动 OpenClaw

一切就绪后，启动 Docker 容器：

```bash
docker compose up -d
```

## 关键配置解析

为什么我们要这样编写 `docker-compose.yml`？以下是几个关键的安全配置点：

### 非 Root 用户运行

```yaml
user: "1000:1000"
```

默认情况下，Docker 容器以 root 用户运行。如果容器被攻破，攻击者可能获得宿主机的 root 权限。通过指定 `user: "1000:1000"`（通常是宿主机的第一个普通用户），我们可以最小化权限。

### 禁用权限提升

```yaml
security_opt:
  - no-new-privileges:true
```

这项配置可以防止容器内的进程通过 `setuid` 或 `setgid` 二进制文件获得新的权限。即使攻击者在容器内找到了漏洞，也无法提升权限。

### 移除不必要的 Capability

```yaml
cap_drop:
  - ALL
```

Linux Capabilities 将 root 的特权细分为多个小的权限。默认情况下，Docker 会保留一些常用的权限。通过 `cap_drop: [ALL]`，我们移除了所有特权，只保留最基础的运行环境。

### 持久化存储与权限

```yaml
volumes:
  - ./.openclaw:/home/node/.openclaw
```

将配置文件和工作区映射到宿主机目录，方便备份和管理。注意宿主机目录的权限应与 `user` 配置一致（例如 `chown -R 1000:1000 .openclaw`）。

## 访问控制

OpenClaw 默认运行在 `18789` 端口。访问 Dashboard 时需要一个 Token，你可以通过以下命令获取：

```bash
docker compose run --rm openclaw-cli dashboard --no-open
```

## 总结

通过 Docker 部署 OpenClaw 不仅简化了环境配置，更重要的是通过容器化技术提供了良好的安全隔离。遵循“最小权限原则”，我们可以更放心地让 AI 助手为我们工作。

本文原始发表于 <https://wycode.cn/blog/openclaw-docker>，转载请注明出处
