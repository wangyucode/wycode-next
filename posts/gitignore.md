---
title: Android Studio工程应该忽略的文件及如何使用gitignore
date: 2017-6-16 14:46:22
tags:
  - Android
  - Git
  - SVN
category: Android
---

![gitignore](https://git-scm.com/images/logo@2x.png)

> 本文介绍版本控制中，Android Studio 工程应该忽略的文件，以及如何使用`.gitignore`文件快速配置自动忽略，教程同时适用于 Git 和 SVN。

<!--more-->

## 应该忽略的文件：

```
*.iml
.gradle
/local.properties
/.idea
.DS_Store
**/build
/captures
.externalNativeBuild
```

- `.iml`是 IDEA 的 module 描述文件，和工程配置相关，在每一个 module 都有，需要忽略。\*表示忽略所有的`.iml`

### 使用 gitignore

这是最简单的方式

在项目根目录下创建`.gitignore`文件，将上面应该忽略的文件，内容复制到`.gitignore`中。

用 Android Studio 打开`.gitignore`文件时会在右上角弹出安装 gitignore 插件，点击安装即可，安装完成后就自动设置好忽略了，如果要添加忽略文件，只需要在`.gitignore`中添加文件路径即可。

### 自己设置忽略

右键点击相应文件，选择相应 VCS 操作即可。

### `gitignore`的官方模板仓库

此外 github 官方提供了一个仓库，里面包含了绝大多数平台，语言的 gitignore 模板
https://github.com/github/gitignore
