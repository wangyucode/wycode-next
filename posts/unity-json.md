---
title: Unity中的JSON解析
date: 2017-7-12 10:24:51
tags: 
- Unity
- CSharp
- JSON
category: Unity
---

> JSON是一种应用广泛的数据交换格式。可用于和Web服务器交互，以及用于对象序列化。Unity使用`JsonUtility`类提供JSON文本和对象互转。

下面将基本的使用总结如下：

<!--more-->

## 使用 `Serializable`标记对象

```csharp
[Serializable]
public class WyResultGameScore{

    public int code;//(integer, optional): code: 返回代码，1表示OK，其它的都有对应问题 ,
    public List<GameScore> data;//(Array[GameScore], optional): data : code为1时返回结果集 ,
    public string message;//(string, optional): message : code!=1时的错误信息

}

[Serializable]
public class GameScore
{
    public int gameId;//(integer, optional): 游戏id 1=滚蛋吧 ,
    public int id;//(integer, optional): 分数id ,
    public string name;//(string, optional): 昵称 ,
    public string platform;//(string, optional): 游戏平台 ,
    public int score;//(integer, optional): 分数 ,
    public string userId;//(string, optional): userId
}
```
## JSON string转Object

```csharp
string json = "{"code":1,"message":"成功","data":[{"id":2,"name":"游客9527","score":10,"platform":"iOS","userId":"1","gameId":1}]}";
WyResultGameScore result = JsonUtility.FromJson<WyResultGameScore>(json);
```

## Object转JSON string

```csharp
string json = JsonUtility.ToJson(myObject);
```