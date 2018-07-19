---
layout: post
title:  "Nginx Node Service"
categories: Linux
description: 在 Linux 用 Nginx 反向代理 NodeJS 服务
---

## 概览

这篇文章简单介绍如何使用 Ngnix 反向代理在其他端口运行的 NodeJS 服务，包括简单的安装工作。

## 安装

你需要以下的软件

1. Ngnix
2. NodeJS
3. Forever

### NodeJS

```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Nginx

```bash
sudo apt-get install -y nginx
```

### Forever

```bash
sudo npm install -g forever
```

## 配置

首先我们需要配置整体的 Ngnix 设置，用以下的命令进入 `/etc/ngnix` 目录，查看 `ngnix.conf` 配置文件

### 总体配置

```bash
cd /etc/ngnix
cat ngnix.conf
```

这个文件的内容应该如下所示

```py
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;
	gzip_disable "msie6";

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf; # <== 确认是否被注释
	include /etc/nginx/sites-enabled/*; # <== 确认是否被注释
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}

```

你需要确认 `include /etc/nginx/conf.d/*.conf;` 和 `include /etc/nginx/sites-enabled/*;` 这两行没有被注释掉，如果被注释了，取消注释即可。

### 项目配置

进入 `/etc/nginx/conf.d` 目录，添加我们自己的项目配置文件，用你自己习惯的命名方式，我们这次用域名加端口。

比如说我们这次为 `champion-gg-bot` 添加一个官网，地址是 `cgb.mipha.io`， 我们把这个服务监听在 `8081` 端口上，我们用以下的命令新建 `cgb_mipha_io_8081.conf` 文件

```bash
cd /etc/nginx/conf.d
sudo nano cgb_mipha_io_8081.conf
```

在这个文件中添加如下的内容

```py
upstream cgbmiphaio { # <== 应用名称
    server 127.0.0.1:8081; # <== node 监听的端口号
    keepalive 64;
}

server {
    listen 80; # <== 代理之后监听的端口号， 443是https端口，80是http端口
    server_name xxx.xxx.xxx.xxx cgb.mipha.io; # <== 服务器名称, 可以有多个域名，用空格隔开

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://cgbmiphaio; # <== 应用名称
    }
}
```

保存之后 ngnix 不会自动加载新的配置文件，用以下的命令检查文件的内容是否合法，并重新启动服务区。

```bash
sudo nginx -t
sudo service nginx reload
# 或者第一次启动nginx
sudo service nginx start
```

## 运行项目

这部分就比较简单的，build 好你的项目，然后用以下的命令就可以让 forever 守护你的项目进程在后台运行。

```bash
forever start dist/index.js
```

你可以随时停止或者查看 forever 的状态

```bash
forever list
forever stop dist/index.js
forever stopall
```
