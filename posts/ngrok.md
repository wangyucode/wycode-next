---
title: 实现内网穿透的最新姿势
date: 2019-9-2 12:15:50
tags:
- Linux
category: Linux
---

![Network](https://www.howtogeek.com/thumbcache/2/200/b47f24b18abd7d5411b75447849e04ff/wp-content/uploads/2017/03/why-is-a-network-tunnel-called-a-tunnel-00.jpg)

当我们需要在外网访问处于内网的服务时，就需要内网穿透这个技术了。

本文介绍实现内网穿透的多种方式

<!--more-->

## 有外网IP

如果你的宽带接入是有外网IP的，那很简单，只需要设置路由器的端口转发就可以了。

查看自己是不是有外网IP也很简单，查看路由器获取到的IP和真实的外网IP是否一致就知道了。

真实外网IP，通过搜索引擎搜索IP即可获取。

由于现在小区宽带都是接入到服务商的大路由上，IPV4的资源也很珍贵，所以基本都是没有外网IP的，本文重点讨论没有外网IP的情况。

## 付费方案

[https://www.oray.com](https://www.oray.com)

花生壳提供软件解决方案，同时他们也提供能够实现穿透的硬件方案。

当然还有`NAT123`，但是他们的官网就像是上个世纪的网站，还是算了吧。

## ngrok

![Network](https://camo.githubusercontent.com/f2d698991e6a0411680413ebcc15a6460b8beda3/68747470733a2f2f6e67726f6b2e636f6d2f7374617469632f696d672f6f766572766965772e706e67)

ngrok1.x是开源的，地址在这：[https://github.com/inconshreveable/ngrok](https://github.com/inconshreveable/ngrok)
ngrok2.x是闭源的，官网在这：[https://ngrok.com](https://ngrok.com)

ngrok商业化之后估计1.x就很少维护了，2.x目前是有限制的免费。

## frp

![Network](https://github.com/fatedier/frp/raw/master/doc/pic/architecture.png)

`frp`是一个开源的内网穿透的反向代理应用，支持 tcp, udp 协议。

[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

用户通过访问一个装有`frps`的公网服务器，由服务器代理访问处于内网，并安装了`frpc`的内网服务

配置方式，请参考他们的github仓库

## v2ray

`v2ray`通常用于科学上网，但是由于一个 V2Ray 进程可并发支持多个入站和出站协议，所以它也可以用于内网穿透。

反向代理的大致工作原理如下:

- 假设在主机 A 中有一个网页服务器，这台主机没有公网 IP，无法在公网上直接访问。另有一台主机 B，它可以由公网访问。现在我们需要把 B 作为入口，把流量从 B 转发到 A。
- 在主机 A 中配置一个 V2Ray，称为bridge，在 B 中也配置一个 V2Ray，称为portal。
- bridge会向portal主动建立连接，此连接的目标地址可以自行设定。portal会收到两种连接，一是由bridge发来的连接，二是公网用户发来的连接。portal会自动将两类连接合并。于是bridge就可以收到公网流量了。
- bridge在收到公网流量之后，会将其原封不动地发给主机 A 中的网页服务器。当然，这一步需要路由的协作。
- bridge会根据流量的大小进行动态的负载均衡。

具体配置请参考官网及github

[https://www.v2ray.com](https://www.v2ray.com)
[https://github.com/V2Ray/v2ray-core](https://github.com/V2Ray/v2ray-core)