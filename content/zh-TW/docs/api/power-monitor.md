# powerMonitor

> 監視電源狀態變更。

處理序: [主處理序](../glossary.md#main-process)

在 ` app ` 模組的 ` ready` 事件發出之前, 您不能要求或使用此模組。

例如:

```javascript
const electron = require('electron')
const { app } = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('系統即將休眠')
  })
})
```

## 事件

` powerMonitor ` 模組發出以下事件:

### 事件: 'suspend'

Emitted when the system is suspending.

### 事件: 'resume'

在系統復原時發出。

### 事件: 'on-ac' *Windows*

當系統變為用交流電作電源時發出。

### 事件: 'on-battery' *Windows*

當系統變為用電池作電源時發出。

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## 方法

The `powerMonitor` module has the following methods:

### `powerMonitor.querySystemIdleState(idleThreshold, callback)` *(Deprecated)*

* `idleThreshold` Integer
* `callback` Function 
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

### `powerMonitor.querySystemIdleTime(callback)` *(Deprecated)*

* `callback` Function 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.