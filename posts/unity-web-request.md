---
title: Unity中的网络请求
date: 2017-7-12 09:17:17
tags:
- Unity
- HTTP
category: Unity
---

![Unity](https://tse1-mm.cn.bing.net/th/id/OIP-C.TPnSpv0PowWa1j_0SdXeWQHaEM?pid=ImgDet&rs=1)

> Unity推荐使用`UnityWebRequest`替代原有`WWW`类做网络请求，`UnityWebRequest`提供了非常简单的方法请求RESTful接口。

下面将基本的使用总结如下：

<!--more-->
## 一个典型的POST请求

```csharp
    public void showScore()
    {
        StartCoroutine(getTop10Score());
    }

    private IEnumerator getTop10Score()
    {
        WWWForm form = new WWWForm();
        form.AddField("gameId", "1");

        using (UnityWebRequest www = UnityWebRequest.Post("http://wycode.cn/api/score/getTopScores", form))
        {
            yield return www.Send();

            if (www.isError)
            {
                Debug.Log(www.error);
            }
            else
            {
                Debug.Log(www.downloadHandler.text);
            }
        }
    }
```

- 使用协程处理网络请求。
- `WWWForm`中可以添加参数。
- `using`代码块表示结束立即回收其中的对象。
- `DownloadHandler`对象中可以找到服务器返回的结果。
