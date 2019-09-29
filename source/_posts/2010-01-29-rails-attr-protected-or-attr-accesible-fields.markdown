---
layout: post
title: "Rails 使用参数提交表单时，要注意保护敏感字段"
date: 2010-01-29 12:09
comments: true
categories: 
- Rails
- 安全
- 破解
- 漏洞
- ActiveRecord
---
<p>刚接触 Rails 的人都会对 Rails form 实际特别喜爱，因为它让我们省时省力，就算遇到有100多个字段的表单，也能够几下就做出来了，因为在服务端不用再去对每个字段分别写文本框与字段的赋值。</p>
<p>但是如果没有注意保护，使用 Model.create(params[:model]) 的方式提交会有很大的安全漏洞。</p>
## 下面来看一个例子：

### 有用户表 [users]                         
<ul>
<li>id</li>
<li>login [用户名]</li>
<li>passwd [密码]</li>
<li>nick_name [昵称]</li>
<li>email [Email]</li>
<li>state [状态]</li>
<li>group_id [组 [1 管理员, 2 编辑, 3 普通用户]]</li>
<li>exp [经验值]</li>
<li>money [金币]</li>
<li>level_id [等级]</li>
<li>created_at</li>
<li>updated_at</li>
</ul>
<!-- more -->
### 注册表单 users/regist.html.erb
```erb
<div id="register">
  <% form_for @user do |f| -%>
    <p class="row">
      <%= f.label :login, "Login" %>
      <%= f.text_field :login %>  
    </p>      
    <p class="row">
      <%= f.label :passwd, "Password" %>
      <%= f.password_field :passwd %>  
    </p>
    <p class="row">
      <%= f.label :nick_name, "Nick Name" %>
      <%= f.password_field :nick_name %>  
    </p>
    <p class="buttons">
      <%= f.submit "Regist" %>
    </p>
  <% end -%>
</div>
```
</li>
<li>控制器 UsersController.rb
```ruby
class UsersController < ApplicationController
  def index
    
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:notice] = "注册成功。"
      redirect_to "/"
    end
  end
end
```
</li>
</ol>
这是 Rails 里面很常见的写法,但是如果没有做相应的保护措施，那么使用 `@user = User.new(params[:user])` 然后 `@user.save` 这样的方式就会有很严重的问题，因为HTML表单是可以通过 [Firebug](http://www.getfirebug.com) 这类前端调试工具修改的。
比如，现在的注册表单上面有 `login,passwd,nick_name` 三个字段，我可以使用 Firebug 强制修改HTML，加上：

```html
<input name="user[:group_id]" type="text" value="1" />
<input name="user[:money]" type="text" value="9999999" />
<input name="user[:exp]" type="text" value="9999999" />
```
然后提交保存... 接下来出现的结果大家应该都能猜到，这个用户的金币和经验值都被强制加上了，而且还注册成为了超级管理员！很恐怖把！ 看我在 [is-programmer.com](http://pasite.is-programmer.com/posts/15200.html) 上面测试的这个例子
我把访问量修改到上亿次！当然 is-programmer.com 做过这方面的保护，这个地方的问题不大不小，我本想强制注册个超级管理员的...但后面发现有做保护的... 呵呵

## 如何保护？
在 Model 里面使用 *attr_accessible* 或 *attr_protected* 详见：[ActiveRecord::Base 文档](http://api.rubyonrails.org/classes/ActiveRecord/Base.html#M002280)
  
```ruby
# models/user.rb
class User < ActiveRecord::base
  # 使用 attr_protected 保护
  attr_protected :group_id, :money, :exp, :level_id, :state 
  # 或使用 attr_accessible
  # attr_accessible :login, :passwd, :email
end

# controllers/users_controller.rb
class UsersController < ApplicationController
  def index
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    # 如果需要特别修改 attr_protected 保护的字段，请手动赋值，如
    @user.exp = 1000 # 初始经验值 1000
    @user.level_id = 1
    if @user.save
      flash[:notice] = "注册成功。"
      redirect_to "/"
    end
  end
end
```

特别需要更改保护字段的时候，需要使用 @model.money = 55 这样的方式赋值，而直接 @model.update_attributes(params[:model]) 这总方式会把保护字段过滤掉。