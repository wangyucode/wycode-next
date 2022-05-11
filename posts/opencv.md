---
title: OpenCV入门
date: 2018-3-8 20:41:04
tags:
- OpenCV
- Java
categories: AI
---

![OpenCV](/images/20180308_OpenCV.png)

> OpenCV是一个开源的计算机视觉库，广泛应用于各种图像处理，人脸识别，图像分析，自动驾驶等领域。目前最新版是3.4.1，本文基于最新版编写。


OpenCV使用C++编写，采用了模块化的结构，本文将逐个介绍每个模块的主要功能，并将介绍如何使用Java调用OpenCV库。

<!--more-->

## 1.模块


- **Core functionality**：**核心功能**,定义了一些其它模块需要使用的基本功能，以及包括多维数组`Mat`在内的众多数据结构。OpenCV的图像处理主要就是针对`Mat`对象。
- **Image processing**：**图像处理**,包括线性和非线性图像滤波，几何图像转换（调整大小，仿射和透视变形，通用基于表格的重新映射），色彩空间转换，直方图等。
- **imgcodecs**：**图片读写**。
- **calib3d**：**3D处理**,基本多视图几何算法，单个和立体相机校准，对象姿态估计，立体对应算法以及三维重建元素。
- **features2d**：**特征点处理**,显着特征检测器，描述符和描述符匹配器。
- **objdetect**：**物体检测**,物体检测和预定义的类别（例如，脸部，眼睛，杯子，人物，汽车等）。
- **highgui**：**UI**,一个简单易用的UI接口。
- **Video I/O**：**视频IO**,一个简单易用的视频捕捉和视频编解码器接口。
- **gpu**：**GPU加速**,不同OpenCV模块的GPU加速算法。
- **dnn**：**深度神经网络**。
- **ml**：**机器学习**。
- **flann**：**多维聚类和搜索**。包含大数据集中的快速最近邻搜索和高维特征而优化的算法集合。
- **photo**：**照片处理**，降噪，HDR，无缝克隆，细节增强等。
- **stitching**：**图像拼接**，降噪，HDR，无缝克隆，细节增强等。
- **shape**：**形状**，形状距离和匹配。
- **superres**：**超分辨率**。
- **videostab**：**视频防抖**。
- **viz**：**3D虚拟化**。

还有一些其它扩展模块。

## 2.配置Java开发环境

1. 下载Windows版OpenCV
2. 解压后在`build`文件夹中找到`java`文件夹，复制到Java工程的libs文件夹里
3. 对`opencv-341.jar`添加依赖
4. VM option 添加本地库配置：`-Djava.library.path=./libs/x64`


## 3.Hello OpenCV

```java

Mat mat = Imgcodecs.imread(file.getAbsolutePath());
Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2GRAY);
Imgproc.Canny(mat, mat, 5, 20);
Image img = Utils.mat2Image(mat);
controller.setImage(img);
```

运行结果如图：


![OpenCV](/images/20180309_opencv_test.png)