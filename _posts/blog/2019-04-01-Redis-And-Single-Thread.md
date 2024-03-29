---
layout: post
title: "Redis and Single Thread"
categories: blog
description: Redis 储存结构和单线程
---

> 大自然把人们困在黑暗之中，迫使人们永远向往光明  
> --歌德

## 茴香的茴字有四种写法

我们都知道，Redis 的储存结构包括 `String`, `List`, `Set`, `Sorted Set` 和 `Hash` 相信对于任何人来说这几种数据结构都再熟悉不过了。他们共同的特点就是除了 `Sorted Set`（也被称为 `ZSet`）之外其他的所有结构的插入，搜索，读取的速度都是 O(1)，而 ZSet 的读取也是 O(1) 这给了 Redis 再其他方面踏实的优化空间来增加速度。

最知名的特点就在于纯内存模式，再没有启用持久化储存模式的 Redis 是一个纯内存缓存数据库，这给 Redis 剩下了大量的 IO 操作时间和复杂度来专注优化数据结构的速度。

## 量级和单线程

一个单连接数量的 Redis 实例可以跑出十万 QPS 的好成绩，我们甚至不需要关心测试机的性能，因为本身的瓶颈根本就不在电脑本身上，内存和 CPU 的速度比需要的都要快，而网络的请求限制才是限制量级的关键，在大量的连接需要同时处理的时候其他硬件的性能才稍受影响，比如说在 40000 个独立连接的时候 Redis 的 QPS 会降低到六万左右。

这个速度是足够快也足够稳定的，对于单个 Redis 实例来说大部分的情况都不足以触碰到这样一个性能瓶颈之中。

Redis 使用的解决网络问题的方式之一是实现了自己的 VM 机制，用于处理当内存已经被完全占用时的情况，和一般的数据库不同，Redis 会更倾向于把全部的冷数据放入硬盘而保留全部的 Key 值来加快冷数据的缓存能力。Redis 也实现了自己独立的网络协议，这种协议和普通的客户端对客户端的协议不同，更强调速度而不是调用系统函数。总之，没有和 CPU 有关的。

讨论到这里，其实这篇文章写出来我一开始是拒绝的，因为并没有什么可写的，你自己跑一个 Redis 的数据库就知道了， CPU 根本就不会跑满网络就已经忙于解决请求排队的问题了。这多线程有什么意义吗，不但无法减小本身就没有压力的 CPU 压力，反而要处理加锁解锁这样的额外消耗降低效率。

## 多路 IO 复用模型

这是一个 Redis 值得说清楚的点。多路 IO 复用模型指利用 Event Loop 的技术来同时检查多个 IO 流时间的能力，Redis 会优先处理轮询所有流的任务，并且一次处理就绪的流，这样的做好有效避免了无用操作。多路指的是多个网络连接，复用指的是使用同一个线程。总体来说这项技术时用来处理多个连接请求的时候尽量减少网络的 IO 时间消耗的方式。在其他的硬件不成为瓶颈的时候这样的操作能有效的增加 Redis 处理网络这个瓶颈操作的效率。

## 单线程不是说就只有一个线程

NodeJS 是单线程的，但是我们不可能在双核服务器跑一个单线程的 NodeJS 服务。它是单线程的不假，但是你用起来肯定不是那么用的。

即使你只打开了一个 Redis 服务，它也会把 IO 的处理包括网络和硬盘 IO 的处理分给它自己创建的子线程。同时我们也可以配置 Redis 使其开启一些子线程形成 `Master-Slave` 的结构将一部分的耗时读取搜索之类的操作交给子线程处理。即使是本身单线程的应用我们也可以通过配置自己均衡自己的 CPU 核心使用。因为我们比操作系统的负载均衡更了解我们的应用。
