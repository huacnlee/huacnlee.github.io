---
layout: post
title: "遇到IE6下 location.href BUG"
date: 2008-04-24 08:17
comments: true
categories:
- 前端
- IE
- Bug
---
今天突然发现以前做的一个页面转向的功能在IE下面莫法用，郁闷ing....。以前开发时测试一般都是用Firefox的，做完后才用IE看一下，没想到就出了这样一个功能。

## 代码如下：

```javascript
<script type="text/javascript">
    function openContent(){
        alert("");
        location.href="http://huacn.cnblogs.com";
    }
</script>
```

```html
<a href="javascript:void(0);" target="_blank" onclick="openContent();">连接方式1</a>
<a href="#" target="_blank" onclick="openContent();">连接方式2</a>
<a href="javascript:openContent();" target="_blank">连接方式2</a>
```

在Firefox IE7+ 以上三个连接都没有问题，但&ldquo;连接1&rdquo;在IE6下面就无法转向，哎，搞得我郁闷了好久。
