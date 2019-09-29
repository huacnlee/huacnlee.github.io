---
layout: post
title: "Mac OS X 下面安装 Ruby 的 MySQL 库"
date: 2009-06-18 06:23
comments: true
categories:
- MySQL
- Rails
- Ruby
- Mac
---
在 Mac OS X 下面，直接用 `gem install mysql` 来安装 [MySQL / Ruby](http://www.tmtm.org/en/mysql/ruby/) 支持库会出错。

* 解决办法是先下载并安装 [MySQL for Mac OS X 10.5 (x86)](http://dev.mysql.com/downloads/mysql/5.0.html#macosx-dmg).
* 然后在命令行运行：

```bash
sudo env ARCHFLAGS="-arch i386" gem install mysql -- \
--with-mysql-dir=/usr/local/mysql --with-mysql-lib=/usr/local/mysql/lib \
--with-mysql-include=/usr/local/mysql/include
```
