---
title: 使用Docker容器部署SpringBoot项目
date: 2019-11-20 14:32:06
tags:
- Linux
- Docker
- Spring Boot
categories: Back-end
---

![docker](https://d1q6f0aelx0por.cloudfront.net/product-logos/644d2f15-c5db-4731-a353-ace6235841fa-registry.png)

Docker容器化技术，使得部署变得平滑。再也不需要维护软件运行所需的复杂环境。Docker和现代化的微服务，敏捷开发，快速迭代和交付的要求非常匹配。

这篇文章实践从安装Docker开始，到将一个SpringBoot项目部署到Docker容器中。

<!--more-->

## 安装Docker CE(Community edition)

我这里使用的环境是`Ubuntu18.04`

```bash
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
$ systemctl enable docker
$ systemctl start docker
```

## 准备SpringBoot工程

这里我使用Spring官方的Docker示例项目

`git clone https://github.com/spring-guides/gs-spring-boot-docker.git`

## Dockerfile

SpringBoot的`Dockerfile`有两种

简单版的如下：
```
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```
这是典型的SpringBoot项目启动方式

复杂版的如下：
```
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","hello.Application"]
```
这是将lib和src分离的方式，有点像展开的jar

我这里选择上面简单版的，简洁和性能之间我选简洁！

## 基于maven构建Docker镜像

使用Maven的话有Spotify构建的`dockerfile-maven-plugin`插件
```xml
<!-- tag::plugin[] -->
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>dockerfile-maven-plugin</artifactId>
    <version>1.4.9</version>
    <executions>
        <execution>
            <id>default</id>
            <phase>install</phase>
            <goals>
                <goal>build</goal>
                <goal>push</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <repository>${docker.image.prefix}/${project.artifactId}</repository>
        <buildArgs>
            <JAR_FILE>${project.build.finalName}.jar</JAR_FILE>
        </buildArgs>
    </configuration>
</plugin>
<!-- end::plugin[] -->
```

- 添加了两个maven任务，build用户构建docker镜像，push用于推送docker镜像。
- 添加了构建参数`buildArgs`>`JAR_FILE`传递给Dockerfile。
- 添加了版本号作为镜像tag

> 打包Docker镜像本身是需要docker环境的，于是有一种方法是开启remote API
> 到这里其实就已经可以发布程序到DockerHub了，但实际项目中，我们不想发布私人镜像到DockerHub，那么我们需要建立私人的Docker仓库。

## 开启remote API远程构建镜像

Docker是CS模式，Docker的服务是支持通过Http远程访问的。通过开启remote API即可远程进行访问。
```
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2376
```
但要注意的remote API是需要进行TSL加密的。否则存在未授权访问漏洞，会被黑客利用，植入挖矿程序（别问我怎么知道的）。

## 建立Docker私人仓库（Docker Registry）

具体方式是添加一个仓库镜像

```bash
$ docker run -d -p 5000:5000 --restart always --name registry registry:2
```

然后就可以：

```bash
$ docker pull ubuntu
$ docker tag ubuntu localhost:5000/ubuntu
$ docker push localhost:5000/ubuntu
```

> 为了安全，创建的私有仓库也要添加Https

## 总结

使用docker部署SpringBoot工程时，正规的流程应该是：
1. 为工程编写Dockerfile
2. 添加Docker插件，构建Docker镜像
3. push到公共或私有Docker仓库
4. 拉取最新镜像并运行

本地无法构建时，应使用某种持续集成方法让编译机去负责出包和推送，不应该使用remote API这不是常规做法，而且有安全风险。
此外Docker官方提供了安全的私有Docker仓库，少量使用是免费的。