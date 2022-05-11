---
title: H2数据库修改密码
date: 2019-8-14 15:52:31
tags:
- SQL
categories: Back-end
---

![H2](https://www.h2database.com/html/images/h2-logo-2.png)

使用中的H2数据库如何修改用户名密码呢？执行下面的SQL就可以了：

```sql
alter user wayne set password '*****password*****'
```