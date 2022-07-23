---
title: 微信小程序入门
date: 2018-2-13 13:12:33
tags:
- Wechat
- JavaScript
categories: Frontend
---

![React](/images/20180213_clipboard.jpg)

> 这篇文章我们将开发一个微信小程序版的跨平台剪切板。


书接上文，我们已经用`React`开发了一个跨平台剪切板。开发微信小程序的时候，我发现微信小程序正是借鉴了React框架的核心。很多React中的代码，稍微修改就可以用在微信小程序中。

如何申请账号，创建项目在官方文档中已经有详细说明，我们这里重点解释一下代码。找到微信小程序背后的核心技术。

<!--more-->

## 1.app.json

```json

{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#379392",
    "navigationBarTitleText": "跨平台剪切板",
    "navigationBarTextStyle": "white"
  },
  "debug": true
}
```

- `app.json`中描述了小程序相关的全局配置信息，所有的页面需要配置在`page`属性中。
- 这里还能配置`tabbar`，为了跨平台剪切板的简洁，我去掉了tab，把它做成了一个单页面的极简APP

## 2.模板

```html

<!--index.wxml-->
<view class="container">
  <input type='number' placeholder="查询码" value='{{queryNumber>0?queryNumber:""}}' bindinput='bindInput' disabled='{{isShowResult}}'></input>
  <button type='primary' wx:if="{{!isShowResult}}" bindtap='query'>查询</button>
  <button wx:if="{{!isShowResult}}" bindtap='create'>新建</button>
  <textarea wx:if='{{isShowResult}}' value='{{text}}' bindinput='bindInputText'></textarea>
  <button type= 'primary' wx:if = "{{isShowResult}}" bindtap='save'>保存</button>
  <button wx:if = "{{isShowResult}}" bindtap='back'>返回</button>
</view>
```

- `.wxml`后缀的是小程序的布局（模板）文件。
- 属性没什么好解释的，看一下就懂了。参考React版的教程就知道每个属性的详细用途。

## 3.样式表

```css
/**index.wxss**/

input {
  border: 1px solid;
  border-radius: 10rpx;
  border-color: #ddd;
  padding: 10rpx;
  width: 96%;
}

button {
  margin-top: 24rpx;
  width: 100%;
}

textarea{
  border: 1px solid;
  border-radius: 10rpx;
  border-color: #ddd;
  padding: 10rpx;
  width: 96%;
  margin-top: 24rpx;
}
```

- 就是传统的CSS层叠样式表
- 这里rpx是dpi无关的单位，保证不同分辨率的相同观感


## 4.逻辑

```javascript
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    queryNumber: -1,
    isShowResult: false,
    text: ''
  },

  onLoad: function () {

  },

  bindInput: function (e) {
    this.setData({
      queryNumber: e.detail.value
    })
  },

  bindInputText: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  query: function () {
    if (this.data.queryNumber <= 0) {
      wx.showToast({
        title: '查询码不正确！',
        icon: 'none'
      });
      return
    }

    var that = this;
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/query',
      data: { 'id': this.data.queryNumber },
      success: function (res) {
        if (!res.data.success || res.data.data == null) {
          wx.showToast({
            title: '查询码不正确！',
            icon: 'none'
          });
        } else {
          that.setData({
            isShowResult: true,
            queryNumber: res.data.data.id,
            text: res.data.data.content
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res,
          icon: 'none'
        });
      },
      complete:function(){
        wx.hideLoading();
      }
    });

  },

  create: function () {
    var that = this;
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/create',
      method: 'POST',
      success: function (res) {

        that.setData({
          isShowResult: true,
          queryNumber: res.data.data.id,
          text: res.data.data.content
        });

      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
      },
      complete:function(){
        wx.hideLoading();
      }
    });
  },

  save: function () {
    var that = this;
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/save',
      method: 'POST',
      data:{
        id: that.data.queryNumber,
        content: that.data.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        that.setData({
          isShowResult: false,
          queryNumber: res.data.data.id,
          text: res.data.data.content
        });
        wx.showToast({
          title: '保存成功！',
          icon: 'success'
        });

      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  back: function () {
    this.setData({
      isShowResult: false
    })
  }

})

```

- 小程序的`data`，就是React的`state`
- 小程序通过`this.setData()`刷新页面状态，如同React的`this.setState()`
- 使用`wx.request()`做http请求
- 使用`wx.showToast()`显示一个提示
- 使用`wx.showLoading()`显示Loading
- 这里发现一个小程序的bug，在`wx.hideLoading()`会将Toast也消失掉。


至此大功告成！打开微信扫一扫文章开头的小程序码即可使用。
访问 https://github.com/wangyucode/Clipboard 查看完整源码