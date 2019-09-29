---
layout: post
title: "推荐 Rails Paperclip 上传图片插件"
date: 2009-09-02 11:35
comments: true
categories: 
- Rails
- Ruby
- Paperclip
- 插件
- 教程
---
<a href="http://github.com/thoughtbot/paperclip/tree/master" target="_blank">Paperclip</a> 是 Rails 的一个上传图片插件，它可以很方便的实现图片上传并切割指定大小的功能，使整个照片上传过程非常简化。一种图片只用在数据库里面创建三个字段，如，当我们要设置用户头像的时候，会有一个 face 字段，哪 paperclip 的字段就需要在数据库里面建立：face_file_name、face_content_type、face_file_size&nbsp; 几个字段，然后你可以通过设置 Model 来为 face 定义无限个大小的图片规格，paperclip 会自动通过文件目录的方式来处理。

<!-- more -->
### Model：

```ruby
class User < ActiveRecord::Base
  has_attached_file :face,
    :default_style => :s120,
    :styles => {
      :normal => "180x180#",
      :s120 => "120x120#",
      :s48 => "48x48#",
      :s32 => "32x32#",
      :s16 => "16x16#"
      },
    :url => "/uploadfiles/:class/:attachment/:id/:basename/:style.:extension",
    :path => ":rails_root/public/uploadfiles/:class/:attachment/:id/:basename/:style.:extension"
    
  validates_attachment_content_type :face, :content_type => 'image/jpeg'
end

```

### 前台调用图片的时候这样写 face(:style)：

```erb
<%= image_tag(@user.face(:normal)) %>
<%= image_tag(@user.face(:s120)) %>
<%= image_tag(@user.face(:s48)) %>
<%= image_tag(@user.face(:s32)) %>
```

另外它的上传过程基本不用写代码，直接加入 &lt;%= f.file_field :face %&gt;&nbsp; 的类似的上传框，并把 form 设为 :html =&gt; { :multipart =&gt; true } 直接保存就好了，其它的上传过程由 Paperclip 内部处理了。
详细的 Paperclip 教程请参见：《<a href="http://jimneath.org/2008/04/17/paperclip-attaching-files-in-rails/" target="_blank">Paperclip: Attaching Files in Rails</a>》
另外你在使用过程中可能会遇到：[paperclip] An error was received while processing: #
这个问题的原因是你没有安装 <a href="http://www.imagemagick.org/script/binary-releases.php" target="_blank">ImageMagick</a> 或 没有设置好 ImageMagick 的应用路径，Paperclip 上传的时候会调用 ImageMagick 的程序来进行图像处理。

关于 Windows 下面 Paperclip::NotIdentifiedByImageMagickError 错误的解决办法：

```ruby
# 1.先安装 ImageMagick: http://www.imagemagick.org/script/binary-releases.php#windows
# 2.创建 initializers 文件：config/initializers/paperclip.rb 存入下面的代码
# 3.重启 webserver
# 设置 command_path ，请将 c:/program files/imagemagick-6.5.5-Q16 改为你的 ImageMagick 的安装目录
Paperclip.options[:command_path] = "c:/program files/imagemagick-6.5.5-Q16" 
Paperclip.options[:swallow_stderr] = false

def run cmd, params = "", expected_outcodes = 0
  command = %Q<#{%Q[#{path_for_command(cmd)} #{params}].gsub(/\s+/, " ")}>
  command = "#{command} 2>#{bit_bucket}" if Paperclip.options[:swallow_stderr]
  output = `#{command}`
  unless [expected_outcodes].flatten.include?($?.exitstatus)
    raise PaperclipCommandLineError, "Error while running #{cmd}"
  end
  output
end
```

### 扩展改进，加入 Hash 目录一应对大数量级的文件：

```ruby
# 扩展 Paperclip 加入hash目录参数 :hashed_path
# 建立 config/initializers/paperclip_extensions.rb
Paperclip::Attachment.interpolations[:hashed_path] = lambda do |attachment, style|
  hash = Digest::MD5.hexdigest(attachment.instance.id.to_s)
  hash_path = ''
  3.times { hash_path += '/' + hash.slice!(0..2) }
  hash_path[1..12]
end


# Model 里面使用的例子
class User < ActiveRecord::base
  # 封面图
  has_attached_file :face,
    :default_style => :s140,
    :styles => {
      :default => "140x150#",
      :s140 => "140x140#",
      :s128 => "128x128#",
      :s80 => "80x80#",
      :s64 => "64x64#",
      :s48 => "48x48#",
      :s32 => "32x32#",
      :s16 => "16x16#",
      },
    :url => "upload/:class/:attachment/:hashed_path/:id_:style.:extension",
    :path => "#{RAILS_ROOT}/public/upload/:class/:attachment/:hashed_path/:id_:style.:extension",
    :default_url => "images/default_faces/:style.jpg"
end
```

### 相关文章：

* <a href="http://www.xuli.info/2009/09/01/paperclip%E8%AF%BB%E5%8F%96%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87/" target="_blank">Paperclip读取默认图片</a>
* <a href="http://www.xuli.info/2009/09/01/%E8%A7%A3%E5%86%B3%E7%94%A8paperclip%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E6%97%B6%E5%87%BA%E7%8E%B0%E7%9A%84%E9%97%AE%E9%A2%98/" target="_blank">解决用Paperclip上传文件时出现的问题</a>
* <a href="http://www.xuli.info/2009/08/29/%E7%94%A8paperclip%E7%BC%A9%E7%95%A5%E8%BF%9C%E7%A8%8B%E5%9B%BE%E7%89%87/" target="_blank">用Paperclip缩略远程图片</a>