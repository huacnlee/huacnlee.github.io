---
layout: post
title: "介绍几个不错的 Django 三方插件"
date: 2008-11-10 20:25
comments: true
categories: 
- Python
- Django
- 插件
---
<div>最近一直在做我的Django项目，有空的时候了解了一下Django的一些三方组件。<br />有很多还很不错，可以帮助我们快速实现一些功能，不用再次重复的造&ldquo;车轮&rdquo;，合理应用，效率才好呀！&nbsp;</div>
<div>&nbsp;</div>
<ol>
<li><strong><span class="Apple-style-span" style="font-size: medium"><a href="http://code.google.com/p/django-dynamic-media-serve/" target="_blank">django-dynamic-media-serve</a></span></strong> - 在Web开发中，经常会遇到上传图片需要用到很多种不同大小的缩略图的情况，我们经常会烦恼之间漏掉了一种大小格式！而 <strong><span style="color: #ff6600;"><a href="http://code.google.com/p/django-dynamic-media-serve/" target="_blank">django-dynamic-media-serve</a></span></strong> 可以帮你很方便解决这些问题，如：原图是 <span style="font-size: xx-small;"><em>http://127.0.0.1:8000/static/image/a.jpg</em></span> 你在调用的时候在后面加上 width 与 height 的参数 <span style="font-size: xx-small;"><em>http://127.0.0.1:8000/static/image/a.jpg?width=300&amp;height=200</em></span> 就可以取得相应切割出来的小图了，并且它有帮你做缓存的。</li>
<li><strong><a href="http://code.google.com/p/django-evolution/" target="_blank"></a><a href="http://code.google.com/p/django-db-log/" target="_blank">django-db-log</a></strong> - django错误捕捉并存放数据库！这个东西就爽了，如果你的django应程序程序加上了它，当运行期间出现的错误将会自动存放到数据库中，然后你可以在管理后台看到这些错误日志，很爽很方便，再也不用担心运行期间的错误了。</li>
<li><a href="http://code.google.com/p/django-compress/" target="_blank"><strong>django-compress</strong></a> - 帮助你压缩你的Javascript和CSS文件，提高前台页面加载速度。</li>
<li><a href="http://code.google.com/p/django-syncr/" target="_blank"><strong>django-syncr</strong></a> - 这个项目爽，它可以通过API帮助将 Flickr、Twitter、Picasa、Youtube、Delicious等网站的数据同步到自已这边来，很方便(但好像现在这个没有开发完，文档也没有出来，我试了好久一直不行，Flickr提示引用目录不对，delicious提示参数不对，郁闷)。</li>
</ol>
<div>&nbsp;</div>
<div><span class="Apple-style-span" style="font-size: large"><span class="Apple-style-span" style="font-weight: bold">另外还有一些还不完整的项目，看起来还是很不错的：</span></span></div>
<div><ol>
<li><span class="Apple-style-span" style="font-family: arial; font-size: 16px; font-weight: bold; line-height: normal"><a href="http://code.google.com/p/django-tracking/" target="_blank">django-tracking</a>&nbsp;</span>帮助你跟踪你网站当前的访问用户</li>
<li><span class="Apple-style-span" style="font-weight: bold"><a href="http://code.google.com/p/django-page-cms/" target="_blank">django-page-cms</a>&nbsp;<span class="Apple-style-span" style="font-size: 16px">&nbsp;</span><span class="Apple-style-span" style="font-weight: normal">这个就很爽了，直接在 </span><span class="Apple-style-span" style="font-style: italic"><span class="Apple-style-span" style="color: #ff6600">Models</span></span><span class="Apple-style-span" style="font-weight: normal"> 里面实现整表缓存，并自动为 <span class="Apple-style-span" style="font-style: italic"><span class="Apple-style-span" style="font-size: x-small">save()</span></span>&nbsp;和&nbsp;<span class="Apple-style-span" style="font-size: x-small"><span class="Apple-style-span" style="font-style: italic">delete()</span></span>&nbsp;这类更新事件的时候更新缓存（我看它代码了解到的）看起来很不错，关注中</span></span></li>
</ol></div>
<p>&nbsp;</p>
<p>&nbsp;</p>
