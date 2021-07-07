---
title: Electron 13.0.0
author:
  - 索菲亚格文
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 已发布！ 它包括了到 Chromium `91` 和 V8 `9.1` 的更新。 我们添加了多个 API 更新、错误修复和一般改进。 请阅读下文了解更多详情！

---

Electron 团队很高兴发布了 Electron 13.0.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改

* Chromium `91`
    * [New in Chrome 91](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [New in Chrome 90](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 blog post](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 blog post](https://v8.dev/blog/v8-release-90)

### 高亮功能

* Added `process.contextIsolated` property that indicates whether the current renderer context has `contextIsolation` enabled. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
* Added `process.contextId` used by `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

See the [13.0.0 release notes](https://github.com/electron/electron/releases/tag/v13.0.0) for a full list of new features and changes.

## 重大更改

* `window.open()` parameter frameName is no longer set as window title. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改

* Added `roundedCorners` option for `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Added new `session.storagePath` API to get the path on disk for session-specific data.[28866](https://github.com/electron/electron/pull/28866)
* Added support for passing DOM elements over the context bridge. [#26776](https://github.com/electron/electron/pull/26776)
* Added `process.uptime()` to sandboxed renderers. [#26684](https://github.com/electron/electron/pull/26684)
* Added missing fields to the parameters emitted as part of the `context-menu`event.[#26788](https://github.com/electron/electron/pull/26788)
* Added support for registering Manifest V3 extension service workers.
* Added ‘registration-completed’ event to ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
* Removed deprecated `shell.moveItemToTrash()`. [#26723](https://github.com/electron/electron/pull/26723)
* Removed the following deprecated `BrowserWindow` extension APIs:

    * `BrowserWindow.addExtension(path)`
    * `BrowserWindow.addDevToolsExtension(path)`
    * `BrowserWindow.removeExtension(name)`
    * `BrowserWindow.removeDevToolsExtension(name)`
    * `BrowserWindow.getExtensions()`
    * `BrowserWindow.getDevToolsExtensions()`

    Use the `session` APIs instead:

    * `ses.loadExtension(path)`
    * `ses.removeExtension(extension_id)`
    * `ses.getAllExtensions()`

* The following `systemPreferences` methods have been deprecated:

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    Use the following `nativeTheme` properties instead:

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## End of Support for 10.x.y

Electron 10.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定 14.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines) 展示了 Electron 14.0 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。
