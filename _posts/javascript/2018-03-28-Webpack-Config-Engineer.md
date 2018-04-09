---
layout: post
title:  "Webpack Config Engineer"
categories: JavaScript
description: 简直就是 Webpack 配置工程师
---

## 概览

Webpack 的配置真是处处是坑, 这里我用在 ghoti-cli 中配置完全静态页面的经历总结几个坑, 以儆效尤.

## 什么是 ghoti-cli

Ghoti-cli 是一个非玩具的项目管理命令行工具, 有很多很有趣的功能, 我觉得最有价值的就是自带的十来个快读启动模板和进度管理了. 我目前觉得最迷的配置可以在纯静态 React 项目的配置里全说出来. 

## 什么是纯静态 React

这个纯静态的套路是这样的, 先在正常的 React dev 项目里写, 支持热刷新, router 之类的标准功能, 写完之后用那套服务端渲染的东西直接将渲染出的字符串保存在缓冲区中, 并用 express 建立服务器, 在访问的时候将缓冲区的字符串返回就可以了. 因为服务器用 webpack 打包了, 所以并不能热更新源文件, 我觉得这没有关系, 因为首先这个需求不是不能实现, 其次我们的服务器实现了多线程监听, 其实即使不能更新源码自动刷新, 也可以多服务器分别重启已达到不影响使用的效果.

## 坑

### 热更新的入口配置

这是在这个模板里的 `webpack.dev.js` 的入口配置, 前两个和最后一个都比较好理解, 第三个字面意义上来看是在开发服务器中接受热更新作为入口, 所以我就觉得既然这个配置文件只在开发服务器中运行, 为什么不删掉第三行呢. 

```js
entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    APP_DIR + "/index.dev.tsx"
],
```

阅读源码之后其实这才是真正让程序支援热更新的关键配置, 第一个入口其实是在非组件更新而是页面更新的时候整体刷新的入口. 

总之这个 React 热更新的入口配置就保持这样就可以了, 没什么可提升的.

### 打包为 Node 时的图片文件打包

打包图片是 webpack 的一个重要功能, 一般使用的时候就是打包一些 logo 之类的, 能省一次 http 请求. 比如如下的配置:

```js
{
    test: /\.(jpg|png|gif|webp)$/,
    loader: 'url-loader?limit=8192'
}
```

用这样一个 rule 我们就可以直接用 require 语法引入图片了, 这个 limit 的单位是 `byte` 也就是说在这个 loader 的配置下我们会被转为 base64 的图片上限是 `8kb`. 所有图片大于这个值的都会被复制到目标目录下并且将文件名自动转成 hash 然后将 require 部分的目标改为向对应 hash 的地址请求获得.

之所以这个值得一提是因为大部分时候我们用这个 loader 而不是直接自己放置一个可以请求的图床地址的原因都是因为我们要复用这张图片, 所以才需要减少请求的数量. 一个典型的用例就是将一张图片当做按钮或者 logo 的时候, 所以为了避免最终还是要被请求, 图片的大小和 limit 的设置一定要讲究一些.

### css 和 js 分离输出

在纯字符串的服务器返回中, 我们尽量不带任何 js 代码, 虽然 ghoti-cli 仅仅提供了一种外置无依赖的 js 代码运行方法, 就可以几乎实现任何本来在 react 中就可以实现的无互动效果, 但是 css 的文件还是不要直接插入 html 的 style 标签比较好.

我用了这个插件的配置来分离 css 和 js 文件:

```js
{
    test: /\.sass$/,
    use: ExtractTextWebpackPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
}
```

这个我分两部分说, 首先是这个分离输出, 在这个插件的文档里他说这个 extract 方法接受无限多的参数, 这些参数就像之前作为 array 传入 use 一样的效果从右到左的依次让目标代码穿过对应的 loader. 实际上不是这样的, 而是必须要用这种老道的方法.

### 坑啊

接着上面这个魔法语句 `css-loader?sourceMap!sass-loader?sourceMap`, 有的小朋友要发言了, 说这个有什么魔法的呀? 重点在于首先我们要直接写问号叹号串的时候可能会考虑到这样写:

```js
`css-loader!post-css!sass-loader`
```

这样就炸了, 首先 post-css 不能在这个插件中运行, 而且重点来了 sourceMap 是绝对不能省略的, 因为这个插件要依赖图的分析来讲 css 正确输出, 所以就照抄我的这个配置就可以了.

对了, 别忘了在插件列表里传入新的事例如下:

```js
plugins: [
    new ExtractTextWebpackPlugin("bundle.css"),
    // 你也可以用 webpack 的通配符命名方法
    new ExtractTextWebpackPlugin("[name].[hash].css"),
]
```

### css 不要插入

就是个小坑, 非这种在 node 环境中的静态渲染, webpack 基本都是这样配置的:

```js
{
    test: /\.sass$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
},
```

这样其实 style-loader 会将 css 代码插入 react 的 className 中, 以实现只有 js 文件的效果, 我们用上述插件的同时显然应该去掉 style-loader.