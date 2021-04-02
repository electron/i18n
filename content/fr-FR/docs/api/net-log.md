# netLog

> Log d'évènements de réseau lors d'une session.

Processus : [Main](../glossary.md#main-process)

```javascript
const { netLog } = require ('electron')

app.whenReady().then(async () => {
  await netLog.startLogging ('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log ('Net-logs written to', chemin)
})
```

Voir [`--log-net-log`](command-line-switches.md#--log-net-logpath) pour log les évènement réseau à travers le cycle de vie de l'application.

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Méthodes

### `netLog.startLogging(path[, options])`

* `path` String - Chemin du fichier où sera enregistré le log.
* `options` objet (facultatif)
  * `captureMode` String (facultatif) - Quels types de données doivent être capturées. Par , seules les métadonnées sur les demandes seront saisies. La configuration de ce `includeSensitive` inclut des cookies et des données d’authentification. Le le rendre `everything` comprendra tous les octets transférés sur des prises. Peut être `default`, `includeSensitive` ou `everything`.
  * `maxFileSize` (facultatif) - Lorsque le journal dépasse cette taille, la s’arrête automatiquement. Par défaut à illimité.

Retours `Promise<void>` - se résout lorsque le journal net a commencé à enregistrer.

Commence d'enregistrer les évènements de réseau dans `path` .

### `netLog.stopLogging()`

Retourne `Promise<void>` - se résout lorsque le journal net a été rincé sur le disque.

Arrête d'enregistrer les évènements réseau. Si elle n'est pas appelée, elle sera automatiquement arrêtée quand l'application s'arrêtera.

## Propriétés

### `netLog.currentlyLogging` _Readonly_

Une `Boolean` qui indique si des journaux réseau sont actuellement enregistrés.
