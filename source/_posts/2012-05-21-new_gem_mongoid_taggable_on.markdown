---
layout: post
title: "介绍我的 mongoid_taggable_on 这个 Gem - Mongoid Tag 的实现"
date: 2012-05-21 10:58
comments: true
categories: 
- MongoDB
- Mongoid
- Gem
- Rails
- Ruby
---
这个是基于 [Mongoid](http://mongoid.org) 实现的 Tag 功能的 Ruby gem。

老早就搞出来了。目前这个东西已经稳定的在 [720p.so](http://720p.so) 上面跑了很长一段时间，今天公布一下。
其实这类功能在我之前已经有几个，但是经过尝试以后发现他们的太复杂了，不满足我的需求，于是自己实现了一个，基于 Array 字段实现的 Tag 。

## 特点

1. 基于 MongoDB Array 类型字段存储，没有独立的 Tag 表，所以如果想搞 Tag list 需要手工处理；
2. 可以定义任意的 Tag 字段，比如 国家，明星，类型 ... 通通都可以用 Tag 来实现;
3. 自动产生 _list 属性，用于接受或返回字符串以逗号分隔的数据，并转换成数组，同时还支持 (`|，/`斜杠，中文逗号，竖线) 作为分割标记。

<!-- more -->

## 用法

下面以一个 720p.so 上面的 `电影` Model 为例：

```ruby
class Movie
  include Mongoid::Document
  # 引入 mongoid_taggable_on
  include Mongoid::TaggableOn

  # 演员
  taggable_on :actors, :index => false
  # 电影类型
  taggable_on :categories
  # 国家
  taggable_on :countries
  # 语言
  taggable_on :languages

  field :title
  field :summary
end
```

通过上面的定义 Movie model 就有了下面这些属性和方法

```bash
irb> m = Movie.new
irb> m.actor_list = "甄子丹,古天乐,徐静蕾"
irb> m.actors
["甄子丹", "古天乐", "徐静蕾"]
irb> m.country_list = "美国|法国|俄罗斯"
irb> m.countries
["美国","法国","俄罗斯"]
irb> m.country_list = "美国|法国|俄罗斯|中国"
irb> m.country_list_changed?
true
irb> m.country_list_was
"美国|法国|俄罗斯"
```

可以用下面这些方法实现查询

```bash
irb> Movie.tagged_with_on(:actors, "成龙, 李连杰") # 查找同时带有 “成龙” 和 “李连杰” 的电影
irb> Movie.tagged_with_on(:actors, "古天乐, 杨紫琼", :match => :any) # 查找 “古天乐” 或 “杨紫琼” 的电影
irb> Movie.tagged_with_on(:actors, "周杰伦", :match => :not) # 查找不是 “周杰伦” 的电影
```

## 项目地址

[https://github.com/huacnlee/mongoid_taggable_on](https://github.com/huacnlee/mongoid_taggable_on)