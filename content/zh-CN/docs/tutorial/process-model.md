# 流程模型

Electron 继承了来自 Chromium 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器。 在本指南中，我们将会阐述那些我们运用于 最小的 [快速启动应用][] 中的关于 Electron 的概念性知识。

## 为什么不是一个单一的进程？

网页浏览器是个极其复杂的应用程序。 除了显示网页内容的主要能力之外，他们还有许多次要的职责，例如：管理众多窗口 ( 或 标签页 ) 和加载第三方扩展。

在早期，浏览器通常使用单个进程来处理所有这些功能。 虽然这种模式意味着您打开每个标签页的开销较少，但也同时意味着一个网站的崩溃或无响应会影响到整个浏览器。

## 多进程模型

为了解决这个问题，Chrome 团队决定让每个标签页在自己的进程中渲染， 从而限制了一个网页上的有误或恶意代码可能导致的对整个应用程序造成的伤害。 然后用单个浏览器进程控制这些標籤頁进程，以及整个应用程序的生命周期。 下方来自 [Chrome 漫画][] 的图表可视化了此模型：

![Chrome的多进程架构](../images/chrome-processes.png)

Electron 应用程序的结构非常相似。 作为应用开发者，您控制着两种类型的进程：主进程和渲染器。 这些类似于上面概述的 Chrome 自己的浏览器和其渲染器进程。

## 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有 `require` 模块和使用所有 Node.js API 的能力。

### 窗口管理

主进程的主要目的是使用 [`BrowserWindow`][browser-window] 模块创建和管理应用程序窗口。

`BrowserWindow` 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。 您可从主进程用 window 的 [`webContent`][web-contents] 对象与网页内容进行交互。

```js title='main.js'
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> 注意：渲染器进程也是为 [web embeds][web-embed] 而被创建的，例如 `BrowserView` 模块。 嵌入式网页内容也可访问 `webContents` 对象。

由于 `BrowserWindow` 模块是一个 [`EventEmitter`][event-emitter]， 所以您也可以为各种用户事件 ( 例如，最小化 或 最大化您的窗口 ) 添加处理程序。

当一个 `BrowserWindow` 实例被销毁时，与其相应的渲染器进程也会被终止。

### 应用程序生命周期

主进程还能通过 Electron 的 [`app`][app] 模块来控制您应用程序的生命周期。 该模块提供了一整套的事件和方法，可以使你添加自定义的应用程序行为 ( 例如：以编程方式退出您的应用程序、修改程序坞或显示关于面板 ) 。

这是一个实际的例子，这个app来源于[快速入门指南][quick-start-lifecycle]，用 `app` API 创建了一个更原生的应用程序窗口体验。

```js title='main.js'
// 当 macOS 无窗口打开时退出应用
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

### 原生 API

为了使 Electron 的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的 API 来与用户的作业系统进行交互。 Electron 有着多种控制原生桌面功能的模块，例如菜单、对话框以及托盘图标。

关于 Electron 主进程模块的完整列表，请参阅我们的 API 文档。

## 渲染器进程

每个 Electron 应用都会为每个打开的 `BrowserWindow` ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。 洽如其名，渲染器负责 *渲染* 网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 (至少就目前使用的 Chromium 而言是如此) 。

因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与您在网页开发上使用相同的工具和规范来进行攥写。

虽然解释每一个网页规范超出了本指南的范围，但您最起码要知道的是：

* 以一个 HTML 文件作为渲染器进程的入口点。
* 使用层叠样式表 (Cascading Style Sheets, CSS) 对 UI 添加样式。
* 通过 `<script>` 元素可添加可执行的 JavaScript 代码。

此外，这也意味着渲染器无权直接访问 `require` 或其他 Node.js API。 为了在渲染器中直接包含 NPM 模块，您必须使用与在 web 开发時相同的打包工具 (例如 `webpack` 或 `parcel`)

> 注意：渲染器进程可以生成一个完整的 Node.js 环境以便于开发。 在过去这是默认的，但如今此功能考虑到安全问题已经被禁用。

此刻，您也许会好奇，您在渲染器进程中的用户介面该如何与 Node.js 和 Electron 的原生桌面功能进行交互，如果这些功能都仅适用于主进程的话。 而事实上，确实没有直接导入 Electron 內容脚本的方法。

## 预加载脚本


<!-- Note: This guide doesn't take sandboxing into account, which might fundamentally 
change the statements here. --> 预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码 。 These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

```js title='main.js'
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  preload: 'path/to/preload.js'
})
//...
```

由于预加载脚本与渲染器共享同一个全局 [`Window`][window-mdn] 接口，并且可以访问 Node.js API，因此它通过在 `window` 全局中暴露任意您的网络内容可以随后使用的 API 来增强渲染器。

虽然预加载脚本与其所附加的渲染器在全局共享着一个 `window` 变数，但您并不能从中直接附加任何变数到 `window` 之中，因为 [`contextIsolation`][context-isolation] 是默认的。

```js title='preload.js'
window.myAPI = {
  desktop: true
}
```

```js title='renderer.js'
console.log(window.myAPI)
// => undefined
```

语境隔离（Context Isolation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中。

取而代之，我们將使用 [`contextBridge`][context-bridge] 模块来安全地实现交互：

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

此功能对两个主要目的來說非常有用：

* 通过暴露 [`ipcRenderer`][ipcRenderer] 帮手模块于渲染器中，您可以使用 进程间通讯 ( inter-process communication, IPC ) 来从渲染器触发主进程任务 ( 反之亦然 ) 。
* 如果您正在为远程 URL 上托管的现有 web 应用开发 Electron 封裝，则您可在渲染器的 `window` 全局变量上添加自定义的属性，好在 web 客户端用上仅适用于桌面应用的设计逻辑 。

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
