# netLog

> Logging network events for a session.

Prozess: [Haupt](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

See [`--log-net-log`](command-line-switches.md#--log-net-logpath) to log network events throughout the app's lifecycle.

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

## Methoden

### `netLog.startLogging(path[, options])`

* `path` String - Dateipfad zu den Netzwerk Logfiles.
* `options` Object (optional)
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Beginnt die Aufzeichnung von Netzwerk Events in `path`.

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Beendet die Aufzeichnung der Netzwerk Events. Wenn nicht aufgerufen, dann beendet net die Aufzeichnung automatisch wenn die App beendet wird.

## Eigenschaften

### `netLog.currentlyLogging` _Readonly_

Eine `Boolean` Eigenschaft die anzeigt ob Netzwerk Logs aufgezeichnet werden.

### `netLog.currentlyLoggingPath` _Readonly_ _Deprecated_

Eine `String` Eigenschaft welche den Pfad zur aktuellen Log Datei zurückgibt.
