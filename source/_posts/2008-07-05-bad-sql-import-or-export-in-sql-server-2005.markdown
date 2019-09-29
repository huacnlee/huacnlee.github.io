---
layout: post
title: "SQL Server2005的数据导入与导出 烂！"
date: 2008-07-05 06:29
comments: true
categories: 
- SQL Server
- 数据库
- Tools
- 技巧
---
<p>在公司我们网站项目组，除了基本的开发工作，我是还要负责网站发布与服务器维护工作的。</p>
<p>最近手头的项目因为有很多变动，所以很长一段时间没有发布到服务器上了，数据库一直以来是一个比较麻烦的问题，主要是数据结构与数据的合并问题。而且这边项目使用了三台发布服务器（<strong>开发测试</strong>,<strong>内部测试</strong>,<strong>发布服务器</strong>）。所以，数据库的发布成了一个比较难的事情。</p>
<p>之间的做法是记<span style="color: #339966;">存储过程</span>与<span style="color: #339966;">数据结构更新的SQL语句</span>，但因为事情较多，而且几个人在动数据库，所以这种做法没能很好的执行，到了最后基本上没有记录了。</p>
<p>今天到发布项目的时候了，现在是发布到内部测试服务器，我准备了一天的时间来做这个事情（<span style="color: #666699;">对于运维这工作能力还不行呀！</span>）。</p>
<p><span style="color: #ec1217;">我就一直没有搞懂，为什么SQLServer 没有自带<strong>数据库结构对比</strong>与<strong>数据同步</strong>的功能呢？这种功能经常都会用到的，它自带了导入与导出功能，但垃圾的没话说，很多细节把自已弄死了。</span></p>
<p>因为之间有接触数据库比较工具：<a href="http://www.red-gate.com/products/SQL_Compare/index.htm" target="_blank">Red Gate SQL Compare</a>，也试过一次效果比较好，可是现在这个工具试用期早就已经过了。</p>
<p>刚开始的时候硬着头皮去看记录，但这样实在不是一个有效的方法，很有可能会漏掉。后面想想，应该有类似的工具吧，于是找了找 <a href="http://www.google.com/search?hl=en&amp;client=firefox-a&amp;rls=com.ubuntu%3Aen-US%3Aunofficial&amp;hs=wyR&amp;q=SQL%E7%BB%93%E6%9E%84+%E5%AF%B9%E6%AF%94%E5%B7%A5%E5%85%B7&amp;btnG=Search" target="_blank">SQL结构对比工具</a>发现了一个叫 <a href="http://www.sqldelta.com" target="_blank">SQL Delta</a> 的软件，于是试了一下，效果很不错，感觉比 <a href="http://www.red-gate.com/products/SQL_Compare/index.htm" target="_blank">Red Gate SQL Compare</a> 更好用，很快两个服务器的数据结构就搞定了。</p>
<p>接下来是数据，我开始的时候没有发现 <a href="http://www.sqldelta.com" target="_blank">SQL Delta</a> 也有数据同步功能，所以用SQLServer的导出功能导的，导入与导出还算比较顺利，可当我在测试的时候才发现，数据里面的<span style="color: #ec1217;">自动编号与关联表的对应乱了</span>！原因很简单，因为自动编号原因。我记得在SQLServer的导出时有个选项是是否开启自动编号这种功能的，当时也有处理的，可数据还是乱了。我不知道是不是因为我没有搞明白的原因，但目前看来只有用三方工具来搞定了。</p>
<p>再次看了看 <a href="http://www.sqldelta.com" target="_blank">SQL Delta</a>，发现它也有数据比较功能，使用也很简单，几下数据就全弄好了。</p>
<p>整个算下来，比预计的时程提前了好几个小时，也完成得很完美，这下心里哪个舒坦！之间的担忧全消失了。哈哈</p>
<p><strong><span style="font-size: medium;">相关资源：</span></strong></p>
<ul>
<li><span style="color: #000080;"><strong>Red Gate SQL Tool</strong></span>： <a href="http://www.red-gate.com/products/index.htm" target="_blank">http://www.red-gate.com/products/index.htm</a></li>
<li><span style="color: #000080;"><strong>SQL Delta</strong></span>：<a href="http://www.sqldelta.com/" target="_blank">http://www.sqldelta.com/</a></li>
</ul>
