---
layout: post
title: "Django Views 里面 Templates 输出的更好的方法"
date: 2008-11-13 08:00
comments: true
categories:
- Django
- 技巧
- Python
---
<p>Django里面我们通常会通过这样来将结果递交给Template页面处理并输出最终结果</p>

```python
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.template import TemplateDoesNotExist, RequestContext
from django.shortcuts import render_to_response, get_object_or_404

def archive_view(request, year, month, page_num = None):
    posts = Post.objects.filter(date__year = int(year),
            date__month = int(month),
            type = 'post').order_by('-date')

    if page_num:
        current_page = int(page_num)
    else:
        current_page = 1

    link = '/archives/%s/%s' % (year, month)

    page = None
    if len(posts) > 5:
        page = Paginator(posts, 5).page(current_page)
        posts = page.object_list

    return render_to_response('post/archive.html',
                { 'year': year,
                'month': month,
                'posts': posts,
                'page': page,
                'current_page': current_page,
                'link': link},
                context_instance = RequestContext(request)
                )
```

<p>这里拿的是来自 <a href="http://code.google.com/p/pulog" target="_blank">Pulog</a> 的 <a href="http://code.google.com/p/pulog/source/browse/trunk/pulog/views/post.py" target="_blank">Views.py</a> 里面的一段代码。</p>
<p>Django 的官方文档里面所讲述的做法就是这样的，当然我不是讲这种方法有错，而是我们需要对它进行抽像，好处在于当某天我们需要统一对 Views 到 Templates 中间加入统一的处理的时候可以更方便，不用再从很多代码中一处一处修改。</p>
<p>我在做我的 Coderblogs 的时候曾经是这样做的：</p>


```python
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.template import TemplateDoesNotExist, RequestContext
from django.shortcuts import render_to_response, get_object_or_404

def _out_page(template,data):
    """
    summary:
        输出页面HTML,template的Response
    params:
        filename    template 文件名
        data    Context 的数据字典
    """
    _template = loader.get_template(template)
    _context = Context(data)
    _output = _template.render(_context)
    return HttpResponse(_output)

def home(request):
    _out_page('home.html',{'name' : 'Jason Lee','sex':'male'})
```


<p>但是刚才我在 Django的 Wiki 里面看到了 <a href="http://code.djangoproject.com/wiki/CookBookShortcutsPageDecoratorSimple" target="_blank">更好的做法</a></p>

```python
from django.shortcuts import render_to_response
from django.template import RequestContext

def render_to(tmpl):
    def renderer(func):
        def wrapper(request, *args, **kw):
            output = func(request, *args, **kw)
            if not isinstance(output, dict):
                return output
            return render_to_response(tmpl, output,
                                      context_instance=RequestContext(request))
        return wrapper
    return renderer

@@render_to('home.html')
def home(request):
    return {'name' : 'Jason Lee','sex':'male'}
```
