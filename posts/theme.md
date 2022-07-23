---
title:  自定义Hexo主题
date: 2017-6-15 12:47:36
tags:
- Hexo
- Bootstrap
- HTML
categories: Frontend
---

> 刚刚完成了Hexo博客主题的自定义，现在总结如下，让我们一起来看看如何打造一款属于自己的Hexo主题。

如何创建一个新主题以及如何切换主题在官网的[doc](https://hexo.io/zh-cn/docs/themes.html "doc")中有说明，这里我们只讨论如何打造一个新的属于自己的模版。
## 方法
> Hexo使用了**模版**进行渲染的方式来实现网页风格的自定义。其核心是一种嵌套、引用的风格实现对网页内容模块化管理。所以我也采取从外向里，抽丝剥茧，剥洋葱式的一层层展开来看其中的原理及如何去自定义。此文需要基本的HTML知识。

<!--more-->
## 模版文件
所有的模版文件都放置在`layout`文件夹中，所有用到的资源（CSS，JavaScript，图片等）都放置在`source`文件夹中。

模版的根入口文件是`layout`下的`layout.ejs`文件。

> 这里的`.ejs`是模版采用的引擎，除了EJS，还有Haml和Jade，我大概看过Jade，比EJS更简洁，EJS更像HTML，我自己选择了EJS，原因是无需新学规则，还有就是官方提供的`landscape`也是采用的EJS，我的模版就是根据官方的`landscape`修改而来。

## layout.ejs
我们先来看看这个`layout.ejs`的内容：
```html
<!DOCTYPE html>
<html>
<%- partial('_partial/head') %>
<body>
<%- partial('_partial/wycode-nav') %>
<%- partial('_partial/blog-nav') %>
<div class="container">
    <div class="row">
        <div class="content"><%- body %></div>
    </div>
</div>
<%- partial('_partial/footer', null, {cache: !config.relative_link}) %>
<%- partial('_partial/after-footer') %>
</body>
</html>
```
可以看到以上就是典型的HTML文件框架。
### 重点来了：
这里唯一的区别就是多了很多`<%- %>`，凡是在这个`<%- %>`里面的部分就是EJS模版的代码部分，而`partial('_partial/head')`的意思就是引用了一个模块，位置是`_partial`文件夹的`head.ejs`。

## head.ejs
然后我们看看这个`head.ejs`的内容：
```html
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <%
    var title = page.title;

    if (is_archive()) {
        title = __('archive_a');

        if (is_month()) {
            title += ': ' + page.year + '/' + page.month;
        } else if (is_year()) {
            title += ': ' + page.year;
        }
    } else if (is_category()) {
        title = __('category') + ': ' + page.category;
    } else if (is_tag()) {
        title = __('tag') + ': ' + page.tag;
    }
    %>
    <title>
        <% if (title){ %>
        <%= title %> |
        <% } %>
        <%= config.title %></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <% if (theme.rss){ %>
    <link rel="alternate" href="<%- theme.rss %>" title="<%= config.title %>" type="application/atom+xml">
    <% } %>
    <% if (theme.favicon){ %>
    <link rel="icon" href="<%- url_for(theme.favicon) %>">
    <% } %>
    <!-- Bootstrap -->
    <%- css('flat/dist/css/vendor/bootstrap.min.css') %>
    <%- css('flat/dist/css/flat-ui.min') %>
    <%- css('font-awesome-4.7.0/css/font-awesome.min') %>
    <%- css('highlight/styles/monokai-sublime') %>
    <%- css('css/blog') %>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <%- js('flat/dist/js/vendor/html5shiv') %>
    <%- js('flat/dist/js/vendor/respond.min') %>
    <![endif]-->
</head>
```
可以看到这个`head.ejs`就是HTML中`<head></head>`标签的内容，这里我替换了原有的CSS，使用了[Bootstrap](http://www.bootcss.com/ "Bootstrap")框架。

剩下的就是依次类推了。

附：layout文件结构
```
layout
│  archive.ejs
│  category.ejs
│  index.ejs
│  layout.ejs
│  page.ejs
│  post.ejs
│  tag.ejs
│
├─_partial
│  │  after-footer.ejs
│  │  archive-post.ejs
│  │  archive.ejs
│  │  article.ejs
│  │  blog-nav.ejs
│  │  footer.ejs
│  │  head.ejs
│  │  sidebar.ejs
│  │  wycode-nav.ejs
│  │
│  └─post
│          category.ejs
│          date.ejs
│          nav.ejs
│          tag.ejs
│          title.ejs
│
└─_widget
        archive.ejs
        category.ejs
        recent_posts.ejs
        tag.ejs
        tagcloud.ejs
```
