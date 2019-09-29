---
layout: post
title: "PersonLab 现在可以顺利的部署在 Heroku 上面了"
date: 2010-09-04 03:21
comments: true
categories: 
- Rails
- Personlab
- 开源
- Opensource
- 博客
---
<p>最近发现 <a href="http://api.heroku.com/invitation/accept/5d4c3ac8a5" target="_blank">Heroku</a> 的访问速度有了很大的提升，感觉比我买的哪个美国 VPS 还要快一些。</p>
<p><a href="http://api.heroku.com/invitation/accept/5d4c3ac8a5" target="_blank">Heroku</a>&nbsp;类似 Google AppEngine 一样，是基本云的主机服务，在它上面可以很容易扩充服务器性能。AppEngine 是基本 Python 的，而 Heroku 是 Ruby 的，当然也可以运行 Rails（包括 2.x 和 3.0），也是有提供免费服务的，虽然没有像 AppEngine 哪么多的空间，但对于一个个人博客来说还是足够了。</p>
<p>我今晚的时候将 PersonLab 做了一些调整，花了好几个小时终于可以正常的运行在&nbsp;<a href="http://api.heroku.com/invitation/accept/5d4c3ac8a5" target="_blank">Heroku</a>&nbsp;上面了。其实主要问题还是因为&nbsp;<a href="http://api.heroku.com/invitation/accept/5d4c3ac8a5" target="_blank">Heroku</a>&nbsp;的<a href="http://docs.heroku.com/constraints#read-only-filesystem" target="_blank">文件系统是只读</a>的（只有 tmp 和 log 目录可写），也就是说 caches_page, JS/CSS 合并缓存这类的功能都将无法写入。于是花了很长的时间修正这个问题。其实刚开始的时候还有另外一个中文导致的编码错误(Heroku上面最高只有 Ruby 1.9.1,这个貌似对这个有问题)，最后还是换回来了 REE 版的 1.8.7 + &nbsp;Rails 3.0。</p>
<p>最后多出来了一个新的针对 Heroku + Rails3.0，Javascript/CSS 文件整合的小插件（这个是从别人哪儿修改过来的，由于弄的时候修改的太多，没能用 Fork 的方式建立出来）：<a href="http://github.com/huacnlee/heroku_asset_cacher" target="_blank">http://github.com/huacnlee/heroku_asset_cacher</a></p>
<!-- more -->
<p>然后是将旧的 MySQL 导入到 Heroku 上面，这个过程还是挺容的，当然你要以前有在用 PersonLab（哈哈哈）。</p>
<p>终于，终于，我把它弄好了，然后 Push 到了 Github 上面，命一个新版本 0.5，并删除了 Rails3 的分支（还是因为修改的时候文件太多，不少心把 Rails2的 master 分支给复盖了...）。</p>
<h2>如何安装 PersonLab 到 Heroku</h2>
<ol>
<li>注册一个 Heroku 的账号(用我的邀请推荐一下):&nbsp;<a href="http://api.heroku.com/invitation/accept/5d4c3ac8a5" target="_blank">http://api.heroku.com/invitation/accept/5d4c3ac8a5</a></li>
<li>然后作下面的步骤，环境是 Linux or Mac:<br />
<script src="http://gist.github.com/564393.js?file=Deploy%20PersonLab%20on%20Heroku"></script>
</li>
<li>如果没有出错，哪么你就可以使用了。</li>
</ol>
<div>如果你想有一个博客（有独立域名哪种），但又不想维护，哪么你可以试试 PersonLab。</div>
<div><br /></div>
<div><span style="font-size: medium;"><span style="font-size: 15px;"><strong><span style="font-size: small;"><span style="font-size: 12px; font-weight: normal;">如果你对这个项目感兴，可以在 Github:&nbsp;<a href="http://github.com/huacnlee/personlab" target="_blank">http://github.com/huacnlee/personlab</a> &nbsp;上面 Fork 它，并参与这个项目的开发中。</span></span></strong></span></span></div>
<div><br /></div>
<div>BTW. Heroku 上面绑定域名是需要关联信用卡以后才可以的，另外它还会收 $1 的绑定费用，不知道这个是不是拿来做为信用卡确认的。完了以后，按着 Heroku 上面的说明，修改域名解析就可以了。</div>
