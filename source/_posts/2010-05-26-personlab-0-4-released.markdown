---
layout: post
title: "新版本 Personlab 0.4 发布"
date: 2010-05-26 20:47
comments: true
categories: 
- Personlab
- Rails
- Opensource
- 开源
- 博客
---
最近在慢慢的改进我的开源博客项目 <a href="http://github.com/huacnlee/personlab" target="_blank">Personlab</a>&nbsp;慢慢的根据以前的计划改善这个博客系统.

## 0.4 版的变化

<ol>
<li>首页 Twitter 如果你服务器无法翻墙的话,可以修改配置文件来关闭它;</li>
<li>评论 Email 提醒功能-现在起,在博客里面发表评论后,会给参与评论的人发送邮件提醒,以便于访客回访率,同时也能有效的改善反复交流的流程,此功能默认会所有参与者发提醒(除非它退定,而由于没有用户机制,退定是按文章来退定的);</li>
<li>将默认数据从 Migration 迁移到了 Seeds 里面,这个要感谢谢 <a href="http://terrytai.com/" target="_blank">Terry</a>&nbsp;的提醒;</li>
<li>使用了新版验证码机制,输入一次后,下次就不用再输入了;</li>
<li>改善了一些安装方面的脚本;</li>
<li>修复了几处缓存过期的问题;</li>
</ol>

更多的变化请看提交记录:

<a href="http://github.com/huacnlee/personlab/commits/master" target="_blank">http://github.com/huacnlee/personlab/commits/master</a>

## 完整源代码下载地址

[http://github.com/huacnlee/personlab/](http://github.com/huacnlee/personlab/)