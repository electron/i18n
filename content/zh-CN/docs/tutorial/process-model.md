# 进程模型

Electron继承其来自Chromium的多进程架构，这使得框架在结构上与现代网络浏览器非常相似。 在本指南中，我们会阐述我们在最小的 [快速启动应用][] 中运用的 Electron 的概念知识。

## 为什么不是一个单一的进程？

网络浏览器是极其复杂的应用程序。 除了显示网页内容的主要能力之外，他们还有许多次要的责任，例如管理多个窗口 (或标签) 和加载第三方扩展。

在早期，浏览器通常使用单个进程来处理所有这些功能。 虽然这种模式意味着您打开的每个选项卡的开销更少，但这也意味着一个网站崩溃或无响应会影响整个浏览器。

## 多进程模型

为了解决这个问题，Chrome团队决定让每个标签在自己的进程中渲染， 从而限制网页上的有误或恶意代码可能会导致对整个应用造成的伤害。 然后单个浏览器进程控制这些进程，以及整个应用程序的生命周期。 下面是来自 [Chrome 漫画][]的图表可视化此模型：

![Chrome的多进程架构](../images/chrome-processes.png)

Electron 应用程序的结构非常相似。 作为应用开发者，您控制着两种类型的进程：主进程和渲染器。 这些类似于上面概述的Chrome自己的浏览器和其渲染器进程。

## 主要进程

每个Electron应用都有一个单一的主流程，作为应用程序的入口点。 主过程在Node.js环境中运行，这意味着它具有 `require` （请求）模块和使用所有 Node.js API 的能力。

### 窗口管理

主进程的主要目的是使用 [`BrowserWindow`][browser-window] 模块创建和管理应用程序窗口。

`BrowserWindow` 类的每个实例创建一个应用程序窗口，其在单独的渲染器进程中加载网页。 您可以使用窗口的 [`webContent`][web-contents] 对象，从主进程中与这个网页内容 交互。

```js title='main.js'
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> 注意：渲染器进程还为 [web embeds][web-embed] 而被创建，例如 `BrowserView` 模块。 嵌入式网页内容也可访问 `webContents` 对象。

由于 `BrowserWindow` 模块是一个 [`EventEmitter`][event-emitter]，您还可以 为各种用户事件（例如，最小化或最大化窗口）添加处理程序。

当一个 `BrowserWindow` 实例被销毁时，对应的渲染器进程也会被终止。

### 应用程序生命周期

主进程还通过 Electron 的 [`app`][app] 模块来控制您的应用程序的生命周期。 该模块提供了一系列的事件和函数，您可以使用它来添加或修饰应用程序窗口的行为（例如退出进程，窗口贴边或最小化以及展示“关于”菜单）

作为一个实际例子。 在 [快速入门指南][quick-start-lifecycle]中显示的应用程序使用 `app` API 来创建更原生的应用程序窗口体验。

```js title='main.js'
// macOS 无窗口打开时退出应用
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

### 原生 API

To extend Electron's features beyond being a Chromium wrapper for web contents, the main process also adds custom APIs to interact with the user's operating system. Electron exposes various modules that control native desktop functionality, such as menus, dialogs, and tray icons.

For a full list of Electron's main process modules, check out our API documentation.

## 渲染器进程

Each Electron app spawns a separate renderer process for each open `BrowserWindow` (and each web embed). As its name implies, a renderer is responsible for *rendering* web content. For all intents and purposes, code ran in renderer processes should behave according to web standards (insofar as Chromium does, at least).

Therefore, all user interfaces and app functionality within a single browser window should be written with the same tools and paradigms that you use on the web.

Although explaining every web spec is out of scope for this guide, the bare minimum to understand is:

* An HTML file is your entry point for the renderer process.
* UI styling is added through Cascading Style Sheets (CSS).
* Executable JavaScript code can be added through `<script>` elements.

Moreover, this also means that the renderer has no direct access to `require` or other Node.js APIs. In order to directly include NPM modules in the renderer, you must use the same bundler toolchains (for example, `webpack` or `parcel`) that you use on the web.

> Note: Renderer processes can be spawned with a full Node.js environment for ease of development. Historically, this used to be the default, but this feature was disabled for security reasons.

At this point, you might be wondering how your renderer process user interfaces can interact with Node.js and Electron's native desktop functionality if these features are only accessible from the main process. In fact, there is no direct way to import Electron's content scripts.

## 预加载脚本


<!-- Note: This guide doesn't take sandboxing into account, which might fundamentally 
change the statements here. --> 预加载脚本包含在网络内容开始加载之前在渲染器进程中执行的代码。 这些脚本在渲染器上下文中运行，但拥有更多权限，因为它们能够访问Node.js API。

预加载脚本可以在 `BrowserWindow` 构造方法中的 ` webPreferences ` 选项里被附加到主进程。

```js title='main.js'
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  preload: 'path/to/preload.js'
})
//...
```

由于预加载脚本与渲染器共享同一个全局 [`Window`][window-mdn] 接口，并且可以访问 Node.js API，因此它通过在 `window` 全局中暴露任意您的网络内容可以随后使用的 API 来增强渲染器。

Although preload scripts share a `window` global with the renderer they're attached to, you cannot directly attach any variables from the preload script to `window` because of the [`contextIsolation`][context-isolation] default.

```js title='preload.js'
window.myAPI = {
  desktop: true
}
```

```js title='renderer.js'
console.log(window.myAPI)
// => undefined
```

上下文隔离意味着预加载脚本与渲染器的主世界隔离，以避免将任何特权的 API 泄漏到您的网页内容代码中。

相反，使用 [`contextBridge`][context-bridge] 模块以安全地实现：

```js title='preload.js'
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
```

```js title='renderer.js'
console.log(window.myAPI)
// => { desktop: true }
```

此功能对于两个主要目的非常有用：

* 通过将 [`ipcRenderer`][ipcRenderer] 帮手模块暴露在渲染器中，您可以使用 过程间通信 （IPC） 从渲染器触发主进程任务（反之亦然）。
* 如果您正在为远程 URL 上托管的现有网页应用开发 Electron 包装，则可以在渲染器的 `window` 全局上添加自定义属性，以用于网页客户端侧的桌面逻辑。

[快速启动应用]: ./quick-start.md

[Chrome 漫画]: https://www.google.com/googlebooks/chrome/

[browser-window]: ../api/browser-window.md
[web-embed]: ./web-embeds.md
[web-contents]: ../api/web-contents.md
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[app]: ../api/app.md
[quick-start-lifecycle]: ./quick-start.md#manage-your-windows-lifecycle

[window-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[context-isolation]: ./context-isolation.md
[context-bridge]: ../api/context-bridge.md
[ipcRenderer]: ../api/ipc-renderer.md
