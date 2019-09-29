---
layout: post
title: "Mongoid 没有性能问题"
date: 2012-02-22 10:15
comments: true
categories: 
- Ruby
- MongoDB
- MySQL
- Rails
- ActiveRecord
---
昨天台湾的朋友发布了一篇将 [ruby-china](http://github.com/huacnlee/ruby-china) 代码迁移成从 [Mongoid 迁移成 ActiveRecord](http://blog.yorkxin.org/2012/02/21/migrate-from-mongoid-to-activerecord/) 的文章，其中有提到 Mongoid 效率的问题。我认为多少有些对于 Mongoid 的误解，所以在此撰写这篇文章做一些解释，以免大家误解 Mongoid 效率不好。

## 对比两个不同版本的差距

我昨晚特意下载了他们重构成 MySQL 版本的 [ruby-taiwan](http://github.com/rubytaiwan/ruby-taiwan) 的代码与目前 [ruby-china](http://github.com/huacnlee/ruby-china) 的代码在开发环境下面模拟数据做了一下对比.

### 数据场景

* MongoDb 的数据基本和目前 [Ruby China](http://ruby-china.org) 上面类似，而 MySQL 的测试数据只是简单的添加了足够的条数。
* 开发环境下面，没有开启任何 cache
* ruby-1.9.3-p0-falcon

### 对比结果:

* 话题列表 /topics (15个话题)

```bash
# ActiveRecord
Completed 200 OK in 179ms (Views: 169.0ms | ActiveRecord: 9.2ms)
Completed 200 OK in 177ms (Views: 167.4ms | ActiveRecord: 8.1ms)
Completed 200 OK in 116ms (Views: 105.5ms | ActiveRecord: 8.3ms)
Completed 200 OK in 110ms (Views: 99.2ms | ActiveRecord: 9.6ms)
Completed 200 OK in 191ms (Views: 181.5ms | ActiveRecord: 8.5ms)
Completed 200 OK in 192ms (Views: 180.7ms | ActiveRecord: 10.2ms)

# Mongoid
Completed 200 OK in 192ms (Views: 117.4ms | Mongo: 73.8ms | Solr: 0.0ms)
Completed 200 OK in 378ms (Views: 298.9ms | Mongo: 77.8ms | Solr: 0.0ms)
Completed 200 OK in 214ms (Views: 138.7ms | Mongo: 73.9ms | Solr: 0.0ms)
Completed 200 OK in 185ms (Views: 120.9ms | Mongo: 63.0ms | Solr: 0.0ms)
Completed 200 OK in 186ms (Views: 122.2ms | Mongo: 63.0ms | Solr: 0.0ms)
Completed 200 OK in 207ms (Views: 140.1ms | Mongo: 66.0ms | Solr: 0.0ms)
```

* 话题查看页面 /topics/:id *27条回复的场景*

由于两边 Markdown 的算法不同，我把 Markdown 功能关闭了的，其他逻辑几乎相同

```bash
# ActiveRecord
Completed 200 OK in 283ms (Views: 263.2ms | ActiveRecord: 5.5ms)
Completed 200 OK in 282ms (Views: 260.4ms | ActiveRecord: 5.8ms)
Completed 200 OK in 284ms (Views: 262.6ms | ActiveRecord: 5.3ms)
Completed 200 OK in 283ms (Views: 262.7ms | ActiveRecord: 5.0ms)
Completed 200 OK in 191ms (Views: 170.3ms | ActiveRecord: 5.1ms)
Completed 200 OK in 195ms (Views: 174.5ms | ActiveRecord: 5.3ms)

# Mongoid
Completed 200 OK in 119ms (Views: 93.6ms | Mongo: 5.5ms | Solr: 3.2ms)
Completed 200 OK in 176ms (Views: 150.8ms | Mongo: 6.0ms | Solr: 3.3ms)
Completed 200 OK in 115ms (Views: 90.9ms | Mongo: 6.6ms | Solr: 3.4ms)
Completed 200 OK in 115ms (Views: 91.9ms | Mongo: 6.4ms | Solr: 3.7ms)
Completed 200 OK in 119ms (Views: 93.4ms | Mongo: 5.0ms | Solr: 6.1ms)
Completed 200 OK in 121ms (Views: 97.9ms | Mongo: 5.6ms | Solr: 3.3ms)
```

以上两个页面的测试数据表示，ActiveRecord 并没有 [@xdite](http://twitter.com/xdite) 声称的从 400ms 减少到 90ms 这么大的差距，虽然 Mongoid 确实是有一些慢，但是差距实际上是不大的。

## 实际 ruby-china.org 产品环境的运行数据 (有 cache)

```bash
Started GET "/topics/777" (58条回复)
Completed 200 OK in 107ms (Views: 82.9ms | Mongo: 23.3ms | Solr: 0.0ms)
Completed 200 OK in 121ms (Views: 33.7ms | Mongo: 27.5ms | Solr: 0.0ms)
Completed 200 OK in 135ms (Views: 48.4ms | Mongo: 26.8ms | Solr: 0.0ms)

Started GET "/topics"
Completed 200 OK in 104ms (Views: 80.5ms | Mongo: 22.1ms | Solr: 0.0ms)
Completed 200 OK in 108ms (Views: 83.9ms | Mongo: 22.7ms | Solr: 0.0ms)
Completed 200 OK in 107ms (Views: 82.9ms | Mongo: 22.5ms | Solr: 0.0ms)
Completed 200 OK in 143ms (Views: 92.2ms | Mongo: 49.1ms | Solr: 0.0ms)
Completed 200 OK in 108ms (Views: 84.5ms | Mongo: 22.3ms | Solr: 0.0ms)
```

## 之前慢的原因解释

之前 ruby-china 某个时期在开发环境下面确实非常慢，但那个原因是下面几个

1. [will_paginate](https://github.com/mislav/will_paginate) 由于不支持 MongoDb 的分页方式，所以每次分页都是 `Model.all` 以后，以 Array 来分页的，所以这个是之前性能的罪魁祸首,[参见](https://github.com/lucasas/will_paginate_mongoid)；
2. Mongoid 的 eager loading 需要手动配置 `identity_map_enabled: true` 才会有效果；
3. 之前 Rails 3.1 环境确实比较慢，已进入 Rails 3.2 已经感觉是非常明显的。

## 总结

总的来说，MongoDb 是非常不错的，而 Mongoid 长远来看也是值得使用的 Gem，虽然目前阶段它还不够完美，但是也不至于我们将他抛弃。
我目前对于 MongoDb 的 `schema-less` 特性目前也是我比较困扰的地方，数据结构变化需要非常小心，这个需要经验。
请不要误解 Mongoid 有性能问题。

