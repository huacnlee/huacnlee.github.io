---
layout: post
title: "Rails 项目开发支付宝付款调试过程的技巧"
date: 2012-08-22 09:48
comments: true
categories: 
- Rails
- 技巧
- 支付宝
---
最近做了两个带支付功能的项目，对于 Rails 项目来说，我们有 [active_merchant](https://github.com/Shopify/active_merchant) 和 [active_merchant_patch_china](https://github.com/flyerhzm/activemerchant_patch_for_china) 开发起来会简单很多。

但是一个问题困扰我，就是本地开发支付网关回调通知的问题。

## 以支付宝为例：

每次对支付宝发起的动作完成以后，支付宝都会将执行结果的信息通过“Notify”的方式返回回来，而这个“Notify”是直接由支付宝的服务端发起的 POST 请求。

但是你知道，Rails 项目开发我们习惯于在本地跑一个 http://127.0.0.1:3000 来开发，支付宝的“Notify”根本无法从他们的服务端访问到这么个地址。

之前在一淘有个项目涉及到付款的功能我是直接走内部通道，拿到一个 Alipay 的 VPN，才能收到“Notify”信息的，并且这个方式也非常的麻烦，每次搞还得联系支付宝的人给 VPN 随机密钥，连上支付宝 VPN，然后再测试，并且某些环境下面开了 VPN 还会带来“副作用”...

----------

其实支付宝的通知回调无非要求这么一点： **notify_url 必须是网络上可访问的地址**

那我们将开发环境跑在 VPS 上面不就可以了么？

## 通过远程开发环境联调支付功能

解决方案就是:

在远程服务器上面跑开发环境调试

1. 找个速度快一些的 VPS，并把开发环境安装好
2. VPS 上面配置 Nginx 方向代理到 http://127.0.0.1:3000, 并绑定一个真实的域名，(如: dev.huacnlee.com)
3. 通过 SSH 连到 VPS 上面，并启动项目开发环境
4. 通过 SFTP/FTP 的方式远程编辑文件，通过一些工具自动同步（你可以把你的 ssh pub key 存放服务器上面，这样连接 SFTP 的时候就不需要繁琐的输入密码)
5. 访问 dev.huacnlee.com 来调试

### 你需要下面几个软件:

我这里只搞过 Mac 平台的，其他平台可以寻找类似的替代方案

* [FUSE for OS X](https://github.com/osxfuse/osxfuse/downloads) - 将 FTP, SFTP 的地址 mount 成一个本地磁盘来使用
* [Macfusion](http://macfusionapp.org) - 图形化的界面调用 FUSE

用起来也很简单，先安装 [FUSE for OS X](https://github.com/osxfuse/osxfuse/downloads)，下载以后有安装包的，这个装好了无需配置。
然后下载 [Macfusion](http://macfusionapp.org)，这个无需安装直接运行，界面上就几个按钮而已，如图:

![](http://macfusionapp.org/screenshots/mf2_main.png) ![](http://macfusionapp.org/screenshots/mf2_editing.png)

用 Macfusion mount 以后会在 `/Volumes` 里面出现一个新的磁盘，可以通过任意工具修改这个里面的文件，达到随时更新到 VPS 上面的目的了。

> 注意，如果你用 TextMate，别忘了关掉 Git 这个 Bundle，不然它会随时刷新文件状态，而是的用起来很卡，其他编辑器也是类似的，你得关掉有关刷新文件的功能，因为现在你连的是远程目录，每一次文件检查动作都是一个网络请求。

接下来一边修改，一边访问 `dev.huacnlee.com` 这个域名来调试支付功能，由于用上了实际的域名，支付宝的“Notify”能够顺利发送过来了。等支付功能调好了以后再切回本地开发的方式。
