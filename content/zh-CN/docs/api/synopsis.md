# 简介

> 如何使用 Node.js 和 Electron APIs

所有 [ Node. js 的内置模块 ](https://nodejs.org/api/) 都可用在 Electron 和第三方 node 模块中, 也完全支持 (包括 [ 原生模块 ](../tutorial/using-native-node-modules.md))。

Electron 还为开发原生桌面应用程序提供了一些额外的内置模块。 某些模块仅在主进程中可用, 有些仅在渲染进程 (web 页) 中可用, 而有些在这两个进程中都可以使用。

基本规则是: 如果一个模块是 [ GUI ](https://en.wikipedia.org/wiki/Graphical_user_interface) 或底层系统相关的, 那么它应该只在主进程中可用。 You need to be familiar with the concept of [main process vs. ](../tutorial/application-architecture.md#main-and-renderer-processes)脚本的概念，才能使用这些模块。

The main process script is like a normal Node.js script:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

渲染进程除了额外能够使用node模块的能力外，与普通网页没有什么区别

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const {app} = require('electron').remote
  console.log(app.getVersion())
</script>
</body>
</html>
```

要运行你的app, 请阅读 [ Run your app ](../tutorial/first-app.md#running-your-app)。

## 解构赋值

从0.37开始，可以使用 [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) (es6解构赋值)来使内置模块更容易使用。

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

如果您需要整个 ` electron ` 模块, 则可以`require`它, 然后使用 destructuring 从 ` electron ` 访问各个模块。

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

这等效于以下代码:

```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```