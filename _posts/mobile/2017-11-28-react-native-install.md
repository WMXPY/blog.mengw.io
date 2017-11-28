---
layout: post
title:  "React Native Install"
categories: React Native
description: 安装RN的步骤和问题解决
---

## 基础库

### windows

```bash
choco install python2
npm install -g react-native-cli
```

### linux

```bash
sudo apt-get install python2
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

### linux

```bash
sudo apt-get install nodejs.install
sudo npm config set registry https://registry.npm.taobao.org --global
sudo npm config set disturl https://npm.taobao.org/dist --global
sudo npm install -g yarn
sudo yarn config set registry https://registry.npm.taobao.org --global
sudo yarn config set disturl https://npm.taobao.org/dist --global
```

## 用Android Studio安装安卓SDK

### 安装时需要确保安装的组件

> SDK 和棉花糖的API 23是默认安装的

- Performance (Index HAXM)
- Android Virtual Device

### 安装后需要追加的组件

事实上在Android Studio编译运行时，所依赖的组件会自动安装，但是我们用RN最好手动将需要的组件安装好

- SDK platforms
    - Android 6.0 (Marshmallow)
        - Google APIS (在大多数情况下默认安装)
        - Android SDK Platform 23
        - Intel x86 Atom System Image
        - Intel x86 Atom_64 System Image
        - Google APIs Intel x86 Atom_64 System Image
- 