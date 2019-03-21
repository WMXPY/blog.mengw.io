---
layout: post
title: "Electron Pit"
categories: JavaScript
description: UpgradeE 的坑
---

# UpgradeE 的坑

## Electron 的坑

-   用remote调用主进程的全局变量的时候不能传递自己建的对象， 如果强行传递的话会失去私有变量量的限制，然而所有prototype的方法都会丢失。
-   调整icon的时候不能用系统推荐的NativeImage对象，也不能直接用路径，需要用Path对象建立。
-   Menu里如果没有复制粘贴功能就会有的时候迷之失去复制粘贴的功能。
-   Mac端中，Menu的第一个母菜单会被强制命名。
-   打包的时候, windows 的 icon 文件要求至少256\*256大小, 而且不能硬转换, 简单的方法是用 windows 的画图.
-   Mac 只能打包 dmg,win 只能打包 msi 和 exe.
-   Electron 关闭时不会自动关闭其Node进程，可以将打开的pid保存下来日后手动关闭。

```javascript
var platform = process.platform;
function killTask() {
  try {
    if (platform === 'win32') {
      for (let pid of pids) {
        childProcess.exec('taskkill /pid ' + pid + ' /T /F');
      }
      pids = [];
    } else {
      for (let pid of pids) {
        process.kill(processServices.pid);
      }
      pids = [];
    }
  } catch (e) {
    showInfo('pid not found');
  }
  domLog.innerHTML = "";
  showInfo("服务已停止!");
  clearInterval(timerId);
  }
```

## Node 的坑

-   Typescript 中如果想使用 require 这类的node 方法,或者库里面的方法,直接调用编译时报错, 解决方案如下, 有事没事 declare 一下, 贼爽!

```typescript
declare function require(name: string);
declare var Vue: any;
```

-   箭头函数有时可以用 this, 有时不可以, 其实我到现在都不知道。（2017-12-27 修改）

原来的我实在是太傻吊了

`this` 的使用方法其实是 `Function` 对象在创建的时候自动调用了 `Function.call(<this's position>)`，其实在写 `function X` 的时候我们自动将 `this` 指向当前的运行环境，比如说某一个class或者整个全局。在使用箭头函数的时候，`this` 的位置和当前的运行环境相同，比如。

```js
function a() {
  this.d = 1;
  function b(){
    this.f = 2;
    function c(){
      this.g = 3;
    }
  }
}
```

比如说在当前情况下，函数 `c` 的 `this` 状况就是 `b` 的位置。也就是说其实这段代码可以改写成：

```js
function a() {
  this.d = 1;
  function b(){
    this.f = 2;
    function c(){
      b.g = 3;
    }
  }
}
```

与这个不同的是如果 `c` 是一个箭头函数：

```js
function a() {
  this.d = 1;
  function b(){
    this.f = 2;
    let c = ()=>{
      this.g = 3;
    }
  }
}
```

函数 `c` 的 `this` 和 `b` 的 `this` 指向的位置是一样的，那么其实我们的 `this.g = 3;` 改变的是函数 `a` 的 `g` 键值。

-   typescript 不能用 object.object 的方法直接对一个不存在的key 赋值, 但是可以用object[object] 强行用 string 给值。

## Vue 的坑

-   在组建中执行回调函数必须要用括号函数, 否则 this 的位置会很差

## API 的坑

-   lol 的 api 有的时候会错误返回404
-   当前游戏的 api 有时时间是错误的, 返回之后先检查时间然后再使用, 如果时间不对的话就用当前的游戏时间
