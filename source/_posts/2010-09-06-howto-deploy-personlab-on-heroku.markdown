---
layout: post
title: "如何安装 PersonLab 到 Heroku 上面(免费独立博客)"
date: 2010-09-06 11:55
comments: true
categories: 
- Ruby
- Rails
- Personlab
- 开源
- Heroku
---
<p>我这个博客程序 PersonLab，现在可以很容易的安装在 Heroku 上面了 今天讲一下如何安装。</p>
<p>先说一下 <a href="http://heroku.com" target="_blank">Heroku</a>&nbsp;, 它是我们 Ruby 界的 Google AppEngine，提供基于 Ruby 的云服务，支持 Ruby on Rails。也是有提供免费服务，<span style="font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; font-size: 14px; line-height: 25px; -webkit-text-size-adjust: none;">虽然是免费的，但速度还很不错的，而且可以绑定域名（这个需要现绑定信用卡，会花费$1，域名绑定是免费的，空间也是）。&nbsp;</span></p>
<p><span style="font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; font-size: medium;"><span style="font-size: 14px; line-height: 25px; -webkit-text-size-adjust: none;">但是Heroku上面是有限制的，无法存放图片之类的东西，我现在博客是将图片存放在更加稳定的 Yupoo或Flickr上面，贴代码放到 <a href="http://gist.github.com" target="_blank">Github Gist</a>&nbsp;上面。</span></span></p>
<!-- more -->
<p><span style="font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; font-size: medium;"><span style="font-size: 14px; line-height: 25px; -webkit-text-size-adjust: none;">项目地址:&nbsp;</span></span><span style="font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; font-size: 14px; line-height: 25px; -webkit-text-size-adjust: none;"><a href="http://github.com/huacnlee/personlab" target="_blank">http://github.com/huacnlee/personlab</a>&nbsp;</span></p>
<h2>安装步骤(Ubuntu环境):</h2>
<p>
<script src="http://gist.github.com/566602.js?file=heroku%20deploy%20personlab"></script>
</p>
<p>&nbsp;</p>
<p><span style="font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; font-size: 14px; line-height: 25px; -webkit-text-size-adjust: none; ">整个安装过程还是比较简单的，如果你懂 Git 和 一点点 Ruby，将会很快安装完成。&nbsp;<br />希望你能喜欢。</span></p>
