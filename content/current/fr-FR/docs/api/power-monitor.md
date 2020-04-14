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

### Événement : 'on-ac' *Windows*

Émis lorsque le système est branché sur prise.

### Événement : 'on-battery' *Windows*

Émis lorsque le système passe sur batterie.

### Événement : 'shutdown' *Linux* *macOS*

Émis lorsque le système est sur le point de redémarrer ou d'arrêter. Si le gestionnaire d'événements appelle `e.preventDefault()`, Electron tentera de retarder l'arrêt du système dans afin que l'application se ferme proprement. Si `e.preventDefault()` est appelé, l'application devrait quitter dès que possible en appelant quelque chose comme `app.quit()`.

### Événement : 'lock-screen' *macOS* *Windows*

Émis lorsque le système est sur le point de verrouiller l'écran.

### Événement : 'unlock-screen' *macOS* *Windows*

Émis dès que l'écran du système est déverrouillé.

## Méthodes

Le module `powerMonitor` a les méthodes suivantes :

### `format@@0 powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Entier

Retourne `String` - L'état actuel du système. Peut être `active`, `idle`, `verrouillé` ou `inconnu`.

Calcule l'état d'inactivité du système. `idleThreshold` est la durée (en secondes) avant d'être considéré comme inactif. `verrouillé` n'est disponible que sur les systèmes pris en charge.

### `getSystemIdleTime()`

Retourne `Integer` - Temps d'inactivité en secondes

Calculer le temps d'inactivité du système en secondes.