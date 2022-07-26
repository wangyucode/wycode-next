---
title: Spring中启用CORS
date: 2017-7-27 13:19:47
tags:
- Spring
- Java
- CORS
category: Backend
---

> JavaScript在跨域请求时会碰到`No 'Access-Control-Allow-Origin' header is present on the requested resource.`。是因为服务器不支持`Cross-origin resource sharing (CORS)`这篇教程教你如何为Java Spring后台配置`CORS`

<!--more-->

## 使用`@CrossOrigin`注解

注解相关方法即可。

## 全局配置

```java
@Configuration
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**");
            }
        };
    }
}
```
