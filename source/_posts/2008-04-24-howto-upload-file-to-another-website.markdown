---
layout: post
title: "通过 WebClient 的 Postdata 将上传文件功能放到另一个网站上去操作"
date: 2008-04-24 08:17
comments: true
categories:
- .NET
- Upload
- 教程
- 技巧
---

看了本文的标题，可能很多人不太明白，其实这里讲的只是一个简单的处理办法。

以前做的上传文件也是分离的，上传后的文件存在一个文件服务器上面，这个应该很多人都会。 今天我这里提的是分离上传功能，因为上传过程也是一个占用服务器资源的大问题，如果能够把它和网站分开，哪效果应该会有很大的提升。

先看这个图:

<img src="http://www.cnblogs.com/images/cnblogs_com/huacn/fileserver_mode1.png" border="0" />

A 层是我们的用户表单，如一个简单的修改用户信息页面
B 层也是一个网站，它是一个上传功能。
C 层是存放文件的服务器

B网站可以是一台独立的网站服务器，它做的事情就只是上传，并处理文件，如：切割图片、锐化图片等功能。当A网站需要上传功能时，就可以通过一个iframe去调用B网站的上传页面，两者之间通过JS的Parent来传递数据(具体做法请看我以前写的《<a href="../archive/2007/07/16/819196.html" target="_blank">Javascript与asp.net多文件无刷新上传</a>》)。

但今天有个功能却不能用这种方式做，不能使用iframe，所以一直想了好几个办法，最终做了一个通过WebClient来将文件数据POST到B服务器，B服务器再处理，并保存。这种做法虽然效果没有达到完全的分离(上传时A网站还是要将文件信息从用户的本地读到A网站的服务器)，不过处理文件的资源已经分开了，速度上面应该会有些好的(看具体情况了，我这里会将文件缩小并切割成好几种不同大小的格式，再将切割完成的图进行锐化处理)。

我一直在想，怎么才能将Ajax一样，直接把信息POST到B网站的一个页面上，终于找到WebClient，我先把文件读成Byte数组，再用WebClient提交到B服务器的页面上，B服务接收此信息并转成一个Image，然后处理文件并保存，最后返回结果。

再看一下具体的代码：

A层页面代码的Default.aspx：

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>
<DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>上传文件端</title>
</head>
<body>
    <form id="form1" runat="server">
      <asp:FileUpload ID="file1" runat="server" /> <asp:Button ID="btnPost" runat="server" Text="上传" OnClick="btnPost_Click" />
    </form>
</body>
</html>
```

A层服务端代码 Default.aspx.cs

```c#
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnPost_Click(object sender, EventArgs e)
    {
        if(! file1.HasFile)
        {
            Alert("还未选择要上传的文件.");
            return;
        }

        HttpPostedFile myFile = file1.PostedFile;

        string result = "";

        try
        {

            //将文件转换成字节形式
            byte[] fileByte = new byte[myFile.InputStream.Length];
            myFile.InputStream.Read(fileByte, 0, fileByte.Length);

            //通过WebClient类来提交文件数据

            //定义提交URL地址,它会接收文件的字节数据，并保存，再返回相应的结果[此处具体用的时候要修改]
            string postUrl = "http://localhost:2956/Upload/uploadpic.aspx?oldfilename=" + myFile.FileName;
            System.Net.WebClient webClient = new System.Net.WebClient();
            byte[] responseArray = webClient.UploadData(postUrl, "POST", fileByte);

            //将返回的字节数据转成字符串（也就是uploadpic.aspx里面的页面输出内容）
            result = System.Text.Encoding.Default.GetString(responseArray, 0, responseArray.Length);

            //返回结果的处理
            switch (result)
            {
                case "-1":
                    Alert("上传头像时发生异常，未提交成功。");
                    return;
                case "0":
                    Alert("您还未选择头像。");
                    return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
            return;
        }

        Alert("上传成功!\r\n结果是：" + result);
    }

    #region 在客户端发出Alert提示窗口
    ///
    /// sumary:弹出一个提示窗口
    ///
    /// 提示信息
    /// 要专向的地址,不转请传空字符串
    public void Alert(string msg, string url)
    {

        string goUrlScript = "";
        if (url != "")
        {
            goUrlScript = "document.location.href=’" + url + "’;";
        }
        Page.RegisterStartupScript("alert", "");
    }

    ///
    /// 弹出错误提示
    ///
    /// 提示信息，支持HTML
    public void Alert(string msg)
    {
        Alert(msg, "");
    }

    #endregion
}
```

B层的服务端代码　UploadPic.aspx.cs：

```c#
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.IO;

public partial class uploadpic : System.Web.UI.Page
{
    private string SavePath = @"c:\uploadfiles";
    private string UrlFilePath = "/UserHead/";
    protected void Page_Load(object sender, EventArgs e)
    {
        initPage();
    }

    private void initPage()
    {
        if (Request.InputStream.Length == 0)
        {
            //没有内容
            Response.Write("0");
            return;
        }

        //HttpPostedFile myFile = Request.Files[0];

        string OldFileName = this.GetQueryString("oldfilename");
        string DirPath = GetDataPath();
        string RealSavePath = SavePath + "\\" + DirPath + "\\";
        string fileExt = "jpg";
        if (OldFileName != "")
        {
            fileExt = OldFileName.Substring(OldFileName.LastIndexOf(".") + 1);
        }
        string NewFileName = GetFileName(fileExt);
        System.Drawing.Image postImage = System.Drawing.Image.FromStream(Request.InputStream);
        try
        {
            if (!Directory.Exists(RealSavePath))
            {
                System.IO.Directory.CreateDirectory(RealSavePath);
            }

            MakeSmallImage(postImage, RealSavePath, NewFileName);

            Response.Write(UrlFilePath + DirPath + "/" + NewFileName);
        }
        catch (Exception ex)
        {
            Response.Write("-1");
        }




    }

    ///
    /// 生成缩微图
    ///
    ///
    /// 保存的文件名，包括目录地址
    private void MakeSmallImage(System.Drawing.Image imageBase, string p_SavePath, string p_FileName)
    {
        try
        {
            System.Drawing.Bitmap bitmap_b = new System.Drawing.Bitmap(imageBase);

            //保存
            bitmap_b.Save(p_SavePath + "/" + p_FileName, System.Drawing.Imaging.ImageFormat.Jpeg);

        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }

    public string GetFileName(string FileType)
    {
        System.Random Rd = new Random();
        double Rds = Rd.NextDouble();
        string nowTime = System.DateTime.Now.ToString();
        nowTime = nowTime.Replace(" ", "");
        nowTime = nowTime.Replace("-", "");
        nowTime = nowTime.Replace(":", "");
        nowTime = nowTime.Trim() + "_" + Rds.ToString().Replace(".", "").Substring(0, 4);
        nowTime = nowTime + "." + FileType.ToLower();
        return nowTime;
    }

    public string GetDataPath()
    {
        string nowTime = System.DateTime.Now.ToShortDateString().Trim();
        return nowTime;
    }

    #region 获取QueryString的值
    ///
    /// sumary:获取QueryString的值

    ///
    /// QueryString中字段的名称
    ///
    /// 如果存在则返回QueryString中字段对应的值 如果不存在或异常，则返回空字符串
    ///
    public string GetQueryString(string key)
    {
        try
        {
            string value = string.Empty;
            if (HttpContext.Current.Request.QueryString[key] != null)
            {
                value = HttpContext.Current.Request.QueryString[key].ToString();
            }
            return value;
        }
        catch
        {
            return string.Empty;
        }
    }
    #endregion
}
```

<p>完整源代码下载：<a href="http://www.cnblogs.com/Files/huacn/HttpPostFile.7z" target="_blank">http://www.cnblogs.com/Files/huacn/HttpPostFile.7z</a></p>
