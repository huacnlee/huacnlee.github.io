---
layout: post
title: "Linux 遍历目录下面所有文件，将文件名转为小写 "
date: 2010-01-07 15:18
comments: true
categories: 
- Python
- Scripts
- Linux
---
当你从 Windows 服务器换到 Linux 服务器的时候，以前的上传目录的目录名、文件名会遇到大小写的问题。在 Windows 环境下面没有文件区分大小写的概念，而 Linux 却有严格的文件名大小写区分。
这样一来但来自 Windows 服务器上面那些文件就有可能遇到因为文件名中带有大写字母而无法被找到。需要将这些文件的文件名从大写转换为小写字母...在将调用时候使用的地址全改为小写。
在网上找了好久，都没有一个合适的脚本，看过好几个论坛上面贴出来的 Shell 脚本，试试都还是不行（我需要遍历目录、子目录下的所有文件，当然也包括目录名称），于是自己写了一个

这是是 Python 脚本：

```python
#!/usr/bin/python
import os, sys,re
print "Auto convert Upper filename to Lower filename"
dir = '/home/huacnlee/uploadfiles'

print "find files..."
for root,dirs,files in os.walk(dir):
  print root
  print str(len(files)) + " found."
    os.rename(root,root.lower())
    for f in files:
       filename = root.lower() + "/" + f
       if re.search('[A-Z]',filename) != None:
          print filename
          newfilename = filename.lower()
          print "Renaming", f, "to", f.lower(), "..."
           os.rename(filename, newfilename)
```

将里面的 dir 变量改为需要处理的目录，然后运行就好了。