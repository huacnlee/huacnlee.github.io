---
layout: post
title: "在 Rails 项目里面使用又拍云用于存储上传图片"
date: 2012-08-23 09:48
comments: true
categories: 
- 存储
- 云服务
- Rails
- 又拍云
- carrierwave
- carrierwave-upyun
---
[又拍云](https://www.upyun.com/?utm_source=ruby-china&utm_medium=ad&utm_campaign=upyun&md=ruby-china) 进过我的长期使用，确实非常不错，价格合理，速度给力。

这里分享一下我在 Rails 项目里面使用又拍云管理文件的经验。

* [让又拍云结合在 CarrierWave 里面使用](#use-carrierwave)；
* [合理利用又拍云的图片空间功能](#use-upyun-image-space)；
* [使用又拍云作为 Assets 文件的 CDN 分发](#cdn-asset-files)；

<h2 id="use-carrierwave">让又拍云结合在 CarrierWave 里面使用</h2>

Ruby 社区的人都知道，用于文件上传的 Gem 就两个最出名（[Paperclip](https://github.com/thoughtbot/paperclip), [CarrierWave](https://github.com/jnicklas/carrierwave)），而 CarrierWave 由于其有灵活性很好，现在受到了越来越多人的青睐。

> Paperclip 暂时还没有人给它实现又拍云集成 <br />
> CarrierWave 就有 [@nowazhu](http://nowa.me) 实现了一个，另外还有我实现的[阿里云存储的插件](https://github.com/huacnlee/carrierwave-aliyun)。

如果你想在 CarrierWave 里面使用又拍云作为存储介质，那么你需要用:

* [https://github.com/nowa/carrierwave-upyun](https://github.com/nowa/carrierwave-upyun)

Gemfile

```ruby
gem "carrierwave"
gem "carrierwave-upyun"
gem "rest-client"
```

只需要简单的配置就能很好的将他们结合起来:

config/initializes/carrierwave.rb

```ruby
CarrierWave.configure do |config|
  config.storage = :upyun
  config.upyun_username = "账号"
  config.upyun_password = '密码'
  config.upyun_bucket = "空间名"
  config.upyun_bucket_domain = "空间名.b0.upaiyun.com 或 使用你独立配置的域名"
end
```

上面这段是简单介绍一下使用又拍云需要的组件，具体使用步骤的细节由于 CarrierWave 和 carrierwave-upyun 的 Github 页面上都有介绍，我这里就不用细说了。

<h2 id="use-upyun-image-space">合理利用又拍云的图片空间功能</h2>

在以往我们使用 CarrierWave 或 Paperclip 的时候，我们习惯于在 Rails 里面直接使用 ImageMagick 将图片处理成不同的缩略图版本（尺寸，格式，水印，锐化，模糊...）以适应我们的业务需求。

>  这个也是 Ruby 社区的一大优点!<br />CarrierWave 或 Paperclip 可以很容易的将图片自动化的处理掉，使得我们的代码干净利落！

不过如果你用了又拍云以后，CarrierWave 提供的 [缩略图生成](https://github.com/jnicklas/carrierwave#adding-versions) 功能或许你就不该使用了，由于远程网络访问以及服务器带宽会带来上传速度的问题，我们需要尽可能的减少服务器到又拍云服务器的网络使用，具体看我在 Ruby China 上面发帖描述的情况: 《[盛大云和又拍云配合起来使用的问题](http://ruby-china.org/topics/5059)》

你有两个选择:

1. 使用又拍云的 Form API 来上传图片，你可以看看这个 [Gist](https://gist.github.com/3414491) ,这个里面的代码只是将上传调通了，后面还有许多事情需要手工处理；
2. 使用又拍云的图片空间的功能是实现缩略图生成，它可以让你配置 30 种缩略图版本；

如果你选择用图片空间，那你还可以继续使用 CarrierWave 和 carrierwave-upyun 来实现图片处理，以前那套思路都还可以继续使用，只是需要对 CarrierWave 进行一些 Hack 就可以和“图片空间”很好的搭配起来了。

### 以前我们的 CarrierWave 自定义 Uploader 可能是这样的:

```ruby
require 'carrierwave/processing/mini_magick'
class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  
  def store_dir
    "#{model.class.to_s.underscore}/#{mounted_as}"
  end
  
  def extension_white_list
    %w(jpg jpeg gif png)
  end
  
  def default_url
    "avatar/#{version_name}.jpg"
  end
  
  def filename
    if super.present?
      model.uploader_secure_token ||= SecureRandom.uuid.gsub("-","")
      Rails.logger.debug("(BaseUploader.filename) #{model.uploader_secure_token}")
      "#{model.uploader_secure_token}.#{file.extension.downcase}"
    end
  end  
  
  version :tiny do
    process :resize_to_fill => [20, 20]
  end
    
  version :small do
    process :resize_to_fill => [30, 30]
  end

  version :normal do
    process :resize_to_fill => [100, 100]
  end

  version :large do
    process :resize_to_fill => [240, 240]
  end
end

# 你可以能还有 PhotoUploader, CoverUploader ... 用于处理 Photo 和 Cover 格式的图片

class User < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
end

class Photo < ActiveRecord::Base
  mount_uploader :photo, PhotoUploader
end
```

在 Views 里面你是这样:

```erb
<%= image_tag(@user.avatar.url(:small)) %>
```

### 改用又拍云图片空间以后，你需要这样

先在又拍云的图片空间里面配置好你需要的“自定义缩略图尺寸”.

> 定义缩略图一定要提前想好!<br />因为版本一定义好，名称就不能修改了，也不能删除，并且最多有 30 种的限制。

接下来改造你的代码，将 AvatarUploader, PhotoUploader, CoverUploader 扔掉，改用一个 ImageUploader 代替:

```ruby
# coding: utf-8
require 'carrierwave/processing/mini_magick'
# 在图片空间里面定义好的“缩略图版本名称”，以防止调用错误
IMAGE_UPLOADER_ALLOW_IMAGE_VERSION_NAMES = %(20x20 30x30 240x240 100x100 120x90 160x120 250x187 320 640 800)
class ImageUploader < CarrierWave::Uploader::Base
  def store_dir
    "#{model.class.to_s.underscore}/#{mounted_as}"
  end

  def default_url
    # 搞一个大一点的默认图片取名 blank.png 用 FTP 传入图片空间，用于作为默认图片
    # 由于有自动的缩略图处理，小图也不成问题
    # Setting.upload_url 这个是你的图片空间 URL
    "#{Setting.upload_url}/blank.png#{version_name}"
  end
  
  # 覆盖 url 方法以适应“图片空间”的缩略图命名
  def url(version_name = "")
    @url ||= super({})
    version_name = version_name.to_s
    return @url if version_name.blank?
    if not version_name.in?(IMAGE_UPLOADER_ALLOW_IMAGE_VERSION_NAMES)
      # 故意在调用了一个没有定义的“缩略图版本名称”的时候抛出异常，以便开发的时候能及时看到调错了
      raise "ImageUploader version_name:#{version_name} not allow."
    end
    [@url,version_name].join("!") # 我这里在图片空间里面选用 ! 作为“间隔标志符”
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    if super.present?
      model.uploader_secure_token ||= SecureRandom.uuid.gsub("-","")
      Rails.logger.debug("(BaseUploader.filename) #{model.uploader_secure_token}")
      "#{model.uploader_secure_token}.#{file.extension.downcase}"
    end
  end
end

class User < ActiveRecord::Base
  mount_uploader :avatar, ImageUploader
end

class Photo < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end

class Category < ActiveRecord::Base
  mount_uploader :cover, ImageUploader
end

# ... 所有需要图片上传 Uploader 的地方都用 ImageUploader
```

然后 Views 里面调用的时候你就需要将以前的 :small, :large ... 改成新的版本名称了

```erb
<%= image_tag(@user.avatar.url("20x20")) %>
```

当然我不建议你直接这么写，你应该写个 `user_avatar_tag` 的 Helper 来做上面这段的事情:

users_helper.rb

```ruby
def user_avatar_tag(user, options = {})
  options[:style] ||= :small
  style = case options[:style].to_s
  when "small" then "30x30"
  when "normal" then "100x100"
  when "large" then "240x240"
  when "tiny" then "20x20"
  else options[:style].to_s
  end
  link_to image_tag(user.avatar(style)), user
end
```

View 里面用 helper 

```erb
<%= user_avatar_tag(@user, :style => :tiny) %>
```

然后一切都爽了，你都不需要装 ImageMagick (RMagick, mini_magick) 了，上传的时候只会有一张原图发往又拍云，然后通过不同的 URL 规则就能调用到缩略图。

<h2 id="cdn-asset-files">使用又拍云的 CDN 来部署你的 Assets 文件</h2>

由于又拍云的存储还带有 CDN 分发功能，我们可以直接用它来存储我们的 Javascripts, Stylesheets, Images 这些资源文件，这样可以让访客在国内的任意地方下载这些文件都可以尽可能的使用最近的 CDN 节点，页面加载速度就自然能快起来。

参考一下 Ruby China 的这个 Commit 的代码：

* [https://github.com/ruby-china/ruby-china/commit/d050f7f8b7441fbd88671e0008205f4ccffca8b5](https://github.com/ruby-china/ruby-china/commit/d050f7f8b7441fbd88671e0008205f4ccffca8b5)

里面包含 4 个文件的改动:

* `lib/ftp_sync.rb` - FTP 同步功能，此文件无需修改
* `config/environments/production.rb` - 将 asset_host 改成你的又拍云域名
* `lib/tasks/assets/cdn.rake` - 搞个 rake assets:cdn 命令用于执行同步功能，此文件你需要修改又拍云的配置信息
* `config/deploy.rb` - 在 Capistrano 的部署过程加入调用 rake assets:cdn

>  注意，如果你在用图片空间的话，要注意改写 `cdn.rake` 的时候 Bucket 一定要用一个“文件空间”!<br />
> 因为图片空间是没法存放 js,css 文件的，你可以定义两个 Bucket, 一个用于存图片，一个用于存 Assets 文件。

当你在 `rake assets:precomplie` 编译出 Assets 文件以后，就可以执行 `rake assets:cdn` 将预编译好的 Assets 文件同步到又拍云里面了。 (Ruby China 里面那个脚本以经过反复尝试，靠谱！)

---------------------

后面没了，以后有时间再研究一下 又拍的 Form API 与 Rails 项目结合。

## 上面提及的资源的地址

* [又拍云存储](https://www.upyun.com/?utm_source=ruby-china&utm_medium=ad&utm_campaign=upyun&md=ruby-china)
* [CarrierWave](https://github.com/jnicklas/carrierwave)
* [carrierwave-upyun](https://github.com/nowa/carrierwave-upyun)
* [Rails 调用又拍云 Form API 的例子](https://gist.github.com/3414491)
* [Ruby China 的源代码](https://github.com/ruby-china/ruby-china)