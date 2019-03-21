---
layout: post
title: "Install C++ Py based npm package"
categories: JavaScript
description: 在 Windows 上安装基于 msvs 的 ... 包
---

只是记录一下，有一些 Node 的包是基于 msvs 的，大部分是用 Python 写的然后编译成 Cpp 然后用 NodeGYP 编译成 `.node` 文件。

听起来很复杂，但是有些人他就是这么搞的。我们需要下载一个依赖 `windows-build-tools` 注意，这个包尽量全局安装，避免多次安装的麻烦，除此之外还有一个自定义的 npm 设置要弄，复制以下的代码就好啦～

```sh
npm install --global --production windows-build-tools  
npm config set msvs_version 2015 --global
```

当然，在安装之前请确保 Python 已经安装好了
