---
title: Spring Boot + Spring Security + H2 + Thymeleaf做一个后台管理系统
date: 2017-10-26 09:56:19
tags:
- Spring
- Java
- Thymeleaf
category: Backend
---

- Spring Boot能够创建独立的Spring应用程序，在云计算，分布式流行的今天，它提供了一种非常契合目前web开发需求的解决方案，是Java开发web应用的不二选择。

- Spring Security是一款功能强大，可定制的身份验证和访问控制框架。

- H2数据库是一个轻量级的数据库引擎，开源，快速，它可以嵌入到Java程序中，作为内存数据库，也可以持久化，并提供了一个web程序，可以可视化操作数据。使用H2的还有一个重要原因是我的服务器只有512M内存，我无法使用MySQL这样的重量级数据库。

- Thymeleaf是一个后台模版引擎，它是JSP的完美替代品，在快速渲染网页的基础上，它不会改变HTML代码结构，从而前端工程师仍然可以用假数据预览。Demo页面可以给后台人员直接使用。（当然并没有前端工程师，不过后期我会使用Vue做一个前后端分离的系统）

<!--more-->


先偷个懒吧，直接上github仓库。。。

[https://github.com/wangyucode/WebFramework](https://github.com/wangyucode/WebFramework)
