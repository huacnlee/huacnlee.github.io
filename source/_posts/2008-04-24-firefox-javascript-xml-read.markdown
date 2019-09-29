---
layout: post
title: "Javascript 支持在 Firefox 下读取 XML 节点的方法"
date: 2008-04-24 08:17
comments: true
categories:
- Javascript
- XML
- 前端
---
<p>最近在修改项目的用到<span style="font-weight: bold">Ajax功能</span>的页面，发现很多写法在<span style="font-weight: bold">Firefox</span>下都存在问题，主要是因为当时开发时只在IE下测试通过就提交了，而Firefox的写法与IE有很大的区别，主大的问题是当在读取<span style="font-weight: bold">XML节点</span>或子节点的内容时，IE下一般使用<span style="color: #000000"><span style="font-weight: bold">selectNodes</span> </span>、<span style="color: #000000"><span style="font-weight: bold">selectSingleNode</span> </span>这些方法，而Firefox并没有这些方法，所以不能使用，前几天找了好久终于，一直没有找到一个很好的解决方法，很多网站提供的要不就是根本不支持，要不就是使用方法，不方便不实用，今天我终于找到一个很好的解决方法了，我把它弄成一个JS文件，只要引用它就可以像IE一样使用了。<br /><br />代码如下：</p>

```javascript
var GetNodeValue = function(obj)
{
  var str = ””;
    if(window.ActiveXObject)    //IE
    {
      str = obj.text;
    }
    else //Mozilla
    {
      try
      {
        str = obj.childNodes[0].nodeValue;
      }
      catch(ex)
      {
        str = ””;
      }
    }
    return str;
  }

  if(document.implementation && document.implementation.createDocument)
  {
    XMLDocument.prototype.loadXML = function(xmlString)
    {
      var childNodes = this.childNodes;
      for (var i = childNodes.length - 1; i >= 0; i–)
        this.removeChild(childNodes[i]);

      var dp = new DOMParser();
      var newDOM = dp.parseFromString(xmlString, ”text/xml”);
      var newElt = this.importNode(newDOM.documentElement, true);
      this.appendChild(newElt);
    };

    // check for XPath implementation
    if( document.implementation.hasFeature(”XPath”, ”3.0”) )
    {
       // prototying the XMLDocument
       XMLDocument.prototype.selectNodes = function(cXPathString, xNode)
       {
        if( !xNode ) { xNode = this; }
        var oNSResolver = this.createNSResolver(this.documentElement)
        var aItems = this.evaluate(cXPathString, xNode, oNSResolver,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        var aResult = [];
        for( var i = 0; i < aItems.snapshotLength; i++)
        {
         aResult[i] =  aItems.snapshotItem(i);
       }
       return aResult;
     }

       // prototying the Element
       Element.prototype.selectNodes = function(cXPathString)
       {
        if(this.ownerDocument.selectNodes)
        {
         return this.ownerDocument.selectNodes(cXPathString, this);
       }
       else{throw ”For XML Elements Only”;}
     }
   }

    // check for XPath implementation
    if( document.implementation.hasFeature(”XPath”, ”3.0”) )
    {
       // prototying the XMLDocument
       XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode)
       {
        if( !xNode ) { xNode = this; }
        var xItems = this.selectNodes(cXPathString, xNode);
        if( xItems.length > 0 )
        {
         return xItems[0];
       }
       else
       {
         return null;
       }
     }

       // prototying the Element
       Element.prototype.selectSingleNode = function(cXPathString)
       {
        if(this.ownerDocument.selectSingleNode)
        {
         return this.ownerDocument.selectSingleNode(cXPathString, this);
       }
       else{throw ”For XML Elements Only”;}
     }
   }
}
```

<p><br />只要把以上代码存成一个JS文件，在页面上引用它，当XML节点的读取操作就可以像IE一样使用了，已经通过测试。</p>
<ul>
<li><span style="font-weight: bold">Firefox XML读取类</span>下载地址：<a href="http://www.cnblogs.com/Files/huacn/jquery.xml.js" target="_blank">http://www.cnblogs.com/Files/huacn/jquery.xml.js</a></li>
<li><span style="font-weight: bold">演示</span><strong>下载</strong>：<a href="http://www.cnblogs.com/Files/huacn/mutilayer_fixed.zip" target="_blank">http://www.cnblogs.com/Files/huacn/mutilayer_fixed.zip</a></li>
</ul>

