# 打造你的第一个 Electron 应用

Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个专注于桌面应用的 Node. js 的变体，而不是 Web 服务器。

这不意味着 Electron 是某个图形用户界面（GUI）库的 JavaScript 版本。 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

**注意**: 获取该示例的代码仓库: [ 立即下载并运行 ](#trying-this-example)。

从开发的角度来看, Electron application 本质上是一个 Node. js  应用程序。 与 Node.js 模块相同，应用的入口是 `package.json` 文件。 一个最基本的 Electron 应用一般来说会有如下的目录结构：

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

为你的新Electron应用创建一个新的空文件夹。 打开你的命令行工具，然后从该文件夹运行`npm init`

```sh
npm init
```

npm 会帮助你创建一个基本的 `package.json` 文件。 其中的 `main` 字段所表示的脚本为应用的启动脚本，它将会在主进程中执行。 如下片段是一个 `package.json` 的示例：

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__注意__：如果 `main` 字段没有在 `package.json` 中出现，那么 Electron 将会尝试加载 `index.js` 文件（就像 Node.js 自身那样）。

默认情况下， `npm start` 将使用 Node.js 运行主脚本。 为了使用 Electron 运行 它，您可以添加 `开始` 脚本：

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## 安装 Electron

现在，您需要安装`electron`。 我们推荐的安装方法是把它作为您 app 中的开发依赖项，这使您可以在不同的 app 中使用不同的 Electron 版本。 在您的app所在文件夹中运行下面的命令：

```sh
npm install --save-dev electron
```

除此之外，也有其他安装 Electron 的途径。 请咨询[安装指南](installation.md)来了解如何用代理、镜像和自定义缓存。

## 开发一个简易的 Electron

Electron apps 使用JavaScript开发，其工作原理和方法与Node.js 开发相同。 `electron`模块包含了Electron提供的所有API和功能，引入方法和普通Node.js模块一样：

```javascript
const electron = require('electron')
```

`electron` 模块所提供的功能都是通过命名空间暴露出来的。 比如说： `electron.app`负责管理Electron 应用程序的生命周期， `electron.BrowserWindow`类负责创建窗口。 下面是一个简单的`main.js`文件，它将在应用程序准备就绪后打开一个窗口：

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

您应当在 `main.js` 中创建窗口，并处理程序中可能遇到的所有系统事件。 下面我们将完善上述例子，添加以下功能：打开开发者工具、处理窗口关闭事件、在macOS用户点击dock上图标时重建窗口，添加后，main. js 就像下面这样：

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
应用程序.whenReady().then(createWindow)

// 关闭所有窗口时退出，但macOS除外。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
```

最后，创建你想展示的 `index.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## 启动你的应用

在创建并初始化完成 `main.js`、 `index.html`和`package.json`之后，您就可以在当前工程的根目录执行 `npm start` 命令来启动刚刚编写好的Electron程序了。

## 尝试此例

复制并运行这个库 [`electron/electron-quick-start`][quick-start]。

**注意**：本例需要 [Git](https://git-scm.com) 和 [npm](https://www.npmjs.com/) 来运行。

```sh
# 克隆这仓库
$ git clone https://github.com/electron/electron-quick-start
# 进入仓库
$ cd electron-quick-start
# 安装依赖库
$ npm install
# 运行应用
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
