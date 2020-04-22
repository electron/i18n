## Clase: DownloadItem

> Control de descargas de archivos desde fuentes remotas.

Proceso: [principal](../glossary.md#main-process)</0>

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. Se utiliza en el evento `will-download` de la clase `Session`, y permite a los usuarios controlar el elemento descargado.

```javascript
// En el proceso principal.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Establece una dirección de guardado, haciendo que Electron no saque una ventana de guardado.
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})
```

### Eventos de Instancia

#### Evento: "updated"

Devuelve:

* `event`
* `state` String - Puede ser `en progresso` o `interrumpido`.

Aparece cuando la descara ha sido actualizada y no está terminada.

El `state` puede ser uno de los siguientes:

* `progressing` - La descarga está en proceso.
* `interrupted` - La descarga ha sido interrumpida y puede ser reanudada.

#### Evento: "done"

Devuelve:

* `event` Event
* `state` String - Puede ser `completado`, `cancelado` o `interrumpido`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

El `state` puede ser uno de los siguientes:

* `completed` - La descarga se ha completado con éxito.
* `cancelled` - La descarga ha sido cancelada.
* `interrupted` - La descarga ha sido interrumpida y no puede ser reanudada.

### Métodos de Instancia

El objeto `downloadItem` tiene los siguientes métodos:

#### `downloadItem.setSavePath(path)`

* `path` Cadena - Configura la ruta del archivo de guardado del elemento descargado.

La API solo está disponible en la función callback `will-download` de la sesión. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Establece las opciones del diálogo de guardar archivos. Este objeto tiene la misma propiedad como el parámetro `options` de [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. La API solo está disponible en la función callback `will-download` de la sesión.

#### `downloadItem.getSaveDialogOptions()`

Devuelve `SaveDialogOptions` - Devuelve el objeto previamente establecido por `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pausa la descarga.

#### `downloadItem.isPaused()`

Devuelve `Boolean` - Si la ventana esta pausada o no.

#### `downloadItem.resume()`

Reanuda la descarga que ha sido pausada.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. De lo contrario, `resume()` descartará los bytes recibidos anteriormente y reiniciará la descarga desde el principio.

#### `downloadItem.canResume()`

Devuelve `Boolean` - Si se puede reanudar la descarga.

#### `downloadItem.cancel()`

Cancela la operación de la descarga.

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.getMimeType()`

Devuelve `String` - El tipo de archivo.

#### `downloadItem.hasUserGesture()`

Devuelve `Boolean` - Si la descarga tiene o no gestos de usuario.

#### `downloadItem.getFilename()`

Devuelve `String` - El nombre de archivo del elemento descargado.

**Note:** The file name is not always the same as the actual one saved in local disk. Si el usuario cambia el nombre del archivo en el cuadro de diálogo de guardado de la descarga, el nombre actual del archivo guardado será diferente.

#### `downloadItem.getTotalBytes()`

Devuelve `Integer` - El tamaño total en bytes del elemento descargado.

Si se desconoce el tamaño, devuelve 0.

#### `downloadItem.getReceivedBytes()`

Devuelve `Integer` - Los bytes recibidos del elemento descargado.

#### `downloadItem.getContentDisposition()`

Devuelve `String` - El campo Content-Disposition desde la cabecera de respuesta.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Devuelve `String` - El valor de cabecera Last-Modified.

#### `downloadItem.getETag()`

Devuelve `String` - El valor de cabecera Etag.

#### `downloadItem.getStartTime()`

Devuelve `Double` - Número de segundos desde el UNIX epoch cuando se inició la descarga.

### Propiedades de la instancia

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.
