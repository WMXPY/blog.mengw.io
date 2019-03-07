---
layout: post
title:  "Sonarqube Javascript"
categories: QA
description: 将 JS 项目放到 Sonarqube 上
---

## 缘起

Sonarqube 的文档也就那样，如果你的项目组以 Java 为主你必定深受其害，当你的项目组想让你把 JS 项目也放在 Sonarqube 上让他算 Code Smell (这个词听起来有点恶心不知道为啥) 的话那你肯定就感觉很无助，这不奇怪。这篇文章将会在你已经知道 Sonarqube 是什么，干什么用的，结合你在网上找到的基础博客帮你把你的 JS 项目，或者 TS 项目放到 Sonarqube 上。

## 背景

- Sonarqube 至少在 Java 之外的语言这块是不能自己运行测试的，也就是说我们要自己把测试在本地跑一遍然后把测试的覆盖文件和你的源码一起上传。
- Sonarqube 虽然主要服务一个语言，但是用普遍使用的 Docker 基础版本的镜像包含了很多语言的配置，不得不说虽然其他语言的配置比不上 Java 但是总比没有强。
- 唯一可以被其识别的测试覆盖文件是一种叫做 `lcov.info` 的文件，这个不太常见，我们普遍用其他服务的时候会导出 json 文件，这个我后面会说。
- 上传你的构建包是不需要密码的，这个很方便，不管是在本地还是 CI 上都不需要，只需要你的 Sonarqube 的地址，这可以说算得上是另一个要分内外网的理由了。

## 过程

当你将服务器配置好之后，就可以安装需要的配置了，JS 的配置还是略有一点繁琐的，所以用第三方的小包来上传你的构建结果还是很有帮助的。事实上，至少我找到的这些所谓第三方包其实就是简单的帮你运行 `sonar-scanner` 命令，和你自己配置也没有什么区别，但是总比没有强。在 Java 项目中那个控制台应用其实可以自己从 `maven` 中寻找信息，比如说版本号啊，比如说安装的依赖，测试的结果之类的，这些信息自己配置虽然没有任何难度，但是这也意味着你需要同时维护两份版本文件，这不合理。有些小朋友可能要问了：

> 那我自己从 `package.json` 文件里提取当前的版本号不就好了吗

讲道理，自己写脚本去里面拿版本号这种事。。可以说非常的重复造轮子了，实际上和我说的一样其实和你自己打开文件处理干的基本上是一模一样的活。

```sh
yarn add --dev sonarqube-scanner
```

这个是我发现的一个比较好用的，用其他的也没什么区别。使用方法很简单：

```ts
import * as Sonar from "sonarqube-scanner";

Sonar({
    options: {
        ...
    },
    serverUrl: 'https://sonarqube.dev.something.com/',
}, () => done());
```

上面的代码块可以说非常的顾名思义了，我们只说 `options` 里面需要写什么。

项目的所有信息，比如说 `title`, `description`, `version` 等等等， `package.json` 里面都写的清清楚楚，但是有一些是不符合 Java 语言习惯的我们要覆盖掉。首先是项目名，JS 项目大概是收到 npm 的影响，起名偏向 `@org/project` 这种的类型，而这些特殊符号显然是不合理的，请改成 `org-project` 的形式。

```ts
options: {
    ...other,
    'sonar.projectKey': 'org-project',
}
```

你需要代码的源文件来展示代码覆盖率的信息，当然，你也需要代码覆盖率的信息，需要注意的是，测试文件是不需要上传的， Sonarqube 并不会帮你运行测试，也不会帮你区分哪些是测试文件哪些不是测试文件。你需要上传的应该只有 `src` 文件夹下的所有文件和 `coverage/lcov.info` 文件两部分。 `lcov` 文件是很容易生成的，无论你是 `nyc`, `jest` 还是 `istanbul` 用户，你都可以在不安装任何新依赖的情况下生成对应的覆盖率文件，具体的方法请搜索。

```ts
options: {
    ...other,
    'sonar.inclusions': 'src/**,coverage/lcov.info',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
}
```

理论上说只要提供你想包含哪些文件就足够了，但是把不包含哪些文件放在配置项目里能是你的结构看起来更清晰，就像我们在 `tsconfig.json` 中做的一样。

```ts
options: {
    ...other,
    'sonar.exclusions': 'node_modules/**,dist/**,.cache/**,infrastructure/**',
}
```

欢迎使用 Sonarqube.
