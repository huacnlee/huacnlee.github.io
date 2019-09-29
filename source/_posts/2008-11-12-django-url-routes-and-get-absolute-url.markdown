---
layout: post
title: "关于 Django 的 URL 配置与 get_absolute_url 方法"
date: 2008-11-12 07:36
comments: true
categories:
- Python
- Django
- 教程
---
<p>今天白天的时候看了一篇文章 《<a href="http://jeffcroft.com/blog/2008/nov/10/djangos-url-template-tag-sucks/" target="_blank">DJANGO&rsquo;S URL TEMPLATE TAG SUCKS</a>》，英文不是很好，大概的理解了一下，好像是讲，<a href="http://www.djangoproject.com" target="_blank">Django</a> Url 的设计不够好的地方。另外这篇文章向我们推荐了一下更好的URL写法。</p>

<之前我在 Templates 里面调用URL地址都是用 `{% url apps.views.post post.user.slug,post.id %}` 这种方式来调用 `urls.py` 里面配置的URL地址，但是Template里面会用到很多，如果当参数有变动的时候，重构将会是很麻烦的事情。所以我需要调用一个固定的地方。

Django 的 Model 里面有一个 `get_absolute_url()`的方法，这个东西是定义Model的对象的查看地址，主要是用在RSS与后台查看页面的，以前看RSS的文档里面的写法是直接组合URL地址，如：

```python
class Post(models.Model):
    title = models.CharFiled(max_length=200)
    slug = models.CharField(max_length=255)
    body = models.TextField()

    def get_absolute_url(self):
        return 'post/%s.html' % (self.slug)
```

<p>但urls.py我们又定义了url的格式，这样在项目中就出现了两处关于这个页面的url配置，这样的以后做修改的时候就会有可能出现遗漏。</p>
<p>所以我们需要想办法当url的配置终一化，<span style="color: #008000;">urls.py</span> 是被 Django 定义为url定义的，理所当然关于 url 的配置就应当写在这里，哪么 models 里面的 <span style="color: #ff6600;"><em>get_absolute_url()</em></span> 怎么得到 <span style="color: #008000;">urls.py</span> 里面的定义呢？</p>
<p>查了一下官方文档：</p>
<ul>
<li><a href="http://docs.djangoproject.com/en/dev/ref/models/instances/?from=olddocs#get-absolute-url" target="_blank">http://docs.djangoproject.com/en/dev/ref/models/instances/?from=olddocs#get-absolute-url</a></li>
<li><a href="http://docs.djangoproject.com/en/dev/topics/http/urls/#topics-http-urls" target="_blank">http://docs.djangoproject.com/en/dev/topics/http/urls/#topics-http-urls</a> </li>
</ul>
<p>这两篇里面有讲到关于我这种需求的实现，按着它的方式试，但一直没有成功，在 template 里面始终不出值，也没有错误（这个比较让我郁闷，大哥，再怎么来个提示哇，不然杂调试呀！）。</p>
<p>后面 Google 了一下，看到这篇文章 《<a href="/2007/12/10/django-models-get_absolute_url/" target="_blank">Django中models中get_absolute_url方法在管理端链接错误的解决方法</a>》,终于把问题解决了，结合它的，总结一下：</p>

### urls.py

```python
# -*- coding: utf-8 -*-
from django.conf.urls.defaults import *
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Home:
    (r'^$','apps.views.home'),
    url(r'^post/(?P<slug>[a-zA-Z0-9_\-]+)[/]{0,1}$','apps.views.post',name='post_view'),

    # Admin:
    (r'^admin/r/', include('django.conf.urls.shortcut')),
    (r'^admin/(.*)',admin.site.root),

    # Other:
    (r'^static/(.*)','django.views.static.serve', {'document_root': './static/'}),
)
```

### models.py

```python
# -*- coding: utf-8 -*-
from django.db import models,connection
from django.contrib import admin
from django.core.urlresolvers import reverse

class Post(models.Model):
    title = models.CharField('标题',max_length=200)
    slug = models.CharField('slug',max_length=255,blank=True)
    summary = models.TextField('摘要',blank=True)
    body = models.TextField('正文')

    def get_absolute_url(self):
       return reverse('post_view',args=[self.slug])
```

### views.py:

```python
# -*- coding: utf-8 -*-
from django.http import HttpResponse,Http404, HttpResponseRedirect, HttpResponseServerError
from django.template import Context, loader
from django.shortcuts import get_object_or_404

def post(request,slug):
    post = None

    try:
        post = Post.objects.get(slug = slug)
    except:
        return Http404()

    data = {
            'post' : post,
            }

    template = loader.get_template('post.html')
    context = Context(data)
    output = template.render(context)

    return HttpResponse(output)
```

### templates/post.html

```html
<div class="post">
  <h1>{{ post.title }}</h1>
  <div class="url">URL:{{ post.get_absolute_url }}</div>
  <div class="summary">
  {{ post.summary }}
  </div>
</div>
```
