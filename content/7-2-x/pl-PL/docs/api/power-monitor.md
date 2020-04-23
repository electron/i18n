# powerMonitor

> Monitoruje zmiany stanu zasilania.

Proces: [Main](../glossary.md#main-process)


This module cannot be used until the `ready` event of the `app` module is emitted.

Na przykład:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Zdarzenia

Modułu `powerMonitor` emituje następujące zdarzenia:

### Zdarzenie: 'suspend'

Emitowane, gdy praca systemu jest zawieszana.

### Zdarzenie: 'resume'

Emitowane, gdy praca systemu jest wznawiana.

### Zdarzenie: 'ac' _Windows_

Emitowane, gdy system znajduje się na zasilaniu sieciowym.

### Zdarzenie: 'bateria' _Windows_

Emitowane, gdy system znajduje się na zasilaniu z baterii.

### Zdarzenie: 'shutdown' _Linux_ _macOS_

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' _macOS_ _Windows_

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' _macOS_ _Windows_

Emitted as soon as the systems screen is unlocked.

## Metody

The `powerMonitor` module has the following methods:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.
