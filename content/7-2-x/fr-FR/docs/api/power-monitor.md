# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)


Ce module ne peut pas être utilisé tant que l'événement `prêt` du module `app` n'est pas émis.

Par exemple :

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor. n('suspend', () => {
    console.log('Le système va dormir')
  })
})
```

## Événements

Le module `powerMonitor` émet les événements suivants :

### Événement : 'suspend'

Émis lorsque le système est suspendu.

### Événement : 'resume'

Émis lorsque le système reprend.

### Événement : 'on-ac' _Windows_

Émis lorsque le système est branché sur prise.

### Événement : 'on-battery' _Windows_

Émis lorsque le système passe sur batterie.

### Événement : 'shutdown' _Linux_ _macOS_

Émis lorsque le système est sur le point de redémarrer ou d'arrêter. Si le gestionnaire d'événements appelle `e.preventDefault()`, Electron tentera de retarder l'arrêt du système dans afin que l'application se ferme proprement. Si `e.preventDefault()` est appelé, l'application devrait quitter dès que possible en appelant quelque chose comme `app.quit()`.

### Événement : 'lock-screen' _macOS_ _Windows_

Émis lorsque le système est sur le point de verrouiller l'écran.

### Événement : 'unlock-screen' _macOS_ _Windows_

Émis dès que l'écran du système est déverrouillé.

## Méthodes

Le module `powerMonitor` a les méthodes suivantes :

### `format@@0 powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Entier

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `getSystemIdleTime()`

Retourne `Integer` - Temps d'inactivité en secondes

Calculer le temps d'inactivité du système en secondes.
