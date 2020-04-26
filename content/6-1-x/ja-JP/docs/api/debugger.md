## クラス: Debugger

> Chromeのリモートデバッグプロトコルに対する選択肢の1つ。

プロセス: [Main](../glossary.md#main-process)

Chromeの開発者ツールは、ページと相互にやり取りをしたり、ページを調整したりすることのできるJavaScriptランタイムに[特別なバインディング](https://chromedevtools.github.io/devtools-protocol/)を持っています。

```javascript
const { BrowserWindow } = require('electron')
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

* `method` String - メソッド名。[リモートデバッグプロトコル](https://chromedevtools.github.io/devtools-protocol/)で定義されているいずれかのメソッドになります。
* `commandParams` Object (任意) - リクエストパラメータのJSONオブジェクト。
* `callback` Function (任意) - レスポンス
  * `error` Object - コマンドに失敗したことを示すエラーメッセージ。
  * `result` Any - リモートデバッグプロトコルのコマンド説明の 'returns' 属性で定義されているレスポンス。

指定したコマンドをデバッグ対象に送信します。

**[非推奨予定](modernization/promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - メソッド名。[リモートデバッグプロトコル](https://chromedevtools.github.io/devtools-protocol/)で定義されているいずれかのメソッドになります。
* `commandParams` Object (任意) - リクエストパラメータのJSONオブジェクト。

戻り値 `Promise<any>` - リモートデバッグプロトコル内のコマンドの説明の 'returns' 属性で定義されたレスポンスで解決されるか、またはコマンドの失敗を示すために拒否されるプロミス。

指定したコマンドをデバッグ対象に送信します。

### インスタンスイベント

#### イベント: 'detach'

* `event` Event
* `reason` String - デバッガーがデタッチする理由。

デバッグセッションが終了したときに発生します。 これは、`webContents` がクローズされるか、アタッチしていた `webContents` に対して開発者ツールが呼び出されるときに発生します。

#### イベント: 'message'

* `event` Event
* `method` String - メソッド名。
* `params` Object - リモートデバッグプロトコルの 'parameters' 属性で定義されたイベントパラメータ。

デバッグ対象で計測イベントが生じる毎に発生します。
