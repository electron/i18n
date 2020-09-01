# powerMonitor

> 電源の状態の変化をモニターします。

プロセス: [Main](../glossary.md#main-process)


`app` モジュールの `ready` イベントが発生するまでは、このモジュールは使用できません。

例:

```javascript
const { app, powerMonitor } = require('electron')

app.whenReady().then(() => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## イベント

`powerMonitor` モジュールでは以下のイベントが発生します。

### Event: 'suspend' _macOS_ _Windows_

システムがサスペンドするときに発生します。

### Event: 'resume' _macOS_ _Windows_

システムが再開するときに発生します。

### Event: 'on-ac' _macOS_ _Windows_

システムが AC 電源に切り替わったときに発生します。

### Event: 'on-battery' _macOS_  _Windows_

システムがバッテリー電源に切り替わったときに発生します。

### イベント: 'shutdown' _Linux_ _macOS_

システムが再起動またはシャットダウンしようとしているときに発生します。 イベントハンドラが `e.preventDefault()` を呼び出した場合、Electron は正常にアプリを終了するためにシステムのシャットダウンの遅延を試みます。 `e.preventDefault()` が呼ばれた場合、出来る限り `app.quit()` のようなものを呼ぶのと同じようにアプリを終了します。

### イベント: 'lock-screen' _macOS_ _Windows_

システムがスクリーンをロックしようとしているときに発生します。

### イベント: 'unlock-screen' _macOS_ _Windows_

システムスクリーンがアンロックされたときに発行されます。

## メソッド

`powerMonitor` モジュールには以下のメソッドがあります。

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

戻り値 `String` - 現在のシステムの状態。 `active` 、 `idle` 、 `locked` 、 `unknown` のいずれか。

システムのアイドル状態を計算します。 `idleThreshold` は、アイドルとみなされるまでの時間 (秒) です。  `locked` はサポートされたシステムでのみ利用可能です。

### `powerMonitor.getSystemIdleTime()`

戻り値 `Integer` - アイドル状態の秒数

システムのアイドル時間を計算します。
