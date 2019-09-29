---
layout: post
title: "jDialog - 简单的jQuery浮动窗口插件"
date: 2010-05-23 19:20
comments: true
categories: 
- jQuery
- jDialog
- Javascript
- 前端
- 插件
- 开源
---
<p>在做前端功能的时候,我经常都会遇到需要实现一个浮动窗口的需求,我相信,同行的你也是一样的.</p>
<p>jQuery 关于这样功能的插件实在是太多了,让人眼花缭乱!</p>
<p>我之前试过好多个这样的插件,如:<a href="http://dev.iceburg.net/jquery/jqModal/" target="_blank">jqModal</a>&nbsp;<a href="http://jquery.com/demo/thickbox/" target="_blank">ThickBox</a>&nbsp;<a href="http://malsup.com/jquery/block/#overview" target="_blank">BlockUI</a>&nbsp;<a href="http://colorpowered.com/colorbox/" target="_blank">ColorBox</a>&nbsp;等等,但它们都让我感觉过于复杂,不够轻便.</p>
<p>其实,很多时候需求都很简单,只是需要弹出一个简单的,带个关闭按钮的,可以传一段HTML或是直接将一个隐藏的HTML显示到浮动窗口里面的功能,当然浏览器支持和轻便也是很重要的.而像前面提到哪些插件他们都比较花哨,无法满足这种"轻便"的需求.</p>
<p>所以,我根据自已的这些需求做了一个 jQuery 插件,它真的很 Simple</p>
<!-- more -->
## 特色介绍
<ol>
<li>可修改CSS来统一定制UI;</li>
<li>通过参数设置标题,高度,宽度,窗口显示的HTML内容;</li>
<li>一个页面同时只能显示一个窗口;</li>
<li>窗口显示需要指定一个页面上的对象做为窗口显示做置定位,这样窗口会出现在哪个东西的下面,就像下拉列表一样.</li>
<li>不能拖动(我们不需要这样的功能);</li>
<li>可以点击窗口之外的任意区域来关闭窗口,或是点右上角的关闭按钮.</li>
</ol>

## 如果上面的特点合你口味,请继续往下看!
<div>1000字的描述都没法抵过一个简单的演示啊,来,看看:</div>
<ul>
<li>演示地址:&nbsp;<a href="http://huacnlee.github.com/jdialog/" target="_blank">http://huacnlee.github.com/jdialog/</a></li>
</ul>

## 试完了还喜欢吗?
<p>源代码上 Github 上面放着,可以直接用 Git 获取,或在上面下载打包文件</p>
<ul>
<li>项目地址:&nbsp;<a href="http://github.com/huacnlee/jdialog" target="_blank">http://github.com/huacnlee/jdialog</a></li>
<li>Git 获取: $ git clone&nbsp;git@github.com:huacnlee/jdialog.git</li>
</ul>

当然,你还可以在 Github 上面给我反馈问题或建议,或者 <a href="http://github.com/huacnlee/jdialog/fork" target="_blank">Fork</a> 它,分享你的改进.
