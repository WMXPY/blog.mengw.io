---
layout: post
title:  "Ubuntu Install Guide"
categories: Linux
description: 我大概记的 linux 安装的那些小套路, 主要是这些源太难找了好吧, 而且总会忘了操作其中一步, 我选择复制粘贴!!!
---

-   **_ForUbuntu_**
# Steam

Since most of these answers are outdated... Here is modern way to install the nvidia drivers for Ubuntu (for 14.04 and newer):

Add the graphics-drivers ppa
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
```
Install the recommended driver
```
sudo ubuntu-drivers autoinstall
```
Restart your system
```
sudo reboot
```
To select a different driver, or if the above doesn't work:

Add the graphics-drivers ppa
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
Purge any existing nvidia related packages you have installed
sudo apt-get purge nvidia*
Check which drivers are available for your system
ubuntu-drivers devices
Install the recommended driver
sudo apt-get install nvidia-361
Restart your system
sudo reboot

# Chrome

在乌班图中安装Chrome

```bash
wget -q -O - <https://dl-ssl.google.com/linux/linux_signing_key.pub> | sudo apt-key add - 
sudo sh -c 'echo "deb [arch=amd64] <http://dl.google.com/linux/chrome/deb/> stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update 
sudo apt-get install google-chrome-stable
```

# UMake

在乌班图中安装Umake

```bash
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

# VSCode -> based on ummake

在乌班图中安装VSC

```bash
sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
sudo apt-get update
sudo apt-get install ubuntu-make
umake web visual-studio-code
```

# NodeJS

在乌班图中安装Node

```bash
curl -sL <https://deb.nodesource.com/setup_6.x> | sudo -E bash -
sudo apt-get install -y nodejs
```

# Git

在乌班图中安装Git

```bash
apt-get install git
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

# Python

在乌班图中安装python

```bash
sudo apt-get install python-pip
```
