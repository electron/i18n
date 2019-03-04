# netLog

> Logging network events for a session.

Prozess: [Haupt](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', function () {
  netLog.startLogging('/path/to/net-log')
  // Nach einigen Netzwerk Events
  netLog.stopLogging(path => {
    console.log('Net-logs written to', path)
  })
})
```

See [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) to log network events throughout the app's lifecycle.

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

## Methoden

### `netLog.startLogging(path)`

* `path` String - Dateipfad zu den Netzwerk Logfiles.

Beginnt die Aufzeichnung von Netzwerk Events in `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (optional) 
  * `path` String - Pfad zur Datei in welche die Netzwerk Events geschrieben wurden.

Beendet die Aufzeichnung der Netzwerk Events. Wenn nicht aufgerufen, dann beendet net die Aufzeichnung automatisch wenn die App beendet wird.

## Eigenschaften

### `netLog.currentlyLogging`

Eine `Boolean` Eigenschaft die anzeigt ob Netzwerk Logs aufgezeichnet werden.

### `netLog.currentlyLoggingPath`

Eine `String` Eigenschaft welche den Pfad zur aktuellen Log Datei zurückgibt.