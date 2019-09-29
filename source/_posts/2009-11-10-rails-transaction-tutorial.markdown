---
layout: post
title: "Rails 的 transaction 事务处理"
date: 2009-11-10 07:56
comments: true
categories: 
- Rails
- 事务
- 教程
---
最近太做一个数据排名统计，统计过程中需要删除旧的缓存统计数据，最开始写的时候就直接 `CachePostTotal.connection.execute("truncate table cache_post_totals")` 先把这个表给重置了，然后再循环往里面插入新的统计数据。

### 但后面发现，这样的做法存在大问题：

* 当我 `truncate table` 的时候， `cache_post_totals` 表已经被清除了。但新的数据还没有存上去，如果在这个时候有人读取这张表时，就会找不到数据，这样是有问题的。
* 在中间插入新数据的循环中有可能会出现异常、Model 验证不通过等情况而使得统计流程中断，但这个时候 `cache_post_totals` 表的数据已被改变。

要解决这个问题哪就要上 <strong>事务</strong> 了！
Rails ActiveRecord 对事务的处理实现的很方便，只用Model.transaction do ... end 将对 Model 表的操作的代码包起来就可以了，这样一来，在 transaction do .. end 之间的数据更新动作并不会立刻改变表里面的数据，而是要等到完全执行完成后，过了 end 才更新。
<!-- more -->
### 来看一下这一段例子:

```ruby
begin
  Post.transaction do 
    # 删除旧数据
    Post.delete_all
  
    # 例子 新数据
    datas [{:title => "title1", :slug => "title-1"},{:title => "Title 2", :slug => "Title 2"}]
    counter = 0
    datas.each do |d|
      post = Post.new(d)
      if not post.save
        raise "*** #{post.errors.full_messages}"
      end
    end
  end
  puts "=== Done"
rescue Exception => ex
  puts "*** transaction abored!"
  puts "*** errors: #{ex.message}"
end
```

另外有个小细节需要注意，如果你是使用 `Model.connection.execute()` 方法执行的语句，那么事务将不会起作用！
