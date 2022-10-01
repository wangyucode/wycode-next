---
title: 升级到HTTP3
date: 2022-9-29 14:41:30
tags:
- HTTP
- NGINX
category: Frontend
---

![quic](https://quic.nginx.org/static/img/quic.svg)

基于UDP的HTTP/3协议规范[RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114)于2022年6月发表。而HTTP/2协议规范[RFC 7540](https://httpwg.org/specs/rfc7540.html)于2015年5月发表。

HTTP/2通过多路复用（multiplexing）和头部压缩，能够有效降低延迟。同时还提供了不同于`WebScoket`协议的服务端推送的新方法。

HTTP3则使用基于UDP的QUIC协议，从根本上解决头部阻塞的问题，特别适用于移动网络不稳定情况下的网络效率改善。

本文介绍HTTP2，HTTP3协议的新特性，以及通过NGINX升级到HTTP2和HTTP3的方法。

<!--more-->

## 回顾HTTP/1.0和HTTP/1.1

- HTTP/1.0每发送一个请求，就要建立一个新的TCP连接。
- HTTP/1.1加入了请求流水线（request pipelining），和持久连接。但多数情况下仍然会对不同的请求建立多个连接。由于TCP的特性，阻塞控制无法在多个连接之间共享，且浏览器限制了同服务器的总连接数。所以网络效率仍然较低。
- 此外HTTP/1.1和1.0都使用明文，用空格和回车进行字段分割，这导致了解析的复杂性和对不同变体的容忍度提升。

## HTTP2

HTTP/2引入了二进制帧和多路复用来改善延迟，但它没有修改传输层（TCP），由于TCP严格按照顺序发送数据包，当数据包发生丢失时，TCP协议会重发数据包，所以在丢包率较高的情况下多路复用的机制反而会变慢。

## HTTP3

HTTP/3使用基于UDP的QUIC协议，拥有HTTP2所有的优良特性，并且由于UDP天生无需握手，且在网络环境发生变化时无需重新建立连接，例如切换移动网络到WIFI。

## 升级到HTTP2

NGINX默认使用HTTP/1.1, 我们只需简单的添加`http2`到`listen`指令即可无痛升级到HTTP2：

```nginx
...
server {
    listen 443 ssl http2;
    ...
}
```
## 升级到HTTP3

截止到今天（2022年10月1日），NGINX对HTTP3的支持还在开发中（nginx-quic分支），官方还没有发布基于此分支的docker镜像，这里我使用民间编译的镜像`dasskelett/nginx-quic`。

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

至此本站已全面支持HTTP3。




