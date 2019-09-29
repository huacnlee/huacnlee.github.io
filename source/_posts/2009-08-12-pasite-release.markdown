---
layout: post
title: "新项目 Pasite.org 发布"
date: 2009-08-12 09:37
comments: true
categories: 
- Pasite
- Rails
- Ruby
---
<p>以前我博客发布代码时总是先将代码发布到 <a href="http://pastie.org" target="_blank">pastie.org</a> 然后再复布发布好后的HTML代码，再粘贴到博客文章里面。我复制了它的CSS代码，所以才会有像 <a href="http://huacnlee.com/blog/create-rails-task-scheduler-by-rake-and-cronjob" target="_blank">这篇文章</a> 哪样的效果。</p>
<p>但是，由于 绿坝事件 ，GFW将 pastie.org 封了，并且一去不复反，每次我要再次贴代码的时候必须通过翻墙进去...</p>
<p>很是麻烦，有时候还不好找到翻墙的工具。</p>
<p>于是自已拿 Ruby on Rails 克隆了一个 pastie.org ，风格布局都是复制它的，再加入了用户机制，便于管理自已发布的代码。</p>
<h3>项目地址</h3>
<ul>
<li><a href="http://pasite.org" target="_blank">http://pasite.org</a> (<span style="color: #ff0000;">注意！我的是 <strong>pasite</strong> 国外那个是 <strong>pastie</strong></span>)<a href="http://pasite.org" target="_blank"><br /></a></li>
</ul>
<p>开发使用 Ruby on Rails + <a href="pygments.org" target="_blank">Pygments</a> ，并使用了 <a href="http://github.com/mbleigh/acts-as-taggable-on" target="_blank">acts-as-taggable-on</a> 这个Tag插件，好爽，省了很多事情，开发好高效，只用了两天时间就完成并发布了，接下来慢慢做细节优化和性能改进。</p>
<p>大家以后写博客要贴代码或记录代码片段的时候可以发到这个项目里面，我准备好好维护它，让它像 pastie.org 一样，过段时间买个好些的域名弄上去。</p>
<p>喜欢的朋友帮忙在自已博客上面 推荐一下！</p>
