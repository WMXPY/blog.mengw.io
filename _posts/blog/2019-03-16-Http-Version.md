---
layout: post
title: "Version of Http Protocol"
categories: blog
description: 面试之前请你再看一遍 HTTP 的版本！
---

## HTTP 1 和 2

首先，HTTP 1.1 和 HTTP 2 是我们目前见到的最多的格式。既然 1.1 还在使用，所以不如先讲一下 HTTP 1 和 HTTP 1.1 的区别罢。

## HTTP 1.1 的进步

- 支持了更多基于 Entity 的缓存控制，从 `If-Modified-Since`, `Expires` 这种基于 `从 xxx 的时候开始` 变成了 `If-Unmodified-Since`, `If-Match`, `If-None-Match` 更接近缓存的原因这样的语意的标签。
- 支持了断点续传，也就是说支持了对某一个二进制资源的部分 Range 的请求，`Range` 也是对应功能 Header 的名称。
- Host，简单来说，一个 IP 地址现在被认为是有可能存在多个 Host 的。
- 长链接 `Connection=keep-alive`

## SPDY

在 HTTP 2 已经相对使用较多的情况下，有人认为 SPDY 的实用价值已经不高了，但是实际上 HTTP 2 甚至可以说是 SPDY 的升级版，然而，这是什么东西呢。

SPDY 是又 Chrome 率先提出的作用与应用层 HTTP 和传输层 TCP 之间的网络协议（我认为 SPDY 做的是会话层的工作，但是它又在 SSL 层也就是表示层之下），优雅的实现了多路复用（在 HTTP2 中已经实现）的功能，同时也带给了浏览器强大的缓存能力。SPDY 支持反向推送：在你请求 `index.html` 的时候自动把 `bundle.js` 和 `style.css` 推送到你浏览器的 SPDY 缓存区中，这样你再请求对应的文件的时候可以直接从缓存中取得。真是一个惊奇的方式。

顺带一提，括号里说的 “在 SSL 层之下” 是真实的，SPDY 只支持 HTTPS。

## HTTP 2

HTTP 2 支持明文传输，这是相对 SPDY 上一项伟大的升级。但是实际上，浏览器不遵守规范又不是一天两天了，不上 HTTPS 这些浏览器不会让你使用的。多路复用可以在 HTTP 2 中爽用，同时，还有一项功能 `表头压缩`，虽然 SPDY 也支持但是毕竟不是规范，所以并没有 HTTP 2 支持力度大。为什么表头压缩和规范关系这么大呢，实际上表头压缩简单来说就是替换相同符号，服务器和浏览器各有一份表头对照表收到之后相互翻译就行了。

## 多路复用（Multiplexing）不是早就能用了吗

问出这个问题的小朋友一定是混淆了 `多路复用` 和 `长链接` 这两个概念。多路复用指的是 TCP 链接开启之后可以同步请求多个资源，而长链接指的是 TCP 链接开启之后不断开。也就是说这两项技术并不冲突，或者有增强意味。我可以举例说明，对于同一个网站：

- 没有开启长链接
  - TCP 开启
  - 请求 index.html
  - 收到 index.html
  - TCP 关闭
  - TCP 开启
  - ...
- 长链接
  - TCP 开启
  - 请求 index.html
  - 收到 index.html
  - 请求 bundle.js
  - 收到 bundle.js
  - 请求 style.css
  - ...
- 多路复用
  - TCP 开启
  - 请求 index.html
  - 收到 index.html
  - 请求 bundle.js, style.css, logo.image ...
  - 收到 bundle.js
  - 收到 style.css
  - 收到 ...
  - ...

你可以看到多路复用对于速度的提升是明显的。

## 这是啥？不是服务端推送吗？

服务端推送和多路复用是不冲突的，具体的解释一下服务端推送的话，大概就是我只要了 `index.html` 但是鉴于如果你不是爬虫，你肯定会要其他的文件，那不如我就直接给你把。

鉴于 HTTP 2 和 SPDY 师出同门，支持这个也是肯定的。
