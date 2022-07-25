---
title: 使用Netty开发高性能的网络服务应用
date: 2018-10-16 12:48:43
tags:
- Netty
- HTTP
categories: Backend
---

![Netty](https://issues.jboss.org/secure/attachment/12345694/netty_logo_600px.png)

> Netty是一个基于异步NIO（non-blocking IO）模型的，事件驱动的网络应用程序框架。

> 不同于传统阻塞IO，非阻塞IO通常使用更少的线程，从而提高并发性能。

> Netty的灵活设计使得它能够开发几乎所有基于二进制流、文本应用协议的Web应用

这篇文章将简单介绍如何使用Netty开发一个HTTP服务器

<!--more-->

## 导入Netty

这里使用Gradle导入4.1.30.Final版本

```json
dependencies {
	compile "io.netty:netty-all:4.1.30.Final"
}
```

## 编写服务器

```kotlin
class Server(val port: Int) {

    @Throws(Exception::class)
    fun run() {
        val bossGroup = NioEventLoopGroup(1)
        val workerGroup = NioEventLoopGroup()
        try {
            val b = ServerBootstrap()
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel::class.java)
                    .handler(LoggingHandler(LogLevel.INFO))
                    .childHandler(ServerInitializer())
            val ch = b.bind(port).sync().channel()
            println("server start on $port")
            ch.closeFuture().sync()
        } finally {
            bossGroup.shutdownGracefully()
            workerGroup.shutdownGracefully()
        }
    }
}
```

- 这里`bossGroup`是用来接受连接的父线程池，可以是单线程，也可以是多线程（推荐是CPU核心数的倍数）
- 因为`bossGroup`接受连接后会立即返回，不会阻塞，所以即使单线程也能够处理并发（类似Node.JS）
- `workerGroup`是工作线程
- `channel()`设置构建NIO Channel的类型
- `handle()`和`childHandle()`分别设置主处理，和子处理对象


## 配置子处理流程

```kotlin
class ServerInitializer : ChannelInitializer<SocketChannel>() {
    override fun initChannel(ch: SocketChannel) {
        val p = ch.pipeline()
        p.addLast(HttpRequestDecoder())
        // Uncomment the following line if you don't want to handle HttpChunks.
        //p.addLast(new HttpObjectAggregator(1048576));
        p.addLast(HttpResponseEncoder())
        // Remove the following line if you don't want automatic content compression.
        //p.addLast(new HttpContentCompressor());
        p.addLast(HttpServerHandler())
    }

}
```
- Netty自带了很多的编解码器，上面的`HttpRequestDecoder`和`HttpResponseEncoder`用于HTTP协议的编解码
- 经过编解码后我们的`HttpServerHandler`将会实际处理HTTP请求


## 处理HTTP请求

```kotlin
class HttpServerHandler : SimpleChannelInboundHandler<Any>() {

    val sb = StringBuilder()

    lateinit var request: HttpRequest

    override fun channelRead0(ctx: ChannelHandlerContext, msg: Any) {
        if (msg is HttpRequest) {
            if (HttpUtil.is100ContinueExpected(msg)) {
                ctx.write(DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.CONTINUE))
            }
            request = msg


            sb.setLength(0)

            sb.append("Welcome\r\n")
            sb.append("=====================\r\n")
            sb.append("VERSION: ").append(msg.protocolVersion()).append("\r\n")
            sb.append("HOSTNAME: ").append(msg.headers().get(HttpHeaderNames.HOST, "unknown")).append("\r\n")
            sb.append("REQUEST_URI: ").append(msg.uri()).append("\r\n\r\n")

            val headers = msg.headers()
            if (!headers.isEmpty) {
                for (h in headers) {
                    sb.append("HEADER: ").append(h.key).append(" = ").append(h.value).append("\r\n")
                }
                sb.append("\r\n")
            }

            val queryStringDecoder = QueryStringDecoder(msg.uri())
            val params = queryStringDecoder.parameters()
            if (!params.isEmpty()) {
                for (p in params) {
                    val vals = p.value
                    for (value in vals) {
                        sb.append("PARAM: ").append(p.key).append(" = ").append(value).append("\r\n")
                    }
                }
                sb.append("\r\n")
            }

            appendDecoderResult(sb, msg)
        }

        if (msg is HttpContent) {
            val content = msg.content()

            if (content.isReadable) {
                sb.append("CONTENT: ")
                sb.append(content.toString(CharsetUtil.UTF_8))
                sb.append("\r\n")
                appendDecoderResult(sb, msg)
            }

            if (msg is LastHttpContent) {
                sb.append("END OF CONTENT\r\n")

                if (!msg.trailingHeaders().isEmpty) {
                    sb.append("\r\n")
                    for (name in msg.trailingHeaders().names()) {
                        for (value in msg.trailingHeaders().getAll(name)) {
                            sb.append("TRAILING HEADER: ")
                            sb.append(name).append(" = ").append(value).append("\r\n")
                        }
                    }
                    sb.append("\r\n")
                }

                // Decide whether to close the connection or not.
                if (writeResponse(msg, ctx)) {
                    // If keep-alive is off, close the connection once the content is fully written.
                    ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE)
                }
            }
        }

    }

    override fun channelReadComplete(ctx: ChannelHandlerContext) {
        ctx.flush()
    }

    private fun writeResponse(currentObj: HttpObject, ctx: ChannelHandlerContext): Boolean {
        val keepAlive = HttpUtil.isKeepAlive(request)
        // Build the response object.
        val status = if (currentObj.decoderResult().isSuccess) {
            HttpResponseStatus.OK
        } else {
            HttpResponseStatus.BAD_REQUEST
        }
        val response = DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1, status,
                Unpooled.copiedBuffer(sb.toString(), CharsetUtil.UTF_8))

        response.headers().set(HttpHeaderNames.CONTENT_TYPE, "${HttpHeaderValues.TEXT_PLAIN}; charset=UTF-8")

        if (keepAlive) {
            // Add 'Content-Length' header only for a keep-alive connection.
            response.headers().setInt(HttpHeaderNames.CONTENT_LENGTH, response.content().readableBytes())
            // Add keep alive header as per:
            // - http://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01.html#Connection
            response.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.KEEP_ALIVE)
        }
        // Encode the cookie.
        val cookieString = request.headers().get(HttpHeaderNames.COOKIE)
        if (cookieString != null) {
            val cookies = ServerCookieDecoder.STRICT.decode(cookieString)
            if (!cookies.isEmpty()) {
                // Reset the cookies if necessary.
                for (cookie in cookies) {
                    response.headers().add(HttpHeaderNames.SET_COOKIE, ServerCookieEncoder.STRICT.encode(cookie))

                }

            }

        } else {
            // Browser sent no cookie.  Add some.
            response.headers().add(HttpHeaderNames.SET_COOKIE, ServerCookieEncoder.STRICT.encode("key1", "value1"));
            response.headers().add(HttpHeaderNames.SET_COOKIE, ServerCookieEncoder.STRICT.encode("key2", "value2"));

        }

        // Write the response.
        ctx.write(response)

        return keepAlive
    }


    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        cause.printStackTrace()
        ctx.close()
    }

    companion object {
        fun appendDecoderResult(sb: StringBuilder, httpObj: HttpObject) {
            val result = httpObj.decoderResult()
            if (result.isSuccess) {
                return
            }

            sb.append(".. WITH DECODER FAILURE: ")
            sb.append(result.cause())
            sb.append("\r\n")
        }
    }
}
```

- 如果构造流程时没有使用`HttpObjectAggregator`类，`channelRead()`会调用很多次，每次传入的对象为`HttpRequest`，`HttpContent`,`LastHttpContent`的子类，他们分别有方法可以读取到HTTP请求的内容。

以上，转载请联系作者!