---
layout: post
title:  "Ubuntu Install Guide"
categories: Linux
description: 我大概记的 linux 安装的那些小套路, 主要是这些源太难找了好吧, 而且总会忘了操作其中一步, 我选择复制粘贴!!!
---

-   **_ForUbuntu_**

## Increate swap file for low memory mechine

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl vm.vfs_cache_pressure=50
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
```

## Theme

```bash
sudo add-apt-repository ppa:noobslab/themes
sudo apt-get update
sudo apt-get install flatabulous-theme
sudo add-apt-repository ppa:noobslab/icons
sudo apt-get update
sudo apt-get install ultra-flat-icons
```

## digitalocean

```bash
curl -sSL https://agent.digitalocean.com/install.sh | sh
```

## Steam

Since most of these answers are outdated... Here is modern way to install the nvidia drivers for Ubuntu (for 14.04 and newer):

Add the graphics-drivers ppa

    sudo add-apt-repository ppa:graphics-drivers/ppa
    sudo apt-get update

Install the recommended driver

    sudo ubuntu-drivers autoinstall

Restart your system

    sudo reboot

To select a different driver, or if the above doesn't work:

Add the graphics-drivers ppa

    sudo add-apt-repository ppa:graphics-drivers/ppa
    sudo apt-get update

Purge any existing nvidia related packages you have installed

    sudo apt-get purge nvidia\*

Check which drivers are available for your system

    ubuntu-drivers devices

Install the recommended driver

    sudo apt-get install nvidia-361

Restart your system

    sudo reboot

## Chrome

在乌班图中安装Chrome

```bash
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update 
sudo apt-get install google-chrome-stable
```
## Ubuntu Tweak

```bash
wget -q -O - http://archive.getdeb.net/getdeb-archive.key | sudo apt-key add -
sudo sh -c 'echo "deb http://archive.getdeb.net/ubuntu xenial-getdeb apps" >> /etc/apt/sources.list.d/getdeb.list'
sudo apt-get update
sudo apt-get install ubuntu-tweak
```

## UMake

在乌班图中安装Umake

```bash
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

## VSCode -> based on ummake

在乌班图中安装VSC

```bash
sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
sudo apt-get update
sudo apt-get install ubuntu-make
umake web visual-studio-code
```

## VSCode -> based on apt

Visual Studio Code enabled official Linux repositories on February 2017 (v1.10)

```bash
sudo add-apt-repository -y "deb https://packages.microsoft.com/repos/vscode stable main"
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EB3E94ADBE1229CF
sudo apt update
sudo apt -y install code
```

You can upgrade / dist-upgrade as usual

```bash
sudo apt -y upgrade
sudo apt -y dist-upgrade
```

## Font

```bash
sudo mkdir -p /usr/share/fonts/consolas
sudo cp YaHei.Consolas.1.12.ttf /usr/share/fonts/consolas/
sudo chmod 644 /usr/share/fonts/consolas/YaHei.Consolas.1.12.ttf
cd /usr/share/fonts/consolas
sudo mkfontscale && sudo mkfontdir && sudo fc-cache -fv
```

## NodeJS

在乌班图中安装Node

```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Git

在乌班图中安装Git

```bash
apt-get install git
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common 
```

## Python

在乌班图中安装python

```bash
sudo apt-get install python-pip
```

## Clean

1.  删除残余的配置文件

通常Debian/Ubuntu删除软件包可以用两条命令

    sudo apt-get remove <package-name>

    sudo apt-get purge <package-name>

remove将会删除软件包，但会保留配置文件．purge会将软件包以及配置文件都删除．

找出系统上哪些软件包留下了残余的配置文件

    dpkg --list | grep "^rc"

Debian/Ubuntu删除残余配置文件

其中第一栏的rc表示软件包已经删除（Remove），但配置文件（Config-file）还在. 现在提取这些软件包的名称．

    dpkg --list | grep "^rc" | cut -d " " -f 3

Debian/Ubuntu删除残余配置文件

删除这些软件包

    dpkg --list | grep "^rc" | cut -d " " -f 3 | xargs sudo dpkg --purge
    (Reading database ... 64538 files and directories currently installed.)
    Removing libapt-inst1.4:amd64 (0.8.16~exp12ubuntu10.11) ...
    Purging configuration files for libapt-inst1.4:amd64 (0.8.16~exp12ubuntu10.11) ...
    Removing libbind9-80 (1:9.8.1.dfsg.P1-4ubuntu0.6) ...
    Purging configuration files for libbind9-80 (1:9.8.1.dfsg.P1-4ubuntu0.6) ...

如果你只想删除某个软件包的配置文件，那么可以使用下面的命令

    sudo dpkg --purge <package-name>

2.  删除没有用的deb软件安装包

通常我们用sudo apt-get install 命令安装软件包后，apt-get下载的deb安装包会保留在系统上．所以如果你经常安装软件，那么这些deb安装包会占据大量的空间．这些安装包在/var/cache/apt/archives目录下。在软件安装完成后，这些deb安装包就没什么用了。对于硬盘容量有限的服务器来说apt-get clean命令可以腾出很多空间。你可以输入下面的命令来查看/var/chace/apt/archives目录下deb安装包的总大小

    du -sh /var/cache/apt/archives

要删除这些deb包，只需要运行下面两个命令就行了．

    sudo apt-get clean
    sudo apt-get autoclean

3.  删除孤儿软件包

有时候，你用apt-get安装一个软件包时会自动安装其他的依赖．当你删除掉这个软件包时，这些依赖也就没有用处了．这些没有用的依赖包叫做孤儿软件包，可以用下面的命令删除

    sudo apt-get autoremove

不过apt-get autoremove只会删除经apt-get自动安装的依赖包，而你自己手动安装的依赖包则不会被删除，这时我们可以用deborphan来彻底删除．

    sudo apt-get install deborphan

列出孤儿软件包

    deborphan

Linux清理硬盘空间

将它们删除

    deborphan | xargs sudo apt-get purge -y

4.  删除过时的软件包

所谓过时（obsolete）的软件包是指/etc/apt/sources.list源文件中没有任何一个软件源提供这个软件的deb安装包．也就是说这个软件包在软件源里找不到了，不被支持了．这可能是因为下面几个原因：

上游开发者不维护这个软件，又没有人来接管这个软件的开发．所以Debian/Ubuntu的软件包维护人员决定将这个软件从软件源中删除．
这个软件成了孤儿，同时用户很少．所以它就从软件源里消失了．
这个软件有了一个新的名字，维护人员给它起了一个新的名字并保留旧软件包．
因为这些过时的软件不会有安全更新了，而且搞不好会在软件升级过程中引来麻烦，所以我们需要将它们删除．首先找出哪些软件包是过时的

    sudo aptitude search ?obsolete

我的输出结果

    i linux-image-3.2.0-29-generic - Linux kernel image for version 3.2.0 on 64

将它删除

    sudo apt-get purge linux-image-3.2.0-29-generic

你也可以使用下面的命令将所有过时的软件包一下清除

    sudo  aptitude purge ~o

不过需要注意的是，有些软件包虽然在软件源里找不到，但它并不是过时的软件包．比如你自己下载安装的ubuntu-tweak．ubuntu-tweak需要你从官网下载deb安装包，但不提供软件源．用上面这条命令会将这类软件包也删除．所以我建议使用apt-get purge，自己选择需要删除的软件包．

5.  清理日志文件

日志文件会变得越来越大，我们可以用ncdu工具来查看大日志文件．

    sudo apt-get install ncdu

    sudo ncdu /var/log

Linux清理硬盘空间

从上图可以发现，shadowsocks.log占用了24.5MiB的硬盘空间，我们可以用下面的命令来清空这个日志文件的内容．

    sudo dd if=/dev/null of=/var/log/shadowsocks.log

6.  baobab硬盘空间用量分析工具

baobab是一个图形界面工具，可以帮助我们查找系统中哪个目录或文件占据了大量空间．在终端里运行下面的命令

    baobab

Linux清理硬盘空间

从上图中可以发现，thunerbird里的邮件就有14.3GB的大小！还有chromuim浏览器，Spotify音乐播放器，谷歌浏览器，缩略图，这些缓存（cache）也占用了不少空间．

其实我们也可以用上面所提到了ncdu工具来查看大容量目录和文件．比如查看/home/<username>/

    sudo ncdu /home/<username>

不过用ncdu的话，每查看一个目录就要输入一次命令，建议在服务器上用ncdu，在桌面版本用图形化的baobab工具．

7.  删除大容量软件包

首先安装debian-goodies

    sudo apt-get install debian-goodies

然后输入下面的命令

    dpigs -H

我的输出结果

    441.0M texlive-latex-extra-doc
    230.1M valgrind-dbg
    200.6M chromium-browser
    171.4M google-chrome-stable
    153.4M linux-image-extra-3.19.0-39-generic
    153.4M linux-image-extra-3.19.0-37-generic
    151.5M maltego
    144.8M wine1.7-amd64
    140.6M metasploit-framework
    137.4M wine1.7-i386

接下来你就可以删除你不用的软件包了．上面的命令默认只会显示前10个结果，你可指定结果的个数，比如20个

    dpigs -H --lines=20

8.  使用ubuntu-tweak来清理

前往ubuntu-tweak官网下载deb安装包，然后输入下面的命令安装．

    sudo apt-get install gdebi

    sudo gdebi ubuntu-tweak*.deb

打开ubuntu tweak后，选择Janitor标签．在这里你可以清理应用程序的缓存，缩略图缓存，apt缓存，旧内核，没有用的软件包配置文件，以及孤儿软件包．

ubuntu tweak清理缓存

## 日期格式设置

查看区域设置

```bash
locale
```

设置区域

```bash
sudo locale-gen en_US en_US.UTF-8 en_CA.UTF-8
sudo dpkg-reconfigure locales
```
