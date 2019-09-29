---
layout: post
title: "jquery.qeditor - 我设计的所见即所得编辑器介绍"
date: 2013-08-13 09:29
comments: true
categories: 
- jQuery
- Javascript
---

一直以来，我都被所见即所得 ([WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG)) 编辑器困扰着，项目中总是会用到，但是他们又总是没那么好...

实际上，目前市面上已经有太多这类开源的工具：(KindEditor, TinyMce, KissyEditor, NicEdit， CKEditor ...)

### 下面是我在使用中发现他们普遍存在的问题：

* 太复杂，绝大多数功能我不需要；
* 加载缓慢，调用复杂，有的甚至至少要传 10 多个参数...
* 没有自动的格式清除功能，用户从别的地方粘贴过来提交后内容乱七八糟；
* 预览与实际结果无法很好的统一；
* 调用太复杂，文件众多，安装麻烦（比如  KissyEditor 就是典型）；
* 换行普遍是插入 `<br>` 而不是 `</p>`...；这点非常重要，他决定着未来的内容排版；
* 编辑出来的内容总是会有一堆乱七八糟的 style 属性，甚至有 width, height 之类的，严重影响响应式布局；
* 有的使用 iframe，导致后期控制很不方便；
* 当你需要把你的内容放到移动客户端的时候，你傻眼了，太难处理了，样式都在属性里面...
* 长得太丑，又不好修改样式...

如果你也有上面这些困扰，尝试使用 [jquery.qeditor](https://github.com/huacnlee/jquery.qeditor) 吧，是的，它优雅的解决了上面的问题！ 

<a href="http://huacnlee.com/jquery.qeditor" target="_blank"><img src="https://f.cloud.github.com/assets/5518/945320/a8f55670-0303-11e3-8cd5-a77e94a85dbf.png" style="width:626px"></a>

这是一个开源项目，源代码是用 CoffeeScript 和 Scss 编写的，编辑器只有两个文件，目前主要的 JS 文件的 CoffeeScript 代码 200 行不到。

### jquery.qeditor 的功能与设计定位

* 编辑的结果保持纯净、标准的 HTML Tag，样式通过使用者自己用外部 CSS 统一控制，以便你的内容能很好的实现响应式布局，以及在 iOS, Android 的 Native 控件上面轻松展示；
* 不会有字体样式，大小设置功能；
* 不会有颜色设置功能；
* 不再向下兼容 IE6,7；
* 自动根据一个 `textarea` 绑定，让编辑器无缝的和 `form` 结合；
* 使用 Font-awsome 作为 Toolbar 的按钮图标，使用简单，并且支持 Retina Display;
* 无论你从哪里拷贝东西粘贴过来，jquery.qeditor 里面都能按照你的内容 CSS 定义来显示；
* 沉浸式的全屏界面，让你在全屏界面找到真实预览的感觉；

---------

### 相关地址

* 项目: [https://github.com/huacnlee/jquery.qeditor](https://github.com/huacnlee/jquery.qeditor)
* 演示: [http://huacnlee.com/jquery.qeditor](http://huacnlee.com/jquery.qeditor)