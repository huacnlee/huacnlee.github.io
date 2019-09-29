---
layout: post
title: "Rails项目，从文件系统转移到 Mongodb GridFS"
date: 2011-02-25 20:05
comments: true
categories: 
- Ruby
- Rails
- NoSQL
- MongoDB
- GridFS
---
<p><span style="font-family: arial; font-size: small;"> </span></p>
<div>最近 NoSQL 很火嘛！咱也跟上时代的脚步，了解了一下。</div>
<p>之前的 Rails 项目都是 MySQL 数据库的，文件存储用 Linux 普通，上传图片用&nbsp;<a href="https://github.com/thoughtbot/paperclip" target="_blank">Paperclip</a>&nbsp;这个插件，有两个项目的上传目录里面文件非常多，管理，同步很是成问题，而且之前定义的目录结构有性能隐患。这个文件存储一直是我的一块心病，项目的上传文件越来越多。</p>
<div>于是最近试着想办法把文件系统转移到 GridFS 里面存放，以来管理简单了，而来不用担心目录结构的问题，而且 Mongodb 的机制还可以应对未来的扩充。</div>
<div><br /></div>
<div>程序上面转移过去倒是不难，难点在于以前的上传文件需要平滑转移到 GridFS 里面。</div>
<div>我先在我的那个小论坛项目&nbsp;<a href="https://github.com/huacnlee/homeland/tree/mysql" target="_blank">Homeland</a>(mysql 分支) 里面试着搞了一下，结果很顺利，目前&nbsp;<a href="http://lanxs.com/" target="_blank">http://lanxs.com</a>&nbsp;这里已经成功转入 GridFS 了。</div>
<div><br /></div>
<div>一下仅供参考，每个项目使用的组件和架构方式不同，不一定完全适合！</div>
<div><br /></div>
<h2><strong>Homeland 的项目情况</strong></h2>
<div>
<ul>
<li><span style="font-family: mceinline;">Ruby 1.9.2 + Rails 3 &nbsp;+ Nginx + Passenger + MySQL + Linux 文件系统存放上传文件</span></li>
<li><span style="font-family: mceinline;">上传图片用 Paperclip，并用&nbsp;<a href="https://github.com/huacnlee/homeland/blob/ca0bdd8ab26da7b780e2dae7eba12b79f41e6d65/config/initializers/paperclip_hashpath.rb" target="_blank">hashed_path</a>&nbsp;的方式分散上传目录</span></li>
<li><span style="font-family: mceinline;">文件调用方式&nbsp;<a href="http://127.0.0.1/uploads" target="_blank">http://127.0.0.1/uploads</a>&nbsp;或者&nbsp;<a href="http://img.localhost/" target="_blank">http://img.localhost/</a></span></li>
</ul>
</div>
<!-- more -->
<h2><strong>程序方面改动</strong></h2>
<div>有些太写的我就没法一一讲了，</div>
<div>先是把 Paperclip 换成&nbsp;<a href="https://github.com/jnicklas/carrierwave" target="_blank">Carrierwave</a>&nbsp;(这里时因为截止到目前 Paperclip 还没有支持 GridFS)</div>
<h3><strong>我以一个Model为例子来介绍转换过程</strong></h3>
```ruby
class Photo < ActiveRecord::Base
  # 上传图片
  has_attached_file :image,
    :default_style => :normal,
    :styles => {
      :small => “100>”,
      :normal => “680>”,
    },
    :url => “#{APP_CONFIG[‘upload_url’]}/:class/:attachment/:hashed_path/:id_:style.jpg”,
    :path => “#{APP_CONFIG[‘upload_root’]}/:class/:attachment/:hashed_path/:id_:style.jpg”,
    :default_url => “photo/:style.jpg”
end
```
<h3><strong>具体步骤</strong></h3>
<div>
<ul>
<li>Gemfile 里面增加, Paperclip 插件依然保留：</li>
</ul>
</div>
```ruby
gem ‘carrierwave’
gem ‘mini_magick’ 
gem “mongoid”, “2.0.0.rc.7”
gem “bson_ext”, “~> 1.2.2”
```
<div>
<ul>
<li>$ bundle install</li>
<li>生成 mongoid 的配置文件 $ rails g mongoid:config&nbsp;</li>
<li>新增 config/initializers/carrierwave.rb 文件，可以参考&nbsp;<a href="https://github.com/huacnlee/homeland/blob/8c9abd3e21afaa4160c36393436768a0249f234d/config/initializers/carrierwave.rb" target="_blank">carrierwave.rb</a></li>
<li>新增 app/uploaders/base_uploader.rb, 内容参考&nbsp;<a href="https://github.com/huacnlee/homeland/blob/7100ce4c506cc2c4387f25e50c533e5bbcac6cc2/app/uploaders/base_uploader.rb" target="_blank">base_uploader.rb</a></li>
<li>新增 app/uploaders/photo_uploader.rb, 并继承 BaseUploader, 内容参考&nbsp;<a href="https://github.com/huacnlee/homeland/blob/7100ce4c506cc2c4387f25e50c533e5bbcac6cc2/app/uploaders/photo_uploader.rb" target="_blank">photo_uploader.rb</a></li>
<li>去掉 Photo model 里面的&nbsp;has_attached_file 定义，改用&nbsp;mount_uploader :image, PhotoUploader</li>
<li>生成个 migration,把数据库里面&nbsp;<em>image_file_name</em>&nbsp;字段重命名为&nbsp;<em>image</em></li>
<li>Views 里面把所有以前 Paperclip 的图片调用方式改为 Carrierwave 的调用方式 (哎，为嘛不做成一样的呢)</li>
<li>上传图片流程不用修改</li>
<li>routes</li>
<li>然后就可以测试上传了，如果没有出错，程序方面的改动就完成了。</li>
</ul>
</div>
<h2><strong>文件转移</strong></h2>
<div>这里就比较麻烦了，我写了一个 Rake 脚本，里面有说明（根据自己的情况做一定的修改）：</div>
```ruby
# coding: UTF-8
# 
# 以下为 Rake 任务，功能是将普通文件系统里面的东西转移到 MongoDB GridFS 里面
# 此代码片段来自于 Homeland 项目： https://github.com/huacnlee/homeland/tree/mysql
# 场景：
# 老架构 Linux File Store, Paperclip, hash 目录:"https://github.com/huacnlee/homeland/blob/ca0bdd8ab26da7b780e2dae7eba12b79f41e6d65/config/initializers/paperclip_hashpath.rb"
# 新架构 Mongodb GridFS, Garrierwave, 继续沿用 Paperclip 目录兼容: https://github.com/huacnlee/homeland/tree/7100ce4c506cc2c4387f25e50c533e5bbcac6cc2/app/uploaders
# 整个过程不会修改任何原始数据库和上传文件
#
require 'mongo'
include Mongo
namespace :gridfs do
  task :import => :environment do   
    # 这里将图片读取并转入 GridFS 的过程抽象为 GridFsImporter，见下面
    @grid = GridFsImporter.new
    

    # 处理 Photo 表的
    puts "-"*120
    puts "Import Photos"
    # 定义原来的几种图片个规格,分别载入
    photos_styles = %w(small normal original)
    Photo.all(:conditions => 'image is not null').each do |photo|
      photos_styles.each do |style|
        @grid.put(photo, 'image', style)
      end
    end

    # 处理 User 表
    puts "-"*120
    puts "Import Users"
    avatars_styles = %w(small normal large original)
    User.all(:conditions => 'avatar is not null').each do |user|
      avatars_styles.each do |style|
        @grid.put(user, 'avatar', style)
      end
    end
    
  end
end


# 图片读取并转入 GridFS
class GridFsImporter
  def initialize
    @grid = Grid.new(Mongoid.database)
  end
  
  def put(model, attr_name, style)  
    print "#{model.class.to_s}: #{model.id} ..."
    # Hash path, 我这个是在 BaseUploader 里面定义个一个按照之前 paperclip 那中目录生成方法写的  
    hashed_path = BaseUploader.new.hashed_path(model.id)
    # file_name 的定义格式要按照原来 Paperclip 的标准定义，这样在网站正文中插入的图片就不会受到影响，图片地址通通不变
    file_name = "#{model.class.to_s.tableize}/#{attr_name.tableize}/#{hashed_path}/#{model.id}_#{style}.jpg"
    # 实际的文件地址，我在 APP_CONFIG['upload_root'] 里面配置了上传的根目录
    real_file_name = File.join([APP_CONFIG['upload_root'],file_name])
    
    begin
      f = File.open(real_file_name)
    rescue => e
      puts "** [Error] open file error: #{e}"
    end
    
    # 检查有没有同样的，如果有，就不用插入了（一来可以防止重复图片，而来如果转移过程中断，之前加过的就不会再次加入）
    if old = @grid.exist?({'filename' => file_name})
      puts "-- skip, old #{old['filename']} existed."
    else
      begin
        # 向 GridFS 提交文件
        id = @grid.put(File.open(real_file_name), :filename => file_name)      
        puts "#{file_name} saved."
      rescue => e
        puts "** [GridFS] save file error: #{e}"
      end
    end
    
  end
end
```
<div><strong><br /></strong></div>
<p>我说的不是很细，只是给出一个参考，可以多看一下 <a href="https://github.com/huacnlee/homeland" target="_blank">Homeland</a> 项目里面的情况做对比，根据实际情况做修改。</p>
<p>祝你顺利转移！</p>