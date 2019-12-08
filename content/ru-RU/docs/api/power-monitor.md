# powerMonitor (Мониторинг питания)

> Отслеживает изменения состояния питания устройства.

Process: [Main](../glossary.md#main-process)

Этот модуль нельзя использовать до тех пор, пока событие `ready` в `app` не будет готово к использованию.

Например:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## События

Модуль `powerMonitor` выдает следующие события:

### Событие: 'suspend'

Возникает, когда система приостановлена.

### Событие: 'resume'

Возникает при возобновлении работы системы.

### Событие: 'on-ac' *Windows*

Emitted when the system changes to AC power.

### Событие: 'on-battery' *Windows*

Emitted when system changes to battery power.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## Методы

The `powerMonitor` module has the following methods:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.