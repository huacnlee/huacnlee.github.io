---
layout: post
title: "完美兼容FF与IE的列表写法"
date: 2008-04-24 08:17
comments: true
categories:
- CSS
- 前端
- Web标准
---
前几天朋友一直在搞这个列表的样式与兼容问题,有序列表可能是初学者最烦的问题,做出来总是不哪么顺心,今天我这里发一个我的写法,以下这些在Firefox IE7 IE6这三种浏览器下都完美兼容,没有一点差距,可以看一下CSS的写法.<br />重点是CSS里面我标注红色哪一段,其实就是Display:block这个东西,只要应用好了,就很少出现兼容性的问题.

还有一点很重要,FF的UL与IE下的ul的margin值是不同的,所以,如果你不给ul设定margin的值的话,哪两个浏览器就会有出入,所以最好的办法就是给ul的margin写上值就没有问题了.

### HTML代码:

```html
<div>
  <ul>
    <li><a href=”#”>全美各媒体测试报告倾巢出动</a></li>
    <li><a href=”#”>非美国公民无缘iPhone</a></li>
    <li><a href=”#”>讨论:报纸还能活多久</a></li>
    <li><a href=”#”>[图]江民KV系列26日升级后出现系统崩溃问题</a></li>
    <li><a href=”#”>iPhone将能与微软Exchange Server互联</a></li>
    <li><a href=”#”>iPhone将能与微软Exchange Server互联</a></li>
    <li><a href=”#”>iPhone将能与微软Exchange Server互联</a></li>
    <li><a href=”#”>iPhone将能与微软Exchange Server互联</a></li>
  </ul>
</div>
```

### CSS代码:

```css
body{
  background:#EEE;
  text-align:center;
  font-family:宋体, verdana;
  font-size:12px;
}

.item {
  margin:40px auto;
  background:#FFF;
  border:1px solid #CCC;
  width:250px;
  padding:8px;
  text-align:left;

}

.item ul {
  margin:0;
  padding:0;
  list-style-type:none;
  border:1px solid #F0F0F0;
}

.item ul li { margin:0;padding:0;}

.item ul li a:link,.item ul li a:visited {
  width:100%;
  background:#F5F5F5;
  display:block;
  line-height:22px;
  border-bottom:1px solid #F0F0F0;
  color:blue;
  text-decoration:none;
}

.item ul li a:actived { }

.item ul li a:hover{
  background:#FFF;
}
```

<img src="http://www.cnblogs.com/images/cnblogs_com/huacn/Ul_Li_listStyle_WebStand.PNG" border="0" />

演示地址: <a href="http://www.wathon.com/opensource/xhtml/liststyle.html" target="_blank">http://www.wathon.com/opensource/xhtml/liststyle.html</a>
