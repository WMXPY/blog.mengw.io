---
layout: post
title:  "React Native Install"
categories: React Native
description: 安装RN的步骤和问题解决
---

本指南归纳了基本的React Native环境安装方法和常见问题

## 基础库

### windows

```bash
choco install python2
choco install adb
npm install -g react-native-cli
```

### linux (deb)

```bash
sudo apt-get install python2
sudo apt-get install adb
sudo npm install -g react-native-cli
```

### linux (centOS)

```bash
sudo yum install python2
sudo yum install adb
sudo npm install -g react-native-cli
```

## node 和镜像源设置

> 只有没有安装过node的机器才需要进行这一步

### windows

```bash
choco install nodejs.install
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

### linux (deb)

```bash
sudo apt-get install nodejs.install
sudo npm config set registry https://registry.npm.taobao.org --global
sudo npm config set disturl https://npm.taobao.org/dist --global
sudo npm install -g yarn
sudo yarn config set registry https://registry.npm.taobao.org --global
sudo yarn config set disturl https://npm.taobao.org/dist --global
```

### linux (centOS)

```bash
sudo yum install nodejs.install
sudo npm config set registry https://registry.npm.taobao.org --global
sudo npm config set disturl https://npm.taobao.org/dist --global
sudo npm install -g yarn
sudo yarn config set registry https://registry.npm.taobao.org --global
sudo yarn config set disturl https://npm.taobao.org/dist --global
```

### 开启Grandle Deamon

```bash
(if not exist "%USERPROFILE%/.gradle" mkdir "%USERPROFILE%/.gradle") && (echo org.gradle.daemon=true >> "%USERPROFILE%/.gradle/gradle.properties")
```

## 用Android Studio安装安卓SDK

### 安装时需要确保安装的组件

> SDK 和棉花糖的API 23是默认安装的

-   Performance (Index HAXM)
-   Android Virtual Device

### 安装后需要追加的组件

事实上在`Android Studio`编译运行时，所依赖的组件会自动安装，但是我们用RN最好手动将需要的组件安装好

-   SDK Platforms
    -   Android 6.0 (Marshmallow)
        -   Google APIS (在大多数情况下默认安装)
        -   Android SDK Platform 23
        -   Intel x86 Atom System Image
        -   Intel x86 Atom_64 System Image
        -   Google APIs Intel x86 Atom_64 System Image
-   SDK Tools
    -   Android SDK Build Tools
        -   Android SDK Build-Tools 23.0.1
        -   Android Support Repository

> 默认会安装`Build-Tools 23.0.3`等，如果不使用`React-Native`之外的其他版本可以卸载  
> 注意！！！ 几乎一定会有安装失败的包，观察错误信息重新安装即可

## windows 环境变量 (其他系统可以忽略)

-   将Android SDK的路径 (安装Android Studio时选择的) 指向`ANDROID_HOME`变量
-   将Android SDK/Tools的路径 (安装Android Studio时选择的) 添加到`PATH`变量

## 安装模拟器

任选其一，也可以用Android Studio自带的模拟器

-   Visual Studio Emulator for Android
-   Genymotion

## 测试项目

```bash
react-native init someProject
cd someProject
react-native run-android
```

## 查看应用在模拟器中的日志

```bash
adb logcat *:S ReactNative:V ReactNativeJS:V
```

## 在真机运行

### 确定设备已经链接

```bash
adb devices
```

> 同时包括模拟器在内，你应该只链接一个设备

### 尝试运行

```bash
react-native run-android
```

### 链接调试服务器

#### Android 5.0 (KitKat) 以上版本

用reverse命令可以直接用默认设置链接服务器

```bash
adb reverse tcp:8081 tcp:8081
```

不光是安卓版本，其他玄学问题也有可能导致连接失败，尝试摇晃手机`reload JS`来确定已经连接成功

#### Android 5.0 (KitKat) 以下版本

先获得调试机的局域网ip

```bash
ipconfig
```

获得ip和端口号之后，执行以下步骤

-   将设备连接到和调试机同wifi环境下
-   运行应用 (打开应用或者`react-native run-android`都可以)
-   摇晃设备 (打开开发者页面)
-   进入`Dev Settings`
-   点击`Debug server host for device`
-   输入我们之前获得的ip地址和端口号 (端口号一般是8081)
-   返回，或者摇晃设备 (打开开发者页面)
-   点击`Reload JS`

## 补充：这种init的工程如何直接放置在github上

```bash
echo "anything" >> README.md
git init
git add .
git remote add origin https://github.com/somewhere.git
git push -u origin master
```