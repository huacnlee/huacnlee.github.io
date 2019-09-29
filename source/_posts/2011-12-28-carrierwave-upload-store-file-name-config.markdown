---
layout: post
title: "Carrierwave 如何配置合理的上传文件名"
date: 2011-12-28 14:33
comments: true
categories: 
- Ruby
- Carrierwave
---
一直在寻找一个好的 Carrierwave 上传文件命名结构（GridFS），今天终于找到了，这个方式比较靠谱。

```ruby
# coding: utf-8
require "digest/md5"
require 'carrierwave/processing/mini_magick'
class BaseUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :grid_fs

  def store_dir
    "#{model.class.to_s.underscore}"
  end

  # 调整临时文件的存放路径，默认是再 public 下面
  def cache_dir
    "#{Rails.root}/tmp/uploads"
  end
  
  # TODO: 此处要想办法，开启了 open-uri 下载的因为文件名的问题无法通过验证
  # Allow image file extensions
  def extension_white_list
    %w(jpg jpeg gif png)
  end
  
  # Override the filename of the uploaded files:
  def filename
    if original_filename 
      # current_path 是 Carrierwave 上传过程临时创建的一个文件，有时间标记
      # 例如: /Users/jason/work/ruby-china/public/uploads/tmp/20131105-1057-46664-5614/_____2013-11-05___10.37.50.png
      @name ||= Digest::MD5.hexdigest(current_path)
      "#{@name}.#{file.extension}"
    end
  end
end
```

## 这么做的原因:

* carrent_path 的算法 `Time.now.utc.to_i.to_s + '-' + Process.pid.to_s + '-' + ("%04d" % rand(9999)) + 原始文件名`，所以理论上重复的概率非常低，外加上一般上传并不会有那种瞬间并发出现的场景，[来源](https://github.com/carrierwaveuploader/carrierwave/blob/0d6864a84dbed16ef0ed149f332fa3b9f9bd35eb/lib/carrierwave/uploader/cache.rb#L18)
* 所有版本的缩略图的 MD5 都是相同的
* 简洁
* 注意！此处在某些高并发上传的情况下，可能有微妙的概率会导致 @name 重复，比如在批量导入的时候

<!-- more -->

## 以前曾经试过这些方式（都不靠谱）:

* 原始文件名 + model.class_name + model.id
* 用 model.updated_at + model.class_name
* 用文件 MD5，原始文件无法取到，结果每个缩略图的文件名都不同
* 用 model.class_name + model.id

如果你用过 Carrierwave 上面我所的应该能理解，具体我就不解释了。
