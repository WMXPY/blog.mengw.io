---
layout: post
title:  "Learning Swift"
categories: Swift
description: Swift 真的太迷了， 迷你懂吗，迷
---

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
