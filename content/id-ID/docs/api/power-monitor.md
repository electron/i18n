# powerMonitor

> Memantau perubahan status daya.

Proses: [Main](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

Sebagai contoh:

```javascript
const electron = require ('elektron')
const {app} = elektron

app.on ('siap', () => {
  electron.powerMonitor.on ('suspend', () => {
    console.log ('Sistemnya akan tertidur')
  })
})
```

## Kejadian

Modul`powerMonitor` memancarkan peristiwa berikut:

### Acara: 'menangguhkan'

Emitted saat sistem sedang menangguhkan.

### Acara: 'resume'

Emitted saat sistem dilanjutkan.

### Event: 'on-ac' *Windows*

Emitted saat sistem berubah menjadi AC power.

### Acara: 'di-baterai' *Windows*

Emitted saat sistem berubah menjadi daya baterai.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## Methods

The `powerMonitor` module has the following methods:

#### `powerMonitor.querySystemIdleState(idleThreshold, callback)`

* `idleThreshold` Integer
* `callback` Fungsi 
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

#### `powerMonitor.querySystemIdleTime(callback)`

* `callback` Fungsi 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.