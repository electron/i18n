---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Electron团队很高兴地宣布，Electron 4的稳定版本已经可用！ 您可以从 [electronjs.org](https://electronjs.org/) 或通过 `npm 安装 electronic @later` 安装它。 这个版本包含了升级、修复和新功能，我们无法等待看到你用它们构建的东西。 阅读更多关于这次发布的详细信息，请分享您在探索时的任何反馈！

---

## 有什么新鲜事？

Electron的很大一部分功能由Chromium, Node.js和组成Electron的核心组件V8提供。 因此，Electron团队的一个关键目标是尽可能跟上这些项目的变化。 提供构建Electron应用程序的开发人员访问新的网页和JavaScript功能。 为此目的，Electron 4 为每个组件提供了主要的版本素材；Electron v4.0.0 包括Chromium `69。 .3497.106`, Node `10.11.0`, 和 V8 `6.9.427.24`。

此外，Electron 4还包括了对Electron特定API的修改。 您可以在下面的 Electron 4 中找到一个主要更改的摘要； 对于更改的完整列表, 请参阅 [Electron v4。 0 发行笔记](https://github.com/electron/electron/releases/tag/v4.0.0)。

### 正在禁用 `远程` 模块

出于安全原因，您现在可以禁用 `远程` 模块。 该模块可以在 `浏览器窗口`s 和 `网页视图` 标签中禁用：

```javascript
// BrowserWindow
new BrowserWindow(format@@
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview 标签
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

请参阅 [浏览窗口](https://electronjs.org/docs/api/browser-window) and [`<webview>` 标签](https://electronjs.org/docs/api/webview-tag) 文档以获取更多信息。

### 过滤 `remote.require()` / `remote.getGlobal()` 请求

如果您不想在渲染器进程中完全禁用 `远程` 模块或 `webview` ，这个功能是有用的，但想要通过 `远程对哪些模块进行额外控制。 等于`

当需要通过 `远程模块时。 在渲染过程中等于` 。 a `远程需要` 事件在 [`应用程序` 模块](https://electronjs.org/docs/api/app) 中提出。 您可以在事件上调用 `event.preventDefault()` (第一个参数) 来防止模块被加载。 [`WebContent` 实例](https://electronjs.org/docs/api/web-contents) 要求发生时的实例作为第二个参数传递， 模块名称作为第三个参数传递。 同一事件也在 `WebContent` 实例上发布。 但在这种情况下，唯一的参数是事件和模块名称。 在这两种情况下，您都可以通过设置 `事件的值返回值` 来返回一个自定义值。

```javascript
// 控制所有Web内容的 `remote.require`:
app.on('remote-require'函数(事件, webContents, requestedModuleName) format@@
  // ...
})

// Control `remote.require` from a specific WebContents instance:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

以类似的方式，在调用 `remote.getGlobal(name)` 时，一个 `远程get-global` 事件被提出。 这与 `远程需要` 事件相同：调用 `preventDefault()` 防止全球返回， 并设置 `事件。 回转值` 返回自定义值。

```javascript
// Control `remote.getGlobal` from all WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// 从一个特定的 WebContent 实例控制 `remote.getGlobal` ：
browserWin.webContents.on('remote-get-global'，函数(formatter, requestedGlobalName) format@@
  // ...
})
```

关于更多信息，见以下文件：

* [`需要`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`网页内容`](https://electronjs.org/docs/api/web-contents)

### JavaScript 对关于面板的访问

在 macOS 上，您现在可以调用 `应用。 howAboutPanel()` 程序性显示关于面板，就像单击通过 `{role: 'about'}` 创建的菜单项。 查看 [`显示面板` 文档了解更多信息](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos)

### 控制 `Webcontent` 背景色调值

`Web Content` 实例现在有一个 `setBackgroundThrotling(允许)` 启用或禁用页面背景下的计时器和动画节流管。

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

See [the `setBackgroundThrottling` documentation](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) for more information.

## 重大更改

### 没有更多 macOS 10.9 支持

Chromium 不再支持 macOS 10.9 (OS X Mavericks) ，因此 [Electron 4.0 及以上不支持](https://github.com/electron/electron/pull/15357)

### 单个实例锁定

之前, 要使您的应用成为单一实例应用程序(确保您的应用在任何特定时间只运行一个实例), 您可以使用 `应用。 akeSingleInstance()` 方法。 从 Electron 4.0开始，您必须使用 `app.requestSingleInstanceLock()` 此方法的返回值表示您的应用程序的这个实例是否成功获得了锁。 如果它无法获取锁，您可以假定您的应用程序的另一个实例已经在使用锁定并立即退出。

For an example of using `requestSingleInstanceLock()` and information on nuanced behavior on various platforms, [see the documentation for `app.requestSingleInstanceLock()` and related methods](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) and [the `second-instance` event](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

当构建窗口本机模块时，模块 `binding.gyp` 中的 `win_delay_load_hook` 变量必须为 true (这是默认值)。 如果此钩子不存在，那么本机模块将无法在Windows上加载 有一个错误消息，如 `找不到模块`。 [查看本机模块指南](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) 了解更多信息。

## 废弃的

Electron 5.0计划进行以下破坏性更改，因此已在 Electron 4.0中废弃。

### 节点.js 集成已禁用 `原生Windowopen`-ed Windows

从 Electron 5.0开始，使用 `原生窗口打开` 选项打开的子窗口将总是禁用 Node.js 集成。

### `web首选项` 默认值

当创建新的 `浏览器窗口` 带有 `web首选项` 设置的选项。 下面的 `网页首选项` 选项默认被废弃，代之以下面列出的新默认值：

<div class="table table-ruled table-full-width">

| Property | 废弃的默认 | 新的默认 |
|------------------------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` |
| `webviewTag` | `nodeIntegration` 的值 否则`true` | `false` |

</div>

请注意：目前有 [个已知bug (#9736)](https://github.com/electron/electron/issues/9736) 阻止 `webview` 标签工作如果 `上下文隔离` 处于开启状态。 关注GitHub 问题以获取最新信息！

Learn more about context isolation, Node integration, and the `webview` tag in [the Electron security document](https://electronjs.org/docs/tutorial/security).

Electron 4.0 仍将使用当前的默认值，但如果您不通过明确的值，您将会看到一个废弃的警告。 要准备您的 Electron 5.0应用，请为这些选项使用明确的值。 [查看 `BrowserWindow` 文档](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) 了解每个选项的详细信息。

### `webContents.findInPage(文本[，选项])`

`medialCapitalAsWordStart` and `wordStart` 选项已被废弃，因为它们已被上游删除。

## 应用反馈项目

我们在 Electron 3 开发期间启动了 [应用程序反馈程序](https://electronjs.org/blog/app-feedback-program) 。 成功了，因此我们也在开发4.0期间继续这样做。 我们想要向Atlassian, Discord, MS Teams, OpenFin, Slack, Symphony, WhatsApp, and other programme members for their involvement during the 4 测试周期。 要了解更多关于应用反馈方案的信息并参与未来测试， [请查看我们关于程序的博客文章](https://electronjs.org/blog/app-feedback-program)。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [查看我们的版本文档](https://electronjs.org/docs/tutorial/electron-versioning) 了解更多关于Electron版本控制的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
