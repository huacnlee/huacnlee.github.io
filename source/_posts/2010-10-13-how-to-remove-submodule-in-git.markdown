---
layout: post
title: "Git submodule 如何删除一个 submodule"
date: 2010-10-13 21:23
comments: true
categories: 
- Git
---
<p>这个问题困扰了我很久，经常在下载一些项目使用 Git Submodule 功能的时候遇到 某个 sub module 源不存在的问题，本来是可以在 Github 上面找到类似的源，但却没法删掉当前这个有问题的 Submodule。</p>
<p>用 git submodule --help 看帮助里面也没有类似的说明...</p>
<p>也曾试过强行修改 .gitmodule 和 .git/config 两个文件，并找遍了 .git/ 目录里面的文件并确认没有那个 module 的信息，但还是不行，提示说 那个 module 还在...</p>
<p>今天终于在 StackOverflow 上面找到了原因... 原来是需要删除缓存才可以</p>
<p>例如一个 Rails 插件的submodule 目录是 vendor/plugins/will_paginate</p>
<ol>
<li>从 .gitmodule 文件里面删掉关于&nbsp;vendor/plugins/will_paginate 的配置信息</li>
<li>git rm --cached&nbsp;vendor/plugins/will_paginate&nbsp;</li>
<li>现在可以重新添加了</li>
</ol>
<div><strong>注意，目录后面不要带 /&nbsp;</strong></div>
<div><strong><br /></strong></div>
<p>&nbsp;</p>
