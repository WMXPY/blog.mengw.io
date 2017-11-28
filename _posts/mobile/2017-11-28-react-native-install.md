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

