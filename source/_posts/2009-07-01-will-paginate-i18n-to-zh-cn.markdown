---
layout: post
title: "解决 will_paginate 中文本地化"
date: 2009-07-01 04:59
comments: true
categories:
- Rails
- will_paginate
- I18N
- 教程
---
<p><a href="http://github.com/mislav/will_paginate/" target="_blank">will_paginate</a> 是 <a href="http://www.rubyonrails.com" target="_blank">Ruby on Rails</a> 里面一个非常好用的分页控件，用它就可以很方便的生成翻页的代码，但是不知道为什么这个插件没有提供直接基于 <a href="http://guides.rubyonrails.org/i18n.html" target="_blank">Ruby on Rails I18N</a> 的翻译设置。</p>
<p>在Google上面搜索也没有找到比较好的解决方法，于是我就看了一下它的源代码，发现有个 <span style="color: #333399;">@@paginate_options</span> 类变量，于是在 <span style="color: #339966;">environment.rb</span> 加入：</p>

```ruby
require 'will_paginate'
# will_paginate custom label
WillPaginate::ViewHelpers.pagination_options[:previous_label] = '« 上一页'
WillPaginate::ViewHelpers.pagination_options[:next_label] = '下一页 »'
```

<p>重启server，翻译完成，当然，还可以把上一页一下页换成图片的...</p>
<p>另可参见 <a href="http://gitrdoc.com/rdoc/mislav/will_paginate/b3b0f593ea9b1da13a64bc825dfe17b6bbc2828b/classes/WillPaginate/ViewHelpers.html" target="_blank">will_paginate API doc</a></p>
