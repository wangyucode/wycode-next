---
title: "解决 invalid format git@github.com: Permission denied (publickey)."
date: 2023-09-11 23:19:47
tags:
- Linux
- Git
category: Linux
---

![git](https://1000marcas.net/wp-content/uploads/2021/06/Git-Logo-1280x800.png)

git在远端pull或者push时报：

```
invalid format git@github.com: Permission denied (publickey).
```

## 问题场景：

windows上把private key的内容复制到文本编辑器时会出现。

## 根本原因：

私钥的换行是单字符`LF`，但windows的默认换行符是`CRLF`，所以导致git读取私钥报格式错误。

## 解决办法：

使用文本编辑器修改换行符，例如VSCODE中状态栏点击`CRLF`，然后切换成`LF`。

## 笔记：

通过`ssh -vT git@github.com` 可以查看详细的ssh log，来排查ssh的问题。
出现如下log说明ssh key已经正常配置：
```
Hi wangyucode! You've successfully authenticated, but GitHub does not provide shell access.
```
