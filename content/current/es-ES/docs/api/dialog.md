# dialog

> Muestra diálogos nativos del sistema para abrir y guardar archivos, alertas, etc.

Proceso: [Main](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Métodos

El módulo `dialogo` tiene los siguientes métodos:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `título` cadena (opcional)
  * `defaultPath` Cadena (optional)
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Le permite a los archivos ser seleccionados.
    * `openDirectory` - Le permite a los directorios ser seleccionados.
    * `multiSelections` - Permite que varios caminos sean seleccionados.
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Devuelve `String[] | undefined`, la ruta del archivo elegido por el usuario, si el diálogo es cancelado devuelve `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Por ejemplo:

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

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `título` cadena (opcional)
  * `defaultPath` Cadena (optional)
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Le permite a los archivos ser seleccionados.
    * `openDirectory` - Le permite a los directorios ser seleccionados.
    * `multiSelections` - Permite que varios caminos sean seleccionados.
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo lo siguiente:

* `canceled` Boolean - si el diálogo fue o no cancelado.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` debe estar activado para ser poblado. (For return values, see [table here](#bookmarks-array).)

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Por ejemplo:

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

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

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
* `options` Object
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. Si esta opción está activada y el fichero no existe todavía, se creará un fichero en blanco en la carpeta seleccionada.

Devuelve `String | undefined`, la ruta del archivo elegido por el usuario; si el cuadro de dialogo es cancelado retorna `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filtros` especifican un arreglo de los tipos de archivos can pueden ser mostrados, ver `dialog.showOpenDialog` por un ejemplo.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Muestra archivos ocultos en diálogo.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. Si esta opción está activada y el fichero no existe todavía, se creará un fichero en blanco en la carpeta seleccionada.

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo lo siguiente:
  * `canceled` Boolean - si el diálogo fue o no cancelado.
  * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present. (For return values, see [table here](#bookmarks-array).)

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

Los `filtros` especifican un arreglo de los tipos de archivos can pueden ser mostrados, ver `dialog.showOpenDialog` por un ejemplo.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `type` Cadena (opcional) - Puede ser `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. En Windows, `"question"` muestra el mismo icono que `"info"`, a menos que tu dispongas un icono usando la opción `"icon"`. En macOS, tanto `"warning"` como `"error"` muestran el mismo icono de peligro.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Íntegro (opcional) - El índice del botón en el arreglo de los botones, el cual será selecto por defecto cuando el mensaje de la caja se abra.
  * `title` Cadena (opcional) - Título del mensaje de la caja, algunas plataformas no se mostrarán.
  * `message` Cadena - Contenido de la caja de mensaje.
  * `detail` Cadena (opcional) - Información extra del mensaje.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `cancelId` Íntegro (opcional) - El índice el botón a ser usado a cancelar el diálogo, por vía la llave `Esc`. Por defecto, esto es asignado a el primer botón con "cancelar" o "no" como una etiqueta. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - En Windows Electron se tratará de averiguar cuál de los `buttons` son botones comunes (como "Cancelar" o "Sí"), y muestra los otros como links de comandos en el diálogo. Esto puede hacer que el diálogo aparezca en el estilo de las aplicaciones modernas de Windows. Si no te gusta este comportamiento, puedes establecer `noLink` a `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normalizar el acceso al teclado a través de las plataformas. Por defecto es `false`. Permitir esto asume que `&` es usado en las etiquetas de los botones para el colocamiento de los atajos de acceso de las teclas del teclado y las etiquetas serán convertidas para que funcionen correctamente en cada plataforma, `&` personajes serán eliminados de macOS, convertidos a `_` en Linux, y dejado intacto en Windows. Por ejemplo, una etiqueta de botón de `Vie&w` será convertida a `Vie_w` en Linux y `View` en macOS y puede ser seleccionado vía `Alt-W` en Windows y Linux.

Devuelve `Integer` - el índice del botón pulsado.

Muestra un cuadro de mensaje, bloqueará el proceso hasta que el cuadro de mensaje esté cerrado. It returns the index of the clicked button.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad. If `browserWindow` is not shown dialog will not be attached to it. In such case It will be displayed as independed window.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `type` Cadena (opcional) - Puede ser `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. En Windows, `"question"` muestra el mismo icono que `"info"`, a menos que tu dispongas un icono usando la opción `"icon"`. En macOS, tanto `"warning"` como `"error"` muestran el mismo icono de peligro.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Íntegro (opcional) - El índice del botón en el arreglo de los botones, el cual será selecto por defecto cuando el mensaje de la caja se abra.
  * `title` Cadena (opcional) - Título del mensaje de la caja, algunas plataformas no se mostrarán.
  * `message` Cadena - Contenido de la caja de mensaje.
  * `detail` Cadena (opcional) - Información extra del mensaje.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Íntegro (opcional) - El índice el botón a ser usado a cancelar el diálogo, por vía la llave `Esc`. Por defecto, esto es asignado a el primer botón con "cancelar" o "no" como una etiqueta. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - En Windows Electron se tratará de averiguar cuál de los `buttons` son botones comunes (como "Cancelar" o "Sí"), y muestra los otros como links de comandos en el diálogo. Esto puede hacer que el diálogo aparezca en el estilo de las aplicaciones modernas de Windows. Si no te gusta este comportamiento, puedes establecer `noLink` a `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normalizar el acceso al teclado a través de las plataformas. Por defecto es `false`. Permitir esto asume que `&` es usado en las etiquetas de los botones para el colocamiento de los atajos de acceso de las teclas del teclado y las etiquetas serán convertidas para que funcionen correctamente en cada plataforma, `&` personajes serán eliminados de macOS, convertidos a `_` en Linux, y dejado intacto en Windows. Por ejemplo, una etiqueta de botón de `Vie&w` será convertida a `Vie_w` en Linux y `View` en macOS y puede ser seleccionado vía `Alt-W` en Windows y Linux.

Devuelve `Promise<Object>` - resuelve con una promesa conteniendo lo siguiente:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Muestra un cuadro de mensaje, bloqueará el proceso hasta que el cuadro de mensaje esté cerrado.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

### `dialog.showErrorBox(title, content)`

* `title` Cadena - El título a mostrar en la caja de error.
* `content` Cadena - El texto contiene a mostrar en la caja de error.

Muestra un diálogo de modalidad que muestra un error de mensaje.

Esta API puede ser llamada seguramente antes que el evento `ready` el módulo `app` emite, es usualmente usado a reportar errores en las etapas tempranas del inicio. Si llamado antes de la aplicación `ready` evento en Linux, el mensaje será emitido a stderr, y no aparecerá diálogo GUI.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow`[BrowserWindow](browser-window.md) (opcional)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - El certificado a confiar/importar.
  * `message` Cadena - El mensaje a mostrar al usuario.

Devuelve `Promise<void>` - resuelve cuando se muestra el diálogo de confianza del certificado.

En macOS, esto muestra un diálogo modelo que muestra un mensaje e información certificada, y da al usuario la opción de confiar/importar el certificado. Si tú provees un argumento `browserWindow` el diálogo será adjuntado a la ventana parental, haciéndolo un modelo.

En Windows, las opciones son más limitadas, debido a que el Win32 APIs usado:

* El argumento `message` no es usado, como el OS provee su propio diálogo de confirmación.
* El argumento `browserWindow` es ignorado ya que no es posible hacer este diálogo modelo de confirmación.

## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |

## Páginas

En macOS, los diálogos son presentados como hojas ancladas a una ventana si se indica una referencia de [`BrowserWindow`](browser-window.md) en el parámetro `browserWindow`, o modales si no se indica ventana.

Puedes llamar a `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` para cambiar el offset del cuadro de la ventana en donde las páginas fueron adjuntadas.
