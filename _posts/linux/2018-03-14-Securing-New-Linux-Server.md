---
layout: post
title:  "Securing New Linux Server"
categories: Linux
description: 保护新的 Linux 服务器
---

## 概览

搭建新的服务器需要简单的做安全处理，比如说更改ssh的端口，比如新建一个 root 之外的用户等等，这篇文章以 DigitalOcean 的服务器为例详细叙述一下如何对新的服务器做安全处理。

## 登陆

首先第一步是 ssh 登陆目标服务器， DigitalOcean 的水滴会将 root 的密码发送到你的邮箱中，用它登陆 ssh 登陆之后，服务器会要求你更改 root 的密码，这个密码建议越复杂越好，之后我们不会经常登陆 root 账户。

## 新建用户

```bash
addgroup manager
useradd -d /home/joshua -s /bin/bash -m joshua
passwd joshua
usermod -a -G manager joshua
```

这四个命令会新建 manager 用户组然后再这个用户组新建用户 joshua 然后再为 joshua 设置一个密码，这个密码应该复杂，但是方便记忆，最后将 joshua 添加到刚才新建的用户组，这是为了为新用户设置应有的权限。我们以后的服务部署基本需要用 joshua 为基础实现，当然，你可以使用其他的 id 或者其他的用户组，只要好记方便自己使用就可以。

```bash
visudo
```

默认的情况下，这个命令会用 nano 打开 sudo 设置文件，这个文件位于 /etc/sudoers ，我们需要为对这个文件做简单的编辑。以 DigitalOcean 的镜像模板为例，这个文件应该如下所示，如果于你看到的不同也很正常你要找到 `root	ALL=(ALL:ALL) ALL` 这一行，并且在这行下方添加 `joshua    ALL=(ALL) NOPASSWD: ALL` ，这个设置将会让 joshua 在使用 sudo 命令时不需要输入密码，当然，添加 `joshua    ALL=(ALL:ALL) ALL` 也可以，这是需要输入密码的版本。

```py
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root	ALL=(ALL:ALL) ALL
#joshua    ALL=(ALL) NOPASSWD: ALL <==你要添加的行

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo	ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```

做完这一步，你就可以长时间的不使用 root 账户而是 joshua 了， 你应该推出登陆，并且使用 joshua 重新连接。如下

```bash
exit
ssh joshua@`your ip`
```

## 设置 ssh 安全

理论上你应该禁止 ssh 密码登陆，这会让安全性能大幅上涨，但是事实上如果我们更换了没有 ssh 公钥的电脑这会造成很恐怖的后果，我会将设置的方法放在下面，但是我们用另一种方式修改 ssh 设置，这样做会让安全性能大打折扣，所以你应该在生产环境用禁止 ssh 密码登陆的方法做。

### 禁止 ssh 密码登陆

你应该现在本机生成一个 ssh 加密钥，并且把这个公钥放在目标 ssh 服务器上，用以下的命令

```bash
ssh-keygen
ssh-copy-id user@host
```

进入服务器，用以下的命令修改 ssh 的配置文件

```bash
sudo cp /etc/ssh/sshd_config ~
sudo nano /etc/ssh/sshd_config
```

在 DigitalOcean 镜像的配置文件的格式应该如下所示

```py
# Package generated configuration file
# See the sshd_config(5) manpage for details

# What ports, IPs and protocols we listen for
Port 22 # ==> 修改
# Use these options to restrict which interfaces/protocols sshd will bind to
#ListenAddress ::
#ListenAddress 0.0.0.0
Protocol 2
# HostKeys for protocol version 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
#Privilege Separation is turned on for security
UsePrivilegeSeparation yes

# Lifetime and size of ephemeral version 1 server key
KeyRegenerationInterval 3600
ServerKeyBits 1024

# Logging
SyslogFacility AUTH
LogLevel INFO

# Authentication:
LoginGraceTime 120
PermitRootLogin yes # ==> 关闭
StrictModes yes

RSAAuthentication yes # ==> 保持这样
PubkeyAuthentication yes # ==> 保持这样
#AuthorizedKeysFile	%h/.ssh/authorized_keys # ==> 取消注释

# Don't read the user's ~/.rhosts and ~/.shosts files
IgnoreRhosts yes
# For this to work you will also need host keys in /etc/ssh_known_hosts
RhostsRSAAuthentication no
# similar for protocol version 2
HostbasedAuthentication no
# Uncomment if you don't trust ~/.ssh/known_hosts for RhostsRSAAuthentication
#IgnoreUserKnownHosts yes

# To enable empty passwords, change to yes (NOT RECOMMENDED)
PermitEmptyPasswords no # ==> 保持这样

# Change to yes to enable challenge-response passwords (beware issues with
# some PAM modules and threads)
ChallengeResponseAuthentication no

# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes # ==> 关闭

# Kerberos options
#KerberosAuthentication no
#KerberosGetAFSToken no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes

# GSSAPI options
#GSSAPIAuthentication no
#GSSAPICleanupCredentials yes

X11Forwarding yes
X11DisplayOffset 10
PrintMotd no
PrintLastLog yes
TCPKeepAlive yes
#UseLogin no

#MaxStartups 10:30:60
#Banner /etc/issue.net

# Allow client to pass locale environment variables
AcceptEnv LANG LC_*

Subsystem sftp /usr/lib/openssh/sftp-server

# Set this to 'yes' to enable PAM authentication, account processing,
# and session processing. If this is enabled, PAM authentication will
# be allowed through the ChallengeResponseAuthentication and
# PasswordAuthentication.  Depending on your PAM configuration,
# PAM authentication via ChallengeResponseAuthentication may bypass
# the setting of "PermitRootLogin yes
# If you just want the PAM account and session checks to run without
# PAM authentication, then enable this but set PasswordAuthentication
# and ChallengeResponseAuthentication to 'no'.
UsePAM yes
UseDNS no # ==> 添加这行
AllowUsers joshua # ==> 添加这行
```

我们要做如下改动

1.  将端口号改为 > 1024, &lt;= 65535 的其中一个，我习惯于改为 35245
2.  关闭 PermitRootLogin
3.  关闭 PermitEmptyPasswords
4.  关闭 PasswordAuthentication
5.  关闭 UseDNS
6.  打开 RSAAuthentication
7.  打开 PubkeyAuthentication
8.  设置 AuthorizedKeysFile 至 .ssh/authorized_keys
9.  添加 AllowUsers joshua

这些是说给其他镜像用的， DigitalOcean 的默认已经有其中的几个完成的步骤了。

完成之后用以下命令重启 ssh 服务

```bash
sudo service ssh restart # 任选其一
sudo /etc/init.d/ssh restart # 任选其一
```

然后在本机添加 ssh 的快速登陆配置文件

```bash
nano ~/.ssh
```

```bash
Host [some name]
HostName your ip
User joshua
Port [your port number]
```

这样你就可以直接运行 `ssh [some name]` 访问你的服务器了

### 不禁止密码登陆

注意！ 这样做会使安全性和上方的方法相比大打折扣，自己权衡把。

设置不禁止密码登陆和上方的方法区别不大，参考以上的 ssh_config 文件，并且只修改如下的字段

1. 将端口号改为 > 1024, &lt;= 65535 的其中一个，我习惯于改为 35245
2. 关闭 PermitRootLogin
3. 添加 AllowUsers joshua

这样就可以了
