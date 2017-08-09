---
layout: post
title:  "How to this.this.this.this"
categories: JavaScript
description: 这么多 this 怎么一路追溯下去呢
---

# 问题

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

这样一段代码, 如果想要 a.c.d().e() 可以返回 b 的值的话我们就成功了, 但是 d 的 this 是 c 而 c 和 b 是同级的, 如果想要用 X.b 的方法获得 b 的值我们就需要定位到 a 这个大变量. 如果 this 方法可以无限叠加的话显然, 解决方案就是在 this 到 c 之后再 this 一次定位到 a, 然后 .b 也就是 this.this.b 就可以在方法 e 中取得 b 的值了.

这样问题就来了 this.this 在 js 中看起来和 swift 中可以用的 self.self 差不多, 但是实际上 this.this 作用是 this['this'] 这样就很不可理喻了, 因为显然在 c 中是没有 'this' 这样一个元素的.

# 解决

方法很简单, 将 c 写为一个函数, 然后在 c 中用一个变量获取到 this, 然后在子方法中使用这个变量就可以了.

```js
    let a = {
        b: 1,
        c: function () {
            let that = this;
            return {
                d: function () {
                    return this;
                },
                e: function () {
                    console.log(b);
                }
            }
        }
    }
```

这样问题又来了, 我们之前说道

>  如果想要 a.c.d().e() 可以返回 b 的值的话我们就成功了

但是这样看来我的调用就变成了 a.c().d().e() 不符合题意啊 :( 这个怎么办有空再填坑吧

多谢.