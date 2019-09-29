---
layout: post
title: "跪求 分组相同且连续的记录 ，并取Min Max的SQL查询的方法"
date: 2009-02-27 04:16
comments: true
categories:
- SQL
- 数据库
---
<p>今天在公司做IP数据库转换功能，目的是将网上很容易找到的IP数据库整理出来，与公司的地区数据库相关联。网上流传得最多的就是QQ纯真版的 <a href="http://www.google.com/search?q=QQWry.dat&amp;ie=utf-8&amp;oe=utf-8&amp;aq=t&amp;rls=org.mozilla:zh-CN:official&amp;client=firefox-a" target="_blank">QQWry.dat</a> 这个数据库。但是它数据库里面地区我们拿来没法用，如：四川省成都市某某某网吧、四川省某某医院、北京某某街某某号 等等，省、市、具体位置是连在一起的，无法找出规律把省、市分离出来（因为我要做的功能只用具到城市就可以了，类似 <a href="http://www.koubei.com" target="_blank">口碑</a>、<a href="http://www.chinahr.com" target="_blank">中华英才网</a> 哪种自动取得访问者所在城市并进入城市的网站的功能）。</p>
<p>后面另外找到了一个mdb的数据库忘了哪儿下载的了，总之我把它导出成 <a href="http://python-snippets.googlecode.com/svn/trunk/project/ipdata2sqlite/ipdata.txt" target="_blank">文本格式</a> 了，然后用python分析字符串，并跟自已的地区数据库做关联，最终再存入数据库。可没想到这玩意儿既然有<span style="color: #ff0000;">23万多条</span>记录，妈呀，这怎么能拿来查找。而且我功能是首页，最起码要求查询速度要在<span style="color: #008000;"><strong>100ms</strong></span>以内。而这23万多条，就算我全放内存里面也没法找得哪么快。</p>
<p>结构是这样：</p>


```
id       start        end          name        area_id          area_type
1        1            4            Chengdu     8                2
2        5            6            Chengdu     8                2
3        7            16           Luzhou      9                2
4        17           17           Luzhou      9                2
5        18           22           Chengdu     8                2
6        23           23           Shanghai    17               1
7        24           29           Shanghai    17               1
```


<p><strong>start</strong> 与 <strong>end </strong>字符串IP转成整形的值，<span style="color: #008000;"><strong>1-2、3-4、5、6-7</strong></span>其实是可以分别组合起来的，只用留下<span style="color: #ff0000;">最小的 start </span>与<span style="color: #ff0000;">最大的end</span>就可以了。</p>
<p>正确的结果应是：</p>

```
id       start        end          name        area_id          area_type
1        1            6            Chengdu     8                2
3        7            17           Luzhou      9                2
5        18           22           Chengdu     8                2
6        23           29           Shanghai    17               1
```

<p>我开始时候试着用 <span style="color: #000080;">Group by name</span> 查询再 <span style="color: #000080;">min(start) max(end)</span> 但最终发现这样做法数据有错，它把 <span style="color: #ff0000;">所有成都的记录</span>都组合到了一起。</p>
<p>错误的结果：</p>

```
id       start        end          name        area_id          area_type
1        1            22           Chengdu     8                2
3        7            17           Luzhou      9                2
6        23           29           Shanghai    17               1
```

<p>&nbsp;</p>
<p>我想了很久都没想出访怎么写SQL，最后只好还是用python写循环，判断前一行与当前行，再做处理，最终还是弄出来了。不过很想知道有没有好的方法可以直接用SQL里面类似group by的方式弄出来。</p>
