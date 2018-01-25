# crashReporter

> Envía los informes de fallas a un servidor remoto.

Proceso [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

A continuación, un ejemplo de un envío automático de un informe de fallos a un servidor remoto:

```javascript
const {crashReporter} = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

Para configurar un servidor que acepte y procese los informes de fallo, se puede utilizar los siguientes proyectos:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Los reportes de fallos se guardan localmente en una carpeta de directorio temporal específica de la aplicación. Para un `productName` de `YourName`, los informes de fallos serán almacenados en una carpeta llamada `YourName Crashes` dentro del directorio temporal. Se puede personalizar esta ubicación del directorio temporal para la aplicación llamando a la API `app.setPath('temp', '/my/custom/temp')` antes de activar el informador de fallos.

## Métodos

El módulo `crashReporter` tiene los siguientes métodos:

### `crashReporter.start(options)`

* `options` Objeto 
  * `companyName` Cadena (opcional)
  * `submitURL` Cadena - Un URL a donde se enviarán los reportes de fallos como un POST.
  * `productName` Cadena (opcional) - Por defecto es `app.getName()`.
  * `uploadToServer` Booleano (opcional) - Si los informes de fallo deben enviarse o no al servidor. Por defecto es `true`.
  * `ignoreSystemCrashHandler` Booleano (opcional) - Por defecto es `false`.
  * `extra` Objeto (opcional) - Un objeto que se puede definir que será enviado a través del informe. Solo las propiedades de la cadena son enviadas correctamente. No se admiten objetos anidados y los nombres de propiedades y valores tener menos de 64 caracteres.

Es necesario llamar este método antes de utilizar cualquier otra API `crashReporter` y en cada proceso (main/renderer) del cual se quiera recopilar los informes de fallos. Se puede pasar diferentes opciones al `crashReporter.start` al llamar desde diferentes procesos.

**Nota** Los procesos secundarios creados mediante el módulo `child_process` no tendrá acceso a los módulos de Electron. Por lo tanto, para recopilar los informes de fallos de ellos, se utiliza en su lugar `process.crashReporter.start`. Pasar las mismas opciones anteriormente mencionadas con otro adicional llamado `crashesDirectory` que debe apuntar a un directorio para almacenar los informes de fallos temporalmente. Se puede probar esto llamando `process.crash()` para hacer fallar el proceso secundario.

**Nota:** para recopilar los informes de fallos de los procesos secundarios en Windows, es necesario añadir este código extra. Esto iniciará el proceso que monitoreará y enviará los informes de fallos. Reemplazar `submitURL`, `productName` y `crashesDirectory` con los valores adecuados.

**Nota:** Si necesita enviar parámetros adicionales o actualizados `extra` después de llamar `Inicio` puede llamar `setExtraParameter` en macOS o llame a `start` otra vez con los parámetros nuevos o actualizados `extra` en Linux y Windows.

```js
 const args = [
   `--reporter-url=${submitURL}`,
   `--application-name=${productName}`,
   `--crashes-directory=${crashesDirectory}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**Nota:** En macOS, Electron utiliza un nuevo cliente `crashpad` para recopilar e informar fallos. Si desea habilitar el informe de fallos, se requiere inicializar `crashpad` desde el proceso principal utilizando `crashReporter.start`, independientemente del proceso del cual se desea recopilar los fallos. Una vez inicializado, el controlador de crashpad recopila los fallos de todos los procesos. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. If no crash reports have been sent or the crash reporter has not been started, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.setExtraParameter(key, value)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long. Specifying `null` or `undefined` will remove the key from the extra parameters.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.