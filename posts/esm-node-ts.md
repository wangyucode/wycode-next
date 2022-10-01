---
title: esModule + NodeJS + TypeScript 的工程配置
date: 2022-9-22 13:35:29
tags:
- JavaScript
- TypeScript
- NodeJS
category: Frontend
---

![nodejs](https://www.w3cschool.cn/attachments/image/20170808/1502178281486445.png)

JavaScript的模块化方案经历了长时间的发展，最终于2015年在ES6实现了语言层面的标准化，即esModule（以下简称esm）, 现在JS社区开始拥抱esm，很多npm包仅采用esm发布。

而NodeJS一直依赖采用CommonJS的模块化方案，在最近发布的版本中也开始支持ems, 由于巨大的历史包袱，NodeJS并没有抛弃CommonJS，所以在NodeJS中实际支持两种模块化方式，esm和CommonJS.

此外，现在很多前端工程使用TypeScript开发，而TS的模块解析方式也需要进行一些配置，在这3者结合的过程中有很多坑，本文介绍将三者完美结合的最佳实践。

<!--more-->

## 同时引入CommonJS包和ESM包

为了测试我们同时引入`lodash`的CommonJS版本和ESM版本

```bash
npm i lodash-es lodash
```

在NodeJS中，模块作者除非显示指定使用esm方式加载模块：

- 使用`.mjs`
- 在`package.json`中的`type`字段指定为`module`
- 使用`--input-type`标记

否则默认加载方式为CommonJS。

而上面的例子中`lodash-es`的`package.json`中的`type`就是`module`。

## 使用CommonJS包

创建一个`common-js.js`文件：

```javascript
const _ = require('lodash');
console.log(_.VERSION); // print '4.17.21'
```

以上是CommonJS的写法，很习以为常，能够正确打印。

## 使用esm包

创建一个`esm.js`文件：

```javascript
import _ from 'lodash-es';
console.log(_.VERSION);
```

第1个坑出现了, 报语法错误：`SyntaxError: Cannot use import statement outside a module`

说无法在模块外部使用import语句，一旦一个文件有顶级(top-level)的`import`或`export`，它会被当作一个模块，否则是一个脚本文件。

所以我们需要把这个文件变成esm，两种方式：

1. 重命名文件，修改扩展名为`.mjs`;
2. 在`package.json`中添加`"type": "module"`

但如果采用选项2，第2个坑就会出现了, 回去运行`common-js.js`报错：`ReferenceError: require is not defined in ES module scope, you can use import instead`。
说`require`在esm中不支持，此时可以重命名`common-js.js`后缀为`.cjs`，告诉模块加载器，此文件以CommonJS加载。

## 引入Typescript

安装TS：

```bash
npm i typescript ts-node -D
```

> ts-node 可以在nodejs中直接运行ts文件而无需编译

然后将刚才的`esm.js`和`common-js.cjs`扩展名改为`.ts`

使用`ts-node`命令直接运行`esm.ts`

```bash
npx ts-node esm.ts
```

第3个坑出现了，扩展名不支持：`TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for xxx`

这是因为esm的默认扩展名是js而不是ts，此时我们需要：

1. `ts-node --esm`
2. 添加 `"ts-node": {"esm": true}`到`tsconfig.json`。

如果采用方案1，第4个坑出现了，无法找到模块：`error TS7016: Could not find a declaration file for module 'lodash-es'`。

此时添加配置: `"esModuleInterop": true`到`tsconfig.json`的`compilerOptions`中。

添加完成后第5个坑出现了，引用错误：`ReferenceError: exports is not defined in ES module scope`

此时添加配置`module": "ESNext"`到`tsconfig.json`的`compilerOptions`中。

添加完成后第6个坑出现了，找不到模块：`ReferenceError: exports is not defined in ES module scope`

此时配置模块的解析方式为最新的`"moduleResolution": "Node16"`。

到此终于可以成功运行`esm.ts`了。

返回去运行`common-js.ts`:

```bash
npx ts-node common-js.ts
```

第7个坑出现了，它把我们的CommonJS模块当esm了：`ReferenceError: require is not defined in ES module scope, you can use import instead`

此时处于鱼和熊掌不可兼得，因为我们设置了`module": "ESNext"`， 所以ts的编译结果会添加`export {}`，所以如果要在纯esm的工程中仍然要使用CommonJS，则使用`.cjs`作为扩展名即可。

完整的代码在这里：https://github.com/wangyucode/esm-node-ts