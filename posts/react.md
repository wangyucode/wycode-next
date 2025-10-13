---
title: React框架原理的思考
date: 2018-1-6 14:41:14
tags:
- React
- JavaScript
category: Frontend
---

![React](/images/20180213_react.png)

> React框架的整体思路是将DOM元素彻底改为由JS代码渲染，通过组件(`Component`)的层层嵌套，最终由`ReactDOM.render()`渲染到页面上。

React框架的核心概念：

- 元素(`Element`) Recat认为元素是不可变的，创建后不能修改。React使用`JSX`技术将HTML代码直接作为常量使用。
- 组件(`Component`) 组件是对元素的封装。拥有自身的生命周期函数。
- 属性(`Props`) 属性可以看作常量，用于构建特定的组件。
- 状态(`State`) 组件通过状态维护自身变化。组件通过调用`setState()`方法重新渲染。

React的理念是采取[单一责任原则](https://en.wikipedia.org/wiki/Single_responsibility_principle "Wiki")，自顶向下设计，一层层的拆分成只做一件事的`Component`。

在做一个实际的项目时，采取先使用假数据画页面的方式，这个过程中只需要关心数据模型和页面。而不去关心逻辑交互。

此时`Component`为什么要分成`Props`和`State`就显而易见了，做页面时只关心`Props`，做交互时只关心`State`。