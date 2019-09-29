---
layout: post
title: "用 mail_view 测试你的 Rails ActionMailer"
date: 2011-11-04 22:04
comments: true
categories: 
- Rails
- ActionMailer
- Gem
- mail_view
---
<p>Rails 为我们提供了 ActionMailer 可以很简单的实现邮件发送功能，但是这个东西测试起来却非常的麻烦，以前我总会这样做：</p>
<ol>
<li>创建一个 Mailer ；</li>
<li>编辑邮件 HTML 模板；</li>
<li>在功能上面点击模拟发送邮件的过程，或是从 Rails console 直接调用 Mailer 发送测试邮件；</li>
<li>打开信箱查看邮件内容，格式，样式，文字是否有误；</li>
<li>发现有问题，回到第二步继续修改循环 N 此，直到有了正确的结果。</li>
</ol>
<div>这个过程很麻烦，而且尤其是模拟发邮件的场景，最终导致没有耐心反复测试，而在邮件中留下了一些未测试到的 Bug，或者样式调的不够完美。</div>
<div>如果有个简单的方式可以帮助我们测试邮件结果就好了。</div>
<div><br /></div>
<!-- more -->
<div>最近发现了来自&nbsp;37Signals 的&nbsp;<a href="https://github.com/37signals/mail_view" target="_blank">mail_view</a> 这个 Gem，正好能够满足我的这中需求。（看来苦恼的不只是我一个人啊)</div>
<div><br /></div>
<div><span>mail_view 可将邮件结果以 HTML 的方式暂时，配置好以后，</span>你可以给每个的 Mailer 定义一个 URL 如：</div>
<div>
<ul>
<li>http://127.0.0.1:3000/mails/reply_mailer</li>
<li>http://127.0.0.1:3000/mails/user_mailer</li>
</ul>
</div>
<div><span>访问后可以看到 action 列表，点击就可以看到结果了，就像这样：</span></div>
<div><br /></div>
<p><img src="https://a248.e.akamai.net/assets.github.com/img/3e05f590c5d0b11b18dcc12ce87cc80e881fff58/687474703a2f2f696d673236392e696d616765736861636b2e75732f696d673236392f323934342f68746d6c7a2e706e67" border="0" width="640" height="476" /></p>
<p>&nbsp;</p>
<p>mail_view 地址:&nbsp;<a href="https://github.com/37signals/mail_view" target="_blank">https://github.com/37signals/mail_view</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
