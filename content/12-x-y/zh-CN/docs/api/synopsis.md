# 简介

> 如何使用 Node.js 和 Electron APIs

Node. js 的所有 [ 内置模块 ](https://nodejs.org/api/) 都在Electron中可用， 第三方 node 模块中也完全支持 (包括 [ 原生模块 ](../tutorial/using-native-node-modules.md))。

Electron 还为开发原生桌面应用程序提供了一些额外的内置模块。 Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

基本规则是: 如果一个模块是 [ GUI ][gui] 或底层系统相关的, 那么它应该只在主进程中可用。 You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

主进程脚本就像一个普通的Node.js脚本：

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules if `nodeIntegration` is enabled:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

要运行你的app, 请阅读 [ Run your app ](../tutorial/quick-start.md#run-your-application)。

## 解构赋值

从0.37开始，可以使用 [destructuring assignment][destructuring-assignment] (es6解构赋值)来使内置模块更容易使用。

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

如果您需要整个 ` electron ` 模块, 则可以`require`它, 然后使用 destructuring 从 ` electron ` 访问各个模块。

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
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

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
