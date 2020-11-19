# 快速启动指南

## 快速入门

Electron 是一个框架，可以让您使用 JavaScript, HTML 和 CSS 创建桌面应用程序。 然后这些应用程序可以打包在macOS、Windows和Linux上直接运行，或者通过Mac App Store或微软商店分发。

通常，您使用每个操作系统特定的本地应用程序框架为操作系统 (OS)创建一个桌面应用程序。 Electron 可以在使用您已经知道的技术后写入您的应用程序。

### 前提条件

Before proceeding with Electron you need to install [Node.js][node-download]. 我们建议您安装最新的 `LTS` 或 `Current 版本` 可用。

> 请使用预构建的安装器为您的平台安装Node.js。 您可能会遇到与不同的开发工具不兼容的问题。

要检查Node.js安装是否正确，请在您的终端客户端输入以下命令：

```sh
node -v
npm -v
```

命令应相应打印Node.js和 npm 的版本。 如果两个命令都成功，您就可以安装 Electron了。

### 创建基本应用程序

从开发的角度来看，Electron应用基本上是一种Node.js应用。 这意味着您的 Electron 应用程序的起点将是一个 `package.json` 文件，就像在其他的Node.js 应用程序中一样。 最小的 Electron 应用程序具有以下结构：

```plain
my-electron-app/
├── package.json
├── main.js
└── index.html
```

让我们根据上面的结构创建一个基本的应用程序。

#### Install Electron

为您的项目创建一个文件夹并安装Electron：

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### 创建主脚本文件

主脚本指定了您将运行主进程的 Electron 应用程序的入口点(就我们而言， `main.js` 文件)。 通常，在主进程中运行的脚本控制应用程序的生命周期，并显示图形用户界面及其元素。 执行本机操作系统交互，并在网页中创建渲染程序。 Electron 应用程序只能有一个主流程。

主脚本可以如下所示：

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### 上面发生了什么情况？

1. 第1行：为了管理您应用程序的生命周期事件，以及创建和控制浏览器窗口，您从 `electron` 软件包导入了 `app` 和 `BrowserWindow`模块 。
2. 第 3 行：在此之后，您定义一个函数，该函数创建一个 [新的浏览窗口](../api/browser-window.md#new-browserwindowoptions) 启用了节点集成，将 `index.html` 文件加载到此窗口中（第 12 行，稍后我们将讨论该文件），并打开开发人员工具（第 13 行）。
3. 第 16 行：你通过调用 ` createWindow `方法，在 electron app 第一次[被初始化](../api/app.md#appwhenready)时创建了一个新的窗口。
4. 第 18 行：您添加了一个新的侦听器，当应用程序不再有任何打开窗口时试图退出。 因为操作系统 [窗口管理行为](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) ，此监听器在 macOS 上是一个禁门。
5. 第 24 行：您添加一个新的侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后，或重新启动已在运行的应用程序。

#### 创建网页

这是应用程序初始化后您想要显示的页面。 此网页代表渲染过程。 您可以创建多个浏览器窗口，每个窗口都使用自己的独立渲染器。 每个窗口都可以通过 `节点集成` 首选项完全访问Node.js API。

`index.html` 页面如下所示：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

#### 修改您的 package.json 文件

您的 Electron 应用程序使用 `package.json` 文件作为主要的切入点 (像任何其它的 Node.js 应用程序)。 您的应用程序的主脚本是 `main.js`, 所以相应修改 `package.json` 文件：

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> 注意：如果删除 `个主` 字段，Electron 将尝试加载一个 `索引。 s` 文件从目录中包含 `package.json`

默认情况下， `npm start` 命令将以 Node.js 运行主脚本。 要使用 Electron 运行脚本，您需要将其更改为这样：

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
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

您正在运行的 Electron 应用程序应该如下所示：

![简略的 Electron 应用程序](../images/simplest-electron-app.png)

### 打包并分发应用程序

分发您新创建的应用的最简单和最快方式是使用 [Electron Forge](https://www.electronforge.io)

1. 导入 Electron Forge 到您的应用文件夹：

    ```sh
    npx @electron-forge/cli import

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

    Electron-forge 创建 `out` 文件夹，您的软件包将在那里找到：

    ```plain
    // MacOS 示例
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## 学习基础知识

本节指导您了解 Electron 如何在内部工作的基本知识。 其目的是加强关于Electron和早些时候在Quickstart 部分创建的应用程序的知识。

### 应用程序结构

Electron由三个主要支柱组成：

* **Chromium** 用于显示网页内容。
* **Node.js** 用于本地文件系统和操作系统。
* **自定义 APIs** 用于使用经常需要的 OS 本机函数。

与 Electron 开发应用程序就像构建一个带有网页界面的Node.js 应用程序或构建无缝集成的网页。

#### 主进程和渲染器进程

如前所述，Electron有两种工艺：主要工艺和Rendererer。

* 主进程 **通过创建 `浏览器窗口` 实例来创建** 个网页。 每一个 `浏览窗口` 实例在其渲染过程中运行网页. 当一个 `BrowserWindow` 实例被摧毁时，对应的渲染过程也被终止。
* 主进程 **管理所有** 个网页及其对应的渲染过程。

----

* 渲染进程 **只能管理** 个相应的网页。 在一个渲染过程中崩溃不会影响其他渲染过程。
* 渲染进程 **通过IPC 与主进程通信** 在网页上执行GUI操作。 由于安全考虑和可能的资源泄漏，直接从渲染器过程中调用与本地GUI有关的API受到限制。

----

流程之间的通信可以通过进程间通信模块进行： [`ipcMain`](../api/ipc-main.md) 和 [`ipcRenderer`](../api/ipc-renderer.md)

#### APIs

##### Electron API

Electron API是根据流程类型分配的。 这意味着某些模块可以从主程序或渲染程序中使用，有些模块可以从两者中使用。 Electron 的 API 文档指明了每个模块可以使用的过程。

例如，要在两个进程中访问 Electron API，需要它包含的模块：

```js
const electron = require('electron')
```

若要创建一个窗口，请调用 `浏览窗口` 类，只能在主进程中使用：

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

若要从渲染器调用主流程，请使用 IPC 模块：

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

ipcRender.invotrake('exper-action', ...args)
```

> 注意：由于渲染过程可能会运行不受信任的代码(特别是第三方的代码)， 重要的是要认真验证主要进程中提出的请求。

##### Node.js API

> 注意：要从渲染过程中访问Node.js API，您需要设置 ` nodeIntegration ` 选项为 `true`。

Electron 在主流程和渲染流程中显示对 Node.js API及其模块的完全访问权限。 例如，您可以从根目录读取所有文件：

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

要使用Node.js模块，您首先需要安装它作为依赖：

```sh
npm install --save aws-sdk
```

然后，在您的 Electron 应用程序中，需要模块：

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
