---
title: VirtualBox的虚拟机网络配置
date: 2019-9-20 14:32:06
tags:
- VirtualBox
category: Linux
---

![virtual-box](https://www.virtualbox.org/graphics/vbox_logo2_gradient.png)

VirtualBox是著名的开源虚拟机软件，最初由Sun公司出品。后来Sun公司被Oracle收购。Sun公司的包括Java和VirtualBox，现在都是Oracle公司的软件。

配置虚拟机时，对于如何选择网络类型一直是一头雾水，这篇文章将VirtualBox的7种网络模式全部都总结一下。

不同模式的原理，也适用于VMWare。

<!--more-->

## Not attached

这个模式会向虚拟机报告有网卡，但没有物理连接。
就像拔网线一个效果。
对于通知虚拟机重新配置网络很有用。

## Network Address Translation (NAT)

如果你只是想在虚拟机内访问互联网，这个模式就足够了。
这种模式有很多限制，比如无法ping通。不支持UDP广播。除了TCP和UDP之外的协议不支持。

## NAT Network

和NAT差不多，NAT网络就像虚拟机在一个路由器后面一样。外部访问需要设置端口转发。

## Bridged Networking

即桥接，虚拟机将直接链接某个宿主机物理网卡，而不用通过宿主机操作系统的网络。

## Internal networking

这种网络仅在虚拟机内部可见，宿主机及外部不可见。

## Host-only networking

这种可以创建一个虚拟的网络组，包含宿主机和虚拟机，宿主机上会有一个虚拟的网卡，提供和虚拟机之间的连接。

## Generic networking

这种相当于自定义，可以自由选择网卡驱动，一般情况下用不着这个。

## 各种模式可访问性：

| 模式 | 虚拟机→宿主机 | 宿主机→虚拟机 | 虚拟机A→虚拟机B | 虚拟机→互联网 | 互联网→虚拟机 |
| ------ | ------------ | ------------ | -------------- | ------------ | ------------ |
| Host-only | √ | √ | √ | X | X |
| Internal | X | X | √ | X | X |
| Bridged | √ | √ | √ | √ | √ |
| NAT | √ | 端口转发 | X | √ | 端口转发 |
| NATservice | √ | 端口转发 | √ | √ | 端口转发 |

## 总结

绝大多数情况下，我们需要虚拟机可以上网，这时设置一个`NAT`的模式。
然后我们还需要主机可以访问虚拟机的服务，这时我们可以为虚拟机再加一个网卡设置为`Host-only`模式。