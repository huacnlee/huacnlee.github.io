---
layout: post
title: "Rails VS Django - 为什么我要选择 Rails!"
date: 2009-11-16 06:25
comments: true
categories: 
- Rails
- Django
- Ruby
- Python
---
<p>很多朋友看我博客会发前，之前一段时间我有写过关于 <a href="http://www.djangoproject.com" target="_blank">Django</a> 的文章，但后面变成了 Rails ，为什么我会选择 Rails。</p>
<p>会到两年前在接触这些 <a href="http://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80" target="_blank">动态语言</a> 之前，我就知道了大名鼎鼎 <a href="http://rubyonrails.org" target="_blank">Ruby on Rails </a>，也知道了大名鼎鼎的 <a href="http://python.org" target="_blank">Python</a> 和 Python 社区主推的 Web 框架 Django。我只是需要一门新的开发语言和 Web框架 替代 Asp.net。Python 和 Ruby 之间我需要任选其一。</p>
<p>当时因为 Python 的历史比 Ruby 更加久远，从国内的 Python 社区看来，好像选择它要更好一些，在加上 Ruby 的作者是日本人（我不讨厌日本，而是因为怕这个原因会影响Ruby在国内的发展），所以就选择了 Python + Django。</p>
<p>于是开始深入学习，Python 我并没有刻意的去学习，而是从 Django 开始的，自己找了个项目作为目标用作练习 Django Web 开发，这个项目就是 <a href="http://huacnlee.com/blog/my-first-django-project-tmitter" target="_blank">Tmitter</a>。不久后 Tmiiter 成型了，我开始总结，并写下了《<a href="http://huacnlee.com/blog/something-about-python-django-learnning" target="_blank">总结一下最近Python学习心得</a>》，第二个项目是 <a href="http://huacnlee.com/blog/python-django-opensource-project-coderblogs-inviting" target="_blank">Coderblogs</a> 不过这个项目还没做完我就转向 Rails 了。</p>
<!-- more -->
<h3>我为什么要从 Django 转向 Rails？<br /></h3>
<p>看起来 Django 的设计模式和风格跟我的风格不合，我不喜欢 Django：</p>
<ol>
<li>一个 View 包括多个 Controller ，一个 Model 包括多个 表的定义；</li>
<li>App 的设计思想，这个不喜欢；</li>
<li>没用的 Admin ，实际应用中 Django 提供的 Admin Panel 并不适合我；</li>
</ol>
<p><strong>但是...我放弃 Django 的真正原因却不是上面这几条</strong>，而是有一天我无意的看了看 Ruby on Rails，并试着去了解它，然后就爱上了它，Rails 太有魅力了，可以说它让我爱不释手：</p>
<ol>
<li>Rails 的设计风格跟我之前的风格非常相似，我刚开始接触的时候就发现，好多东西又是后都能才出来；</li>
<li>Rails 的 <a href="http://guides.rubyonrails.org/migrations.html" target="_blank">数据库迁移工具</a> 让我眼前一亮，这是从未接触过了，这东西解决了之前对于数据库发布的烦恼；</li>
<li>强制的命名规则，这一点在 Django 里面没有，Asp.net 也没有，之前一直会为同组开发人员命名不按规则来而烦恼，现在如果不规则，那就不通过；</li>
<li>相比 Django 的 MVT，Rails 的 MVC 概念才是我期望的；</li>
<li>Rails Model 验证工具，很方便，在加上 "flash" 用于存放提示信息这个设计思想，又是眼前一亮；</li>
<li>Rails 自动生成工具，自动生成 Migration、Model、Controller、View、自动生成数据库结构...；</li>
<li><a href="http://rubyforge.org/" target="_blank">Rubyforge</a> 和 <a href="http://github.com" target="_blank">Github</a> 这两个 Ruby 社区，<a href="http://railscasts.com/" target="_blank">Railscasts</a> 上面完美的 Rails 视频教程...；</li>
<li>很过 Rails 插件的创意都会让我眼前一亮，这些是之前 Asp.net、Django 都没有的，如：<a href="http://github.com/mislav/will_paginate/" target="_blank">will_paginate</a>、<a href="http://huacnlee.com/blog/rails-plugin-paperclip-for-image-upload" target="_blank">paperclip</a>、<a href="http://github.com/search?langOverride=&amp;q=acts_as&amp;repo=&amp;start_value=1&amp;type=Repositories" target="_blank">acts_as 系列</a>、<a href="http://railscasts.com/episodes/184-formtastic-part-1" target="_blank">Formtastic</a>、<a href="http://github.com/leikind/wice_grid/" target="_blank">wice_grid</a>....完善的社区里面以及有了相当多的插件、类库，不用再花时间造车轮。</li>
<li>嵌入敏捷开发的思想；</li>
<li>还有在开发过程中一种无法用言语表达的爽，这个在我从第一个 Rails 项目到现在第五个项目的开发过程中都有的感觉，我会暗暗叫&ldquo;爽&rdquo;；</li>
</ol>
<p>我每次在跟朋友提及 Rails 的优点时，总是显得是那么兴奋！Rails 确实太让人激动了...<strong><br /></strong></p>
<p><span style="font-size: medium;"><strong><span style="color: #ff0000;">如果你还没有试过 Ruby on Rails，我强烈建议你试试，你会爱上的！</span></strong><span style="color: #ff0000;"></span></span><span style="color: #339966;">(这句</span><span style="color: #339966;">同样适用于 .net/php/java ... 的 Web 开发人员)</span></p>
