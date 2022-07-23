---
title: 学习和拆解Ant-Design-Pro
date: 2019-6-9 17:55:25
tags:
- TypeScript
- JavaScript
- NodeJS
- React
categories: Frontend
---

![ant-design](https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg)

**Ant-Design**由阿里巴巴旗下蚂蚁金服团队设计开发，服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案。除了交互设计，还提供了开箱即用的高质量`React`和 `Angular`组件实现，用于开发和服务于企业级中后台产品。

**Ant-Design-Pro**是基于`Ant-Design`的功能完备的企业级中后台前端项目，里面可以学习和借鉴的内容很多。其核心基于以下几个技术集成。

- `React`：现代化的JavaScript界面库
- `dva`：类似`Redux`的数据流、状态管理框架
- `UmiJS`：类似`nextJS`的react应用框架

本文从基础使用开始，逐步解析里面用到的技术细节。

<!--more-->

安装及启动在官网有说明，生成的基础工程目录结结构如下：

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public                   # 公共资源目录
│   └── favicon.png          # Favicon
├── src                      # 代码目录
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.js            # 全局 JS
├── tests                    # 测试工具
├── README.md                # readme
└── package.json             # npm管理的清单
```

## 关于哈希路由

现代的前端框架都是单页面的(single-page application)，即用户访问的永远是根目录的index.html，这时网页地址如何展现就是一个问题。解决方案有2个：

- 前端解决：使用哈希路由，即用户看到的地址栏URL是`#`分割的，如`https://wycode.cn/admin/#/users/123`，实际访问仍然是`index.html`。`UmiJS`配置如下

```js
export default {
    ···
    history: 'hash'
    ···
} as IConfig;  
```

- 后端解决：使用重定向，即访问index以外的其它地址，都重定向到`index.html`。`nginx`配置如下:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
## UmiJS非根目录部署

如果工程不是部署在根目录，UmiJS的config做如下配置即可：

```js
export default {
    ···
    base: 'admin'
    ···
} as IConfig;  
```

> **但是：**当配置为hash路由时且非根目录部署时，有可能你希望的首页是`https://wycode.cn/admin/#/`，`/users`页是`https://wycode.cn/admin/#/users`则需要进行如下配置：

```js
export default {
    ···
    history: 'hash',
    publicPath: '/admin/'
    ···
} as IConfig;
```

## 关于HTML模版

umi默认使用`src/pages/document.ejs`这个模版，采用`EJS`渲染，`Favicon`的路径改为`<%= context.publicPath %>favicon.png`可以修复Favicon路径不对的问题。


## 关于区块`block`

区块可以理解为页面模板，这个模板是在`ant-design-pro`的预览网站中，如果你看中了某个功能，（默认创建的工程是空白的，只有一个Welcome页面）点击右下角的下载按钮，会弹出一个命令，执行这个命令就能将这个页面加入到你自己的工程中，非常方便。其实质是执行了`git clone`克隆预览工程的部分文件。

比如：添加一个类似预览工程的404页面

```bash
npx umi block add Exception404  --path=/exception/404
```

经过尝试，我发现目前区块引入时，并不是合并文件，而是创建一个目录，里面包括了这个页面用到的所有组件，甚至是国际化文本都是单独的一套。不管你工程内有没有这些组件，它都会重新创建一套。

比如刚加入了404页面又想加入403页面，本已经存在的Exception组件，会在403文件夹再创建一份一模一样的副本，这点，我觉得是不可接受的。

这样的话我更倾向与参考block的实现手动加入需要的文件，而不是使用`umi block add`功能，官方的block在这里：https://github.com/ant-design/pro-blocks

## 菜单处理

菜单是由路由自动生成，刚刚引入的404页面出现在了菜单栏，它是一个异常页，并不需要在菜单展示，我们只需在路由配置中加入`hideInMenu: true`，即可隐藏。

## 404页面

输入一个不存在的地址，并不能跳转到刚刚加入的404页面。
我们需要将在路由配置中将404的其它配置项删除，仅保留`component: './exception/404'`，并将其挪到数组的最后，这样当路由无法匹配时，就会加载404这个组件了。

