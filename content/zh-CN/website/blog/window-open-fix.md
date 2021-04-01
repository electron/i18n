---
title: BrowserView wind.open() 脆弱性修复
author: ckerr
date: '2019-02-03'
---

已经发现一个代码的易受伤害性，可以在子窗口中重新启用节点。

---

打开 `sandbox: true` or `原生WindowOpen: true` 和 `节点集成: false` 结果在 `窗口中的 web内容 pp` 可以调用，新打开的子窗口将有 `节点集成` 已启用。 此脆弱性影响到所有支持版本的 Electron。

## 减轻影响

我们已经发布了新版本的 Electron ，其中包括对此脆弱性的修复： [`。 17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4。 4`](https://github.com/electron/electron/releases/tag/v4.0.4), and [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). 我们鼓励所有Electron开发者立即更新他们的应用程序到最新稳定版本。

如果由于某些原因，您无法升级您的 Electron 版本，您可以通过禁用所有子网页内容来缓解这个问题：

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault();
```

## 更多信息

[PalmerAL](https://github.com/PalmerAL) 已经发现这个脆弱性并负责任地报告给Electron项目。

要了解更多关于维护您的 Electron 应用安全的最佳做法，请参阅我们的 [安全教程](https://electronjs.org/docs/tutorial/security)。

如果您想要报告Electron中的脆弱性，电子邮件security@electronjs.org。
