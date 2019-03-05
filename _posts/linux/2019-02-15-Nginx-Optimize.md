---
layout: post
title:  "Nginx Optimize"
categories: Linux
description: 通过简单的配置优化 Nginx
---

## 范围

Nginx采用模块化的运行方式，我们可以通过分别配置几个模块的方式来优化Nginx的性能，其实这种东西很难说得上是优化，只是通过一些简单的配置告诉Nginx我们的趋向。

这篇文章应该会用`https://mengw.io/linux/Nginx-Node-Service`这个链接中创建的配置文件为基础。

## 全局

有几个配置是全局的，其中两个选项和我们有关：

- worker_processes auto;
- worker_rlimit_nofile 4864;

`worker_processes`是启用的线程数量，最简单的答案就是保持其`auto`选项，也就是根据核心数自动决定。`worker_rlimit_nofile`是最大保持开启的文件数量，这个数量可以达到当前系统的上线，这个4864是我mac上的结果，如果你的项目需要打开许多文件的话，这个配置是值得更改的。

## HTTP模块

http模块的配置不多，可以更改的不少，但是这对”优化“性能没有什么帮助，更多的是更适应你的项目，比较重要的分别是：

-  tcp_nopush on;
-  tcp_nodelay on;

`tcp_nopush`使Nginx在一个包中发送所有的头文件，`tcp_nodelay`使Nginx不缓存包，而是一次性发送。

很明显，`tcp_nopush`在大部分时段都应该保持开启，而`tcp_nodelay`应该在你的项目实时性比较强的情况下开启。
