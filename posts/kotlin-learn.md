---
title: Kotlin入门
date: 2017-7-27 13:19:47
tags:
- Kotlin
categories: Languages
---

> 在Google I/O 2017上Google正式宣布Kotlin成为Android开发的官方新语言，Kotlin得到了Google的背书，随着Android O和Android Studio3.0的正式发布，Kotlin语言的春天可能马上就要来临了。

![Kotlin](/images/20170815_kotlin.png)

<!--more-->

## Kotlin

Kotlin是基于JVM，静态类型的跨平台语言，在Java语言的基础上引入了很多现代语言的新特性。支持后台Server端、JavaScript前后端、及移动Android端开发。

## 新特性

- Null Safety

Kotlin解决了Java错误量最多的`NullPointerException`

```
var a: String = "abc"
a = null // error！对于常量，编译时就不能为空，否则编译出错

var b: String? = "abc" //String? 可为空的 String 类型
b = null // ok！

val l = b.length // error: variable 'b' can be null

//除了传统的if(b!=null)判空后再调用之外还有安全引用方式

b?.length //

//对于以下操作
val l: Int = if (b != null) b.length else -1
//可以简写为 ?: （Elvis Operator）后面也可以跟reture和throw语句
val l = b?.length ?: -1

//安全转型
val aInt: Int? = a as? Int

//可以为空的数组，以及非空筛选
val nullableList: List<Int?> = listOf(1, 2, null, 4)
val intList: List<Int> = nullableList.filterNotNull()
```

- 基础数据类型没有`Character`

- `Char`被单独处理，不是数字，不能和数字进行比较，可以使用`toInt()`函数

- 没有8进制

- 数组类型不可变，不能将`Array<String>`赋给`Array<Any>`

- 以下是位运算，只支持`Int`和`Long`

```kotlin
shl(bits) – signed shift left (Java's <<)
shr(bits) – signed shift right (Java's >>)
ushr(bits) – unsigned shift right (Java's >>>)
and(bits) – bitwise and
or(bits) – bitwise or
xor(bits) – bitwise xor
inv() – bitwise inversion
```
- 没有静态方法，可以使用 `object declaration`替代
