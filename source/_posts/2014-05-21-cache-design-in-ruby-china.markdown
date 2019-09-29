---
layout: post
title: "Ruby China 里面我是如何设计缓存的"
date: 2014-05-21 11:11
comments: true
categories: 
- Rails
- Cache
- ETag
- Nginx
- NewRelic
- Ruby China
---

看最近 @quakewang 分享的 《[总结 web 应用中常用的各种 cache](http://ruby-china.org/topics/19389)》，我也搭车分享一下在 Ruby China 里面，我们是如何做 Cache 的。


## 首先给大家看一下 NewRelic 的报表

最近 24h 的平均响应时间

![](http://l.ruby-china.org/photo/2014/6a3a30c14222f8002114a253d4483018.png)

### 流量高的那些页面 (Action)

![](http://l.ruby-china.org/photo/2014/67cc2b577ab886eb4c66a54b5e9ce0b9.png)

### 访问量搞的几个 Action 的情况：

#### TopicsController#show

![](http://l.ruby-china.org/photo/2014/8aa11ae13c2b0732aa11e6b27dc463e9.png)

#### UsersController#show (比较惨，主要是 GitHub API 请求拖慢)

![](http://l.ruby-china.org/photo/2014/771c1d75b08c01b268eb0e5223739d3e.png)

PS: 在发布这篇文章之前我有稍加修改了一下，GitHub 请求放到后台队列处理，新的结果是这样:

![](http://l.ruby-china.org/photo/2014/f05fab2bc39506da10c5a5ebb7172d79.png)

#### TopicsController#index

![](http://l.ruby-china.org/photo/2014/ed43a50fb2177a800c26bd9d80f97334.png)

#### HomeController#index

![](http://l.ruby-china.org/photo/2014/32519b34fc02877b893c5c3e4f370d6c.png)
    
从上面的报表来看，目前 Ruby China 后端的请求，排除用户主页之外，响应时间都在 100ms 以内，甚至更低。

## 我们是如何做到的？

- Markdown 缓存
- Fragment Cache
- 数据缓存
- ETag
- 静态资源缓存 (JS,CSS,图片)

### Markdown 缓存

在内容修改的时候就算好 Markdown 的结果，存到数据库，避免浏览的时候反复计算。

此外这个东西也特意不放到 Cache，而是放到数据库里面：

1. 为了持久化，避免 Memcached 停掉的时候，大量丢失；
2. 避免过多占用缓存内存；

```ruby
class Topic
  field :body # 存放原始内容，用于修改
  field :body_html # 存放计算好的结果，用于显示
  
  before_save :markdown_body
  def markdown_body
    self.body_html = MarkdownTopicConverter.format(self.body) if self.body_changed?
  end
end
```

### Fragment Cache

这个是 Ruby China 里面用得最多的缓存方案，也是速度提升的原因所在。

app/views/topics/_topic.html.erb

```erb
<% cache([topic, suggest]) do %>
<div class="topic topic_line topic_<%= topic.id %>">
   <%= link_to(topic.replies_count,"#{topic_path(topic)}#reply#{topic.replies_count}",
          :class => "count state_false") %>
  ... 省略内容部分
  
</div>
<% end %>
```

1. 用 topic 的 cache_key 作为缓存 cache 
    `views/topics/{编号}-#{更新时间}/{suggest 参数}/{文件内容 MD5}` ->
`views/topics/19105-20140508153844/false/bc178d556ecaee49971b0e80b3566f12`
2. 某些涉及到根据用户帐号，有不同状态显示的地方，直接把完整 HTML 准备好，通过 JS 控制状态，比如目前的“喜欢“功能。
```html
<script type="text/javascript">
  var readed_topic_ids = <%= current_user.filter_readed_topics(@topics) %>;
  for (var i = 0; i < readed_topic_ids.length; i++) {
    topic_id = readed_topic_ids[i];
    $(".topic_"+ topic_id + " .right_info .count").addClass("state_true");
  }
</script>
```


再比如 [app/views/topics/_reply.html.erb
](https://github.com/ruby-china/ruby-china/blob/47b6ba0e2495484e273de1324e69bf27fec53f48/app/views/replies/_reply.html.erb)

```erb
<% cache([reply,"raw:#{@show_raw}"]) do %>
<div class="reply">
  <div class="pull-left face"><%= user_avatar_tag(reply.user, :normal) %></div>
  <div class="infos">
    <div class="info">
      <span class="name">
        <%= user_name_tag(reply.user) %>
      </span>
      <span class="opts">
        <%= likeable_tag(reply, :cache => true) %>
        <%= link_to("", edit_topic_reply_path(@topic,reply), :class => "edit icon small_edit", 'data-uid' => reply.user_id, :title => "修改回帖")%>
        <%= link_to("", "#", 'data-floor' => floor, 'data-login' => reply.user_login,
            :title => t("topics.reply_this_floor"), :class => "icon small_reply" )
        %>
      </span>
    </div>
    <div class="body">
      <%= sanitize_reply reply.body_html %>
    </div>
  </div>
</div>
<% end %>
```

同样也是通过 `reply` 的 cache_key 来缓存 `views/replies/202695-20140508081517/raw:false/d91dddbcb269f3e0172bf5d0d27e9088`
同时这里还有复杂的用户权限控制，用 JS 实现；

```html
<script type="text/javascript">
  $(document).ready(function(){
    <% if admin? %>
      $("#replies .reply a.edit").css('display','inline-block');
    <% elsif current_user %>
      $("#replies .reply a.edit[data-uid='<%= current_user.id %>']").css('display','inline-block');
    <% end %>
    <% if current_user && !@user_liked_reply_ids.blank? %>
      Topics.checkRepliesLikeStatus([<%= @user_liked_reply_ids.join(",") %>]);
    <% end %>
  })
</script>
```

### 数据缓存

其实 Ruby China 的大多数 Model 查询都没有上 Cache 的，因为据实际状况来看，[MongoDB](http://mongodb.org) 的查询响应时间都是很快的，大部分场景都是在 5ms 以内，甚至更低。

我们会做一些比价负责的数据查询缓存，比如：GitHub Repos 获取

```ruby
def github_repos(user_id)
  cache_key = "user:#{user_id}:github_repos"
  items = Rails.cache.read(cache_key)
  if items.blank?
    items = real_fetch_from_github()
    Rails.cache.write(cache_key, items, expires_in: 15.days)
  end
  return items
end
```

### ETag

ETag 是在 HTTP Request, Response 可以带上的一个参数，用于检测内容是否有更新过，以减少网络开销。

过程大概是这样

```
第一次请求

      [浏览器]                   浏览器收到，并记录到本地 Cache
         |                         |
         |  [GET /index.html]      | [HTTP status 200]
         |                         | [ETag: abc]
         |                         |
  [Rails Controller]               |
         |                         |
      [Views]                      |
         |-------------------------|-
                             
第二次请求 /index.html

      [浏览器]                   浏览器收到，并记录到本地 Cache
         |                         |                          |
         |  [GET /index.html]      | [HTTP status 304]        | [HTTP Status 200]
         |  [ETag: abc]            | [ETag: abc]              | [ETag: efg]
         |                         |                          |
  [Rails Controller] --------------|                          |
         |                      ETag 相同                      |
         |                                                    |
      [Views] ------------------------------------------------|-
                                ETag 不同
```

Rails 的 [fresh_when](http://api.rubyonrails.org/classes/ActionController/ConditionalGet.html#method-i-fresh_when) 方法可以帮助将你的查询内容生成 ETag 信息

```ruby
def show
  @topic = Topic.find(params[:id])
  
  fresh_when(etag: [@topic])
end
```

### 静态资源缓存

请不要小看这个东西，后端写得再快，也有可能被这些拖慢（浏览器上面的表现）!

1、合理利用 Rails Assets Pipeline，一定要开启！

```ruby
# config/environments/production.rb
config.assets.digest = true
```

2、在 Nginx 里面将 CSS, JS, Image 的缓存有效期设成 max；

```nginx
location ~ (/assets|/favicon.ico|/*.txt) {
  access_log        off;
  expires           max;
  gzip_static on;
}
```

3、尽可能的减少一个页面 JS, CSS, Image 的数量，简单的方法是合并它们，减少 HTTP 请求开销；

```
<head>
  ... 
  只有两个
  <link href="http://l.ruby-china.org/assets/front-1a909fc4f255c12c1b613b3fe373e527.css" rel="stylesheet" />
  <script src="http://l.ruby-china.org/assets/app-24d4280cc6fda926e73419c126c71206.js"></script>
  ...
</head>
```

## 一些 Tips

1. 看统计日志，优先处理流量高的页面；
2. updated_at 是一个非常有利于帮助你清理缓存的东西，善用它！修改数据的时候别忽略它！
3. 多关注你的 Rails Log 里面的查询时间，100ms 一下的页面响应时间是一个比较好的状态，超过 200ms 用户就会感觉到迟钝了。

