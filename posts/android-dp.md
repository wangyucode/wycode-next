---
title: Android度量设计规范
date: 2017-9-4 16:46:17
tags:
- Android
- Material Design
category: Android
---

> 有关dpi、dp、px、sp、设计规范等等。

<!--more-->
## Pixel density (dpi)

像素密度，表示每英寸的长度上有多少像素

`dpi = sqrt(像素宽度^2+像素高度^2)/屏幕尺寸`

以下是常见手机的dpi

|  屏幕尺寸 | 720*1280  | 1080*1920  |  1440*2560 |
| :------------: | :------------: | :------------: | :------------: |
| 5寸  | 293.7  |  440.6 |  587.4|
| 5.5寸  | 267.0  | 400.5  |  534.0 |
| 6寸 | 244.8  |  367.2 |  489.5 |

## Density-independent pixels (dp)

引入dpi的概念就是为了使用像素无关的单位`dp`，从而使不同分辨率和尺寸的手机上达到一样的观感

`dp = 像素*160/dpi`

160dpi的手机上，1px=1dp

### 图片缩放

|Screen resolution |dpi|Pixel ratio|Image size (pixels)|
| :------------: | :------------: |:------------: | :------------:|
|xxxhdpi|640|4.0|400 x 400|
|xxhdpi|480|3.0|300 x 300|
|xhdpi|320|2.0|200 x 200|
|hdpi|240|1.5|150 x 150|
|mdpi|160|1.0|100 x 100|

## Scaleable pixels (sp)

sp和dp差不多只是用于字体

14sp为标准大小

![sp](/images/20170904_sp.png)

|xx_small |x_small|small|medium|large|x_large|xx_large|xxx_large|
| :------------: | :------------:| :------------:| :------------:|:------------:|:------------:|:------------:|:------------:|
|8sp|10sp|12sp|14sp|16sp|18sp|20sp|22sp|

## 基准网络

所有组件都与间隔为 8dp 的基准网格对齐。排版/文字（Type）与间隔为 4dp 的基准网格对齐。在工具条中的图标同样与间隔为 4dp 的基准网格对齐。这些规则适用于移动设备、平板设备以及桌面应用程序。

![baselinegrids](/images/20170905_layout-metrics-baselinegrids.png)
