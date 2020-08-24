# netLog

> Log d'évènements de réseau lors d'une session.

Processus : [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Voir [`--log-net-log`](command-line-switches.md#--log-net-logpath) pour log les évènement réseau à travers le cycle de vie de l'application.

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Méthodes

### `netLog.startLogging(path[, options])`

* `path` String - Chemin du fichier où sera enregistré le log.
* `options` Object (optional)
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Commence d'enregistrer les évènements de réseau dans `path` .

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Arrête d'enregistrer les évènements réseau. Si elle n'est pas appelée, elle sera automatiquement arrêtée quand l'application s'arrêtera.

## Propriétés

### `netLog.currentlyLogging` _Readonly_

Une propriété `Boolean` qui indique si des logs réseau sont actuellement enregistrés.

### `netLog.currentlyLoggingPath` _Readonly_ _Deprecated_

Une propriété `String` qui renvoie le chemin vers le log actuel.
