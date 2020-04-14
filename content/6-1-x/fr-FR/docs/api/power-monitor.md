# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

Par exemple :

```javascript
const electron = require('electron')
const { app } = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Événements

Le module `powerMonitor` émet les événements suivants :

### Événement : 'suspend'

Émis lorsque le système est suspendu.

### Événement : 'resume'

Émis lorsque le système reprend.

### Event: 'on-ac' _Windows_

Émis lorsque le système est branché sur prise.

### Event: 'on-battery' _Windows_

Émis lorsque le système passe sur batterie.

### Event: 'shutdown' _Linux_ _macOS_

Émis lorsque le système est sur le point de redémarrer ou d'arrêter. Si le gestionnaire d'événements appelle `e.preventDefault()`, Electron tentera de retarder l'arrêt du système dans afin que l'application se ferme proprement. Si `e.preventDefault()` est appelé, l'application devrait quitter dès que possible en appelant quelque chose comme `app.quit()`.

### Event: 'lock-screen' _macOS_ _Windows_

Émis lorsque le système est sur le point de verrouiller l'écran.

### Event: 'unlock-screen' _macOS_ _Windows_

Émis dès que l'écran du système est déverrouillé.

## Méthodes

Le module `powerMonitor` a les méthodes suivantes :

### `powerMonitor.querySystemIdleState(idleThreshold, callback)` _(Deprecated)_

* `idleThreshold` Entier
* `callback` Function
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

### `powerMonitor.querySystemIdleTime(callback)` _(Deprecated)_

* `callback` Function
  * `idleTime` Integer - Idle time in seconds

Calculer le temps d'inactivité du système en secondes.

### `format@@0 powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Entier

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `getSystemIdleTime()`

Retourne `Integer` - Temps d'inactivité en secondes

Calculer le temps d'inactivité du système en secondes.

