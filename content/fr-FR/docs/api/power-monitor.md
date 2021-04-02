# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)

## Événements

Le module `powerMonitor` émet les événements suivants :

### Evénement: 'suspendre' _macOS_ _Windows_

Émis lorsque le système est suspendu.

### Evénement: 'resume' _macOS_ _Windows_

Émis lorsque le système reprend.

### Evénement: 'on-ac' _macOS_ _Windows_

Émis lorsque le système est branché sur prise.

### Evénement: 'on-battery' _macOS_  _Windows_

Émis lorsque le système passe sur batterie.

### Événement : 'shutdown' _Linux_ _macOS_

Émis lorsque le système est sur le point de redémarrer ou d'arrêter. Si le gestionnaire d'événements appelle `e.preventDefault()`, Electron tentera de retarder l'arrêt du système dans afin que l'application se ferme proprement. Si `e.preventDefault()` est appelé, l'application devrait quitter dès que possible en appelant quelque chose comme `app.quit()`.

### Événement : 'lock-screen' _macOS_ _Windows_

Émis lorsque le système est sur le point de verrouiller l'écran.

### Événement : 'unlock-screen' _macOS_ _Windows_

Émis dès que l'écran du système est déverrouillé.

### Evénement: 'user-did-become-active' _macOS_

Émis lors de l’activation d’une session de connexion. Consultez [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) plus d’informations.

### Evénement: 'user-did-resign-active' _macOS_

Émis lors de la désactivation d’une session de connexion. Consultez [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) plus d’informations.

## Méthodes

Le module `powerMonitor` a les méthodes suivantes :

### `format@@0 powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Entier

Retours `String` - L’état actuel du système. Peut être `active`, `idle`, `locked` ou `unknown`.

Calculez l’état d’inactivité du système. `idleThreshold` 'est la quantité de temps (en secondes) considérée comme inactive.  `locked` est disponible uniquement sur les systèmes pris en charge.

### `getSystemIdleTime()`

Retourne `Integer` - Temps d'inactivité en secondes

Calculer le temps d'inactivité du système en secondes.

### `powerMonitor.isOnBatteryPower ()`

Retours `Boolean` - Que le système soit alimenté par batterie.

Pour surveiller les modifications apportées à cette propriété, utilisez les `on-battery` et `on-ac` événements.

## Propriétés

### `powerMonitor.onBatteryPower Power PowerMonitor.onBatteryPower PowerMonitor.onBatteryPower Power`

Une `Boolean` propriété. C’est vrai si le système est alimenté par batterie.

Voir [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
