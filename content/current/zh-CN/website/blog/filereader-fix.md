---
title: Chromium FileReader 脆弱性修复
author: 马合福音
date: '2019-03-07'
---

在Chrome发现了一个高度严重的易受伤害性，它影响到所有基于 Chromium的软件，包括Electron。

此易受伤害性已被分配 `CVE-2019-5786`。  您可以在 [Chrome 博客文章](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html) 中阅读更多关于它的信息。

请注意Chrome有报告说这种易受伤害性被用于野生，因此强烈建议您升级 Electron ASAP。

---

## 范围

这影响到任何可能运行第三方或不受信任的 JavaScript 的 Electron 应用程序。

## 减轻影响

受影响的应用应该升级到 Electron 的补丁版本。

我们已经发布了新版本的 Electron ，其中包括对此脆弱性的修正：
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

最新的 Electron 5 测试版正在跟踪Chromium 73，因此已经修补：
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## 更多信息

这种脆弱性是由谷歌威胁分析组Clement Lecigne发现的，并向Chrome小组报告。  Chrome博客文章可以在这里找到 [](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html)。

要了解有关保护电子应用安全的最佳实践的更多信息，请参阅我们的 [安全教程][]。

如果您想要报告Electron中的脆弱性，电子邮件security@electronjs.org。

[安全教程]: https://electronjs.org/docs/tutorial/security
