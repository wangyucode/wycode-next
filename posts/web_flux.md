---
title: 理解Spring WebFlux框架中的响应式类型
date: 2018-7-20 11:28:08
tags:
- Spring
- RxJava
- WebFlux
- Java
- Kotlin
categories: Backend
---

![Spring Boot](/images/20180720_diagram-boot-reactor.svg)

> `Spring Boot 2.0` 带来了`Spring Framework 5` 中的新的WebFlux技术，WebFlux是基于响应式非阻塞IO编程模型的技术栈。从而能够使用不同于以往基于Servlet API的阻塞式IO处理的新方式编写后台应用。

> 相比以往阻塞式IO编程，响应式编程能够获得更小的开销。因为它直接处理流，而不是单个数据。

> 响应式编程最早由 `.NET` 平台上的 `Reactive Extensions (Rx)` 库来实现。后来迁移到 Java 平台之后就产生了著名的 `RxJava` 库，并产生了很多其他编程语言上的对应实现。在这些实现的基础上产生了后来的响应式流（`Reactive Streams`）规范。该规范定义了响应式流的相关接口，并将集成到 Java 9 中。

<!--more-->

## 为什么要用响应式

在传统的编程范式中，我们一般通过迭代器（`Iterator`）模式来遍历一个序列。这种遍历方式是由调用者来控制节奏的，采用的是拉的方式。每次由调用者通过 `next()`方法来获取序列中的下一个值。使用响应式流时采用的则是推的方式，即常见的发布者-订阅者模式。当发布者有新的数据产生时，这些数据会被推送到订阅者来进行处理。在响应式流上可以添加各种不同的操作来对数据进行处理，形成数据处理链。这个以声明式的方式添加的处理链只在订阅者进行订阅操作时才会真正执行。

响应类型不是为了让你更快地处理请求或数据，实际上与常规阻塞处理相比，它们会带来更小的开销。 它们的优势在于它们能够同时提供更多请求，以及处理延迟操作，例如更有效地从远程服务器请求数据，或者处理来自客户端的请求。

它们允许你通过本地处理时间和延迟来提供更好的服务质量和可预测的容量规划，而无需消耗更多资源。与等待结果时阻止当前线程的传统处理不同，`Reactive` API没有等待成本，仅请求它能够处理的数据量并提供立刻返回，因为它处理数据流，而不仅仅是单个元素。


## 为什么使用`Reactor`而不是`RxJava`

`RxJava` 库是 JVM 上响应式编程的先驱，也是响应式流规范的基础。`RxJava 2` 在 `RxJava` 的基础上做了很多的更新。不过 `RxJava` 库也有其不足的地方。`RxJava` 产生于响应式流规范之前，虽然可以和响应式流的接口进行转换，但是由于底层实现的原因，使用起来并不是很直观。`RxJava 2` 在设计和实现时考虑到了与规范的整合，不过为了保持与 `RxJava` 的兼容性，很多地方在使用时也并不直观。`Reactor` 则是完全基于响应式流规范设计和实现的库，没有 `RxJava` 那样的历史包袱，在使用上更加的直观易懂。`Reactor` 也是 `Spring 5` 中响应式编程的基础。学习和掌握 `Reactor` 可以更好地理解 `Spring 5` 中的相关概念。

## Reactive Streams

`Reactor`建立在`Reactive Streams`规范之上。 `Reactive Streams`由4个简单的Java接口（`Publisher`，`Subscriber`，`Subscription`和`Processor`），文本规范和`TCK`组成。它是每个现代Reactive库的基石，也是互操作性的必备条件。

响应式流中第一个重要概念是背压（backpressure）。在基本的消息推送模式中，当消息发布者产生数据的速度过快时，会使得消息订阅者的处理速度无法跟上产生的速度，从而给订阅者造成很大的压力。当压力过大时，有可能造成订阅者本身的奔溃，所产生的级联效应甚至可能造成整个系统的瘫痪。背压的作用在于提供一种从订阅者到生产者的反馈渠道。订阅者可以通过 request()方法来声明其一次所能处理的消息数量，而生产者就只会产生相应数量的消息，直到下一次 request()方法调用。这实际上变成了推拉结合的模式。

例如，当HTTP连接速度太慢时，在从数据库扩展到HTTP响应的被动组件的管道中，数据存储库也可以减速或完全停止，直到网络容量释放为止。

> Java 9在`java.util.concurrent.Flow`容器类中包含了`Reactive Streams`接口



## `Flux` 和 `Mono`

`Flux` 和 `Mono` 是 Reactor 中的两个基本概念。

`Flux` 表示的是包含 0 到 N 个元素的异步序列。在该序列中可以包含三种不同类型的消息通知：正常的包含元素的消息、序列结束的消息和序列出错的消息。当消息通知产生时，订阅者中对应的方法 `onNext()`, `onComplete()`和 `onError()`会被调用。

`Mono` 表示的是包含 0 或者 1 个元素的异步序列。该序列中同样可以包含与 Flux 相同的三种类型的消息通知。Flux 和 Mono 之间可以进行转换。对一个 Flux 序列进行计数操作，得到的结果是一个 Mono<Long>对象。把两个 Mono 序列合并在一起，得到的是一个 Flux 对象。

参考文献：

1.[Spring官方WebFlux文档](https://docs.spring.io/spring-framework/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/html/web-reactive.html "Spring官方WebFlux文档")

2.[Understanding Reactive types](https://spring.io/blog/2016/04/19/understanding-reactive-types "Understanding Reactive types")

3.[使用 Reactor 进行反应式编程](https://www.ibm.com/developerworks/cn/java/j-cn-with-reactor-response-encode/index.html "使用 Reactor 进行反应式编程")