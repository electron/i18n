# netLog

> Protokollieren von Netzwerkereignissen für eine Sitzung.

Prozess: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.whenReady().then(async () => '
  await netLog.startLogging('/path/to/net-log')
  / Nach einigen Netzwerkereignissen
  const path = await netLog.stopLogging()
  console.log('Net-logs written to
', path)
```

Sehen Sie sich [`--log-net-log`](command-line-switches.md#--log-net-logpath) an, um Netzwerkereignisse während des gesamten App-Lebenszyklus zu protokollieren.

**Hinweis:** Alle Methoden, sofern nicht angegeben, können nur verwendet werden, nachdem das `ready` Ereignis des `app` Moduls ausgesendet wird.

## Methoden

### `netLog.startLogging(path[, optionen])`

* `path` String - Dateipfad zu den Netzwerk Logfiles.
* `options` Objekt (optional)
  * `captureMode` String (optional) - Welche Arten von Daten sollten erfasst werden. Standardmäßig werden standardmäßig nur Metadaten zu Anforderungen erfasst. Wenn Sie dies auf `includeSensitive` festlegen, werden Cookies und Authentifizierungsdaten enthalten. Wenn Sie auf `everything` festlegen, werden alle Bytes enthalten, die auf Sockets übertragen werden. Kann `default`, `includeSensitive` oder `everything`sein.
  * `maxFileSize` Zahl (optional) - Wenn das Protokoll über diese Größe hinaus wächst, wird Protokollierung automatisch beendet. Standardwerte auf unbegrenzt.

Gibt `Promise<void>` zurück - wird aufgelöst, wenn das Netzprotokoll mit der Aufzeichnung begonnen hat.

Beginnt die Aufzeichnung von Netzwerk Events in `path`.

### `netLog.stopLogging()`

Gibt `Promise<void>` zurück - wird aufgelöst, wenn das Netzprotokoll auf den Datenträger geleert wurde.

Beendet die Aufzeichnung der Netzwerk Events. Wenn nicht aufgerufen, dann beendet net die Aufzeichnung automatisch wenn die App beendet wird.

## Eigenschaften

### `netLog.currentlyLogging` _Readonly_

Eine `Boolean` Eigenschaft an, die angibt, ob Netzwerkprotokolle gerade aufgezeichnet werden.
