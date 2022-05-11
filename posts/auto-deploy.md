---
title: 基于Docker的自动化部署
date: 2021-5-9 10:59:26
tags:
- Watchtower
- Docker
- NodeJS
categories: CI/CD
---

![flow](/images/20200512_auto_deploy.png)

> 之前写过一篇文章关于[使用Github Action进行持续集成](/2020-10-28-github-action.html)。
但是如何将构建好的软件包，分发到运行环境？托付给自动化服务后如何保证服务器安全？Docker化部署的话，服务器上的Docker引擎如何自动检查、拉取、运行最新的镜像？
本文介绍如何解决这些问题。

<!--more-->

## 镜像分发

对于Docker构建的镜像，我们可以将其推送到Docker hub之类的镜像仓库。
然后在服务器上运行`docker pull <Image Name>`或者`docker-compose pull <Service>`就可以将镜像拉下来。
然后再重新运行就可以了。

这种方式解决了服务器的安全问题。

但是如何将这一套流程自动化呢。

## 自动检查镜像更新和重新运行

一个思路就是专门写一个守护程序，在接收到某种API请求时，执行以上的操作。但是这样它就脱离了Docker的管理，而且其本身也是需要维护和部署的。

但是如果将它也作为Docker镜像的话，`Container`又如何控制宿主机中的`Docker Engine`呢？

这也有办法，我们只需要将`Host`的Docker域套接字(`UNIX domain socket`)，挂载到`Container`中：

```bash
docker run ... -v /var/run/docker.sock:/var/run/docker.sock
```

因为Docker是CS模式，这样`Container`就可以控制宿主机的Docker引擎，以实现上述操作了。有人将其称为`Docker in Docker`。

而以上这个思路已经有人造好轮子了。

## Watchtower

Watchtower本身就是一个Docker镜像，支持定时、或者API Hook等方式触发检查，在发现有更新的镜像时，它会停止当前运行的容器，自动拉取镜像，重新以之前运行的参数重启容器，完美解决我们的需求。

最终的流程参考文章开头的流程图。

这样一来，我们只需要push代码，Github Action会自动构建Docker镜像并push到Docker hub，然后curl一下我们的watchtower，它就会自动帮我们拉取并运行最新的镜像了。

省了不少时间，最重要的：**不要内卷，要work-life balance**
