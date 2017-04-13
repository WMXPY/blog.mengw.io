---
layout: post
title:  "Closure and Private"
categories: JavaScript
description:  JavaScript 中的闭包和私有方法
---

# 闭包与私有

## JavaScipt 中的私有

讲道理 JavaScript 是一门面向对象的语言, 那么对象一定是需要这些东西的. 别的语言自然有这样的方法, 比如 C++ 的 public: 和 private: ,java 中的 private, protectd, fridenly 变量都是很好的例子, 对于 javascript 来说,我简单的研究了一下怎么搞这个. 但着这之前, 我也不知道 java 里 private 和普通的变量有啥区别, 所以我应该先研究一下我们为啥要这么做.

## 为啥要这么做

1.  良好的封装能够减少耦合。
2.  类内部的结构可以自由修改。
3.  可以对成员进行更精确的控制。
4.  隐藏信息，实现细节。

这是什么意思呢??? 意思就是在独立的项目中除了继承和 api 的控制之外, 没啥用. 但是在需要权限控制的时候就很有用了. 现在我们了解了这个的皮毛, 可以试着在 js 里实现一样的效果了.

## JavaScipt 的实现

```javascript
function Container(param) {
    this.member = param;
}
```

这样，如果我们构造一个新的对象

```javascript
var myContainer = new Container('abc');
```

那么myContainer.member 就会包含'abc'. 这样就很棒, 我们就用构造器的方式创建了一个对象, 同样的, js 其他的方式构建对象也有一样的效果.  
我们知道 js 使用 let 或者 var 声明变量的时候规定了其作用域. 基于这个特点, 我们可以通过这样的方法构建带有 private 变量的对象.

```javascript
function Container(param) {
    let member = param;
} 
var myContainer = new Container('abc');
```

但是这样的变量我们根本就无法在外部访问到, 所以要给它一个比较合理的访问方法. 比如返回一个访问的方法.

```javascript
function Container(param) {
    let member = param;
    return () => return member;
} 
var myContainer = new Container('abc');
```

或者声明一个全局变量来获取这个方法.

```javascript
function Container(param) {
    let member = param;
    get = () => return member;
} 
var myContainer = new Container('abc');
```

在严格模式中先在外部作用域声明 get 即可

```javascript
let get = null;
```

简单了解了一下皮毛受益匪浅, 但是感觉并没有什么卵用.
