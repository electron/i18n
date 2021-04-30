---
title: Electron 10.0.0
author:
  - VerteDinde
  - 索菲亚格文
date: '2020-08-25'
---

Electron 10.0.0 已发布！ 它包括升级到 Chromium `85`, V8 `8.5`, 和 Node.js `12.16`。 我们添加了几个新的 API 集成和改进。 请阅读下文了解更多详情！

---

Electron 团队很高兴发布了 Electron 10.0.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 发行版装有升级、修复和新功能。

在 Electron 10 发布版中，我们还修改了我们的版本说明。 为了让它更容易知道Electron 10中的全新内容和Electron 10与过去版本之间可能发生的变化， 我们现在还包括了对Electron 10的修改，但是支持了以前的版本。 我们希望这将使应用程序在升级 Electron 时更容易找到新的功能和错误修复。

我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* Chromium `85.0.4183.84`
    * [Chrome 中有新的 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [新建Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [节点12.16.3博客文章](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 博客文章](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 博客文章](https://v8.dev/blog/v8-release-85)

### 高亮功能

* 添加 `contents.getBackgroundThrotling()` 方法 和 `contents.backgroundThrottling` 属性。 [#21036]
* 显示主进程中的 `桌面捕获器` 模块。 [#23548](https://github.com/electron/electron/pull/23548)
* 现在可以通过调用 `ses.isPerspersistent()` API来检查给定的 `session` 是否持久。 [#22622](https://github.com/electron/electron/pull/22622)
* 解决由于网络IP地址更改和ICE无法连接RTC 通话的网络问题。 （Chromium issue 1113227）。 [#24998](https://github.com/electron/electron/pull/24998)

查看 [10.0.0 版本备注](https://github.com/electron/electron/releases/tag/v10.0.0) 查看新功能和更改的完整列表。

## 重大更改

* 已更改 `启用的默认值。删除模块` 至 `false`。 [#22091](https://github.com/electron/electron/pull/22091)
    * 这是我们废弃 `远程` 模块并将其移动到用户界面的计划的一部分。 您可以阅读并关注 [这个问题](https://github.com/electron/electron/issues/21408) ，这个问题详细说明了我们这个问题的原因，并且包含了一个废弃的拟议时间线。
* 将 `app.allowRenderProcessReuse` 的默认值更改为 `true`。 [#2236](https://github.com/electron/electron/pull/22336) (也在 [Electron 9](https://github.com/electron/electron/pull/22401) 中)
   * 这将防止在渲染过程中加载不了解上下文的本地模块。
   * 您可以阅读并关注 [这个问题](https://github.com/electron/electron/issues/18397) ，这个问题详细说明了我们这个问题的原因，并且包含了一个废弃的拟议时间线。
* 修复了 macOS 区域设置为 RTL 语言时窗口按钮的位置(例如阿拉伯语或希伯来语)。 Firmeless 窗口应用程序在为其窗口搭配时可能必须说明这种变化。 [#22016](https://github.com/electron/electron/pull/22016)

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改

* Session: Can now check if a given `session` is persistent by calling the `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* 内容: 添加 `contents.getBackgroundThrotling()` methods and `contents.backgroundThrottling` property. [#21036](https://github.com/electron/electron/pull/21036)

### 已弃用 API

以下API现已废弃或删除：

* 已删除废弃的 `目前日志路径` 属性 `网络日志` 此外， `netLog.stopLogging` 不再返回记录日志的路径。 [#22732](https://github.com/electron/electron/pull/22732)
* 已废弃 `crashReporter` 中未压缩的崩溃上传。 [#23598](https://github.com/electron/electron/pull/23598)

## 结束对 7.x.y 的支持

Electron 7.x.y 已经按照项目的 [支持策略](https://electronjs.org/docs/tutorial/support#supported-versions) 达到了支持结束。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的11.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) 映射了Electron 11.0 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### 继续废弃 `远程` 模块的工作 (在 Electron 11)
我们开始了删除 [Electron 9](https://www.electronjs.org/blog/electron-9-0) 中的远程模块的工作，我们正在继续删除 `远程` 模块的计划。 在 Electron 11中，我们计划像在 Electron 10 中那样，继续重新调整实现 [虚弱Ref](https://v8.dev/features/weak-references) 的工作。 请阅读并关注 [这个问题](https://github.com/electron/electron/issues/21408) 以获取废弃的完整计划和详细信息。

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. 禁用渲染器过程重用现已推至电子 12。_

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
