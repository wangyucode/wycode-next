---
title: RxJava入门
date: 2018-1-20 15:31:15
tags:
- RxJava
- Java
categories: Languages
---

> RxJava是`ReactiveX`的Java分支，除了Java版，`ReactiveX`还支持包括JavaScript、C#、C++、Swift、Python、Android、Unity、Kotlin、Go、PHP在内的众多平台和语言。


> ReactiveX的核心是对观察者模式的扩展，并上升到了和命令式编程完全不同的编程方式的高度，称为`响应式编程`，优势在于处理异步、基于事件的应用程序。可以将数据或是事件都加队列中处理，优雅地解决了以前多线程交互、IO、并发、同步、异常处理这种编程的老大难问题。再加上`Lambda`表达式和链式编程，让程序变得更加简洁优雅。

<!--more-->


看完了RactiveX的简介，觉得用它来封装一个网络请求框架应该是再好不过了，但是当我真正开始封装网络请求时，我发现：RxJava给的答案是，你并不需要去封装，而是**直接使用**就好了。实例代码如下。

## Hello RxJava

```Java
	public void onClick(View v) {
        Observable.create((ObservableOnSubscribe<String>) emitter -> emitter.onNext(httpRequest()))  //1.
                .subscribeOn(Schedulers.io())  //2.
                .observeOn(AndroidSchedulers.mainThread())  //3.
                .subscribe(s -> textView.setText(s));  //4.
    }
    
```

核心代码就是`OnClick`方法中的四行。

步骤如下：


1. 通过`create`函数创建`Observable`对象
2. 订阅调度到`Schedulers.io()`，`io`是一个有线程缓存的新线程调度器
3. 将事件消费调度到Android的主线程上
4. 消费者（观察者）代码

`httpRequest()`没用到任何复杂的框架，就用原生的`HttpURLConnection`做一个网络请求，返回请求结果的String，代码如下：

```Java
	private String httpRequest() throws Exception {
        URL url = new URL("http://wycode.cn/");
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String result;
        try {
            BufferedInputStream in = new BufferedInputStream(urlConnection.getInputStream());
            result = readStream(in);
        } finally {
            urlConnection.disconnect();
        }
        return result;
    }

    private String readStream(BufferedInputStream in) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        StringBuilder sb = new StringBuilder();
        String line;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
    }
```

## 变换操作

通常的，我们在请求网络后要对服务器返回的字符串进行解析，这时我们可以使用RxJava的`Transforming`操作，在返回前将JSON String转为实体类。

```Java
Observable.create((ObservableOnSubscribe<String>) emitter -> emitter.onNext(httpRequest("https://wycode.cn/web/api/public/hello?message=Hello"))) //1.
                .map(s -> JSON.parseObject(s,Message.class)) //解析JSON
                .subscribeOn(Schedulers.io()) //2.
                .observeOn(AndroidSchedulers.mainThread()) //3.
                .subscribe(message -> textView.setText(message.message)); //4.
```

可以看到在原有代码几乎没变的情况下，加上1行代码就实现了将Json转为实体再处理的需求。这就是RxJava的魅力。

完整源码在这里：https://github.com/wangyucode/rxjava

而以上也仅仅用到了RxJava的冰山一角，还有各种各样的函数来满足各种各样的需求。

函数列表在这里：http://reactivex.io/documentation/operators.html
