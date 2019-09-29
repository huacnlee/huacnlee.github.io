---
layout: post
title: "Django开发手记 - 1.安装与创建项目"
date: 2008-07-04 05:37
comments: true
categories: 
- Python
- Django
- 教程
---
<p>从今天开始，我将学习在Linux下面 Python + Django 的开发，并在这里记录下开发手记。</p>
<p><a href="http://www.djangoproject.com/" target="_blank">Django</a>是一个非常不错的<a href="http://www.python.org/" target="_blank">Python</a> Web 开发框架，Linux下面安装<a href="http://www.djangoproject.com/" target="_blank">Django</a>和Windows基本上差不多。</p>
<p>先从<a href="http://www.djangoproject.com/" target="_blank">Django</a>官方网站下载,<a href="http://www.djangoproject.com/download/" target="_blank">Django的源代码包</a>。</p>
<p>下载完成后，将桌面上的 <a href="http://www.djangoproject.com/download/" target="_blank"><span style="color: #000080;"><strong>Django-0.96.2.tar.gz</strong></span></a> 解压到/home/用户名/ 里面。</p>
<p>如下图：</p>
<p><img src="http://lh3.ggpht.com/huacnlee/SGzY5uDwscI/AAAAAAAAARk/KH-cI43WKzQ/Screenshot-django-0.96.2%20-%20File%20Browser.png?imgmax=576" border="0" width="576" height="410" /></p>
<p>&nbsp;</p>
<p>打开<span style="color: #008000;"><strong>终端</strong></span><img src="http://lh5.ggpht.com/huacnlee/SGzY5hWqjJI/AAAAAAAAARs/smLSDXFtmxM/Screenshot-root%40jason-ubuntu%3A%20-home-jason-work-django-0.96.2.png" border="0" width="643" height="316" /></p>
<p>&nbsp;输入以下命令：</p>
<div style="border: 1px solid #cccccc; padding: 15px; background: #f0f0f0 none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial"><ol>
<li>$ <strong>cd /home/jason/work/django-0.96.2/</strong></li>
<li><span style="color: #808080;">注意，jason是你的当前账号的用户名，work/django-0.96.2/是django解压的目录</span></li>
<li>$ <strong>su</strong></li>
<li><span style="color: #808080;">输入root的密码,因为安装需要root权限</span></li>
<li># <strong>python setup.py install</strong></li>
<li><span style="color: #808080;">修改环境变量的Path</span></li>
<li># <strong>gedit /home/jason/.bashrc</strong></li>
<li><span style="color: #808080;">回车后将打开Gedit软件，在最后加入</span> <span style="color: #008000;">export PATH=&rdquo;$PATH:/usr/bin/&rdquo; <span style="color: #808080;">再保存,并按 Ctrl + Backspace重新启动 X-Window</span><br /></span></li>
<li><span style="color: #808080;">重新登录以后在任意位置就可以直接调用 *.py的文件了，也可以直接调用 django-admin.py这个文件。</span></li>
<li>$ <strong>cd<span style="color: #000000;"> </span><span style="color: #000000;">/home/jason/work/</span></strong></li>
<li><span style="color: #808080;">现在我进入我的工作目录 /home/jason/work/</span></li>
<li><span style="color: #808080;"><span style="color: #000000;">$ <strong>django-admin.py startproject simple</strong></span></span></li>
<li><span style="color: #808080;">使用 django-admin.py 创建一个网站项目名为 simple ,这将会自动创建一个 simple目录</span></li>
<li><span style="color: #808080;"><span style="color: #000000;">$<strong> cd </strong></span></span><strong><span style="color: #000000;">/home/jason/work/simple/</span></strong></li>
<li><span style="color: #808080;">进入simple目录，运行网站</span></li>
<li><span style="color: #808080;"><span style="color: #000000;">$</span> <span style="color: #000000;"><strong>python manage.py runserver</strong></span></span></li>
<li><span style="color: #808080;">回车后将提示Web服务已经启动，访问地址为&nbsp; <a href="http://127.0.0.1:8000/" target="_blank"><span style="color: #000080;">http://127.0.0.1:8000/</span></a><span style="color: #808080;"> 打开这个地址就可以看到Django的运行效果了,如下图</span><span style="color: #808080;">。</span><a href="http://127.0.0.1:8000/" target="_blank"><span style="color: #000080;"><br /></span></a></span></li>
<li><span style="color: #808080;">完成。</span></li>
</ol></div>
<p><br /> <img src="http://lh6.ggpht.com/huacnlee/SGzeA5a2ptI/AAAAAAAAAR0/4QNSt4f0jkY/Screenshot-Welcome%20to%20Django%20-%20Mozilla%20Firefox%203%20Beta%205.png" border="0" width="555" height="447" /><br /><br />相关资源：</p>
<ul>
<li>Python官方：<a href="http://www.python.org/" target="_blank">http://www.python.org </a></li>
<li>Django官方：<a href="http://www.djangoproject.com/" target="_blank">http://www.djangoproject.com/</a> </li>
</ul>
<p>&nbsp;</p>
