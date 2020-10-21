---
title: 'Electron 2.0 及其他 - 语义版本'
author: 地下水
date: '2017-12-06'
---

Electron的新版本正在工作中，我们的版本策略也有一些改变。 从2.0.0版本起，Electron将严格遵守语义版本。

---

这个更改意味着你会看到更多的主要版本跳转，它通常是Chromium的重要更新。 补丁发布也将更加稳定，因为它们现在只包含没有新功能的错误修复。

**Major 版本增量**

* Chromium 版本更新
* Node.js 重大版本更新
* Electron 突破性 API 变更

**Minor 版本增量**

* Node.js 次要版本更新
* Electron 无突破性 API 变更

**Patch 版本增量**

* Node.js patch 版本更新
* 修复相关的 chromium 补丁
* Electron bug 修复

由于Electron的半程现在将更有意义，我们建议 使用 npm 的默认 `--save-dev` 标志安装 Electron ， 这将前缀 你的版本与 `^`, 让你安全地掌握最新的小和补丁 更新:

```sh
npm install --save-dev electron
```

对于只对错误修复感兴趣的开发者来说，您应该使用 tilde semver 前缀，例如 `~2。 0`, 它永远不会引入新的功能, 仅修复以提高稳定性。

详情见 [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning)。
