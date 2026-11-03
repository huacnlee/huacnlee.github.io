---
layout: ../layouts/Page.astro
title: "Profile · Native Shell, GPUI Kit & Ruby China"
description: "Jason Lee (huacnlee), Technical VP at Longbridge, creator of Native Shell (NSH), GPUI Kit (formerly GPUI Component) and huacnlee/cargo, and co-founder of Ruby China."
---

<div class="intro">
  <p class="eyebrow">JASON LEE / HUACNLEE</p>
  <h1>Jason Lee</h1>
  <p class="role">Technical VP at <a href="https://longbridge.com">Longbridge</a></p>
  <p class="lead">Creator of Native Shell and GPUI Kit. Co-founder of Ruby China.<br>Building native desktop apps, developer tools, and open source.</p>
  <div class="contact-links">
    <a href="mailto:huacnlee@gmail.com">Email</a>
    <a href="https://github.com/huacnlee">GitHub</a>
    <a href="https://x.com/huacnlee">X / Twitter</a>
    <a href="https://ruby-china.org/huacnlee">Ruby China</a>
  </div>
</div>

## Native Shell

My current focus is [Native Shell (NSH)](https://nsh.dev/), a native UI framework for iOS, Android, macOS, Windows, Linux, and the web, built in Rust. **Build once, native everywhere:** components, state, logic, and APIs are shared across platforms, while each platform renders with its own views, text, input, and interaction—and the app keeps full control of its visual design.

Apps can be written entirely in Rust, with screens in TSX, or both. They can ship as standalone apps, be embedded in existing native apps, or load signed TSX modules at run time—plugins, features, or AI-generated UI—inside a sandbox the host configures.

## GPUI Kit

Since 2024, I’ve been building and maintaining [GPUI Kit](https://gpui-kit.com/), a Rust desktop application framework built on GPUI, formerly known as GPUI Component. It covers UI components, layouts, editors, and application development tools, with support for macOS, Windows, and Linux.

My contributions to GPUI’s core include MSAA path anti-aliasing, linear gradients, Tab focus navigation, and vector path construction, alongside improvements to text rendering, Windows support, and rendering performance. [Zed’s official spotlight](https://zed.dev/blog/community-champion-jason-lee) recognizes my work on GPUI and its ecosystem.

In GPUI Kit, I continue to develop the application layer so more developers can build fast, polished native apps in Rust. Through GPUI Shell, these apps can also support plugins and extensions written in JavaScript.

## huacnlee/cargo

I also maintain [huacnlee/cargo](https://huacnlee.github.io/cargo/), a drop-in Cargo fork tuned for fast local builds and a bounded disk footprint. Every git worktree of a project shares one build directory that stays under a size limit on its own—on the 525-crate NSH workspace, five worktrees build in 1.6 minutes and 5.1 GB instead of 8.5 minutes and 33.6 GB.

## Ruby China

In 2011, I co-founded [Ruby China](https://ruby-china.org/wiki/about) and committed to **helping Ruby and Rails grow in China**. Through building an online community, sharing technical experience, and helping organize [RubyConf China](https://ruby-china.org/topics/5111), I’ve worked to connect developers, exchange practical knowledge, and encourage wider adoption of Ruby and Rails.

That same year, I initiated the **RubyGems Taobao mirror** to make installing dependencies easier in China. In 2016, I helped move it to independent maintenance under Ruby China and [redesigned its architecture](https://ruby-china.org/topics/29250). This public service continues to operate today. The community’s codebase also evolved into [Homeland](https://github.com/ruby-china/homeland), an open-source community platform.

## Experience &amp; Influences

I first started using computers in 2000 and began my professional development career in 2006. Since I discovered Ruby in 2009, the culture of Ruby and Rails has profoundly shaped my technical taste and the way I work.

From 2011 to 2018, I spent seven years at **Taobao, Alibaba, and Ant Financial**. Alongside work on advertising backend services, YunOS infrastructure, and Rails applications, I contributed to the **Aliwangwang Mac client**, led development of the **Xiami Music Mac client**, worked on **Egg.js**, helped maintain **Alibaba’s GitLab**, and joined **Yuque** to lead its architecture design.

You can find my code on [GitHub](https://github.com/huacnlee) and follow what I’m working on through [X / Twitter](https://x.com/huacnlee).

[Explore my open source →](/work/)
