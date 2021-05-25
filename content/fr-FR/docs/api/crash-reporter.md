# crashReporter

> Soumet un rapport de plantage à un serveur distant.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

The following is an example of setting up Electron to automatically submit crash reports to a remote server:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

Pour configurer un serveur pour accepter et traiter les rapports de plantage, vous pouvez utiliser les projets suivants :

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Ou utilisez une solution hébergée par un tiers :

* [Trace d'appels](https://backtrace.io/electron/)
* [Sentinelle](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Crash reports are stored temporarily before being uploaded in a directory underneath the app's user data directory (called 'Crashpad' on Windows and Mac, or 'Crash Reports' on Linux). You can override this directory by calling `app.setPath('crashDumps', '/path/to/crashes')` before starting the crash reporter.

On Windows and macOS, Electron uses [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) to monitor and report crashes. Sous Linux, Electron utilise [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/). This is an implementation detail driven by Chromium, and it may change in future. In particular, crashpad is newer and will likely eventually replace breakpad on all platforms.

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

## Méthodes

Le module `crashReporter` dispose des méthodes suivantes :

### `crashReporter.start(options)`

* Objet `options`
  * `submitURL` String (optional) - URL that crash reports will be sent to as POST. Required unless `uploadToServer` is `false`.
  * `productName` String (facultatif) - `app.name`.
  * `companyName` String (optional) _Deprecated_ - Deprecated alias for `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. If false, crash reports will be collected and stored in the crashes directory, but not uploaded. La valeur par défaut est `true`.
  * `ignoreSystemCrashHandler` Boolean (optional) - If true, crashes generated in the main process will not be forwarded to the system crash handler. Par défaut la valeur est `false`.
  * `rateLimit` Boolean (optional) _macOS_ _Windows_ - If true, limit the number of crashes uploaded to 1/hour. Par défaut la valeur est `false`.
  * `compress` Boolean (optional) - If true, crash reports will be compressed and uploaded with `Content-Encoding: gzip`. La valeur par défaut est `true`.
  * `extra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with crash reports that are generated in the main process. Only string values are supported. Crashes generated in child processes will not contain these extra parameters to crash reports generated from child processes, call [`addExtraParameter`](#crashreporteraddextraparameterkey-value) from the child process.
  * `globalExtra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with any crash reports generated in any process. These annotations cannot be changed once the crash reporter has been started. If a key is present in both the global extra parameters and the process-specific extra parameters, then the global one will take precedence. By default, `productName` and the app version are included, as well as the Electron version.

This method must be called before using any other `crashReporter` APIs. Once initialized this way, the crashpad handler collects crashes from all subsequently created processes. The crash reporter cannot be disabled once started.

This method should be called as early as possible in app startup, preferably before `app.on('ready')`. If the crash reporter is not initialized at the time a renderer process is created, then that renderer process will not be monitored by the crash reporter.

**Note:** You can test out the crash reporter by generating a crash using `process.crash()`.

**Note:** If you need to send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter`.

**Note:** Parameters passed in `extra`, `globalExtra` or set with `addExtraParameter` have limits on the length of the keys and values. Key names must be at most 39 bytes long, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** This method is only available in the main process.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md) - The date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. Dans le cas où il n'y a pas de rapports téléchargés, `null` est retourné.

**Note:** This method is only available in the main process.

### `crashReporter.getUploadedReports()`

Retourne [`CrashReport[]`](structures/crash-report.md) :

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

**Note:** This method is only available in the main process.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This method is only available in the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This method is only available in the main process.

### `crashReporter.addExtraParameter(key, value)`

* `key` String - Parameter key, must be no longer than 39 bytes.
* `value` String - Parameter value, must be no longer than 127 bytes.

Définit un paramètre supplémentaire à envoyer avec le rapport de plantage. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called.

Parameters added in this fashion (or via the `extra` parameter to `crashReporter.start`) are specific to the calling process. Adding extra parameters in the main process will not cause those parameters to be sent along with crashes from renderer or other child processes. Similarly, adding extra parameters in a renderer process will not result in those parameters being sent with crashes that occur in other renderer processes or in the main process.

**Note:** Parameters have limits on the length of the keys and values. Key names must be no longer than 39 bytes, and values must be no longer than 20320 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** On linux values that are longer than 127 bytes will be chunked into multiple keys, each 127 bytes in length.  Exemple : `addExtraParameter('foo', 'a'.repeat(130))` will result in two chunked keys `foo__1` and `foo__2`, the first will contain the first 127 bytes and the second will contain the remaining 3 bytes.  On your crash reporting backend you should stitch together keys in this format.

### `crashReporter.removeExtraParameter(key)`

* `key` String - Parameter key, must be no longer than 39 bytes.

Remove an extra parameter from the current set of parameters. Future crashes will not include this parameter.

### `crashReporter.getParameters()`

Returns `Record<String, String>` - The current 'extra' parameters of the crash reporter.

## Payload du Crash Report

Le rapporteur de plantage enverra les données suivantes à `submitURL` comme un `POST` en `multipart/form-data` :

* `ver` String - La version d'Electron.
* `platform` String - Par exemple 'win32'.
* `process_type` String - Par exemple 'renderer'.
* `guid` String - Par exemple '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - La version dans `package.json`.
* `_productName` String - Le nom du produit dans l'objet `options` de `crashReporter`.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - Le nom de l'entreprise dans l'objet `options` de `crashReporter`.
* `upload_file_minidump` File - Le rapport d'incident dans le format `minidump`.
* Toutes les propriétés de niveau 1 de l'objet `extra` dans l'objet `options` de `crashReporter`.
