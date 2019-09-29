---
layout: post
title: "Windows 下开发 Ruby on Rails 慢？用虚拟机来运行它吧！"
date: 2009-10-29 08:59
comments: true
categories: 
- Rails
- Windows
- Virtualbox
- 虚拟机
- 教程
---
因为工作需要，公司里面必须使用 Windows，但是 <strong>Rails 在 Windows 下面很慢</strong>！简单的启动一个 ruby script/console 最少都要等待 14s ，这样的龟速怎么能忍受呢！尤其咱们还是用动态语言，向往自由高效的程序员！
可能很多人都有想过在虚拟机(如 <a href="http://www.virtualbox.org" target="_blank">Virtualbox</a> 、 <a href="http://www.vmware.com" target="_blank">Vmwave</a> )下面安装个 Linux，然后需要开发 Rails 项目的时候到虚拟机上面去开发。但是同样的问题会存在，在虚拟机下面 使用图形化界面 操作会显得非常迟钝，简直比等待那 14s 还难受。
今天在试用 <a href="http://www.andlinux.org" target="_blank">AndLinux</a> 的时候发现了另外一种方式，在虚拟机里面加载一个共享，共享连接到 Windows 系统的项目目录，通过 ssh 连接 Linux 在命令行下面执行 script/server、rake 等等。这样一来文件同样是存放在 Windows 系统中的，你可以一边在&nbsp; Windows 下面开发，一边在 虚拟机的 Linux 下面运行开发服务器，访问页面的时候连接 虚拟机的IP地址。

<!-- more -->
## 安装步骤:

### 下载安装 Virtualbox

* 在 Virtualbox 里面安装一个 Linux 系统，我这里使用的是 Ubuntu Desktop 8.04，建议使用 Server 版的，因为我们不需要图形界面！
* 配置虚拟机，让里面的 Linux 可以上网，这里我就略了。
* 给虚拟系统分配数据空间： 添加一个固定数据空间并起名为 win_work ，连接的路径是你在 Windows 下面的开发目录 如下面的图：

<a href="http://www.flickr.com/photos/huacnlee/4055086870/sizes/o/" target="_blank"><img src="http://farm3.static.flickr.com/2540/4055086870_2fee1e4e6f.jpg" border="0" /></a>

### 在虚拟系统里面加载数据空间到某个目录：

* 进入 虚拟机的系统
* 安装 Virtualbox 增强功能包 [Guest Additions](http://www.dedoimedo.com/computers/virtualbox-guest-addons.html)

### 挂载数据空间到指定目录，在命令行下面输入：

```bash
$ sudo mkdir ~/work
$ sudo mount -t vboxsf win_work ~/work
```

### 设置自动挂载：

```bash
# 打开 /etc/fstab 文件在最后加入：
win_work ~/work vboxsf rw,gid=100,uid=1000,auto 0 0
```

* 在虚拟机系统里面安装 openssh 并启动
* 安装 Ruby、RubyGems、Rails...
* 创建一个 Rails 项目
* 运行 Rails web server
* 在 Windows 下面访问虚拟机的 web server
