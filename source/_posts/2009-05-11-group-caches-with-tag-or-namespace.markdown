---
layout: post
title: "缓存方式扩展，缓存Tag(命名空间)的实现"
date: 2009-05-11 08:00
comments: true
categories:
- 缓存
- .NET
- Rails
- Ruby
- Memcached
---
<p>用过 <a href="http://www.rubyonrails.org" target="_blank">Ruby on Rails</a> 以后，从里面学到了很多很不错的应用，如《<a href="http://huacn.blogbus.com/logs/38925062.html" target="_blank">在Asp.net中实现类似Rails的 Flash[:notice] 的功能</a>》，这里我实现<strong>缓存标签</strong>（也可以叫<strong>缓存命名空间</strong>）。</p>
<p>我们经常会遇到需要<span style="color: #ff6600;">批量删除某一类</span>的缓存，如 <span style="color: #008080;"><span style="font-size: 12px;">posts/p/1,posts/p/2,posts/p/3</span></span> 这几个 CacheKey 都是属于文章列表的，我们想通过 posts 来删除所有页的缓存，这个就是简单的 Get Set Delete 这类的功能操作的了。</p>
<p>在 <a href="http://www.rubyonrails.org" target="_blank">Ruby on Rails</a> 里面，缓存可以用 <span style="color: #008080;"><span style="font-size: 12px;">posts/p/*</span></span> (正则的方式) 来删除一系列的缓存，我这里没有做那么复杂，只是简单的实现给Caches加标签，分类，在按照分类来删除一些列缓存。</p>
<p>我这里是模仿的 <a href="http://www.djangoproject.com" target="_blank">Django</a> 的一个实现，看这个地址 《<a href="http://stepsandnumbers.com/archive/2009/04/11/setting-and-delete-cache-in-django-with-tags/" target="_blank">Setting and deleting cache in Django with tags</a>》，这个的实现方式我整理了一下，做到了 <a href="http://code.google.com/p/pulog" target="_blank">Pulog</a> 里面，代码在<a href="http://code.google.com/p/pulog/source/browse/trunk/imtx/utils/caches.py?spec=svn234&amp;r=233" target="_blank">这里</a>。</p>
<p>看看我在.NET里面的实现</p>

### Caches 类源代码

```c#
/*
 * Cache 接口，实现tag功能，key前缀
 * Logs,Memcached 在这里没有公开，只是一些具体的实现，你可以根据已经情况实现一下
 * Logs.Debug 表示写debug日志
 * Memcached 里面的Get,Set,Remove也需要自已实现
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public class Caches
{

    private static string GenerateKey(string key)
    {
        return "project_name/" + key;
    }

    ///
    /// 取缓存
    ///
    ///
    ///
    public static object Get(string key)
    {
        key = GenerateKey(key);

        object obj = Memcached.Get(key);

        if (obj != null)
        {

            Logs.Debug("Cache hit " + key);
        }

        return obj;
    }

    ///
    /// 存缓存
    ///
    ///
    ///
    public static void Set(string key, object value)
    {
        key = GenerateKey(key);

        Memcached.Caches.Set(key, value);

        Logs.Debug("Cache set " + key);
    }

    ///
    /// 存缓存，带Tag，用于做类似命名空间的管理
    ///
    ///
    ///
    ///
    public static void Set(string key, object value, string[] tags)
    {
        if (tags.Length == 0)
        {
            Set(key, value);
        }

        for (int i = 0; i < tags.Count(); i++)
        {
            tags[i] = "tags/" + tags[i];
        }

        List<string> tagList = new List<string>();
        foreach (string tag in tags)
        {
            object tagObj = Get(tag);
            if (tagObj != null)
            {
                tagList = (List<string>)tagObj;
            }

            tagList.Add(key);
            Set(tag, tagList);
        }

        Set(key, value);
    }


    ///
    /// 删缓存
    ///
    ///
    public static void Remove(string key)
    {
        key = GenerateKey(key);

        Memcached.Remove(key);

        Logs.Debug("Cache remove " + key);
    }

    ///
    /// 根据 Tag 删除缓存
    ///
    ///
    public static void RemoveByTags(string[] tags)
    {
        for (int i = 0; i < tags.Count(); i++)
        {
            tags[i] = "tags/" + tags[i];
        }

        List<string> tagList = new List<string>();
        foreach (string tag in tags)
        {
            object tagsObj = Get(tag);
            if (tagsObj != null)
            {
                tagList = (List<string>)tagsObj;
                foreach (string key in tagList)
                {
                    Remove(key);
                }
            }

            Remove(tag);
        }
    }
}
```

### 使用的时候

```c#
//写缓存
Caches.Set("posts/p/1",posts,new string[]{ "posts" });  //第1页 写缓存
Caches.Set("posts/p/2",posts,new string[]{ "posts" });  //第2页 写缓存
Caches.Set("posts/p/3",posts,new string[]{ "posts" });  //第3页 写缓存


//取
Caches.Get("posts/p/1"); //取 第1页

//删除所有页
Caches.RemoveByTags(new string[]{"posts"});
```

这个Tag也就类似博客系统的Tag功能，给Cache设定1个或多个Tag，删除的时候就可以根据Tag删除Tag下面所有 CacheKey的缓存。