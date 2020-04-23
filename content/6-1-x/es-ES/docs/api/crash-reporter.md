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

* [Backtrace I/O](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)

Los informes de fallos se guardan localmente en una carpeta temporal específica de la aplicación. Para un `productName` de `YourName`, los informes de fallos serán almacenados en una carpeta llamada `YourName Crashes` dentro del directorio temporal. Se puede personalizar esta ubicación del directorio temporal para la aplicación llamando a la API `app.setPath('temp', '/my/custom/temp')` antes de activar el informador de fallos.

## Métodos

El módulo `crashReporter` tiene los siguientes métodos:

### `crashReporter.start(options)`

* `options` Object
  * `companyName` String
  * `submitURL` String - URL a donde se enviarán los informes de errores como un POST.
  * `productName` String (opcional) - Por defecto es `app.getName()`.
  * `uploadToServer` Booleano (opcional) - Si los informes de fallo deben enviarse o no al servidor. Por defecto es `true`.
  * `ignoreSystemCrashHandler` Booleano (opcional) - Por defecto es `false`.
  * `extra` Objeto (opcional) - Un objeto que se puede definir que será enviado a través del informe. Solo las propiedades de la cadena son enviadas correctamente. No se admiten objetos anidados y los nombres de propiedades y valores tener menos de 64 caracteres.
  * `crashesDirectory` String (opcional) - Directorio para almacenar temporalmente los informes de errores (solo se usa cuando el proceso de notificación de errores se inicia a través de `process.crashReporter.start`).

Es necesario llamar este método antes de utilizar cualquier otra API `crashReporter` y en cada proceso (main/renderer) del cual se quiera recopilar los informes de fallos. Se puede pasar diferentes opciones al `crashReporter.start` al llamar desde diferentes procesos.

**Nota** Los procesos secundarios creados mediante el módulo `child_process` no tendrá acceso a los módulos de Electron. Por lo tanto, para recopilar los informes de fallos de ellos, se utiliza en su lugar `process.crashReporter.start`. Pasar las mismas opciones anteriormente mencionadas con otro adicional llamado `crashesDirectory` que debe apuntar a un directorio para almacenar los informes de fallos temporalmente. Se puede probar esto llamando `process.crash()` para hacer fallar el proceso secundario.

**Nota:** Si necesita enviar parámetros adicionales o actualizados `extra` después de la primera llamada a `start` puede llamar a `addExtraParameter`, en macOS, o llamar a `start` otra vez con los parámetros nuevos o actualizados `extra`, en Linux y Windows.

**Note:** En macOS y windows, Electron usa un nuevo cliente `crashpad` para la recolección y reporte de los fallos. Si desea habilitar el informe de fallos, se requiere inicializar `crashpad` desde el proceso principal utilizando `crashReporter.start`, independientemente del proceso del cual se desea recopilar los fallos. Una vez inicializado, el controlador de crashpad recopila los fallos de todos los procesos. Aún así hay que llamar `crashReporter.start` del renderizador o del proceso secundario, de lo contrario los fallos serán informados sin `companyName`, `productName` o cualquier información `extra`.

### `crashReporter.getLastCrashReport()`

Devuelve [`CrashReport`](structures/crash-report.md):

Devuelve la fecha y el ID del último reporte de fallo. Solo los reportes de fallos que han sido alzados serán retornados; incluso si un reporte de fallo esta presente en el disco este no sera retornado a menos que este alzado. En caso de que no haya reportes subidos, `null` es retornado.

### `crashReporter.getUploadedReports()`

Devuelve [`CrashReport []`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Nota:** Esta API sólo se puede llamar desde el proceso principal.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - Si los informes deben enviarse o no al servidor.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Nota:** Esta API sólo se puede llamar desde el proceso principal.

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` String - La clave del parámetro, debe tener menos de 64 caracteres.
* `value` String - Valor del parámetro, debe tener menos de 64 caracteres.

Establecer un parámetro adicional que se enviará con el informe de fallos. Los valores especificados aquí se enviarán adicionalmente a otros valores establecidos con la opción `extra` cuando se llama a `start`. Esta API solo esta disponible en macOS y en windows, Si tú necesitas agregar/actualizar parámetros adicionales en Linux después de tu primera llamada a `start` tu puedes llamar `start` otra vez con la opción `start` actualizada.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` String - La clave del parámetro, debe tener menos de 64 caracteres.

Elimina un parámetro extra del conjunto actual de parámetros para que no se envíe con el informe de fallos.

### `crashReporter.getParameters()`

Muestra todos los parámetros que se enviarán al informador de fallos.

## Carga útil del informe de fallos

El informador de fallos enviará la siguiente información al `submitURL` como un `multipart/form-data` `POST`:

* `ver` String - La versión de Electron.
* `platform` String - por ejemplo, "win32".
* `process_type` String - por ejemplo, "renderer".
* `guid` String - por ejemplo, "5e1286fc-da97-479e-918b-6bfb0c3d1c72".
* `_version` String - La versión en `package.json`.
* `_productName` String - El nombre del producto en el objeto `crashReporter` `options`.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - El nombre de la empresa en el objeto `crashReporter` `options`.
* `upload_file_minidump` File - El informe de fallos en el formato de `minidump`.
* Todas las propiedades de nivel uno del objeto `extra` en el objeto `crashReporter` `options`.
