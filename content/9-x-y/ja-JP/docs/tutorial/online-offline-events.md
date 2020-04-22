# オンライン/オフライン イベントの検出

標準 HTML5 API の一部である [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性を使用して、[オンラインおよびオフラインイベント](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) の検出をレンダラープロセスに実装できます。 ネットワーク要求が失敗することが保証されている場合、つまり確実にオフライン (ネットワークから切断されている場合) の場合、`navigator.onLine` 属性は `false` を返します。 それ以外の状況では `true` を返します。 他のすべての条件では `true`が返されるので、`true` の値は必ずしも Electron がインターネットにアクセスできることを意味するとは限らないので、誤検出をすることに注意する必要があります。 コンピュータが常に「接続」されている、仮想イーサネットアダプタを持つ仮想化ソフトウェアを実行している場合などで誤検知します。 したがって、実際の Electron のインターネットアクセス状況を確認したいのなら、チェックのための追加の手段を開発するべきです。

サンプル:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

メインプロセスでこれらのイベントに応答したい場合もあります。 ただし、メインプロセスには `navigator` オブジェクトがないため、これらのイベントを直接検出することはできません。 以下の例に示すように、Electron のプロセス間通信ユーティリティを使用して、イベントをメインプロセスに転送し、必要に応じて処理することができます。

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline',  updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
