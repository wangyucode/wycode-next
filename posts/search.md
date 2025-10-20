---
title: 为Hexo博客添加全文搜索
date: 2017-6-15 15:20:55
tags:
  - jQuery
  - Hexo
  - Bootstrap
category: Frontend
---

> 本文介绍如何利用`hexo-generator-search`插件为 Hexo 博客添加本地全文搜索

## 原理

`hexo-generator-search`实际上是根据网页内容生成了一个数据文件，格式是`XML`或者`JSON`。然后通过 JS 代码去匹配这个文件的内容，从而达到搜索的目的。

## 最终效果

![最终效果](/images/20170616_search_01.png "最终效果")

<!--more-->

## 步骤

### 安装 hexo-generator-search

```bash
$ npm install hexo-generator-search --save
```

### 配置

在`_config.yml`中添加

```yaml
search:
  path: search.xml
  field: post
```

### 使用

再次生成博客，就会发现`public`根目录下多了`search.xml`文件。

### 写一个搜索框：

使用`Bootstrap`框架的`modal`应该是极好的。
修改 Hexo 主题，（对此不了解的可以查看我的自定义 Hexo 主题的相关内容），在`layout.ejs`中添加一个 modal：

```html
<%- partial('_partial/search-modal') %>
```

> 根据 Bootstrap 文档，modal 需要尽量作为 body 标签的直接子元素。

`search-modal.ejs`的代码如下：

```html
<div class="modal fade" id="searchModal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <i class="fa fa-search" aria-hidden="true"></i> 搜索
        <input
          type="text"
          class="form-control"
          id="searchInput"
          placeholder="Keyword"
        />
        <div class="search-content" id="searchResult"></div>
      </div>
    </div>
  </div>
</div>
```

> 链接加上`data-toggle="modal"  href="#searchModal"`属性即可实现 modal 的展开

### 搜索代码：

```javascript
// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
//

var searchFunc = function (path, search_id, content_id) {
  "use strict";
  $.ajax({
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {
      // get the contents from search data
      var datas = $("entry", xmlResponse)
        .map(function () {
          return {
            title: $("title", this).text(),
            content: $("content", this).text(),
            url: $("url", this).text(),
          };
        })
        .get();

      var $input = document.getElementById(search_id);
      var $resultContent = document.getElementById(content_id);

      $input.addEventListener("input", function () {
        var str = '<ul class="search-result-list">';
        var keywords = this.value
          .trim()
          .toLowerCase()
          .split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        // perform local searching
        datas.forEach(function (data) {
          var isMatch = true;
          var content_index = [];
          if (!data.title || data.title.trim() === "") {
            data.title = "Untitled";
          }
          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content
            .trim()
            .replace(/<[^>]+>/g, "")
            .toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          // only match artiles with not empty contents
          if (data_content !== "") {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i == 0) {
                  first_occur = index_content;
                }
                // content_index.push({index_content:index_content, keyword_len:keyword_len});
              }
            });
          } else {
            isMatch = false;
          }
          // show search results
          if (isMatch) {
            str +=
              "<li><a href='" +
              data_url +
              "' class='search-result-title'>" +
              data_title +
              "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0) {
              // cut out 100 characters
              var start = first_occur - 20;
              var end = first_occur + 80;

              if (start < 0) {
                start = 0;
              }

              if (start == 0) {
                end = 100;
              }

              if (end > content.length) {
                end = content.length;
              }

              var match_content = content.substr(start, end);

              // highlight all keywords
              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(
                  regS,
                  '<em class="search-keyword">' + keyword + "</em>"
                );
              });

              str += '<p class="search-result">' + match_content + "...</p>";
            }
            str += "</li>";
          }
        });
        str += "</ul>";
        $resultContent.innerHTML = str;
      });
    },
  });
};
```

### 添加链接

```html
<%- js('js/search') %>
<script>
  searchFunc('<%= url_for('search.xml') %>', 'searchInput', 'searchResult');
</script>
```

### 高亮关键词

```javascript
keywords.forEach(function (keyword) {
  var regS = new RegExp(keyword, "gi");
  data_title = data_title.replace(
    regS,
    '<em class="search-keyword">' + keyword + "</em>"
  );
});
```

```css
.search-keyword {
  color: #c7254e;
}
```
