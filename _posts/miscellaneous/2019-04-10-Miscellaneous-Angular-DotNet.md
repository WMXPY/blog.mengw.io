---
layout: post
title: "Miscellaneous Coding of Angular and DotNet"
categories: blog
description: 什么又能比得上 NG 和 ‘倒耐’ 呢
---

## 为 Angular, C# .Net 准备的面试问题

> 楼下一个男人病得要死，那间隔壁的一家唱着留声机，对面是弄孩子。楼上有两人狂笑；还有打牌声。河中的船上有女人哭着她死去的母亲。人类的悲欢并不相通，我只觉得他们吵闹。  
> --鲁迅

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

扩展：什么是 Sleep，什么是 Wait，有什么区别？

- Sleep 是基于时间的，不需要其他线程唤醒，而是暂时睡眠，可以放在任何位置。
  - 在 Sleep 的时候，线程不会放弃对对象的使用权或者释放锁，所以在同步方法或同步块中使用sleep，一个线程访问时，其他的线程也是无法访问的。
- Wait 它是使当前线程暂时放弃对象的使用权进行等待，必须放在同步方法或同步块里。
  - Wait 会释放锁，并放弃对象使用权。
  - 唤醒方式：`Monitor.Pulse()` 或者 `Monitor.PulseAll()`

### 什么是线程池

因为线程开启结束需要额外的开销，线程池可以简化这一步骤，一个被维护的线程池会在后台运行，对刚加入的任务进行排队。线程执行完不会被立即销毁，通过这种方式我们既可以在后台执行任务，又可以免除线程创建和销毁所带来的开销。

```cs
class Program
    {
        static void Main(string[] args)
        {
            ThreadPool.QueueUserWorkItem(TestMethod, "Hello");
            Console.ReadKey();
        }

        public static void TestMethod(object data)
        {
            string str = data as string;
            Console.WriteLine(str);
        }
    }
```

## .Net



## TypeScript

### 如何编写 OverLoad 函数的类型文件

就和 Java 的重写方法一样，直接声明多个一样的函数，带有不同的变量。

### 如何写自我循环的 TypeScript Nested 类型

用外部的泛型声明好，就是用T来代替本身。然后实现泛型。

扩展：自我循环的类型为什么不能编写

TypeScript 的编译器会先编译每一个类型然后再处理调用，无限循环的类型是不能直接写的。但是如果泛型已经先编译好，就可以实现了。

### 如何声明下面的函数来检测出错误

```ts
const func = (obj, key) => {
    return obj[key].toString();
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a"); // OK
getProperty(x, "m"); // Error
```

## Angular2

### Angular 应用的生命周期都有什么

适用于组件 (component) 和指令 (directive) 的生命周期：

- ngOnChanges：当 Angular 设置其接收当前和上一个对象值的数据绑定属性时响应。
- ngOnInit：在第一个 ngOnChange 触发器之后，初始化组件/指令。这是最常用的方法，用于从后端服务检索模板的数据。
- ngDoCheck：检测并在 Angular 上下文发生变化时执行。每次更改检测运行时，会被调用。
- ngOnDestroy：在 Angular 销毁指令/组件之前清除。取消订阅可观察的对象并脱离事件处理程序，以避免内存泄漏。

适用于指令的生命周期：

- ngAfterContentInit：组件内容已初始化完成
- ngAfterContentChecked：在 Angular 检查投影到其视图中的绑定的外部内容之后。
- ngAfterViewInit：Angular 创建组件的视图后。
- ngAfterViewChecked：在 Angular 检查组件视图的绑定之后。

扩展：一个组件的生命周期调用顺序是什么？

`ngOnChanges` > `ngOnInit` > `ngDoCheck` > `ngAfterContentInit` > `ngAfterContentChecked` > `ngAfterViewInit` > `ngAfterViewChecked` > `ngOnDestroy`

### Angular 的依赖注入怎么使用

- 把服务标记为 @Injectable()
- 把组件标记为 @Component

扩展：依赖注入有什么好处

依赖注入的本质是控制反转 (Inversion of control, IoC) 原则。使用依赖注入之后应用的接口会实现松耦合，在接口不变的前提下，我们可以任意替换组件的具体实现。

扩展：注册 Provider 的时候 UseClass 和 UseExisting 有什么区别

UseExisting 会使用单一实例。

### Angular 是怎么更新子组件的

自上而下更新，当其中一个组件发生变化的时候所有的子组件都会被依次检查，这是 Default 模式的检查。

扩展：Angular 的默认更新模式是什么

Default

扩展：还有什么更新模式，如果切换更新模式

OnPush 区别是当 OnPush 的输入没有变化的时候，所有子组件的检查都会被跳过。

`changeDetection: ChangeDetectionStrategy.OnPush`

扩展：如何 `detach` 组件，如何回到检查队列中

```ts
constructor(private ref: ChangeDetectorRef) {
    ref. ...
}
```

扩展：用这样的模式如何实现频繁变化需要手动触发更新的组件。

```ts
ref.detach();
...do
ref.reattach();
```
