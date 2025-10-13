---
title: 使用SpringBoot发送SSL邮件
date: 2019-6-7 17:55:25
tags:
- Kotlin
- Spring
- Java
category: Backend
---

![email](https://cms-assets.tutsplus.com/uploads/users/23/posts/26357/preview_image/professional-email-signature-icon.jpg)

当需要后台发送通知的时候，Email是一个比较好的选择，因为它免费啊！

这篇文章介绍如何使用SpringBoot发送邮件。

<!--more-->

## 添加依赖

如同其它`starter`工具一样。SpringBoot为我们提供了`spring-boot-starter-mail`

```js
    compile('org.springframework.boot:spring-boot-starter-mail')
```

## 配置

在`application.properties`添加如下配置

```js
spring.mail.host=smtp.exmail.qq.com
spring.mail.username=wangyu@wycode.cn
spring.mail.password=*********
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```
- smtp域名，用户名，密码，根据自己的填写。

## 创建Service

```kotlin
package cn.wycode.web.service

import org.apache.commons.logging.LogFactory
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service

@Service
class MailService(private val mailSender: JavaMailSender) {

    private val log = LogFactory.getLog(this.javaClass)

    @Async
    fun sendSimpleMail(sendTo: String, subject: String, content: String) {
        val message = SimpleMailMessage()
        message.setFrom("wangyu@wycode.cn")
        message.setTo(sendTo)
        message.setSubject(subject)
        message.setText(content)
        try {
            mailSender.send(message)
            log.error("已发送邮件 $subject 到 $sendTo")
        } catch (e: Exception) {
            log.error("邮件发送失败！", e)
        }
    }
}
```
- `JavaMailSender`由Spring自动注入
- `@Async`发送邮件这里采用异步方式，启用异步需要在Application使用`@EnableAsync`


## 关于SSL及发送端口

`Could not connect to SMTP host: smtp.163.com, port: 25`

本地运行ok，但是发布到阿里云ECS上就无法连接服务，这里是因为阿里云接上级通知禁用了25端口，客服建议使用安全的`465`端口。

网上的教程很复杂，其实对于正规的SMTP服务器，我们只需添加如下两个属性就好了。

```js
spring.mail.port=465
spring.mail.properties.mail.smtp.ssl.enable=true
```
- 端口改为`465`
- 启用`SSL`

以上，转载请注明出处!