---
title: Electron 12.0.0
author:
  - VerteDinde
  - 姆劳伦辛
  - 索菲亚格文
date: '2021-03-02'
---

Electron 12.0.0 已发布！ 它包括升级铬 `89`，V8 `8.9` 和节点.js `14.16`。 我们增加了远程模块的更改、上下文隔离的新默认值、新的 WebFrameMain API 和一般改进。 请阅读下文了解更多详情！

---

Electron 团队很高兴发布了 Electron 12.0.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* 铬 `89`
    * [铬 88 中的新](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [铬 89 中的新](https://developer.chrome.com/blog/new-in-chrome-89/)
* 节点.js `14.16`
    * [节点 14.16.0 博客文章](https://nodejs.org/en/blog/release/v14.16.0/)
    * [节点 14.0.0 博客文章](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8博客文章](https://v8.dev/blog/v8-release-88)
    * [V8 8.9博客文章](https://v8.dev/blog/v8-release-89)

### 高亮功能

* 上下文桥 `exposeInMainWorld` 方法现在可以暴露非对象 ABI。 [#26834](https://github.com/electron/electron/pull/26834)
* 从节点 12 升级到节点 14。 [#23249](https://github.com/electron/electron/pull/25249)
* 添加了一个新的 `webFrameMain` API，用于从主过程访问 `WebContents` 实例的子帧。 [#25464](https://github.com/electron/electron/pull/25464)
* `contextIsolation` 和 `worldSafeExecuteJavaScript` 的默认值现已 `true`。 [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

有关新功能和更改的完整列表，请参阅</a> 的

12.0.0 发布说明。</p> 



## 重大更改

* 弃用 `remote` 模块。 它被 [`@electron/remote`](https://github.com/electron/remote)所取代。 [#25293](https://github.com/electron/electron/pull/25293) 
      * 如果您当前使用的是 `remote` 模块，我们已 [此处编写了迁移至 `@electron/remote` 的指南。](https://github.com/electron/remote#migrating-from-remote)
* 将 `contextIsolation` 的默认值更改为 `true`。 [#27949](https://github.com/electron/electron/pull/27949)
* 将 `worldSafeExecuteJavaScript` 的默认值更改为 `true`。 [#27502](https://github.com/electron/electron/pull/27502)
* 将 `crashReporter.start({ compress })` 的默认值从 `false` 更改为 `true`。 [#25288](https://github.com/electron/electron/pull/25288)
* 已删除闪存支持：铬已删除对 Flash 的支持，该支持也在电子 12 中删除。 有关详细信息，请参阅 [铬的闪存路线图](https://www.chromium.org/flash-roadmap) 。
* x86 上铬所需的 SSE3：铬已取消对 [年长 x86 CPU 的支持，这些 CPU](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64)不符合 SSE3（流式传输 SIMD 扩展 3） 支持的最低要求。 电子 12 中也删除了此支持。

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。



## API 更改

* 添加 `webFrameMain` API： `webFrameMain` 模块可用于查找现有 [`WebContents`](/docs/api/web-contents.md) 实例中的帧。 这是相当于现有 Web 框架 API 的主要过程。 更多有关这个新的API的信息可以在这里找到 [](https://github.com/electron/electron/pull/25464)，在我们的 [文档](https://www.electronjs.org/docs/api/web-frame-main)。
* `应用` API 更改： 
      * 向 `'child-process-gone'` / `app.getAppMetrics()`添加非本地化 `serviceName` 。 [#25975](https://github.com/electron/electron/pull/25975)
    * 增加了新的 `app.runningUnderRosettaTranslation` 属性，以检测何时运行在苹果硅的玫瑰花塔下。 [#26444](https://github.com/electron/electron/pull/26444)
    * 添加 `exitCode` `render-process-gone` 详细信息（应用 & 网络内容）。 [#27677](https://github.com/electron/electron/pull/27677)
* `浏览窗口` API 更改： 
      * 添加 `BrowserWindow.isTabletMode()` API。 [#25209](https://github.com/electron/electron/pull/25209)
    * 添加 `resized` （视窗/macOS）和 `moved` （窗口）事件，以 `BrowserWindow`。 [#26216](https://github.com/electron/electron/pull/26216)
    * 添加了新的 `system-context-menu` 事件，以便防止和覆盖系统上下文菜单。 [#25795](https://github.com/electron/electron/pull/25795)
    * 添加 `win.setTopBrowserView()` ，以便可以提出 `BrowserView`。 [#27713](https://github.com/electron/electron/pull/27713)
    * 添加 `webPreferences.preferredSizeMode` ，允许根据其文档的最小大小进行大小调整视图。 [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` API 更改： 
      * 允许上下文桥 `exposeInMainWorld` 方法来暴露非对象 ABI。 [#26834](https://github.com/electron/electron/pull/26834)
* `display` API 更改： 
      * 在 `Display` 对象中添加 `displayFrequency` 属性，以便获取有关 Windows 刷新率的信息。 [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` API 更改： 
      * 增加对一些 `chrome.management` ABI 的支持。 [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` API 更改： 
      * 显示 macOS 共享菜单的额外支持。 [#25629](https://github.com/electron/electron/pull/25629)
* `net` API 更改： 
      * 为 `net.request()`添加了一个新的 `credentials` 选项。 [#25284](https://github.com/electron/electron/pull/25284)
    * 添加 `net.online` 用于检测当前是否有互联网连接。 [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API 更改： 
      * 添加 `powerMonitor.onBatteryPower`。 [#26494](https://github.com/electron/electron/pull/26494)
    * 添加快速用户切换事件到macOS上的电源监控器。 [#25321](https://github.com/electron/electron/pull/25321)
* `会话` API 更改： 
      * 为 `ses.loadExtension()` API添加了 `allowFileAccess` 选项。 [#27702](https://github.com/electron/electron/pull/27702)
    * 为 `session.setPermissionRequestHandler`添加 `display-capture` API。 [#27696](https://github.com/electron/electron/pull/27696)
    * 添加了一个 `disabledCipherSuites` 选项，以 `session.setSSLConfig`。 [#25818](https://github.com/electron/electron/pull/25818)
    * 加上 `extension-loaded`、 `extension-unloaded`和 `extension-ready` 活动， `session`。 [#25385](https://github.com/electron/electron/pull/25385)
    * 添加 `session.setSSLConfig()` ，允许配置 SSL。 [#25461](https://github.com/electron/electron/pull/25461)
    * Added support for explicitly specifying `direct`, `auto_detect` or `system` modes in `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Added [Serial API](https://web.dev/serial/) support. [#25237](https://github.com/electron/electron/pull/25237)
    * Added APIs to enable/disable spell checker. [#26276](https://github.com/electron/electron/pull/26276)
* `shell` API 更改： 
      * Added a new asynchronous `shell.trashItem()` API, replacing the synchronous `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `webcontent` API 更改： 
      * Added a small console hint to console to help debug renderer crashes. [#25317](https://github.com/electron/electron/pull/25317)
    * Added `frame` and `webContents` properties to the details object in webRequest handlers. [#27334](https://github.com/electron/electron/pull/27334)
    * 添加 `webContents.forcefullyCrashRenderer()` 强制终止渲染器过程，以帮助恢复悬挂渲染器。 [#25580](https://github.com/electron/electron/pull/25580)
    * Added `setWindowOpenHandler` API for renderer-created child windows, and deprecate `new-window` event. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API changes: 
      * Added spellcheck API to renderer. [#25060](https://github.com/electron/electron/pull/25060)



### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* 弃用 `remote` 模块。 它被 [`@electron/remote`](https://github.com/electron/remote)所取代。 [#25293](https://github.com/electron/electron/pull/25293)
* Removed deprecated `crashReporter` APIs. [#26709](https://github.com/electron/electron/pull/26709)
* Removed links to the Electron website from the default 'Help' menu in packaged apps. [#25831](https://github.com/electron/electron/pull/25831)



## End of Support for 9.x.y

Electron 9.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). 鼓励开发者和应用程序升级到 Electron 的较新版本。



## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 The [tentative 13.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 13.0 development life cycle. 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。
