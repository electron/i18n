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

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

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

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. L'API è disponibile solo nella funzione callback `will-download` della sessione.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Mette in pausa il download.

#### `downloadItem.isPaused()`

Restituisce `Boolean` - Se il download è in pausa.

#### `downloadItem.resume()`

Riprende il download che è stato messo in pausa.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Altrimenti `resume()` respingerà i bytes precedentemente ricevuti e riavvia il download dall'inizio.

#### `downloadItem.canResume()`

Restituisce `Boolean` - Quando il download può essere ripreso.

#### `downloadItem.cancel()`

Annulla l'operazione di download.

#### `downloadItem.getURL()`

Restituisce `String` - L'url originario da cui si è scaricato l'elemento.

#### `downloadItem.getMimeType()`

Restituisce `String` - Mime type the file.

#### `downloadItem.hasUserGesture()`

Restituisce `Boolean` - Se il download ha una user gesture.

#### `downloadItem.getFilename()`

Restituisce `String` - Nome del file scaricato.

**Note:** The file name is not always the same as the actual one saved in local disk. Se l'utente cambia il nome del file proposto nella finestra di salvataggio, l'attuale nome del file sarà differente.

#### `downloadItem.getTotalBytes()`

Restituisce `Integer` - La dimensione totale in byte del download.

Se la dimensione è sconosciuta, restituirà 0.

#### `downloadItem.getReceivedBytes()`

Restituisce `Integer` - I byte ricevuti del download.

#### `downloadItem.getContentDisposition()`

Restituisce `String` - Campo Content-Disposition ottenuta dall'intestazione della risposta.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Restituisce `String[]` - La catena completa degli url inclusi ogni redirect.

#### `downloadItem.getLastModifiedTime()`

Restituisce `String` - Valore dell'instestazione Last-Modified.

#### `downloadItem.getETag()`

Restituisce `String` - Valore dell'intestazione ETag.

#### `downloadItem.getStartTime()`

Restituisce `Double` - Numero di secondi dall'epoca UNIX da quando il download è stato avviato.
