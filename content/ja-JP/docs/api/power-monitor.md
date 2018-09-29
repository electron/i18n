# powerMonitor

> 電源の状態の変化をモニターします。

プロセス: [Main](../glossary.md#main-process)

`app` モジュールの `ready` イベントが発生するまでは、このモジュールを require、または使用できません。

例:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
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

### イベント: 'on-ac' *Windows*

システムが AC 電源に切り替わったときに発生します。

### イベント: 'on-battery' *Windows*

システムがバッテリー電源に切り替わったときに発生します。

### イベント: 'shutdown' *Linux* *macOS*

システムが再起動またはシャットダウンしようとしているときに発生します。 イベントハンドラが `e.preventDefault()` を呼び出した場合、Electron は正常にアプリを終了するためにシステムのシャットダウンの遅延を試みます。 `e.preventDefault()` が呼ばれた場合、出来る限り `app.quit()` のようなものを呼ぶのと同じようにアプリを終了します。

### イベント: 'lock-screen' *macOS* *Windows*

システムがスクリーンをロックしようとしているときに発生します。

### イベント: 'unlock-screen' *macOS* *Windows*

システムスクリーンがアンロックされたときに発行されます。

## メソッド

`powerMonitor` モジュールには以下のメソッドがあります。

#### `powerMonitor.querySystemIdleState(idleThreshold, callback)`

* `idleThreshold` Integer
* `callback` Function 
  * `idleState` String - `active`, `idle`, `locked`, `unknown` にできます。

システムのアイドル状態を計算します。 `idleThreshold` は、アイドルとみなされるまでの時間 (秒) です。 `callback` はいくつかのシステムでは同期的に呼ばれ、`idleState` 引数はシステムの状態を表します。 `locked` はサポートしているシステムでのみ利用可能です。

#### `powerMonitor.querySystemIdleTime(callback)`

* `callback` Function 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.