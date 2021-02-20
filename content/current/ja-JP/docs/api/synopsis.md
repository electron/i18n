# 概要

> Node.js と Electron API を使用する方法。

[Node.js の組み込みモジュール](https://nodejs.org/api/) のすべては、Electron およびサードパーティの Node モジュール ([ネイティブモジュール](../tutorial/using-native-node-modules.md) を含む) でも完全にサポートされています。

Electron はネイティブのデスクトップアプリケーションを開発するためのモジュールもいくつか追加しています。 Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

基本的なルールはとしては、モジュールが [GUI](https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9) または低レベルのシステムに関わる場合、メインプロセスでのみ使用可能にする必要があります。 これらのモジュールを使用できるようにするには、[メインプロセスと レンダラプロセス](../tutorial/application-architecture.md#main-and-renderer-processes) のスクリプトの概念に精通している必要があります。

メインプロセスのスクリプトは、通常の Node.js スクリプトとほぼ同じです。

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

アプリを実行するには、[アプリを実行](../tutorial/first-app.md#running-your-app) 参照してください。

## 分割代入

0.37から、[分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) を使用して組み込みモジュールを使いやすくすることができます。

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

`electron` モジュール全体が必要な場合は、それを require してから、`electron` から個々のモジュールにアクセスするために分割することができます。

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

これは以下のコードと同等です。

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
