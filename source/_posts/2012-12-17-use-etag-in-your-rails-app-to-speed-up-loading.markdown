---
layout: post
title: "在你的 Rails App 中开启 ETag 加速页面载入同时节省资源"
date: 2012-12-17 11:29
comments: true
categories: 
- Rails
- ETag
- Web 开发
---


## 什么是 ETag

网上关于 [ETag](http://en.wikipedia.org/wiki/HTTP_ETag) 的解释有很多，我这里简单的说明一下我的理解：

> ETag 是 HTTP 协议的标准参数，一般是这样的："686897696a7c876b7e" 一段字符，它能通过一段字符来判断浏览器 cache 的内容是否和服务端返回的内容是否相同，从而来决定是否要重新从服务器下载东西 (HTTP 状态 200 - 重新下载 / 304 - 没有更新)。

## ETag 使用场景举例

**这个东西非常适合用于动态内容上面，以减少不必要的 HTML 下载，达到加速的目的。**

比如下面这个场景的例子：

1. 用户访问 /topics/11 页面，`TopicsController#show` 加载 ``@topic``，并通过 View 生成内容返回
2. 用户来回访问 10 次 /topics/11，可此页面内容无任何变化
3. 过了1天以后，``@topic`` 有了新的回复，用户再次访问的时候，内容变了

上面的场景用户一共访问了 12 次 /topics/11 这个页面，但只有第一次和最后一次才有实质性的内容需要下载的，可在没有 ETag 的情况下面，服务器执行和浏览器下载都是有 12 次，其中的 10 次是多余的。

如果加上 ETag 以后，将会是这样：

1. 用户访问 /topics/11 页面，`TopicsController#show` 加载 ``@topic``，并通过 View 生成内容返回，并给出目前内容的 `ETag: 89vbsn28716`
2. 用户带着 `ETag: 89vbsn28716` 再次访问 /topics/11 ，服务器检查 ETag 与执行结果，发现无变化，返回 304，浏览器直接使用 Cache 的内容渲染页面
3. 过了一天以后，``@topic`` 有了新回复，用户再次带着 `ETag: 89vbsn28716` /topics/11，服务器检查 ETag 发现不对了，生成新内容，并返回 200

这个过程中，服务端执行了 12 次页面，而下载 HTML 内容到本地却只有两次。

## Rails 里面开启 ETag

Rails 的 ActionController 里面已经为我们提供了 [fresh_when](http://api.rubyonrails.org/classes/ActionController/ConditionalGet.html#method-i-fresh_when) 和  [stale?](http://api.rubyonrails.org/classes/ActionController/ConditionalGet.html#method-i-stale-3F) 这两个方法用于处理 ETag，可以点击连接稍微看一下说明。

我下面以 [Ruby China](http://ruby-china.org) 的 [查看 Wiki 页面](http://ruby-china.org/wiki/install_ruby_guide) 为例子演示如何在 Rails 里面合理的使用 ETag 

pages_controller.rb:

```ruby
class PagesController < ApplicationController
  def show
    @page = Page.find_by_slug(params[:id])
    @comments = @page.comments.paginate(:page => params[:page], :per_page => 50)
    fresh_when(:etag => [@page, @comments])
  end
end
```

加上 `fresh_when` 方法以后，Rails 将会用 ``@page`` 和 ``@comments`` 内容的组合的 MD5 hash 值作为 ETag 并与 HTTP Headers 里面的 ETag 进行比较来决定是否需要执行后面的 Views 渲染，并返回 `200` 或 `304`。

在浏览器上面显示将会是这样：

没有 ETag 的情况 (72 ms)：

<a href="http://www.flickr.com/photos/huacnlee/8280251122/" title="200 by 李华顺, on Flickr"><img src="http://farm9.staticflickr.com/8493/8280251122_b2bf1ee3fa_o.png" width="913" height="737" alt="200"></a>

有 ETag 的情况 (40 ms)：

<a href="http://www.flickr.com/photos/huacnlee/8280250976/" title="304 by 李华顺, on Flickr"><img src="http://farm9.staticflickr.com/8487/8280250976_5bdd0405bb_o.png" width="913" height="737" alt="304"></a>

OMG! 页面加载速度直接提升了 **46%**，并且 ETag 命中的情况下，Views 上面的一系列代码都不用执行了，节省了不少资源。

### 但是实际的场景，往往没有上面这个例子这么简单......

比如，页面上有 `current_user` 的状态，页脚的 HTML 代码是通过 `Setting.footer_html` 出来的，Head 里面还有 `Setting.custom_heads` 出来的代码。

以上这些东西都是需要影响页面更新的。

实际上我们只需要将 `fresh_when` 方法在 `ApplicationController` 里面覆盖一下，把页面上需要调用而影响结果的东西加入到 `fresh_when` 的 `:etag` 参数里面就好了:

application_controller.rb:

```ruby
def fresh_when(opts = {})
  opts[:etag] ||= []
  # 保证 etag 参数是 Array 类型
  opts[:etag] = [opts[:etag]] if !opts[:etag].is_a?(Array)
  # 加入页面上直接调用的信息用于组合 etag
  opts[:etag] << current_user
  # Config 的某些信息
  opts[:etag] << SiteConfig.app_name
  opts[:etag] << SiteConfig.custom_head_html
  opts[:etag] << SiteConfig.footer_html
  opts[:etag] << SiteConfig.google_analytics_key
  # 所有 etag 保持一天
  opts[:etag] << Date.current
  super(opts)
end
```

这样一来，每个用户的 ETag 都是不同的，当用户登出和登录以后，页面的内容将会呈现不同的 ETag，同时当你修改 SiteConfig 的某些内容是，ETag 也会随着改变，这样一来 ETag 的引入就不会影响到页面更新了。

实际上你可以大量的使用 `fresh_when` 方法在你的动态页面上面，来减少 Rails View 的执行与 HTML 下载，只要好好分析，将页面上需要的内容加入到 `:etag` 参数里面就好了。

比如：

```ruby
def index
  @hot_topics = Topic.hot.limit(10)
  @hot_users = User.hot.limit(10)
  @hot_nodes = Node.hot.limit(10)
  @recent_topics = Topic.recent.limit(10)
  fresh_when(:etag => [@hot_topics,@hot_users,@hot_nodes,@recent_topics])
end
```

