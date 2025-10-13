---
title: 使用Github Action进行持续集成
date: 2020-10-28 20:04:26
tags: 
- Github
- NodeJS
- SFTP
category: CI CD
---

![Github Action](https://www.wangbase.com/blogimg/asset/201909/bg2019091201.jpg)

> `Github Actions`是由Github发布的持续集成(CI)/持续交付(CD)服务，对于公开的仓库是免费使用的。之前我们使用`TravisCI`，现在用`Github Actions`更方便了。

<!--more-->

## Actions

通常一个持续集成的工作流通常包含很多的步骤，这个步骤做的事，称为一个`Action`。

我们会写很多的`Action`（配环境，拉代码，安装依赖，编译，测试，打包，部署），然后将它们组合到一起工作。

## Github Marketplace

组合可以是多种多样的，但是这些`Action`通常都是类似的。所以Github利用自己开源的特点，所有人都可以将自己的`Action`发布到`Github Marketplace`中，供他人使用。

这意味着，你能想到的`Action`几乎都已经被写好了，直接拿来用就行了，不用重复造轮子。

当然自己再造一个轮子也是很简单的。

## 一个典型的workflow

```yml
name: Node.js CI

on: [push] # push代码时执行

jobs:
  build: # jobs名称

    runs-on: ubuntu-latest # 操作系统

    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x] # node版本

    steps:
    - uses: actions/checkout@v2 # 引用action：拉代码
    - name: Use Node.js ${{ matrix.node-version }} # 引用action：配置node环境
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install # 跑命令：安装依赖
    - run: npm run build --if-present # 跑命令：安装依赖
    - run: npm test # 跑命令：执行测试
```

## 使用密码参数

当我们要部署时，有时会用到服务器密码，我们不能直接配置在`workflow`脚本中。这时就要使用密码参数。

1. 在仓库设置（Settings）页面
2. 添加密码（Add a new secret）
3. 使用 `${{secrets.NAME}}` 引用密码（替换`NAME`为你设置的密码名称）

举个例子:

```yml
  # Deploy
  - name: SFTP uploader
    uses: wangyucode/sftp-upload-action@v1.1
    with:
      host: 'wycode.cn'
      port: 22 # optional, default is 22 
      username: ${{ secrets.SERVER_USERNAME }} # optional, default is root
      password: ${{ secrets.SERVER_PASSWORD }} 
      localDir: 'dist'
      remoteDir: '/var/www/dealer/'
      dryRun: false # optional
```

> 注意： 不要使用命令传递密码，应使用环境变量或action的输入。

## 自定义Action（造轮子）

可以使用`Docker`或`JavaScript`

1. 创建一个仓库
2. 编写action定义文件
3. 发布action

我写的sftp部署action的例子：

```yml
name: 'SFTP uploader'
color: 'green'
icon: 'upload'
description: 'upload files to server via SFTP'
inputs:
  host:
    required: true
  port:
    required: false
    default: 22
  username:
    required: false
    default: 'root'
  password:
    required: true
  localDir:
    required: true
  remoteDir:
    required: true
  dryRun:
    required: false
    default: false
runs:
  using: 'node12'
  main: 'dist/index.js'
```

## 完整例子

<https://github.com/wangyucode/dealer/blob/master/.github/workflows/main.yml>

这是一个《谁是卧底发牌员》的网页应用，使用`AngularJS`，线上地址：<https://wycode.cn/dealer/>。

提交代码后，Github Action会自动编译部署到线上。
