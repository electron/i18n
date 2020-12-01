# オンライン/オフライン イベントの検出

## 概要

標準 HTML5 API の一部である [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性を使用して、[オンラインおよびオフラインイベント](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) の検出をレンダラープロセスに実装できます。

`navigator.onLine` 属性の戻り値は以下の通りです。

* `false` ネットワーク要求が失敗することが保証されている場合、つまり確実にオフラインの (ネットワークから切断されている) 場合。
* `true` それ以外の状況。

他のすべての条件で `true`が返されるので、`true` の値は必ずしも Electron がインターネットアクセス可能であるとは限りません。誤検出に注意する必要があります。 例えば、仮想イーサネットアダプタを "常時接続" 状態にした仮想化ソフトをコンピュータ上で実行している場合などです。 したがって、Electron のインターネットアクセス状況を判定したい場合には、さらにこの確認手段を開発する必要があります。

## サンプル

### レンダラープロセスでのイベント検知

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)
})
```

in the `index.html` file, add the following line before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

`renderer.js` ファイルを追加します。

```javascript fiddle='docs/fiddles/features/online-detection/renderer'
const alertOnlineStatus = () => { window.alert(navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()
```

Electron アプリケーションを起動すると、通知が表示されます。

![オンライン/オフラインイベントの検知](../images/online-event-detection.png)

### メインプロセスでのイベント検知

メインプロセスでも同様にオンライン/オフラインイベントに対応したい場面があるかもしれません。 ただし、メインプロセスには `navigator` オブジェクトがないため、これらのイベントを直接検出できません。 この場合、Electron のプロセス間通信 (IPC) ユーティリティを使用して、イベントをメインプロセスに転送する必要があります。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

in the `index.html` file, add the following line before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

`renderer.js` ファイルを追加します。

```javascript fiddle='docs/fiddles/features/online-detection/main'
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => { ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Electron アプリケーションを起動すると、コンソールに通知が表示されます。

```sh
npm start

> electron@1.0.0 start /electron
> electron .

online
```
