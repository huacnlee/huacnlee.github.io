---
layout: post
title: "Vista 与 Leopard 共存安装经验"
date: 2008-06-01 06:49
comments: true
categories: 
- Mac
- Leopard
- Vista
- 教程
---
<p>前几天在 <a href="http://www.verycd.com" target="_blank">Verycd</a> 上看到 <a href="http://www.verycd.com/topics/219096/" target="_blank">Leopard</a>(iATKOS_v1.0i) 的下载，一直很想体验一下Mac osx系统的感觉，正好看介绍上支持的硬件与我的基本相符，于是我花了两天的时间下载了这个2G大的安装包，正好朋友买了几张DVD的刻录盘，我很快刻上了（这个过程中由于不小心，浪费了两张，郁闷）。</p>
<p>我电脑情况：</p>
<p><a href="http://product.it168.com/detail/doc/183028/detail.shtml" target="_blank">Sony CR31</a> 与 Vista Home 版,具体参数请点击连接看配置,我分了四个区，另外还有几十G空着&nbsp;</p>
<p>放着胆子在半夜安装Leopard,我下载这个版本是国外高手破解的Apple支持Intel Core2平台的系统，因为目前电脑中有很多重要文件，所以我一直很小心地操作着。很快进入了Leopard的安装界面，WOW Cool！心里哪个激动呀。不过全英文的，而且好像Apple使用的名词跟微软的用法不一样，很多都不明白意思，只能靠着我哪水水的Chiglish(中式英文)试着点，很快我搞明白了，在上面的菜单中选择utilities-disk，再utilities-disk里选择以前我放文档的D盘(文件已经Vista下转到了另外一个盘里) ，选择里面怪怪(Erase)的单词将D盘换成了Mac OS Extended(Journaled)的分区格式,接下来退出这个utilities-disk，回到安装界面，跟着向导很快开始显示安装进度了，一切都是哪么的&ldquo;顺利&rdquo;（其实这个时候我的衣服都才洗了一半），大概等了半个小时左右，安装完成了。</p>
<p>重启电脑以后没多久就再次显示OSX的启动界面，我还以为真的完了，没想到还有一个安装，就是初始化系统，于是跟着向导输入个人信息，创建用户，最后的时候还要求上网创建Apple用户，我当然没有建了，D版的，完成后再次重启。这次顺利的进入了期待以久的Leopard(感觉吃到&ldquo;葡萄&rdquo;时，也没有哪么好吃) ，这个版本对我电脑支持还算很不错了，除了声音、网络、显卡都有支持，而且直接就能上网了。不过...这个显卡只是普通的支持，只有1024*768分辨率，这个没法接受的，我的宽屏的，现在看起来全完是拉长的...后面我在网上找了好久，一直没有找到支持的驱动，哎。</p>
<p>没有办法，只有这样先用着，慢慢找找。这过程中，我顺便试了一下OSX下面的一些体验和软件，发现一个有趣的东西，OSX很多软件都是共享软件，而且好像都比较贵，全是几十美刀的。<a href="http://www.firefox.com" target="_blank">Firefox</a>当然是第一个安装的，接下来是输入法,Leopard默认带有拼音和五笔，还算可以，但我下载了一个Python开发的开源输入法<a href="http://fit.coollittlethings.com/" target="_blank">Fun Input Toy</a>，很不错，很好用。我再装上<a href="http://im.qq.com/qq/mac/" target="_blank">QQ for mac</a>，哎，还没<a href="http://www.pidgin.im" target="_blank">Pidgin</a>做得好，只有基本的聊天功能。另外再装了<a href="http://www.mplayerhq.hu/" target="_blank">MPlayer</a>虽然没有安装显卡驱动，但电影还是一样能放，一样流畅，嘿嘿。发现OSX很爽的一个功能就是窗口切换功能，按F8-F12有一些功能，可以很快速地切换桌面环境与选择窗口，灰常地爽！</p>
<p>另外还有一个大问题就是，我安装的时候是装在D盘的，另外安装的时候因为看不懂，有几个步骤没有做，所以无法引导系统，必须靠我哪张安装盘来引导...这样可不行呀，干久了我光驱不死跷跷呀。&nbsp;</p>
<p>我一直惦记着我的Vista,因为里面装了很多软件，开发工具什么的，要重装又得配置好久，我最怕这个了。</p>
<p>看了网上一些文章，说Vista的光盘里面的Windows PE可以修复Vista引导，于是准备去买一张。可这两天上班没时间去电脑城...今天回家时和同事聊天时得知他有一张，于是借了回来。可没想到这是一张他哪个笔记本的恢复光盘，再次郁闷！！</p>
<p>没有办法了，只好拿朋友的笔记本一边查资料，一边试着修复，照着做了一些，可还是无法直接引导Vista或OSX，这回我把OSX都重装了，还是不行，郁闷郁闷，麻烦麻烦。</p>
<p>真的没法了，我想呀想呀！这次看到一篇文章说激活分区就可以引导了，于是拿朋友的XP安装盘再次启动，发现里面有Windows PE,这时我还以为是Vista的，没想到进了系统后才大失所望，哎！我再回到光盘的DOS环境，找找自带的工具，发现有一个叫Disk Gen的，以前用过，于是打开。Disk Gen列出了我的分区列表（哪个亲切呀），我看到菜单里面有个Active的功能，于是试着把原来的C盘激活，再次重启。</p>
<p>激动人心的时候来了！！！我的Vista启动菜单回来了，我开心，开心呀，不过还没到Vista桌面，心里一直忐忑不安，终于几十秒回，我回到了我的Vista桌面，一切完好无损（除了D盘）。</p>
<p>现在OSX还是无法启动，但回到了Vista，好多东西就简单多了，过几天有心情时再去弄它，哈哈哈&nbsp;</p>
<p><span style="color: #ff0000;"><strong>想安装的朋友注意！！&nbsp;</strong></span></p>
<p>安装前请上<a href="http://www.pcbeta.com" target="_blank">PCBeta</a> 认真看相关文章，我安装的时候就没有认真看，这次能一点没错地回到Vista全是老天保佑(当然也是我小心的原因，嘿嘿)</p>
<ul>
<li>我安装的Leopard下载地址: <a href="http://www.verycd.com/topics/219096/" target="_blank">http://www.verycd.com/topics/219096/</a></li>
<li>另外安装过程可以参考这个：<a href="http://bbs.pcbeta.com/thread-225814-1-19.html" target="_blank">http://bbs.pcbeta.com/thread-225814-1-19.html</a>&nbsp;</li>
</ul>
