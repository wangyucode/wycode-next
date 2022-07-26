---
title: Android原生分享及第三方分享
date: 2017-6-16 13:37:35
tags: 
- Android
- Wechat
category: Android
---

> 本文介绍如何为Android应用添加分享功能。包含通过原生`Intent`和利用第三方SDK。

<!--more-->
## 原生Intent方式

大多平台都支持隐式Intent方式发起分享。

> 创建隐式 Intent 时，Android 系统通过将 Intent 的内容与在设备上其他应用的清单文件中声明的 Intent 过滤器进行比较，从而找到要启动的相应组件。 如果 Intent 与 Intent 过滤器匹配，则系统将启动该组件，并向其传递 Intent 对象。 如果多个 Intent 过滤器兼容，则系统会显示一个对话框，支持用户选取要使用的应用。

```java
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, textMessage);
sendIntent.setType("text/plain");
Intent chooser = Intent.createChooser(sendIntent, "title");
if (sendIntent.resolveActivity(getPackageManager()) != null) {
    startActivity(chooser);
}
```
这里Action设置为`Intent.ACTION_SEND`就是分享（发送）的方式。
然后通过`putExtra()` 方式传递附加信息，可以是文本、图片等。
为了每次分享时都选择平台，需要为Intent包装一个Chooser。
然后就可以启动Activity分享了。

## 单独集成第三方（微信、微博）SDK

不同的平台有所不同，一般都包括以下流程
- 注册开发者账号
- 填写应用信息，获取应用ID，Key等
- 导入相关SDK依赖
- 集成分享代码

## 集成ShareSDK

集成ShareSDK的好处是，提供了统一的接口，抹平了不同平台间API的差异，集成更简单，维护也方便。特别是当你需要集成很多平台的时候。
但是上面单独集成的前两步还是不可缺少。

## 集成微信分享的一些注意事项

有时会遇到错误`{"req":"e","errCode":-6,"transaction":"webpage1498805832655"}`
- 微信分享需要经过签名才可以
- 微信Android应用信息的签名那一栏需要填入签名的**MD5**值，通过以下命令获取

```bash
keytool -list -v -keystore <你的keystore路径>
```

>`keytool` 是jdk的自带一个命令，类似`javac`

- 签名的**MD5**值必须全部小写，并去掉冒号
- 可以在gradle文件中配置以下属性，让开发版本也使用正式签名

```
android {
    ***
    signingConfigs {
        debug{
            storeFile file("你的keystore路径")
            storePassword "你的storePassword"
            keyAlias "你的keyAlias"
            keyPassword "keyPassword"
        }
        release {
            storeFile file("你的keystore路径")
            storePassword "你的storePassword"
            keyAlias "你的keyAlias"
            keyPassword "你的keyPassword"
        }
    }
    ***
}
```

有时会遇到错误`checkArgs fail, thumbData is invalid`

- 图片太大，可以获取缩略图
```java
Bitmap bmp = BitmapFactory.decodeResource(getResources(),R.drawable.app_icon);
Bitmap thumb = Bitmap.createScaledBitmap(bmp,THUMB_SIZE,THUMB_SIZE,true);
bmp.recycle();
```