# powerMonitor

> Memantau perubahan status daya.

Proses: [Main](../glossary.md#main-process)


This module cannot be used until the `ready` event of the `app` module is emitted.

Sebagai contoh:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Kejadian

Modul`powerMonitor` memancarkan peristiwa berikut:

### Acara: 'menangguhkan'

Emitted saat sistem sedang menangguhkan.

### Acara: 'resume'

Emitted saat sistem dilanjutkan.

### Event: 'on-ac' _Windows_

Emitted saat sistem berubah menjadi AC power.

### Acara: 'di-baterai' _Windows_

Emitted saat sistem berubah menjadi daya baterai.

### Event: 'shutdown' _Linux_ _macOS_

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' _macOS_ _Windows_

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' _macOS_ _Windows_

Emitted as soon as the systems screen is unlocked.

## Metode

The `powerMonitor` module has the following methods:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.
