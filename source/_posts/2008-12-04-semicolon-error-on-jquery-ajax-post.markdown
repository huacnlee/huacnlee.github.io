---
layout: post
title: "jQuery Ajax Post提交时候分号带来的问题"
date: 2008-12-04 07:40
comments: true
categories:
- jQuery
- AJAX
- Bug
---
<p>前段时间在做无刷新提交评论时，遇到一个怪怪的问题一直无法解决，其实这个问题看起来很小，也就是在提交评论时，如果评论内容里面包括有<span style="color: #ff0000; font-size: x-large;">;</span>(分号) 时，哪么分号后面的内容将会无故的丢失。</p>

### 我当时的写法：

```javascript
$.ajax({
 url: '/user/post/comment/add/',
  type: Componsents.Settings.AJAX_TYPE,
   data:'id=' + Post.settings.ID + '&name=' + txtName.val()  + '&body=' + txtBody.val() + '&follow=' + follow+ '&url=' + encodeURI(txtUrl.val()) + '&email=' + txtEmail.val(),
 dataType:"json",
 success: function(state){
    }
});
```

<p>这里 data 参数是像 GET 方法一样的写法，问题就在这里，组合成一长段时，在<a href="http://www.jquery.com" target="_blank">jQuery</a>解析成JSON提交给服务器的时候会把分号后面的截断。这个问题以前做了哪么多还一直没有遇到过，所以哪天我觉得很奇怪，以为是<a href="http://www.python.org" target="_blank">python</a>或者<a href="http://www.djangoproject.com" target="_blank">django</a>在处理时候出的问题，但通过<a href="http://www.getfirebug.com" target="_blank">Firebug</a>查看提交数据与换了几种方式提交，找出了问题确实是出在Javascript提交的时候。</p>
<p>于是我试着给body的内容做 escape 处理，但这样做问题就来了，这样处理过的数据到了python里面会出现中文乱码...麻烦，哪天试了好多种方式还是不得解，于是暂时搁置。</p>
<p><span style="color: #000000;">今天又试着去修正这个问题，突然想到<strong>jQuery</strong>在<strong>ajax</strong>提交的时候会不会有另外一种data格式以处理这种类似问题，于是再次看了看 <a href="http://docs.jquery.com/Ajax/jQuery.ajax#options" target="_blank">关于jquery ajax的文档</a> <span style="font-size: x-small;">（自从用熟悉以后很久都没看过它了）</span>。</span></p>
<p><span style="color: #000000;">果然它有提供JSON格式的data参数，这下就爽了，问题迎刃而解！</span></p>


### 正确的写法：

```javascript
$.ajax({
 url: '/user/post/comment/add/',
  type: Componsents.Settings.AJAX_TYPE,
   data: {
     id: Post.settings.ID,
       name: txtName.val(),
        body: txtBody.val(),
        follow: follow,
     url: txtUrl.val(),
      email: txtEmail.val()
 },
    dataType:"json",
 success: function(state){
    }
});
```

总的来说，这个问题是因为我一直习惯了像GET一样组合data参数的写法而带来的问题，希望这篇文章能给有类似习惯的开发人员带来帮助。