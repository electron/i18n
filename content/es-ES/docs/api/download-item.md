## Clase: DownloadItem

> Control de descargas de archivos desde fuentes remotas.

Proceso: [Main](../glossary.md#main-process)

`DownloadItem` es un [EventEmitter][event-emitter] que representa un elemento descargado en Electron. Se utiliza en el evento `will-download` de la clase `Session`, y permite a los usuarios controlar el elemento descargado.

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
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
* `state` String - Puede ser `en progresso` o `interrumpido`.

Aparece cuando la descara ha sido actualizada y no está terminada.

El `state` puede ser uno de los siguientes:

* `progressing` - La descarga está en proceso.
* `interrupted` - La descarga ha sido interrumpida y puede ser reanudada.

#### Evento: "done"

Devuelve:

* `event` Event
* `state` String - Puede ser `completado`, `cancelado` o `interrumpido`.

Emitido cuando la descarga está en un estado terminal. Esto incluye una descarga completa, una descarga cancelada (a través de `downloadItem.cancel()`), y descargas interrumpidas que no pueden ser reanudadas.

El `state` puede ser uno de los siguientes:

* `completed` - La descarga se ha completado con éxito.
* `cancelled` - La descarga ha sido cancelada.
* `interrupted` - La descarga ha sido interrumpida y no puede ser reanudada.

### Métodos de Instancia

El objeto `downloadItem` tiene los siguientes métodos:

#### `downloadItem.setSavePath(path)`

* `path` Cadena - Configura la ruta del archivo de guardado del elemento descargado.

La API solo está disponible en la función callback `will-download` de la sesión. Si no existe `path` , Electron intentará hacer que el directorio se recurva de forma recursiva. Si el usuario no establece una ruta para guardar a través de la API, Electron usará la rutina original para determinar la ruta para guardar; esto usualmente genera un cuadro de dialogo para guardar.

#### `downloadItem.getSavePath()`

Devuelve `String` -la ruta de guardado del elemento de descarga. Esta será la ruta establecida mediante `downloadItem.setSavePath(path)` o la ruta seleccionada desde el diálogo guardar que se muestra.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Establece las opciones del diálogo de guardar archivos. Este objeto tiene la misma propiedad como el parámetro `options` de [`dialog.showSaveDialog()`](dialog.md).

Esta API permite al usuario establecer opciones personalizadas para el cuadro de diálogo guardar que abre para el elemento de descarga por defecto. La API solo está disponible en la función callback `will-download` de la sesión.

#### `downloadItem.getSaveDialogOptions()`

Devuelve `SaveDialogOptions` - Devuelve el objeto previamente establecido por `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pausa la descarga.

#### `downloadItem.isPaused()`

Devuelve `Boolean` - Si la ventana esta pausada o no.

#### `downloadItem.resume()`

Reanuda la descarga que ha sido pausada.

**Nota:** para habilitar descargas reanudables el servidor que estás descargando desde debe admitir las solicitudes de rango y proporcionar tanto `Last-Modified` como `ETag` valores de encabezado. De lo contrario, `resume()` descartará los bytes recibidos anteriormente y reiniciará la descarga desde el principio.

#### `downloadItem.canResume()`

Devuelve `Boolean` - Si se puede reanudar la descarga.

#### `downloadItem.cancel()`

Cancela la operación de la descarga.

#### `downloadItem.getURL()`

Devuelve `String` - La URL origen de donde el elemento se descarga.

#### `downloadItem.getMimeType()`

Devuelve `String` - El tipo de archivo.

#### `downloadItem.hasUserGesture()`

Devuelve `Boolean` - Si la descarga tiene o no gestos de usuario.

#### `downloadItem.getFilename()`

Devuelve `String` - El nombre de archivo del elemento descargado.

**Nota:** el nombre del archivo no siempre es el mismo que el que se guardó en el disco de local. Si el usuario cambia el nombre del archivo en el cuadro de diálogo de guardado de la descarga, el nombre actual del archivo guardado será diferente.

#### `downloadItem.getTotalBytes()`

Devuelve `Integer` - El tamaño total en bytes del elemento descargado.

Si se desconoce el tamaño, devuelve 0.

#### `downloadItem.getReceivedBytes()`

Devuelve `Integer` - Los bytes recibidos del elemento descargado.

#### `downloadItem.getContentDisposition()`

Devuelve `String` - El campo Content-Disposition desde la cabecera de respuesta.

#### `downloadItem.getState()`

Devuelve `String` -el estado actual. Puede ser `progressing`, `completed`, `cancelled` o `interrupted`.

**Nota:** los siguientes métodos son útiles específicamente para reanudar un elemento `cancelled` cuando se reinicia la sesión.

#### `downloadItem.getURLChain()`

Devuelve `String[]` - La cadena URL completa del elemento incluyendo cualquier redirección.

#### `downloadItem.getLastModifiedTime()`

Devuelve `String` - El valor de cabecera Last-Modified.

#### `downloadItem.getETag()`

Devuelve `String` - El valor de cabecera Etag.

#### `downloadItem.getStartTime()`

Devuelve `Double` - Número de segundos desde el UNIX epoch cuando se inició la descarga.

### Propiedades de Instancia

#### `downloadItem. savePath`

Una propiedad `String` que determina la ruta del archivo de guardado del elemento de descarga.

La propiedad solo esta disponible en la función callback `will-download` de la sesión. Si el usuario no establece la ruta de guardado a través de la propiedad, Electron usará la rutina original para determinar la ruta de guardado; esto suele generar un cuadro de diálogo para guardar.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
