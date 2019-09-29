---
layout: post
title: "自定义 Rails 的 Scaffold 模板提高开发效率"
date: 2011-01-06 17:59
comments: true
categories: 
- Rails
- Scaffold
- 模板
---
<p>Rails Scaffold&nbsp;应该是每个 Rails 开发者最早接触的东西。它可以帮助我们快速生成对应的 Model Controller Views Routes 等东西。</p>
<p>但这玩意并不是那么好，默认的模板太过简单，如果对它稍作一些该进，就会省区很多麻烦。</p>
<p>例如下面这些情况：</p>
<ol>
<li>需要生成后台目录下面的 Controllers 就不给力了，虽然可以用 rails g controller admin/posts 来生成，但会出来一些多余的命名空间；</li>
<li>我需要它直接就是中文的，免得反复修改；</li>
<li>模板生成的 HTML 结构太过简单，无法满足实际需求，每次都得修改好多处；</li>
<li>REST 的 xml 格式经常都用不上，把它去掉或者改成 json 或许会更好。</li>
<li>列表页面改用 wice_grid 来代替</li>
<li>用 <a href="https://github.com/plataformatec/simple_form" target="_blank">simple_form</a> 或者 <a href="https://github.com/justinfrench/formtastic" target="_blank">formtastic</a>&nbsp;来代替默认的表单</li>
</ol>
<!-- more -->
<div><br /></div>
<div>终于我忍不住了，这两天查了查资料，顺便研究了一下 Rails 源代码关于 Generator 的部分，原来 Rails 3 可以直接在 lib 文件夹里面创建自己的模板。</div>
<div><br /></div>
<h2>ERB 的模板</h2>
<div>lib/templates/erb/scaffold/ &nbsp;里面放自定义模版,参考Rails源代码的<a href="https://github.com/rails/rails/tree/master/railties/lib/rails/generators/erb/scaffold/templates" target="_blank">那几个文件</a>,把他们下载回来,放到项目&nbsp;lib/templates/erb/scaffold/ 里面,就可以定制了.&nbsp;</div>
<div><br /></div>
<h2>Controller 模板</h2>
<div>这个要放在 lib/templates/rails/scaffold_controller/controller.rb 里面，<a href="https://github.com/rails/rails/blob/master/railties/lib/rails/generators/rails/scaffold_controller/templates/controller.rb" target="_blank">参考文件</a></div>
<div><br /></div>
<h2>可以看一下我定制的模板</h2>
<ul>
<li><strong>代码：<a href="https://github.com/huacnlee/rails_templates" target="_blank">https://github.com/huacnlee/rails_templates</a></strong></li>
</ul>
<p>我这个用 wice_grid 和 simple_form 代替默认的表格和表单，views 新增一个 _base.html.erb 用于小栏目通用，并且一个大的改进是针对生成后台的情况做了修正。</p>
<p>你可以 rails g scaffold Post title:string body:text user_id:integer 生成前台代码，然后再用&nbsp;rails g scaffold_controller admin/post title:string body:text user_id:integer 生成后台的 Controller 和 Views 并且互不影响，生成出来的代码不用修改就可使用。</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
