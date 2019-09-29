---
layout: post
title: "Python 将类的对象转换成 JSON 详解"
date: 2008-10-05 08:00
comments: true
categories:
- Python
- JSON
- 技巧
---
<p><a href="http://www.json.org" target="_blank">JSON</a>这个东西相信现在大家都已经不再陌生，第一次接触它时我便对它爱不释手！记得在发现JSON之间，一直使用XML结构来传递数据，但XML这个东西太麻烦了，不管是在服务端或是JS里面，写入与读入都是哪么的麻烦。而JSON实在是太方便了，通过一些开源的<a href="http://www.json.org" target="_blank">JSON类库</a>可以很方便的将一个对象转换成字符串的形式来传递。 <br />网上也有很多讲<a href="http://www.python.org" target="_blank">Python</a> + <a href="http://www.json.org" target="_blank">JSON</a> 的文章，但我这里要讲的是它们都没有提到的一种常用的方式。 <br />&nbsp;<br />昨晚在用<a href="http://www.python.org" target="_blank">Python</a> + <a href="http://www.djangoproject.com" target="_blank">Django</a> 做AJAX的东西，我自定义了一个返回值对象(<strong><span style="color: #ff0000;">ExecuteState</span></strong>)的类，再用JSON的方式返回到页面前端。 <br />以前在.NET里面做类似的操作一直是在用一个叫 <a href="http://james.newtonking.com/projects/json-net.aspx" target="_blank">Json.NET</a> 的开源类库，很方便。于是在 Python 里面我继续用这种方式，而 Django 里面也有自带一个叫 <a href="http://pypi.python.org/pypi/simplejson" target="_blank">simplejson</a> 的类。 <br />开始想想实现这东西应该很简单，可没想到后面因为一个很小的细节让我绕了一大圈...在此写出来与大家分享，以免再次走弯路。</p>
<p><strong><span style="font-size: large;">例子</span>：</strong></p>

### Python 代码:

```python
from django.utils import simplejson
# 其它django的引用这里省略

class ExecuteState():
    """
    summary:
        返回值对象,用于返回执行状态
    """
    # 是否执行成功,默认是 True 成功，因为经过长期使用发现 True 用得较多
    success = True
    # 提示消息
    message = ""
    # 导致不成功的标志，错误是由谁引起的
    mark = ""
    # 导致不成功的对象 [object 类型]
    owner = None

    def json(self):
        """
        summary:
            得到本对象的JSON格式的字符串
        """
        return simplejson.encode(str(obj2dict(self)))

def obj2dict(obj):
    """
    summary:
        将object转换成dict类型
    """
    memberlist = [m for m in dir(obj)]
    _dict = {}
    for m in memberlist:
        if m[0] != "_" and not callable(m):
            _dict[m] = getattr(obj,m)

    return _dict

def signup(request):
    """
    summary:
        signup 视图,URLs里面的定义这里省略
    """
    state = ExecuteState()

    if reuqest.POST:
        # 提交视图处理
        username = request.POST["username"]
        realname = request.POST["realname"]
        password = request.POST["password"]
        password_confirm = request.POST["password_confirm"]
        email = request.POST["email"]

        # 重点！验证输入的内容是否符合要求
        state.success = False

        if len(username) < 4 or len(username) > 16:
            state.message = "用户名太短，要求4-16个字符。"
            state.mark = "username"
            # 不符合要求了，在这直接用 return 中断并返回 state 用 simplejson.encode 将 state 转换成 JSON
            # 注意！这里有用 dir(state) 这个就是我要讲的一个细节
            #
            return state.json()

        if not regex_check_chinese(realname):
            state.message = "姓名要求必须是中文。"
            state.mark = "realname"
            return state.json()

        # 后面的提交数据库省略...

        # 成功消息
        state.success = True
        state.message = "注册成功。"
        return state
    else:
        # signup 地址普通打开的处理
```

### Javascript 代码:

```javascript
/*
    这里以jQuery的Ajax实现为例
    引用、调用提交事件 这里略...
 */
/**
 * 注册页面JS类库
 */
var Signup = {
    /**
     * Ajax提交事件
     */
    post : function(){
        // 读DOM的值略...

        $.ajax({
            url : "/signup",
            data: "username=" + username + "&password=" + password,
            dataType: "json",
            type : "post",
            success : function(state){
                /*
                    在JS里面接收state,jQuery的AJAX会自动将它用JSON反序列化成对象
                    于是我们就可以像在Python里面一样使用了 如 state.message
                */
                if(! state.success){
                    # 错误处理
                    alert(state.message);
                }
                else{
                    alert("注册成功。");
                    location.href = "/success.html";
                }
            }
        })
    }
}
```

<p>现在整个就完成了，里面一些不重要代码的实现没有写，这个别拿去运行哦，不能通过的。 <br />我这里只是写出实现的方式，当然里面的 <span style="color: #ff0000;"><strong>ExecuteState</strong> </span>和 <span style="color: #ff0000;"><strong>obj2dict</strong></span> 这两个东西是完整的，可以直接拿来使用。</p>
<p>附注：本文中的代码着色来自于 <a href="http://pastie.org/" target="_blank">http://pastie.org/</a></p>
<p><span style="color: #cc6633;">另外，Blogbus发文章怎么有字数限制呀?像我经常会发格式化后的HTML代码，这样贴出来的代码有高亮着色，我看了一下HTML，居然是 20000 个限制。晕！第一次遇到有字数限制的博客...不让发那么多我偏要发，限制...破解之！</span></p>
