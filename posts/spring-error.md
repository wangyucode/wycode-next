---
title: SpringBoot工程自定义错误JSON字段
date: 2019-7-15 14:19:26
tags:
- Java
- Kotlin
- Spring
category: Backend
---

![springboot](/images/20180623_springboot.jpg)

通常我们为了统一，和前端方便处理，写的API返回JSON会有固定的结构，比如下面这种：
```json
{
    "code":200,
    "message":"hello world!",
    "data":{
        "user":{}
    }
}
```
但是当返回码为非200时，比如接口不存在`404`，服务器错误`500`，Spring默认会返回一个类似这样的结构：

```json
{
  "timestamp": "2019-07-19 10:23:47",
  "status": 403,
  "error": "Forbidden",
  "message": "没有权限",
  "path": "/web/api/public/admin/dota/version"
}
```

下面进行简单配置即可实现这个JSON结构的自定义：
<!--more-->

```kotlin
import cn.wycode.web.DEV
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes
import org.springframework.stereotype.Component
import org.springframework.web.context.request.WebRequest

@Component
class WyErrorAttributes : DefaultErrorAttributes(DEV) { // #1
    override fun getErrorAttributes(webRequest: WebRequest?, includeStackTrace: Boolean): MutableMap<String, Any> {
        val errorAttributes = super.getErrorAttributes(webRequest, includeStackTrace) // #2
        errorAttributes["success"] = false // #3
        errorAttributes["error"] = errorAttributes["message"] // #4
        errorAttributes["data"] = errorAttributes["exception"]  // #5
        return errorAttributes
    }
}
```

1. Spring默认的`DefaultErrorAttributes`就写的挺好，我们继承并扩展一下就可以了，当然你也可以删除或者完全替换里面的结构。
2. 先使用默认的方法构建一个`errorAttributes`。
3. 添加一个`success`属性，既然是`ErrorAttributes`当然是`false`了。
4. 覆盖`error`属性，改为`message`。
5. 添加`data`属性，在DEV环境时会添加错误的类信息。

做了这个配置之后，错误信息的JSON会变成下面这样：

```json
{
  "timestamp": "2019-07-19 16:56:41",
  "status": 500,
  "error": "/ by zero",
  "exception": "java.lang.ArithmeticException",
  "message": "/ by zero",
  "path": "/web/api/public/admin/dota/version",
  "success": false,
  "data": "java.lang.ArithmeticException"
}
```