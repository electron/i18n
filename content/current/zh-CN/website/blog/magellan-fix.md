---
title: SQLite 脆弱性修复
author: ckerr
date: '2018-12-18'
---

已经发现一个远程代码执行脆弱性，"[Magellan](https://blade.tencent.com/magellan/index_en.html)," 影响基于 SQLite 或 Chromium 的软件，包括所有版本的 Electron 。

---

## 范围

使用 Web SQL 的 Electron 应用程序受到影响。


## 减轻影响

受影响的应用应该停止使用 Web SQL 或升级到 Electron 的补丁版本。

我们已经发布了新版本的 Electron ，其中包括对此脆弱性的修正：
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-β.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

野生动物没有关于这种情况的报告；但敦促受影响的应用缓解这种情况。

## 更多信息

Tencent Blade团队发现了这种易受伤害性，他们已经发表了 [个博客文章讨论了易受伤害性](https://blade.tencent.com/magellan/index_en.html)。

要了解更多关于维护您的 Electron 应用安全的最佳做法，请参阅我们的 [安全教程](https://electronjs.org/docs/tutorial/security)。

如果您想要报告Electron中的脆弱性，电子邮件security@electronjs.org。
