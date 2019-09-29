---
layout: post
title: "Tmitter 做完了，总结一下最近 Python 学习心得"
date: 2008-08-29 03:32
comments: true
categories:
- Python
- Django
- Tmitter
- 开源
---
这个8月，我一直在学习 <a href="http://www.python.org" target="_blank">Python</a> + <a href="http://ww.djangoproject.com" target="_blank">Django</a> 开发网站，这期间通过开发一个类似 <a href="http://www.twitter.com" target="_blank">饭否</a> <a href="http://www.twitter.com" target="_blank">Twitter</a> 功能的网站 <a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a> 来学习,一边开发，一边慢慢体会相关的知识。因为工作，每天只能在晚上的时候开，一点一滴地吸收。做了一个月左右， <a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a> 的功能算是告了一个段落，之前心里面计划的哪些功能都慢慢的完成了。当然从中我也学到了不少东西。

Django 我最喜欢的就是它的 Template 系统，如果配合得好，基本上完全可以将 Coder 与页面制做分开来开发。Template 使用也是哪么的顺畅，当然从 .NET 转到这边来会有很多的不适。有时候很不理解，他们为什么会这样设计(按之间从.NET哪边理解的思想来考虑)，不过做了一段时间，发现其实这样做也没有什么，慢慢的习惯，再到喜欢上这种方式。

另外 Django Model 的 ORM 用起来也是很爽的一件事，再加上它将 Model 转换成数据结构，这样当我在更换数据库的时候只是很简单的一件事情，爽！

## 下面这些是不习惯的：

* 一个.py文件，一个文件夹都将会为python的类结构，一开始很不习惯；
* 没有很强的成员 私有/公共概念（听说是因为动态语言的原因，还没搞太明白），每次定义的时候都很小心，很慢出现重复的而冲突；
* import 引入类时一直会担心出现重复名称而冲突，现在还担心；
* 类和对象，类的成员这些还不是很明白，不知道是否有像.NET一样的static成员的概念；
* 现有的IDE的智能提示都不是很好，好像自已写的类提示都出不来；
* 字符串里面带中文时 “中国” 和 u”中国”，单引号和双引号的区别(.NET是字符和字符串的区别，不知道 Python 是什么意思)；
* Apache上面配置 Django 项目还是没有搞太明白；
* 看英文文档很累。

## Python一些心得：

* 对于三方开源类库，不清的该怎么用的时候除了看官方文档或搜索以外建议看源代码的调用关系，这样看看它是怎么实现的，类之间的关系，问题很快会解决(<a href="http://ww.djangoproject.com" target="_blank">Django</a>的<a href="http://www.djangoproject.com/documentation/model-api/" target="_blank">Models</a>有很多类都好像没有写，在Tmitter里面有些功能的实现我就是通过看源代码来解决的)；
* Python的返回值可以一次返回几个值，这样你可以不用返回一个自定义对象或Dict，以免其他人调用的时候不清楚，少用一些东西；
* <a href="http://www.pythonware.com/products/pil/" target="_blank">PIL</a> 这个图像处理类库很好很强；
* 用 Python 写一些处理脚本是很件很爽的事情；
* 多看看别人做的开源项目也可以学到很多东西，比如：<a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a> 嘿嘿 ；
* import 引用类的时候最好不要完全引用出来，留到文件名哪一段，这样就不慢重复了；
* 函数定义时，给参数一个默认值，这样在调用的时候就可以不少传哪个参数都可以，就像.NET的方法重载；
* IDE 把 Outline 列表开着，这样开发起来会更方便，用了这么久，感觉还是 <a href="http://wingware.com/" target="_blank">WingIDE</a> 和 <a href="http://pydev.sourceforge.net/" target="_blank">PyDev</a> 更优秀一些，不过 <a href="http://wingware.com/" target="_blank">WingIDE</a> 是商业软件，推荐 <a href="http://pydev.sourceforge.net/" target="_blank">PyDev</a> + <a href="http://www.aptana.com/" target="_blank">Aptana</a> 还带有完美的HTML,CSS,JS的开发支持；
* 给你写的.py 文件加上 <span style="color: #008000;">if __name__ == "__main__": </span>可以方便直接打开这个文件来测试功能，很实用的一个技巧。

## Django的心得：

* Template 提供的方法不够用时可以通过定义 Templatetag来实现，另外 Templatetag 还可以定义一些方法来处理复杂的判断，比如 <span style="color: #008000;">"a" in ["a","b","b"]</span> 这种，在Template 里面是不可以的，哪可以能过 Templatetag 来实现(这个官方文档里面介绍好像没有，看 <a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a>)；
* Template 里面有像 Asp.NET 的 MasterPage 一样的功能，看这里 <a href="http://www.djangoproject.com/documentation/templates/#template-inheritance" target="_blank">Template inheritance</a>；
* HTML 里面，页面之间的调用最好是用 <span style="color: #008000;">{% url views.methodname param1,param2 %}</span> 这种方式来做，不要直接写死连接地址，以后url变动会很麻烦（这个我在Asp.net里面就是给每个页面定义一个url生成方法，页面全通过调用方法来得到连接地址，当做url重写的时候只用改方法实现就搞定，不用再重构页面）；
* 像文章列表项这种好几个页面都会用到的HTML结构，把它抽象出来定义成一个子模板，再通过 <span style="color: #008000;">include('item.html')</span> 这种方式，下次你的时候事情将会简单得多 ；
* Model 里面给将 <span style="color: #e81402;">save</span> 方法覆盖了，再加一些验证处理，会在在外面写更合理，这点跟上面一样，还是抽象的概念；
* Model 里面用 ManyToManyField 来定义多对多关系，不用创建多个表，syncdb 的时候会自动生成的；
* Model 默认会给表加上 主键 id 自动编号，如果你不定义的话；
* Django 里面有 <a href="http://www.gzip.org/" target="_blank">Gzip</a> 的 中间件，建议用上，很方便，在settings.py 里面的 <span style="color: #fa390f;">MIDDLEWARE_CLASSES</span> 里面加入 <span style="color: #008000;">"django.middleware.gzip.GZipMiddleware"</span> 就可以了；
* Views 里面 Response Request 的方法抽象出来，会省很多事。

基本上就是这些了，写完以后，发现自已还有好多没有理解的，还需努力啊！

* Tmitter项目地址：<a href="http://code.google.com/p/tmitter/" target="_blank">http://code.google.com/p/tmitter/</a>
* Tmiiter源代码下载：<a href="http://tmitter.googlecode.com/files/tmitter-0.2.9.tar.gz" target="_blank">http://tmitter.googlecode.com/files/tmitter-0.2.9.tar.gz</a>