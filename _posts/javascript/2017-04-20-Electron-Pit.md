---
layout: post
title:  "Electron Pit"
categories: JavaScript
description: UpgradeE 的坑
---

# UpgradeE 的坑

## Electron 的坑

-   用remote调用主进程的全局变量的时候不能传递自己建的对象， 如果强行传递的话会失去私有变量量的限制，然而所有prototype的方法都会丢失。
-   调整icon的时候不能用系统推荐的NativeImage对象，也不能直接用路径，需要用Path对象建立。
-   Menu里如果没有复制粘贴功能就会有的时候迷之失去复制粘贴的功能。
-   Mac端中，Menu的第一个母菜单会被强制命名。

## Node 的坑

-   

## API 的坑

-   
