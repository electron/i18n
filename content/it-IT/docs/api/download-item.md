## Class: DownloadItem

> Controlla i file scaricati dai sorgenti remoti.

Processo: [Main](../glossary.md#main-process)

`DownloadItem` è un `EventEmitter` che rappresenta un elemento scaricato in Electron. Esso è usato nell'evento `will-download` della classe `Session`, e consente agli utenti di controllare l'elemento scaricato.

```javascript
// Nel processo principale(main).
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Imposta il percorso di salvataggio, evitando l'apertura della finestra di salvataggio.
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Il Download è interrotto ma può essere continuato')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download in pausa')
      } else {
        console.log(`Bytes ricevuti: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download riuscito')
    } else {
      console.log(`Download fallito: ${state}`)
    }
  })
})
```

### Eventi dell'istanza

#### Evento: 'updated'

Restituisce:

* `event` Event
* `state` String - Può essere `progressing` o `interrupted`.

Emesso quando il download è stato aggiornato e non viene eseguito.

Lo `state` può essere uno dei seguenti:

* `progressing` - Il download è in progresso.
* `interrupted` - Il download è interrotto e può essere ripreso.

#### Event: 'done'

Restituisce:

* `event` Event
* `state` String - Può essere `completed`, `cancelled` o `interrupted`.

Emesso quando il download è in uno stato terminale. Questo include un download completato, un download annullato (tramite `downloadItem.cancel()`), e download interrotto che non può essere ripreso.

Lo `state` può essere uno dei seguenti:

* `completed` - Il download è stato completato con successo.
* `cancelled` - Il download è stato annullato.
* `interrupted` - Il download è stato interrotto e non può essere ripreso.

### Metodi Istanza

L'oggetto `downloadItem` ha i seguenti metodi:

#### `downloadItem.setSavePath(percorso)`

* `path` String - Imposta il percorso del file salvato dell'elemento scaricato.

L'API è disponibile solo nella funzione callback `will-download` della sessione. Se l'utente non imposta il percorso di salvataggio tramite l'API, Electron userà la routine originale per determinare il percorso di salvataggio (Solitamente inserito tramite un save dialog).

#### `downloadItem.getSavePath()`

Restituisce `String` - Il percorso di salvataggio dell'elemento scaricato. Questo sarà o il percorso impostato tramite `downloadItem.setSavePath(path)` o il percorso selezionato dal save dialog mostrato.

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