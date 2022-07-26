---
title: Gradle构建变种版本（多渠道打包）
date: 2017-9-4 15:53:38
tags:
- Gradle
- Android
category: Android
---

> 构建变体是 Gradle 按照特定规则集合进行打包，以生成适应不同需求的Apk包。
例如，需要生成dev版，测试版、以及release版，它们的服务器地址，版本号，图标各不相同，以及多渠道打包等等。

<!--more-->
## productFlavors

可以定义多个`productFlavors`版本，其继承覆盖所有`defaultConfig`中的字段

主要的使用手段有一下几种

- 覆盖`defaultConfig`默认字段(包名、版本名等)
- 往`AndroidManifast.xml`文件注入编译变量
- 修改包名，支持前后缀
- 使用`buildConfigField`动态改变编译时常量
- 使用`resValue`动态注入字符串资源


## 示例
```
android {
    ...
    defaultConfig {
        versionCode 200
        versionName 'V2.0.0'
        manifestPlaceholders = [
                scheme: "FindAR"
                id    : "1565483848"
        ]
        buildConfigField "String", "ROOT_FOLDER_NAME", '"FindAR"'
    }

    productFlavors{
       dev{
           versionName 'V2.0.0 Dev'
           resValue "string", "user_id", "001" //user id
       }

       production{
           versionName 'V2.0.0 Release'
           resValue "string", "user_id", "002" //user id
       }
   }
}
```
