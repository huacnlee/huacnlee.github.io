---
layout: post
title: "Rails 使用Rake + cronjob 创建计划任务"
date: 2009-08-04 17:46
comments: true
categories: 
- Rails
- 教程
- Rake
- cronjob
---
目前我在我的网站首页加上了 Twitter 消息引入功能，之前是饭否的，更新的方式是使用 Rails.cache.write(:expires_in =&gt; 15.<span class="blue12other">minutes</span>) ，但后面发现这个过期没有起作用。而且这个操作方式比较慢，因为是用户在刷新页面的时候如果缓存过期的话，就再次通过 API 去饭否或 Twitter 更新最新的消息。连接到国内的饭否 API 还没什么感觉，本来服务器网速快，但到了 Twitter 上面问题就来了，一个请求要好几秒，而且更新频率要求很高的
于是想了想换成 计划任务的方案，让系统某某的在后台自动更新 Twitter 消息。
看了 《<a href="http://railsenvy.com/2007/6/11/ruby-on-rails-rake-tutorial" target="_blank">Ruby on Rails Rake Tutorial (aka. How rake turned me into an alcoholic)</a>》，学习它使用 Rake + Linux 计划任务的方式来操作。
<!-- more -->
## 步骤

* 修改 rails app 目录下面的 `Rakefile` ，里面插入自已的 rake namespace 如：

```ruby
# Twitter
namespace :tweet do
  desc "Twitter reload."
  task :update => :environment do
    require 'app/models/setting'
    require 'app/models/tweet'
    setting = Setting.find_create
    if !setting.fanfou_id.blank?
      puts 'Load tweets from twitter.com...'
      items = Tweet.get_home_messages(setting.fanfou_id,5,true)
      puts "Done. there have #{items.count} tweet."
    end
  end
end
```
* 保存后就可以使用 `RAILS_ENV=production rake tweet:update` 来测试这个 rake 任务了。
* 接下来创建一个 `cronjob` 文件，内容如下：
```bash
*/15 * * * * cd /opt/wwwroot/myrailsapp/ && rake RAILS_ENV=production tweet:update
```

* */15 表示15分钟指行一下 `RAILS_ENV=production rake tweet:update` 这个任务。
* 然后我把 `cronjobs` 这个文件加入到 Linux root 的 [cronjob](http://www.aota.net/Script_Installation_Tips/cronhelp.php3) 里面去，运行：

```bash
$ sudo crontab cronjobs
$ sudo crontab -l
*/15 * * * * cd /opt/wwwroot/myrailsapp/ && rake RAILS_ENV=production tweet:update
```

* 另外请注意执行权限的问题，我这里因为 Rails 应用程序需要用到 root 权限，所以任务是加在 root 的 crontab 里面的。

### 参考资料：

<ul>
<li><a href="http://railsenvy.com/2007/6/11/ruby-on-rails-rake-tutorial" target="_blank">Ruby on Rails Rake Tutorial (aka. How rake turned me into an alcoholic)</a></li>
<li><a href="http://www.linuxfly.org/post/11/" target="_blank">Linux下实行计划任务</a></li>
<li><a href="http://www.javaeye.com/topic/149342" target="_blank">Javaeye - 关于ROR的定时任务</a> </li>
</ul>
