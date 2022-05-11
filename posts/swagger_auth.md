---
title: SpringBoot工程为SwaggerUI添加认证
date: 2019-7-19 10:41:44
tags:
- OAuth
- Java
- Kotlin
- Spring
- Swagger
categories: Back-end
---

![swagger](https://swagger.io/swagger/media/assets/images/swagger_logo.svg)

当API添加了鉴权后，`swagger`如何进行调试呢，比如需要在请求头`header`中添加类似`token`或者`Authorization`之类的。

在`Spring`中进行如下简单的配置就可以了。

<!--more-->

```kotlin
@Configuration
@EnableSwagger2
class SwaggerConfig {

    @Bean
    fun generateDocket(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api::class.java))
                .build()
                .securityContexts(listOf(securityContext())) // #1
                .securitySchemes(listOf(apiKey())) // #2
                .apiInfo(apiInfo())
    }

    private fun securityContext(): SecurityContext {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("/api/public/admin/.*"))
                .build()
    }

    fun defaultAuth(): List<SecurityReference> {
        val authorizationScope = AuthorizationScope("global", "accessEverything")
        val authorizationScopes = arrayOf(authorizationScope)
        return listOf(SecurityReference("token", authorizationScopes))
    }


    fun apiKey(): ApiKey {
        return ApiKey("token", "X-Auth-Token", "header")
    }


    private fun apiInfo(): ApiInfo {
        return ApiInfo("王郁的API文档",
                "用于App测试及独立APP研发",
                "2.0",
                "http://wycode.cn",
                Contact("王郁", "wycode.cn", "wangyu@wycode.cn"),
                "wycode.cn All Right Reserved",
                "https://wycode.cn",
                emptyList())
    }
}

```
关键配置就是上面包含#1和#2注释的两行配置

1. 配置安全上下文，我这里配置了`/api/public/admin/.*`下的接口需要添加。
2. 配置鉴权类型，我这里使用`ApiKey`。