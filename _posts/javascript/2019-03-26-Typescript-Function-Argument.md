---
layout: post
title: "Typescript Function Argument"
categories: JavaScript
description: 这个标题你看不懂也很正常，我也写不懂
---

## 勾肥

事情的起因是 Bark Core 需要写一个中断钩子的功能，具体来说是那种类似 Event 的结构，消费者可以注册自己的函数在一个类里面。当软件运行到某些位置，我们会尝试查询目标函数 Key 是否已经被注册，然后尝试调用注册的函数。

对于 TS 我们自然要配置出最棒的类型系统啦。对于 TS 非常熟悉的小朋友，你一定首先想到的就是官方 `@types/node` 里面实现的一些关于 Event 的类型，对于 `on(key: string, func: **)` 类的函数，我们已经有一个很合理的方案了。这种方法在我们的情况下不太好用，我首先先详细介绍一下这个 on 的实现，然后再讨论我们的解决。

## On In Under In-front-of Behind

`.d.ts` 文件的源码既没必要放，也不好看。他基本上就是写很多的重载 (overload) 的 on 函数，就像 Java 一样。这种写法的扩展性难以恭维也不好看，我们不如根据一个实际的情况手写一些！

首先，我们的函数要做的事情我们是不在乎的，我们在乎的是类型。条件是这样的，有一个 Key Value 的对照表当 on 的第一个参数为 `T extend Key` 的时候，第二个参数应该是 `Value[T]`， 这个 Value 应该是带传入 Callback 的参数返回 Void 的函数。

```ts
enum KEYS {
    HELLO = "HELLO",
}
type VALUES {
    [KEYS.HELLO]: (a: string) => void;
};
```

虽然我可能没说明白，但是以上的代码应该还是很容易懂的。这其实也是 Bark Core 里面实际写的方法。如果我们要 on 函数实现的话只需要如下代码

```ts
class a {
    ...
    public on<T extends KEYS>(key: T, callback: VALUES[T]) {
        ...Add listener
    }
}
```

## 因势利导，火中取栗

基本上这些基于 Event 的实现都是用 JS 弄出来的，JS 实现加上 Types 信息其实还是蛮简单的。
