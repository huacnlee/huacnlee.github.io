---
layout: post
title: "jQuery插件 - 下拉列表日期选择控件 jSelectDate"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- jQuery
- 插件
- jSelectDate
- 开源
---
<p>日期选择在开发中的应用应该是再常见不过的了~<br /> 以前大多数的日期选择基本上以这种形式体现：<br /> <br /> 图1:<br /> <img src="http://www.cnblogs.com/images/cnblogs_com/huacn/calendar_1.PNG" border="0" /><br /> <br /> 图2:<br /> <img src="http://www.cnblogs.com/images/cnblogs_com/huacn/calendar_2.PNG" border="0" /><br /> <br /> <br /> 但是，在我们经过很多次的使用和用户反馈中得之，这种方式操作不够方便，虽然看起来很直观，但如果是选2009，以&ldquo;图1&rdquo;哪种方式就很难操作，需要用户点击好多次才可以选到。图2的还要好些，不过感觉上还是不怎么好。<br /> <br /> 于是，有些网站就出现了以这种形式出现的日期选择控件：<br /> <img src="http://www.cnblogs.com/images/cnblogs_com/huacn/calendar_3.PNG" border="0" /><br /> <br /> <span style="color: red">另外有一点比较重要的！图一图二的哪种方式，无法用键盘操作，比如我在填写表单的时候经常会直接去输入 2005 12 25 这种类似的，如果通过下拉列表来分别选择年、月、日，这种感觉就会好多了，也支持用键盘快速输入。</span><br /> <br /> 如何很方便的实现这种功能呢？如果按普通的方式放三个下拉列表框来实现的话，将会写很多复杂的代码。<br /> 于是我自已做了一个很简单的jQuery插件，实现这种下拉列表的日期选择功能。<br /> 使用的时候你只用调用一个js就可以将指定的文本框转换成这种形式的日期选择，但提交的时候依然还是读取哪个文本框。</p>

如以下代码：

```html
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>jQuery插件之下拉列表日期控件 - jQuery.jSelectDate</title>
        <script type="text/javascript" src="scripts/jquery.js"></script>
        <script type="text/javascript" src="scripts/jquery.jSelectDate.js"></script>
        <script type="text/javascript">

            $("body").ready(function(){
                //应用方法
                $("input.date").jSelectDate({
                    css:"date",
                    yearBeign: 1995,
                    disabled : false
                });
            })

            $(this).jSelectDate();

        </script>
    </head>
    <body>
        <input type="text" id="txtName" class="date" value="2005-3-22" /> <button onclick="alert($(’#txtName’).val());">当前值</button>
        <br /><br />
        <input type="text" id="txtDate2" class="date" value="1995-5-2" />
    </body>
</html>
```

## 更新记录

```
Version 0.2 - 2008-1-24
1.加入了闰年、大小月和二月天数的处理
2.新增一个Span标签的外框，以便于设置样式
3.新增可设置是否在下拉列表后面加入“年、月、日”几个字


Version 0.1 - 2008-1-14
1.基本的功能实现
```

## 截图

<img src="http://www.cnblogs.com/images/cnblogs_com/huacn/jSelectDate_Simple_Screenshoot.PNG" border="0" />

项目地址：<a href="http://code.google.com/p/jselectdate/" target="_blank">http://code.google.com/p/jselectdate/</a>
