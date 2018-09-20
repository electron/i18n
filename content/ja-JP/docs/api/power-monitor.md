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

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## メソッド

The `powerMonitor` module has the following methods:

#### `powerMonitor.querySystemIdleState(idleThreshold, callback)`

* `idleThreshold` Integer
* `callback` Function 
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

#### `powerMonitor.querySystemIdleTime(callback)`

* `callback` Function 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.