---
layout: post
title: "jCaches功能更新"
date: 2008-05-29 04:06
comments: true
categories: 
- Javascript
- 缓存
- jCaches
---
<p>本来这些功能是上周就已经完成的，一直到最近才有时间开始整理，最近太忙了</p>
<p>这次我给 <a href="http://code.google.com/p/jcaches/" target="_blank">jCaches</a> 加入了一些新功能，因为当时在做一个功能，这个功能上面用户会动态加一些数据，以二维表格形式体现的，但这些数据又不能马上存到数据库，只能临时存放在客户端，直到当他点击&ldquo;保存&rdquo;按钮时才一起将这些数据提交到服务端存放。</p>
<p>做这个功能时我首先想到了我的&nbsp; <a href="http://code.google.com/p/jcaches/" target="_blank">jCaches</a> 用它将数据以对象的方式零时存放起来，再通过<a href="http://www.json.org/json-zh.html" target="_blank">JSON.js</a> 把这个对象序列化成字符串，再提交到服务端。果然很快这样的功能就实现了，我在JS里面定义了一个跟表格字段相对应的类，每次用户加入一条数据时创建一个对象，服务端也同样建相同结构的类，最终把提交上来的列化成字符串转成对象。再加上 <a href="http://code.google.com/p/jcaches/" target="_blank">jCaches</a> 的管理，功能很快实现。</p>
<p>同时也跟 <a href="http://code.google.com/p/jcaches/" target="_blank">jCaches</a> 加入了一些新的功能：</p>
<ol>
<li><strong>datas</strong> 属性,缓存的数据数组列表，只读，修改它不会影响原数据 </li>
<li><strong>length</strong> 属性，目前已存放的个数</li>
<li><strong>size</strong>() 方法,得到目前的缓存个数</li>
<li><strong>remove</strong>(id <em>String</em>) - 根据&ldquo;标识ID&rdquo;删除缓存信息，参数：<strong>id</strong> 标识ID</li>
<li><strong>each</strong>(callback <em>Function</em>) - 遍历Cache列表, <strong>callback</strong> 回调函数,带有一个参数返回，是当前Cache的value</li>
</ol>
<p><br />项目地址：<a href="http://code.google.com/p/jcaches/" target="_blank">http://code.google.com/p/jcaches/</a></p>
<p>&nbsp;</p>
