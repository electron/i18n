---
title: Electron 9.0.0
author:
  - 索菲亚格文
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 已发布！ 它包括升级Chromium `83`, V8 `8.3`, 和 Node.js `12.14` 我们已经为我们的拼写检查功能添加了几个新的 API 集成，启用 PDF 查看器和更多！

---

Electron 团队很高兴发布Electron 9.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 发行版装有升级、修复和新功能。 我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* Chromium `83.0.4103.64`
    * [Chrome 中新建的 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 已跳过](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Chrome 有新的 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [节点12.14.1 博客文章](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 博客文章](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 博客文章](https://v8.dev/blog/v8-release-83)

### 高亮功能

* 拼写检查功能的多次改进。 详见 [#22128](https://github.com/electron/electron/pull/22128) and [#22368](https://github.com/electron/electron/pull/22368)。
* 在 Linux 上提高窗口事件处理效率。 [#23260](https://github.com/electron/electron/pull/23260).
* 启用 PDF 查看器。 [#22131](https://github.com/electron/electron/pull/22131).

查看 [9.0.0 版本备注](https://github.com/electron/electron/releases/tag/v9.0.0) 查看新功能和更改的完整列表。

## 重大更改

* 使用 `远程` 时不带 `启用RemoteModule: true` [#21546](https://github.com/electron/electron/pull/21546)
    * 这是我们废弃 `远程` 模块并将其移动到用户界面的计划中的第一步。 您可以阅读并关注 [这个问题](https://github.com/electron/electron/issues/21408) ，这个问题详细说明了我们这个问题的原因，并且包含了一个废弃的拟议时间线。
* 默认情况下，将 `app.enableRenderProcessReuse` 设置为 true。 [#22336](https://github.com/electron/electron/pull/22336)
    * 这是为了在渲染器进程中加载的本地节点模块的未来要求继续进行的工作，它要么是 [N-API](https://nodejs.org/api/n-api.html) 或者 [Context 意识](https://nodejs.org/api/addons.html#addons_context_aware_addons)。 详细信息和拟议的时间线在 [这个问题](https://github.com/electron/electron/issues/18397)。
* 通过 IPC 发送非JavaScript 对象，现在会产生异常。 [#21560](https://github.com/electron/electron/pull/21560)
    * 此行为在 Electron 8.0 中折旧。 在 Electron 9.0中，旧的序列化算法已被删除，发送这种不可序列化的对象现在会抛出一个“对象无法被克隆”错误。

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改

* `shell` API 更改：
   * `shell.openitem` API 已被异步 `shell.openPath API 替换`。 [提议](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `会话`API 更改：
   * 添加 `session.listWordsFromSpellCheckerDictionary` API 以在字典中列出自定义单词。 [#22128](https://github.com/electron/electron/pull/22128)
   * 添加 `session.removeWordFromSpellChecker字典` API 以删除字典中的自定义单词。 [#22368](https://github.com/electron/electron/pull/22368)
   * 添加 `session.serviceWorkerContext` API 来访问基本服务工人信息和从服务工人接收控制台日志。 [#22313](https://github.com/electron/electron/pull/22313)
* `应用` API 更改：
   * 在 macOS 上添加了一个新的力参数到 `app.focus()` 来允许应用强制进行对焦。 [#23447](https://github.com/electron/electron/pull/23447)
* `浏览窗口` API 更改：
   * 在 `浏览窗口` 上增加了对一些getter/setter 配对的属性访问支持。 [#23208](https://github.com/electron/electron/pull/23208)

### 已弃用 API

以下API现已废弃或删除：

* `shell.openitem` API 现已折旧，代之以异步 `shell.openPath API`。
* `<webview>.getWebContent`已经在 Electron 8.0中被废弃，现在被删除。
* `webFramework.setLayoutZoomLevelLimited`已被删除，它在 Electron 8.0中被废弃。

## 6.x.y 的支持结束

Electron 6.x.y 已根据项目的 [支持政策](https://electronjs.org/docs/tutorial/support#supported-versions) 到达支持结束。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的 10.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines) 映射了Electron 10.0 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### 将 `上下文隔离` 的默认值从 `false` 更改为 `true` (在 Electron 10中启动)

没有上下文隔离，渲染过程中运行的任何代码都可以轻松地进入Electron内部或应用的预加载脚本。 该代码然后可以执行Electron想要保持限制的优先操作。

更改此默认值可以提高Electron应用的默认安全性，使应用需要有意识地选择不安全行为。 Electron 将在 Electron 10 中折旧当前 `上下文隔离` 的缺省值。 , 并在Electron 12.0中更改为新的默认 (`true`)。

获取更多关于 `contextIsolation`, 如何轻松启用它以及它的安全益处，请参阅我们的专项 [Contexation 文档](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md)。
