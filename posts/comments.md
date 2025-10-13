---
title: 给自己的网站添加评论功能
date: 2017-6-9 16:31:25
tags:
- HTML
- CSS
- JavaScript
category: Frontend
---

## 解决方案

### 动态自建
需要数据库存储，后台接口，以及前端页面等都自己实现。
**优点**：所有技术和数据都在自己手中，可控性强，安全。
**缺点**：细节很多，包括表结构，顶和踩计数、还有评论的评论（盖楼）、排序、敏感词过滤、审核等等。还是挺大的一个系统

### 静态集成第三方
目前流行的有以下几种:
【[Disqus](https://disqus.com/ "Disqus")】：国外的，因为众所周知的原因，可能被墙。
【多说】：之前很多人在用，不过已经停止服务了，他们的代码开源在[github.com/duoshuo](https://github.com/duoshuo "github.com/duoshuo")，有兴趣可以参考。
【[畅言](https://changyan.kuaizhan.com/ "畅言")】：搜狐出品。
【[网易云跟帖](https://gentie.163.com/ "网易云跟帖")】：网易出品。

<!--more-->

## 选择

不想耗费太多精力，也不想重复造轮子，所以选择集成网易云跟帖，也是因为一直对网易的产品比较有好感。

## 过程

1.  使用网易账号登陆云跟帖后台；

2.  填写基本信息和相关信息：
![](/images/20170609_pinglun_01.jpg)
【图1】
3.  然后就可以获取代码集成了：
![](/images/20170609_pinglun_02.jpg)
【图2】
 代码如下：
```html
<div id="cloud-tie-wrapper" class="cloud-tie-wrapper"></div>
<script src="https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js"></script>
<script>
var cloudTieConfig = {
  url: document.location.href,
  sourceId: "",
  productKey: "32b5a020f7eb416280e9317a050982ac",
  target: "cloud-tie-wrapper"
};
var yunManualLoad = true;
Tie.loader("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", true);
</script>
```
云跟帖通过`url`、`sourceId`、`productKey`这三个参数确定唯一的一个网页，`productKey`一定要替换成你自己的；

因为我在[wangyucode.github.io](https://wangyucode.github.io "wangyucode.github.io")和[wycode.cn](http://wycode.cn "wycode.cn")都部署了一样的网页，所以我把`url: document.location.href`，替换为`url: "http://wycode.cn/about.html"`，使github和我自己的服务器上拥有一样的数据。

## 后续
- 云跟帖支持数据审核，敏感词过滤等，你可以自主选择显示哪些评论。
- 云跟帖支持数据导出，以后要做迁移可以导出数据
- 还支持评论时回推数据到你指定的地址，此功能结合api可以做到产生评论立即推送一条消息到自己的手机，做到消息秒回！
