---
title: Unity平台判断
date: 2017-6-27 10:30:04
tags: 
- Unity
- CSharp
categories: Unity
---

> Unity 平台的判断包含编译时判断和运行时判断，总结如下：

<!--more-->

## 编译时

```csharp
    #if UNITY_EDITOR
      Debug.Log("Unity Editor");
    #endif

    #if UNITY_IOS
      Debug.Log("Iphone");
    #endif

    #if UNITY_STANDALONE_OSX
    Debug.Log("Stand Alone OSX");
    #endif

    #if UNITY_STANDALONE_WIN
      Debug.Log("Stand Alone Windows");
    #endif
```
可以使用`||`和`&&`进行组合

### 平台定义
- UNITY_EDITOR
- UNITY_EDITOR_WIN
- UNITY_EDITOR_OSX
- UNITY_STANDALONE_OSX
- UNITY_STANDALONE_WIN
- UNITY_STANDALONE_LINUX
- UNITY_STANDALONE
- UNITY_WII
- UNITY_IOS
- UNITY_IPHONE
- UNITY_ANDROID
- UNITY_PS4
- UNITY_SAMSUNGTV
- UNITY_XBOXONE
- UNITY_TIZEN
- UNITY_TVOS
- UNITY_WP_8_1
- UNITY_WSA
- UNITY_WSA_8_1
- UNITY_WSA_10_0
- UNITY_WINRT
- UNITY_WINRT_8_1
- UNITY_WINRT_10_0
- UNITY_WEBGL
- UNITY_ADS
- UNITY_ANALYTICS
- UNITY_ASSERTIONS

官方文档:[https://docs.unity3d.com/Manual/PlatformDependentCompilation.html](https://docs.unity3d.com/Manual/PlatformDependentCompilation.html "https://docs.unity3d.com/Manual/PlatformDependentCompilation.html")

## 运行时

```csharp
if(Application.platform == RuntimePlatform.WindowsWebPlayer)
{
   Debug.Log("Windows Web Player");
}
```

### 平台枚举

- OSXEditor
- OSXPlayer
- WindowsPlayer
- OSXDashboardPlayer
- WindowsEditor
- IPhonePlayer
- Android
- LinuxPlayer
- LinuxEditor
- WebGLPlayer
- WSAPlayerX86
- WSAPlayerX64
- WSAPlayerARM
- TizenPlayer
- PSP2
- PS4
- XboxOne
- SamsungTVPlayer
- WiiU
- tvOS
- Switch

官方文档:[https://docs.unity3d.com/ScriptReference/RuntimePlatform.html](https://docs.unity3d.com/ScriptReference/RuntimePlatform.html "https://docs.unity3d.com/ScriptReference/RuntimePlatform.html")