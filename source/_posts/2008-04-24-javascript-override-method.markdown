---
layout: post
title: "Javascript的方法重载"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- 前端
- 技巧
---
.NET里面的方法重载用着的确很方便，哪Javascript里面能不能也哪样做呢？

Javasciprt里面本生是没有方法重载的功能，以前很多人的做法可能是直接少传参数过去，然后在根据参数是否为 <span>"undefined"</span> 未定义来决定怎么处理，从而实现类似方法重载的功能。

### 例如：

```javascript
var showMessage = function(name,value,id){
    if(id != ”undefined”){
        alert(name+value+id);
    }
    else if(value != ”undefined”){
        alert(name + value);
    }
    else{
        alert(name);
    }
}

showMessage(”哈哈”);
showMessage(”哈哈”,”？？”);
showMessage(”哈哈”,”？？”,124124);
```

今天在Ajaxian上面看到了一篇关于Javascript方法重载的写法，它是能过另外一个方法来实现的。

### 看一下这个代码:

```javascript
// addMethod - By John Resig (MIT Licensed)
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length ){
         return fn.apply( this, arguments );
     }
     else if ( typeof old == ’function’ ){
      return old.apply( this, arguments );
  }
}
};

var UserInfo = function(){
    addMethod(this,”find”,function(){
        alert(”没有参数”);
    });

    addMethod(this,”find”,function(name){
        alert(”传入的参数是一个，叫 ”+name);
    });

    addMethod(this,”find”,function(name,value){
        alert(”传入了两个参数，一个叫 name=”+name+” 一个叫 value=”+value);
    });
};

var userinfo = new UserInfo();
userinfo.find();
userinfo.find(’我是谁？’);
userinfo.find(’某某某’,’1512412514’);
```

看，这样一来就简单了......

原文地址：<a href="http://ajaxian.com/archives/javascript-method-overloading" target="_blank">http://ajaxian.com/archives/javascript-method-overloading</a>
