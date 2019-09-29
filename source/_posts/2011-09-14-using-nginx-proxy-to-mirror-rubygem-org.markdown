---
layout: post
title: "搭建 nginx 反向代理，提高 gem 的安装速度"
date: 2011-09-14 22:24
comments: true
categories: 
- Ruby
- Rubygems
- Nginx
---
<p>最近时常遇到 Gem 安装东西的时候安装失败或异常缓慢，我试着用 --debug 参数查看，结果发现原来是 <a href="http://rubygems.org" target="_blank">Rubygems</a> 指向的亚马逊服务器偶尔回遇到被墙掉的地址，而有些服务器是间歇性的连接失败或者丢包严重。</p>
<p>结果自然会导致 gem 安装过程起慢。FUCK THE GFW</p>
<p>难道我们只能这样忍受么？当然不能！！</p>
<p>之前曾想过在国内搞个 <a href="http://rubygems.org" target="_blank">rubygems.org</a> 以及后面 gem 包的完整镜像站，我试过用官方提供的 <a href="https://github.com/rubygems/rubygems-mirror" target="_blank">rubygems-mirror</a>&nbsp;结果发现需要同步的东西太多了，在&nbsp;<a href="http://zheye.org" target="_blank">者也</a>&nbsp;那台服务器上面跑了两天还是没同步完（或许也是因为墙的原因），最后只好放弃。</p>
<p>今天我又想到了另外个方式，通过在一台国外的 VPS 主机上面，用 <a href="http://nginx.org" target="_blank">Nginx</a> 反向代理到 rubygems.org 以及它的其他域名，然后本地改 hosts 文件指向那台主机不就能解决连接失败和丢包的问题么！</p>
<p>于是动手在我的一台一直空着没用的 VPS 上面配置上了，结果表明效果确实不错，当年的安装速度又回来了！！</p>
<p>如果你想用我这个跳板，可以修改 hosts 文件加入:</p>
<!-- more -->
<pre style="margin:0;background:#F0F0F0;padding:4px 10px;border: 1px solid #dddddd;"><span style="text-decoration: line-through;">184.82.37.134 rubygems.org<br />184.82.37.134 production.cf.rubygems.org<br />184.82.37.134 production.s3.rubygems.org</span></pre>
<div><br /></div>
<div>然后 gem install 的时候，访问 http://rubygems.org 的时候就会经过我那个服务器，当然这台不敢保证能有多稳定，建议您有国外 VPS 的话，还是自己搭建一个。</div>
<div><br /></div>
<div>自己搭建代理，Nginx 配置信息可以参考这个文件:</div>
<div>
<ul>
<li><a href="https://gist.github.com/1216602" target="_blank">https://gist.github.com/1216602</a></li>
</ul>
<div><span style="font-family: mceinline;">PS: 那个好心人在国内搞个 Rubygems 的镜像吧，就像 mirrors.163.com 和 mirrors.sohu.com 那样。</span></div>
</div>
