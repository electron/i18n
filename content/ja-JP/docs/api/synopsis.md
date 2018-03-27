# 概要

> Node.js と Electron API を使用する方法。

[Node.js の組み込みモジュール](https://nodejs.org/api/) のすべては、Electron およびサードパーティの Node モジュール ([ネイティブモジュール](../tutorial/using-native-node-modules.md) を含む) でも完全にサポートされています。

Electron はネイティブのデスクトップアプリケーションを開発するためのモジュールもいくつか追加しています。 一部のモジュールはメインプロセスでのみ使用でき、一部はレンダラープロセス (ウェブページ) でのみ使用でき、一部は両方のプロセスで使用できます。

基本的なルールはとしては、モジュールが [GUI](https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9) または低レベルのシステムに関わる場合、メインプロセスでのみ使用可能にする必要があります。 これらのモジュールを使用できるようにするには、[メインプロセスと renderer process](../tutorial/quick-start.md#main-process) scripts to be able to use those modules.

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