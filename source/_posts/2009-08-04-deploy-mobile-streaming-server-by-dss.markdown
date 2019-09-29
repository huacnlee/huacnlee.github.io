---
layout: post
title: "DSS 搭建手机流媒体服务器"
date: 2009-08-04 15:25
comments: true
categories:
- 流媒体
- Darwin Streaming Server
- RTSP
---
最近研究了一下手机流媒体服务器的搭建，目的是实现通过3G手机看在线视频。

开始的时候研究了一下 <a href="http://m.tudou.com" target="_blank">Tudou手机版</a> ，可它哪并没有实现在线播放，因为视频地址是 http 协议的。参看了许多文章，终于了解到要用 RTSP 、MMS 这类。

RTSP 有一个来自 Apple 的开源项目：<a href="http://dss.macosforge.org/" target="_blank">Darwin Streaming Server (DSS)</a>

DSS 是跨平台的软件，可以在Linux、Mac OSX 或 Windows 等上面部署。

## 一、DSS Windows 安装教程

* 从：<a href="http://dss.macosforge.org/downloads/DarwinStreamingSrvr5.5.5-Windows.exe" target="_blank">http://dss.macosforge.org/downloads/DarwinStreamingSrvr5.5.5-Windows.exe</a> (只有5.5的) 这里下载 DSS for Windows
* 下载后解压，会看到一个 Install.bat 的文件，直接运行它就会安装到 `C:\Program Files\Darwin Streaming Server` 并还会在 系统服务里面加一个号 `Darwin Streaming Server` 的服务程序，这个就是 DSS 的 RTSP 服务器。
* 接下来你要安装 Perl 解释器，可以从 <a href="http://www.perl.org/get.html" target="_blank">http://www.perl.org/get.html</a> 这里下载到，然后安装
* 装好 Perl 后就可以在 CMD 下面使用 perl **.pl 来运行程序了
* 接下来在CMD下面做如下操作：
```bash
# 根据提示创建 WebAdmin 的账号和密码
C:\Program Files\Darwin Streaming Server> perl WinPasswdAssistant.pl
# 运行 WebAdmin 管理器
C:\Program Files\Darwin Streaming Server> perl streamingadminserver.pl
# 现在可以打开 http://127.0.0.1:1220/ 来对 DSS 服务器进行管理了
```
* 在 DSS WebAdmin 里面修改 General Settings -> Media Directory ，将它改为你的 Media 目录，当然也可以使用默认的，把自已的视频文件放到 `C:\Program Files\Darwin Streaming Server\Movies` 里面
* 现在你可以使用 <a href="http://www.apple.com/quicktime/download/" target="_blank">QuickTime</a> 或 <a href="http://www.videolan.org/vlc" target="_blank">VLC</a> 打开 <span style="color: #339966;">rtsp://127.0.0.1:554/sample_100kbit.mp4</span><strong> </strong>来测试视频了，<span style="color: #808080;">（注 sample_100kbit.mp4 是 DSS 5.5.5 自带的视频）</span>

## 二、如何将自己的视频转换为流媒体格式？

研究这个东西费了我好大的劲，一开始不知道视频还有专门针对流媒体的，以为只要用 MediaCoder 将视频转换成合适的格式，如：MPEG4 + AAC + MP4 / MPEG4 + AAC + 3GP 就可以放了，反复放到服务器上面去测试，VLC 和 QuickTime 都没法打开。于是又用工具打开 DSS 自带的几个示例视频看它们的格式，反复转换试不同的视频和音频编码和外壳，还是不行...郁闷死我了

在 DSS 的邮件列表里面找了找相关的文章，发现有讲好像要用特别的工具对视频 `hint` 一下，然后就可以在 RTSP 上面用了，说可以用 QuickTime Pro 或 VLC 来转换，我用 VLC 试了一下，文件菜单一个叫&ldquo;流(<span style="text-decoration: underline;">s</span>)&rdquo;的功能，但试了还是不行，没看到文件有变动过。

于是再沿着 Hint 关键词在 Google 上面找文章，找到了 Nokia 论坛里面，看到这篇文章：<a href="http://discussion.forum.nokia.com/forum/showthread.php?t=125540" target="_blank">http://discussion.forum.nokia.com/forum/showthread.php?t=125540</a> 里面有说可以使用 <a href="http://www.videohelp.com/tools/mp4box " target="_blank">Mp4box</a> 对视频进行 hint

于是我在 <a href="http://www.videohelp.com/tools/mp4box" target="_blank">http://www.videohelp.com/tools/mp4box</a> 这里下载到了mp4box （不用下载GUI的，直接用命令行操作就好了，只用一条命名）

下载到到解压出后会有个叫 `mp4box.exe` ，用它在命令行下面运行

```bash
C:\Program Files\Darwin Streaming Server\Movies> mp4box mymovie.mp4 -hint
```

出现结果：

```bash
Hinting file with Path-MTU 1450 Bytes
Hinting track ID 201 - Type “mp4v:mp4v” (MP4V-ES) - BW 33 kbps
Hinting track ID 101 - Type “mp4a:mp4a” (mpeg4-generic) - BW 64 kbps
Saving mymovie.mp4: 0.500 secs Interleaving
```

流媒体视频就转换好了，现在文件大小就会有变动，变大了一些。

然后，再用 VLC 或&nbsp; QuickTime 打开 <span style="color: #339966;">rtsp://127.0.0.1:554/mymovie.mp4</span> 试试能否播放吧！如果你有3G手机，可以直接用手机打开这个地址试一下。


## 三、附加资源


* <a href="http://howtoforge.org/apples-darwin-streaming-server-on-centos-5.2" target="_blank">Apple&rsquo;s Darwin Streaming Server On Centos 5.2</a> (如何在 CentOS 5.2 下面安装DSS)


