# crashReporter

> Envía los informes de fallos a un servidor remoto.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

A continuación, un ejemplo de un envío automático de un informe de fallos a un servidor remoto:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

Para configurar un servidor que acepte y procese los informes de fallos, se pueden utilizar los siguientes proyectos:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

O utilice una solución alojada por terceros:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Los informes de fallos se guardan localmente en una carpeta temporal específica de la aplicación. Para un `productName` de `YourName`, los informes de fallos serán almacenados en una carpeta llamada `YourName Crashes` dentro del directorio temporal. Se puede personalizar esta ubicación del directorio temporal para la aplicación llamando a la API `app.setPath('temp', '/my/custom/temp')` antes de activar el informador de fallos.

## Métodos

El módulo `crashReporter` tiene los siguientes métodos:

### `crashReporter.start(options)`

* `options` Objeto 
  * `companyName` String
  * `submitURL` String - URL a donde se enviarán los informes de errores como un POST.
  * `productName` String (optional) - Defaults to `app.name`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. Default is `true`.
  * `ignoreSystemCrashHandler` Booleano (opcional) - Por defecto es `false`.
  * `extra` Record<String, String> (optional) - An object you can define that will be sent along with the report. Solo las propiedades de la cadena son enviadas correctamente. Nested objects are not supported. When using Windows, the property names and values must be fewer than 64 characters.
  * `crashesDirectory` String (optional) - Directory to store the crash reports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

Es necesario llamar este método antes de utilizar cualquier otra API `crashReporter` y en cada proceso (main/renderer) del cual se quiera recopilar los informes de fallos. Se puede pasar diferentes opciones al `crashReporter.start` al llamar desde diferentes procesos.

**Nota** Los procesos secundarios creados mediante el módulo `child_process` no tendrá acceso a los módulos de Electron. Por lo tanto, para recopilar los informes de fallos de ellos, se utiliza en su lugar `process.crashReporter.start`. Pasar las mismas opciones anteriormente mencionadas con otro adicional llamado `crashesDirectory` que debe apuntar a un directorio para almacenar los informes de fallos temporalmente. Se puede probar esto llamando `process.crash()` para hacer fallar el proceso secundario.

**Nota:** Si necesita enviar parámetros adicionales o actualizados `extra` después de la primera llamada a `start` puede llamar a `addExtraParameter`, en macOS, o llamar a `start` otra vez con los parámetros nuevos o actualizados `extra`, en Linux y Windows.

**Note:** En macOS y windows, Electron usa un nuevo cliente `crashpad` para la recolección y reporte de los fallos. Si desea habilitar el informe de fallos, se requiere inicializar `crashpad` desde el proceso principal utilizando `crashReporter.start`, independientemente del proceso del cual se desea recopilar los fallos. Una vez inicializado, el controlador de crashpad recopila los fallos de todos los procesos. Aún así hay que llamar `crashReporter.start` del renderizador o del proceso secundario, de lo contrario los fallos serán informados sin `companyName`, `productName` o cualquier información `extra`.

### `crashReporter.getLastCrashReport()`

Devuelve [`CrashReport`](structures/crash-report.md):

Devuelve la fecha y el ID del último reporte de fallo. Solo los reportes de fallos que han sido alzados serán retornados; incluso si un reporte de fallo esta presente en el disco este no sera retornado a menos que este alzado. En caso de que no haya reportes subidos, `null` es retornado.

### `crashReporter.getUploadedReports()`

Devuelve [`CrashReport []`](structures/crash-report.md):

Devuelve todos los informes de fallos subidos. Cada informe contiene la fecha y el ID subido.

### `crashReporter.getUploadToServer()`

Devuelve `Boolean` - Si los informes deben enviarse o no al servidor. Establecer a través del método `start` o `setUploadToServer`.

**Nota:** Esta API sólo se puede llamar desde el proceso principal.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean *macOS* - Si los informes deben enviarse o no al servidor.

Esto es controlado normalmente por las preferencias del usuario. Esto no tiene efecto alguno si se llama antes de que se llame `start`.

**Nota:** Esta API sólo se puede llamar desde el proceso principal.

### `crashReporter.addExtraParameter(key, value)` *macOS* *Windows*

* `key` String - La clave del parámetro, debe tener menos de 64 caracteres.
* `value` String - Valor del parámetro, debe tener menos de 64 caracteres.

Establecer un parámetro adicional que se enviará con el informe de fallos. Los valores especificados aquí se enviarán adicionalmente a otros valores establecidos con la opción `extra` cuando se llama a `start`. Esta API solo esta disponible en macOS y en windows, Si tú necesitas agregar/actualizar parámetros adicionales en Linux después de tu primera llamada a `start` tu puedes llamar `start` otra vez con la opción `start` actualizada.

### `crashReporter.removeExtraParameter(key)` *macOS* *Windows*

* `key` String - La clave del parámetro, debe tener menos de 64 caracteres.

Elimina un parámetro extra del conjunto actual de parámetros para que no se envíe con el informe de fallos.

### `crashReporter.getParameters()`

Muestra todos los parámetros que se enviarán al informador de fallos.

### `crashReporter.getCrashesDirectory()`

Returns `String` - The directory where crashes are temporarily stored before being uploaded.

## Carga útil del informe de fallos

El informador de fallos enviará la siguiente información al `submitURL` como un `multipart/form-data` `POST`:

* `ver` String - La versión de Electron.
* `platform` String - por ejemplo, "win32".
* `process_type` String - por ejemplo, "renderer".
* `guid` String - por ejemplo, "5e1286fc-da97-479e-918b-6bfb0c3d1c72".
* `_version` Cadena - La versión en `package.json`.
* `_productName` String - El nombre del producto en el objeto `crashReporter` `options`.
* `prod` Cadena- El nombre del producto subyacente. En este caso, Electron.
* `_companyName` Cadena - El nombre de la empresa en el objeto `crashReporter` `options`.
* `upload_file_minidump` File - El informe de fallos en el formato de `minidump`.
* Todas las propiedades de nivel uno del objeto `extra` en el objeto `crashReporter` `options`.