---
layout: post
title: "Rails ActiveModel callback 那些会调用 callback 那些不会"
date: 2012-02-28 14:12
comments: true
categories: 
- Rails
- Ruby
- ActiveModel
- Callback
---
今天才关注到这个文档，以前只是有个大概的印象...

Rails Model 有许多 callback 事件 (`before_save`, `after_save`, `before_create`, `after_create` ...)，可以让我们在数据更新的前后定义一些动作.
比如我们偶尔会这样：

```ruby
class Post
  before_create do
    self.slug = self.title.safe_slug if self.slug.blank?
  end
end
```

但是有一些动作是不会执行 callback 事件的，如下面的列表

<!-- more -->

## 会调用 callback

* create
* create!
* decrement!
* destroy
* destroy_all
* increment!
* save
* save!
* save(:validate => false)
* toggle!
* update
* update_attribute
* update_attributes
* update_attributes!
* valid?

## 而下面这些是不会调用 callback 方法的

* decrement
* decrement_counter
* delete
* delete_all
* find_by_sql
* increment
* increment_counter
* toggle
* touch
* update_column
* update_all
* update_counters

