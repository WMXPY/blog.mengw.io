---
layout: post
title: "Everything Are Generators"
categories: JavaScript
description: 谁还不是个生成器了？
---

> 天地初开，一切皆为混沌，是为无极；阴阳交合，阴阳二气生成万物是为太极；清者上升为天，浊者下沉为地。  
> --易经

## 生成器

我之前有一篇介绍生成器的文章。[从百草园（数组拉平）到三味书屋（迭代器](https://mengw.io/javascript/From-Flat-To-Generator) 介绍了使用生成器的 `yield` 和 `yield*` 的接管机制。实际上生成器更广泛的应用是编写异步函数。这篇文章我想着重记录一下生成器的协程机制，异步的生成器用法和 `async-await` 语法糖是如何用生成器实现的。

