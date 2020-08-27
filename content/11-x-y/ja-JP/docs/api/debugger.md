## クラス: Debugger

> Chromeのリモートデバッグプロトコルに対する選択肢の1つ。

プロセス: [Main](../glossary.md#main-process)

Chromeの開発者ツールは、ページと相互にやり取りをしたり、ページを調整したりすることのできるJavaScriptランタイムに[特別なバインディング][rdp]を持っています。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

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

### インスタンスイベント

#### イベント: 'detach'

戻り値:

* `event` Event
* `reason` String - デバッガーがデタッチする理由。

デバッグセッションが終了したときに発生します。 これは、`webContents` がクローズされるか、アタッチしていた `webContents` に対して開発者ツールが呼び出されるときに発生します。

#### イベント: 'message'

戻り値:

* `event` Event
* `method` String - メソッド名。
* `params` any - リモートデバッグプロトコルの 'parameters' 属性で定義されたイベントパラメータ。
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

デバッグ対象で計測イベントが生じる毎に発生します。

### インスタンスメソッド

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (任意) - リクエストしたデバッグプロトコルのバージョン。

`webContents` にデバッガーをアタッチします。

#### `debugger.isAttached()`

戻り値 `Boolean` - `webContents` にデバッガーがアタッチされているかどうか。

#### `debugger.detach()`

`webContents` からデバッガーをデタッチします。

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - メソッド名。[リモートデバッグプロトコル][rdp] で定義されているメソッドのいずれかである必要があります。
* `commandParams` any (任意) - リクエストパラメータの JSON オブジェクト。
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

戻り値 `Promise<any>` - リモートデバッグプロトコル内のコマンドの説明の 'returns' 属性で定義されたレスポンスで解決されるか、またはコマンドの失敗を示すために拒否されるプロミス。

指定したコマンドをデバッグ対象に送信します。

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
