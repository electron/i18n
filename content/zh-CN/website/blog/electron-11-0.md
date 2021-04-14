---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 已发布！ 它包括升级铬 `87`，V8 `8.7`，节点.js `12.18.3`。 我们增加了对苹果硅的支持，并进行了全面改进。 请阅读下文了解更多详情！

---

Electron 团队很高兴发布了 Electron 11.0.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 该版本充满了对苹果M1硬件的升级、修复和新的支持。

我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* 铬 `87.0.4280.47`
    * [铬 86 中的新](https://developers.google.com/web/updates/2020/10/nic86)
    * [铬 87 中的新](https://developers.google.com/web/updates/2020/11/nic87)
* 节点.js `12.18.3`
    * [节点 12.18.3 博客文章](https://nodejs.org/en/blog/release/v12.18.3/)
    * [节点 12.7.0 博客文章](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6博客文章](https://v8.dev/blog/v8-release-86)
    * [V8 8.7博客文章](https://v8.dev/blog/v8-release-87)

### 高亮功能

* 支持苹果M1：11月10日，苹果宣布 [新的M1芯片，这将包括在他们即将推出的硬件](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/)。 从电子 11 开始，Electron 将为英特尔 Mac （x64） 和苹果即将推出的 M1 硬件 （arm64） 运送单独版本的电子产品。 您可以在此处了解有关如何让电子应用 [在 Apple 的 M1 硬件上运行的更多信息。](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* 添加V8崩溃消息和位置信息崩溃报告参数。 [#24771](https://github.com/electron/electron/pull/24771)
* 提高了通过上下文桥发送宽对象的性能。 [#24671](https://github.com/electron/electron/pull/24671)

有关新功能和更改的完整列表，请参阅 [11.0.0 发布说明](https://github.com/electron/electron/releases/tag/v11.0.0) 。

## 重大更改

* 删除实验API： `BrowserView.{fromId, fromWebContents, getAllViews}` 和 `BrowserView`的 `id` 属性。 [#23578](https://github.com/electron/electron/pull/23578)

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改

* 添加 `app.getApplicationInfoForProtocol()` API，返回有关处理特定协议的应用程序的详细信息。 [#24112](https://github.com/electron/electron/pull/24112)
* 添加 `app.createThumbnailFromPath()` API，返回文件的预览图像，使其具有文件路径和最大缩略图大小。 [#24802](https://github.com/electron/electron/pull/24802)
* 添加 `webContents.forcefullyCrashRenderer()` 强制终止渲染器过程，以帮助恢复悬挂渲染器。 [#25756](https://github.com/electron/electron/pull/25756)

## 支持 8.x.y 的结束

根据该项目的 [支持政策](https://electronjs.org/docs/tutorial/support#supported-versions)，Electron 8.x.y 已达到支持结束。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 虽然我们小心翼翼地不承诺发布日期，但我们的计划是大约每季度发布一次电子新的主要版本，并推出这些组件的新版本。 [暂定 12.0.0 计划](https://electronjs.org/docs/tutorial/electron-timelines) 映射出 Electron 12.0 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### 继续为 `remote` 模块的弃用工作
我们开始拆除 [电子9](https://www.electronjs.org/blog/electron-9-0)的 `remote` 模块。 我们计划在电子14中删除 `remote` 模块本身。

阅读并关注本期 [](https://github.com/electron/electron/issues/21408) ，了解弃用的完整计划和详细信息。

### 要求本地节点模块具有上下文感知或 N-API 的最后一步（电子 12 中）
从 Electron 6 开始，我们一直在打下基础，要求在渲染器过程中加载</a>

原生节点模块 [N-API](https://nodejs.org/api/n-api.html) 或 [上下文感知](https://nodejs.org/api/addons.html#addons_context_aware_addons)。 实施此更改可增强安全性、更快的性能并减少维护工作量。 此计划的最后一步是消除在 Electron 12 中禁用渲染过程重用的能力。 </p> 

阅读并关注本期 [](https://github.com/electron/electron/issues/18397) 的完整详细信息，包括建议的时间表。
