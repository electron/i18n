# crashReporter

> Envía los informes de fallos a un servidor remoto.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El siguiente es un ejemplo de como configurar Electron para que envié automáticamente reportes de error a un servidor remoto:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

Para configurar un servidor que acepte y procese los informes de fallos, se pueden utilizar los siguientes proyectos:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

O utilice una solución alojada por terceros:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Los reportes de errores son almacenados temporalmente antes de ser alzados en un directorio debajo del directorio de datos del usuario (llamado 'Crashpad' en Windows y Mac o 'Crash Reports' en Linux). Puedes sobrescribir este directorio llamando a `app.setPath('crashDumps', '/path/to/crashes')` antes de iniciar al crash reporter.

En Windows y macOS, Electron usa [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) para monitorear y reportar fallos. En Linux, Electron usa [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/). Este es un detalle de implementación impulsado por Chromium y puede cambiar en el futuro. En particular, crashpad es más nuevo y es probable que eventualmente reemplace a breakpad en todas las plataformas.

## Métodos

El módulo `crashReporter` tiene los siguientes métodos:

### `crashReporter.start(options)`

* `options` Object
  * `submitURL` String - URL a donde se enviarán los informes de errores como un POST.
  * `productName` String (opcional) - Por defecto `app.name`.
  * `companyName` String (optional) _Deprecated_ - Deprecated alias for `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (octional) - Si los reportes de fallos deberían ser enviados a un servidor. Si es false, los reportes de fallos serán recolectados y almacenados en un directorio de fallas, pero no serán subidos. Por defecto es `true`.
  * `ignoreSystemCrashHandler` Boolean (opcional) - Si es true, los fallos generados en el main process no serán reenviados al gestor de gallos del sistema. Por defecto es `false`.
  * `rateLimit` Boolean (opcional) _macOS_ _Windows_ - Si es true, limita el numero de fallos subidos a 1/hora. Por defecto es `false`.
  * `compress` Boolean (optional) _macOS_ _Windows_ - If true, crash reports will be compressed and uploaded with `Content-Encoding: gzip`. Not all collection servers support compressed payloads. Por defecto es `false`.
  * `extra` Record<String, String> (opcional) - Extra string con anotaciónes clave/valor que serán enviados junto con los reportes de fallos en el main process. Sólo se admiten valores de cadena. Los fallos generados en los procesos hijos no contendrán estos parámetros extras, para reportes de fallos generados desde los procesos hijos, llame [`addExtraParameter`](#crashreporteraddextraparameterkey-value) desde el proceso hijo.
  * `globalExtra` Record<String, String> (opcional) - Extra string con anotaciónes clave/valor que serán enviados junto con los reportes de fallos generados en cualquier proceso. Estas anotaciones no pueden ser cambiadas una vez que el crash reporter ha sido iniciado. Si una clave esta presente en los parámetros global extra y en los parámetros extra process-specific, entonces el parámetro global tomará precedencia. Por defecto, `productName` y la versión de la aplicación son incluidas, así como la versión de Electron.

Este método debe ser llamada antes de usar cualquier otra APIs `crashReporter`. Once initialized this way, the crashpad handler collects crashes from all subsequently created processes. The crash reporter cannot be disabled once started.

This method should be called as early as possible in app startup, preferably before `app.on('ready')`. If the crash reporter is not initialized at the time a renderer process is created, then that renderer process will not be monitored by the crash reporter.

**Note:** You can test out the crash reporter by generating a crash using `process.crash()`.

**Note:** If you need to send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter`.

**Note:** Parameters passed in `extra`, `globalExtra` or set with `addExtraParameter` have limits on the length of the keys and values. Key names must be at most 39 bytes long, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getLastCrashReport()`

Devuelve [`CrashReport`](structures/crash-report.md) - La fecha y el ID del último reporte de error. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. En caso de que no haya reportes subidos, `null` es retornado.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getUploadedReports()`

Devuelve [`CrashReport []`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getCrashesDirectory()` _Deprecated_

Devuelve `String` - El directorio donde los errores son almacenados temporalmente antes de ser cargados.

**Note:** This method is deprecated, use `app.getPath('crashDumps')` instead.

### `crashReporter.addExtraParameter(key, value)`

* `key` String - Parameter key, must be no longer than 39 bytes.
* `value` String - Parameter value, must be no longer than 127 bytes.

Establecer un parámetro adicional que se enviará con el informe de fallos. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called.

Parameters added in this fashion (or via the `extra` parameter to `crashReporter.start`) are specific to the calling process. Adding extra parameters in the main process will not cause those parameters to be sent along with crashes from renderer or other child processes. Similarly, adding extra parameters in a renderer process will not result in those parameters being sent with crashes that occur in other renderer processes or in the main process.

**Note:** Parameters have limits on the length of the keys and values. Key names must be no longer than 39 bytes, and values must be no longer than 20320 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** On linux values that are longer than 127 bytes will be chunked into multiple keys, each 127 bytes in length.  Por ejemplo. `addExtraParameter('foo', 'a'.repeat(130))` will result in two chunked keys `foo__1` and `foo__2`, the first will contain the first 127 bytes and the second will contain the remaining 3 bytes.  On your crash reporting backend you should stitch together keys in this format.

### `crashReporter.removeExtraParameter(key)`

* `key` String - Parameter key, must be no longer than 39 bytes.

Remove a extra parameter from the current set of parameters. Future crashes will not include this parameter.

### `crashReporter.getParameters()`

Devuelve `Record<String, String>` - Los parámetros 'extra' actuales del reportador de errores.

## Carga útil del informe de fallos

El informador de fallos enviará la siguiente información al `submitURL` como un `multipart/form-data` `POST`:

* `ver` String - La versión de Electron.
* `platform` String - por ejemplo, "win32".
* `process_type` String - por ejemplo, "renderer".
* `guid` String - por ejemplo, "5e1286fc-da97-479e-918b-6bfb0c3d1c72".
* `_version` Cadena - La versión en `package.json`.
* `_productName` String - El nombre del producto en el objeto `crashReporter` `options`.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` Cadena - El nombre de la empresa en el objeto `crashReporter` `options`.
* `upload_file_minidump` File - El informe de fallos en el formato de `minidump`.
* Todas las propiedades de nivel uno del objeto `extra` en el objeto `crashReporter` `options`.
