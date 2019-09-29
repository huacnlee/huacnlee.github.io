---
layout: post
title: "Ubuntu 自动安装部署 Rails 环境"
date: 2009-11-19 08:54
comments: true
categories: 
- Rails
- 部署
- 服务器
- Ubuntu
- Ruby
- Passenger
- Shell
---
<p>你需要经常安装部署 Rails 到新的 Web 服务器吗？</p>
<p>你是否还在经历每次从安装 Ruby Rubygems MySQL... 再到安装 Web Server 组件... 反复烦躁的安装流程呢？</p>
<p>现在你可以改用这个脚本实现在 Ubuntu Server 上面部署 <span style="color: #000080;"><span style="background-color: #99ccff;"><strong>Ruby1.8</strong> + <strong>Rails </strong>+ <strong>Passenger </strong>+ </span></span><strong><span style="color: #000080;"><span style="background-color: #99ccff;">Nginx</span></span> </strong>的环境：</p>
<!-- more -->
```bash
#!/bin/sh
echo "=== YTRIPTHIRD UBUNTU INSTALL ==="
cd /tmp

# Ruby
echo "=== Install Ruby library..."
sudo apt-get install g++ ruby1.8 rubygems rake irb ruby1.8-dev build-essential libopenssl-ruby imagemagick rmagick 
echo "=== Ruby library install done."
echo ""

# MySQL Server
echo -n "Do you wan't install MySQL automatic[y/n]:"
read KEY
case $KEY in
y|Y)
  echo "=== Install MySQL server..."
  sudo apt-get install mysql-server mysql
  ;;
esac
sudo apt-get install libmysqlclient-dev
echo "=== MySQL install done."
echo ""


# Rubygems
echo -n "Do you wan't install Rubygems?[y/n]:"
read KEY
case $KEY in
y|Y)
  echo "=== Install Rubygems from source file..."
  wget http://rubyforge.org/frs/download.php/60719/rubygems-1.3.5.zip
  unzip rubygems-1.3.5.zip
  cd rubygems-1.3.5
  sudo ruby setup.rb
  sudo gem sources -a http://gems.github.com
  cd ..
  sudo rm -R /tmp/rubygems-1.3.5
  echo "=== Rubygems install done."
  ;;
esac
echo ""


# Install Rails
echo -n "Do you wan't install Rails?[y/n]"
read KEY
case $KEY in
y|Y)
  echo "=== Install Rails and some Gems..."
  sudo gem install rails passenger --no-rdoc
  echo "=== Rails install done."
  ;;
esac
echo ""

# Install Web server
echo "=== Install Web Server"
wget http://sysoev.ru/nginx/nginx-0.7.64.tar.gz
tar zxf nginx-0.7.64.tar.gz
echo ""
echo "===*** Nginx install Warring! ***==="
echo "   *** nginx source path: /tmp/nginx-0.7.64 "
echo "   *** must be install nginx in: /etc/nginx "
echo ""
sudo passenger-install-nginx-module
echo "=== Web Server install done."
echo ""
```

<p>此脚本一在 Ubuntu Server 9.04 版本上面测试通过，不过可能有些时候需要对这个脚本做一些微调后方可适应你的环境，如 Ruby 的版本、Rails的版本...</p>
<p>或者你不想用 Passenger + Nginx 来部署你的 Rails App，也可以修改 <strong>Install Web Server</strong> 这段。</p>
<p>或者还可以在 第一段批处理的地方加入更多的类库安装....</p>
<p>总之，本脚本是给你一个参考例子，以后部署 Rails App 别再手动安装了，把你的安装过程整理到 Shell 脚本中去，然后： `$ sh install-ubuntu.sh`
<p>搞定所有流程，方便省事，又不用每次部署的时候反复的在 Google 上面查资料！</p>
