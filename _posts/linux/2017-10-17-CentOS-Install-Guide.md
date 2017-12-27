---
layout: post
title:  "centOS Install Guide"
categories: Linux
description: 我大概记的 centOS 安装的那些小套路, 主要是这些源太难找了好吧, 而且总会忘了操作其中一步, 我选择复制粘贴!!!
---

## 安装Node

```bash
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs
```

# Git

在CentOS中安装Git

```bash
yum install git
sudo yum install python-software-properties
sudo yum install software-properties-common 
```

# Python

在乌班图中安装python

```bash
sudo yum install python-pip
```