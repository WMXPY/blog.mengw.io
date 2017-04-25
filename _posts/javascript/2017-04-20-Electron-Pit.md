---
layout: post
title:  "Electron Pit"
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

-   箭头函数有时可以用 this, 有时不可以, 其实我到现在都不知道。
-   typescript 不能用 object.object 的方法直接对一个不存在的key 赋值, 但是可以用object[object] 强行用 string 给值。

## API 的坑

-   lol 的 api 有的时候会错误返回404
-   当前游戏的 api 有时时间是错误的, 返回之后先检查时间然后再使用, 如果时间不对的话就用当前的游戏时间
