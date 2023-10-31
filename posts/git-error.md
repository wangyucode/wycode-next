---
title: 从0开始开发一个评论系统
date: 2015-5-21 18:57:12
tags:
- Git
category: Backend
---

# 解决 invalid format git@github.com: Permission denied (publickey).

git在远端pull或者push时报：

```
invalid format git@github.com: Permission denied (publickey).
```

<!--more-->

## 问题场景：

windows上把private key的内容复制到文本编辑器时会出现

## 根本原因：

私钥的换行是单字符`LF`，但windows的默认换行符是`CRLF`，所以导致git读取私钥报格式错误。

## 解决办法：

使用文本编辑器修改换行符，例如VSCODE中状态栏点击`CRLF`，然后切换成`LF`。
