# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)

Vous ne pouvez pas inclure ou utiliser ce module avant que l'événement `ready` du module `app` soit émis.

Par exemple :

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('Le système va se mettre en veille')
  })
})
```

## Événements

Le module `powerMonitor` émet les événements suivants :

### Événement : 'suspend'

Émis lorsque le système est suspendu.

### Événement : 'resume'

Émis lorsque le système reprend.

### Événement : 'on-ac' *Windows*

Émis lorsque le système est branché sur prise.

### Événement : 'on-battery' *Windows*

Émis lorsque le système passe sur batterie.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## Méthodes

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