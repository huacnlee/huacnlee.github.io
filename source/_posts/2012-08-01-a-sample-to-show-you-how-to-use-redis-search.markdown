---
layout: post
title: "redis-search 的使用例子 App"
date: 2012-08-01 00:10
comments: true
categories:
- redis-search
- Rails
- Ruby
---
[redis-search](https://github.com/huacnlee/redis-search) 是一个我基于 [Redis](http://redis.io) 和 [Rails](http://rubyonrails.org) ActiveModel 实现的全自动的搜索工具。

## redis-search 它可帮你实现：

* 实时更新搜索索引
* 高效
* 分词搜索和逐字匹配搜索
* 别名搜索
* 支持 ActiveRecord 和 Mongoid
* 暂时只能用一个字段做为排序条件
* 中文同音词搜索
* 中文拼音搜索支持
* 中文拼音首字母搜索
* 可以用一些简单的附加条件组合搜索

我写了一个简单的例子例子项目

[https://github.com/huacnlee/redis-search-example](https://github.com/huacnlee/redis-search-example)

如果你不知道如何用 redis-search 你可以先用这个简单的项目跑起来试试看，里面的功能很简单，就是从 Github 获取信息，然后可以通过 redis-search 来实现搜索。

由于 Github 上面没有中文的项目名称，所以中文搜索这里就没法演示出来，稍后我再补充一下。

这里面演示了如何用别名索引，附加字段到 Redis，如何用排序(rand 那个属性)