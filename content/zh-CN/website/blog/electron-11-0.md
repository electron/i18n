---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 已发布！ It includes upgrades to Chromium `87`, V8 `8.7`, and Node.js `12.18.3`. We've added support for Apple silicon, and general improvements. 请阅读下文了解更多详情！

---

Electron 团队很高兴发布了 Electron 11.0.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 新版本包括内容更新及问题修复，提供对Apple M1的硬件支持。

我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* Chromium `87.0.4280.47`
    * [New in Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [New in Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 blog post](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 blog post](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 blog post](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 blog post](https://v8.dev/blog/v8-release-87)

### 高亮功能

* Support for Apple M1: On November 10, Apple announced their [new M1 chips, which will be included in their upcoming hardware](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Beginning in Electron 11, Electron will be shipping separate versions of Electron for Intel Macs (x64) and Apple's upcoming M1 hardware (arm64). You can learn more about how to get your Electron app [running on Apple's M1 hardware here.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Added V8 crash message and location information to crashReport parameters. [#24771](https://github.com/electron/electron/pull/24771)
* Improved the performance of sending wide objects over the context bridge. [#24671](https://github.com/electron/electron/pull/24671)

See the [11.0.0 release notes](https://github.com/electron/electron/releases/tag/v11.0.0) for a full list of new features and changes.

## 重大更改

* 移除实验性API: `BrowserView.{fromId, fromWebContents, getAllViews}`和`BrowserView`的`id`属性. [#23578](https://github.com/electron/electron/pull/23578)

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改

* Added `app.getApplicationInfoForProtocol()` API that returns detailed information about the app that handles a certain protocol. [#24112](https://github.com/electron/electron/pull/24112)
* Added `app.createThumbnailFromPath()` API that returns a preview image of a file given its file path and a maximum thumbnail size. [#24802](https://github.com/electron/electron/pull/24802)
* Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25756](https://github.com/electron/electron/pull/25756)

## End of Support for 8.x.y

Electron 8.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 Although we are careful not to make promises about release dates, our plan is to release new major versions of Electron with new versions of those components approximately quarterly. The [tentative 12.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 12.0 development life cycle. 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### 未来将弃用 `remote` 模块
我们已经着手移除[Electron 9](https://www.electronjs.org/blog/electron-9-0)中的 `remote` 模块， 计划在Electron 14中完成。

要想知道有关移除计划的全部细节，请阅读并关注 [这里](https://github.com/electron/electron/issues/21408)。

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12.

要想知道其他细节或时间相关的问题，请阅读并关注 [这里](https://github.com/electron/electron/issues/18397)。
