---
layout: post
title: "Google Map API应用例子源代码(已修正)"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- Google Map
- 教程
---
最近项目需要做一个地图的功能，上面要加上一些地标，以方便用户使用，所以今天花时间看了看Google API搞了好一会儿，终于做到满足自已的功能要求了，发布出来给需要的朋友看看。

其实GoogleMap API还是比较好用的，慢慢看GoogleMap API的帮助都可以做出来，我这里主要介绍的是怎么将地标存放起来，再读出来。不然只是一个地图在哪儿没有什么意义。

我这里是用XML来存放的，存下来的数据还是比较简单，你可以根据自已的需要做一些修改就可以了，也可以换成数据库来存放。

### Jquery.GoogleMap.js 源代码内容

```javascript
/*
– GoogleMap操作类
– 作者:李华顺
– 官方网站：http://www.wathon.com
– 我的博客：http://huacn.cnblogs.com
– 演示地址：http://www.wathon.com/opensource/js/GoogleMap/Default.aspx
– 使用请保存署名
*/

//创建GoogleMap
//panelMap - 显示地图的对象区域
//showScale - 是否显示改变大小的控件 true false
//showLargeControl - 是否显示切换控件  true false
//showTypeControl - 是否显示切换显示类型的按钮
//showZoom - 是否显示左下角的小地图
//zoomSize - 视觉距离
var clickListener ;
var GoogleMapCreate = function(panelMap,showScale,showLargeControl,showTypeControl,showZoom,zoomSize){
    myMap = new GMap2(panelMap);
    if(showLargeControl)
    {
        myMap.addControl(new GLargeMapControl());
    }
    else
    {
       myMap.addControl(new GSmallMapControl());
   }


   if(showTypeControl)
   {
    myMap.addControl(new GMapTypeControl());
}


if(showScale)
{
    myMap.addControl(new GScaleControl());
}

if(showZoom)
{
    myMap.addControl(new GOverviewMapControl());
}

myMap.enableDoubleClickZoom();
myMap.enableContinuousZoom();

myMap.setCenter(new GLatLng(39.917, 116.397), zoomSize,G_SATELLITE_MAP);
return myMap;
};


//添加事件
var GoogleMapAddEvent = function(myMap,eventName,fun){
    clickListener = GEvent.addListener(myMap,eventName,fun);
};

//去除事件
var GoogleMapRemoveEvent = function(myMap,eventName){
    GEvent.removeListener(clickListener);
};


//在指定坐标上显示tip提示
var GoogleMapShowTip = function(myMap,point,text){
    myMap.openInfoWindow(point,document.createTextNode(text));
};


//在指定坐标上加入地标
var GoogleMapNewMarker = function(myMap,point){
    var marker = new GMarker(point);
    myMap.addOverlay(marker);
    return marker;
};

//根据坐标点取得X坐标
var GoogleMapPointX = function(point){
    return point.lat();
};

//根据坐标点取得Y坐标
var GoogleMapPointY = function(point){
    return point.lng();
};
```

### 服务端部分的源代码内容

```c#
/*
– GoogleMap操作类
– 作者:李华顺
– 官方网站：http://www.wathon.com
– 我的博客：http://huacn.cnblogs.com
– 演示地址：http://www.wathon.com/opensource/js/GoogleMap/Default.aspx
– 使用请保存署名
*/


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
using System.Xml;


namespace GoogleMap
{
    public partial class _Default : System.Web.UI.Page
    {
        protected string mapName = ””;
        protected string mapAreaX = ””;
        protected string mapAreaY = ””;
        protected void Page_Load(object sender, EventArgs e)
        {
            initPage();
        }

        public void initPage()
        {
            AreaList myArea = new AreaList(Server.MapPath(”App_Data\”));

            if (Request[”type”] == ”savearea”)
            {
                Response.ContentType = ”text/xml”;
                Response.ContentEncoding = System.Text.Encoding.UTF8;

                //保存地标
                string strName = Request[”name”];
                string strAreaX = Request[”x”];
                string strAreaY = Request[”y”];

                myArea.AppendNew(strName, strAreaX, strAreaY);


                WriteResult(Request[”name”]);

                Response.End();
            }

            System.Xml.XmlNodeList myNodes = myArea.GetAreaList();
            for (int i = 0; i < myNodes.Count; i++)
            {
                if (i > 0)
                {
                    mapName += ”,”;
                    mapAreaX += ”,”;
                    mapAreaY += ”,”;
                }

                mapName += ”’” + myNodes[i].SelectSingleNode(”name”).InnerText + ”’”;
                mapAreaX += ”’” + myNodes[i].SelectSingleNode(”x”).InnerText + ”’”;
                mapAreaY += ”’” + myNodes[i].SelectSingleNode(”y”).InnerText + ”’”;


            }

        }

        private void WriteResult(string strValue)
        {
            string strContent = ””1.0\” encoding=\”utf-8\”?>”;
            strContent += ”” + strValue + ””;
            Response.Write(strContent);
            Response.End();
        }
    }

    ///
    /// AreaList 的摘要说明
    ///
    public class AreaList
    {
        XmlDocument xmlControl = new XmlDocument();
        string strFileName = ”\MapArea.xml”;

        public AreaList(string appPath)
        {
            strFileName = appPath + strFileName;
            if (!System.IO.File.Exists(strFileName))
            {
                CreateAreaListFile();
            }


            xmlControl.Load(strFileName);
        }

        private void CreateAreaListFile()
        {
            xmlControl.LoadXml(””1.0\” encoding=\”utf-8\” ?>”);
            xmlControl.Save(strFileName);
        }

        public void AppendNew(string strName, string strX, string strY)
        {
            XmlNode xmlNodeLast = xmlControl.SelectSingleNode(”//list”);
            string strXml = ”” + makeCDATA(strName) + ”” + makeCDATA(strX) + ”” + makeCDATA(strY) + ””;
            XmlNode xmlNode = xmlControl.CreateNode(XmlNodeType.Element, ”item”, ””);
            xmlNode.InnerXml = strXml;
            xmlNodeLast.AppendChild(xmlNode);
            xmlControl.Save(strFileName);
        }

        ///
        /// 取得旧的列表
        /// name,area
        /// 地标名,坐标
        ///
        ///
        public System.Xml.XmlNodeList GetAreaList()
        {
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(strFileName);

            System.Xml.XmlNodeList myNodes = xmlDoc.SelectNodes(”//list//item”);
            return myNodes;
        }

        private string makeCDATA(string strValue)
        {
            return ”” + strValue + ”]]>”;
        }
    }
}
```

### HTML部分的源代码内容

```html
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
  <title>GoogleMap例子</title>
  <script type="text/javascript" src="scripts/jquery.js"></script>
  <script type="text/javascript" src="scripts/jquery.interface.js"></script>
  <script type="text/javascript" src="scripts/jquery.xml.js"></script>
  <script type="text/javascript" src="scripts/jquery.corner.js"></script>
  <script type="text/javascript" src="scripts/jquery.googlemap.js"></script>
  <script type="text/javascript" src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAAC-ble-vmy_g7-Qvem5P86xS0EUK71C1jmG2AnVsYTJQQEVD0-RQfglPje0X6A_y2FM1T2dU6BPVKQg"></script>
  <style type="text/css">
  body{
    font-size:12px;
    font-family:宋体;
    text-align:center;
  }
  #layer { margin:20px auto; text-align:left; width:800px;}
  .toolbar,.arealist { background:#F5F5F5;border:1px solid #F0F0F0; padding:5px; margin-bottom:8px;}
  #panelMap {width:800px; height:450px;}
  .window { }
  </style>
  <script type="text/javascript">
  var myMap;
  var MapName = [<%=mapName %>];
  var MapAreaX = [<%=mapAreaX %>];
  var MapAreaY = [<%=mapAreaY %>];
  var zoomSize = 5;

  $(document).ready(function(){
    myMap = GoogleMapCreate(document.getElementById("panelMap"),true,true,true,true,zoomSize);

    //给“添加"按钮的click放入事件
    $(’#lblAddArea’).click(function() {
      //$(’div#info’).show(’slow’);
      GoogleMapAddEvent(myMap, "click", function(marker, point) {
        GoogleMapNewMarker(myMap,point);
        var areaName = prompt("请输入地标名称：","");
        var x = GoogleMapPointX(point);
        var y = GoogleMapPointY(point);
        $.ajax({
          url:"default.aspx?type=savearea&x="+x+"&y="+y+"&name="+areaName,
          type:"post",
          success:function(xmlData){
            GoogleMapShowTip(myMap,point,GetNodeValue(xmlData.selectSingleNode("result")));
          }
          });
        GoogleMapRemoveEvent(myMap,"click");
        });
      });

    //读旧的地标
    writeAreaList();

    //开启自动切换地标
    //autoSelectMarker();
    });

  //创建地标到地图上
  var setMapArea = function(tip,x,y){
    var point = new GLatLng(x,y,zoomSize);

    var myMarker = GoogleMapNewMarker(myMap,point);
    GEvent.addListener(myMarker, "click", function() {
      GoogleMapShowTip(myMap,point,tip);
    });
  };
  </script>
</html>
```
