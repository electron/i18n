## Classe : DownloadItem

> Gère les téléchargements de fichiers depuis des sources distantes.

Processus : [Main](../glossary.md#main-process)

`DownloadItem` est un `EventEmitter` qui représente un élément en cours de téléchargement dans Electron. Il est utilisé dans l'événement `will-download` de la classe `Session`, et permet aux utilisateurs de gérer les fichiers en cours de téléchargement.

```javascript
// Dans le processus main.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Définit le chemin de sauvegarde, ce qui fait qu'Electron n'affichera pas une boite de dialogue de sauvegarde.
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Le téléchargement est interrompu mais peut être redémarrer')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Le téléchargement est en pause')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Téléchargement réussi')
    } else {
      console.log(`Téléchargement échoué : ${state}`)
    }
  })
})
```

### Événements d’instance

#### Événement 'updated'

Retourne :

* `event` Event
* `state` String

Émis lorsque le téléchargement a été mis à jour et n'est pas fini.

Le `state` peut être un de ces cas :

* `progressing` - Le téléchargement est en cours.
* `interrupted` - Le téléchargement a été interrompu et peut être repris.

#### Événement 'done'

Retourne :

* `event` Event
* `state` String

Émis lorsque le téléchargement est dans un état final. Cela inclus un téléchargement fini, annulé (via `downloadItem.cancel()`) et interrompu tout en ne pouvant pas pas être repris.

Le `state` peut être un de ces cas :

* `completed` - Le téléchargement s'est terminé avec succès.
* `cancelled` - Le téléchargement a été annulé.
* `interrupted` - Le téléchargement a été interrompu et ne peux pas être repris.

### Méthodes d’instance

L'objet `downloadItem` dispose des méthodes suivantes :

#### `downloadItem.setSavePath(path)`

* `path` String - Définit le chemin d'accès pour le téléchargement.

Cet API est seulement disponible dans la fonction de rappel de `will-download` dans session. Si l'utilisateur ne définit pas de chemin d'accès via l'API, Electron utilisera la routine originale pour déterminer le chemin d'accès (Affiche généralement une boîte de dialogue de sauvegarde).

#### `downloadItem.getSavePath()`

Retourne `String` - Le chemin d'accès pour le téléchargement. Ce sera soit le chemin définit par `downloadItem.setSavePath(path)` ou le chemin indiqué par la boîte de dialogue de sauvegarde.

#### `downloadItem.pause()`

Met en pause le téléchargement.

#### `downloadItem.isPaused()`

Retourne `Boolean` - Si le téléchargement est en pause.

#### `downloadItem.resume()`

Reprend le téléchargement qui a été mis en pause.

**Remarque :** Pour permettre la reprise des téléchargements, le serveur sur lequel vous téléchargez doit supporter les requêtes de plage (range requests) et doit fournir les en-têtes `Last-Modified` et `ETag`. Sinon `resume()` va rejeter les octets reçus précédemment et redémarrer le téléchargement depuis le début.

#### `downloadItem.canResume()`

Resumes `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

Cancels the download operation.

#### `downloadItem.getURL()`

Returns `String` - The origin url where the item is downloaded from.

#### `downloadItem.getMimeType()`

Returns `String` - The files mime type.

#### `downloadItem.hasUserGesture()`

Returns `Boolean` - Whether the download has user gesture.

#### `downloadItem.getFilename()`

Returns `String` - The file name of the download item.

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### `downloadItem.getTotalBytes()`

Returns `Integer` - The total size in bytes of the download item.

If the size is unknown, it returns 0.

#### `downloadItem.getReceivedBytes()`

Returns `Integer` - The received bytes of the download item.

#### `downloadItem.getContentDisposition()`

Returns `String` - The Content-Disposition field from the response header.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete url chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.