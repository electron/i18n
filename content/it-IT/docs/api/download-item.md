## Class: DownloadItem

> Controlla i file scaricati dai sorgenti remoti.

Processo: [Main](../glossary.md#main-process)

`DownloadItem` è un `EventEmitter` che rappresenta un elemento scaricato in Electron. Esso è usato nell'evento `will-download` della classe `Session`, e consente agli utenti di controllare l'elemento scaricato.

```javascript
// Nel processo principale(main).
const {BrowserWindow} = require('electron')
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

#### `downloadItem.pause()`

Mette in pausa il download.

#### `downloadItem.isPaused()`

Restituisce `Boolean` - Se il download è in pausa.

#### `downloadItem.resume()`

Riprende il download che è stato messo in pausa.

**Nota:** Per abilitare la ripresa dei downloads il server da cui stai scaricando deve supportare una serie di richieste e fornire entrambi i valori di intestazione `Last-Modified` e `ETag`. Altrimenti `resume()` respingerà i bytes precedentemente ricevuti e riavvia il download dall'inizio.

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

**Nota:** Il nome del file non sempre è lo stesso di quello effettivamente salvato su disco locale. Se l'utente cambia il nome del file proposto nella finestra di salvataggio, l'attuale nome del file sarà differente.

#### `downloadItem.getTotalBytes()`

Restituisce `Integer` - La dimensione totale in byte del download.

Se la dimensione è sconosciuta, restituirà 0.

#### `downloadItem.getReceivedBytes()`

Restituisce `Integer` - I byte ricevuti del download.

#### `downloadItem.getContentDisposition()`

Restituisce `String` - Campo Content-Disposition ottenuta dall'intestazione della risposta.

#### `downloadItem.getState()`

Restituisce `String` - Lo stato corrente. Può essere `progressing`, `completed`, `cancelled` o `interrupted`.

**Nota:** I seguenti metodi sono utili specificatamente per riprendere un elemento in stato `cancelled` quando la sessione è riavviata.

#### `downloadItem.getURLChain()`

Restituisce `String[]` - La catena completa degli url inclusi ogni redirect.

#### `downloadItem.getLastModifiedTime()`

Restituisce `String` - Valore dell'instestazione Last-Modified.

#### `downloadItem.getETag()`

Restituisce `String` - Valore dell'intestazione ETag.

#### `downloadItem.getStartTime()`

Restituisce `Double` - Numero di secondi dall'epoca UNIX da quando il download è stato avviato.