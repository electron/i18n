# dialog

> Mostrar diálogos del sistema nativo para abrir y salvar archivos, alertas, etc.

Proceso: [Principal](../glossary.md#main-process)

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

* `browserWindow` Buscador Windows (opcional)
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
    * `createDirectory` - Permite crear nuevos directorios en un cuadro de diálogo. *macOS*
    * `promptToCreate` - símbolo del sistema para la creación si no existe la ruta del archivo en el cuadro de diálogo. Esto no crea realmente un archivo en el camino pero permite a caminos no existentes a regresar que deberían ser creados por la aplicación. *Windows*
    * `noResolveAliases` - Desactiva el camino de resolición automático del alias (symlink). Alias seleccionados regresará a su ruta en vez de seguir por su ruta destino. *macOS*
    * `treatPackageAsDirectory` Paquetes de tratamientos, como carpetas de `.app`, como un directorioen lugar de un archivo. *macOS*
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar encima de las cajas de entrada.
* `llamada de vuelta` Función (opcional) 
  * `filePaths` Cadena[] - Un arreglo del camino de archivos elegido por el usuario

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

Si un `callback` es pasado, la llamada API será asincrónica y el resultado será pasado vía `callback(filenames)`

**Nota:** En Windows y Linux, un diálogo abierto no puede ser un selector de archivo y un selector de directorio a la vez, así que si estableces `properties` a el `['openFile', 'openDirectory']` en estas plataformas, un selector de directorio.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` Buscador Windows (opcional)
* `options` Object 
  * `título` cadena (opcional)
  * `defaultPath` Cadena (opcional) - El camino de directorio absoluto, el camino de archivo absoluto o el nombre del archivo a usar por defecto.
  * `buttonLabel` cadena (optional) - Etiqueta predeterminada para el botón de confirmación, cuando esta se deja vacía la etiqueta predeterminada será usada.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` Cadena (opcional) *macOS* - Mensaje a mostrar por encima de los campos de texto.
  * `nameFieldLabel` Cadena (opcional) *macOS* - Etiqueta personalizada para el texto mostrado en frente al nombre del archivo del campo de texto.
  * `showsTagField` Boolean (opcional) *macOS* - Muestra las etiquetas de las cajas de entrada, por defecto a `true`.
* `llamada de vuelta` Función (opcional) 
  * `filename` Cadena

Returns `String`, the path of the file chosen by the user, if a callback is provided it returns `undefined`.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (opcional)
* `options` Object 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `` will be used as the return value or callback response. This option is ignored on Windows.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Default is `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
* `llamada de vuelta` Función (opcional) 
  * `response` Number - The index of the button that was clicked
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

El argumento de `browserWindow` permite el diálogo a adjuntarse a una ventana parental, haciéndola una modalidad.

If a `callback` is passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box
* `content` String - The text content to display in the error box

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` Buscador Windows (opcional)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Función

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a `BrowserWindow` reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.