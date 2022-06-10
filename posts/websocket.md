---
title: 使用WebSocket和STOMP协议开发一个匿名聊天室
date: 2020-3-9 21:09:14
tags:
- WebSocket
- Spring Boot
- Kotlin
categories: Back-end
---

![chat](/lab/chat2.png)

有时候就想和其他人安全地聊个天，它需要有这些特征：

- 基于web技术，只需一个网页，无需下载任何App，易于转发。
- 无需注册，使用简单，基于邀请码加入聊天，邀请码定时刷新。
- 完全匿名。
- 消息只保留在内存中，超时自动删除。
- 进行在线人数统计，能设置最大人数上限。
- 用户上下线和邀请码刷新时有系统提示。
- Web连接必然是不稳定的，所以断线必须能够重连。

线上Demo演示请直接访问: <https://wycode.cn/chat/>

技术方面：

- 使用`WebSocket`协议提供Web上的全双工通信支持。
- 使用`STOMP`作为上层协议，它基于帧(`Frame`)，和Http请求很类似，提供了一种发布订阅的模式，很适合需求的群聊模式。
- 后端采用`Kotlin` + `SpringBoot`，前端采用`Typescript` + `Angular` + `AntDesign`，均使用最新版本。

<!--more-->

## 准备SpringBoot工程

在SpringBoot中使用WebSocket和STOMP很简单，添加`spring-boot-starter-websocket`这个starter依赖就可以开始了。

工程基于Gradle初始化，核心的几个依赖如下：

```java
implementation("org.springframework.boot:spring-boot-starter-websocket")
implementation("org.jetbrains.kotlin:kotlin-reflect")
implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.10.+")
```

## 配置WebSocket和STOMP

添加这么一个类：

```kotlin
@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig(val chatService: ChatService, val taskScheduler: TaskScheduler) : WebSocketMessageBrokerConfigurer {


    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        config.enableSimpleBroker("/topic/", "/queue/") // 1.
                .setTaskScheduler(taskScheduler) // 2.
        config.setApplicationDestinationPrefixes("/app") // 3.
    }


    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/stomp") // 4.
                .setAllowedOrigins("*") // 5.
    }

}
```
这里配置了很多端点(`endpoint`)，很多时候容易搞混：

1. 可以理解为是一些频道
2. 用于定时心跳，设置了taskSchedule才能启用心跳（对于没有启用SockJS的项目），不开启心跳的话，不管是客户端还是服务器都很容易断开连接。
3. 这里`/app`端点是应用的接收前缀，以app开头的路径会进入后端程序处理
4. 这里`/stomp`端点是用来握手的，所以前端connect时连接的是这个端点
5. 启用任意远程访问，防止前端出现跨域问题，易于调试，对于生产环境，可以删除

> 需要提到的是，官方文档上仍然启用了`SockJS`，其实已经不需要了，`SockJS`是对于不支持`WebSocket`的Polyfill，对于现在的浏览器，其实已经不需要了，参考这个地址：https://caniuse.com/#search=websockets

## 邀请码鉴权

主要思路：

- 配置客户端入口Channel的interceptor。`configureClientInboundChannel()`
- 在握手阶段，取header。`accessor.getNativeHeader("code")`
- code合法就赋予一个用户。`accessor.user = ChatUser()`
- 出错时，设置一个sessionAttributes。`accessor.sessionAttributes!!["error"] = "邀请码错误！"`

> 这里我尝试了多种办法直接在握手阶段返回错误，但是都失败了，所以最终通过sessionAttributes来标记错误，在下一次通信时返回错误信息。

此处除了鉴权还做了三件事

1. 对于本身分配了id的用户握手时，应当视为重连，而不是新用户，这是断线重连实现的关键。
2. 新用户进入时要进行人数上限的判断，人满时也报错。
3. 因为只有进入聊天室的人才能看到邀请码，所以这里还判断了一个超级用户码，用户以超级用户码进入时，会把当前的邀请码以错误码的形式返回。这样管理员就能方便的知道当前的邀请码了。

## 主要接口

`controller`只需要两个接口

1. 用来查询当前状态，用户刚进入时会调用，此时会如果有鉴权时的错误信息，会返回错误。如果正常会返回房间的基本信息，以及所有的聊天记录。同时发送系统信息。

```kotlin
@MessageMapping("/status")
@SendToUser("/queue/status")
fun status(accessor: SimpMessageHeaderAccessor): CommonMessage<*> {
    return if (accessor.user != null) {
        chatService.sendSystemMessage(200, accessor.user!!.name)
        CommonMessage.success(InitData(accessor.user!!.name.toInt(), chatService.users.size, chatService.messages, chatService.code,GEN_CODE_TIME_IN_MINUTES, REMOVE_MESSAGE_TIME_IN_MINUTES))
    } else {
        CommonMessage.fail(accessor.sessionAttributes!!["error"] as String)
    }
}
```

2. 发送消息，添加到聊天记录即可。

```kotlin
@MessageMapping("/all")
fun all(message: String, user: Principal): CommonMessage<ChatMessage> {
    val msg = ChatMessage(user.name.toInt(), Date(), message, 0)
    chatService.messages.add(msg)
    return CommonMessage.success(msg)
}
```

## 定时服务及系统消息

`ChatService`中要维护所有用户、历史消息记录、邀请码

1. 所有用户是一个HashSet，`var users =  HashSet<ChatUser>()`，`ChatUser`使用id作为`hashcode`。
2. 更新邀请码的频率较高，所以会同时检查过期消息并移除

```kotlin
fun generateCode() {
    this.code = randomString(16)
    logger.info("${Date().toLocaleString()}: $code")
    this.sendSystemMessage(100, this.code)
    removeOutdatedMessage()
}
```
3. 移除过期消息，消息列表是一个队列，如果队列头部的消息已过期，需要递归检查下一个

```kotlin
fun removeOutdatedMessage() {
    logger.info("${Date().toLocaleString()}: removeOutdatedMessage")
    if (messages.size > 0) {
        val message = messages[0]
        if (Date().time - message.time.time > REMOVE_MESSAGE_TIME_IN_MINUTES * 60L * 1000) {
            messages.removeAt(0)
            removeOutdatedMessage()
        }
    }
}
```

至此，后端核心技术要点已介绍完毕，最后放上github仓库，完整代码：<https://github.com/wangyucode/chatroom-spring-websocket-stomp>

线上完整项目演示请直接访问: <https://wycode.cn/chat/>

基于Angular的前端项目将在下篇博客介绍。

