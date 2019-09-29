---
layout: post
title: "Python 自动统计代码行数"
date: 2009-01-21 01:54
comments: true
categories:
- Python
---
今天公司项目要申请版权保护，上头要求给出总的代码行数，于是用Python写了个小脚本，效率不错，我的5000多个文件1秒就出来了。主要实现自动遍历要求格式（扩展名）的文件。

## 源代码

```python
# -*- coding: utf-8 -*-
#!/usr/bin/python
# linecount.py
# 2009-1-20
# author:
#   Jason Lee
#
import sys
import os

exts = ['.cs','.aspx','.cs','.js','.css','.ashx','.master','.ascx','.svc','.config']
def read_line_count(fname):
    count = 0
    for file_line in open(fname).xreadlines():
        count += 1
    return count

if __name__ == '__main__':

    count = 0
    fcount = 0
    for root,dirs,files in os.walk(os.getcwd()):
        for f in files:
            # Check the sub directorys
            fname = (root + '/'+ f).lower()
            ext = f[f.rindex('.'):]
            try:
                if(exts.index(ext) >= 0):
                    fcount += 1
                    c = read_line_count(fname)
                    count += c
            except:
                pass

    print 'file count:%d' % fcount
    print 'count:%d' % count
```

把它放项目的跟目录，在控制台下面运行就可以了，当然需要根据需求修改 exts 这个变量。
