---
title: Spring中的application.properties
date: 2017-7-11 10:31:27
tags:
- Spring
- Java
category: Backend
---

> Spring框架在运行时会自动查找`application.properties`配置文件，在这个文件中进行项目相关配置属性，例如数据库地址密码等。当然也支持自定义属性。

<!--more-->

## 位置
`application.properties`可以放置在以下目录

- 当前目录下的`/config`目录中
- 当前目录
- classpath下的 /config包
- classpath
- **resource文件夹**

## 自定义属性的使用

1. 在`application.properties`添加自定义属性`myProperties = myValue`
2. 使用`@Value`注解即可注入使用
```java
    @Value("${myProperties}")
    String value; //value = "myValue";
```
3. 还可以使用`@ConfigurationProperties("foo")`注入POJO实体
```java
@ConfigurationProperties("foo")
public class Foo｛
    private boolean enabled;
    public boolean isEnabled() { ... }
    public void setEnabled(boolean enabled) { ... }
｝
```
在`application.properties`添加属性`foo.enabled = true`即可
