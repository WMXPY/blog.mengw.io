---
layout: post
title: "Typescript Function Argument"
categories: JavaScript
description: 这个标题你看不懂也很正常，我也写不懂
---

> 一流攻守群，道天地将法，智信仁勇严，顶情略七斗，风林山火海  
> --孙膑

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

基本上这些基于 Event 的实现都是用 JS 弄出来的，JS 实现加上 Types 信息其实还是蛮简单的。我们要的是代理调用，这个词是我瞎编的，意思大概是这样的。

```ts
class b {
    ...
    public call<T extends KEYS>(key: T, ...args: ...Argument of VALUE[T]){
        a.call(...args);
    }
}
```

你看到了吗，在我们需要从 b 类里面调用 a 类的时候，我们实际上是传入 `VALUE[T]` 的参数类型，然后把这些参数给 `a.call(...args)` 函数，这个时候，如同代码写的一样，我们需要 `Argument of VALUE[T]` 这样的类型。也就是说在 `[KEY.HELLO]: (a: string) => void` 这个类的 KV 组中，我们要把参数从中提取出来。

## 取出

在 Typescript 3.0 之后，这个语言支持一个叫做 `infer` 的特性，他可以当作一个类似占位符的东西，把你想要的参数位置提取出来，利用这个特性，我们可以实现这样一个泛类型。

```ts
export type FunctionArguments<T> = T extends (...args: infer U) => any ? U : never;
```

与之类似，如果我们把 `infer` 放到返回值的位置我们也可以获得参数的返回结果，就像这样：

```ts
export type FunctionReturn<T> = T extends (...args: any) => infer U ? U : never;
```

这是我尝试解决这个问题的时候用的第一个方法，效果其实还是蛮不错的，知道我发现了 TS 一个有可能是 Bug 有可能是实现限制的问题，（本文使用 TS 3.3.3333）。实际上 TS 实现 Infer 的泛类型是用 `|` 操作符实现的，比如说这样一个例子。

```ts
class a {
    ...
    public on<T extends KEYS>(key: T, callback: VALUES[T]) {
        ...Add listener
    }
}
class b {
    ...
    public call<T extends KEYS>(key: T, ...args: FunctionArguments<VALUES[T]>){
        a.call(...args);
    }
}
```

第一个问题，TS 并不会将 `FunctionArguments<VALUES[T]>` 当作一个数组，即使明显 `VALUES[T]` 的参数在任何情况下用类型表示都应该是一个数组。另外就是在 KEY VALUES 对有多种可能的时候，比如说这种情况：

```ts
type VALUES {
    [KEYS.HELLO]: (a: string) => void;
    [KEYS.WORLD]: () => void;
    [KEYS.SOMETHING]: (b: string, c: number) => void;
};
```

理论上 `FunctionArguments<VALUES[KEYS.WORLD]>` 的参数组应该是一个空的数组。但是实际上如我们所说，不管是任何一个 KEY 的结果都是 `[string] | [] | [string, number]` 这样这个就没办法用了。

## 插入

既然从内容里面取出不靠谱，我们可以考虑插入我们的类。这个方法证实是可以用的。首先我们需要改写类型参数：

```ts
type VALUES {
    [KEYS.HELLO]: [string];
    [KEYS.WORLD]: [];
    [KEYS.SOMETHING]: [string, number];
};
```

聪明的小朋友一看就知道这个玩意是怎么运作的了，实测这个确实是最好用的方法，但是坏处是我们就丢失了返回值信息。这个问题如果需要解决的话恐怕要么用多个 VALUE 定义，要么就要回到上面的取出方式了。

> 法无定法,式无定式。  
> 因时利导,兆于变化。  
> --孙膑