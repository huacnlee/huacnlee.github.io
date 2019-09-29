---
layout: post
title: "用 Rsync 同步/备份多台服务器"
date: 2011-01-11 10:30
comments: true
categories:
- Linux
- Rsync
- 运维
---
Web 服务器的图片库越来越大，备份渐渐成了问题，由于小文件很多，以前那种简单的 FTP 下载方式已经不可行了，而且我们需要自动化的同步方式以解决服务器备份的需求。
昨天研究了一下，发现了 [Rsync](http://samba.anu.edu.au/rsync/) 这个东西。

先试着在公司内部的几台开发机上面同步试试。


## 环境


### 需要备份的服务器(下面简称 S1):

* 系统: Ubuntu Server 10.10
* IP: 172.28.150.23
* 开发共用机，上面有 MySQL 数据库和开发时的上传文件

### 备份服务器(简称 S2)

* 同样系统
* IP: 172.28.150.26
* 用于备份测试

## 安装 Rsync

```bash
$ sudo apt-get install rsync
```

结果我发现好像 Ubuntu 最初就安装好了的…

## S1 Rsync 配置文件

```bash
$ sudo mkdir /etc/rsyncd
$ sudo vi /etc/rsyncd/rsyncd.conf
```

## 配置文件例子

```ini
pid file = /var/run/rsyncd.pid
port = 873
address = 172.28.150.23
uid = jason
gid = jason
use chroot = yes
read only = yes
hosts allow = 172.28.150.26
hosts deny = *
max connections = 20
motd file = /etc/rsyncd/rsyncd.motd
log file = /var/log/rsync.log
transfer logging = yes
log format = %t %a %m %f %b
syslog facility = local3
timeout = 300
[wwwroot]
path = /home/jason/wwwroot
list=yes
ignore errors
comment = wwwroot dir
```

这个配置文件里面 `wwwroot` 是需要备份的一个别名，它下面的 `path = /home/jason/wwwroot` 是需要备份的目录，可以根据实际需要进行就该，当然后面还可以加上 [wwwroot2] 等多个需要备份的别名…

另外由于限制了访问客户端的 IP，我这里就没有设置密码项，省得调用的时候麻烦。

需要创建 `/etc/rsyncd/rsyncd.motd` 文件，里面就存简单的欢迎文本，如: wellcome

## 启动 S1 Rsync 服务

```bash
$ sudo rsync –daemon –config=/etc/rsyncd/rsyncd.conf
```
现在 S1 上面的 Rsync 服务已经弄好了。

## 进入 S2 服务器

同样安装 Rsync

```bash
$ sudo apt-get install rsync
$ sudo rsync -vzrltopg –delete –progress jason@172.28.150.23::wwwroot /tmp/wwwroot
```

就开始同步了.

## 其他的参考资源

* <a href="http://blog.prosight.me/index.php/2009/09/345" target="_blank">Rsync 客户端同步选项详解</a>
* <a href="http://samba.anu.edu.au/rsync/documentation.html" target="_blank">Rsync 官方文档地址</a>

