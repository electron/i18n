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

### Note about Node child processes on Linux

If you are using the Node.js `child_process` module and want to report crashes from those processes on Linux, there is an extra step you will need to take to properly initialize the crash reporter in the child process. This is not necessary on Mac or Windows, as those platforms use Crashpad, which automatically monitors child processes.

Since `require('electron')` is not available in Node child processes, the following APIs are available on the `process` object in Node child processes. Note that, on Linux, each Node child process has its own separate instance of the breakpad crash reporter. This is dissimilar to renderer child processes, which have a "stub" breakpad reporter which returns information to the main process for reporting.

#### `process.crashReporter.start(options)`

See [`crashReporter.start()`](#crashreporterstartoptions).

#### `process.crashReporter.getParameters()`

See [`crashReporter.getParameters()`](#crashreportergetparameters).

#### `process.crashReporter.addExtraParameter(key, value)`

See [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value).

#### `process.crashReporter.removeExtraParameter(key)`

See [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey).

## Métodos

El módulo `crashReporter` tiene los siguientes métodos:

### `crashReporter.start(options)`

* `options` Object
  * `submitURL` String (opcional) - URL a la que serán enviados los reportes de fallos como POST. Requerido a menos que `uploadToServer` sea `false`.
  * `productName` String (opcional) - Por defecto `app.name`.
  * `companyName` String (optional) _Deprecated_ - Deprecated alias for `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (octional) - Si los reportes de fallos deberían ser enviados a un servidor. Si es false, los reportes de fallos serán recolectados y almacenados en un directorio de fallas, pero no serán subidos. Por defecto es `true`.
  * `ignoreSystemCrashHandler` Boolean (opcional) - Si es true, los fallos generados en el main process no serán reenviados al gestor de gallos del sistema. Por defecto es `false`.
  * `rateLimit` Boolean (opcional) _macOS_ _Windows_ - Si es true, limita el numero de fallos subidos a 1/hora. Por defecto es `false`.
  * `compress` Boolean (opcional) - Si es true, los reportes de fallos serán comprimidos y subidos con `Content-Encoding: gzip`. Por defecto es `true`.
  * `extra` Record<String, String> (opcional) - Extra string con anotaciónes clave/valor que serán enviados junto con los reportes de fallos en el main process. Sólo se admiten valores de cadena. Los fallos generados en los procesos hijos no contendrán estos parámetros extras, para reportes de fallos generados desde los procesos hijos, llame [`addExtraParameter`](#crashreporteraddextraparameterkey-value) desde el proceso hijo.
  * `globalExtra` Record<String, String> (opcional) - Extra string con anotaciónes clave/valor que serán enviados junto con los reportes de fallos generados en cualquier proceso. Estas anotaciones no pueden ser cambiadas una vez que el crash reporter ha sido iniciado. Si una clave esta presente en los parámetros global extra y en los parámetros extra process-specific, entonces el parámetro global tomará precedencia. Por defecto, `productName` y la versión de la aplicación son incluidas, así como la versión de Electron.

Este método debe ser llamada antes de usar cualquier otra APIs `crashReporter`. Una vez inicializado de esta manera, el crashpad handler recopila los fallos desde todos los procesos creados posteriormente. El crash reporter no puede ser desactiva una vez iniciado.

Este método debería ser llamado tan pronto como sea posible al iniciar la aplicación, preferentemente antes de `app.on('ready')`. Si el crash reporter no está iniciado al tiempo que un renderer process este creado, entonces ese renderer process no será monitoreado por el crash reporter.

**Nota:** Puedes probar el crash reporter generando un fallo usando `process.crash()`.

**Nota:** Si necesitas enviar parámetros `extra` adicionales/actualizados después de tu primera llamada `start` puedes llamar a `addExtraParameter`.

**Nota:** Los parámetros pasados en `extra`, `globalExtra` o establecidos con `addExtraParameter` tienen un limite en la longitud de la llaves y los valores. Los nombre de la llaves deben ser como máximo de 39 bytes de largo, y los valores no deben ser mayor que 127 bytes. Las llaves con nombres más largo que el máximo serán ignoradas de forma silenciosa. Los valores de las llaves más largo que la longitud máxima serán truncados.

**Nota:** Este método solo está disponible en el proceso principal.

### `crashReporter.getLastCrashReport()`

Devuelve [`CrashReport`](structures/crash-report.md) - La fecha y el ID del último reporte de error. Solo los reportes de fallos que han sido alzados serán retornados; incluso si un reporte de fallo esta presente en el disco este no sera retornado a menos que este alzado. En caso de que no haya reportes subidos, `null` es retornado.

**Nota:** Este método solo está disponible en el proceso principal.

### `crashReporter.getUploadedReports()`

Devuelve [`CrashReport []`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

**Nota:** Este método solo está disponible en el proceso principal.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Nota:** Este método solo está disponible en el proceso principal.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Si los reportes deben enviarse o no al servidor.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Nota:** Este método solo está disponible en el proceso principal.

### `crashReporter.addExtraParameter(key, value)`

* `key` String - La clave del parámetro, debe tener menos de 39 bytes.
* `key` String - La clave del parámetro, debe tener menos de 127 bytes.

Establecer un parámetro adicional que se enviará con el informe de fallos. Los valores especificados aquí serán enviados, adicionalmente cualquier valor establecidos a través de la opción `extra` cuando fue llamado `start`.

Los parámetros agregados de esta manera (o a través del parámetro `extra` al `crashReporter.start`) son específicos del proceso de llamada. Agregar parámetros extras en el main process no causarán que esos parámetros sean enviado junto con los fallos del renderer u otros procesos hijos. De manera similar, agregar parámetros extras en un renderer process no dará como resultado que esos parámetros sean enviados con los fallos que ocurren en otros renderer processes o en el main process.

**Nota:** Los parámetros tienen límites de longitud de llaves y valores. Los nombre de la llaves deben ser como máximo de 39 bytes de largo, y los valores no deben ser mayor que 127 bytes. Las llaves con nombres más largo que el máximo serán ignoradas de forma silenciosa. Los valores de las llaves más largo que la longitud máxima serán truncados.

**Nota:** En linux los valores que son más grandes que 127 bytes se dividirá en varias claves, cada una de 127 bytes de longitud.  Por ejemplo. `addExtraParameter('foo', 'a'.repeat(130))` will result in two chunked keys `foo__1` and `foo__2`, the first will contain the first 127 bytes and the second will contain the remaining 3 bytes.  En el backend de informes de fallos, debería unir las claves en este formato.

### `crashReporter.removeExtraParameter(key)`

* `key` String - La clave del parámetro, debe tener menos de 39 bytes.

Remove an extra parameter from the current set of parameters. Los fallos futuros no incluirán este parámetro.

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
* `prod` String - Nombre del producto subyacente. En esta caso Electron.
* `_companyName` Cadena - El nombre de la empresa en el objeto `crashReporter` `options`.
* `upload_file_minidump` File - El informe de fallos en el formato de `minidump`.
* Todas las propiedades de nivel uno del objeto `extra` en el objeto `crashReporter` `options`.
