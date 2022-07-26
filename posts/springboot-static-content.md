---
title: SpringBoot配置Jar外部静态资源
date: 2018-6-23 13:12:33
tags:
- Spring
- Java
category: Backend
---

![springboot](/images/20180623_springboot.jpg)

> 我们知道SpringBoot内置了tomcat服务器，从而一个jar包就能实现web服务。但有时我们又想像传统tomcat那样部署一些外部的静态资源，虽然静态资源放在`resource`文件夹的`static`就能解决问题，但是static文件夹的内容会作为jar的一部分，要替换的话只能替换整个jar包，极为不便。能不能配置jar包外部的文件夹作为静态资源目录呢。当然是可以的...

以下示例代码基于SpringBoot 2.0.3，采用Kotlin语言实现：

<!--more-->

## WebMvcConfigurer

> 新版Spring利用了Java8新特性，interface可以有default关键字，从而接口方法不用全部实现。

```kotlin
@Configuration
class WebConfiguration : WebMvcConfigurer {

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        super.addResourceHandlers(registry)
        registry.addResourceHandler("/**")
                .addResourceLocations("file:static/")
    }
}
```

- `@Configuration`注解表明这是一个配置类，会被Spring框架识别并管理。
- `WebConfiguration`类实现`WebMvcConfigurer`接口，并复写`addResourceHandlers`方法。
- `addResourceHandler("/**")`添加路由到服务器根目录。
- `.addResourceLocations("file:static/")`添加外部静态资源，这里路径表示和jar包同目录的`static`文件夹。这样能想tomcat一样在static文件夹中部署静态资源了。而且不用重启SpringBoot服务
