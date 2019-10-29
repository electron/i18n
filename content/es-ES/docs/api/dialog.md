# dialog

> Muestra diálogos nativos del sistema para abrir y guardar archivos, alertas, etc.

Proceso: [Principal](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

El dialogo es abierto en el proceso principal de Electron. Si quiere usar el objeto diálogo para un proceso renderizado, recuerde accederlo usando el comando remoto:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Métodos

El módulo `dialogo` tiene los siguientes métodos:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (optional)
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `propiedades` Cadena[] (optional) - Contiene cuales característica de dialogo deben usarse. Los siguientes valores pueden ser utilizados: 
    * `openFile` - Le permite a los archivos ser seleccionados.
    * `openDirectory` - Le permite a los directorios ser seleccionados.
    * `multiSelections` - Permite que varios caminos sean seleccionados.
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` *macOS*- Permite crear nuevos directorios a partir del diálogo.
    * `promptToCreate` *Windows* - Aviso para la creación si la ruta de fichero insertado en el diálogo no existe. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación.
    * `noResolveAliases`*macOS*-Desactiva la resolución rutas de alias automático (symlink). Los alias seleccionados devolverán las rutas de los alias en vez de su ruta objetivo.
    * `treatPackageAsDirectory` *macOS* - Trata paquetes como carpetas `.app`, como un directorio en vez de como un fichero.
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar encima de las cajas de entrada.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Devuelve `String[] | undefined`, la ruta del archivo elegido por el usuario, si el diálogo es cancelado devuelve `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filters` especifican un arreglo de tipo de archivos que pueden ser desplegadas cuando quieres limitar el usuario a un tipo específico. Por ejemplo:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Los `extensions` arreglos deberían contener extensiones sin comodines o puntos (e.g. `'png'` es bueno, pero `'.png'` y `'*.png'` son malos). Para mostrar todos los archivos, usa el `'*'` comodín (ningún otro comodín es compatible).

**Nota:** En Windows y Linux, un diálogo abierto no puede ser un selector de archivo y un selector de directorio a la vez, así que si estableces `properties` a el `['openFile', 'openDirectory']` en estas plataformas, un selector de directorio.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md)(opcional)
* `opciones` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (optional)
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `propiedades` Cadena[] (optional) - Contiene cuales característica de dialogo deben usarse. Los siguientes valores pueden ser utilizados: 
    * `openFile` - Le permite a los archivos ser seleccionados.
    * `openDirectory` - Le permite a los directorios ser seleccionados.
    * `multiSelections` - Permite que varios caminos sean seleccionados.
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` *macOS*- Permite crear nuevos directorios a partir del diálogo.
    * `promptToCreate` *Windows* - Aviso para la creación si la ruta de fichero insertado en el diálogo no existe. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación.
    * `noResolveAliases`*macOS*-Desactiva la resolución rutas de alias automático (symlink). Los alias seleccionados devolverán las rutas de los alias en vez de su ruta objetivo.
    * `treatPackageAsDirectory` *macOS* - Trata paquetes como carpetas `.app`, como un directorio en vez de como un fichero.
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar encima de las cajas de entrada.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo lo siguiente:

* `canceled` Boolean - si el diálogo fue o no cancelado.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (opcional) *macOS* *mas* - Un array que coincide con el array `filePaths` de cadenas codificadas en base64 que contiene datos de seguridad del marcador de ambito. `securityScopedBookmarks` debe estar activado para ser poblado.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filters` especifican un arreglo de tipo de archivos que pueden ser desplegadas cuando quieres limitar el usuario a un tipo específico. Por ejemplo:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Los `extensions` arreglos deberían contener extensiones sin comodines o puntos (e.g. `'png'` es bueno, pero `'.png'` y `'*.png'` son malos). Para mostrar todos los archivos, usa el `'*'` comodín (ningún otro comodín es compatible).

**Nota:** En Windows y Linux, un diálogo abierto no puede ser un selector de archivo y un selector de directorio a la vez, así que si estableces `properties` a el `['openFile', 'openDirectory']` en estas plataformas, un selector de directorio.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar por encima de los campos de texto.
  * `nameFieldLabel` Cadena (opcional) *macOS* - Etiqueta personalizada para el texto mostrado en frente al nombre del archivo del campo de texto.
  * `showsTagField` Boolean (opcional) *macOS* - Muestra las etiquetas de las cajas de entrada, por defecto a `true`.
  * `securityScopedBookmarks` Boolean (opcional) *macOS* *mas* - Crear un [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) es empaquetado para el Mac App Store. Si esta opción está activada y el fichero no existe todavía, se creará un fichero en blanco en la carpeta seleccionada.

Devuelve `String | undefined`, la ruta del archivo elegido por el usuario; si el cuadro de dialogo es cancelado retorna `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filtros` especifican un arreglo de los tipos de archivos can pueden ser mostrados, ver `dialog.showOpenDialog` por un ejemplo.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar por encima de los campos de texto.
  * `nameFieldLabel` Cadena (opcional) *macOS* - Etiqueta personalizada para el texto mostrado en frente al nombre del archivo del campo de texto.
  * `showsTagField` Boolean (opcional) *macOS* - Muestra las etiquetas de las cajas de entrada, por defecto a `true`.
  * `securityScopedBookmarks` Boolean (opcional) *macOS* *mas* - Crear un [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) es empaquetado para el Mac App Store. Si esta opción está activada y el fichero no existe todavía, se creará un fichero en blanco en la carpeta seleccionada.

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo lo siguiente:

    * `canceled` Boolean - si el dialogo a sido cancelado o no.
    * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
    * `bookmark` String (opcional) _macOS_ _mas_ - Cadena codificada en Base64 que contiene marcadores de ámbito de seguridad para el archivo guardado. `securityScopedBookmarks` bebe estar activado para que esto este presente.
    

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filtros` especifican un arreglo de los tipos de archivos can pueden ser mostrados, ver `dialog.showOpenDialog` por un ejemplo.

**Nota:** En macOS, se recomienda usar la versión asincrona para evitar problemas cuando expanda y colapsa el diálogo.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `type` Cadena (opcional) - Puede ser `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. En Windows, `"question"` muestra el mismo icono que `"info"`, a menos que tu dispongas un icono usando la opción `"icon"`. En macOS, tanto `"warning"` como `"error"` muestran el mismo icono de peligro.
  * `buttons` Cadena[] (opcional) - Arreglo de textos por botones. En Windows, un arreglo vacío resultará en un botón con la etiqueta "OK".
  * `defaultId` Íntegro (opcional) - El índice del botón en el arreglo de los botones, el cual será selecto por defecto cuando el mensaje de la caja se abra.
  * `title` Cadena (opcional) - Título del mensaje de la caja, algunas plataformas no se mostrarán.
  * `message` Cadena - Contenido de la caja de mensaje.
  * `detail` Cadena (opcional) - Información extra del mensaje.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (opcional) - Inicial estado de chequeo de la caja. `false` por defecto.
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `cancelId` Íntegro (opcional) - El índice el botón a ser usado a cancelar el diálogo, por vía la llave `Esc`. Por defecto, esto es asignado a el primer botón con "cancelar" o "no" como una etiqueta. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - En Windows Electron se tratará de averiguar cuál de los `buttons` son botones comunes (como "Cancelar" o "Sí"), y muestra los otros como links de comandos en el diálogo. Esto puede hacer que el diálogo aparezca en el estilo de las aplicaciones modernas de Windows. Si no te gusta este comportamiento, puedes establecer `noLink` a `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normalizar el acceso al teclado a través de las plataformas. Por defecto es `false`. Permitir esto asume que `&` es usado en las etiquetas de los botones para el colocamiento de los atajos de acceso de las teclas del teclado y las etiquetas serán convertidas para que funcionen correctamente en cada plataforma, `&` personajes serán eliminados de macOS, convertidos a `_` en Linux, y dejado intacto en Windows. Por ejemplo, una etiqueta de botón de `Vie&w` será convertida a `Vie_w` en Linux y `View` en macOS y puede ser seleccionado vía `Alt-W` en Windows y Linux.

Devuelve `Integer` - el índice del botón pulsado.

Muestra una caja de mensaje, esto bloqueará el proceso hasta que la caja de mensaje esté cerrada. Se devuelve el índice del botón al que se le hizo clic.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `type` Cadena (opcional) - Puede ser `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. En Windows, `"question"` muestra el mismo icono que `"info"`, a menos que tu dispongas un icono usando la opción `"icon"`. En macOS, tanto `"warning"` como `"error"` muestran el mismo icono de peligro.
  * `buttons` Cadena[] (opcional) - Arreglo de textos por botones. En Windows, un arreglo vacío resultará en un botón con la etiqueta "OK".
  * `defaultId` Íntegro (opcional) - El índice del botón en el arreglo de los botones, el cual será selecto por defecto cuando el mensaje de la caja se abra.
  * `title` Cadena (opcional) - Título del mensaje de la caja, algunas plataformas no se mostrarán.
  * `message` Cadena - Contenido de la caja de mensaje.
  * `detail` Cadena (opcional) - Información extra del mensaje.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (opcional) - Inicial estado de chequeo de la caja. `false` por defecto.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Íntegro (opcional) - El índice el botón a ser usado a cancelar el diálogo, por vía la llave `Esc`. Por defecto, esto es asignado a el primer botón con "cancelar" o "no" como una etiqueta. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - En Windows Electron se tratará de averiguar cuál de los `buttons` son botones comunes (como "Cancelar" o "Sí"), y muestra los otros como links de comandos en el diálogo. Esto puede hacer que el diálogo aparezca en el estilo de las aplicaciones modernas de Windows. Si no te gusta este comportamiento, puedes establecer `noLink` a `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normalizar el acceso al teclado a través de las plataformas. Por defecto es `false`. Permitir esto asume que `&` es usado en las etiquetas de los botones para el colocamiento de los atajos de acceso de las teclas del teclado y las etiquetas serán convertidas para que funcionen correctamente en cada plataforma, `&` personajes serán eliminados de macOS, convertidos a `_` en Linux, y dejado intacto en Windows. Por ejemplo, una etiqueta de botón de `Vie&w` será convertida a `Vie_w` en Linux y `View` en macOS y puede ser seleccionado vía `Alt-W` en Windows y Linux.

Devuelve `Promise<Object>` - resuelve con una promesa conteniendo lo siguiente:

    * `response` Number - El índice del botón pulsado.
    * `checkboxChecked` Boolean - El estado chequeado del checkbox si `checkboxLabel` fue establecido. De otra manera `false`.
    

Muestra un cuadro de mensaje, bloqueará el proceso hasta que el cuadro de mensaje esté cerrado.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

### `dialog.showErrorBox(title, content)`

* `title` Cadena - El título a mostrar en la caja de error.
* `content` Cadena - El texto contiene a mostrar en la caja de error.

Muestra un diálogo de modalidad que muestra un error de mensaje.

Esta API puede ser llamada seguramente antes que el evento `ready` el módulo `app` emite, es usualmente usado a reportar errores en las etapas tempranas del inicio. Si llamado antes de la aplicación `ready` evento en Linux, el mensaje será emitido a stderr, y no aparecerá diálogo GUI.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` *macOS* *Windows*

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `opciones` Object 
  * `certificate` [Certificate](structures/certificate.md) - El certificado a confiar/importar.
  * `message` Cadena - El mensaje a mostrar al usuario.

Devuelve `Promise<void>` - resuelve cuando se muestra el diálogo de confianza del certificado.

En macOS, esto muestra un diálogo modelo que muestra un mensaje e información certificada, y da al usuario la opción de confiar/importar el certificado. Si tú provees un argumento `browserWindow` el diálogo será adjuntado a la ventana parental, haciéndolo un modelo.

En Windows, las opciones son más limitadas, debido a que el Win32 APIs usado:

* El argumento `message` no es usado, como el OS provee su propio diálogo de confirmación.
* El argumento `browserWindow` es ignorado ya que no es posible hacer este diálogo modelo de confirmación.

## Páginas

En macOS, los diálogos son presentados como hojas ancladas a una ventana si se indica una referencia de [`BrowserWindow`](browser-window.md) en el parámetro `browserWindow`, o modales si no se indica ventana.

Puedes llamar a `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` para cambiar el offset del cuadro de la ventana en donde las páginas fueron adjuntadas.