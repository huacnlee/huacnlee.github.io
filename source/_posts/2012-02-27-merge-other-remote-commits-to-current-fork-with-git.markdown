---
layout: post
title: "Git 如何合并其他 remote 上面的更新"
date: 2012-02-27 16:56
comments: true
categories: 
- Git
- Github
---

在 Github 上面 Fork 别人的项目时，我们常常会遇到主项目有了更新，这个时候怎么把主项目的更新合并到自己 Fork 的版本里面来呢？
今天突然有人问我这个问题，这里就写出来。
下面以 [ruby-china](https://github.com/huacnlee/ruby-china/) 这个项目为例，假设我是用户 @tualatrix, 并且我有一个 ruby-china 的 fork 版本在 [这里](https://github.com/tualatrix/ruby-china) ，而这个时候我在本地的版本是 `tualatrix/ruby-china` 这个

```bash
# 我先吧 tualatrix Fork 的版本获取到本地
~/work $ git clone git://github.com/tualatrix/ruby-china.git
~/work $ cd ruby-china
~/work/ruby-china <master> $ git remote
origin
# 添加 huacnlee (也就是主项目的 remote 地址)
~/work/ruby-china <master> $ git remote add huacnlee git://github.com/huacnlee/ruby-china.git
# 用 fetch 命令获取 huacnlee 的所有分支
~/work/ruby-china <master> $ git fetch huacnlee
remote: Counting objects: 499, done.
remote: Compressing objects: 100% (143/143), done.
remote: Total 315 (delta 211), reused 253 (delta 172)
Receiving objects: 100% (315/315), 190.17 KiB | 92 KiB/s, done.
Resolving deltas: 100% (211/211), completed with 72 local objects.
From git://github.com/huacnlee/ruby-china
 * [new branch]      master -> huacnlee/master
# 将 huacnlee 的 master 分支的改动合并过来,目前是处与 master 分支
~/work/ruby-china <master> $ git merge huacnlee/master
```