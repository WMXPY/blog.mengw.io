---
layout: post
title:  "Learning Swift"
categories: Swift
description: Swift 真的太迷了， 迷你懂吗，迷
---

## 回调函数

下面这段代码是我摸索回调函数用法的过程写的，坑位如下

- 单一的constructor要带括号
- 调用方法中，没有构建变量名，回调方法中有构建变量名

```swift
//: Playground - noun: a place where people can play

import UIKit

func applica(f: ((String) ->String), str: String)-> String {
    f(str)
    return "PVV"
    // output PVV
}

applica(f: {(str: String)->(String) in
    print(str)
    return str
    // printed abc
}, str: "abc")
```
