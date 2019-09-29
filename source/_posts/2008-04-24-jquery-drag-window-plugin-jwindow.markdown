---
layout: post
title: "jWindow - jQuery可拖动的模式窗口插件"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- jQuery
- 插件
- jWindow
---

## jquery.jWindow.js 0.01

<p>虽然JQuery有很多类似的插件，我也试过好多个，一直都没有找到一个适合自已的，总是感觉使用不能满足我的要求。<br /> <strong>Javascript的浮动窗口</strong>已经是很老的应用，但网上很少有兼容性很好，使用又方便的功能，有的往往只是支持IE，而且问题多多，不方便应用到具体的项目中。最近我的项目里面又需要用到这个东西，以前自已都是直接写脚本来实现，但这次用到的地方比较多，所以只有写成一个插件的型式以方便多个地方调用。<br /> 这个我是在JQuery的框架上面开发的一个插件，已经完成常用的一些功能，后面慢慢加入一些实用的东西。<br /> 现在的功能有：<strong>居中显示</strong>、<strong>模式窗口</strong>、<strong>弹出效果</strong>、<strong>拖动功能</strong><br /> 它主要是实现让一个区域浮动起来，并加入可拖动的功能。<br /> 这样的做法好处在于，你可以在哪个区域里面加入任何代码，最好的应用是配合iframe，比如跟我以前做的 AjaxUpload结合，效果很爽（这个我已经在我的项目里面使用）。<br /> 多的不说，看看代码和演示。<br /> <br /> 此插件必须配合 <a href="http://jquery.com/" target="_blank">jquery.js</a> 和 <a href="http://interface.eyecon.ro/" target="_blank">jquery.inteface.js</a> 两个一起才可以使用。<br /> <br /> <img src="http://www.cnblogs.com/images/cnblogs_com/huacn/Jquery.jwindow.PNG" border="0" width="523" height="296" /></p>

### Javascirpt调用方法：

```javascript
$("#btnExampleAll").click(function(){
    $("#panelWindowAll").jWindowOpen({
        modal:true,
        center:true,
        drag : ".title",
        close:"#panelWindowAll .close",
        closeHoverClass:"hover",
        transfererFrom:"#btnExampleAll",
        transfererClass:"transferer"
    });
});
```


### HTML的窗口例子代码：

```html
<div class="window" id="panelWindowAll">
  <div class="title">jquery.jWindow Example 2</div>
  <div class="content">这个是浮动窗口的内容，你可以在这里放iframe或其它的HTML标签，使用方便. </div>
  <div class="status"><span class="resize"></span></div>
<div>
```

### 具体的效果以及使用方法请看下面的地址

项目地址：<a href="http://code.google.com/p/jwindow/" target="_blank">http://code.google.com/p/jwindow/</a><a href="http://www.wathon.com/opensource/js/jwindow/jwindow.html" target="_blank"></a><a href="http://www.wathon.com/opensource/js/jwindow/jquery.jWindow.zip" target="_blank"></a>
