---
layout: post
title: "Ruby1.9 方法扩展的变化"
date: 2010-08-27 10:45
comments: true
categories: 
- Ruby
---
偶尔会写一些对类的方法扩展，比较常见的是给 String 类进行扩展，如，加入 to_slug, remove_html_tags 等等
在以前 Ruby 1.8 类的方法扩展可以直接写成这样：

```ruby
lass String
  def remove_html_tags()
    self.gsub(/<.+?>/, "")
  end
  
  # clear unsafe char with url slug
  def safe_slug(spliter = '-')
    @slug = self
    if @slug.blank?
      Guid.new
      @slug = Guid.generate      
    end
    @slug.gsub(/[^a-zA-Z\-0-9]/,spliter).downcase  
  end
end

Ruby1.8.7 > "aaa".remove_html_tags()
Ruby1.8.7 > "aaa".safe_slug
```
<!-- more -->

但到了 Ruby 1.9 这样可不行了,你得定义一个 module，然后通知 String 集成这个 module，如：

```ruby
module StringExtensions
  def remove_html_tags()
    self.gsub(/<.+?>/, "")
  end
  
  # clear unsafe char with url slug
  def safe_slug(spliter = '-')
    @slug = self
    if @slug.blank?
      Guid.new
      @slug = Guid.generate      
    end
    @slug.gsub(/[^a-zA-Z\-0-9]/,spliter).downcase  
  end
end

String.send :include,StringExtensions
```

```bash
Ruby1.9.2 > "aaa".remove_html_tags()
Ruby1.9.2 > "aaa".safe_slug
```
