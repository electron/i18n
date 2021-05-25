# オンライン/オフライン イベントの検出

## 概要

標準 HTML5 API の一部である [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性を使用して、[オンラインおよびオフラインイベント](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) の検出をレンダラープロセスに実装できます。

`navigator.onLine` 属性の戻り値は以下の通りです。

* `false` ネットワーク要求が失敗することが保証されている場合、つまり確実にオフラインの (ネットワークから切断されている) 場合。
* `true` それ以外の状況。

他のすべての条件で `true`が返されるので、`true` の値は必ずしも Electron がインターネットアクセス可能であるとは限りません。誤検出に注意する必要があります。 例えば、仮想イーサネットアダプタを "常時接続" 状態にした仮想化ソフトをコンピュータ上で実行している場合などです。 したがって、Electron のインターネットアクセス状況を判定したい場合には、さらにこの確認手段を開発する必要があります。

## サンプル

このサンプルでは、HTML ファイル `index.html` から始めて、`navigator.onLine` API を用いた接続状態インジケータの構築方法を示します。

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Connection status: <strong id='status'></strong></h1>
    <script src="renderer.js"></script>
</body>
</html>
```

DOM を変更するために、`renderer.js`ファイルを作成して、そこで `window` の `'online'` と `'offline'` の イベントにイベントリスナーを追加します。 イベントハンドラーでは、`navigator.onLine` の結果に応じて `<strong id='status'>` 要素の内容を設定します。

```js title='renderer.js'
function updateOnlineStatus () {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

最後に、メインプロセス用の `main.js` ファイルを作成し、そこでウインドウを作成します。

```js title='main.js'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const onlineStatusWindow = new BrowserWindow({
    width: 400,
    height: 100
  })

  onlineStatusWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

Electron アプリケーションを起動すると、通知が表示されます。

![接続状態](../images/connection-status.png)

> 注意: メインプロセスに接続状態を伝える必要がある場合は、[IPC レンダラー](../api/ipc-renderer.md) API を使用してください。
