---
layout: post
title: "分享我的 Vim 配置文件，模仿 Textmate 功能"
date: 2009-11-11 07:20
comments: true
categories: 
- Vim
- TextEditor
- 配置文件
- 开发工具
- Textmate
---
<p>我现在已经用 <strong><a href="http://vim.org" target="_blank">Vim</a> </strong>正常工作一个月了，现在习惯了 Vim 的操作感觉真的很不错，很多地方有大大超于 <a href="http://macromates.com/" target="_blank">Textmate</a>，如 <strong>BufferExplorer</strong> 相比之前传统的 Tab 切换来的方便，按照我定义的快捷键 [F8] 就可以再编辑区域显示出当前打开的文件列表，并且还能完整的显示文件名，因为这个列表显示有很大的区域，所以就算是同时打开了 20 多个文件，找出来也是很快速的！</p>
<p>我在 Google Code 上面建立了一个项目较 <a href="http://code.google.com/p/vimmate/" target="_blank">Vimmate</a> 。</p>
<h3>Vimmate 功能列表<br /></h3>
<ol>
<li>简化 UI，默认隐藏菜单栏、工具栏、滚动条；</li>
<li>Ruby on Rails 支持；</li>
<li>类似 Textmate Bundle 的 Snippets 插件，不过没有 Textmate Bundles 那么强大；</li>
<li>NERD tree 做为项目文件列表栏，可使用 F7 开关，支持收藏目录；</li>
<li>智能提示，自动提示编辑区、已打开文件、NERD tree 里面相关的词语，支持 Ruby 语法提示；</li>
<li>使用 BufferExplorer 做为多文件切换工具，快捷键 F8；</li>
<li>配置 类似 Textmate 的快捷键，具体看 <strong>快捷键配置</strong>。</li>
</ol>
<!-- more -->
## Vimmate 快捷键配置：

```
[F7]           开关 NERD tree (文件目录树)
[F8]            开关 BufExplorer (用于切换已经打开的文件，Tab的替代品)
[Ctrl+F12]    显示/隐藏 主菜单 (默认隐藏)
[Ctrl+w 然后 上下左右]    来回切换光标到 NERD tree、编辑区...
[Ctrl+n,s,c,x,v,z,y,a]  新建、保存、复制、剪切、粘贴、撤销、重做、全选... 类似 Notepad 的快捷键
[Alt+/]   注释、注释
[Alt+j]   类似 Textmate 输出 session[:]
[Alt+p]   类似 Textmate 输出 params[:]
[Alt+l]   类似 Textmate 输出 =>
[Shift+Alt+k] 删除行
[Shift+Alt+l] 选择行
[v]   进入键盘选择模式
[V]   进入键盘行选择模式
  
== NERD tree

  [b] 开/关 收藏夹显示
  [D] 删除 选中的 收藏
  [?] 显示帮助
  [Enter] 选择/展开关闭目录
  [m] 显示文件操作菜单，用它来创建/移动/删除 目录或文件
  [u] 跳到上一个文件夹
  [C] 将跟节点转入当前选中的目录
  [r] 刷新选中的目录
  [R] 刷新根节点的目录
  [cd] 将vim的运行时目录改为选中的目录
  -- 命令 ---------------------------------------------------------
  Bookmark 别名收藏 NERD tree 里面当前选择的目录

== BufExplorer

  [D] 关闭选中的文件
  [d] 清楚选中的文件
  [Enter] 切换到选中的文件
  [p] 显示隐藏<文件名列>
  [R] 显示隐藏<文件目录列>
  [u] 显示异常未列出的 Buffers
  [s] 改变排序方式 ["编号(打开的顺序)","文件名","目录名","mru","扩展名"]
  [r] 倒序排列
```

## Vimmate 截图

### BufferExplorer

<a href="http://www.flickr.com/photos/huacnlee/4028143746/sizes/o/" target="_blank"><img src="http://farm3.static.flickr.com/2527/4028143724_2e401490ea.jpg" border="0" width="500" height="368" /></a>

### acp.vim

<a href="http://www.flickr.com/photos/huacnlee/4028143746/sizes/o/" target="_blank"><img src="http://farm3.static.flickr.com/2545/4028143746_48db4cfac2.jpg" border="0" width="500" height="368" /></a>

## Vimmate 下载地址

[http://code.google.com/p/vimmate/downloads/list](http://code.google.com/p/vimmate/downloads/list)
