---
layout: post
title: "Python将内容中的Url地址转换成Tinyurl地址"
date: 2008-07-31 09:26
comments: true
categories:
- Python
- TinyURL
- 技巧
---
<p>你用过 <a href="http://fanfou.com" target="_blank">饭否</a> 或 <a href="http://www.twitter.com" target="_blank">Twitter</a> 吗？当发布信息的时候，如果内容中带有过长的url地址，程序就会自动将这些地址转换成为更短的url，使用的是 <a href="Tinyurl" target="_blank">Tinyurl</a> 的地址转向服务。</p>
<p>如：<a href="http://huacn.blogbus.com/logs/25832349.html" target="_blank">http://huacn.blogbus.com/logs/25832349.html</a> 转换后就成了&nbsp; <a href="http://tinyurl.com/6ameh5" target="_blank">http://tinyurl.com/6ameh5</a></p>
<p>这样的就跟迷你博客的初衷更加贴切了，也可以在短小的消息中带上连接地址。</p>
<p>因为我在做我的Python的第一个项目 <a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a> 因为此项目是模仿 <a href="http://fanfou.com" target="_blank">饭否</a> 与 <a href="http://www.twitter.com" target="_blank">Twitter</a> 自然shorturl的功能是必不可少的，刚学Python的我很多都不熟悉，慢慢的查 <a href="http://tinyurl.com/api-create.php" target="_blank">Tinyurl的API</a>，再不停的调试与修改，这个功能终于实现了。</p>

### 下面是代码，分享一下：

```python
# -*- coding: utf-8 -*-
import re,urllib

def tiny_url(url):
    """将url转换成tinyurl"""
    apiurl = "http://tinyurl.com/api-create.php?url="
    tinyurl = urllib.urlopen(apiurl + url).read()
    return tinyurl

def content_tiny_url(content):
    """让消息里面的连接转换成更短的Tinyurl"""

    regex_url = r'http:\/\/([\w.]+\/?)\S*'
    for match in re.finditer(regex_url, content):
        url = match.group(0)
        content = content.replace(url,tiny_url(url))

    return content
```

<p><br />嘿嘿，享受效果吧，可以下载我的 <a href="http://code.google.com/p/tmitter/" target="_blank">Tmitter</a> 试一下效果。</p>
<p>附注：本文中的代码着色来自于 <a href="http://pastie.org/" target="_blank">http://pastie.org/</a></p>
<p>&nbsp;</p>
