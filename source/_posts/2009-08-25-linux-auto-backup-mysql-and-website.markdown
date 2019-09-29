---
layout: post
title: "Linux 定时自动备份MySQL与网站并发送邮件"
date: 2009-08-25 21:26
comments: true
categories: 
- Linux
- MySQL
- Backup
- Shell
---
网站备份是一件很重要的事情，如何做到每日自动备份并自动通过邮件附件的方式发送到自已的邮箱呢？
今天研究了一下终于实现了，并加上 Cron 任务，每天自动备份

* 这里需要用到 Linux <span style="color: #ff6600;">SendMail </span>，如果没有请先安装，Ubuntu 安装方式：</strong>

```bash
$ sudo apt-get install sendmail
```
<!-- more -->

* 使用 *mysqldump* 完整备份数据库：

```bash
# -uroot(root是用户名 -u与root之间没空格) -p123123 (123123是密码 -p与123123之间没空格)
$ mysqldump -uroot -p123123 --databases pasite > $BACKUP_PATH/pasite.sql
```

* 打包压缩网站和数据库的SQL文件：

```bash
# 1.将刚才到处的MySQL文件压缩，以节省邮箱空间
tar zcf $BACKUP_PATH/pasite_db_$DATE_NAME.tar.gz $backup_path/pasite.sql
tar zcf $BACKUP_PATH/personlab_db_$DATE_NAME.tar.gz $backup_path/personlab.sql
# 2.打包压缩网站
tar zcf $BACKUP_PATH/pasite_src_$DATE_NAME.tar.gz ~home/huacnlee/wwwroot/pasite/
tar zcf $BACKUP_PATH/personlab_src_$DATE_NAME.tar.gz ~home/huacnlee/wwwroot/personlab/
```

* 将打包好的文件用 *mutt* 命令 *SendMail* 以附件的方式发送到自己的邮箱：

```bash
# 发送邮件
echo "pasite.org db backup" | mutt -a $BACKUP_PATH/pasite_db_$DATE_NAME.tar.gz -s "pasite.org db backup" huacnlee@gmail.com
echo "huacnlee.com db backup" | mutt -a $BACKUP_PATH/personlab_db_$DATE_NAME.tar.gz -s "huacnlee.com db backup" huacnlee@gmail.com
echo "pasite.org source backup" | mutt -a $BACKUP_PATH/pasite_src_$DATE_NAME.tar.gz -s "pasite.org source backup" huacnlee@gmail.com
echo "huacnlee.com source backup" | mutt -a $BACKUP_PATH/personlab_src_$DATE_NAME.tar.gz -s "huacnlee.com source backup" huacnlee@gmail.com
```

### 完整的Shell脚本：

```bash
#!/bin/sh
# Linux 自动备份 MySQL与网站并发邮件到自已邮箱
# 定义临时目录
BACKUP_PATH=/tmp/autobackups
# 定义日期字符串
DATE_NAME=`date +%y%m%d`
# 创建临时目录
mkdir $BACKUP_PATH

# 打包文件
# 1.完整备份 MySQL -uroot(root是用户名 -u与root之间没空格) -p123123 (123123是密码 -p与123123之间没空格)
mysqldump -uroot -p123123 --databases pasite > $BACKUP_PATH/pasite.sql
mysqldump -uroot -p123123 --databases personlab_production > $BACKUP_PATH/personlab.sql
# 2.将刚才到处的MySQL文件压缩，以节省邮箱空间
tar zcf $BACKUP_PATH/pasite_db_$DATE_NAME.tar.gz $backup_path/pasite.sql
tar zcf $BACKUP_PATH/personlab_db_$DATE_NAME.tar.gz $backup_path/personlab.sql
# 3.打包压缩网站
tar zcf $BACKUP_PATH/pasite_src_$DATE_NAME.tar.gz ~home/huacnlee/wwwroot/pasite/
tar zcf $BACKUP_PATH/personlab_src_$DATE_NAME.tar.gz ~home/huacnlee/wwwroot/personlab/

# 发送邮件
echo "pasite.org db backup" | mutt -a $BACKUP_PATH/pasite_db_$DATE_NAME.tar.gz -s "pasite.org db backup" huacnlee@gmail.com
echo "huacnlee.com db backup" | mutt -a $BACKUP_PATH/personlab_db_$DATE_NAME.tar.gz -s "huacnlee.com db backup" huacnlee@gmail.com
echo "pasite.org source backup" | mutt -a $BACKUP_PATH/pasite_src_$DATE_NAME.tar.gz -s "pasite.org source backup" huacnlee@gmail.com
echo "huacnlee.com source backup" | mutt -a $BACKUP_PATH/personlab_src_$DATE_NAME.tar.gz -s "huacnlee.com source backup" huacnlee@gmail.com

# 删除临时文件
rm -R $BACKUP_PATH
```

接下来创建 Linux Cron 任务，让系统定时执行上面这个 shell 脚本：
使用命令 `sudo crontab -e` 并加入下面的代码:
```bash
32 3 * * * cd /home/huacnlee/wwwroot/ &amp;&amp; sh auto_backup.sh
```

关于 crontab 的介绍请移步看《<a href="http://huacnlee.com/blog/create-rails-task-scheduler-by-rake-and-cronjob" target="_blank">Rails 使用Rake + cronjob 创建计划任务 </a>》里面的介绍，我这里设置的是每天凌成3点32分开始执行，当然上面的shell脚本是保存在 `/home/huacnlee/wwwroot/auto_backup.sh` 这儿的。

