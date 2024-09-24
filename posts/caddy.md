---
title: Caddy的安装和使用
date: 2024-09-24 08:00:00
tags:
- Linux
- Docker
category: Linux
---

![Caddy](https://caddyserver.com/resources/images/logo-dark.svg)

> 之前一直使用Nginx作为反向代理和静态网站服务，Caddy作为替代，有诸多好处，比如：配置简单，支持API，Caddyfile, JSON多种配置方式；支持自动HTTPS，自动更新TLS证书；内置支持HTTP1, HTTP2, HTTP3, Websocket。

这篇文章安装和配置Caddy的全流程

<!--more-->

## 安装Caddy

当前安装最简单的方式当然是通过Docker了，这是docker-compose文件

```yml
services:
  caddy:
    image: caddy:2.8
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      -./caddy/Caddyfile:/etc/caddy/Caddyfile:ro
```

通过`docker compose up -d`命令启动容器即可


## 配置Caddy

以下是`wycode.cn` 的 `Caddyfile` 配置。可以看到比nginx的配置简单了很多。

```
wycode.cn {

    encode zstd gzip

    handle_path /upload/* {
        root * /srv/upload
        file_server browse
    }

    handle_path /swagger-ui/* {
        root * /srv/swagger-ui
        file_server
    }

    handle /api/v1/* {
        reverse_proxy "http://deno:8083"
    }

    handle /mongo/* {
        reverse_proxy "http://mongo-express:8081"
    }

    handle {
        root * /srv/wycode
        try_files {path} /{path}.html {path}/ /404.html
        file_server
    }
}
```

- **HTTP Content压缩：** `encode zstd gzip` 启用zstd和gzip压缩
- **upload目录：** `handle_path /upload/*` 配置静态文件服务，`root * /srv/upload` 表示将 `/upload` 目录映射到 `/srv/upload` 目录
- **Swagger UI：**`handle_path /swagger-ui/*` 配置静态文件服务，`root * /srv/swagger-ui` 表示将 `/swagger-ui` 目录映射到 `/srv/swagger-ui` 目录
- **Deno API：**`handle /api/v1/*` 配置反向代理，`reverse_proxy "http://deno:8083"` 表示将 `/api/v1` 映射到 `http://deno:8083` 服务
- **MongoDB WebUI：**`handle /mongo/*` 配置反向代理，`reverse_proxy "http://mongo-express:8081"` 表示将 `/mongo` 映射到 `http://mongo-express:8081` 服务
- **NextJs主站：**`handle` 配置静态文件服务，`root * /srv/wycode` 表示将 `/` 目录映射到 `/srv/wycode` 目录，`try_files {path} /{path}.html {path}/ /404.html` 表示如果请求的路径不存在，则尝试查找 `/` 目录下的文件，如果文件不存在，则返回 404 错误。

本文原始发表于 <https://wycode.cn/blog/caddy>，转载请注明出处