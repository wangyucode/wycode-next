---
title: Ubuntu16.04安装配置NGINX服务
date: 2018-6-23 15:12:33
tags:
- Linux
- NGINX
category: Linux
---

![NGINX](https://nginx.org/nginx.png)

当我们需要在Ubuntu上部署SpringBoot服务时，通常正式环境需要将监听端口切换到80端口，或443端口，但是Ubuntu为了安全起见，普通用户是不能监听1024以下端口的。另外我们需要同时支持HTTP和HTTPS，貌似SpringBoot只支持监听1个端口，这时有很多解决方案。比如使用`sudo`提升运行权限，也可以通过Linux防火墙iptables配置端口转发，把80端口转发到8080端口上等方式。

但是...这都不是最优的解决方案，既然用到了端口转发，不如直接安装一个NGINX服务器，做反向代理，同时也能提供静态服务能力，未来还能简单地配置升级到集群，做负载均衡。

> NGINX是一款高性能Web服务器。配置简单，易扩展，并发能力强，可用于Web服务器，反向代理，负载均衡，邮件等。

<!--more-->

## 安装NGINX

```bash
$sudo apt install nginx
```

使用这一行命令，其实就可以了。
这时直接访问我们的服务器ip，能看到NGINX的欢迎页面，就说明安装成功。


## 配置nginx

`/etc/nginx/`目录下有这么几个重要文件

- nginx.conf 是NGINX的配置文件，里面有一些基本配置，网上很多教程是直接修改这个文件配置服务什么的，看这个文件结构include了conf.d目录的所有`.conf`文件，我们自定义的配置应该写在conf.d目录中

- site-enabled 是当前启用的服务配置文件，里面有个`default`链接到`site-available`目录里。

- site-available 是备选的服务器配置文件

从注释和目录结构，我们可以看到其良苦用心，不应该直接修改nginx.conf文件，而是将需要添加的服务器配置文件放到`site-available`目录中。然后在`site-enabled`目录创建要启用服务的`symbolic link`到刚刚创建的配置文件。这样配置才能更方便，更具扩展性。

## 示例

我这里配置了

静态网站服务：

```
server {
	listen 80;
	listen [::]:80;

	server_name wycode.cn www.wycode.cn;

	root /var/www/wycode.cn;
	index index.html;

	location / {
		try_files $uri $uri/ =404;
	}
}
```
SpringBoot 后台api反向代理


```
server {
	listen 80;
	listen [::]:80;

	server_name wycode.cn www.wycode.cn;

	location /api {
		proxy_pass http://127.0.0.1:8080/api/;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
	}
}
```


以上，转载请联系作者!