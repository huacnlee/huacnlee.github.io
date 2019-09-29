---
layout: post
title: "再论缓存删除 - 用正则匹配 CacheKey 批量删除缓存"
date: 2009-05-21 19:10
comments: true
categories:
- 缓存
- .NET
- C#
- Rails
- Ruby
- Memcached
---
接上次的话题《<a href="/blog/group-caches-with-tag-or-namespace" target="_blank">缓存方式扩展，缓存Tag(命名空间)的实现</a>》，给 cache item打上了tag标签，这个方式是不错，今天再来一个更好的方法。<br />这个方式是模仿 <a href="http://www.rubyonrails.com" target="_blank">Ruby on Rails</a> 里面自带的功能

### 在 Ruby on Rails 里面，我们可以:

```ruby
# 写入将page1,page2的数据写入缓存
Rails.cache.write('posts/page/1',@page1)
Rails.cache.write('posts/page/2',@page2)
Rails.cache.write('posts/index',@index)
# 用 posts/page/* 来删除 posts/page/1,posts/page/2
Rails.cache.delete('posts/page/*')
# 用 posts/* 来删除 posts/index,posts/page/1,posts/page/2
Rails.cache.delete('posts/*')
```

<p>从上面的代码中看出这种删除实在是非常的实用，我们可以根据<strong>类别层次级</strong>为缓存起key的名称，如</p>

* <span style="color: #008080;"><strong>home/index</strong></span> - <span style="color: #808000;">首页的index视图</span>
* <strong><span style="color: #008080;">posts/show/1</span></strong> - <span style="color: #808000;">查看文章页面ID为1的文章</span>

然后根据层次级来删除缓存。

这种按 * 号匹配删除一组缓存的方式在实际的应用中需求非常频繁，如《<a href="http://huacn.blogbus.com/logs/39240733.html" target="_blank">缓存方式扩展，缓存Tag(命名空间)的实现</a>》里面提到的列表缓存清除，你不确定具体有多少页，但这些页面都得清除，哪就得用<span style="color: #ff0000;"><strong>Tag</strong></span>或<span style="color: #ff0000;"><strong>正则匹配</strong></span>的方式来清除了。

### 如图：

<img src="http://farm4.static.flickr.com/3367/3550693852_868742b518_o.png" border="0" width="516" height="390" />

如上图所示，我们将所有的Cache Key存入 <span style="color: #333399;"><strong>CacheKeys</strong> </span>中，<span style="color: #333399;"><strong>CacheKeys </strong></span>以静态的方式存放于进程内存里面，当 <span style="color: #ff6600;">DeleteByMatch</span> 调用的时候，用正则的从 <span style="color: #333399;"><strong>CacheKeys</strong> </span>里面匹配出相关的 <span style="color: #008080;"><strong>Keys</strong> </span>列表，再通过循环删除 <a href="http://www.danga.com/memcached/" target="_blank"><strong><span style="color: #993300;">Memcached</span></strong></a> 中的缓存。

### .NET 里面实现代码：

```c#
/**
 * Delete cache by regex match
 * Author: Jason Lee
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Memcached;

public class Caches
{
    ///
    /// 用于存放所有cache keys，以便于用正则的方式删除缓存
    /// 如： place/home/page/1 ，以后用 place/home/page/* 来删除 place/home/page/1,place/home/page/2 ... place/home/page/n
    ///
    private static List<string> cacheKeys = new List<string>();
    ///
    /// 将 Key 存入 cacheKeyStore
    ///
    ///
    private static void saveKeyToCacheKeys(string key)
    {
        if (!cacheKeys.Exists(c => c == key))
        {
            cacheKeys.Add(key);
        }
    }

    ///
    /// 删缓存
    ///
    ///
    /// 是否用正则匹配
    public static void Remove(string key, bool match)
    {
        if (!match)
        {
            // Memcached 虚构的自已实现一个
            Memcached.Remove(key);
            // 写 Cached 操作日志
            Debug.Log("Cache remove " + key);
        }
        else
        {
            Regex reg = new Regex(key, RegexOptions.IgnoreCase);
            List<string> matchedKeys = cacheKeys.FindAll(c => reg.IsMatch(c));
            foreach (var k in matchedKeys)
            {
                Memcached.Remove(k);
                Debug.Log("Cache remove " + key);
            }

        }
    }
}
```

其实整个过程还是比较简单的，这里有个细节要注意！

我在示例代码中所提供的方式是直接静态的方式存放于进程缓存的，这种方式效率很高。但有两个缺陷：

* 空间问题，当 Cache Key 过多时就需要考虑换地方存放这个列表了，不然 IIS 进程内存超支哪就要 crash 掉。
* 多个网站同步问题，当有两个 Web 应用程序使用相同的缓存时，如：news.tmitter.com,share.tmitter.com，IIS两个网站之间内存不是共享的，这里就需要考虑缓存同步的问题了。

以上两个问题目前我已有解决办法，不在本文讨论范围内，以后再说。