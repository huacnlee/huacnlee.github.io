---
layout: post
title: "Ruby 1.9.2 或 Rails3 使用时遇到 no such file to load -- readline"
date: 2010-08-25 15:11
comments: true
categories: 
- Rails
- Ruby
- Readline
- Ubuntu
- Mac
---
最近开始接触 Ruby 1.9.2 和 Rails3 了，今天遇到一个问题当 rails console 的时候出现&nbsp;no such file to load -- readline 错误。
Google 上面搜索了一下，原来是安装 Ruby 1.9 的时候需要安装 readline 的扩展，如果开始安装的时候没有带上它，那么进入Ruby源代码根目录的 ext 里面重新安装以下 readline 的扩展就可以了。
下面是我在 rvm 环境下面的用法,特别要注意，需要先安装 libreadline-dev 的类库

```bash
Ubuntu:
$ sudo apt-get install libreadline-dev
Mac:
$ brew install readline

Build readline for Ruby:
$ cd ~/.rvm/src/ruby-1.9.2-p0/ext/readline
$ ruby extconf.rb 
checking for tgetnum() in -lncurses... yes
checking for readline/readline.h... yes
checking for readline/history.h... yes
checking for readline() in -lreadline... yes
.............................
creating Makefile
$ make && make install
```