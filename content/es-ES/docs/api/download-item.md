## Clase: DownloadItem

> El archivo de control descarga desde fuentes remotas.

Process: [Main](../glossary.md#main-process)

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

* `event` Event
* `state` String - Can be `progressing` or `interrupted`.

Aparece cuando la descara ha sido actualizada y no está terminada.

El `state` puede ser uno de los siguientes:

* `progressing` - La descarga está en proceso.
* `interrupted` - La descarga ha sido interrumpida y puede ser reanudada.

#### Evento: "done"

Retorna:

* `event` Event
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

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

Devuelve `Boolean` - Si se puede reanudar la descarga.

#### `downloadItem.cancel()`

Cancela la operación de la descarga.

#### `downloadItem.getURL()`

Devuelve `String` - El url de origen desde donde se descargó el elemento.

#### `downloadItem.getMimeType()`

Devuelve `String` - El tipo de archivo.

#### `downloadItem.hasUserGesture()`

Devuelve `Boolean` - Si la descarga tiene o no gestos de usuario.

#### `downloadItem.getFilename()`

Devuelve `String` - El nombre de archivo del elemento descargado.

**Nota:** El nombre del archivo no siempre es el mismo que el que está guardado en el disco local. Si el usuario cambia el nombre del archivo en el cuadro de diálogo de guardado de la descarga, el nombre actual del archivo guardado será diferente.

#### `downloadItem.getTotalBytes()`

Devuelve `Integer` - El tamaño total en bytes del elemento descargado.

Si se desconoce el tamaño, devuelve 0.

#### `downloadItem.getReceivedBytes()`

Devuelve `Integer` - Los bytes recibidos del elemento descargado.

#### `downloadItem.getContentDisposition()`

Devuelve `String` - El campo Content-Disposition desde la cabecera de respuesta.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Nota:** Los siguientes métodos son útiles específicamente para reanudar un elemento `cancelled` cuando se reinicia la sesión.

#### `downloadItem.getURLChain()`

Devuelve `String[]` - La cadena del url completa del elemento, incluyendo cualquier redirección.

#### `downloadItem.getLastModifiedTime()`

Devuelve `String` - El valor de cabecera Last-Modified.

#### `downloadItem.getETag()`

Devuelve `String` - El valor de cabecera Etag.

#### `downloadItem.getStartTime()`

Devuelve `Double` - Número de segundos desde el UNIX epoch cuando se inició la descarga.