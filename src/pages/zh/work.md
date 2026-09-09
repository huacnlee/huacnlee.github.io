---
layout: ../../layouts/Page.astro
title: "开源"
description: "李华顺的开源工作：创建 GPUI Kit，深度参与 GPUI 与 Zed 核心开发，以及 Ruby China、AutoCorrect、GoBackup 和 Rust、Rails 开发工具。"
---

<div class="intro compact">
  <p class="eyebrow">最近的工作</p>
  <h1>开源</h1>
  <p class="lead">我最近持续开发和完善的开源项目。</p>
</div>

<div class="projects">
  <article class="project featured-project">
    <div class="featured-heading">
      <h2><a href="https://gpui-kit.com/">GPUI Kit</a></h2>
      <a class="featured-stars" href="https://github.com/longbridge/gpui-kit" aria-label="GPUI Kit on GitHub, 14.2k stars">☆ 14.2k stars</a>
      <p>用 Rust 构建快速、精致的原生应用。</p>
    </div>
    <div class="featured-body">
      <p class="featured-lead">自 2024 年起，我创建并维护 GPUI Kit，一个基于 GPUI 的桌面应用框架，前身是 GPUI Component。</p>
      <p>它涵盖 UI 组件、布局、编辑器和应用开发工具，支持 macOS、Windows 和 Linux。我深度参与 GPUI 核心开发，为框架引入 MSAA 路径抗锯齿、线性渐变、Tab 焦点导航与矢量路径构建，同时在 GPUI Kit 中持续完善应用层能力。</p>
      <dl class="featured-capabilities">
        <div><dt>界面构建</dt><dd>从 UI 组件、数据表格到 Dock 布局与图表，支持桌面界面的开发。</dd></div>
        <div><dt>应用开发</dt><dd>提供代码编辑器与应用开发工具，用于构建 Longbridge Pro 等原生应用。</dd></div>
        <div><dt>插件扩展</dt><dd>通过 GPUI Shell，应用可以支持用 JavaScript 编写的插件和扩展。</dd></div>
      </dl>
      <div class="featured-links"><a href="https://gpui-kit.com/">查看文档与组件 →</a><a href="https://github.com/longbridge/gpui-kit">GitHub 源代码 ↗</a></div>
    </div>
  </article>
</div>

## 参与贡献

我也把实际项目中的改进贡献给所依赖的工具和框架，从 Rails、GitLab 到 Rust 原生桌面开发。

### [Zed &amp; GPUI](https://github.com/zed-industries/zed) <span class="repo-stars" aria-hidden="true" title="89,985 GitHub stars · 2026-09-09">☆ 90k</span>

自 2024 年 2 月起，我向 Zed 和 GPUI 提交了超过 100 个已合并 PR，工作横跨编辑器、底层渲染框架与原生平台集成。许多改进连接着 Zed 自身的需求，以及我在 Longbridge Pro 和 GPUI Kit 中的开发实践。

* **图形与渲染。** 从引入 [MSAA 抗锯齿](https://github.com/zed-industries/zed/pull/22812)到[重构路径渲染](https://github.com/zed-industries/zed/pull/29718)，改善矢量图形质量、降低显存开销，并完善渐变与矢量路径构建能力。
* **文字与排版。** 完善中日韩文字换行、[多行截断](https://github.com/zed-industries/zed/pull/23058)、字体渲染与交互样式，让文字在不同布局和状态下稳定呈现。
* **交互与性能。** 增加[键盘焦点导航](https://github.com/zed-industries/zed/pull/33008)与激活能力，并[改善视图缓存](https://github.com/zed-industries/zed/pull/25009)，减少滚动和鼠标交互中的不必要渲染。
* **原生平台与编辑器体验。** 完善 Windows 集成与 macOS 渲染，同时改进 Zed 的主题切换、文件导航和终端任务等日常使用体验。

近期，我还在推进[原生窗口合成](https://github.com/zed-industries/zed/pull/62379)、[原生子视图之上的 GPUI 浮层](https://github.com/zed-industries/zed/pull/61945)与[玻璃表面渲染](https://github.com/zed-industries/zed/pull/58833)等上游提案，扩展 GPUI 与嵌入式原生内容协同工作的能力。

[查看我的全部 Zed PR →](https://github.com/zed-industries/zed/pulls?q=is%3Apr+author%3Ahuacnlee)

Zed 官方以 **Community Champion Spotlight: Jason Lee** 为题，专文介绍了我对 GPUI 框架及其生态的贡献。

> “… outstanding contributions to `gpui` and the ecosystem around it.”
>
> — [Zed · 2026 年 4 月](https://zed.dev/blog/community-champion-jason-lee)

* [Ruby on Rails](https://github.com/rails/rails) <span class="repo-stars" aria-hidden="true" title="58,750 GitHub stars · 2026-09-09">☆ 58.8k</span> — 改进 [Active Storage 集成](https://github.com/rails/rails/pull/31854)与 [Redis 缓存行为](https://github.com/rails/rails/pull/33254)。
* [GitLab](https://github.com/gitlabhq/gitlabhq) <span class="repo-stars" aria-hidden="true" title="24,546 GitHub stars · 2026-09-09">☆ 24.5k</span> — 在维护阿里集团 GitLab 的同时，贡献[配置缓存](https://github.com/gitlabhq/gitlabhq/pull/9825)、[权限判断性能](https://github.com/gitlabhq/gitlabhq/pull/9915)与视图渲染优化。
* [GORM](https://github.com/go-gorm/gorm) <span class="repo-stars" aria-hidden="true" title="39,950 GitHub stars · 2026-09-09">☆ 40k</span> — 引入[事务块 API `db.Transaction`](https://github.com/go-gorm/gorm/pull/2767) 和用于检查生成 SQL 的 [`ToSQL`](https://github.com/go-gorm/gorm/pull/4787)，并开发了 GORM 分表插件 [gorm-sharding](https://github.com/go-gorm/sharding)。
* [Pest](https://github.com/pest-parser/pest) <span class="repo-stars" aria-hidden="true" title="5,395 GitHub stars · 2026-09-09">☆ 5.4k</span> — 增加 [Unicode Script 规则](https://github.com/pest-parser/pest/pull/751)、[多语法文件支持](https://github.com/pest-parser/pest/pull/758)，并[优化行列定位性能](https://github.com/pest-parser/pest/pull/785)。

## Omarchy

* [Omamail](https://github.com/huacnlee/omamail) — Omarchy 邮件插件，支持 Gmail、HEY 与 IMAP，将邮件阅读和管理融入桌面。
* [Omasend](https://github.com/huacnlee/omasend) — 为 Omarchy 打造的原生 LocalSend 客户端，通过局域网发送文件、文件夹和文字。基于 GPUI Kit，支持 Linux、macOS 和 Windows。
* [Omarchy Mihoro](https://github.com/huacnlee/omarchy-mihoro) — Mihoro 的 Omarchy 状态栏面板，用于查看代理状态、切换 Rule / Global / Direct 模式和管理订阅。
* [Omarchy WhichKey](https://github.com/huacnlee/omarchy-which-key) — 将 Which Key 体验带到桌面：按住 Super 显示快捷键提示，直接读取当前 Omarchy 与 Hyprland 的实际绑定。

## 更多开源作品

* [AutoCorrect](https://github.com/huacnlee/autocorrect) <span class="repo-stars" aria-hidden="true" title="1,627 GitHub stars · 2026-09-09">☆ 1.6k</span> — 基于 Rust 的文案检查与格式化工具，处理 CJK 与英文混排中的空格、词语和标点。
* [GoBackup](https://github.com/gobackup/gobackup) <span class="repo-stars" aria-hidden="true" title="2,949 GitHub stars · 2026-09-09">☆ 2.9k</span> — 定时备份数据库和文件到多种云存储的工具。
* [rust-i18n](https://github.com/longbridge/rust-i18n) <span class="repo-stars" aria-hidden="true" title="665 GitHub stars · 2026-09-09">☆ 0.7k</span> — Rust 应用国际化工具。

## 社区与 Web 应用

* [Ruby China](https://ruby-china.org) — 中文 Ruby 社区，我是联合创始人、管理员和主要开发者。
* [Homeland](https://github.com/ruby-china/homeland) <span class="repo-stars" aria-hidden="true" title="3,859 GitHub stars · 2026-09-09">☆ 3.9k</span> — 开源社区系统，Ruby China 使用的论坛软件。
* [BlueDoc](https://github.com/huacnlee/bluedoc) <span class="repo-stars" aria-hidden="true" title="633 GitHub stars · 2026-09-09">☆ 0.6k</span> — 可自行部署的团队文档管理工具。
* [RubyGems 镜像](https://ruby-china.org/topics/29250) — 从 RubyGems 淘宝镜像到 Ruby China 镜像，持续十多年帮助国内开发者安装依赖的公共服务。

## Rails 工具

* [rails-settings-cached](https://github.com/huacnlee/rails-settings-cached) <span class="repo-stars" aria-hidden="true" title="1,122 GitHub stars · 2026-09-09">☆ 1.1k</span> — Rails 应用全局设置。
* [action-store](https://github.com/rails-engine/action-store) — 用多态关联统一存储赞、关注、收藏与屏蔽等行为。
* [notifications](https://github.com/rails-engine/notifications) — Rails 应用站内通知引擎。
* [audit-log](https://github.com/rails-engine/audit-log) — 用户操作审计日志与查询界面。
* [rucaptcha](https://github.com/huacnlee/rucaptcha) <span class="repo-stars" aria-hidden="true" title="702 GitHub stars · 2026-09-09">☆ 0.7k</span> — Rails 图形验证码工具。
* [activestorage-aliyun](https://github.com/huacnlee/activestorage-aliyun) — Active Storage 的阿里云 OSS 支持。
* [social-share-button](https://github.com/huacnlee/social-share-button) <span class="repo-stars" aria-hidden="true" title="580 GitHub stars · 2026-09-09">☆ 0.6k</span> — Rails 社交分享插件。

[在 GitHub 查看更多项目 →](https://github.com/huacnlee?tab=repositories)
