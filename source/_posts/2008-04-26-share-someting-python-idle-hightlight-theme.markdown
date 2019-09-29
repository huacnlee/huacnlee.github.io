---
layout: post
title: "Python IDLE 代码高亮主题"
date: 2008-04-26 07:52
comments: true
categories:
- Python
- IDLE
- 主题
- 设计
- 技巧
- TextEditor
---
<p>最近在看Python，先用着<span style="color: #008000;">IDLE</span>这个简单点的开发工具，今天从网上找到了IDLE的<span style="color: #008000;">代码主题</span>配置文件地址，于是从一个之前喜欢的网站 <a href="http://pastie.caboo.se/" target="_blank">http://pastie.caboo.se/</a> 里面仿了几个风格。</p>
<p>效果图：</p>
<p>&nbsp;<img src="http://pic.yupoo.com/huacn/30484575781b/r16n6zz3.jpg" border="0" alt="blackboard" /></p>
<p><img src="http://pic.yupoo.com/huacn/62642575781a/vbruhz74.jpg" border="0" alt="cobalt" width="581" height="512" /></p>
<p><img src="http://pic.yupoo.com/huacn/09789575781a/ay5hpzht.jpg" border="0" /></p>
<p><img src="http://pic.yupoo.com/huacn/42135575781a/sqg29jg3.jpg" border="0" alt="twilight" width="581" height="512" /></p>
<p>使用方法：</p>
<ol>
<li>请打开C盘我的 <span style="color: #008000;">C:\Documents and Settings\你的用户名\.idlerc</span>&nbsp; 文件夹</li>
<li>里面会有一个&nbsp; <span style="color: #ea145d;"><span style="color: #008000;">config-highlight.cfg</span> <span style="color: #000000;">如果没有请自已创建一个</span></span></li>
<li><span style="color: #000000;">将下面的代码放到 </span><span style="color: #000000;"><span style="color: #008000;">config-highlight.cfg</span> 里面，并重启IDLE</span></li>
<li><span style="color: #000000;">这下在IDLE的设置</span><span style="color: #000000;">highlight项里面就有几个主题了</span></li>
</ol>

## 配置文件：

```ini
[blackboard]
keyword-background = #0C1021
definition-foreground = #D63A1B
error-foreground = #ff0000
string-background = #0C1021
keyword-foreground = #FBDE2D
hilite-foreground = #000000
comment-background = #0C1021
hit-foreground = #ffffff
builtin-background = #0C1021
stdout-foreground = #eeeeee
cursor-foreground = #ffcc00
break-background = #ffff55
comment-foreground = #505050
hilite-background = gray
definition-background = #0C1021
stderr-background = #0C1021
hit-background = #0C1021
console-foreground = #87ceeb
normal-background = #0C1021
builtin-foreground = #fd9902
stdout-background = #0C1021
console-background = #0C1021
stderr-foreground = #ff3e40
normal-foreground = #F8F8F8
string-foreground = #61CE3C
break-foreground = black
error-background = #000000

[twilight]
keyword-background = #141414
definition-foreground = #c86428
error-foreground = #ff0000
string-background = #141414
keyword-foreground = #c2964b
hilite-foreground = #00ffff
comment-background = #141414
hit-foreground = #ffffff
builtin-background = #141414
stdout-foreground = #eeeeee
cursor-foreground = #ffcc00
break-background = #ffff55
comment-foreground = #524d53
hilite-background = #0000a0
definition-background = #141414
stderr-background = #141414
hit-background = #141414
console-foreground = #87ceeb
normal-background = #141414
builtin-foreground = #ce3e24
stdout-background = #141414
console-background = #141414
stderr-foreground = #ff3e40
normal-foreground = #FFFFFF
string-foreground = #61CE3C
break-foreground = black
error-background = #000000

[desert]
keyword-background = #333333
definition-foreground = #98fb98
error-foreground = #ff0000
string-background = #333333
keyword-foreground = #cc6600
hilite-foreground = #000000
comment-background = #333333
hit-foreground = #ffffff
builtin-background = #333333
stdout-foreground = #eeeeee
cursor-foreground = #ffcc00
break-background = #ffff55
comment-foreground = #87ceeb
hilite-background = gray
definition-background = #333333
stderr-background = #333333
hit-background = #333333
console-foreground = #87ceeb
normal-background = #333333
builtin-foreground = #519e51
stdout-background = #333333
console-background = #333333
stderr-foreground = #ff3e40
normal-foreground = #f0e68c
string-foreground = #ffa0a0
break-foreground = black
error-background = #000000

[cobalt]
keyword-background = #001B33
definition-foreground = #FFDD11
error-foreground = #ff0000
string-background = #001B33
keyword-foreground = #FF7222
hilite-foreground = #00ffff
comment-background = #001B33
hit-foreground = #ffffff
builtin-background = #001B33
stdout-foreground = #eeeeee
cursor-foreground = #ffcc00
break-background = #ffff55
comment-foreground = #007699
hilite-background = #0000a0
definition-background = #001B33
stderr-background = #001B33
hit-background = #001B33
console-foreground = #87ceeb
normal-background = #001B33
builtin-foreground = #D40E36
stdout-background = #001B33
console-background = #001B33
stderr-foreground = #ff3e40
normal-foreground = #F8F8F8
string-foreground = #61CE3C
break-foreground = black
error-background = #000000
```

## 其它说明：

* 另外我这里使用的字体是 <span style="color: #0000ff;"><strong>monaco</strong></span> windows系统是没有自带的，请<a href="http://www.webdevkungfu.com/textmate-envy-aka-monaco-font-for-windows/" target="_blank">点击这里下载</a>。
