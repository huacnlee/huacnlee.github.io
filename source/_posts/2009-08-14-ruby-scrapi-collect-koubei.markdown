---
layout: post
title: "用 Ruby scrAPI 做数据采集，口碑例子"
date: 2009-08-14 13:12
comments: true
categories: 
- Ruby
- scrAPI
- 采集
- 教程
- Rails
---
以前一直没有研究过采集相关的技术，只是用过几个采集系统，但哪些效果都不怎么样，而且整个操作过程很是麻烦，又不够精确。
前天在 Railscasts 上面看到一篇介绍 <a href="http://rubyforge.org/projects/scrapi/" target="_blank">Ruby scrAPI</a> 这个类库的视频教程《<a href="http://railscasts.com/episodes/173-screen-scraping-with-scrapi" target="_blank">Screen Scraping with ScrAPI</a>》，里面介绍了如何通过 scrAPI 以 HTML dom 的方式抓取其它网站的内容的例子，整个方式非常简单有效！
scrAPI 的 HTML 解析机制和 jQuery 的 <a href="http://docs.jquery.com/Selectors" target="_blank" title="Selectors">Selectors</a> 非常像，它可以以 <span style="color: #ff6600;"><strong>html&gt;body&gt;div#container&gt;div#articles&gt;div.item&gt;div.title</strong></span> 的方式来解析像下面这样的HTML结构

<!-- more -->
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>This is the scrAPI collect demo page</title> 
</head>
<body>
  <div id="header">
    <h1 id="demo">Demo</h1>
    <ul id="nav">
      <li><a href="/">Home</a></li>
      <li class="current"><a href="/articles">Articles</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
  <div id="container">
    <div id="articles">
      <div class="item">
        <div class="title">
          <a href="/articles/show/1">Sample article title 1</a>
        </div>
        <div class="summary">
          There is the summary text 1.
        </div>
      </div>
      <div class="item">
        <div class="title">
          <a href="/articles/show/1">Sample article title 2</a>
        </div>
        <div class="summary">
          There is the summary text 2.
        </div>
      </div>
      <div class="item">
        <div class="title">
          <a href="/articles/show/1">Sample article title 3</a>
        </div>
        <div class="summary">
          There is the summary text 3.
        </div>
      </div>
    </div>    
  </div>
</body>
</html>
```
将上面的代码保存为 demo.rb 文件，并使用 <span style="color: #3366ff;"><strong>gem install scrapi</strong></span> 安装好 scrapi 这个类库，直接运行 <span style="color: #3366ff;">ruby demo.rb</span> 就<span class="c1"></span>能看到执行结果了。

### 采集后的部分结果

```
标题：&#184;&#163;&#187;&#170;&#208;&#194;&#198;&#240;&#181;&#227;1&#202;&#210;0&#204;&#252;1&#206;&#192;1&#209;&#244;&#204;&#168;
价格：1000 元/月
类别：&#213;&#251;&#215;&#226;
装修：&#184;&#223;&#181;&#181;&#215;&#176;&#208;&#222;
连接：http://chengdu.koubei.com/fang/detail-rent-r6cb50dac9ad346b395b203ae1c8961db.html

标题：TT&#201;&#208;&#198;&#183;2&#202;&#210;2&#204;&#252;1&#206;&#192;1&#209;&#244;&#204;&#168;
价格：1700 元/月
类别：&#213;&#251;&#215;&#226;
装修：&#214;&#208;&#181;&#181;&#215;&#176;&#208;&#222;
连接：http://chengdu.koubei.com/fang/detail-rent-r9850826ea74a46a7b67956905d82a965.html

标题：&#201;&#207;&#189;&#245;&#209;&#197;&#214;&#254;2&#202;&#210;2&#204;&#252;1&#206;&#192;1&#209;&#244;&#204;&#168;
价格：2000 元/月
类别：&#213;&#251;&#215;&#226;
装修：&#184;&#223;&#181;&#181;&#215;&#176;&#208;&#222;
连接：http://chengdu.koubei.com/fang/detail-rent-r9fed98c9135445d9b677d79dce6208e5.html

标题：&#190;&#167;&#192;&#182;&#176;&#235;&#181;&#186;&#182;&#254;&#198;&#218;3&#202;&#210;2&#204;&#252;1&#206;&#192;2&#209;&#244;&#204;&#168;
价格：3600 元/月
类别：&#213;&#251;&#215;&#226;
装修：&#214;&#208;&#181;&#181;&#215;&#176;&#208;&#222;
连接：http://chengdu.koubei.com/fang/detail-rent-r40d585129d81446f868f8aa1e03b18d5.html

标题：&#196;&#166;&#191;&#168;&#214;&#254;1&#202;&#210;0&#204;&#252;1&#206;&#192;1&#209;&#244;&#204;&#168;
价格：1700 元/月
类别：&#213;&#251;&#215;&#226;
装修：&#184;&#223;&#181;&#181;&#215;&#176;&#208;&#222;
连接：http://chengdu.koubei.com/fang/detail-rent-rc0354101ab934930a3c7416e6ed6ec51.html
```

### 相关连接
<ul>
<li><a href="http://rubyforge.org/projects/scrapi/" target="_blank">Ruby scrAPI 下载地址</a></li>
<li><a href="http://railscasts.com/episodes/173-screen-scraping-with-scrapi" target="_blank">Railscases 上面关于 scrAPI 的视频教程</a></li>
</ul>
