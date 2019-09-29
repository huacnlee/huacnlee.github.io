---
layout: post
title: kissy-rals - 可以让你在 Rails 项目里面用 Kissy 代替 jQuery
date: 2012-08-18 23:05
comments: true
categories: 
- Rails
- jQuery
- Kissy
- kissy-rails
- Gem
---
## 前面闲扯

在淘宝系里面有个苦恼的事情，全公司的前端都主要使用 [Kissy](https://github.com/kissyteam/kissy) 这个前端框架。我一直觉得这个东西使用起来过于复杂，不喜欢用。

### 据我了解:

> Kissy 实际上是从 jQuery (API or 源代码？我不确定) 衍生过来的，很多功能都非常相似，而 Kissy 在 jQuery 这种功能的基础上实现了很多正对淘宝项目情况的功能扩充。

但是我觉得 Kissy 没有把 jQuery 精简好用的优点保留下来，反而整出了非常奇怪的 API 命名和调用方式

### 比如下面这些方法:

* KISSY - 全大写的类名;
* KISSY.one / KISSY.all 两个 DOM 选择器，命名非常奇怪，我不知道为何原因会有两个（一个是返回单个对象，一个是返回数组）jQuery 一个不也用了;
* 文档例子里面常见的 KISSY.ready(function(S){}) 然后在这样的 block 里面用 S 这个别名，又是一个奇怪的大写字母;

所以，目前为止我也一直坚持在公司的项目里面的 Rails 项目里面继续使用 jQuery，可最后发现遇到一些复杂功能需要专业前端支持的时候比较麻烦，另外也不能直接使用公司现有的前端资源…

当然其中还有一个重要点是 Rails 没有 Kissy 的支持，[Rails 内置的 Ajax 功能](http://guides.rubyonrails.org/ajax_on_rails.html) 就没法直接使用，会很不方便。

最近我们部门那边又正在开发一套类似 [Bootstrap](http://getbootstrap.com) 的前端组件库 [Brix](http://github.com/etaoux/brix)，这个东西搞完以后，等于以后可以想用 Bootstrap 那样的组件来开发公司的项目了，多省事啊。

所以，开始正题了…

## 关于 kissy-rails

于是，我花了点时间基于 [jquery-rails](https://github.com/rails/jquery-rails) 实现了 [kissy-rails](https://github.com/huacnlee/kissy-rails) ，让 Rails 项目可以直接用 Kissy 代替 jQuery。

* [https://github.com/huacnlee/kissy-rails](https://github.com/huacnlee/kissy-rails)

这个过程还好有使用 Kissy 很久的 [同事](http://github.com/cricy) 帮忙解释 Kissy 的使用问题…(说到这里我又不得不吐槽 Kissy 文档太差，就是看不懂…)

总归，到最后， kissy-rails 还是实现了，用起来和 jquery-rails 差不多，也就是把之前 jquery 的地方换成 kissy:

Gemfile

```ruby
gem "kissy-rails"
```

app/assets/javascripts/application.js

```javascript
//= require kissy
//= require kissy_ujs
```


然后 Rails Helper 里面提供的 Ajax 支持就能用 Kissy 的 API 来实现了，比如:

```erb
<%= link_to "Delete", @post, :remote => true, :confirm => "Are you sure?" %>

<%= form_for(@post, :remote => true) do |f| %>
  <%= f.text_field :login %>
  <%= f.text_field :password %>
  <%= f.submit, :disabled_with => "Submiting..." %>
<% end %>
```

