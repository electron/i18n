## Classe : DownloadItem

> Gère les téléchargements de fichiers depuis des sources distantes.

Processus : [Main](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. Il est utilisé dans l'événement `will-download` de la classe `Session`, et permet aux utilisateurs de gérer les fichiers en cours de téléchargement.

```javascript
// Dans le processus principal.
const { BrowserWindow } = require('electron')
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

* `event` Événement
* `state` Chaîne de caratères - Peut être `progressing` ou `interrupted`.

Émis lorsque le téléchargement a été mis à jour et n'est pas fini.

Le `state` peut être un de ces cas :

* `progressing` - Le téléchargement est en cours.
* `interrupted` - Le téléchargement a été interrompu et peut être repris.

#### Événement 'done'

Retourne :

* `event` Événement
* `state` Chaîne de caratères - Peut être `completed`, `cancelled` ou `interrupted`.

Émis lorsque le téléchargement est dans un état final. Cela inclus un téléchargement fini, annulé (via `downloadItem.cancel()`) et interrompu tout en ne pouvant pas pas être repris.

Le `state` peut être un de ces cas :

* `completed` - Le téléchargement s'est terminé avec succès.
* `cancelled` - Le téléchargement a été annulé.
* `interrupted` - Le téléchargement a été interrompu et ne peux pas être repris.

### Méthodes d’instance

L'objet `downloadItem` dispose des méthodes suivantes :

#### `downloadItem.setSavePath(path)`

* `path` String - Définit le chemin d'accès pour le téléchargement.

Cet API est seulement disponible dans la fonction de rappel de `will-download` dans session. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

Retourne `String` - Le chemin d'accès pour le téléchargement. Ce sera soit le chemin définit par `downloadItem.setSavePath(path)` ou le chemin indiqué par la boîte de dialogue de sauvegarde.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Met en pause le téléchargement.

#### `downloadItem.isPaused()`

Retourne `Boolean` - Si le téléchargement est en pause.

#### `downloadItem.resume()`

Reprend le téléchargement qui a été mis en pause.

**Remarque :** Pour permettre la reprise des téléchargements, le serveur sur lequel vous téléchargez doit supporter les requêtes de plage (range requests) et doit fournir les en-têtes `Last-Modified` et `ETag`. Sinon `resume()` va rejeter les octets reçus précédemment et redémarrer le téléchargement depuis le début.

#### `downloadItem.canResume()`

Retourne `Boolean` - Si le téléchargement peut être repris.

#### `downloadItem.cancel()`

Annule le téléchargement.

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.getMimeType()`

Retourne `String` - Le mime type du fichier.

#### `downloadItem.hasUserGesture()`

Retourne `Boolean` - Si le téléchargement à des gestures.

#### `downloadItem.getFilename()`

Retourne `String` - le nom du fichier du téléchargement.

**Remarque :** Le nom du fichier n'est pas toujours le même que celui enregistré dans le disque local. Si l'utilisateur modifie le nom du fichier dans la boîte de dialogue de sauvegarde, alors le nom actuel et le nom du fichier sauvegardé seront différent.

#### `downloadItem.getTotalBytes()`

Retourne `Integer` - La taille totale en octets du téléchargement.

Si la taille est inconnue, retourne 0.

#### `downloadItem.getReceivedBytes()`

Retourne `Integer` - Le nombre d'octets reçu du téléchargement.

#### `downloadItem.getContentDisposition()`

Retourne `String` - Le champ Content-Disposition venant de l'en-tête de la réponse.

#### `downloadItem.getState()`

Retourne `String` - L'état actuel. Peut être `progressing`, `completed`, `cancelled` ou `interrupted`.

**Remarque :** Les méthodes suivantes sont utiles spécifiquement pour relancer un téléchargement `cancelled` au redémarrage de la session.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Retourne `String` - La valeur de l'en-tête Last-Modified.

#### `downloadItem.getETag()`

Retourne `String` - La valeur de l'en-tête ETag.

#### `downloadItem.getStartTime()`

Retourne `Double` - Le nombre de secondes depuis l'époch UNIX lorsque le téléchargement s'est lancé.

### Propriétés d'instance

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.