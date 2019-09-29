---
layout: post
title: "在 ASP.NET 中实现类似 Rails 的 flash[:notice] 的功能"
date: 2009-05-05 04:04
comments: true
categories:
- .NET
- Rails
- 教程
---
<p>我们在做表单的时候基本上都会用到提示消息.有时候我们希望添加信息完成后,自动跳转到列表页面,再显示"添加成功"的提示信息.</p>
<p><strong><span style="font-size: 16px;">图1:</span></strong></p>
<p><img src="http://farm4.static.flickr.com/3548/3500075947_ec635bab47.jpg?v=0" border="0" /></p>
<p><strong><span style="font-size: 16px;">图2:</span></strong></p>
<p><img src="http://farm4.static.flickr.com/3591/3500075951_8d1ffb9360.jpg?v=0" border="0" width="500" height="253" /></p>
<p>但是问题在于 这个提示信息,我们把它放哪儿呢?</p>
<p>可能你会想到下面几种方式:</p>
<ul>
<li>URL GET参数传递 (看起来不好,中文转成URL后会弄得很长很长);</li>
<li>URL POST 过去,这样是隐藏了,但按一下 F5键 (Safari:Ctrl+R) 试试,就会出现一个确认窗口(如:<a href="#form_photo_3" target="_blank">图3</a>)</li>
<li>存 Session 或 Cache 里面,这种方式应该算是不错的方案了,不过,如果不清空的话,到了别的页面,如果有用同一个Session 或 Cache Key的话,别的页面就会显示到现在这个页面的提示消息.</li>
</ul>
<p id="form_photo_3"><span style="font-size: 16px;"><strong>图3:</strong></span></p>
<p><img src="http://farm4.static.flickr.com/3546/3500075955_84a519dd16.jpg?v=0" border="0" width="500" height="334" /></p>
<p>在 Rails 里面就有一个专门的对象用于解决这样的问题,它叫 Flash ,这个东西默认是存在 Session 里面的,跟传统的 Session 唯一的区别就是只要调用一次这个这里的内容就会自动清空,也就不会出现我说哪样,到了别的页面还会显示些页面的提示信息.</p>
<p>我在.NET里面做了一个简单一些的实现(<a href="http://pastie.org/467563" target="_blank">code</a>):</p>
```c#
using System.Web;

public class PageBase : System.Web.UI.Page
{
  ///
  /// 用于显示提示消息的集合，读取一次将会清除内容
  ///
  protected string FlashNotice
  {
    get
    {
      string result = "";
      if( Session["flash_notice"] != null)
      {
        result = Session["flash_notice"].ToString();
      }

      this.Unload += new EventHandler(ClearFlashNotice);
      return result;
    }
    set
    {
      Session["flash_notice"] = value;
    }
  }
  ///
  /// 用于回调清除FlashNotice的信息
  ///
  private void ClearFlashNotice(object sender,EventArgs args)
  {
    Session["flash_notice"] = null;
  }

}
```
<p>从上面代码中可以看到,清除内容是在页面 UnLoad 事件的时候执行的.也就是说,在同一个页面的生命周期结束前,你可以使用多次这个属性.如判断它是否为空,这种操作不会用一次就被清掉了,清除的动作只会在生命周期结束的时候才会执行.</p>
<p>你可以把在 edit.aspx 页面保存的时候,把成功的提示消息放到 this.FlashNotice 里面(前提是这个页面要继承 PageBase ),再用 Response.Redirect("list.aspx") 转向到列表页.</p>
<p>而列表页判断 this.FlashNotice 是否有内容,如果有就显示出 如<a href="#form_photo_2" target="_blank">图2</a> 哪样的绿色提示条.并且这个消息的内容显示过后就清除了,再次刷新一下页面,提示没有了. 这个体验很不错吧!</p>
<p>&nbsp;</p>
