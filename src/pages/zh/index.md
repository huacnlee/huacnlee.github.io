---
layout: ../../layouts/Page.astro
title: "Profile · Native Shell、GPUI Kit 与 Ruby China"
description: "李华顺（Jason Lee / huacnlee），Technical VP at Longbridge，Native Shell（NSH）、GPUI Kit（原 GPUI Component）与 huacnlee/cargo 作者，Ruby China 联合创始人。"
---

<div class="intro">
  <p class="eyebrow">JASON LEE / HUACNLEE</p>
  <h1>李华顺</h1>
  <p class="role">Technical VP at <a href="https://longbridge.com">Longbridge</a></p>
  <p class="lead">Native Shell 与 GPUI Kit 作者，Ruby China 联合创始人。<br>专注原生桌面应用、开发者工具与开源。</p>
  <div class="contact-links">
    <a href="mailto:huacnlee@gmail.com">邮箱</a>
    <a href="https://github.com/huacnlee">GitHub</a>
    <a href="https://x.com/huacnlee">X / Twitter</a>
    <a href="https://ruby-china.org/huacnlee">Ruby China</a>
  </div>
</div>

## Native Shell

我目前的重点项目是 [Native Shell（NSH）](https://nsh.dev/)，一个用 Rust 构建的原生 UI 框架，支持 iOS、Android、macOS、Windows、Linux 与 Web。**一次构建，处处原生：**组件、状态、逻辑和 API 跨平台共享，各平台使用自己的原生视图、文字、输入与交互进行渲染，而视觉设计完全由应用掌控。

应用可以完全用 Rust 编写，也可以用 TSX 编写界面，或两者结合；既能打包成独立应用、嵌入现有原生应用，也能在运行时加载签名的 TSX 模块——插件、功能或 AI 生成的界面——运行在宿主配置的沙箱中。

## GPUI Kit

自 2024 年起，我创建并维护 [GPUI Kit](https://gpui-kit.com/)，一个基于 GPUI 的 Rust 桌面应用框架，前身是 GPUI Component。它涵盖 UI 组件、布局、编辑器和应用开发工具，支持 macOS、Windows 和 Linux。

我深度参与 GPUI 核心开发，为框架引入 MSAA 路径抗锯齿、线性渐变、Tab 焦点导航和矢量路径构建，并持续改进文字渲染、Windows 支持与渲染性能。[Zed 官方专文](https://zed.dev/blog/community-champion-jason-lee)介绍了我对 GPUI 及其生态的贡献。

在 GPUI Kit 中，我持续完善应用层能力，让更多开发者能够用 Rust 构建快速、精致的原生应用。通过 GPUI Shell，这些应用还可以用 JavaScript 编写插件和扩展。

## huacnlee/cargo

我还在维护 [huacnlee/cargo](https://huacnlee.github.io/cargo/)，一个可直接替换的 Cargo 分支，专为快速本地构建与可控的磁盘占用优化。同一项目的所有 git worktree 共享一个构建目录，并自动控制在容量上限内——在 525 个 crate 的 NSH 工作区中，5 个 worktree 的构建从 8.5 分钟、33.6 GB 降到 1.6 分钟、5.1 GB。

## Ruby China

2011 年，我和伙伴们共同创立了 [Ruby China](https://ruby-china.org/wiki/about)，并长期投入 **Ruby、Rails 社区在中国的发展**。从建设线上交流平台、分享技术经验，到参与组织 [RubyConf China 大会](https://ruby-china.org/topics/5111)，我希望让更多开发者相互连接、交流实践，一起推动 Ruby 和 Rails 的应用。

同年，我发起搭建 **RubyGems 淘宝镜像**，解决国内开发者安装依赖的困难；2016 年推动镜像转由 Ruby China 独立维护，并[重新设计服务架构](https://ruby-china.org/topics/29250)。这项公共服务一直运行至今。社区代码也逐渐发展成开源社区系统 [Homeland](https://github.com/ruby-china/homeland)。

## 经历与影响

我从 2000 年开始接触计算机，2006 年开始职业开发生涯。自 2009 年接触 Ruby 以来，Ruby、Rails 的文化深刻影响了我的技术品味与做事方式。

2011–2018 年，我在**淘宝、阿里巴巴和蚂蚁金服**共工作了 7 年。期间参与广告业务服务端、YunOS 基础设施及 Rails 应用开发，同时参与**阿里旺旺 Mac 客户端**，负责**虾米音乐 Mac 客户端**，参与 **Egg.js** 开发和**阿里集团 GitLab** 的维护，并参与**语雀**，负责架构设计。

你可以在 [GitHub](https://github.com/huacnlee) 找到我的代码，在 [X / Twitter](https://x.com/huacnlee) 看到我正在做的东西。

[查看我的开源作品 →](/zh/work/)
