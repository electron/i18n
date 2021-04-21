# 快速启动指南

## 快速入门

Electron 是一个能让你使用 JavaScript, HTML 和 CSS 来创建桌面应用程序的框架。 这些应用程序可以打包后在 macOS、Windows 和 Linux 上直接运行，或者通过 Mac App Store 或微软商店进行分发。

通常，你可以使用操作系统 (OS) 特定的本地应用程序框架来创建一个桌面应用程序。 Electron 可以使用你了解的技术来编写应用程序。

### 前提条件

在使用Electron进行开发之前，您需要安装 [Node.js][node-download]。 我们建议您安装最新可用的 `LTS` 或 `Current` 版本。

> 请使用为你平台预构建的 Node.js 安装器来进行安装， 否则，您可能会遇到与不同开发工具不兼容的问题。

要检查 Node.js 是否正确安装，请在您的终端输入以下命令：

```sh
node -v
npm -v
```

这两个命令应输出了 Node.js 和 npm 的版本信息。 如果这两个命令都执行成功，你就可以开始准备安装 Electron了。

### 创建基本应用程序

从开发的角度来看，Electron 应用本质上是一个 Node.js 应用。 这意味着您的 Electron 应用程序的起点将是一个 `package.json` 文件，就像在其他的Node.js 应用程序中一样。 基本的 Electron 应用程序具有以下结构：

```plaintext
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

让我们根据上面的结构创建一个基本的应用程序。

#### 安装 Electron

为您的项目创建一个文件夹并安装 Electron：

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### 创建主脚本文件

主脚本指定了运行主进程的 Electron 应用程序的入口(对我们而言，是 `main.js` 文件)。 通常，在主进程中运行的脚本控制应用程序的生命周期、显示图形用户界面及其元素、执行本机操作系统交互以及在网页中创建渲染进程。 Electron 应用程序只能有一个主进程。

主脚本可以如下所示：

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### 上面发生了什么？

1. 第 1 行：为了管理应用程序的生命周期事件以及创建和控制浏览器窗口，您从 `electron` 包导入了 `app` 和 `BrowserWindow` 模块 。
2. 第2行: 导入 `path` 包，该包为操作文件路径提供了实用的功能。
3. 第 4 行：在此之后，你定义一个方法用来创建一个带有预加载脚本的[新的浏览器窗口](../api/browser-window.md#new-browserwindowoptions)，并加载`index.html`文件进入该窗口 (第 13 行，我们将在后面探讨这个文件)。
4. 第 16 行：你通过调用 ` createWindow `方法，在 electron app 第一次[被初始化](../api/app.md#appwhenready)时创建了一个新的窗口。
5. 第 18 行：您添加一个新的侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后或重启运行中的应用程序。
6. 第 25 行：您添加了一个新的侦听器，当应用程序不再有任何打开窗口时试图退出。 由于操作系统的 [窗口管理行为](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) ，此监听器在 macOS 上是禁止操作的。

#### 创建网页

这是应用程序初始化后您想要显示的页面。 此网页代表渲染过程。 您可以创建多个浏览器窗口，每个窗口都使用自己的独立渲染进程。 你可以选择性地从您的预加载脚本中公开额外的 Node.js API 来授予对它们访问权限。

`index.html` 页面如下所示：

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### 定义一个预加载脚本

您的预加载脚本(在本例中是`preload.js` 文件)充当Node.js 和您的网页之间的桥梁。 它允许你将特定的 API 和行为暴露到你的网页上，而不是危险地把整个 Node.js 的 API暴露。 在本例中，我们将使用预加载脚本从`process`对象读取版本信息，并用该信息更新网页。

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

##### 上面发生了什么？

1. 第 1 行：首先定义了一个事件监听器，当web页面加载完成后通知你。
2. 第 2 行：接着您定义了一个功能函数用来为`index.html`中的所有placeholder设置文本。
3. 第 7 行：接下来您遍历了您想展示版本号的组件列表。
4. 第 8 行：最终，您调用 `replaceText` 来查找`index.html`中的版本占位符并将其文本值设置为`process.versions`的值。

#### 修改您的 package.json 文件

您的 Electron 应用程序使用 `package.json` 文件作为主入口(像任何其它的 Node.js 应用程序)。 您的应用程序的主脚本是 `main.js`，所以相应修改 `package.json` 文件：

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> 注意：如果未设置 `main` 字段，Electron 将尝试加载包含在 `package.json` 文件目录中的 `index.js` 文件。

> 注意：`author` 和 `description` 字段对于打包来说是必要的，否则运行 `npm run make` 命令时会报错。

默认情况下， `npm start` 命令将用 Node.js 来运行主脚本。 要使用 Electron 来运行脚本，您需要将其更改为这样：

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### 运行您的应用程序

```sh
npm start
```

您正在运行的 Electron app 应该如下所示：

![最简单的Electron应用程序](../images/simplest-electron-app.png)

### 打包并分发应用程序

分发你新创建的应用最简单和快捷的方法是使用 [Electron Forge](https://www.electronforge.io)。

1. 导入 Electron Forge 到您的应用文件夹：

    ```sh
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Thanks for using "electron-forge"!!!
    ```

1. 创建一个分发版本：

    ```sh
    npm run make

    > my-gsod-electron-app@1.0.0 make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    Electron-forge 会创建 `out` 文件夹，您的软件包将在那里找到：

    ```plain
    // MacOS 示例
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## 学习基础知识

本节指导您了解 Electron 内部如何工作的基本知识。 其目的是加强 Electron 和之前 Quickstart 部分创建的应用程序的知识。

### 应用程序结构

Electron 包含三个核心：

* **Chromium** 用于显示网页内容。
* **Node.js** 用于本地文件系统和操作系统。
* **自定义 APIs** 用于使用经常需要的 OS 本机函数。

用 Electron 开发应用程序就像构建一个带有网页界面的 Node.js 应用程序或构建无缝集成的网页。

#### 主进程和渲染器进程

如前所述，Electron 有两种进程：主进程（Main）和渲染进程（Renderer）。

* 主进程通过创建 **BrowserWindow** 实例来`创建` 网页。 每一个 `BrowserWindow` 实例在其渲染过程中运行网页， 当一个 `BrowserWindow` 实例被销毁时，对应的渲染过程也会被终止。
* 主进程 **管理** 所有网页及其对应的渲染进程。

----

* 渲染进程只能**管理**相应的网页， 一个渲染进程的崩溃不会影响其他渲染进程。
* 渲染进程通过 IPC 与主进程**通信**在网在页上执行 GUI 操作。 出于安全和可能的资源泄漏考虑，直接从渲染器进程中调用与本地 GUI 有关的 API 受到限制。

----

进程之间的通信可以通过 Inter-Process Communication(IPC) 模块进行：[`ipcMain`](../api/ipc-main.md) 和 [`ipcRenderer`](../api/ipc-renderer.md)

#### APIs

##### Electron API

Electron API 是根据进程类型分配的。这意味着某些模块可以在主进程或渲染进程中使用，有些模块两者中皆可使用。 Electron 的 API 文档注明了各个模块可以分别用在哪个进程中。

例如，需要同时在两个进程中访问 Electron API，require 包含的模块：

```js
const electron = require('electron')
```

若要创建一个窗口，请调用 `BrowserWindow` 类，但只能在主进程中使用：

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

若要从渲染进程呼叫主进程，请使用 IPC 模块：

```js
// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
```

```js
// 在渲染过程中
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> 注意：由于渲染进程可能会运行不受信任的代码(特别是第三方的代码)， 重要的是要认真验证主要进程中提出的请求。

##### Node.js API

> 注意：从渲染进程访问 Node.js API，您需要设置 `nodeIntegration` 的值为 `true` 同时 `contextIsolation` 的值为 `false`。  请注意，出于[安全因素](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content)，不建议任何渲染器访问Node.js API加载远程内容。

Electron 在主进程和渲染进程中都暴露了对 Node.js API 及其模块的完全访问权限。 例如，您可以从根目录读取所有文件：

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

要使用 Node.js 模块，您首先需要安装它作为依赖：

```sh
npm install --save aws-sdk
```

然后，在您的 Electron 应用程序中，加载该模块：

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
