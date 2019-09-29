---
layout: post
title: "谈谈Cookie存取和IE页面缓存的问题"
date: 2008-04-24 08:17
comments: true
categories:
- .NET
- IE
- Cookie
- 技巧
- 缓存
- 前端
---
<p>最近老是发现在IE里会有Cookie的问题，如IE下面无法登出，或无法登录，或者登录后信息却无法取到，而Firefox下面一直是通过的，都试过好多次了，今天终于找回的主要的原因；<br /> <br /> <strong><span style="font-size: 24pt"><span style="font-family: 微软雅黑"> Cookie的问题：</span></span></strong><br /> <br /> 首先看一下我的Cookie存取代码 (这个Cookie操作支持二级域名访问)</p>

```c#
#region 存取Cookie
///
/// 存Cookie
/// Json Lee 2007-09-24
///
/// 名称
/// 值
/// 到期时间
///
public void SetCookie(string cookieName, string cookieValue, int cookieExpiryMinute)
{
    cookieName = cookieName.ToLower();
    HttpCookie cookie = new HttpCookie(cookieName,cookieValue);
    cookie.Expires = DateTime.Now.AddMinutes(cookieExpiryMinute);  //设置Cookie过期时间
    cookie.Path = "/";
    //设置可访问Cookie的路径 为项目下的cookie文件夹及其子文件夹下所有页面
    //如果需要整个应用程序可访问 则设置为cookie.Path = "/";即可
    cookie.Domain = “.163.com";
    //以www.163.com为例，若要在 news.163.com等不同主机访问可以如上设置

    //删除旧的同名Cookie
    HttpContext.Current.Response.Cookies.Remove(cookieName);

    HttpContext.Current.Response.Cookies.Add(cookie);
}

///
/// 存Cookie
/// Json Lee 2007-09-24
///
/// 名称
/// 值
///
public void SetCookie(string cookieName, string cookieValue)
{
    SetCookie(cookieName, cookieValue, 60);
}

///
/// 清除Cookie
///
/// 名称
///
public void ClearCookie(string cookieName)
{
    SetCookie(cookieName,"",-5);
}

///
/// 取Cookie
/// Json Lee 2007-09-24
///
/// 名称
/// 当没有值的时候的默认值
///
public string GetCookie(string cookieName, string defaultValue)
{
    cookieName = cookieName.ToLower();
    string strResult = defaultValue;
    try
    {
        if (HttpContext.Current.Request.Cookies != null)
        {
            if (HttpContext.Current.Request.Cookies[cookieName] != null)
            {
                strResult = HttpContext.Current.Request.Cookies[cookieName].Value;
            }
        }
    }
    catch (Exception ex)
    {
        this.WriteWrongLog(ex);
    }

    return strResult;
}

///
/// 取Cookie
/// Json Lee 2007-09-24
///
/// 名称
///
public string GetCookie(string strName)
{
    return GetCookie(strName, "");
}
#endregion
```

<p><br /> Cookie存取看起来的确很简单，而在.NET里面好像更简单。<br /> 但是......................<br /> 往往简单的东西经常出现一些问题，让人找不到原因。<br /> 我之前这里出现的问题就是，在写Cookie的时候，没有处理旧的同名Cookie，例如：第一次登录的时候写入 Cookie username=jsonlee 和 password=123456<br /> 有时候有可能会在未退出的情况下重新登录一下，这样就会再次写入同样的Cookie，但这样的情况，好像没有把原来的覆盖(我用 IECookies 这个工具看到的)，而是新加入一个同名的。这样一来明显问题就存在了。<br /> 所以我在SetCookie的方法里面加入了</p>

```c#
//删除旧的同名Cookie
HttpContext.Current.Response.Cookies.Remove(cookieName);
```

<p>这样一来问题就解决了。<br /> <br /> <br /> <strong><span style="font-family: 微软雅黑"><span style="font-size: 24pt">IE页面缓存的问题：<br /> <br /> </span></span></strong>我现在的用户登录状态是通过 Ajax调用一个 GetUserBar.aspx 来取得用户状态栏信息的<br /> 以下是 GetUserbar.aspx 的代码</p>

```html
<%@ Page language="c#"" Codebehind="GetUserBar.aspx.cs" AutoEventWireup="false" Inherits="Web.GetUserBar" %>
<%if(CheckIsLogin()){%>
您好：<%=this.GetNickname()%>
<a href="<%=UrlRewriteLink.GetUserHomeUrl()%>">您的主页</a> |
<a href='/user/user_setup.aspx'>个人设置a> |
<a href='/logout.aspx'>退出</a>
<%}else{%>
<span style="margin-right:10px;">您已经登录了！span><a href="/reg.aspx">注册a> | <a href="/login.aspx">登录</a>
<%}%>
```

<p><br /> 如上面这段代码，如果通过Ajax调用它，哪就可以在静态页面上取得用户的登录信息<br /> 可是.......<br /> 这个问题就出来了，而且还不容易发现，哪就是<strong><span style="font-size: 18pt"><span style="color: red"><span style="font-family: 微软雅黑">IE的页面缓存</span></span></span></strong>，IE好像有个机制会把访问过的页面缓存到 <span style="color: #5ca414"><strong><span style="font-size: 12pt"><span style="font-family: Verdana">C:\Documents and Settings\用户名\Local Settings\Temporary Internet Files</span></span></strong> </span>这个文件夹里面。所以每个Ajax调用的GetUserBar.aspx时候IE取到的都是缓存信息，而不是GetUserBar.aspx运行的结果。所以才出现了，一直无法登出或无法登录的状态（其实是已经登录登出了的，只是表面上看不出来）。<br /> <br /> 解决办法就是在 GetUserBar.aspx 的Page_Load方法里面加入设定"<span style="color: #0817ff">Response.Expires</span>"的时间的处理，如：</p>

```c#
private void Page_Load(object sender, System.EventArgs e)
{
    this.Response.Expires = 0;

}
```

<p><br /> <br /> 这样问题就解决了。<br /> <br /> 网上存在很多的Cookie操作的文章，可是这些东西都是抄来抄去的，哪个站长跟本就没有对这些代码做过测试，我以前试着看过好多个，很多是存在有问题的。<br /> 希望这篇文章会给需要的人带来帮助。</p>
