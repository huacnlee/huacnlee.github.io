---
layout: post
title: "Rails 表单文本框或其他样式统一小技巧"
date: 2012-08-15 23:32
comments: true
categories:
- Ruby
- 教程
- Rails
- 技巧
- Formtastic
- simple_form
---
我时长会苦恼，表单生成的时候需要对某些字段的文本框设定不同的长度，比如 `Email，地址`什么的要很长很长，而 `姓名，邮编` 之类的需要设置短的，还有一些多行的文本框需要设定一定的高宽。

以前我都是在 text_field 后面加 `:style => "width:100px"` 之类的参数，这样是可以设置，但是很土鳖！

```erb
<%= simple_form_for(@user) do |f| %>
  <%= f.input :login, :input_html => { :style => "width:100px" } %>
  <%= f.input :password %>
  <%= f.input :password_confirmation %>
  <%= f.input :email, :input_html => { :style => "width:300px" }  %>
<% end %>
```

大的问题还是有时候同样的一个表单有可能会出现在前台，后台，或者前台的好几个页面（某些页面需要的字段要少一些），这就得每个用到的地方都要设置 `:style` 及其土鳖，而且有时候还写出来不统一...

----------

## 解决方法

我最近发现一个规律可以很好解决上面的难题...

Rails 用 form_for (不管你是用 [Formtastic](https://github.com/justinfrench/formtastic) 还是 [simple_form](https://github.com/plataformatec/simple_form) 还是 Rails [默认的](http://guides.rubyonrails.org/form_helpers.html) 生成表单以后每个表单会有一个固定的 class ，每个文本框会有固定的 id

* form 的 class 是根据 Model 名称转换而来的
* 文本框的 id 是更具 Model + 字段名出来的

比如这个例子

```erb
<%= simple_form_for(@user) do |f| %>
  <%= f.inputs :login, :password, :password_confirmation, :email %>
<% end %>
```

会得到

```html
<form action="/users" method="POST" class="user">
   <input type="text" name="user[login]" id="user_id">
   <input type="text" name="user[password]" id="user_password">
   <input type="text" name="user[password_confirmation]" id="user_password_confirmation">
   <input type="text" name="user[email]" id="user_email">
</form>
```

然后，其实就只需要在 application.css 里面这么写，那么所有用到的表单都能正确的显示长度了（并且绝对靠谱！）

application.scss

```css
form.user {
  input#user_login,
  input#user_password_confirmation,
  input#user_password { width: 100px; }
  input#user_email { width:200px; }
}
```

由于用了 form 打头，也就不用担心这么些会影响到其他地方的样式。
以后再也不用把 simple_form 提供的 inputs 方法拆开来一个一个的写的，直接一个 `f.inputs :name, :login, :email` 搞定，一行多省事情啊！
同时，这个方式你还可以写一个特别的样式，比如，让密码的 label 保持为红色等等。

在 Ruby China 上面关于这个的讨论： [http://ruby-china.org/topics/4972](http://ruby-china.org/topics/4972)


