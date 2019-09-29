---
layout: post
title: "第一个 Munin 插件 - 监视网站在 Google,Baidu 的收录量"
date: 2011-03-04 15:18
comments: true
categories: 
- Ruby
- Munin
- SEO
---
<p>我有那么几个小网站，平时有项定期的工作就是关注这个域名在 Google, Baidu 上面的收录页面数，为什么这么做我就不多解释了，这是SEO的一个事情。</p>
<div>大家都知道，在 Google, Baidu 的搜索框中输入<span style="font-family: mceinline;"> <strong><em><span style="font-family: mceinline;">site:youdomain.com</span></em></strong></span>&nbsp;就可以查到这个域名的收录量结果。</div>
<div>但是我们有种需求是要记录每天的收录量，并且形成图表，以快速了解到网站的收录量是上升了还是下降了，从而改变一些策略。</div>
<div><br /></div>
<div>其实以前我也没有手动记录，只是凭着一个影响来感觉是上升 or 下降。</div>
<div>最近在想如果把这个动作结合到&nbsp;<a href="http://munin-monitoring.org/" target="_blank">Munin</a>&nbsp;&nbsp;成为一个插件的形式，那么这件事情不是变得很简单了，而且升降很清晰的形成在图表上面。</div>
<div>到 Munin 的插件网站上面搜罗了一下，没有找到类似的东西，于是试着自己动手写一个。</div>
<div><br /></div>
<div>很多 Munin 的插件都是 Shell 或者 Perl 写的，这两种语言我都熟悉，还是用 Ruby 吧，另外采集页面结果也需要用到 Nokogiri，其他语言的采集我也没试过。</div>
<div>之前用过 passenger 的 munin 插件，它就是 Ruby 写的，于是照着它的模子写了一个。</div>
<div><br /></div>
<div>写 Munin 插件 还是比较简单的，就是调试不方便，经过的反复重启 munin-node 服务，终于出结果了，其实总共代码也没有几行。</div>
<div><br /></div>
<div>如果你也需要可以下载试试，当然前提是你要会用&nbsp;<a href="http://munin-monitoring.org/" target="_blank">Munin</a></div>
<div><br /></div>
<!-- more -->
<h2>项目地址</h2>
<div>
<ul>
<li><a href="https://github.com/huacnlee/munin-plugin-seo" target="_blank">https://github.com/huacnlee/munin-plugin-seo</a></li>
<li>里面有安装说明</li>
</ul>
<h2>效果</h2>
<p><img src="http://farm6.static.flickr.com/5173/5504865446_62897f4bb3.jpg" border="0" /></p>
<p>刚刚跑起，没什么数据</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
<p>&nbsp;</p>
