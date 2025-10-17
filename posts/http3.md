---
title: 升级到HTTP3
date: 2022-9-29 14:41:30
tags:
  - HTTP
  - NGINX
category: Frontend
---

![http3](https://www.zhengdexing.org/2020/10/20/HTTP%E5%8D%8F%E8%AE%AE-HTTP3/6301972-9482e8b53c342058.png)

基于 UDP 的 HTTP/3 协议规范[RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114)于 2022 年 6 月发表。而 HTTP/2 协议规范[RFC 7540](https://httpwg.org/specs/rfc7540.html)早在 2015 年 5 月发表。但是仍然有很多网站在使用更加古老的 HTTP1.1。

HTTP/2 通过多路复用（multiplexing）和头部压缩，能够有效降低延迟。同时还提供了不同于`WebScoket`协议的服务端推送的新方法。

HTTP3 则使用基于 UDP 的 QUIC 协议，从根本上解决头部阻塞的问题，特别适用于移动网络不稳定情况下的网络效率改善。

本文介绍 HTTP2，HTTP3 协议的新特性，以及通过 NGINX 升级到 HTTP2 和 HTTP3 的方法。

<!--more-->

## 回顾 HTTP/1.0 和 HTTP/1.1

- HTTP/1.0 每发送一个请求，就要建立一个新的 TCP 连接。
- HTTP/1.1 加入了请求流水线（request pipelining），和持久连接。但多数情况下仍然会对不同的请求建立多个连接。由于 TCP 的特性，阻塞控制无法在多个连接之间共享，且浏览器限制了同服务器的总连接数。所以网络效率仍然较低。
- 此外 HTTP/1.1 和 1.0 都使用明文，用空格和回车进行字段分割，这导致了解析的复杂性和对不同变体的容忍度提升。

## HTTP2

HTTP/2 引入了二进制帧和多路复用来改善延迟，但它没有修改传输层（TCP），由于 TCP 严格按照顺序发送数据包，当数据包发生丢失时，TCP 协议会重发数据包，所以在丢包率较高的情况下多路复用的机制反而会变慢。

## HTTP3

HTTP/3 使用基于 UDP 的 QUIC 协议，拥有 HTTP2 所有的优良特性，并且由于 UDP 天生无需握手，且在网络环境发生变化时无需重新建立连接，例如切换移动网络到 WIFI。

## 升级到 HTTP2

NGINX 默认使用 HTTP/1.1, 我们只需简单的添加`http2`到`listen`指令即可无痛升级到 HTTP2：

```nginx
...
server {
    listen 443 ssl http2;
    ...
}
```

## 升级到 HTTP3

截止到今天（2022 年 10 月 1 日），NGINX 对 HTTP3 的支持还在开发中（nginx-quic 分支），官方还没有发布基于此分支的 docker 镜像，这里我使用民间编译的镜像`dasskelett/nginx-quic`。

修改配置:

```nginx
...
server {
    listen 443 ssl http2;
    listen 443 http3 reuseport;
    ...
    ssl_early_data on;

    add_header Alt-Svc 'h3=":443"; ma=86400';
    add_header QUIC-Status $http3;
    ...
}
```

至此本站已全面支持 HTTP3。
