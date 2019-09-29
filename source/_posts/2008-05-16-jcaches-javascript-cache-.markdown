---
layout: post
title: "Javascript 数据缓存实现 jCaches"
date: 2008-05-16 05:25
comments: true
categories:
- Javascript
- 缓存
- jCaches
- 开源
---
<p>今天在做一个Ajax调用地区信息的功能，因为很多载入都是很频繁的，我不希望用户每次都从服务器把数据拉下来，虽然服务器上的数据已经做过内存缓存，但从用户浏览器到Web服务器还是会占用很多资源，更不用说这些很频繁的载入，所以就想办法写了一个客户端浏览器上面的<strong>Javascript数据缓存</strong>功能。</p>
<p>使用的时候就像很多类似的缓存调用方式一样，如：</p>
<h3>例子：</h3>

```javascript
var c = new jCaches(20,true);
var cacheId = "mydata-1";
c.clear();

var dataList = {};

$("#btnLoad").click(function(){

    if(c.exist(cacheId)){
     result = c.get(cacheId);
  }
 else{
     $.ajax({
          url:"data.html",
          type : "get",
         dataType:"json",
          success: function(result){
                alert(result);
                dataList = result;
                c.add(cacheId,dataList);
          }
     });
   }

});
```

<p>其实它的主要实现方式是通过数组变量，将你传入的数据存在客户端的内存里面，当需要的时候再通过唯一的标识ID把数据取出来。</p>
<h3>相关地址与下载：</h3>
<ul>
<li>项目地址：<a href="http://code.google.com/p/jcaches/" target="_blank">http://code.google.com/p/jcaches/</a></li>
<li>下载地址：<a href="http://jcaches.googlecode.com/files/jCaches-0.1.js" target="_blank">http://jcaches.googlecode.com/files/jCaches-0.1.js</a></li>
<li>演示文件：<a href="http://jcaches.googlecode.com/files/jCaches-example-0.1.zip" target="_blank">http://jcaches.googlecode.com/files/jCaches-example-0.1.zip</a></li>
</ul>
<p>欢迎大家一起参与开发此功能。</p>
<p>&nbsp;</p>
