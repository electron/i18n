## Classe : DownloadItem

> Gère les téléchargements de fichiers depuis des sources distantes.

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

`DownloadItem` est un [EventEmitter][event-emitter] qui représente un élément de téléchargement dans Electron. Il est utilisé dans l'événement `will-download` de la classe `Session`, et permet aux utilisateurs de gérer les fichiers en cours de téléchargement.

```javascript
// Dans le processus main.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
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
* `state` Chaîne de caratères - Peut être `progressing` ou `interrupted`.

Émis lorsque le téléchargement a été mis à jour et n'est pas fini.

Le `state` peut être un de ces cas :

* `progressing` - Le téléchargement est en cours.
* `interrupted` - Le téléchargement a été interrompu et peut être repris.

#### Événement 'done'

Retourne :

* `event` Event
* `state` Chaîne de caratères - Peut être `completed`, `cancelled` ou `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

Le `state` peut être un de ces cas :

* `completed` - Le téléchargement s'est terminé avec succès.
* `cancelled` - Le téléchargement a été annulé.
* `interrupted` - Le téléchargement a été interrompu et ne peux pas être repris.

### Méthodes d’instance

L'objet `downloadItem` dispose des méthodes suivantes :

#### `downloadItem.setSavePath(path)`

* `path` String - Définit le chemin d'accès pour le téléchargement.

Cet API est seulement disponible dans la fonction de rappel de `will-download` dans session. If `path` doesn't exist, Electron will try to make the directory recursively. Si l'utilisateur ne définit pas le chemin de sauvegarde via l'API, Electron utilisera la routine d'origine pour déterminer le chemin de sauvegarde ; cela demande généralement une boîte de dialogue de sauvegarde.

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Définit les options de la boîte de dialogue de sauvegarde des fichiers. Cet objet a la même comme le paramètre `options` de [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. Cet API est seulement disponible dans la fonction de rappel de `will-download` dans session.

#### `downloadItem.getSaveDialogOptions()`

Retourne `SaveDialogOptions` - Retourne l'objet précédemment défini par `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Met en pause le téléchargement.

#### `downloadItem.isPaused()`

Retourne `Boolean` - Si le téléchargement est en pause.

#### `downloadItem.resume()`

Reprend le téléchargement qui a été mis en pause.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Sinon `resume()` va rejeter les octets reçus précédemment et redémarrer le téléchargement depuis le début.

#### `downloadItem.canResume()`

Retourne `Boolean` - Si le téléchargement peut être repris.

#### `downloadItem.cancel()`

Annule le téléchargement.

#### `downloadItem.getURL()`

Retourne `String` - L'URL d'origine d'où l'élément est téléchargé.

#### `downloadItem.getMimeType()`

Retourne `String` - Le mime type du fichier.

#### `downloadItem.hasUserGesture()`

Retourne `Boolean` - Si le téléchargement à des gestures.

#### `downloadItem.getFilename()`

Retourne `String` - le nom du fichier du téléchargement.

**Note:** The file name is not always the same as the actual one saved in local disk. Si l'utilisateur modifie le nom du fichier dans la boîte de dialogue de sauvegarde, alors le nom actuel et le nom du fichier sauvegardé seront différent.

#### `downloadItem.getTotalBytes()`

Retourne `Integer` - La taille totale en octets du téléchargement.

Si la taille est inconnue, retourne 0.

#### `downloadItem.getReceivedBytes()`

Retourne `Integer` - Le nombre d'octets reçu du téléchargement.

#### `downloadItem.getContentDisposition()`

Retourne `String` - Le champ Content-Disposition venant de l'en-tête de la réponse.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Retourne `String[]` - La chaîne d'URL complète de l'élément incluant toutes les redirections.

#### `downloadItem.getLastModifiedTime()`

Retourne `String` - La valeur de l'en-tête Last-Modified.

#### `downloadItem.getETag()`

Retourne `String` - La valeur de l'en-tête ETag.

#### `downloadItem.getStartTime()`

Retourne `Double` - Le nombre de secondes depuis l'époch UNIX lorsque le téléchargement s'est lancé.

### Propriétés d'instance

#### `chemin d'accès à la sauvegarde`

Une propriété `String` qui détermine le chemin du fichier de sauvegarde de l'élément téléchargé.

La propriété n'est disponible que dans la fonction de rappel `will-download` de la session. Si l'utilisateur ne définit pas le chemin de sauvegarde via la propriété, Electron utilisera la routine d'origine pour déterminer le chemin de sauvegarde ; cela demande généralement une boîte de dialogue de sauvegarde.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
