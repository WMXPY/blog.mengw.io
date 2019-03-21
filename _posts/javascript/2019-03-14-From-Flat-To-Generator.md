---
layout: post
title: "From Flat To Generator"
categories: JavaScript
description: 从百草园（数组拉平）到三味书屋（迭代器）
---

## <del>百草园</del> 数组拉平

忘记了是 es7 还是 es8 来着，很快 `Array.prototype.flat` 就可以用了，这个函数并不是什么底层新技术，只是规范上自动提供实现。所谓数组拉平的故事是这样的：有一个数组包含元素 `T` 或者 `T[]`，`T` 是可以嵌套的，这个说不明白，如下。

```ts
type SomeArray<T> = Array<T | SomeArray<T>>;
```

> 这个类型会报错，因为 ts 不允许循环嵌套自身

要做的就是把内容铺平整，变成朴素的 `T[]` 形式。

## 递归

最简单实用的实现就是递归了，给一个简单的 ts 实现的例子

```ts
const flat = <T>(arr: SomeArray<T>): T[] => {
    return arr.reduce((previous: T[], current: T | SomeArray<T>) => {
        if(!Array.isArray(current)){
            return previous.concat(current);
        }
        return previous.concat(flat(current));
    }, [] as T[]);
}
```

> 这段代码使用了错误的类型，`SomeArray` 不是一个合法的类型，只是用于说明，但是逻辑是可以运行的。

并没有花哨的嵌套，逻辑非常简单清楚，如果当前元素是一个数组，就递归自身，反之直接作为元素使用。我们在这个例子中使用了 `Array.prototype.reduce` 和 `Array.prototype.concat` 嵌套的方法解决问题，这样的形式可以引导到我们下一步想讨论的问题，迭代。

## 可迭代的

ts 或者说 es 中的数组类型是 `可迭代的`, `Iterable<T>` 类型的继承类，这牵扯到一个叫做可迭代协议的概念，见 [迭代协议](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)。一个实现了迭代协议的值，可以使用 `for...of` 或者 `[...something]` 的方法解构。迭代协议实现了一个 `next()` 函数，它返回一个包含 `done` 和 `value` 两个值的对象。

这样的说法实际上和我们需要解决的数组拉平问题是很契合的，只需要让 `next()` 函数遇到 `T[]` 类型的元素的时候递归进入子元素就可以实现我们的需求了。

根据文档中例子：

```js
var myIterator = {
    next: function() {
        // ...
    },
    [Symbol.iterator]: function() { return this }
}
```

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

我们可以尝试用迭代器实现一个数组拉平函数，以下是一个简单的 js 语言实现。

```js
const flat = (arr) => {
    const rest = [...arr]; // clone
    const iterator = {
        [Symbol.iterator]: () => ({
            next: () => {
                if (rest.length === 0) {
                    return { done: true };
                }
                const current = rest.shift();
                if (Array.isArray(current)){
                    rest.unshift(...current);
                } else {
                    rest.unshift(current);
                }
                return { value: rest.shift(), done: false };
            },
        }),
    };
    return [...iterator];
}
```

以上的丑陋代码是迭代器版本的 js 实现，ts 不允许这样写，强行要求使用 `class extend iterator<T>` 形式，那样就没意思了。我们可以看出迭代器版本的数组展平函数更实际，更贴近于展平二字的含义，但是写起来不得劲，好消息是我们有一个无敌的方式，`生成器`！

## 生成器

生成器的语法是 `function*` 见 [生成器](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)。使用 `yield` 关键词，我们可以写出了一个无限制增加输出结果的例子：

```ts
function* infiniteNumber(): IterableIterator<number> {
    let index: number = 0;
    while (1) {
        yield index++;
    }
}
const iterator: IterableIterator<number> = infiniteNumber();
```

可以理解为，当函数调用的时候函数运行到 `yield` 的时候暂停了，暂停到下一次 `next()` 后继续运行，直到函数运行结束，返回 `done: true`。

## 递归？

另一个关键词 `yield*` 的作用是把当前生成器的以下几次 `next()` 交给另一个生成器负责。上文给了一个小例子：

```js
function* gen() {
    yield* ['a', 'b', 'c'];
}
```

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

这意味着当运行到 `yield*` 关键词的时候下三次迭代都是由数组迭代器负责的。我们利用这个方式就可以在生成器中写出类似递归的效果。

## 三味书屋

其实和递归也没有什么区别。重点是不要忘记调用的时候解构就可以了，需要注意的是，解构生成器的时候如果不注意很容易出现无限循环的情况，最好克隆一份数组然后在闭包的情况下访问。

```ts
function* flat<T>(arr: Array<T | T[]>): IterableIterator<T> {
    const rest: Array<T | T[]> = [...arr]; // clone
    while (rest.length > 0) {
        const current: T | T[] = rest.shift();
        if (Array.isArray(current)) {
            yield* flat(current);
        } else {
            yield current;
        }
    }
}
console.log([...flat([1, [2, [4, 5]], 3])]);
```

总之你应该可以用生成器写出很棒的程序了！试着封装一下把。
