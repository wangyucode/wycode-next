---
title: 使用Netty和阿里云函数写一个低成本的“梯子”
date: 2018-10-23 15:14:34
tags:
- Netty
- HTTP
category: Backend
---

![流程](/images/20181023_liucheng.jpg "流程")

> 函数计算（Function Compute）是事件驱动的全托管计算服务。函数计算无需租用和管理24小时运行的服务器(Serverless)，无需搭建复杂的服务器环境，只需编写代码并上传就可以了，只需要为代码实际运行消耗的资源付费，非常便宜。

> 函数计算可以选择运行区域，也就是说，我们可以将函数运行的服务器区域选择到香港或者是美国，如此会带来什么样的好处，只可意会，不可言传。那么能否利用云函数写一个Proxy软件呢？请看本文！

<!--more-->

## 在阿里云上新建函数计算

我们需要建立一个云函数，和一个HTTP触发器。

此过程请参考阿里云官网，我就不详细赘述。[官网在此](https://www.aliyun.com/product/fc "官网在此")


## Netty服务端Handle代码

```kotlin
package cn.wycode.lambda.proxy.inbound

import cn.wycode.lambda.proxy.config.AliyunConfig
import cn.wycode.lambda.proxy.outbound.ProxyOutboundInitializer
import io.netty.bootstrap.Bootstrap
import io.netty.buffer.ByteBuf
import io.netty.buffer.Unpooled
import io.netty.channel.*
import io.netty.handler.codec.http.*
import io.netty.util.CharsetUtil

class ProxyInboundHandler(val aliyunConfig: AliyunConfig) : SimpleChannelInboundHandler<ByteBuf>() {


    // As we use inboundChannel.eventLoop() when building the Bootstrap this does not need to be volatile as
    // the outboundChannel will use the same EventLoop (and therefore Thread) as the inboundChannel.
    private var outboundChannel: Channel? = null

    override fun channelRead0(ctx: ChannelHandlerContext, msg: ByteBuf) {
        println("ProxyInboundHandler<<<" + msg.toString(CharsetUtil.UTF_8))
//        val headers = msg.headers()
//        val headerMap = HashMap<String, String>(headers.size())
//        headers.forEach { headerMap[it.key] = it.value }
//        val outboundBody = Request(msg.method().name(), msg.uri(), msg.protocolVersion().text(), headerMap)
//        val outboundJson = JSON.toJSONString(outboundBody)
        val request = DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.POST, aliyunConfig.path)
        request.headers().set(HttpHeaderNames.HOST, aliyunConfig.host)
        request.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.CLOSE)
        request.headers().set(HttpHeaderNames.CONTENT_TYPE, HttpHeaderValues.APPLICATION_JSON)
        request.headers().set(HttpHeaderNames.CONTENT_LENGTH, msg.writerIndex())
//        request.content().writeCharSequence(outboundJson, CharsetUtil.UTF_8)
        request.content().writeBytes(msg)
//
        if (outboundChannel!!.isActive) {
            println("ProxyInboundHandler>>>${request.content().toString(CharsetUtil.UTF_8)}")
            outboundChannel!!.writeAndFlush(request).addListener(object : ChannelFutureListener {
                override fun operationComplete(future: ChannelFuture) {
                    if (future.isSuccess) {
                        // was able to flush out data, start to read the next chunk
                        ctx.channel().read()
                    } else {
                        future.channel().close()
                    }
                }
            })
        }
    }


    override fun channelActive(ctx: ChannelHandlerContext) {
        val inboundChannel = ctx.channel()
        // Start the connection attempt.
        val outboundClient = Bootstrap()
        outboundClient.group(inboundChannel.eventLoop())
                .channel(inboundChannel.javaClass)
                .handler(ProxyOutboundInitializer(inboundChannel))
                .option(ChannelOption.AUTO_READ, false)

        val f = outboundClient.connect(aliyunConfig.host, aliyunConfig.port)
        outboundChannel = f.channel()
        f.addListener { future ->
            if (future.isSuccess) {
                // connection complete start to read first data
                inboundChannel.read()
            } else {
                // Close the connection if the connection attempt has failed.
                inboundChannel.close()
            }
        }
    }


    override fun channelInactive(ctx: ChannelHandlerContext) {
        if (outboundChannel != null) {
            closeOnFlush(outboundChannel!!)
        }
    }

    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        cause.printStackTrace()
        closeOnFlush(ctx.channel())
    }

    companion object {
        fun closeOnFlush(ch: Channel) {
            if (ch.isActive) {
                ch.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE)
            }
        }
    }

}

```

## Netty客户端Handle代码

```kotlin
package cn.wycode.lambda.proxy.outbound

import cn.wycode.lambda.proxy.inbound.ProxyInboundHandler
import io.netty.channel.*
import io.netty.handler.codec.http.FullHttpResponse
import io.netty.util.CharsetUtil

class ProxyOutboundHandler(private val inboundChannel: Channel) : SimpleChannelInboundHandler<FullHttpResponse>() {

    override fun channelActive(ctx: ChannelHandlerContext) {
        println("ProxyOutBoundHandle==")
        ctx.read()
    }

    override fun channelRead0(ctx: ChannelHandlerContext, msg: FullHttpResponse) {
        println("ProxyOutBoundHandle<<<$msg")
        val body = msg.content().toString(CharsetUtil.UTF_8)
        println("ProxyOutBoundHandle body<<<$body")
//        val proxyResponse = try {
//            JSON.parseObject(body, Response::class.java)
//        } catch (e: Exception) {
//            e.printStackTrace()
//            msg.retain()
//            inboundChannel.writeAndFlush(msg).addListener(object : ChannelFutureListener {
//                override fun operationComplete(future: ChannelFuture) {
//                    if (future.isSuccess) {
//                        // was able to flush out data, start to read the next chunk
//                        ctx.channel().read()
//                    } else {
//                        future.channel().close()
//                    }
//                }
//            })
//            return
//        }
//        val headers = CombinedHttpHeaders(true)
//        var outBytes:ByteArray? = null
//        if (proxyResponse.error == null) {
//            for (header in proxyResponse.headers!!) {
//                headers[header.key] = header.value
//            }
//            outBytes = Base64.getDecoder().decode(proxyResponse.content)
//        }else{
//            outBytes = proxyResponse.error.toByteArray()
//        }
//        val response = DefaultFullHttpResponse(HttpVersion.HTTP_1_1,
//                HttpResponseStatus.valueOf(proxyResponse.code),
//                Unpooled.wrappedBuffer(outBytes),
//                headers, DefaultHttpHeaders())
        msg.retain()
        inboundChannel.writeAndFlush(msg.content()).addListener(object : ChannelFutureListener {
            override fun operationComplete(future: ChannelFuture) {
                if (future.isSuccess) {
                    // was able to flush out data, start to read the next chunk
                    ctx.channel().read()
                } else {
                    future.channel().close()
                }
            }
        })
    }

    override fun channelInactive(ctx: ChannelHandlerContext) {
        println("ProxyOutBoundHandle!=")
        ProxyInboundHandler.closeOnFlush(inboundChannel)
    }

    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        cause.printStackTrace()
        ProxyInboundHandler.closeOnFlush(ctx.channel())
    }

}

```

## 云函数代码

```java
package cn.wycode.lambda;

import com.aliyun.fc.runtime.Context;
import com.aliyun.fc.runtime.FunctionComputeLogger;
import com.aliyun.fc.runtime.StreamRequestHandler;

import java.io.*;
import java.net.Socket;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class Lambda implements StreamRequestHandler {


    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        FunctionComputeLogger logger = context.getLogger();
        StringBuilder sb = new StringBuilder();
        byte[] buffer = new byte[1024];
        int n;
        while ((n = input.read(buffer)) != -1) {
            sb.append(new String(buffer, 0, n, StandardCharsets.UTF_8));
        }
        logger.info("handleRequest>>>" + sb.toString());

        String firstLine = new BufferedReader(new StringReader(sb.toString())).readLine();
        String host;
        int port;
        try {
            if (firstLine.startsWith("CONNECT ")) {
                String[] urlArray = firstLine.split(" ")[1].split(":");
                host = urlArray[0];
                port = Integer.parseInt(urlArray[1]);
            } else {
                URL url = new URL(firstLine.split(" ")[1]);
                host = url.getHost();
                port = url.getPort();

                if (port == -1) {
                    if (url.getProtocol().equalsIgnoreCase("http")) {
                        port = 80;
                    } else if (url.getProtocol().equalsIgnoreCase("https")) {
                        port = 443;
                    } else {
                        throw new IllegalArgumentException("端口无法解析");
                    }
                }
            }
        } catch (Exception e) {
            logger.error("url解析错误:" + e.getMessage());
            return;
        }
        logger.info("host->" + host);
        logger.info("port->" + port);

        Socket s = new Socket(host, port);
        if (firstLine.startsWith("CONNECT ")) {
            String response = "HTTP/1.1 200 Connection Established";
            output.write(response.getBytes(StandardCharsets.UTF_8));
            output.flush();
            sb.setLength(0);
            while ((n = input.read(buffer)) != -1) {
                sb.append(new String(buffer, 0, n, StandardCharsets.UTF_8));
            }
            logger.info("handleRequest>>>" + sb.toString());
        }

        OutputStream httpOutputStream = s.getOutputStream();
        httpOutputStream.write(sb.toString().getBytes(StandardCharsets.UTF_8));

        InputStream httpInputStream = s.getInputStream();
        sb.setLength(0);
        while ((n = httpInputStream.read(buffer)) != -1) {
            output.write(buffer, 0, n);
            sb.append(new String(buffer, 0, n, StandardCharsets.UTF_8));
        }
        httpInputStream.close();
        httpOutputStream.close();

        s.close();
        input.close();
        output.close();
        logger.info("handleRequest<<<" + sb.toString());
    }
}

```


## 遗留问题

- HTTP请求代理测试通过
- 可以在Netty客户端发送请求时，对请求体进行二进制加密，函数端解密；函数端收到真实响应加密，Netty客户端收到请求后解密。从而提高安全性
- 对于HTTP请求头为`Connection:keep-alive`的请求，函数端在读取真实响应时，会阻塞在流末尾的read方法而无法返回结果，`Connection:close`的请求正常
- HTTPS请求在有代理的情况下，浏览器会先发送一个HTTP CONNECT请求，以建立TSL通道。目前因为read阻塞问题还没有解决。


附：本项目全部源码地址：

Netty端：[https://github.com/wangyucode/lambda-cross-java](https://github.com/wangyucode/lambda-cross-java "github")
函数端：[https://github.com/wangyucode/aliyun-lambda](https://github.com/wangyucode/aliyun-lambda "github")

以上，转载请联系作者!