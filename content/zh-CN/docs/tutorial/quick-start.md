# 快速入门

Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个专注于桌面应用的 Node. js 的变体，而不是 Web 服务器。

这不意味着 Electron 是绑定了 (GUI) 库的 JavaScript。 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

### 主进程

Electron 运行 `package.json` 的 `main` 脚本的进程被称为**主进程**。 运行在主进程中的脚本将以创建 web 页面的方式显示一个 GUI。

### 渲染进程

由于 Electron 使用 Chromium 来显示 web 页面，所以 Chromium 的多进程架构也是可用的。 每个 Electron 中的 web 页面运行在它的叫**渲染进程**的进程中。

在通常的浏览器内，网页通常运行在一个沙盒的环境挡住并且不能够使用原生的资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些低级别的交互。

### 主进程和渲染进程之间的区别

主进程使用 `BrowserWindow` 实例创建页面。 每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。 当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的页面。

由于在页面里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在页面调用 GUI 相关的 APIs 是不被允许的。 如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

在 Electron，我们提供几种方法用于主进程和渲染进程之间的通讯。 像 [`ipcRenderer`](../api/ipc-renderer.md) 和 [`ipcMain`](../api/ipc-main.md) 模块用于发送消息， [remote](../api/remote.md) 模块用于 RPC 方式通讯。 这些内容都可以在一个 FAQ 中查看 [如何在两个页面之间共享数据](../faq.md#how-to-share-data-between-web-pages)。

## 打造你第一个 Electron 应用

通常来说，一个 Electron 应用的结构是这样的:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json` 的格式和 Node 的完全一致，并且那个被 `main` 字段声明的脚本文件是你的应用的启动脚本，它运行在主进程上。 你应用里的 `package.json` 看起来应该像：

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**注意**：如果 `main` 字段没有在 `package.json` 声明，Electron会优先加载 `index.js`。

`main.js` 应该用于创建窗口和处理系统事件，一个典型的例子如下：

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({width: 800, height: 600})

  // 然后加载应用的 index.html。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 打开开发者工具。
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
```

最后，你想展示的 `index.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## 运行你的应用

一旦你创建了最初的 `main.js`， `index.html` 和 `package.json` 这几个文件，你可能会想尝试在本地运行并测试，看看是不是和期望的那样正常运行。

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) 是一个 `npm` 模块，包含所使用的 Electron 预编译版本。

如果你已经用 `npm` 全局安装了它，你只需要按照如下方式直接运行你的应用：

```bash
electron .
```

如果你是局部安装，那运行：

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### 手工下载二进制格式的 Electron

如果你手工下载了 Electron 的二进制文件，你也可以直接使用其中的二进制文件直接运行你的应用。

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

    $ .\electron\electron.exe your-app\
    

`Electron.app` 里面是 Electron 发布包，你可以在[这里](https://github.com/electron/electron/releases)下载到。

### 作为分发版本运行

在你完成了你的应用后，你可以按照 [应用部署](./application-distribution.md) 指导发布一个版本，并且以已经打包好的形式运行应用。

### 尝试这个示例

复制并且运行这个库 [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start)。

**注意**：运行时需要你的系统已经安装了 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/)(包含 [npm](https://npmjs.org))。

```bash
# 克隆这仓库
$ git clone https://github.com/electron/electron-quick-start
# 进入仓库
$ cd electron-quick-start
# 安装依赖库
$ npm install
# 运行应用
$ npm start
```

更多 apps 例子，查看 electron 社区创建的[list of boilerplates](https://electron.atom.io/community/#boilerplates).