---
layout: post
title: "Rails 使用 Swfupload 无刷新多文件上传的 Session 问题解决"
date: 2009-10-15 14:03
comments: true
categories: 
- 前端开发
- Swfupload
- Session
- Rails
- 无刷新上传
---
[Swfupload](http://swfupload.org/) 是一个 Javascript + Flash 实现的无刷新上传组件，它支持一次选择多个文件上传、上传状态、进度等实用功能。
在 Ruby on Rails 里面使用 Swfupload 来实现多文件上传基本上很简单，按照 [Demo](http://demo.swfupload.org/v220/applicationdemo/index.php) 这个页面的例子代码，并修改制定的参数就好了。
但是，如果你的上传需要验证用户登录，那就会有问题出现了。
因为 Swfupload 上传是在 Flash 里面实现的，也就是说 Swfupload 和页面的 Cookie 将会是两个，Session 当然也是同样的。
要避免这个问题，就需要强制的改写 Cookie。

## 步骤

* 在 Rails 项目里面创建 `app/middlewares` 目录
* 创建 `app/middlewares/flash_session_cookie_middleware.rb` 文件，并存入这段代码:

<!-- more -->
```ruby
require 'rack/utils'

class FlashSessionCookieMiddleware
  def initialize(app, session_key = '_session_id')
    @app = app
    @session_key = session_key
  end

  def call(env)
    if env['HTTP_USER_AGENT'] =~ /^(Adobe|Shockwave) Flash/
      params = ::Rack::Utils.parse_query(env['QUERY_STRING'])
      env['HTTP_COOKIE'] = [ @session_key, params[@session_key] ].join('=').freeze unless params[@session_key].nil?
    end
    @app.call(env)
  end
end
```

* 修改 `config/initializers/session_store.rb` 并加入：

```ruby
# config/initializers/session_store.rb 
ActionController::Dispatcher.middleware.insert_before(ActionController::Base.session_store, 
    FlashSessionCookieMiddleware, ActionController::Base.session_options[:key])
```

* 修改 `config/environment.rb` 将 `app/middlewares` 目录加入到 `config.load_paths` 里面：

```ruby
# config/environment.rb
Rails::Initializer.run do |config|
  # ..... 省略其他的一些代码
  config.load_paths += %W( #{RAILS_ROOT}/app/middlewares )
  # ..... 省略其他的一些代码
end
```

* 对 脚本的 upload_url 进行修改，加入 session 参数:

```erb
<!-- 如原始的代码是这样 -->
<script type="text/javascript">
  var swfu;
  window.onload = function () {
    swfu = new SWFUpload({
      upload_url: '<%= link_to :controller => "photos", :action => "create" %>',
      //....... 省略后面的...
  }
</script>
<!-- 修改为 -->
<script type="text/javascript">
  var swfu;
  window.onload = function () {
    swfu = new SWFUpload({
      upload_url: '<%= link_to :controller => "photos", :action => "create", ActionController::Base.session_options[:key]
 => cookies[ActionController::Base.session_options[:key]] %>',
      //....... 省略后面的...
  }
</script>
<!--
   这样一来，upload_url 就会从之前的 
  /photos/create 
  变为 
  /photos/create?_projectname_session_key=asdgkljasdklgjasdklgjlakjlwje 
  类似的地址

  _projectname_session_key 是在 config/initializers/session_store.rb 里面配置的 
  ActionController::Base.session 的 :key 的值
-->
```

* 在修改一下你的 controller 加入 

```ruby
session :cookie_only => false, :only => :create
```

* 最后重启Web服务器。

## 参考资料：

* <a href="http://demo.swfupload.org/v220/applicationdemo/index.php" target="_blank">Swfupload demo</a>
* <a href="http://jimneath.org/2008/05/15/swfupload-paperclip-and-ruby-on-rails/" target="_blank" title="Permanent Link: SWFUpload, Paperclip and Ruby on Rails">SWFUpload, Paperclip and Ruby on Rails</a>
* <a href="http://railsforum.com/viewtopic.php?id=32662" target="_blank">swfupload and restful authentication session problem</a>
