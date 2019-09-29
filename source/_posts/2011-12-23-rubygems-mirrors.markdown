---
layout: post
title: "Rubygems 国内镜像服务器"
date: 2011-12-23 17:34
comments: true
categories: 
- Ruby
- Gems
---
<p>今年下半年开始， rubygems.org 就开始因为 GFW 的原因倒是时常无法安装，再到后面根本就无法安装，之前我还有写过一篇《<a href="http://huacnlee.com/blog/using-nginx-proxy-to-mirror-rubygem-org" target="_blank" title="搭建 nginx 反向代理，提高 gem 的安装速度">搭建 nginx 反向代理，提高 gem 的安装速度</a>》，但是这样的作法无法保持长久，那些反向代理服务器都是个人VPS搭建，而且由于依然会访问 rubygems.org ，gem 的安装过程依然会很慢...</p>
<p>半个月前就在 Ruby China 里面<a href="http://ruby-china.org/search?q=Gem+镜像" target="_blank">讨论</a>说要搞些国内的镜像服务器，结果因为中途遇到种种困难，一直到现在在解决，过程曲折啊，15W+ 的 gem 包还是 @<a href="http://twitter.com/zhuangbiaowei" target="_blank">zhuangbiaowei</a>&nbsp;帮忙下载，然后同步过来的。</p>
<p>现在，它已经搞好了</p>
<!-- more -->
<p>地址: <a href="http://ruby.taobao.org" target="_blank">http://ruby.taobao.org</a></p>
<p>以后这个服务将会一直有淘宝的人来维护下去（至少我还在的时候它一定能保持稳定）</p>
<p>&nbsp;</p>
