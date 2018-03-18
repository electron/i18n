## クラス: Debugger

> Chromeのリモートデバッグプロトコルに対する選択肢。

プロセス: [Main](../glossary.md#main-process)

Chromeのデベロッパーツールは、ページと相互にやり取りをしたり、ページを最適化したりすることのできるJavaScriptランタイムに[特別なバインディング](https://developer.chrome.com/devtools/docs/debugger-protocol)を持っています。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### インスタンスメソッド

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (任意) - リクエストしたデバッグプロトコルのバージョン。

`webContents` にデバッガーをアタッチします。

#### `debugger.isAttached()`

戻り値 `Boolean` - `webContents` にデバッガーがアタッチされているかどうか。

#### `debugger.detach()`

`webContents` からデバッガーをデタッチします。

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - メソッド名。リモートデバッグプロトコルで定義されているメソッドの1つである必要があります。
* `commandParams` Object (任意) - リクエストパラメータのJSONオブジェクト。
* `callback` Function (任意) - レスポンス 
  * `error` Object - コマンドの実行に失敗したことを示すエラーメッセージ。
  * `result` Any - リモートデバッグプロトコルのコマンド説明の 'returns' 属性で定義されているレスポンス。

指定したコマンドをデバッグ対象に送信します。

### インスタンスイベント

#### イベント: 'detach'

* `event` Event
* `reason` String - Reason for detaching debugger.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### イベント: 'message'

* `event` Event
* `method` String - Method name.
* `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever debugging target issues instrumentation event.