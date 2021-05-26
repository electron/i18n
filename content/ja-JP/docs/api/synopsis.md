# 概要

> Node.js と Electron API を使用する方法。

[Node.js の組み込みモジュール](https://nodejs.org/api/) のすべては、Electron およびサードパーティの Node モジュール ([ネイティブモジュール](../tutorial/using-native-node-modules.md) を含む) でも完全にサポートされています。

Electron はネイティブのデスクトップアプリケーションを開発するためのモジュールもいくつか追加しています。 モジュールの中には、メインプロセスでしか利用できないものもあれば、レンダラープロセス (ウェブページ) でしか利用できないもの、どちらのプロセスタイプでも利用できるものもあります。

基本的なルールはとしては、モジュールが [GUI][gui] または低レベルのシステムに関わる場合、メインプロセスでのみ使用可能にする必要があります。 これらのモジュールを使いこなすには、メインプロセスとレンダラープロセスのスクリプトの概念に精通している必要があります。

メインプロセスのスクリプトは、通常の Node.js スクリプトとほぼ同じです。

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

レンダラープロセスは、`nodeIntegration` が有効になっている場合は以下のように Node のモジュールを使用できるという特別な機能を除いて、通常のウェブページと変わりません。

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

## 分割代入

0.37から、[分割代入][destructuring-assignment] を使用して組み込みモジュールを使いやすくすることができます。

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

[gui]: https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9
[destructuring-assignment]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
