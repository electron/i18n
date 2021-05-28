# 进程模型

Electron继承其来自Chromium的多进程架构，这使得框架在结构上与现代网络浏览器非常相似。 在本指南中，我们会阐述我们在最小的 [快速启动应用][] 中运用的 Electron 的概念知识。

## 为什么不是一个单一的进程？

网络浏览器是极其复杂的应用程序。 除了显示网页内容的主要能力之外，他们还有许多次要的责任，例如管理多个窗口 (或标签) 和加载第三方扩展。

在早期，浏览器通常使用单个进程来处理所有这些功能。 虽然这种模式意味着您打开的每个选项卡的开销更少，但这也意味着一个网站崩溃或无响应会影响整个浏览器。

## 多进程模型

为了解决这个问题，Chrome团队决定让每个标签在自己的进程中渲染， 从而限制网页上的有误或恶意代码可能会导致对整个应用造成的伤害。 然后单个浏览器进程控制这些进程，以及整个应用程序的生命周期。 This diagram below from the [Chrome Comic][] visualizes this model:

![Chrome's multi-process architecture](../images/chrome-processes.png)

Electron applications are structured very similarly. As an app developer, you control two types of processes: main and renderer. These are analogous to Chrome's own browser and renderer processes outlined above.

## 主要进程

Each Electron app has a single main process, which acts as the application's entry point. The main process runs in a Node.js environment, meaning it has the ability to `require` modules and use all of Node.js APIs.

### 窗口管理

The main process' primary purpose is to create and manage application windows with the [`BrowserWindow`][browser-window] module.

Each instance of the `BrowserWindow` class creates an application window that loads a web page in a separate renderer process. You can interact with this web content from the main process using the window's [`webContents`][web-contents] object.

```js title='main.js'
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> Note: A renderer process is also created for [web embeds][web-embed] such as the `BrowserView` module. The `webContents` object is also accessible for embedded web content.

Because the `BrowserWindow` module is an [`EventEmitter`][event-emitter], you can also add handlers for various user events (for example, minimizing or maximizing your window).

When a `BrowserWindow` instance is destroyed, its corresponding renderer process gets terminated as well.

### 应用程序生命周期

The main process also controls your application's lifecycle through Electron's [`app`][app] module. This module provides a large set of events and methods that you can use to add custom application behaviour (for instance, programatically quitting your application, modifying the application dock, or showing an About panel).

As a practical example, the app shown in the [quick start guide][quick-start-lifecycle] uses `app` APIs to create a more native application window experience.

```js title='main.js'
// quitting the app when no windows are open on macOS
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

## Preload scripts


<!-- Note: This guide doesn't take sandboxing into account, which might fundamentally 
change the statements here. --> Preload scripts contain code that executes in a renderer process before its web content begins loading. These scripts runs within the renderer context, but are granted more privileges by having access to Node.js APIs.

A preload script can be attached to the main process in the `BrowserWindow` constructor's `webPreferences` option.

```js title='main.js'
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  preload: 'path/to/preload.js'
})
//...
```

Because the preload script shares a global [`Window`][window-mdn] interface with the renderers and can access Node.js APIs, it serves to enhance your renderer by exposing arbitrary APIs in the `window` global that your web contents can then consume.

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

Context Isolation means that preload scripts are isolated from the renderer's main world to avoid leaking any privileged APIs into your web content's code.

Instead, use the [`contextBridge`][context-bridge] module to accomplish this securely:

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

This feature is incredibly useful for two main purposes:

* By exposing [`ipcRenderer`][ipcRenderer] helpers to the renderer, you can use inter-process communication (IPC) to trigger main process tasks from the renderer (and vice-versa).
* If you're developing an Electron wrapper for an existing web app hosted on a remote URL, you can add custom properties onto the renderer's `window` global that can be used for desktop-only logic on the web client's side.

[快速启动应用]: ./quick-start.md

[Chrome Comic]: https://www.google.com/googlebooks/chrome/

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
