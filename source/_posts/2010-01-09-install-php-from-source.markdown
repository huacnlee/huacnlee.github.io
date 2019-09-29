---
layout: post
title: "CentOS 从源代码安装 PHP 5.3.1"
date: 2010-01-09 14:24
comments: true
categories: 
- PHP
- CentOS
- Apache
- httpd
- 服务器配置
---
因为需要用到一个 PHP 程序，它要求 php 5.2+ 的版本，而 CentOS 5 使用 `yum install php` 安装的 php 是 5.1 版本的，所有现在需要手动从源代码安装新的 Php。
我这里选了 `php-5.3.1`

```bash
sudo yum install gcc-c++ httpd httpd-devel apr-devel libxml2-devel zlib zlib-devel mysql-devel openssl-devel
wget http://cn2.php.net/get/php-5.3.1.tar.gz/from/cn.php.net/mirror
tar -zxf php-5.3.1.tar.gz
cd php-5.3.1
./configure --with-configure-file-path=/etc --with-config-file-scan-dir=/etc/php.d  --with-mysql --with-mysqli --with-zlib --enable-so --with-apxs2
sudo make && sudo make install
sudo cp php.ini-production /etc/php.ini
sudo vim /etc/php.ini
```

* 必须安装 httpd-devel 不然的话，Apache 的 apxs2 就没有，那就没法让 httpd 与 php
* 安装完成后 打开 /etc/php.ini 以后找到 include_path 的位置，将它设置为： `include_path = "/usr/local/lib/php/"`
* 重启 Apache： `sudo service httpd restart`

哎，还是 Ubuntu Server 方便些，好多软件都是比较新的，经常在 CentOS 下面折腾版本问题....

<!-- more -->

## 相关页面：

[PHP 官方 mcrypt 安装教程](http://www.php.net/manual/en/mcrypt.installation.php)
[CentOS Php and Apache Install](http://articles.slicehost.com/2008/2/6/centos-installing-apache-and-php5)
[Installing PHP from source on CentOS x86_64 (w/ apache)](http://www.wolflabs.org/2008/12/08/installing-php-from-source-on-centos-x86_64-w-apache/)