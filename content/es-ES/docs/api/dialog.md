# dialog

> Mostrar diálogos del sistema nativo para abrir y salvar archivos, alertas, etc.

Process: [Main](../glossary.md#main-process)

Un ejemplo de mostrar un cuadro de diálogo para seleccionar múltiples archivos y directorios:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

El dialogo es abierto en el proceso principal de Electron. Si quiere usar el objeto diálogo para un proceso renderizado, recuerde accederlo usando el comando remoto:

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## Métodos

El módulo `dialogo` tiene los siguientes métodos:

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (optional)
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `propiedades` Cadena[] (optional) - Contiene cuales característica de dialogo deben usarse. Los siguientes valores pueden ser utilizados: 
    * `openFile` - Le permite a los archivos ser seleccionados.
    * `openDirectory` - Le permite a los directorios ser seleccionados.
    * `multiSelections` - Permite que varios caminos sean seleccionados.
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` *macOS* - Allow creating new directories from dialog.
    * `promptToCreate` *Windows* - Prompt for creation if the file path entered in the dialog does not exist. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación.
    * `noResolveAliases` *macOS* - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` *macOS* - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar encima de las cajas de entrada.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Function (opcional) 
  * `filePaths` Cadena[] - Un arreglo del camino de archivos elegido por el usuario
  * `bookmarks` String[] *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

Devuelve `String[]`, un arreglo del camino de archivos elegido por el usuario, si la llamada de vuelta es proveída, devuelve `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filters` especifican un arreglo de tipo de archivos que pueden ser desplegadas cuando quieres limitar el usuario a un tipo específico. Por ejemplo:

```javascript
{
  filters: [
    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
    {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Custom File Type', extensions: ['as']},
    {name: 'All Files', extensions: ['*']}
  ]
}
```

Los `extensions` arreglos deberían contener extensiones sin comodines o puntos (e.g. `'png'` es bueno, pero `'.png'` y `'*.png'` son malos). Para mostrar todos los archivos, usa el `'*'` comodín (ningún otro comodín es compatible).

Si un `callback` es pasado, la llamada API será asincrónica y el resultado será pasado vía `callback(filenames)`.

**Nota:** En Windows y Linux, un diálogo abierto no puede ser un selector de archivo y un selector de directorio a la vez, así que si estableces `properties` a el `['openFile', 'openDirectory']` en estas plataformas, un selector de directorio.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `opciones` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar por encima de los campos de texto.
  * `nameFieldLabel` Cadena (opcional) *macOS* - Etiqueta personalizada para el texto mostrado en frente al nombre del archivo del campo de texto.
  * `showsTagField` Boolean (opcional) *macOS* - Muestra las etiquetas de las cajas de entrada, por defecto a `true`.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `callback` Función (opcional) 
  * `filename` String
  * `bookmark` String *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Devuelve `String`, el camino de archivos elegidos por el usuario, si la llamada de vuelta es dada, se devuelve `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filtros` especifican un arreglo de los tipos de archivos can pueden ser mostrados, ver `dialog.showOpenDialog` por un ejemplo.

Si un `callback` es pasado, la llamada API será asincrónica y el resultado será pasado vía `callback(filename)`.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `opciones` Object 
  * `type` Cadena (opcional) - Puede ser `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. En Windows, `"question"` muestra el mismo icono que `"info"`, a menos que tu dispongas un icono usando la opción `"icon"`. En macOS, tanto `"warning"` como `"error"` muestran el mismo icono de peligro.
  * `buttons` Cadena[] (opcional) - Arreglo de textos por botones. En Windows, un arreglo vacío resultará en un botón con la etiqueta "OK".
  * `defaultId` Íntegro (opcional) - El índice del botón en el arreglo de los botones, el cual será selecto por defecto cuando el mensaje de la caja se abra.
  * `title` Cadena (opcional) - Título del mensaje de la caja, algunas plataformas no se mostrarán.
  * `message` Cadena - Contenido de la caja de mensaje.
  * `detail` Cadena (opcional) - Información extra del mensaje.
  * `checkboxLabel` Cadena (opcional) - Si es proveído, la caja de mensaje será incluido en una caja de chequeo con la etiqueta dada. El estado de la caja puede ser inspeccionado solo cuando se usa `callback`.
  * `checkboxChecked` Boolean (opcional) - Inicial estado de chequeo de la caja. `false` por defecto.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Íntegro (opcional) - El índice el botón a ser usado a cancelar el diálogo, por vía la llave `Esc`. Por defecto, esto es asignado a el primer botón con "cancelar" o "no" como una etiqueta. Si los botones etiquetados no existen y está opción no está establecida, `` será usado como un valor de retorno o una respondida de llamada de vuelta. Esta opción es ignorada en Windows.
  * `noLink` Boolean (opcional) - En Windows Electron se tratará de averiguar cuál de los `buttons` son botones comunes (como "Cancelar" o "Sí"), y muestra los otros como links de comandos en el diálogo. Esto puede hacer que el diálogo aparezca en el estilo de las aplicaciones modernas de Windows. Si no te gusta este comportamiento, puedes establecer `noLink` a `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normalizar el acceso al teclado a través de las plataformas. Por defecto es `false`. Permitir esto asume que `&` es usado en las etiquetas de los botones para el colocamiento de los atajos de acceso de las teclas del teclado y las etiquetas serán convertidas para que funcionen correctamente en cada plataforma, `&` personajes serán eliminados de macOS, convertidos a `_` en Linux, y dejado intacto en Windows. Por ejemplo, una etiqueta de botón de `Vie&w` será convertida a `Vie_w` en Linux y `View` en macOS y puede ser seleccionado vía `Alt-W` en Windows y Linux.
* `callback` Function (opcional) 
  * `response` Número - El índice del botón que fue clickeado.
  * `checkboxChecked` Boolean - El estado chequeado de la caja si `checkboxLabel` fue establecido. De otra manera, `false`.

Devuelve `Integer`, el índice del botón al que se le hizo clic, si una llamada de vuelta es proveída se puede volver indefinida.

Muestra una caja de mensaje, esto bloqueará el proceso hasta que la caja de mensaje esté cerrada. Se devuelve el índice del botón al que se le hizo clic.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Si una `callback` es pasada, el diálogo no bloqueará el proceso. La llamada API será desincronizada y el resultado será pasado vía `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` Cadena - El título a mostrar en la caja de error.
* `content` Cadena - El texto contiene a mostrar en la caja de error.

Muestra un diálogo de modalidad que muestra un error de mensaje.

Esta API puede ser llamada seguramente antes que el evento `ready` el módulo `app` emite, es usualmente usado a reportar errores en las etapas tempranas del inicio. Si llamado antes de la aplicación `ready` evento en Linux, el mensaje será emitido a stderr, y no aparecerá diálogo GUI.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `opciones` Object 
  * `certificate` [Certificate](structures/certificate.md) - El certificado a confiar/importar.
  * `message` Cadena - El mensaje a mostrar al usuario.
* `callback` Función

En macOS, esto muestra un diálogo modelo que muestra un mensaje e información certificada, y da al usuario la opción de confiar/importar el certificado. Si tú provees un argumento `browserWindow` el diálogo será adjuntado a la ventana parental, haciéndolo un modelo.

En Windows, las opciones son más limitadas, debido a que el Win32 APIs usado:

* El argumento `message` no es usado, como el OS provee su propio diálogo de confirmación.
* El argumento `browserWindow` es ignorado ya que no es posible hacer este diálogo modelo de confirmación.

## Páginas

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Puedes llamar a `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` para cambiar el offset del cuadro de la ventana en donde las páginas fueron adjuntadas.