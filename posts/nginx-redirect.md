---
title: NGINX配置重定向
date: 2019-5-17 10:34:11
tags:
- Linux
- NGINX
categories: Linux
---

![NGINX](https://nginx.org/nginx.png)

> 服务器配置Https之后，我们希望同时支持http，但是80端口进来的请求直接重定向到443端口上。

> 有时我们会将某些网页永久迁移到别的地址，但是又不想让老用户直接无法访问，或者看到404，而是要将这些老地址的请求转发到新地址上。

这篇文章教你如何配置NGINX重定向。

<!--more-->

NGINX安装及配置请移步这里：[Nginx安装](/2018-06-23-nginx.html "NGINX安装")


## 使用rewrite

```
server {
#...
	rewrite (.*)$ https://wycode.cn$1 permanent;
#...
}
```
这里将这个server的所有请求，永久定向到 https://wycode.cn 上，并将请求的path拼接在后面

## 使用return 301

```
server {
	listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/nginx/cert/wycode.pem;
    ssl_certificate_key /etc/nginx/cert/wycode.key;

    server_name wycode.cn www.wycode.cn;

    error_page 404 = https://wycode.cn/404.html;

    location / {
        root /var/www/wycode.cn;
        index index.html;
        try_files $uri $uri/ =404;
    }
}
server {
    listen 80;
    listen [::]:80;
    server_name wycode.cn www.wycode.cn;
    return 301 https://$host$request_uri;
}
```

这里的第二个`server`监听80端口，在下面的`return 301`语句中将请求转发到第一个`server`中去，并且`host`和`request_uri`不变。

以上，转载请注明出处!