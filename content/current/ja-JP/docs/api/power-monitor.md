# powerMonitor

> 電源の状態の変化をモニターします。

プロセス: [Main](../glossary.md#main-process)


`app` モジュールの `ready` イベントが発生するまでは、このモジュールは使用できません。

例:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## イベント

`powerMonitor` モジュールでは以下のイベントが発生します。

### イベント: 'suspend'

システムがサスペンドするときに発生します。

### イベント: 'resume'

システムが再開するときに発生します。

### Event: 'on-ac' _Windows_

システムが AC 電源に切り替わったときに発生します。

### Event: 'on-battery' _Windows_

システムがバッテリー電源に切り替わったときに発生します。

### Event: 'shutdown' _Linux_ _macOS_

システムが再起動またはシャットダウンしようとしているときに発生します。 イベントハンドラが `e.preventDefault()` を呼び出した場合、Electron は正常にアプリを終了するためにシステムのシャットダウンの遅延を試みます。 `e.preventDefault()` が呼ばれた場合、出来る限り `app.quit()` のようなものを呼ぶのと同じようにアプリを終了します。

### Event: 'lock-screen' _macOS_ _Windows_

システムがスクリーンをロックしようとしているときに発生します。

### Event: 'unlock-screen' _macOS_ _Windows_

システムスクリーンがアンロックされたときに発行されます。

## メソッド

`powerMonitor` モジュールには以下のメソッドがあります。

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

戻り値 `Integer` - アイドル状態の秒数

システムのアイドル時間を計算します。
