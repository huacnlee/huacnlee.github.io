---
layout: ../layouts/Page.astro
title: "OPEN SOURCE"
description: "Jason Lee’s open-source work: creator of GPUI Kit, core contributions to GPUI and Zed, Ruby China, AutoCorrect, GoBackup, Rust and Rails tools."
---

<div class="intro compact">
  <p class="eyebrow">CURRENTLY BUILDING</p>
  <h1>OPEN SOURCE</h1>
  <p class="lead">The projects I’m actively building and improving.</p>
</div>

<div class="projects">
  <article class="project featured-project">
    <div class="featured-heading">
      <h2><a href="https://gpui-kit.com/">GPUI Kit</a></h2>
      <a class="featured-stars" href="https://github.com/longbridge/gpui-kit" aria-label="GPUI Kit on GitHub, 14.2k stars">☆ 14.2k stars</a>
      <p>Fast, polished native apps in Rust.</p>
    </div>
    <div class="featured-body">
      <p class="featured-lead">Since 2024, I’ve been building and maintaining GPUI Kit, a desktop application framework built on GPUI, formerly known as GPUI Component.</p>
      <p>It brings UI components, layouts, editors, and application development tools together for macOS, Windows, and Linux. My work on GPUI’s core includes MSAA path anti-aliasing, linear gradients, Tab focus navigation, and vector path construction, alongside the application layer I continue to build in GPUI Kit.</p>
      <dl class="featured-capabilities">
        <div><dt>Interfaces</dt><dd>Components, data tables, docking, and charts for building desktop interfaces.</dd></div>
        <div><dt>Applications</dt><dd>A code editor and application tools, used in native apps such as Longbridge Pro.</dd></div>
        <div><dt>Extensions</dt><dd>GPUI Shell lets applications support plugins and extensions written in JavaScript.</dd></div>
      </dl>
      <div class="featured-links"><a href="https://gpui-kit.com/">Explore the docs →</a><a href="https://github.com/longbridge/gpui-kit">Source on GitHub ↗</a></div>
    </div>
  </article>
</div>

## Contributions

I contribute improvements from real projects back to the tools and frameworks I build on—from Rails and GitLab to Rust desktop software.

### [Zed &amp; GPUI](https://github.com/zed-industries/zed) <span class="repo-stars" aria-hidden="true" title="89,985 GitHub stars · 2026-09-09">☆ 90k</span>

Since February 2024, I’ve contributed more than 100 merged PRs to Zed and GPUI, spanning the editor, its rendering framework, and native platform integration. Much of this work connects the needs of Zed with what I learn building Longbridge Pro and GPUI Kit.

* **Graphics and rendering.** Enabled [MSAA anti-aliasing for path rendering](https://github.com/zed-industries/zed/pull/22812) in Metal and Blade, improving vector graphics quality. Introduced [linear gradients](https://github.com/zed-industries/zed/pull/20812), [vector path construction](https://github.com/zed-industries/zed/pull/22808), and [element opacity](https://github.com/zed-industries/zed/pull/17132), and improved rounded clipping.
* **Text and typography.** Added [`line_clamp` for multi-line text truncation](https://github.com/zed-industries/zed/pull/23058), fixed [underline and strikethrough positioning in centered and right-aligned text](https://github.com/zed-industries/zed/pull/24721), and corrected [hover and active text styles](https://github.com/zed-industries/zed/pull/24723), enabling link hover colors. Also fixed CJK wrapping in [Zed’s editor](https://github.com/zed-industries/zed/pull/11296) and [GPUI](https://github.com/zed-industries/zed/pull/17737), and font clipping on macOS.
* **Interaction and performance.** [Reduced full-window refreshes to improve cached-view hit rates](https://github.com/zed-industries/zed/pull/25009), avoiding unnecessary render calls during scrolling and mouse interactions. Added [Tab focus navigation](https://github.com/zed-industries/zed/pull/33008) and keyboard activation, and fixed [nested popovers and deferred rendering](https://github.com/zed-industries/zed/pull/47770).
* **Native platform support.** Improved Windows window behavior, [runtime and language-server installation](https://github.com/zed-industries/zed/pull/11156), and [file-path matching](https://github.com/zed-industries/zed/pull/12357). On macOS, I made [native window appearance follow the selected theme](https://github.com/zed-industries/zed/pull/58902).
* **Everyday editor workflows.** Improved Rust syntax highlighting, [theme selection after installing extensions](https://github.com/zed-industries/zed/pull/9529), [status-bar line navigation](https://github.com/zed-industries/zed/pull/9002), and [rerunning tasks from the terminal](https://github.com/zed-industries/zed/pull/12379), alongside Markdown preview and menu refinements.

I’m also developing proposals for [native window composition](https://github.com/zed-industries/zed/pull/62379), [GPUI overlays above native child views](https://github.com/zed-industries/zed/pull/61945), and [glass-surface rendering](https://github.com/zed-industries/zed/pull/58833). These are ongoing upstream proposals, extending how GPUI works with embedded native content.

[Explore all my Zed PRs →](https://github.com/zed-industries/zed/pulls?q=is%3Apr+author%3Ahuacnlee)

Zed featured my work in **Community Champion Spotlight: Jason Lee**, recognizing my contributions to both the framework and its wider ecosystem.

> “… outstanding contributions to `gpui` and the ecosystem around it.”
>
> — [Zed · April 2026](https://zed.dev/blog/community-champion-jason-lee)

* [Ruby on Rails](https://github.com/rails/rails) <span class="repo-stars" aria-hidden="true" title="58,750 GitHub stars · 2026-09-09">☆ 58.8k</span> — Improved [Active Storage integration](https://github.com/rails/rails/pull/31854) and [Redis caching](https://github.com/rails/rails/pull/33254).
* [GitLab](https://github.com/gitlabhq/gitlabhq) <span class="repo-stars" aria-hidden="true" title="24,546 GitHub stars · 2026-09-09">☆ 24.5k</span> — Improved [settings caching](https://github.com/gitlabhq/gitlabhq/pull/9825), [permission-check performance](https://github.com/gitlabhq/gitlabhq/pull/9915), and view rendering alongside maintaining Alibaba’s GitLab.
* [GORM](https://github.com/go-gorm/gorm) <span class="repo-stars" aria-hidden="true" title="39,950 GitHub stars · 2026-09-09">☆ 40k</span> — Introduced the [`db.Transaction` API](https://github.com/go-gorm/gorm/pull/2767) and [`ToSQL`](https://github.com/go-gorm/gorm/pull/4787) for transaction blocks and SQL inspection, and created [gorm-sharding](https://github.com/go-gorm/sharding), a table-sharding plugin for GORM.
* [Pest](https://github.com/pest-parser/pest) <span class="repo-stars" aria-hidden="true" title="5,395 GitHub stars · 2026-09-09">☆ 5.4k</span> — Added [Unicode Script rules](https://github.com/pest-parser/pest/pull/751), [multiple grammar files](https://github.com/pest-parser/pest/pull/758), and [line-index performance improvements](https://github.com/pest-parser/pest/pull/785).

## Omarchy

* [Omamail](https://github.com/huacnlee/omamail) — A mail plugin for Omarchy with Gmail, HEY, and IMAP support. Read and manage email right from the desktop.
* [Omasend](https://github.com/huacnlee/omasend) — A native LocalSend client for Omarchy. Share files, folders, and text over your local network. Built with GPUI Kit for Linux, macOS, and Windows.
* [Omarchy Mihoro](https://github.com/huacnlee/omarchy-mihoro) — An Omarchy bar panel for Mihoro. Monitor your proxy, switch between Rule, Global, and Direct modes, and manage subscriptions.
* [Omarchy WhichKey](https://github.com/huacnlee/omarchy-which-key) — Which Key for the desktop. Hold Super to see a shortcut guide drawn from your active Omarchy and Hyprland keybindings.

## More Open Source

* [AutoCorrect](https://github.com/huacnlee/autocorrect) <span class="repo-stars" aria-hidden="true" title="1,627 GitHub stars · 2026-09-09">☆ 1.6k</span> — A Rust linter and formatter for spacing, words, and punctuation in mixed CJK and English text.
* [GoBackup](https://github.com/gobackup/gobackup) <span class="repo-stars" aria-hidden="true" title="2,949 GitHub stars · 2026-09-09">☆ 2.9k</span> — Scheduled database and file backups to multiple cloud storage providers.
* [rust-i18n](https://github.com/longbridge/rust-i18n) <span class="repo-stars" aria-hidden="true" title="665 GitHub stars · 2026-09-09">☆ 0.7k</span> — Internationalization for Rust applications.

## Communities &amp; Web Apps

* [Ruby China](https://ruby-china.org) — A Chinese Ruby community. I’m its co-founder, administrator, and a primary developer.
* [Homeland](https://github.com/ruby-china/homeland) <span class="repo-stars" aria-hidden="true" title="3,859 GitHub stars · 2026-09-09">☆ 3.9k</span> — Open-source community software that powers Ruby China.
* [BlueDoc](https://github.com/huacnlee/bluedoc) <span class="repo-stars" aria-hidden="true" title="633 GitHub stars · 2026-09-09">☆ 0.6k</span> — Self-hosted document management for teams.
* [RubyGems Mirror](https://ruby-china.org/topics/29250) — A public service that helped developers in China install Ruby dependencies for more than a decade, from the Taobao mirror to Ruby China.

## Rails Tools

* [rails-settings-cached](https://github.com/huacnlee/rails-settings-cached) <span class="repo-stars" aria-hidden="true" title="1,122 GitHub stars · 2026-09-09">☆ 1.1k</span> — Global settings for Rails applications.
* [action-store](https://github.com/rails-engine/action-store) — Store likes, follows, bookmarks, and blocks through polymorphic associations.
* [notifications](https://github.com/rails-engine/notifications) — An in-app notification engine for Rails.
* [audit-log](https://github.com/rails-engine/audit-log) — User activity logs with a query interface.
* [rucaptcha](https://github.com/huacnlee/rucaptcha) <span class="repo-stars" aria-hidden="true" title="702 GitHub stars · 2026-09-09">☆ 0.7k</span> — Image captchas for Rails.
* [activestorage-aliyun](https://github.com/huacnlee/activestorage-aliyun) — Aliyun OSS support for Active Storage.
* [social-share-button](https://github.com/huacnlee/social-share-button) <span class="repo-stars" aria-hidden="true" title="580 GitHub stars · 2026-09-09">☆ 0.6k</span> — Social sharing buttons for Rails.

[More projects on GitHub →](https://github.com/huacnlee?tab=repositories)
