---
title: 在Unity中使用Android原生代码
date: 2017-7-26 10:18:07
tags: 
- Android
- Unity
category: Unity
---

![Unity](https://tse1-mm.cn.bing.net/th/id/OIP-C.TPnSpv0PowWa1j_0SdXeWQHaEM?pid=ImgDet&rs=1)

> 在某些情况下，我们需要使用原生代码来做一些事，比如集成一些第三方原生SDK，
以下这种方式介绍了如何将Unity导出成Android Studio工程，从而添加Android代码。
之后的教程中我还将介绍如何将Android写好的代码导回到Unity工程中。

<!--more-->

## Unity工程导出为Android工程

1. 在Unity菜单中选择：File——Build Settings
2. 为了能在Android Studio中更好的运行，构建系统选择Gradle
3. 选中Export Project选项
4. 选择你喜欢的目录导出
5. Unity发生了改动时，只需导出后替换asset文件夹内容即可

![Export](/images/20170726_export.png)

## Unity调用Android方法

```csharp
private void sendMessageToAndroid(string method,params object[] args)
    {
        AndroidJavaClass jc = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
        AndroidJavaObject jo = jc.GetStatic<AndroidJavaObject>("currentActivity");
        jo.Call(method, args);
    }
```

- 在UnityPlayerActivity中准备好Unity要调用的方法
- 调用上面的方法，传入方法名（不带括号），及参数（多参，也可不传）即可。

## Android调用Unity方法

```java
UnityPlayer.UnitySendMessage("GameObject", "message", "args");
```

- 相当于调用了Unity中的`sendMessage()`。