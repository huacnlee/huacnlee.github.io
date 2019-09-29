---
layout: post
title: "ASP.NET 时间 Since 转换"
date: 2009-07-24 14:53
comments: true
categories:
- .NET
---
目前 Web 2.0 的网站上很流行以：2秒前、3天前、1月前 这样的方式来显示一条消息的时间，这种做法想 <a href="http://twitter.com" target="_blank">Twitter</a>、<a href="http://fanfou.com" target="_blank">饭否</a>...等网站都在使用，用在即时性高的文章或消息上面。

我这里写了一个 C# 的实现方式:

```c#
public static string Since(System.DateTime now, System.DateTime last)
{
    string strResult = "";

    try
    {
        TimeSpan ts = new TimeSpan();
        ts = now.Subtract(last);
        string strNumber = "";

        if (ts.TotalSeconds <= 30)
        {
            //30秒以前
            strResult = "刚刚";
        }
        else if (ts.TotalSeconds <= 59)
        {
            //小于1分钟
            strResult = "1分钟前";
        }
        else if (ts.TotalMinutes <= 60 && ts.TotalMinutes != 30)
        {
            //分钟，没有处理30分的时候
            strNumber = Convert.ToInt32(ts.TotalMinutes).ToString();
            if (ts.TotalMinutes == 2)
            {
                strNumber = "两";
            }

            strResult = strNumber + "分钟前";
        }
        else if (ts.TotalMinutes == 30)
        {
            //半个小时
            strResult = "半小时前";
        }
        else if (ts.TotalHours <= 23)
        {
            //小时
            strNumber = Convert.ToInt32(ts.TotalHours).ToString();
            if (ts.TotalHours == 2)
            {
                strNumber = "两";
            }

            strResult = ts.Hours + "小时前";
        }
        else if (ts.TotalHours == 24)
        {
            //刚好一天
            strResult = "一天前";
        }
        else if (ts.TotalDays < 30 && ts.TotalDays != 15)
        {
            //半个月以前
            strNumber = Convert.ToInt32(ts.TotalDays).ToString();
            if (ts.TotalDays == 2)
            {
                strNumber = "两";
            }

            strResult = strNumber + "天前";
        }
        else if (ts.TotalDays == 15)
        {
            //半月
            strResult = "半个月前";
        }
        else if (ts.TotalDays <= 364)
        {
            //按月的
            int month = Convert.ToInt32(ts.TotalDays) / 30;
            strNumber = month.ToString();
            if (month == 2)
            {
                strNumber = "两";
            }
            strResult = strNumber + "个月前";
        }
        else if (ts.TotalDays <= 547)
        {
            //一年半以下的
            strResult = "一年前";
        }
        else if (ts.TotalDays <= 910)
        {
            //两年半以下的
            strResult = "两年前";
        }
        else
        {
            strResult = last.ToString("yy年M月d日");
        }
    }
    catch (Exception ex)
    {
        YtRuntime.WriteLog(ex.ToString());
        strResult = last.ToString("yy年M月d日");
    }
    return strResult;
}

public static string Since(System.DateTime last)
{
    return Since(System.DateTime.Now, last);
}
```
