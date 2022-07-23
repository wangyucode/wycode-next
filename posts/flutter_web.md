---
title: 使用Flutter开发Web应用
date: 2019-7-25 18:35:54
tags:
- Flutter
- Dart
categories: Frontend
---

![flutter](https://flutter.dev/assets/flutter-lockup-4cb0ee072ab312e59784d9fbf4fb7ad42688a7fdaea1270ccf6bbf4f34b7e03f.svg)

在Google IO 2019开发者大会上，Flutter和Dart发表了超越移动端，为iOS，Android，ChromeOS和Web构建应用的主题演讲。

时至今日，想必Flutter已经可以开发Web应用了。

我们知道Flutter是使用叫`Skia`的C++库来渲染UI，但是Web上是使用`Dom`，`Canvas`，以及`WebGL`，那么Flutter到底会采用哪种方式呢？

这篇文章带你对Flutter for web做一个了解和实践：
<!--more-->

## 架构设计

![Architecture](https://flutter.dev/images/Dart-framework-v-browser-framework.png)

## 原理

目前联合了`DOM`, `Canvas`, `CSS`来进行渲染，将`Dart`代码编译为`JavaScript`来执行，这跟`Typescript`，`Kotlin`都是一样的。

## 目前进度

截至今天（2019年7月25日）Flutter for Web还处于技术预览的阶段，还很不稳定。

开发团队创建了一个[Frok](https://github.com/flutter/flutter_web)，但最终这些代码将会被merge到<https://github.com/flutter/flutter>中。

## 环境安装

1. ~~安装`Dart`~~
2. 安装`Flutter`，Flutter 1.5 以上就可以支持以web作为target平台，我这里安装的是`1.7.8`。
3. 安装`webdev`，通过`flutter pub global active webdev`全局安装`webdev`工具包。
4. 为了能够全局执行`webdev`命令，建议将`flutter/.pub-cache/bin`目录添加到`path`环境变量中。

## Hello World

克隆<https://github.com/flutter/flutter_web>

```bash
$cd examples/hello_world/
$flutter pub upgrade
$webdev serve
```

打开<http://localhost:8080>，你就能看到红色的HelloWorld

经过测试，在Edge浏览器会报错，目前只在Chrome中支持比较好。

## 新建一个项目

虽然未来的目标是用同一套代码来生成移动端和Web端，但目前的开发使用了不同的命名空间，所以还无法同时进行移动端和web端开发。

新建的Flutter工程最简单的方式是使用IDE

- VScode： 使用View->Command Paltte->`Flutter: New Web Project`。
- IntelliJ：新建Dart项目，选择`Flutter for web`模板。