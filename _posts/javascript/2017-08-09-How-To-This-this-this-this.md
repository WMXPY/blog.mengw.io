---
layout: post
title:  "How to this.this.this.this"
categories: JavaScript
description: 这么多 this 怎么一路追溯下去呢
---

这是一个我在写caperjs重构的时候遇到的问题  
情况是这样的

```js
    let a = {
        b: 1,
        c: {
            d: function () {
                return this;
            },
            e: function () {
                console.log(b);
            }
        }
    }
```

这样一段代码, 如果想要 a.b.d().e() 可以返回 b 的值的话我们就成功了, 但是 d 的 this 是 c 而 c 和 b 是同级的, 如果想要用 X.b 的方法获得 b 的值我们就需要定位到 a 这个大变量. 