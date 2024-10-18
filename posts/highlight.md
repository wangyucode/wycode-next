---
title: 为HTML中的代码添加语法高亮
date: 2017-6-14 14:20:32
tags:
- HTML
- CSS
- JavaScript
category: Frontend
---

![highlight.js](https://avatars.githubusercontent.com/u/9039821?s=280&v=4)

> Hexo 默认对于代码高亮的处理过于粗暴，改变了其原有的`<pre><code>`标签形式，而且并没有达到良好的效果，所以尝试自己添加语法高亮功能。此文档也适用于其它HTML文档中代码的语法高亮显示。

**我这里使用highlight.js进行添加语法高亮**

<!--more-->

### highlight.js优势：

- 176 languages and 79 styles
- automatic language detection
- multi-language code highlighting
- available for node.js
- works with any markup
- compatible with any js framework

## 下面开始集

添加引用：
```html
<link rel="stylesheet" href="/path/to/styles/monokai-sublime.css">
<script src="/path/to/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```
以上第一行是风格样式，我这里使用了`monokai-sublime`样式；
第二行是highlight的JS库；
第三行在文档加载时自动检测`<pre><code>`标签进行格式化。

**highlight.js**虽然支持100多种语言，但默认并不包含所有，在下载页提供了语言选择，建议自己选择下载，毕竟每个人心目中的热门语言都不同，个人需要在页面中使用的语言也不同。

当然你也可以使用一些静态CDN库进行加速。

我的博客就是使用了这个库，以下是一段Java代码示例：

```java
/******************************************************************************
 *  Compilation:  javac HelloWorld.java
 *  Execution:    java HelloWorld
 *
 *  Prints "Hello, World". By tradition, this is everyone's first program.
 *
 *  % java HelloWorld
 *  Hello, World
 *
 ******************************************************************************/

public class HelloWorld {

    public static void main(String[] args) {
        // Prints "Hello, World" to the terminal window.
        System.out.println("Hello, World");
    }

}
```
