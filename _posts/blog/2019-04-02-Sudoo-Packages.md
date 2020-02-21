---
layout: post
title: "Sudoo Packages"
categories: blog
description: 真的没有比这些更好用的轮子了
---

## 介绍

NodeJS 自带的库还可以吧。。但是贼难用，乏善可陈。比如说 HTTP 和 HTTPS 请求要用不同的包，比如说一些基础函数的缺失。

以下的轮子都是及其切合我实际使用的。我很难吹嘘它们有多么有技术含量，不过 API 的设计我都是用了心的，合理，干净，语意化，无副作用，覆盖全面。

## 列表

### [Sudoo-Bark](https://github.com/SudoDotDog/Sudoo-Bark)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Bark.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Bark)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Bark/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Bark)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fbark.svg)](https://www.npmjs.com/package/@sudoo/bark)
[![downloads](https://img.shields.io/npm/dm/@sudoo/bark.svg)](https://www.npmjs.com/package/@sudoo/bark)

```sh
yarn add @sudoo/bark
```

Bark 是一个基础包，支持按需加载，包括基于 Dijkstra 算法的贼好用的字符串距离，奇技淫巧的快速结构方法，还有一些统计学函数。

---

### [Brontosaurus](https://github.com/SudoDotDog/Brontosaurus)

[![Build Status](https://travis-ci.com/SudoDotDog/Brontosaurus.svg?branch=master)](https://travis-ci.com/SudoDotDog/Brontosaurus)

```sh
open https://github.com/SudoDotDog/Brontosaurus
```

Brontosaurus 包含数个子项目，用于第三方登陆，使用 JWT。

---

### [Bark](https://github.com/Barksh/Bark)

```sh
open https://github.com/Barksh/Bark
```

Bark 和上面的基础包同名，包含一系列工具，可以解决工程脚手架和配置文件复制粘贴的问题。

---

### [Pack](https://github.com/SudoDotDog/Pack)

[![Build Status](https://travis-ci.com/SudoDotDog/Pack.svg?branch=master)](https://travis-ci.com/SudoDotDog/Pack)
[![codecov](https://codecov.io/gh/SudoDotDog/Pack/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Pack)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fpack.svg)](https://badge.fury.io/js/%40sudoo%2Fpack)
[![downloads](https://img.shields.io/npm/dm/@sudoo/pack.svg)](https://www.npmjs.com/package/@sudoo/pack)

```sh
yarn add @sudoo/pack --dev
```

Pack 用于将源码打包发布，解决打包项目结构过于复杂的问题。

---

### [DI](https://github.com/SudoDotDog/DI)

[![Build Status](https://travis-ci.com/SudoDotDog/DI.svg?branch=master)](https://travis-ci.com/SudoDotDog/DI)
[![codecov](https://codecov.io/gh/SudoDotDog/DI/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/DI)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fdi.svg)](https://badge.fury.io/js/%40sudoo%2Fdi)
[![downloads](https://img.shields.io/npm/dm/@sudoo/di.svg)](https://www.npmjs.com/package/@sudoo/di)

```sh
yarn add @sudoo/di
```

DI 提供一个符合大部分类型应用的依赖注入解决方案。控制反转！方便测试！太棒了。

---

### [Neon](https://github.com/SudoDotDog/Neon)

[![Build Status](https://travis-ci.com/SudoDotDog/Neon.svg?branch=master)](https://travis-ci.com/SudoDotDog/Neon)
[![codecov](https://codecov.io/gh/SudoDotDog/Neon/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Neon)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fneon.svg)](https://badge.fury.io/js/%40sudoo%2Fneon)
[![downloads](https://img.shields.io/npm/dm/@sudoo/neon.svg)](https://www.npmjs.com/package/@sudoo/neon)

```sh
yarn add @sudoo/neon
```

Neon 是一个看起来很朴素的 UI 库，支持自定义主题，包含 Smart Form 这种只要输出类型就可以输出好用的 UI 的智能组件。克隆项目执行 `make` 可以打开 storybook 看效果。

---

### [Sudoo-Express](https://github.com/SudoDotDog/Sudoo-Express)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Express.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Express)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Express/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Express)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fexpress.svg)](https://www.npmjs.com/package/@sudoo/express)
[![downloads](https://img.shields.io/npm/dm/@sudoo/express.svg)](https://www.npmjs.com/package/@sudoo/express)

```sh
yarn add @sudoo/express
```

Express 是一个 Express 类化的 Wrap 库，很好用，让你的代码更容易管理，支持包括自动跨域设置等帮助函数。

---

### [Sudoo-Redux](https://github.com/SudoDotDog/Sudoo-Redux)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Redux.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Redux)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Redux/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Redux)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fredux.svg)](https://www.npmjs.com/package/@sudoo/redux)
[![downloads](https://img.shields.io/npm/dm/@sudoo/redux.svg)](https://www.npmjs.com/package/@sudoo/redux)

```sh
yarn add @sudoo/redux
```

Redux 是 Redux 和 TypeScript 的最佳实践（我觉得是）。

---

### [Sudoo-Fetch](https://github.com/SudoDotDog/Sudoo-Fetch)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Fetch.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Fetch)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Fetch/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Fetch)
[![npm version](https://badge.fury.io/js/%40sudoo%2Ffetch.svg)](https://www.npmjs.com/package/@sudoo/fetch)
[![downloads](https://img.shields.io/npm/dm/@sudoo/fetch.svg)](https://www.npmjs.com/package/@sudoo/fetch)

```sh
yarn add @sudoo/fetch
```

Fetch 是支持链调用，信息复用，语意化的前端 Fetch 库，解决了 Fetch 的一些问题，至少我觉得很好用。

---

### [IO](https://github.com/SudoDotDog/IO)

[![Build Status](https://travis-ci.com/SudoDotDog/IO.svg?branch=master)](https://travis-ci.com/SudoDotDog/IO)
[![codecov](https://codecov.io/gh/SudoDotDog/IO/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/IO)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fio.svg)](https://www.npmjs.com/package/@sudoo/io)
[![downloads](https://img.shields.io/npm/dm/@sudoo/io.svg)](https://www.npmjs.com/package/@sudoo/io)

```sh
yarn add @sudoo/io
```

IO 是 NodeJS 的文件系统交互库，封装了一些对于 FS 有需求 Node 项目常见的情景解决方案，实现起来不算难，但是其中一些出现的频率之高，比如说 `rm -rf` 类似的使用几乎每一个项目都要实现一边，我认为封装还是有必要的。

---

### [zip](https://github.com/SudoDotDog/zip)

[![Build Status](https://travis-ci.com/SudoDotDog/zip.svg?branch=master)](https://travis-ci.com/SudoDotDog/zip)
[![codecov](https://codecov.io/gh/SudoDotDog/zip/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/zip)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fzip.svg)](https://www.npmjs.com/package/@sudoo/zip)
[![downloads](https://img.shields.io/npm/dm/@sudoo/zip.svg)](https://www.npmjs.com/package/@sudoo/zip)

```sh
yarn add @sudoo/zip
```

zip 是 NodeJS 的 zip 格式压缩包处理库。只支持 Node 10 及以上版本。

---

### [Coco](https://github.com/SudoDotDog/Coco)

[![Build Status](https://travis-ci.com/SudoDotDog/Coco.svg?branch=master)](https://travis-ci.com/SudoDotDog/Coco)
[![codecov](https://codecov.io/gh/SudoDotDog/Coco/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Coco)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fcoco.svg)](https://www.npmjs.com/package/@sudoo/coco)
[![downloads](https://img.shields.io/npm/dm/@sudoo/coco.svg)](https://www.npmjs.com/package/@sudoo/coco)

```sh
yarn add @sudoo/coco
```

Coco 是一个控制台信息读取库，我觉得比市面上任何其他的同类库都好用，如果你要做 CLI 的话可以试试看。

---

### [Connor](https://github.com/SudoDotDog/Connor)

[![Build Status](https://travis-ci.com/SudoDotDog/Connor.svg?branch=master)](https://travis-ci.com/SudoDotDog/Connor)
[![codecov](https://codecov.io/gh/SudoDotDog/Connor/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Connor)
[![npm version](https://badge.fury.io/js/connor.svg)](https://badge.fury.io/js/connor)
[![downloads](https://img.shields.io/npm/dm/connor.svg)](https://www.npmjs.com/package/connor)

```sh
yarn add connor
```

Connor 是一个错误信息处理库，包含错误码注册等功能，前后端都可以使用，如果你用 async await 的语法，throw 关键字肯定是少不了的，这个库能帮你很好的处理错误信息。

---

### [Sudoo-Mock](https://github.com/SudoDotDog/Sudoo-Mock)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Mock.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Mock)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Mock/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Mock)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fmock.svg)](https://www.npmjs.com/package/@sudoo/mock)
[![downloads](https://img.shields.io/npm/dm/@sudoo/mock.svg)](https://www.npmjs.com/package/@sudoo/mock)

```sh
yarn add @sudoo/mock --dev
```

Mock 是一个测试库，可以覆盖恢复任何函数，还支持函数模拟，测试起来非常方便。

需要注意的是，静态的函数想覆盖起来是有难度的。

---

### [Sudoo-Triforce](https://github.com/SudoDotDog/Sudoo-Triforce)

[![npm version](https://badge.fury.io/js/%40sudoo%2Ftriforce.svg)](https://www.npmjs.com/package/@sudoo/triforce)
[![downloads](https://img.shields.io/npm/dm/@sudoo/triforce.svg)](https://www.npmjs.com/package/@sudoo/triforce)

```sh
yarn add @sudoo/triforce --dev
```

Triforce 包含了一切 TS 开发需要的 devDependency，帮助你保证使用组件的版本是最新，无坑，可用的。

---

### [Marked](https://github.com/SudoDotDog/Marked)

[![Build Status](https://travis-ci.com/SudoDotDog/Marked.svg?branch=master)](https://travis-ci.com/SudoDotDog/Marked)
[![codecov](https://codecov.io/gh/SudoDotDog/Marked/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Marked)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fmarked.svg)](https://badge.fury.io/js/%40sudoo%2Fmarked)
[![downloads](https://img.shields.io/npm/dm/@sudoo/marked.svg)](https://www.npmjs.com/package/@sudoo/marked)

```sh
yarn add @sudoo/marked
```

Marked 是一个可以运行 JS 代码的沙盒，支持 Node 和浏览器，你可以自定义自己的 JS 运行器，并安全的运行用户上传的代码。

---

### [Sudoo-Internationalization](https://github.com/SudoDotDog/Sudoo-Internationalization)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Internationalization.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Internationalization)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Internationalization/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Internationalization)
[![npm version](https://badge.fury.io/js/%40sudoo%2Finternationalization.svg)](https://badge.fury.io/js/%40sudoo%2Finternationalization)
[![downloads](https://img.shields.io/npm/dm/@sudoo/internationalization.svg)](https://www.npmjs.com/package/@sudoo/internationalization)

```sh
yarn add @sudoo/internationalization
```

Internationalization 是一个 I18n 库，可以在字符串的含义上处理好自动翻译功能。

---

### [Sudoo-Log](https://github.com/SudoDotDog/Sudoo-Log)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Log.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Log)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Log/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Log)
[![npm version](https://badge.fury.io/js/%40sudoo%2Flog.svg)](https://www.npmjs.com/package/@sudoo/log)
[![downloads](https://img.shields.io/npm/dm/@sudoo/log.svg)](https://www.npmjs.com/package/@sudoo/log)

```sh
yarn add @sudoo/log
```

Log 是一个控制台打印库，你可以管理日志的级别，方便测试和打印日志，在服务器运行时保存有效的信息。在控制台打印的时候 Log 可以用彩色的字符帮助你找到需要的信息，在文件中打印的时候 Log 可以在保留信息的前提下将体积缩减到最小。

---

### [Sudoo-Extract](https://github.com/SudoDotDog/Sudoo-Extract)

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Extract.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Extract)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Extract/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Extract)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fextract.svg)](https://www.npmjs.com/package/@sudoo/extract)
[![downloads](https://img.shields.io/npm/dm/@sudoo/extract.svg)](https://www.npmjs.com/package/@sudoo/extract)

```sh
yarn add @sudoo/extract
```

Extract 是克服运行时类型错误的好帮手，你可以安全的使用运行时类型，并自定义如果出错的错误，配合 Connor 和 TypeScript 更佳。

---

### [Sudoo-Tslint](https://github.com/SudoDotDog/Sudoo-Tslint)

[![npm version](https://badge.fury.io/js/%40sudoo%2Ftslint-config.svg)](https://www.npmjs.com/package/@sudoo/tslint-config)
[![downloads](https://img.shields.io/npm/dm/@sudoo/tslint-config.svg)](https://www.npmjs.com/package/@sudoo/tslint-config)

```sh
yarn add @sudoo/tslint-config --dev
```

Tslint 是一份配置好的 Tslint 配置文件，合理，不过分，不纵容，对我来说最合适！（包含在 Triforce 中）
