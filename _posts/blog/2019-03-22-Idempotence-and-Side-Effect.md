---
layout: post
title: "Idempotence and Side Effect"
categories: blog
description: 幂等性和无副作用函数
---

> 我不知道这个世界会如何看我，但对我自己而言我仅仅是一个在海边嬉戏的顽童，为时不时发现一粒光滑的石子或一片可爱的贝壳而欢喜，可与此同时对我面前的伟大的真理的海洋熟视无睹。  
> --艾萨克 牛顿

## 我就是要点点点点点

宇宙的未知，深海的奥秘，就如同用户的行为，是不可预知的。用户重复同一个操作无数次是非常正常的。

我们假设有这样一个行为，用户发送一个 POST 请求，目的是新建一篇文章，或者说目的是将一篇文章上传到用户的账号上。这样的 API 我们要怎么设计呢？我想很多人都会接受 `POST https://domain.com/article/create` 或者再 Rest 一点，不要最后的 `create` 完全基于资源设计。

用户在这件事情上就可以做文章了，比如说写好一篇文章之后疯狂点击上传按钮 100 下。

## 无副作用的函数

每个人都喜欢函数式编程的原因之一就是无副作用，每一个函数在相同传入的时候输出都是一定的。不管调用多少次都不会有问题，大不了之前的不要了，只要最后一次的结果就行了。

我们把相同的思路引用到刚才的 POST 例子上去，当用户的请求的 **某一些** 传入相同的时候返回相同的结果，并且没有副作用不就行了吗？显然是不行的，这是因为创建了一篇文章本身就是副作用的一种，整个函数的唯一目的就是其中的副作用，如果我们不想要这个副作用，整个函数的价值就没了。

## 中间件

解决方案永远都是有的，这个问题的解决方案之一就是中间件。只开放中间件的端口，用分布式事务的方法处理实际的需求，把用户的访问的接触端固定在中间件的范围内。当我们用某些方式发现用户上传的文章是同一篇的时候，就此拦截，这样的话用户不管点多少次，都不会重复创建。

那这样的弊端是什么呢，技术上讲，判断上传的文章是不是同一篇是有难度的。完全相同的文章是同一篇，改了一个字呢的？改了几个字的呢？这样的哲学性问题我们是没有办法直接回答的。实现上讲，并不是每一个服务都有必要引入如此复杂的架构，又是分布式，又是中间件的。

这个时候，我们发现核心还是在请求的结构上，这样的 POST 请求太不具体了，按之前无副作用的说法就是传入的值根本没有办法判断是不是相同。

## 幂等性 (Idempotence)

有幂等性的计算应该有条件： N 次变换的结果与 1 次变换的结果相同。

幂等函数是指，一次调用和多次调用应该产生相同的副作用。设计一个面向用户的系统的时候幂等性是很重要的概念，HTTP 则是幂等函数最适合的舞台。

## HTTP 协议

我们都知道，也都不止一次的被问道过 GET 和 POST 的区别是什么？区别之一就是 GET 请求不应该产生副作用，每一次我们调用同一个 GET 在没有更新的前提下返回的是同一份文件。比如说文章1， 文章2。

同样的，如果我们让其他的请求也指向一个具体的资源不就可以了吗?最容易混淆的是 POST 和 PUT 请求，有人说 PUT 用来更新资源，POST 用来创建资源，这是没有道理的，毕竟 POST 能干任何是，语义之外呢?默认行为上，PUT应该指向资源之一。

## 防治

具体一点的说，按照我们的例子，再不创建中间件的情况下，我们将用户创建文章的步骤增加一步，在用户创建文章的时候我们创建一个文章 ID，其中不含任何内容，自然也无法在用户的文章列表中出现，如果没有添加内容也应该在一定时间之后自动销毁。用户在获得这个 ID 之后用 PUT 请求在中间添加内容。

哈，这样一来无论他点击多少次，他都不会创建多篇文章，而是频繁的更新，这个时候判断内容是否相同还是不判断不就是我们的主场了吗~

Restful 的设计：

`POST https://domain.com/article/create` 返回 201 附带一个 ID

`PUT https://domain.com/article/{id-number}` 更新这篇文章
