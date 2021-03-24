---
title: '周项目：WordPress 桌面'
author:
  - 毫卡斯
  - johngodley
  - zeke
date: '2017-02-28'
---

本周，我们在 [自动化](https://automattic.com/) 至 谈论 [WordPress 桌面](https://apps.wordpress.com/desktop/)一个 用于管理 WordPress 内容的开源桌面客户端。

---

[![WordPress 应用程序](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## 每个人都知道WordPress，但WordPress 桌面是什么？

[WordPress. om 桌面应用程序](https://apps.wordpress.com/desktop/) 提供了无缝的跨平台体验，使您能够关注您的内容和设计，无需浏览器选项卡来转移您的注意力——或保持网站旁边但可访问。 结合我们的浏览器支持和移动应用，您可以在任何地方建立您的网站，不管以何种方式帮助您完成工作。

## 为什么要构建一个桌面应用来管理 WordPress 站点？ 无法全部基于网络？

它实际上使用了您在浏览器中访问 [WordPress.com](https://wordpress.com) 时获得的完全相同的技术。 然而，它都是本地托管的，所以它的负载时间最小。 有了本地功能，如在你的码头、通知等等，你真的可以关注你的 WordPress 站点和博客。

## 您为什么选择在 Electron 上构建WordPress 桌面？

2015年底，我们重建了很多WordPress.com 的形式为 [Calypso](https://github.com/automattic/wp-calypso), 一个使用 React的开源的现代JavaScript应用程序。 我们开始观看Electron，随着对Calypso的一些更改，它得以在本地运行。 这是一种令人信服的经验，我们认为，进一步发展这种经验具有很大价值。

我们有几个工作队在Calypso工作。 要使一个完全多平台的图形界面客户端能够使用传统的桌面技术与之相匹配，就需要做更多的工作。 使用 Electron 一支由我们中的2至4人组成的小组能够在几个月内利用其他团队的努力并建立桌面应用程序。

## 构建WordPress 桌面时遇到了哪些挑战？

我们很快就开始了应用程序的初始版本， 但由于桌面应用程序占用了更多时间，调整它以优化行为。 应用程序的一个重大挑战是您在自己的机器上实际运行一个 Calypso 的副本——它纯粹是一个 API 驱动的UI。 这方面涉及许多衔接工作，各种变化都反馈给了Calypso本身。

此外，我们花费了大量精力为不同的平台打包应用程序—— 我们提供了Windows， macOS 和 Linux 版本 - 并且有足够的差异来做这件事。

当时，Electron相对较新，我们一直在处理很快已经解决的问题(有时是当天!)

## 应在哪些领域改进Electron？

Electron已经提供了我们所需要的桌面应用的大部分内容，并且自我们开始使用它以来它已经很快地取得进展。 尽管如此，一些领域在桌面应用中被认为是理所当然的。 例如拼写检查和查找/替换，这样就更难在 Electron 中复制。

我们也很乐意看到一些较新的Chrome技术也过滤到Electron。 我们特别热切地希望尝试WebVR。

## 您最喜欢的 Electron？

我们选择Electron的主要原因是非常活跃和开放的社区。 自动化一直被认为是开源的。 这是我们的核心原则之一。 “Electron”项目和社区信奉许多非常开放和积极的核心信念。

## WordPress 桌面下一步是什么？

我们模型的优秀内容是，桌面应用程序从任何新的 Calypso 特性中受益――不断改进。 我们希望我们能够为应用程序添加额外的功能，例如离线支持。 这将真正将应用带入本地领土，并更好的系统通知。

## 是否有任何自动化团队在其他Electron应用上工作？

是的，经过我们在桌面应用上的努力， Simpenote团队决定使用 Electron 为 Windows 和 Linux 构建桌面应用程序(原生的 Mac 客户端已经存在)。 [Simpenote Electron 应用程序](https://github.com/Automattic/simplenote-electron) 也是开源的，可在 Github上使用。

我们也有一个即将使用Electron的树莓派集成。

如果有任何声音有趣，那么我们 [最喜欢听到您的消息！](https://automattic.com/work-with-us/)！

## 任何可能对其他开发者有用的 Electron 提示？

配送签名桌面软件的过程对我们来说比较新，尤其是Windows。 我们为 [代码撰写了一篇文章。签名一个 Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) ，其中包括这个过程以及我们为了正确地做它所遇到的几个障碍。

