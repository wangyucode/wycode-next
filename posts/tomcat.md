---
title: SwaggerUI GET请求中文乱码问题解决
date: 2018-4-11 15:36:43
tags:
- Swagger
- Spring
- Tomcat
categories: Back-end
---


> 今天又一次遇到了中文乱码问题。SwaggerUI上直接测试接口时本地LocalHost是OK的，部署到Linux服务器上就乱码了，查来查去很多文章都没说到点子上。既然是用了Spring，Tomcat等，肯定是哪里配置不对，改代码的方式解决是太low了。

![Tomcat](/images/20180411_tomcat.png)

<!--more-->

## Tomcat的Server配置

Tomcat`conf`目录下的`server.xml`（Linux系统可能在`/etc/tomcat/`下）定义了服务器的相关配置信息。

根据官方文档，这里的`Server`指的是整个`Catalina servlet`容器。它的属性代表整个servlet容器的特性。

常见的如：服务器端口，根项目路径等。

## Connector属性

除了配置端口，协议版本，还可以配置`URIEncoding`，默认值是`ISO8859-1`所以不支持中文，我们改成`UTF-8`即可。即：

```xml
<Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="443"
	           URIEncoding="UTF-8"/>
```

## HTTPS

通常在配置了HTTPS的服务器上，我们会把80端口转发到443端口上，此时我们要对443端口的`Connector`也配置`URIEncoding="UTF-8"`


我的问题就出在这。


以上...





