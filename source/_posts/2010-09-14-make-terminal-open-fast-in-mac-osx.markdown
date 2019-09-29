---
layout: post
title: "Mac OS X 终端打开速度慢的解决办法 "
date: 2010-09-14 22:56
comments: true
categories: 
- Mac
- 电脑维护
- 终端
---
最近越来越觉得在 Mac 里面打开终端(Terminal)，或新开一个终端标签页的时候速度很慢，几乎都要等上好几秒...而系统资源其实是足足的，一直不解这个原因，而对于一个开发人员来说终端是经常需要用到的，这样不行啊，虽然时间不多，但慢哪么一点就是感觉不爽，记得刚才始的时候都是很快的。今天有机会终于把它解决了...
Mac 里面有个这个文件:&nbsp;<strong>/usr/libexec/path_helper</strong>&nbsp;,每次 bash 打开的时候都会运行它，从&nbsp;<strong>/etc/paths.d </strong>里面得到 <strong>PATH</strong> 信息，以前 Windows 在环境变量里面设置，Linux 是写在 .bashrc 里面的，而这个文件加载速度非常慢。

## 如何解决?

* 先执行 time /usr/libexec/path_helper 得到当前的 PATH 信息，如我的：
```bash
$ time /usr/libexec/path_helper
PATH="/Users/matt/bin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/mysql/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin"; export PATH MANPATH="/opt/local/man:/usr/share/man:/usr/local/share/man:/usr/X11/man"; export MANPATH
```
* 删除里面的所有文件和目录；
* 把刚才 path_helper 返回的&amp;信息写在 ~/.bash_profile 这个文件里面（注：Linux 里面是 .bashrc 而 Mac 是 .bash_profile）。
<!-- more -->

现在关掉重新打开终端，速度如飞一般的感觉，这才像 Mac 的体验嘛！

## 参考资料：

* [http://superuser.com/questions/31403/how-can-i-speed-up-terminal-app-or-iterm-on-mac-osx](http://superuser.com/questions/31403/how-can-i-speed-up-terminal-app-or-iterm-on-mac-osx)
* [http://mjtsai.com/blog/2009/04/01/slow-opening-terminal-windows/](http://mjtsai.com/blog/2009/04/01/slow-opening-terminal-windows/)