---
layout: post
title: "E-Texteditor for Ubuntu DEB 安装包"
date: 2009-09-04 01:23
comments: true
categories: 
- Linux
- E-Texteditor
- TextEditor
---
今天晚上重新安装了 Ubuntu Desktop 9.04 ，本来是准备测试 Redcar 的，从源代码编译安装是一件很痛苦的事情，漫长啊！Redcar目前的功能不怎么样，于是有试试 E-Texteditor，从 github 上面下载到了<a href="http://github.com/etexteditor/e/" target="_blank"> E-Texteditor 的源代码</a> 又是一个很漫长的过程，Redcar还好，因为是 Ruby 开发的，没多少编译，而 E-Texteditor 就长了，起码半个小时以上...最后郁闷的是差个文件，编译失败...
最后没想到在 E-Texteditor 官方论坛 上面找解决办法的时候，尽然发现了一个编译好的 DEB 安装包，于是下载之...安装测试，成功了，哈哈
<p><a href="http://farm3.static.flickr.com/2666/3884167479_b6c6fe0a96_o.png" target="_blank"><img src="http://farm3.static.flickr.com/2666/3884167479_e337cfdd70.jpg" border="0" width="500" height="313" /></a></p>
<!-- more -->

## 那个论坛上面的下载地址慢，我转移到了这里：

[E-Texteditor for Ubuntu x86 deb package](http://code.google.com/p/textmate-huacnlee/downloads/list)

如果你是 64位系统的话，请移步这里：[《binaries for linux》](http://www.e-texteditor.com/forum/viewtopic.php?p=13379#13379)
另外，这个包是把 E-Texteditor 安装在<strong> /opt/e</strong> 里面的，如果想实现快捷打开的话，可以在 /usr/bin 下面建立一个连接如：

```bash
$ sudo ln -s /opt/e/e /usr/bin/e
$ e ./project
```