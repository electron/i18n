# netLog

> Log d'évènements de réseau lors d'une session.

Processus : [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Voir [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) pour log les évènement réseau à travers le cycle de vie de l'application.

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Méthodes

### `netLog.startLogging(path)`

* `path` String - Chemin du fichier où sera enregistré le log.

Commence d'enregistrer les évènements de réseau dans `path` .

### `netLog.stopLogging([callback])`

* `callback` Function (facultatif)
  * `path` String - Chemin vers lequel le log a été enregistré.

Arrête d'enregistrer les évènements réseau. Si elle n'est pas appelée, elle sera automatiquement arrêtée quand l'application s'arrêtera.

**[Deprecated Soon](modernization/promisification.md)**

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Arrête d'enregistrer les évènements réseau. Si elle n'est pas appelée, elle sera automatiquement arrêtée quand l'application s'arrêtera.

## Propriétés

### `netLog.currentlyLogging`

Une propriété `Boolean` qui indique si des logs réseau sont actuellement enregistrés.

### `netLog.currentlyLoggingPath`

Une propriété `String` qui renvoie le chemin vers le log actuel.
