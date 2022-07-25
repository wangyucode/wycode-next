---
title: 备份和还原Docker容器中的MongoDB数据
date: 2020-12-5 12:46:45
tags:
- Docker
- MongoDB
categories: Backend
---

![MongoDB](/images/20201204_mongodb.svg)

> 本文介绍如何使用两行简单的命令来执行备份和还原Docker容器中MongoDB的数据库数据。

<!--more-->

## 备份

备份MongoDB有多种方法，其中比较简单的就是使用`mongodump`。

```bash
docker exec -i <CONTAINER_NAME> mongodump -d <DATABASE> --archive > ./mongo/collections.archive
```

- 以上命令会将`<CONTAINER_NAME>`容器中的`<DATABASE>`数据库dump到host机器的`collections.archive`文件中。
- `--archive`会dump所有`collection`到一个文件。
- `mongodump`命令不提供目标路径的话会将dump结果输出到标准输出，这里使用`>`重定向输出到host的文件。

## 还原

这里使用host机器上的`collections.archive`文件进行还原。

```bash
docker exec -i <CONTAINER_NAME> mongorestore --archive < ./mongo/collections.archive
```

- `--archive`模式导出的备份文件还原时必须也要加上`--archive`
- `mongorestore`命令不提供源路径的话会使用标准输入，这里使用`<`重定向host的文件作为`mongorestore`的输入。

