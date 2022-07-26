---
title: 自定义形状波浪进度
date: 2017-7-24 12:41:59
tags:
- Android
category: Android
---

> 今天碰到个需求，要求以波浪进度填充自定义透明形状，废话不多说，直接上最终效果图

![波浪效果](/images/20170724_wave_progress.gif)

<!--more-->

## 思路

通过判断`Bitmap`对象的像素颜色，对非透明像素进行颜色更改。波浪曲线采用sin曲线π到2π区间段，和将时间取余并和x坐标相加得到波浪y轴坐标，再加上百分比*Bitmap高度。核心算法如下:

![sin](/images/20170724_sin.png)

```java
    private int getWaveY(int x) {
        double sinX = Math.PI + (((((System.currentTimeMillis() / (1000 / waveSpeed)) + x) % waveLength)) / (double) waveLength * Math.PI);
        int waveHeight = (int) (waveHeightMax * (Math.sin(sinX) + 1));
        int y = (int) ((100 - progress) / 100f * bitmap.getHeight());
        y -= waveHeight;
        return y;
    }
```
这里的`waveSpeed`、`waveLength`、`waveHeightMax`均定义成全局变量，可以很方便的定制波浪移动速度、波浪长度、波浪高度。


## 使用SurfaceView

为了达到比较好的性能，使用`SurfaceView`在子线程绘图。

## 性能优化

因为这里涉及逐个像素操作，所以遍历的运算量很大，一定要对遍历的量进行控制，否则会很卡。

我这里采用控制图片大小的方式
```java
***
    bitmap = setBitmapSize(bitmap, calculateSize * bitmap.getWidth() / bitmap.getHeight(), calculateSize);

***
    /**
     * 缩放图片
     *
     * @param bitmap    原图片
     * @param newWidth
     * @param newHeight
     * @return
     */
    private Bitmap setBitmapSize(Bitmap bitmap, int newWidth, int newHeight) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        float scaleWidth = (newWidth * 1.0f) / width;
        float scaleHeight = (newHeight * 1.0f) / height;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        return Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
    }
```


通过`calculateSize`控制循环次数在有限的范围内，并在最终绘制Bitmap时使用区域绘制函数：

```java
    private void draw() {
        Canvas canvas = mHolder.lockCanvas();
        canvas.drawBitmap(bitmap, rectBitmap, rectCanvas, mPaint);
        mHolder.unlockCanvasAndPost(canvas);
    }
```

## 注意事项

- 为了达到`SurfaceView`透明效果，需要加入以下两句代码
```java
setZOrderOnTop(true);
mHolder.setFormat(TRANSLUCENT);
```

- 从`Drawable`中得到的`Bitmap`不能直接`setPixel()`，必须重新`Bitmap.createBitmap()`，或`Bitmap.copy()`，使得`isMutable`属性为`true`，得到新的`Bitmap`对象才能操作像素，否则会报`IllegalStateException`


## 完整源码:

[https://github.com/wangyucode/WaveProgress](https://github.com/wangyucode/WaveProgress)
