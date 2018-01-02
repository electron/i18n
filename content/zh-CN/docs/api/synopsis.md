# 简介

> 如何使用 Node.js 和 Electron APIs

所有 [ Node. js 的内置模块 ](https://nodejs.org/api/) 都可用在 Electron 和第三方 node 模块中, 也完全支持 (包括 [ 原生模块 ](../tutorial/using-native-node-modules.md))。

Electron 还为开发原生桌面应用程序提供了一些额外的内置模块。 某些模块仅在主进程中可用, 有些仅在渲染进程 (web 页) 中可用, 而有些在这两个进程中都可以使用。

基本规则是: 如果一个模块是 [ GUI ](https://en.wikipedia.org/wiki/Graphical_user_interface) 或底层系统相关的, 那么它应该只在主进程中可用。 您需要熟悉 [主流程与渲染流程 renderer process](../tutorial/quick-start.md#main-process) scripts to be able to use those modules.

The main process script is just like a normal Node.js script:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules:

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

To run your app, read [Run your app](../tutorial/quick-start.md#run-your-app).

## Destructuring assignment

As of 0.37, you can use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make it easier to use built-in modules.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

This is equivalent to the following code:

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