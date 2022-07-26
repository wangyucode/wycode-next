---
title: 安装Node.js和npm的最佳实践
date: 2017-11-14 11:06:35
tags:
- NodeJS
- JavaScript
- Linux
- Ubuntu
category: Frontend
---

## Linux平台

使用cURL:

```bash
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

使用Wget:(Ubuntu默认没有安装cURL,推荐使用Wget)

```bash
$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```

安装完成后，重启终端并执行下列命令即可安装 Node.js。

```bash
$ nvm install stable
```

## Windows平台

建议使用`.msi`安装程序进行安装。推荐勾选`Add to PATH`可以自动添加到环境变量，方便全局使用相关命令。
