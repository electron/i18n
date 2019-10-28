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

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pauses the download.

#### `downloadItem.isPaused()`

Returns `Boolean` - Whether the download is paused.

#### `downloadItem.resume()`

Resumes the download that has been paused.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

Cancels the download operation.

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

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

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.

### Propriétés d'instance

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.