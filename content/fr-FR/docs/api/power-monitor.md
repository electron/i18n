# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)

## Événements

Le module `powerMonitor` émet les événements suivants :

### Event: 'suspend' _macOS_ _Windows_

Émis lorsque le système est suspendu.

### Event: 'resume' _macOS_ _Windows_

Émis lorsque le système reprend.

### Event: 'on-ac' _macOS_ _Windows_

Émis lorsque le système est branché sur prise.

### Event: 'on-battery' _macOS_  _Windows_

Émis lorsque le système passe sur batterie.

### Événement : 'shutdown' _Linux_ _macOS_

Émis lorsque le système est sur le point de redémarrer ou d'arrêter. Si le gestionnaire d'événements appelle `e.preventDefault()`, Electron tentera de retarder l'arrêt du système dans afin que l'application se ferme proprement. Si `e.preventDefault()` est appelé, l'application devrait quitter dès que possible en appelant quelque chose comme `app.quit()`.

### Événement : 'lock-screen' _macOS_ _Windows_

Émis lorsque le système est sur le point de verrouiller l'écran.

### Événement : 'unlock-screen' _macOS_ _Windows_

Émis dès que l'écran du système est déverrouillé.

### Event: 'user-did-become-active' _macOS_

Emitted when a login session is activated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) for more information.

### Event: 'user-did-resign-active' _macOS_

Emitted when a login session is deactivated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) for more information.

## Méthodes

Le module `powerMonitor` a les méthodes suivantes :

### `format@@0 powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Entier

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `getSystemIdleTime()`

Retourne `Integer` - Temps d'inactivité en secondes

Calculer le temps d'inactivité du système en secondes.

### `powerMonitor.isOnBatteryPower ()`

Returns `Boolean` - Whether the system is on battery power.

To monitor for changes in this property, use the `on-battery` and `on-ac` events.

## Propriétés

### `powerMonitor.onBatteryPower`

A `Boolean` property. True if the system is on battery power.

See [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
