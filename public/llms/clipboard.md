# 跨平台剪切板 - 王郁的小站

> 在线剪贴板工具：https://wycode.cn/clipboard 。跨平台、跨网络传递文字，无需注册。

## 使用方法

1. 在微信小程序「跨平台剪切板」中获取查询码（页面有小程序码）。
2. 在本页输入 4~5 位查询码，点击查询即可读取内容。
3. 在文本框中编辑后点击保存即可更新，其他设备用同一查询码即可同步看到。

## 说明

- 网页端通过 `https://wycode.cn/api/v1/clipboard` 接口读写，内容上限约 5000 字。
- 相关博客文章：站内搜索「剪切板」（如 clipboard-react、clipboard-wechatapp 篇，agent 文档见 https://wycode.cn/blog/clipboard-react.md）。
