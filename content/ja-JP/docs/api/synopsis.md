# 概要

> Node.js と Electron API を使用する方法。

[Node.js の組み込みモジュール](https://nodejs.org/api/) のすべては、Electron およびサードパーティの Node モジュール ([ネイティブモジュール](../tutorial/using-native-node-modules.md) を含む) でも完全にサポートされています。

Electron はネイティブのデスクトップアプリケーションを開発するためのモジュールもいくつか追加しています。 一部のモジュールはメインプロセスでのみ使用でき、一部はレンダラープロセス (ウェブページ) でのみ使用でき、一部は両方のプロセスで使用できます。

基本的なルールはとしては、モジュールが [GUI](https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9) または低レベルのシステムに関わる場合、メインプロセスでのみ使用可能にする必要があります。 これらのモジュールを使用できるようにするには、[メインプロセスと レンダラプロセス](../tutorial/quick-start.md#main-process) のスクリプトの概念に精通している必要があります。

メインプロセスのスクリプトは、通常の Node.js スクリプトと同じです。

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

レンダラープロセスは、Node モジュールを使用する追加の機能を除いて、通常のウェブページと変わりません。

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

アプリを実行するには、[アプリを実行](../tutorial/quick-start.md#run-your-app) 参照してください。

## 分割代入

0.37から、[分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) を使用して組み込みモジュールを使いやすくすることができます。

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

`electron` モジュール全体が必要な場合は、それを require してから、`electron` から個々のモジュールにアクセスするために分割することができます。

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```