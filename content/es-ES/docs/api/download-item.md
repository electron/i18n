## Clase: DownloadItem

> El archivo de control descarga desde fuentes remotas.

Proceso: [Main](../glossary.md#main-process)

`DownloadItem` es un `EventEmitter` que representa un elemento descargado en Electron. Se utiliza en el evento `will-download` de la clase `Session`, y permite a los usuarios controlar el elemento descargado.

```javascript
// En el proceso principal.
const {BrowserWindow} = require('electron')
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

* `event` Evento
* `state` Cadena

Aparece cuando la descara ha sido actualizada y no está terminada.

El `state` puede ser uno de los siguientes:

* `progressing` - La descarga está en proceso.
* `interrupted` - La descarga ha sido interrumpida y puede ser reanudada.

#### Evento: "done"

Devuelve:

* `event` Evento
* `state` Cadena

Aparece cuando la descarga está en un estado terminal. Esto incluye una descarga completa, una descarga cancelada (a través de `downloadItem.cancel()`), y una descarga interrumpida que no puede ser reanudada.

El `state` puede ser uno de los siguientes:

* `completed` - La descarga se ha completado con éxito.
* `cancelled` - La descarga ha sido cancelada.
* `interrupted` - La descarga ha sido interrumpida y no puede ser reanudada.

### Métodos de Instancia

El objeto `downloadItem` tiene los siguientes métodos:

#### `downloadItem.setSavePath(path)`

* `path` Cadena - Configura la ruta del archivo de guardado del elemento descargado.

La API solo está disponible en la función callback `will-download` de la sesión. Si el usuario no configura la ruta de guardado a través de la API, Electron usará la rutina de origen para determinar la ruta de guardado (generalmente indicará un diálogo de guardado).

#### `downloadItem.getSavePath()`

Devuelve `String` - La ruta de guardado del elemento descargado. Este puede ser tanto la ruta configurada a través de `downloadItem.setSavePath(path)` o la ruta seleccionada desde el cuadro de dialogo de guardado mostrado.

#### `downloadItem.pause()`

Pausa la descarga.

#### `downloadItem.isPaused()`

Devuelve `Boolean` - Si la ventana esta pausada o no.

#### `downloadItem.resume()`

Reanuda la descarga que ha sido pausada.

**Nota:** Para habilitar las descargas reanudables, el servidor desde donde se descarga debe soportar las solicitudes de rango y proporcionar los valores de cabecera `Last-Modified` y `ETag`. De lo contrario, `resume()` descartará los bytes recibidos anteriormente y reiniciará la descarga desde el principio.

#### `downloadItem.canResume()`

Reanuda `Boolean` - Si la descarga puede reanudarse o no.

#### `downloadItem.cancel()`

Cancela la operación de la descarga.

#### `downloadItem.getURL()`

Devuelve `String` - El url de origen desde donde se descargó el elemento.

#### `downloadItem.getMimeType()`

Returns `String` - The files mime type.

#### `downloadItem.hasUserGesture()`

Returns `Boolean` - Whether the download has user gesture.

#### `downloadItem.getFilename()`

Returns `String` - The file name of the download item.

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### `downloadItem.getTotalBytes()`

Returns `Integer` - The total size in bytes of the download item.

Si se desconoce el tamaño, devuelve 0.

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