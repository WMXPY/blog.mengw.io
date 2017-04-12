---
layout: post
title:  "ES6 Learning Note"
categories: JavaScript
description: ES6 的学习笔记, 这一篇主要是 let 和 const
---

# WMXPY 的 ES6学习笔记

### Let 和 Const

-   这篇笔记是参考阮老师的 ES6 入门写的,仅供自己学习参考, 有几处代码块, 还有大概的思路如果雷同的话倒是也蛮合理的

* * *

##### 概览

和 Var 不同的是, let 作用域仅在它所在的代码块,比如说一个 forloop

    for(let i=0;i<1;i++){}

用这种方法可以使代码变量更加合理,比如说在以上的循环中,如果使用 var, 在外部调用 i 也可以返回最后一个 forloop 中 i 的位置. 

* * *

##### 作用域

在 for 中,循环语句和内容是两个不同的作用域,比如说以下的代码

    for (let i = 0; i < 3; i++) {
      let i = 'abc';
      console.log(i);
    }

输出是3次 abc, 这意味着 i 被重新定义了  

* * *

##### 变量提升

let 是不存在变量提升的,声明var 变量的时候,有时(因为我自己测试的时候感觉很迷)会出现变量提升,就是说在开始执行代码的时候,在实际声明变量之前,其就已经存在了但是没有值,声明变量的时候是在给一个 undefined 的变量赋值! 真的迷,但是到时挺好用的

    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;

    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;

这是一个变量提升的例子, 在 var 中,明明还没有声明 foo, 但是却有一个叫做 foo 的 undefined 变量莫名其妙的可以调用

* * *

##### temporal dead zone(TDZ) 迷

暂时性死区

    var tmp = 123;

    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }

代码说明一切,在实际声明 tmp 之前,tmp 变量都是不可用的,直到声明它

    var tmp = 123;

    if (true) {
      tmp = 'abc'; // good
    }

 如果不在作用域声明 let tmp 就可以正常使用

* * *
