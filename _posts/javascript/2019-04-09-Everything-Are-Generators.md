---
layout: post
title: "Everything Are Generators"
categories: JavaScript
description: 谁还不是个生成器了？
---

> 天地初开，一切皆为混沌，是为无极；阴阳交合，阴阳二气生成万物是为太极；清者上升为天，浊者下沉为地。  
> --易经

## 生成器

我之前有一篇介绍生成器的文章。[从百草园（数组拉平）到三味书屋（迭代器）](https://mengw.io/javascript/From-Flat-To-Generator) 介绍了使用生成器的 `yield` 和 `yield*` 的接管机制。实际上生成器更广泛的应用是编写异步函数。这篇文章我想着重记录一下生成器的协程机制，异步的生成器用法和 `async-await` 语法糖是如何用生成器实现的。

## 协程

生成器函数可以暂停执行和恢复执行的根本原因是因为协程。协程这个概念在 Go 中是一个核心 Feature，而在 Node 中，协程的实现更加面向对象。这被叫做无栈协程 (stackless coroutine) 这意味着显性的协程运行时上下文并不储存在栈上。

函数的递归操作无论如何都需要运行在栈上，但是它可以被隐藏在协程上下文 `this` 的依赖结构中。有栈协程用寄存器 (Register) 来索引局部的变量，访问上下文数据，也就是局部变量的时候可以通过变量名直接获得栈寄存器的位置和目标变量的偏移量。无栈协程通常来说就是所谓的 `this` 上下文，区别在于无栈协程的上下文变量是储存在一个索引的类中，而访问成员变量是从中获得成员变量已经索引好的地址。

无论是以上任何一种上下文通信方法，栈的生命周期都大于函数的生命周期，在函数返回之后模拟的寄存器会被销毁，而 `this` 甚至不需要销毁，它在承担朴素的函数上下文的同时也提供了对协程上下文的索引功能。

## 无限循环

试想一下，如果你想要一个生成器（本来就可以无限循环的）无限循环，你应该怎么做呢？

```ts
function* infiniteNumber(): IterableIterator<number> {
    let index: number = 0;
    while (1) {
        yield index++;
    }
}
const iterator: IterableIterator<number> = infiniteNumber();
while(1) {
    if (iterator.next().done) {
        break;
    }
}
```

虽然我们写了 `break` 的逻辑，但是显然，这永远都不会被执行，因为无论你执行几次 `next` 函数，永远都有返回值。

反而言之，我们可以用这种方法把一个生成器的内容全部取出。

## 能递归的时候当然要递归

`spawn` 函数用于递归的方式实现自动执行器，以在协程中执行 `Promise`。

```ts
const spawn = (genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

> 阮一峰

## Async Await 的实现

在用字哦发那个执行器实现了 `async` 之后， `await` 就比较简单了，等待 Promise 结束就可以了，这也就是 await 只能在 async 中使用的原因。

