---
layout: post
title: "腾讯社区开放平台 SDK for Ruby"
date: 2010-09-17 11:00
comments: true
categories: 
- Ruby
- 开源
- qq-pengyou
---
<p>腾讯终于开放平台了，期盼了很久。</p>
<p>正准备试试在目前的项目中于它整合，却发现木有 SDK for Ruby 的...下载了官方提供的 <a href="http://wiki.opensns.qq.com/wiki/SDK%E4%B8%8B%E8%BD%BD" target="_blank">SDK</a>(php 的)，看了一下，就只是简单的 curl 调用远程地址获得 JSON 数据而已，代码量也不多，于是自己做了一个 for Ruby 的类库，功能接口基本等于从 php 那个 SDK 翻译过来的，我已经对里面实现的方法进行了测试，并成功的获得了返回结果。</p>
<p>如果你也正准备用&nbsp;<strong><a href="http://opensns.qq.com/" target="_blank">腾讯开放平台</a> </strong>，可以试试这个东西。</p>
## 项目地址

[http://github.com/huacnlee/qq-pengyou](http://github.com/huacnlee/qq-pengyou)

## 文档

[http://rdoc.info/github/huacnlee/qq-pengyou/master/frames](http://rdoc.info/github/huacnlee/qq-pengyou/master/frames)
