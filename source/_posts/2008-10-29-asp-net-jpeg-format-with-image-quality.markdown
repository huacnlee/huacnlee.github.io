---
layout: post
title: "ASP.NET JPG 格式的图片存放质量问题"
date: 2008-10-29 08:00
comments: true
categories:
- .NET
- 图像处理
- 技巧
---
<p>不知道大家有没有发现，<strong>Asp.net</strong> 的图片存储的存在质量的问题；<br />这几天在项目中做到相册功能，其中有缩小成不同大小的图片的功能，最后存成 <span style="color: #008000;"><strong>JPG </strong></span>格式。可是当我在保存图片的时候发现，这些缩小后的图片出现了一些质量的问题，出现了一些杂点，让整个图片看起来很脏。</p>
<p>而对比<a href="http://www.flickr.com" target="_blank">Flickr</a>或者<a href="http://www.yupoo.com" target="_blank">Yupoo</a>这种网站的缩略图，效果上面有很多差距。<br />问题出在哪里呢？起初我以为问题出在缩小图的时候，不停的调试，试效果。但当我把它存成 <strong><span style="color: #008000;">PNG</span></strong> 格式的时候效果又是对的，这说明一点：缩小图的方法没有问题。难道问题出在最后存储上面？</p>
<p><strong>Asp.net</strong> 的 <span style="color: #ff0000;">Image</span> 对象有个 <span style="color: #333399;"><strong>Save</strong></span> 的方法，它有个参数是 <span style="color: #ff0000;"><strong>ImageFormat</strong></span> ，我选择的是 <span style="color: #008000;"><strong>JPG</strong></span>（估计很多人都是这样做的），这样存储是存在效果的问题的（好像只有 <span style="color: #ff6600;">80%</span> 的质量）！。但我在国外的网站上面查到，另外一种存放方式，这样的效果会好很多。</p>

## 优化的存储方式：

```c#
EncoderParameters encoderParam = new EncoderParameters();
encoderParam.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
System.Drawing.Imaging.ImageCodecInfo imageCodercInfo = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders()[1];
bitmap.Save(fileName, imageCodercInfo, encoderParam);
```

## 看效果对比：

<img src="http://farm4.static.flickr.com/3272/2982518879_fab1e36781_o.png" />

## 另附模仿 Flickr 或 Yupoo 的切图方式：

```c#
public class Imager
{
    ///
    /// 缩略模式。
    ///
    public enum ThumnalMode : byte
    {
        ///
        /// 缩图模式
        ///
        Full,
        ///
        /// 切图模式
        ///
        CUT,
    }

    ///
    /// 优化过后的图片保存功能，JPG效果更好
    ///
    /// 要保存的图片对象
    /// 保存到文件
    /// 质量 1-100
    public static void Save(Bitmap bitmap, string fileName, int quality)
    {
        EncoderParameters encoderParam = new EncoderParameters();
        encoderParam.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
        System.Drawing.Imaging.ImageCodecInfo imageCodercInfo = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders()[1];
        bitmap.Save(fileName, imageCodercInfo, encoderParam);
    }

    ///
    /// 取得小图
    ///
    /// 原图
    /// 新的大小
    /// 缩图的方式
    /// mode=Full无效 如果mode=Max 的话，此参数表示切图的方式
    ///
    public static Bitmap GetThumnail(Bitmap image, Size size, ThumnalMode mode, ContentAlignment contentAlignment)
    {
        if (!size.IsEmpty && !image.Size.IsEmpty && image.Width > size.Width)
        {
            //先取一个宽比例。
            double scale = (double)image.Width / (double)size.Width;

            Size newSize = size;

            //缩略模式
            switch (mode)
            {
                case ThumnalMode.Full:
                    {
                        scale = (double)image.Width / (double)size.Width;
                        newSize.Height = (int)(image.Height / scale);
                        break;
                    }
                case ThumnalMode.CUT:
                    {
                        if (image.Height / scale < size.Height)
                            scale = (double)image.Height / (double)size.Height;

                        newSize.Width = (int)(image.Width / scale);
                        newSize.Height = (int)(image.Height / scale);
                        break;
                    }
            }

            Bitmap result;



            if (mode == ThumnalMode.CUT)
            {
                result = new Bitmap(size.Width, size.Height);
            }
            else
            {
                result = new Bitmap(newSize.Width, newSize.Height);
            }

            using (Graphics g = Graphics.FromImage(result))
            {
                //背景颜色
                g.FillRectangle(Brushes.White, new Rectangle(new Point(0, 0), size));
                g.InterpolationMode = InterpolationMode.HighQualityBilinear;
                g.SmoothingMode = SmoothingMode.HighQuality;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.CompositingMode = CompositingMode.SourceOver;
                g.CompositingQuality = CompositingQuality.HighQuality;
                g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;
                //对齐方式
                Rectangle destRect = new Rectangle(new Point(0, 0), newSize);
                if (mode == ThumnalMode.CUT)
                {
                    switch (contentAlignment)
                    {
                        case ContentAlignment.TopCenter:
                            destRect = new Rectangle(new Point(-((newSize.Width - size.Width) / 2), 0), newSize);
                            break;
                        case ContentAlignment.TopRight:
                            destRect = new Rectangle(new Point(-(newSize.Width - size.Width), 0), newSize);
                            break;
                        case ContentAlignment.MiddleLeft:
                            destRect = new Rectangle(new Point(0, -((newSize.Height - size.Height) / 2)), newSize);
                            break;
                        case ContentAlignment.MiddleCenter:
                            destRect = new Rectangle(new Point(-((newSize.Width - size.Width) / 2), -((newSize.Height - size.Height) / 2)), newSize);
                            break;
                        case ContentAlignment.MiddleRight:
                            destRect = new Rectangle(new Point(-(newSize.Width - size.Width), -((newSize.Height - size.Height) / 2)), newSize);
                            break;
                        case ContentAlignment.BottomLeft:
                            destRect = new Rectangle(new Point(0, -(newSize.Height - size.Height)), newSize);
                            break;
                        case ContentAlignment.BottomCenter:
                            destRect = new Rectangle(new Point(-((newSize.Width - size.Width) / 2), -(newSize.Height - size.Height)), newSize);
                            break;
                        case ContentAlignment.BottomRight:
                            destRect = new Rectangle(new Point(-(newSize.Width - size.Width), -(newSize.Height - size.Height)), newSize);
                            break;
                        default:
                            destRect = new Rectangle(new Point(0, 0), newSize);
                            break;
                    }
                }

                g.DrawImage(image, destRect, new Rectangle(new Point(0, 0), image.Size), GraphicsUnit.Pixel);
                image.Dispose();
                g.Dispose();
            }

            return result;
        }
        else
        {
            return image;
        }
    }
}
```

演示代码：<a href="http://files.cnblogs.com/huacn/AspnetImage.zip" target="_blank">http://files.cnblogs.com/huacn/AspnetImage.zip</a>
