---
layout: post
title: "JSMin Tool - Python开发的自动压缩JS文件的工具"
date: 2008-08-07 03:56
comments: true
categories: 
- Python
- 开源
- Jsmin
- Tools
- 前端
- 性能
- Javascript
---
<p>不知你是否用过 <a href="http://www.getfirebug.com" target="_blank">Firebug</a> 的一个附加组件 <a href="http://developer.yahoo.com/yslow/" target="_blank">YSlow</a> 它里面的性能参数指标中有一项叫做 <a href="http://developer.yahoo.com/yslow/" target="_blank">Minify JS</a> 意思是说将JS文件的多余项清除掉，如：空格，换行，注释等。这样对页面加载速度有一定的提高。</p>
<p>我在公司是除了网站开发，另外还有一项重要的工作是发布网站，当然这些东西是必不可少的，之前一在使用网上的一些工具对JS文件进行优化，但效率不行，因为我们的项目里面有好几十个JS文件，每次发布都一个一个处理哪太累了，我又不能把源文件给压了，哪样还怎么改。</p>
<p>今天我这里发布的这个工具就是实现这样的功能，当然之前此类的工具还是有挺多的，但很多都得一个一个处理，我这里对网上的一个 <a href="http://www.crockford.com/" target="_blank">开源代码</a> 进行封装，做成了一个自动处理文件的功能。</p>
<p>最近在学 <a href="http://www.python.org" target="_blank">Python</a> 当然这个功能就由它来开发了，从 <a href="http://javascript.crockford.com/jsmin.html" target="_blank">Douglas Crockford's</a> 下载了他提供的 JSMin Python的类库，再使用 Python 哪超级简洁的几段文件遍历，文件夹，文件创建功能做了一下自动处理功能。</p>
<p>这下爽了，每次发布的时候把程序复制到JS文件的目录，一运行就自动全部压缩了，因为考虑到可能会误操作，所以没有直接把原文件覆盖，而是把压好的文件放到一个目录里面，最后再复制出来覆盖，所有完成了，干干净净的JS，没有一段多余的代码，YSlow的指标也通过了。</p>
<p>源代码我发布到Google Code里面去了，可以使用SVN来下载。</p>
<p>JSMin项目地址：<a href="http://code.google.com/p/jsmin/" target="_blank">http://code.google.com/p/jsmin/</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
