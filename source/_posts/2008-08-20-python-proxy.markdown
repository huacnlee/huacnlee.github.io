---
layout: post
title: "Python 通过代理访问网络"
date: 2008-08-20 06:11
comments: true
categories:
- Python
- 代理
- 技巧
---
<p>今天看了一下 <a href="http://turbogears.org" target="_blank">TurboGears</a> 这个Web框架，很奇怪，它的下载要通过一个文件自动从网上下包来安装，但是，公司里面需要代理才可以连接到网络，所以我就顺便看了一下 Python 的网络代理的实现方式。</p>
<p>还是很简单的，几行就可以了：</p>


```python
import os,sys,urllib2

PROXY_INFO = {
 'user' : 'monster' ,
  'pass' : '123123' ,
   'host' : '192.168.1.13' ,
 'port' : 8080
}

def load_url(url):
  proxy_support = urllib2 . ProxyHandler ( { 'http' : \
   'http://%(user)s:%(pass)s@%(host)s:%(port)d' % PROXY_INFO } )
   opener = urllib2.build_opener(proxy_support,urllib2.HTTPHandler)
    urllib2.install_opener(opener)
  src = urllib2.urlopen(url)
  return src.read()

if __name__=='__main__':
  print load_url("http://www.google.com")
```

<p>详细地址：<a href="http://pastie.org/255667" target="_blank">http://pastie.org/255667</a></p>
<p>这个是我写的链接到 Google 并返回 Response 内容的例子。</p>
<p>重点的地方是：</p>

```python
opener = urllib2.build_opener(proxy_support,urllib2.HTTPHandler)
urllib2.install_opener(opener)
```

<p>这两句，将代理信息保存到urllib2 里面，这样，这个类的调用都会使用设置的代理。</p>
<p>我在 <a href="http://code.google.com" target="_blank">Google Code</a> 上面见了一个专门放此类实现方式例子的项目,以后这些不好整理的东西都扔哪儿去，嘿嘿。</p>
<p>项目地址：<a href="http://code.google.com/p/python-snippets/" target="_blank">http://code.google.com/p/python-snippets/ </a></p>
