# crashReporter

> Bestätige Crash Reports zu einem Remote Server

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Im Folgenden finden Sie ein Beispiel für das Einrichten von Electron, um Absturzberichte automatisch an einen Remoteserver zu übermitteln:

```javascript
const { crashReporter } = require('electron')

crashReporter.start(' submitURL: 'https://your-domain.com/url-to-submit'
```

Zum einrichten eines Servers, zum aktzeptieren und verarbeiten von Crash Reports, können sie folgenden Projekte verwenden:

* [Socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Oder verwenden Sie eine gehostete Lösung von Drittanbietern:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Absturzberichte werden vorübergehend gespeichert, bevor sie in ein Verzeichnis hochgeladen werden, das unter dem Benutzerdatenverzeichnis der App liegt (unter Windows und Mac "Crashpad" genannt, oder "Crash Reports" unter Linux). Sie können dieses Verzeichnis überschreiben, indem Sie `app.setPath('crashDumps', '/path/to/crashes')` aufrufen, bevor Sie den Absturz Reporter starten.

Unter Windows und macOS verwendet Electron [-](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) , um Abstürze zu überwachen und zu melden. Unter Linux verwendet Electron [Breakpad-](https://chromium.googlesource.com/breakpad/breakpad/+/master/). Diese ist ein Implementierungsdetail, das von Chromium gesteuert wird, und es kann sich in Zukunft ändern. Insbesondere ist Crashpad neuer und wird wahrscheinlich irgendwann Breakpad auf allen Plattformen ersetzen.

### Hinweis zu untergeordneten Node-Prozessen unter Linux

Wenn Sie das Modul Node.js `child_process` verwenden und Abstürze von diesen Prozessen unter Linux melden möchten, müssen Sie einen zusätzlichen Schritt ausführen, um den Absturzreporter im untergeordneten Prozess richtig zu initialisieren . Dies ist auf Mac oder Windows nicht notwendig, da diese Plattformen Crashpad verwenden, das automatisch untergeordnete Prozesse überwacht .

Da `require('electron')` in untergeordneten Knotenprozessen nicht verfügbar ist, sind die folgenden APIs für das `process` -Objekt in untergeordneten Knotenprozessen verfügbar. Beachten Sie, dass unter Linux jeder untergeordnete Knotenprozess über eine eigene Instanz dem Breakpad-Absturzreporter verfügt. Dies ist unähnlich zu Renderer-Untergeordneten Prozessen, , die über einen "Stub"-Breakpad-Reporter verfügen, der Informationen an den Hauptprozess für die Berichterstattung zurückgibt.

#### `process.crashReporter.start(options)`

Siehe [`crashReporter.start()`](#crashreporterstartoptions).

#### `process.crashReporter.getParameters()`

Siehe [`crashReporter.getParameters()`](#crashreportergetparameters).

#### `process.crashReporter.addExtraParameter(Schlüssel, Wert)`

Siehe [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value).

#### `process.crashReporter.removeExtraParameter(Schlüssel)`

Siehe [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey).

## Methoden

Das `crashReporter` Modul verfügt über die folgenden Methoden:

### `crashReporter.start(Optionen)`

* `options` -Objekt
  * `submitURL` String - URL, an die Absturzberichte als POST gesendet werden.
  * `productName` String (optional) - Standardwerte für `app.name`.
  * `companyName` String (optional) _veraltete_ - Veralteter Alias für `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (optional) - Gibt an, ob Absturzberichte an den Server gesendet werden sollen. Wenn false, werden Absturzberichte gesammelt und im Verzeichnis Abstürze gespeichert, aber nicht hochgeladen. Standard ist `true`.
  * `ignoreSystemCrashHandler` Boolean (optional) - Wenn true, werden abstürzende im Hauptprozess generierte Abstürze nicht an den Systemabsturzhandler weitergeleitet. Standard ist `false`.
  * `rateLimit` boolesch (optional) _macOS_ _Windows_ - Wenn true, begrenzen Sie die Anzahl der hochgeladenen Abstürze auf 1/Stunde. Standard ist `false`.
  * `compress` Boolean (optional) - Wenn true, werden Absturzberichte komprimiert und mit `Content-Encoding: gzip`hochgeladen. Standard ist `true`.
  * `extra` Record<String, String> (optional) - Zusätzliche Zeichenfolgenschlüssel/-wert- Anmerkungen, die zusammen mit Absturzberichten gesendet werden, die im Hauptprozess generiert werden. Es werden nur Zeichenfolgenwerte unterstützt. Abstürze, die in untergeordneten Prozessen generiert werden, enthalten diese zusätzlichen Parameter, um Berichte abzustürzen, die aus untergeordneten Prozessen generiert werden, rufen [`addExtraParameter`](#crashreporteraddextraparameterkey-value) aus dem untergeordneten Prozess auf.
  * `globalExtra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with any crash reports generated in any process. These annotations cannot be changed once the crash reporter has been started. If a key is present in both the global extra parameters and the process-specific extra parameters, then the global one will take precedence. By default, `productName` and the app version are included, as well as the Electron version.

This method must be called before using any other `crashReporter` APIs. Once initialized this way, the crashpad handler collects crashes from all subsequently created processes. The crash reporter cannot be disabled once started.

This method should be called as early as possible in app startup, preferably before `app.on('ready')`. If the crash reporter is not initialized at the time a renderer process is created, then that renderer process will not be monitored by the crash reporter.

**Note:** You can test out the crash reporter by generating a crash using `process.crash()`.

**Note:** If you need to send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter`.

**Note:** Parameters passed in `extra`, `globalExtra` or set with `addExtraParameter` have limits on the length of the keys and values. Key names must be at most 39 bytes long, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** This method is only available in the main process.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md) - The date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

**Note:** This method is only available in the main process.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

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

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called.

Parameters added in this fashion (or via the `extra` parameter to `crashReporter.start`) are specific to the calling process. Adding extra parameters in the main process will not cause those parameters to be sent along with crashes from renderer or other child processes. Similarly, adding extra parameters in a renderer process will not result in those parameters being sent with crashes that occur in other renderer processes or in the main process.

**Note:** Parameters have limits on the length of the keys and values. Key names must be no longer than 39 bytes, and values must be no longer than 20320 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** On linux values that are longer than 127 bytes will be chunked into multiple keys, each 127 bytes in length.  z.B. `addExtraParameter('foo', 'a'.repeat(130))` will result in two chunked keys `foo__1` and `foo__2`, the first will contain the first 127 bytes and the second will contain the remaining 3 bytes.  On your crash reporting backend you should stitch together keys in this format.

### `crashReporter.removeExtraParameter(key)`

* `key` String - Parameter key, must be no longer than 39 bytes.

Remove an extra parameter from the current set of parameters. Future crashes will not include this parameter.

### `crashReporter.getParameters()`

Returns `Record<String, String>` - The current 'extra' parameters of the crash reporter.

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.
