---
layout: post
title: "Kotlin Iterator"
categories: Quote
description: 转载
---

作者：mrwangyong  
链接：https://www.kotlintc.com/articles/1636+&cd=31&hl=zh-CN&ct=clnk&gl=us  
来源：Kotlin 中国  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

发现网上教程有错误,而大家都是一股脑抄抄抄,没有一个人指出错误,估计实际敲下来的更少了!

kotlin中的for,while循环,可以迭代一切可以迭代的对象,

而可迭代的对象需要满足以下三点

有一个成员函数或者扩展函数 iterator()，它的返回类型为*Iterator(教程这里截然而至,难道都没看见少复制了几个字吗??)

iterator()需要返回一个Iterator对象,这里内部类直接实现即可

iterator继承类需要实现next()和hasNext()方法,

示例代码如下(将hello Kotlin逐个字符打印出来):

```java
   class CanForEach {
       var s = "hello Kotlin"
       var index = 0

       operator
       fun iterator(): Iterator<Char> {
           return Itr()
           //需要返回一个Iterator  而Iterator是接口,需要写实现类
       }

       private inner class Itr : Iterator<Char> {
           override fun hasNext(): Boolean {
               return index < s.length
           }

           override fun next(): Char {
               val c = s[index]
               index++
               return c
           }
       }
   }
```

测试代码:

```java
   fun whileMethod(array:CanForEach){
           val iterator=array.iterator()
           while (iterator.hasNext()){
               println(iterator.next())
           }
   }
```

当然.这只是一个实例,你可以改为泛型增加通用性!
