---
title: 树莓派4B系统安装及配置
date: 2019-8-7 10:11:15
tags:
- RaspberryPi
- Linux
category: Linux
---

开启吃派之旅！

![树莓派4B](https://s3.ifanr.com/wp-content/uploads/2019/06/mousse-68.jpg!720)

2019年6月25日树莓派基金会发布了全新的Raspberry Pi 4 「树莓派4 代」。

相比上一代升级了很多，价格依旧250元（1G版），配置如下：

| 项目 | 配置 |
| --- | --- |
| CPU  | 巴龙BCM2711, 4核 Cortex-A72 (ARM v8) 64位  主频1.5GHz |
| 内存 | 1GB/2GB/4GB LPDDR4-2400 SDRAM |
| 有线网络 | 千兆以太网 |
| 无线网络 | 2.4 GHz/5.0 GHz IEEE 802.11ac无线，蓝牙5.0，支持低功耗蓝牙 |
| 显示接口 | 双micro HDMI，最高支持4K60Hz |
| USB | 2个USB3.0+2个USB2.0 |
| GPIO | 40pin兼容以前版本 |
| 电源 | 5V0.3A通过USB type-C 或 GPIO接口 |
| 存储 | Micro-SD加载操作系统和数据存储 |

这篇文章带你安装和配置树莓派：
<!--more-->

## 烧录镜像

为了给树莓派安装操作系统，我们需要一张Micro-SD卡，然后将系统写进去。

根据官网介绍，有两个推荐的下载连接，一个是`NOOBS`，一个是`Raspbian`。

- `NOOBS`是一个操作系统安装程序，它已经包含了`Raspbian`和`LiberELEC`，也可以通过网络安装其它操作系统。
- `Raspbian`是树莓派基金会基于`Debian buster`开发的官方操作系统。

我开始尝试使用`NOOBS`时，树莓派无法启动。官网说可能是`SPI EEPROM`，可以下载bootloader重新启动。
但我没有再折腾这个`NOOBS`，而是采用了第二种，直接写入`Raspbian`镜像的方式，然后我就正常启动了树莓派系统。

![Raspbian](/images/20190807_raspberrypi.jpg)

## 鼠标速度慢

系统启动后发现移动速度很慢，图形界面调了也没用

解决方案：

手动修改鼠标的轮询间隔：
```bash
$ sudo nano /boot/cmdline.txt
```
然后在最后添加`usbhid.mousepoll=0`。
```bash
$ reboot
```
重启树莓派，鼠标终于可以正常使用了。

参考地址：https://whoisnian.com/2017/10/26/Raspberry图形界面下鼠标移动缓慢/

## 远程连接

在`Raspberry Pi Configuration`里打开`SSH`和`VNC`

然后我们就可以通过局域网`SSH`或者`VNC Viewer`远程访问树莓派了

## VNC `Cannot currently show the desktop`

使用`VNC Viewer`远程连接时显示`Cannot currently show the desktop`

解决方案:

```bash
$ cd /boot/
$ sudo nano config.txt
```
取消注释以下3行

```yml
# uncomment if hdmi display is not detected and composite is being output
hdmi_force_hotplug=1

# uncomment to force a specific HDMI mode (this will force VGA)
hdmi_group=1
hdmi_mode=1
```

什么？你想要通过互联网远程访问？那么我们需要**内网穿透**这门技术。下篇文章我们来搞这个。