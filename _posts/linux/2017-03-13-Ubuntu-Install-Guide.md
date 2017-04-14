---
layout: post
title:  "Ubuntu Install Guide"
categories: Linux
description: 我大概记的 linux 安装的那些小套路, 主要是这些源太难找了好吧, 而且总会忘了操作其中一步, 我选择复制粘贴!!!
---

-   **_ForUbuntu_**

# Chrome

```bash
wget -q -O - <https://dl-ssl.google.com/linux/linux_signing_key.pub> | sudo apt-key add - 
sudo sh -c 'echo "deb [arch=amd64] <http://dl.google.com/linux/chrome/deb/> stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update 
sudo apt-get install google-chrome-stable
```

# VSCode -> based on ummake

```bash
sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
sudo apt-get update
sudo apt-get install ubuntu-make
umake web visual-studio-code
```

# UMake

```bash
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

# NodeJS

```bash
curl -sL <https://deb.nodesource.com/setup_6.x> | sudo -E bash -
sudo apt-get install -y nodejs
```

# Git

```bash
apt-get install git
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

# Python

```bash
sudo apt-get install python-pip
```
