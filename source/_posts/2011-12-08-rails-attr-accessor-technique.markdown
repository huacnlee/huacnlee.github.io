---
layout: post
title: "分享 attr_accessor 的使用技巧"
date: 2011-12-08 21:49
comments: true
categories: 
- Ruby
- Rails
---
<p>这个是这<a href="http://ruby-china.org/topics/376" target="_blank">周二杭州 Ruby Tuesday</a> 扯出来的&nbsp;<br />比如这样的场景，你又个 Post ，它有 tags 的熟悉，里面用 Array 存放多个 tag，但是页面上编辑的时候我们可能会要用户输入以逗号隔开的方式提交多个 tag （比如： ruby, rails, python ）然后保存的是将这个数据分割为数组保存。&nbsp;<br />代码就像这样，只是我以前的写法。</p>

```ruby
class Post
  include Mongoid::Document
  field :title
  field :body
  filed :tags, :as => Array, :default => []

  attr_accessor :tag_list

  before_save :split_tags
  def split_tags
    if !self.tag_list.blank?
      self.tags = self.tag_list.split(",")
    end
  end
end
```
<!-- more -->
<p>而且我还需要在 Controller 里面修改的时候将 tags 转换为逗号分隔的 tag_list</p>
```ruby
class PostsController < ApplicationController
  def edit
    @post = Post.find(params[:id])
    @post.tag_list = @post.tags.join(",")
  end
end
```

```erb
<% form_form(@post) do %>
  <%= f.input :tag_list %>
<% end %>
```

<p>但是实际使用的时候却又很多麻烦，因为 before_save 会又很多动作都会经过，而且如果很多类似这种场景的都写 before_save 或者 after_save 里面的话，这里的逻辑会越来越乱，而导致后面看起来很累，而且容易出问题。</p>
<p>于是，我们聊出了新的做法，覆盖 attr_accessor 的 get set 方法来实现分割为数组的动作。</p>

```ruby
class Post
  ...
  def tag_list=(value)
    self.tags = value.split(",") if !value.blank?
  end

  def tag_list
    self.tags.join(",")
  end
end
```

这样一来， Controller 里面就不用写了，直接调用 tag_list，它的改变将会和 tags 息息相关
