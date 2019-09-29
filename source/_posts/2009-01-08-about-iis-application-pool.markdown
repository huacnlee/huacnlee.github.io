---
layout: post
title: "修改 IIS 应用程序池设置需谨慎！"
date: 2009-01-08 20:06
comments: true
categories:
- IIS
- 性能
- Web服务器
- 部署
---
<p>最近公司的项目要上一个论坛，于是选用了<a href="http://www.discuz.net" target="_blank">Discuz 7</a> 的，新版的做得很不错，用户体验也很棒。但由于这东西是为各类使用者开发的，所以在于性能方面需要做一定的优化。</p>
<p>ASP.NET 做优化目前我还是比较熟悉了，但php方面还得慢慢学。</p>
<p>我的目标是一台服务器扛 <strong><span style="color: #ff6600;">1000 Request/s</span></strong> 。</p>
<p>因为目前项目发展还在初期，所以服务器只用的一台，所以只能让<a href="http://www.discuz.net" target="_blank">Discuz 7</a> 在IIS上面跑。</p>
<p>目前服务器配置情况：</p>
<ul>
<li><span style="color: #666699;">CPU：至强4核 双CPU 2.33G</span></li>
<li><span style="color: #666699;">内存：8G</span></li>
<li><span style="color: #666699;">OS：Windows Server 2003</span></li>
<li><span style="color: #666699;">Web服务：IIS6.0 + <a href="http://www.iis.net/php" target="_blank">FastCGI</a></span></li>
<li><span style="color: #666699;">PHP版本：5.2.8 no thread safe</span></li>
<li><span style="color: #666699;">数据库：SQL Server 2005 + MySQL 5.1</span></li>
</ul>
<p>目前我的 ASP.NET 的页面用 <a href="http://www.danga.com/memcached/" target="_blank">Memcached</a> 做过页面缓存以后，用 <a href="http://httpd.apache.org/docs/2.0/programs/ab.html" target="_blank">ApacheBench</a> 测试可以跑到 <span style="color: #ff6600;">1500 Request/s</span> 左右，这个值还是比较满意了。但PHP在IIS上面跑我就不知道会怎么样了，经过反复的改配置，再测试，依然还是只能跑到 3<strong><span style="color: #ff6600;">00 Request/s</span></strong> 不到，而且会有很多<span style="color: #ff0000;">失败</span>的（有时候接近<strong><span style="color: #ff6600;">50%</span></strong>）。</p>
<p>今天再次做配置的时候发现，原来出现请求失败的原因在于 IIS 应程序池的配置不当。因为当然都做反复的测试，所以一直没有在意到问题会出在这里。</p>
<p>出错的配置：</p>
<ul>
<li><span style="color: #ff0000;">回收工作请求：35000</span></li>
<li><span style="color: #ff0000;">请求列队限制：4000</span></li>
<li><span style="color: #ff0000;">Web园：4</span></li>
</ul>
<p>于是改回去：</p>
<ul>
<li><span style="color: #008000;">回收工作请求：关</span></li>
<li><span style="color: #008000;">请求列队限制：1000</span></li>
<li><span style="color: #008000;">Web园：1</span></li>
</ul>
<p>再次用 AB 测试：<span style="color: #333399;">ab -n 10000 -c 1000 http://forum.test.com/phpinfo.php</span></p>
<p>结果：</p>

```bash
Server Software:        Microsoft-IIS/6.0
Server Hostname:        forum.ytrip.com.tw
Server Port:            80

Document Path:          /test.php
Document Length:        41767 bytes

Concurrency Level:      1000
Time taken for tests:   5.625 seconds
Complete requests:      10000
Failed requests:        0
Write errors:           0
Total transferred:      419420000 bytes
HTML transferred:       417670000 bytes
Requests per second:    1777.78 [#/sec] (mean)
Time per request:       562.500 [ms] (mean)
Time per request:       0.563 [ms] (mean, across all concurrent requests)
Transfer rate:          72815.97 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.8      0      16
Processing:   156  542  80.4    547     766
Waiting:       63  157  58.6    141     453
Total:        156  542  80.4    547     766

Percentage of the requests served within a certain time (ms)
  50%    547
  66%    563
  75%    563
  80%    578
  90%    578
  95%    641
  98%    703
  99%    750
 100%    766 (longest request)
```
<p>当然，这个程序只是简单的 ，所以可以跑到 <strong><span style="color: #ff6600;">1777 Reuqest/s</span></strong>，但主最要的是没有出现请求失败的了，一个都没有！于是再次测试 Discuz 的一个列表页面，结果只能跑到 <strong><span style="color: #ff6600;">230 Request/s</span></strong>，但一样没有错误出现。</p>
<p>总结来说，在服务器做性能优化是配置这些数字还是要慢慢测试才能找到适合自已服务器的，<span style="color: #ff0000;">重要的一点是一定要改一点测试一下，千万别同时改好多再测试！</span></p>
<p>Discuz 的优化还得花点时间慢慢弄，不知道为什么，它的缓存方法原理跟我在Asp.NET上面的做方法相似，只是我用Memcached来存，它是存文件的，但速度不会差这么多的，应该再研究研究，就会上去了。</p>
<p>&nbsp;</p>
