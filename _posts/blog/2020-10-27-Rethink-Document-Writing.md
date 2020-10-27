---
layout: post
title: "Rethink document writing"
categories: blog
description: Brontosaurus 的文档还有提升空间
---

## 太多的自动生成文档

使用工具生成和 API 符合的文档是现在大部分项目的选择，也可以说对于大部分开发者来说，使用生成的文档是时髦且优先的选择。即使对于很多语言来说，生成文档的方式更加繁琐，而且调整生成结果更是十分恼人。

那么生成的文档读起来有什么好处呢。我举一个 Flutter 的例子。Flutter 的文档分两种，一种包含可以互动的页面样例，用户可以直接更改网页上的代码看到输出结果。比如说这个页面的文档 https://api.flutter.dev/flutter/widgets/Form-class.html 。这种文档看起来十分优秀，易于阅读，很直观。细看的话你可以发现以上这篇文档也包含自动生成的 API 调用方式。实际上在 Flutter 大力修改文档之前，大部分的组件都是只包含自动生成的文档的。

我想，既然 Flutter 团队很喜欢也宣传自己使用类似 Java 的语法，这种非常类似 JavaDoc 的文档呈现方法大概就是从 Java 社区继承而来的吧。

## 不需要编译的语言
