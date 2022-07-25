---
title: 使用swagger为Spring REST API生成在线文档
date: 2017-10-23 12:58:47
tags:
- Spring
- Java
- Swagger
- JavaScript
categories: Backend
---

> 本文介绍如何使用swaggerUI为Spring Boot项目创建动态的、从代码生成的REST API文档

<!--more-->
## 创建SwaggerUI渲染需要的JSON
- 首先为项目添加生成JSON的库：

```
dependencies {
    compile "io.springfox:springfox-swagger2:2.7.0"
}
```
- 添加`SwaggerConfig`类

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket generateDocket(){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(paths()) // and by paths
                .build()
                .apiInfo(apiInfo());
    }


    //Here is an example where we select any api that matches one of these paths
    private Predicate<String> paths() {
        return input -> input.matches(".api.*");
    }


    private ApiInfo apiInfo() {
        return new ApiInfo("王郁的API文档",
                "提供App测试及独立APP研发",
                "2.0",
                "http://wycode.cn",
                new Contact("王郁","wycode.cn","wangyu0503@gmail.com"),
                "wycode.cn All Right Reserved",
                "http://wycode.cn",
                new ArrayList<>());
    }
}
```

- 访问`http://localhost:8080/v2/api-docs`可以看到JSON即说明配置成功：

```JSON
{
    "swagger": "2.0",
    "info": {
        "description": "提供App测试及独立APP研发",
        "version": "2.0",
        "title": "王郁的API文档",
        "termsOfService": "http://wycode.cn",
        "contact": {},
        "license": {}
    },
    "host": "localhost:8080",
    "basePath": "/",
    "tags": [],
    "paths": {
        "/api/hello": {
            "get": {},
            "head": {},
            "post": {},
            "put": {},
            "delete": {},
            "options": {},
            "patch": {}
        }
    },
    "definitions": {}
}
```

- 添加SwaggerUI包

从`SwaggerUI`的github上下载最新版，将里面的`dist`文件夹，放入我们工程的静态页面目录

> 因为我们要修改`index.html`，所以不能使用`webjars`

对`index.html`的常量`ui`做如下更改

```JavaScript
// Build a system
  const ui = SwaggerUIBundle({
    url: "/v2/api-docs", //API的JSON地址
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
```


## 大功告成！

## 添加文档注释

- 实体注解

```Java
@ApiModel(value = "Hello 消息",description = "Hello接口返回的消息实体")
public class Hello {

    @ApiModelProperty("消息")
    private String message;

    ...
}
```

- 接口注解

```java
@Api(value = "Hello", description = "第一个api",tags = "Hello")
@RestController
public class HelloController {

    @ApiOperation(value = "Say Hello", produces = "application/json ")
    @RequestMapping("/api/hello")
    public Hello hello(@ApiParam(value = "消息",defaultValue = "Hello World!") @RequestParam(name = "message",defaultValue = "Hello World!")String message){
        return  new Hello("message is : "+ message);
    }
}
```
