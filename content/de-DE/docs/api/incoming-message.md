## Klasse: IncomingMessage

> Behandelt Antworten zu HTTP/HTTPS Anfragen.

Prozess: [Main](../glossary.md#main-process)

`IncomingMessage` implementiert das [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) interface und ist somit ein [EventEmitter][event-emitter].

### Instanz Events

#### Event: 'data'

Rückgabewert:

* `chunk` Buffer - Ein Stück der Antwortdaten.

Das `data` Event ist die gewöhnliche Methode um Antwortdaten in Anwendungscode zu transferieren.

#### Event: 'end'

Gibt an dass der Body der Antwort endet. Muss vor dem "Daten"-Ereignis platziert werden.

#### Event: 'aborted'

Ausgegeben wenn eine Anfrage während einer laufenden HTTP Transaktion abgebrochen wurde.

#### Event: 'error'

Rückgabewert:

`error` Fehler - In der Regel enthält eine Fehlerzeichenfolge, die die Fehlerursache identifiziert.

Es wird angezeigt, wenn beim Streaming von Antwortdatenereignissen ein Fehler aufgetreten ist. Wenn Server z. B. den Basiswert schließt, während die Antwort noch Streaming ist, wird ein `error` Ereignis für das Antwortobjekt ausgegeben, und anschließend folgt ein `close` Ereignis für das Anforderungsobjekt.

### Instanz Eigenschaften

Eine `IncomingMessage` -Instanz verfügt über die folgenden lesbaren Eigenschaften:

#### `response.statusCode`

Ein `Integer` , der den HTTP-Antwortstatuscode angibt.

#### `response.statusMessage`

Ein `String` , der die HTTP-Statusmeldung darstellt.

#### `response.headers`

Ein `Record<string, string | string[]>` , der die HTTP-Antwortheader darstellt. Das `headers` -Objekt ist wie folgt formatiert:

* Alle Headernamen sind klein.
* Duplikate von `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`oder `user-agent` werden verworfen.
* `set-cookie` ist immer ein Array. Duplikate werden dem Array hinzugefügt.
* Bei doppelten `cookie` -Headern werden die Werte mit '; '.
* Für alle anderen Header werden die Werte mit ', ' verbunden.

#### `response.httpVersion`

Ein `String` , der die Versionsnummer des HTTP-Protokolls angibt. Typische Werte sind '1.0' oder '1.1'. Darüber hinaus sind `httpVersionMajor` und `httpVersionMinor` zwei lesbaren Eigenschaften mit Ganzzahlwert, die jeweils die HAUPT- und Nebenversionsnummern des HTTP zurückgeben.

#### `response.httpVersionMajor`

Ein `Integer` , der die Hauptversionsnummer des HTTP-Protokolls angibt.

#### `response.httpVersionMinor`

Ein `Integer` , der die Nebenversionsnummer des HTTP-Protokolls angibt.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
