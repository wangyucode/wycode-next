---
title: 用树莓派4B做一个鱼缸水位报警
date: 2019-8-7 22:31:27
tags:
- RaspberryPi
- Linux
- Python
categories: Linux
---

因为最近要出门一段时间，鱼缸没人照顾，树莓派的第一个实用需求出现了。

准备做一个液位报警仪，当鱼缸水位低于报警水位，发一封邮件给我，我就能在微信上收到通知，从而远程控制给鱼缸加水，防止鱼缸循环泵烧坏。

<video src="/images/20190807_raspberrypi_fish.mp4" controls="controls"  width="70%" style="margin:24px auto;display: block;"></video>

使用GPIO接口控制硬件和接收传感器的数据，实现过程如下：
<!--more-->

## GPIO介绍

树莓派的一个强大功能是沿着电路板顶部边缘的一排`GPIO`（general-purpose input/output）引脚。 树莓派4B板上有一排40针GPIO接头。

![GPIO](https://www.raspberrypi.org/documentation/usage/gpio/images/gpio-numbers-pi2.png)

主板上有两个5V引脚和两个3V3引脚，以及一些不可配置的接地引脚（0V）。 其余引脚均为通用3V3引脚，意味着输出设置为3V3，输入为3V3容差。

### 输出

指定为输出引脚的GPIO引脚可以设置为高（3V3）或低（0V）。

### 输入

指定为输入引脚的GPIO引脚可以读为高（3V3）或低（0V）。 使用内部上拉或下拉电阻可以更轻松地实现这一点。 引脚GPIO2和GPIO3具有固定的上拉电阻，但对于其他引脚，可以使用软件配置。

### 其它

除了简单的输入和输出设备外，GPIO引脚还可以使用多种替代功能，一些可用于所有引脚，另一些则可用于特定引脚。如：PWM、SPI、I2C、串行

## 装备

- 面包板：用于免焊接线，边上两排是竖向连接的，中间是横向连接的。用杜邦线插入孔中就可以便捷接线了。

![面包板](http://www.taichi-maker.com/wp-content/uploads/2017/03/breadboard.jpg)

- GPIO扩展版：可以方便地将所有GPIO接到面包板上

![面包板](http://g.search1.alicdn.com/img/bao/uploaded/i4/i3/TB1jpt3LXXXXXbnXpXXXXXXXXXX_!!0-item_pic.jpg_200x200.jpg)

- LED二极管：用于展示状态

![二极管](http://file.youboy.com/a/83/81/74/5/9777755.jpg)

- 干簧管液位计：用于监测液位，其原理是浮球中有磁铁，可以磁化干簧管，从而短路电路

![液位计](http://i01.yizimg.com/uploads_old/351305/2015112223270383_old.jpg)

## 接线

LED一端接GPIO17号引脚，一端接地。

液位开关一端接GPIO2号引脚，一端接地。

![接线](/images/20190807_fish.jpg)

## 编程

这里我使用`GPIO Zero`

这是一个Python的GPIO库，树莓派默认已经安装了，可以直接使用。

核心脚本如下：

```python
from gpiozero import LED
from gpiozero import Button
from time import sleep

led = LED(17) #1
button = Button(2) #2
while True:
    sleep(0.5) #3
    if button.is_pressed: #4
        led.on()
    else:
        led.off()
```
1. 创建一个LED模式的GPIO口用于展示状态
2. 创建一个Button模式的GPIO口
3. 每0.5秒检测一次
4. 开关打开则点亮LED，否则关闭LED

## Python发送邮件

```python
#coding=utf-8
from email.mime.text import MIMEText
from email.header import Header
from smtplib import SMTP_SSL
import time


#邮箱smtp服务器
host_server = 'smtp.exmail.qq.com'
#sender用户名
sender_user = 'wangyu@wycode.cn'
#邮箱登录密码
sender_pwd = '**********'
#发件人的邮箱
sender_mail = sender_user
#收件人邮箱
receiver = sender_user

#邮件的正文内容
mail_content = '【水位警报】过低\n时间：'+time.strftime( '%Y-%m-%d %X', time.localtime())
#邮件标题
mail_title = '【水位警报】过低'

#ssl登录
smtp = SMTP_SSL(host_server)
#set_debuglevel()是用来调试的。参数值为1表示开启调试模式，参数值为0关闭调试模式
smtp.set_debuglevel(1)
smtp.ehlo(host_server)
smtp.login(sender_user, sender_pwd)

msg = MIMEText(mail_content, "plain", 'utf-8')
msg["Subject"] = Header(mail_title, 'utf-8')
msg["From"] = sender_mail
msg["To"] = receiver
smtp.sendmail(sender_mail, receiver, msg.as_string())
smtp.quit()
```

