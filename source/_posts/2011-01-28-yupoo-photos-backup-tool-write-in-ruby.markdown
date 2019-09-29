---
layout: post
title: "Yupoo 照片备份工具"
date: 2011-01-28 16:08
comments: true
categories: 
- Ruby
- 采集
- Yupoo
- 工具
---
最近越来越发现 Yupoo 不给力了！很长一段时间竟然 API 都去掉了，三方应用的整合没有，还有什么意思，而且想备份都还没地方。
我曾经到 Yupoo 的用户反馈区问过，[我该如何备份我的照片到本地](http://www.yupoo.com/forums/2/topics/273378/)，但这个问题一直没人里我...
我也找过很多次 Yupoo 备份工具，但一直无果，有的也只是几年前开放 API 时候的，已经不能用了。前段时间听说 Yupoo 又出 API 了，去看了一下，文档都还没有写完，等到出备份工具要何年何月啊！
趁着最近比较空闲，自己用 Ruby 写了个采集器来备份我的 Yupoo 照片，我的照片已经在下载中，理论上可以一个不留的下载下来。
分享给有需要的人使用.

## 下载地址

[https://gist.github.com/799961](https://gist.github.com/799961)

## 备份工具使用方法

* 把下载的文件命名为 main.rb
* 先要安装 Ruby 1.9.2 和 Rubygems，安装方法我就不详细叙述了，网上可以找到，到处都是。
* Ruby 和 Rubygems 安装好了以后需要安装两个 gem
<!-- more -->

```bash
$ sudo gem install nokogiri
$ sudo gem install mechanize
```

根据文件里面的注释说明修改几处设置，然后就可执行：

```bash
$ ruby main.rb
```