---
layout: post
title: "如何实现类似 Rails Console 的东西"
date: 2013-08-15 09:09
comments: true
categories: 
- Ruby
- IRB
---

Rails 提供了一个 [rails console](http://guides.rubyonrails.org/command_line.html#rails-console)，可以让我们很方便的在 启动 Web Server 之外直接调用代码、调用 Model 查询/修改数据等。

```bash
➜  ruby-china git:(master) rails c
Loading development environment (Rails 4.0.0)
irb(main):001:0> @post = Post.last
irb(main):001:0> @post.update_attribute(:title, "Foo bar")
```

## 如何实现这个东西

Ruby 标准库里面带有一个叫 [IRB](http://www.ruby-doc.org/stdlib-2.0/libdoc/irb/rdoc/IRB.html) 的库，实际上，你现在就可以直接执行 `irb` 进入 Ruby 的控制台，在里面可以进行任何 Ruby 的代码执行。

想要实现一个类似 Rails console 的东西，就需要用到 [IRB](http://www.ruby-doc.org/stdlib-2.0/libdoc/irb/rdoc/IRB.html) 来启动控制台。

### 来一个最简单的例子

创建下面这些文件：

```bash
foo
  Rakefile
  post.rb
```

post.rb 来点简单的代码：

```ruby
class Post
  attr_accessor :title

  def test(a)
    [self.title,a].join(" = ")
  end
end
```

Rakefile 创建一个 console 命令，并引用 `post.rb` （这里可以根据自己的情况，引入所有需要的项目文件），然后调用 `IRB.start` 启动控制台：

```ruby
desc "Run Console"
task :console do |t, args|
  env = ENV['APP_ENV'] || 'development'
  puts "Loading #{env} environment"
  require "./post"
  require "irb"
  require 'irb/completion'
  # 必须执行 ARGV.clear，不然 rake 后面的参数会被带到 IRB 里面
  ARGV.clear
  IRB.start
end
```

现在就可以执行 `rake console` 进入你构建的 App 控制台了：

```bash
$ rake console
Loading development environment
irb(main):001:0> @post = Post.new
=> #<Post:0x007fe9e5a62b98>
irb(main):002:0> @post.title = "aabbcc"
=> "aabbcc"
irb(main):004:0> @post.test("ccddee")
=> "aabbcc = ccddee"
```
