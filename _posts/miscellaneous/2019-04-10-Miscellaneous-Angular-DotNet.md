---
layout: post
title: "Miscellaneous Coding of Angular and DotNet"
categories: blog
description: 什么又能比得上 NG 和‘倒耐’呢
---

## 为 Angular, C# .Net 准备的面试问题

> 楼下一个男人病得要死，那间隔壁的一家唱着留声机，对面是弄孩子。楼上有两人狂笑；还有打牌声。河中的船上有女人哭着她死去的母亲。人类的悲欢并不相通，我只觉得他们吵闹。  
> --鲁迅

## .Net

## C#

### 如何使用 C# 中的多线程功能

```cs
class Program
    {
        static void Main(string[] args)
        {
            Thread t1 = new Thread(new ThreadStart(WithOut));
            Thread t2 = new Thread(new ParameterizedThreadStart(With));
            t1.IsBackground = true;
            t2.IsBackground = true;
            t1.Start();
            t2.Start("Hello");
            Console.ReadKey();
        }

        public static void WithOut()
        {
            // Run
        }

        public static void With(object data)
        {
            // Run with arg
            string str = data as string; // Hello
        }
    } 
```

### 什么是线程池

因为线程开启结束需要额外的开销，线程池可以简化这一步骤，一个被维护的线程池会在后台运行，对刚加入的任务进行排队。通过这种方式

