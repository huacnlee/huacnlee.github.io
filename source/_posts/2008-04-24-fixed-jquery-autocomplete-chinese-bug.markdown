---
layout: post
title: "jQuery.Autocomplete自动完成插件在中文应用时的BUG修正"
date: 2008-04-24 08:17
comments: true
categories: 
- Javascript
- jQuery
- 插件
- Autocomplete
- Bug
- 技巧
---
<p>最近用了一下<a href="http://www.pengoworks.com/workshop/jquery/autocomplete.htm" target="_blank" title="点击进入官方页面 Jquery的自动完成插件">Jquery.AutoComplete.js</a>这个<a href="http://jquery.com" target="_blank" title="Jquery官方网站">Jquery</a>插件，效果还很不错，不过它有一些对中文支持的BUG，可能是因为作者没有考虑到，我这里做一些修正；<br /> <br /> 你用它去实现的时候会发现当你打字的时候就在开始提交了，原因是因为它是用的 keydown 事件，而当我们要打中文时会输入一系列的字母，所以会出现这种 现象。解决办法，将 Keydown 事件改成 Keyup ,看起来好像是不行哦，不过它的确是可以的。我猜想可能是浏览器没有把输入法在输入字母时的 Keyup 提交到 input 框上面。<br /> <br /> 另外它还有一处，是编码的问题，今天同事在用的时候找了好久才解决。<br /> jQuery.AutoComplete.js默认是将提交的数据用 encodeURI 转换了一下的，也就是转成 UTF-8后再escape，这样做会在GB2312编码的页面上出错，提交上去的会变乱码。<br /> 解决方法是：查找 encodeURI 共有两处，改成 escape 虽然不写 escape都是可以，但建议还是写上，以前就遇到过不用它会有乱码的情况.<br /> <br /> 源文件下载地址：<a href="http://www.cnblogs.com/Files/huacn/jquery.autocomplete.1.1.2.js" target="_blank">http://www.cnblogs.com/Files/huacn/jquery.autocomplete.1.1.2.js</a><br /> <br /></p>
