---
layout: post
title: "千万别把属性当变量使用"
date: 2009-02-13 04:12
comments: true
categories:
- .NET
- 性能
---
<p>C#里面属性大家都应该用过，因为它可以在get里面写判断，所以有时候用起来很爽！</p>
<p>你是否有把属性当成变量来使用过呢？</p>
<p>最近我发现一个问题，如果你把属性当变量用习惯了将会存在比较大的隐患！来看一段有问题的代码，应该你都有这样写过。我这里以一个缓存的数据为操作为例（当然，我所讲的问题不仅仅只是C#才有，其它语言同样会有类似的问题存在）。</p>

### 有问题的写法

```c#
namespace Application.Helper {

    public class PageCaches {
        private static string readonly cacheKey = "Application.Models.Posts.RelateList";
        // 页面与类的关系二维表，存在缓存中
        public static List<Relate> RelateList{
            get{
                Object obj = Caches.Get(cacheKey);
                if(obj != null){
                    return (List<Relate>)obj;
                }
                else{
                    return new List<Relate>();
                }
            }
            set{
                Caches.Set(cacheKey,value);
            }
        }

        public class Relate{
            public string Key {get;set;}
            public string ClassName {get;set;}
        }

        // 更新PageView
        public static void Add(string pageName,string[] classNames){

            foreach(string className in classNames){
                // 检查是否有存在的，不存才在加入
                if(! RelateList.Exist(a => a.ClassName == className && a.Key == pageName)){
                    RelateList = RelateList.Add(new Relate(){ Key = pageName,ClassName = className});
                }
            }
        }
    }
}
```

<p><span style="color: #ff0000;">注意看 Add() 方法里面的循环！里面有多次操作 RelateList 这个属性，每一次读与取的操作都将会调用到Caches里面的Get 与 Set，这将会使效率低很多！</span></p>
<p><span style="color: #008000;">正确写法应改成，先把 RelateList 放到一个临时变量里面，再对临时变量进行操作，完成后再赋给 RelateList ，这样就只有一次读取，一次写入。</span></p>
<p>当然这种要到了压力测试下面才会发现速度上会有很大的差别！</p>
<p><span style="color: #808080;">这段代码我用 <a href="http://www.intype.info" target="_blank">Intype</a> 写的，所以是不能拿来运行的，可能还有语法错误，还请见谅。</span></p>
