---
layout: post
title: "jQuery插件 jImageLink.js - 模拟yupoo的缩略图上的小图标效果"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- jQuery
- 插件
- jImageLink
- Yupoo
- 开源
---
不知道大家有没有见过<a href="http://huacn.yupoo.com/" target="_blank">Yupoo</a>照片列表里面的效果，当鼠标经过照片时会出现一个小图标，点击小图标时，就可以直接查看大图，它使用了<a href="http://www.stickmanlabs.com/lightwindow" target="_blank">Lightwindow</a>这个JS.

像这种方式的体现有一个很大的好处就是用户可以点击图片的其它区域进入详细页面，也可以点击小图标，直接查看完整的图片。用户体验有有很大的提高。因为很多情况下，列表中的图片可能会引起用户想看看完整图片，或者说大图片的欲望，如果有这样的一个功能，哪就可以不影响现有功能情况下满足用户的这个&ldquo;欲望&rdquo;。

今天我也弄了一个类似的功能，实现方式基本跟<a href="http://huacn.yupoo.com/" target="_blank">Yupoo</a>的一样，再把它弄也了jQuery插件，方便使用。

## Yupoo 的效果图：

  <img src="/images/cnblogs_com/huacn/yupoo.albumslist.photo.PNG" border="0" />

## 我这个的效果：

<img src="http://www.cnblogs.com/images/cnblogs_com/huacn/jquery.jimagelink.screenshoot.png" border="0" />

## 调用的时候只用这样一段代码：

```javascript
$("body").ready(function(){
  /*
      there is the jImageLink code
   */
  $("a.imgLink").jImageLink({
      iconClassName : "linkIcon",        /* 在这里写“小图标"的样式，包括图片 */
      iconRel : "shadowbox",            /* 这里是Shadownbox 或 Lightwindow 这类JS用的 rel 属性定义,用过的朋友一定知道 */
      iconWidth : 14,                    /* 图标宽度 这里会影响小图标的位置，建议输入跟 iconClassName 这个样式里面的图标大小一样 */
      iconHeight : 14                    /* 图标高度 */
  });
});
```

项目地址：<a href="http://code.google.com/p/jimagelink/" target="_blank">http://code.google.com/p/jimagelink/</a>
