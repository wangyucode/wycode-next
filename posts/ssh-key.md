---
title: "解决 invalid format git@github.com: Permission denied (publickey)."
date: 2023-09-11 23:19:47
tags:
  - Linux
  - Git
category: Linux
---

![git](https://git-scm.com/images/logo@2x.png)

git 在远端 pull 或者 push 时报：

```
invalid format git@github.com: Permission denied (publickey).
```

## 问题场景：

windows 上把 private key 的内容复制到文本编辑器时会出现。

## 根本原因：

私钥的换行是单字符`LF`，但 windows 的默认换行符是`CRLF`，所以导致 git 读取私钥报格式错误。

## 解决办法：

使用文本编辑器修改换行符，例如 VSCODE 中状态栏点击`CRLF`，然后切换成`LF`。

## 笔记：

通过`ssh -vT git@github.com` 可以查看详细的 ssh log，来排查 ssh 的问题。
出现如下 log 说明 ssh key 已经正常配置：

```
Hi wangyucode! You've successfully authenticated, but GitHub does not provide shell access.
```
