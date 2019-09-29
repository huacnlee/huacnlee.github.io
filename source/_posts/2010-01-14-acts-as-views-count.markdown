---
layout: post
title: "Rails 插件 acts_as_views_count - Model访问量延迟统计"
date: 2010-01-14 17:56
comments: true
categories:
- Rails
- Plugin
---
项目有很多时候需要进行统计单篇文章的访问次数，如文章、帖子、图片...
于是在表里面设计一个 `views_count` 字段作为计数器，然后查看页面的时候更新这个字段。
但为了提要效率，一般情况下我们都需要对 `views_count` 的写入数据库做一下延迟，存到缓存里面去，到了一定数量在更新数据库。
为了方便使用，我把之前的方式改写成了一个插件，第一次做 Rails 插件，比较简单

## 项目地址：

[http://github.com/huacnlee/acts_as_views_count](http://github.com/huacnlee/acts_as_views_count)

## 使用例子
<!-- more -->

### Models

```ruby
class Post < ActiveRecord::Base
  acts_as_views_count
end

class Topic < ActiveRecord::Base
  # set delay save to db with 30
  acts_as_views_count :delay => 30
end
```

### Controllers

```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
    # update views_count
    @post.update_views_count
  end
end
```


### Views

```erb
<div id="post_show">
  <h1><%= @post.title %></h1>
  <div class="info">
    <span><%= @post.views_count_s %> views</span>
    <span><%= @post.comments_count %> comments</span>
  </div>
</div>
```
