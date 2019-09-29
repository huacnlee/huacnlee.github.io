---
layout: post
title: "Hello Otcopress"
date: 2012-02-21 09:53
comments: true
categories: 
---

一直都听说 [Otcopress](http://octopress.org) 非常不错，于是试试将之前泡在 Heroku 上面的博客迁移过来。之前在 Heroku 上面由于GFW的原因，访问速度无比慢了。

话说我的博客托管程序历史：

[2s-space](http://www.2s-space.com) -> [博客园](http://www.cnblogs.com) -> [BlogBus](http://blogbus.com) -> [Personlab](http://github.com/huacnlee/personlab) -> [Otcopress](http://octopress.org)

哦，如果你之前也是用 Personlab 的话，可以用我最新提交的 Rakefile 里面那个 `rake markdown:export` 命令来导出，将会生成 `_posts` 目录，把它放到 Octopress 的 `source` 目录就可以了。
这个命令将会平滑的导出可以可 Octopress 兼容的文章数据，不过自定义页面和菜单的内容需要手动改了（不多的问题不大）