---
title: Angular框架原理的思考
date: 2017-12-28 10:00:07
tags:
- Angular
- TypeScript
- HTML
categories: Frontend
---

> Angular框架的整体思路，很像Spring这样的后台框架。一层层的分解、解耦，天下框架莫不如此。

Angular有3个重要概念：

- 模块(Module)
- 组件(Component)
- 路由(Router)

Angular通过将大型项目分割成一个个`模块`，松耦合，便于扩展和维护。

所谓`组件`，就是一个MVC块，每个模块会有很多组件，组件代表了一个页面，可以嵌套，因此可以更加细分下去，通过元数据做双向绑定。

所谓`路由`，就是一个分发器，不同的路径加载不同的模块或组件即可。

所谓`元数据`，就是Java注解。

Spring那套，控制反转（IOC）依赖注入（DI）也被引入进来。

将业务逻辑封装到`Service`里，然后注入到各个组件中使用。业务代码就彻底被隔离到Service里了，不会侵入框架整体设计。

关于Webpack：Webpack在打包Web工程时，可以找到资源之间的引用，最小化压缩合并CSS，JavaScript文件。