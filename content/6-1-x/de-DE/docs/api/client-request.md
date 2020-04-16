## Klasse: ClientRequest

> Tätigen von HTTP/HTTPS anfragen.

Prozess: [Haupt](../glossary.md#main-process)

`ClientRequest` implementiert die [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)-Schnittstelle und ist somit ein [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Object (optional) - Die zur Anfrage gehörende [`Session`](session.md) Instanz.
  * `partition` String (optional) - Der Name der zur Anfrage gehörenden [`partition`](session.md). Standard ist ein leerer String. Die `session` Option überwiegt `partition`. Somit, falls eine `session` explizit angegeben wird, wird `partition` ignoriert.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - Der Server Host angegeben als eine Zusammensetzung aus Hostnamen und der Port Nummer 'hostname:port'.
  * `hostname` String (optional) - Der Server Host Name.
  * `port` Integer (optional) - Die Port Nummer des Servers.
  * `path` String (optional) - Der Pfad Teil der Anfrage URL.
  * `redirect` String (optional) - Der Umleitungs-Modus für die Anfrage. Sollte eines der Folgenden sein: `follow`, `error` oder `manual`. Standardwert ist `follow`. Falls der Modus `error` ist, werden alle Weiterleitungen abgebrochen. Wenn der Modus `manual` ist, werden alle Weiterleitungen aufgeschoben bis [`request.followRedirect`](#requestfollowredirect) aufgerufen wird. Warte in diesem Modus auf das [`redirect`](#event-redirect) Event um mehr Informationen über die Weiterleitungs-Anforderungen zu erhalten.

`options` Eigenschaften wie zum Beispiel `protocol`, `host`, `hostname`, `port` und `path`, folgen strikt dem Node.js Modell, wie im [URL](https://nodejs.org/api/url.html) Modul beschrieben.

Zum Beispiel hätten wir die gleiche Anfrage an "github.com" wie folgt erstellen können:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Instanz-Ereignisse

#### Event: 'response'

Rückgabewert:

* `response` Eingehende Nachricht - Ein Objekt, welches die HTTP Antwort Nachricht repräsentiert.

#### Event: 'login'

Rückgabewert:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Ausgegeben, wenn ein Authentifizierung Proxy die Benutzeranmeldeinformationen anfragt.

Die `callback` Funktion erwartet mit den Benutzerdaten aufgerufen zu werden:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```
Das nicht Angeben von Anmeldeinformationen wird die Anfrage abbrechen und dem Response-Objekt einen Authentifizierungsfehler melden:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Event: 'finish'

Ausgesendet, direkt nachdem der letzte Block der `request` Daten in das `request` Objekt geschrieben worden sind.

#### Event: 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Event: 'error'

Rückgabewert:

* `error` Error - Ein Error Objekt, welches Informationen über den Fehler enthält.

Ausgegeben, wenn das `net` Modul es nicht schaft eine Netzwerkanfrage zu senden. In der Regel wenn das `request` Objekt ein `error` Event auslöst, folgt ein `close` Event und es wird kein response Objekt zur Verfügung gestellt.

#### Event: 'close'

Ausgelöst als letztes Event in der HTTP request-response Interaktion. Das `close` Event gibt an, dass keine weiteren Events mehr auf die `request` oder `response` Objekte ausgelöst werden.


#### Event: 'redirect'

Rückgabewert:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Instanz Eigenschaften

#### `request.chunkedEncoding`

Ein `Boolean` gibt an, ob die HTTP Anfrage eine segmentierte Übertragungscodierung nutzt oder nicht. Der Standardwert ist false. Die Eigenschaft ist lesbar und beschreibbar, jedoch kann dies nur eingestellt werden, bevor der ersten Schreib-Operation, da die HTTP headers noch nicht abgeschickt worden sind. Der Versuch die `chunkedEncoding` Eigenschaft nach der ersten Übertragung zu ändern, wird einen Fehler verursachen.

Das Benutzen von segmentierter Codierung wird dringend empfohlen, wenn du einen großen request body senden möchtest, da die Daten in kleinen Stücken gestreamt wird, anstatt das diese intern im Electron Prozess Speicher gebufferd werden.

### Beispiel Methoden

#### `request.setHeader(name, value)`

* `name` String - Ein extra HTTP header Name.
* `value` Object - Ein extra HTTP header Wert.

Fügt einen extra HTTP header hinzu. Der Header-Name wird ausgestellt, da es ohne Standardspeicherort ist. Es kann nur vor dem ersten Schreiben aufgerufen werden. Das Aufrufen der Methode nachdem das erste Schreiben erfolgte, wird einen Fehler erzeugen. Falls der übergebene wert kein `String` ist, wird die `toString()` Methode aufgerufen, um den Finalen wert zu erhalten.

#### `request.getHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Gibt ein `Object` wieder - Den wert des davor gesetzten extra Header Namen.

#### `request.removeHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (optional) - Wird aufgerufen, nachdem der Schreibvorgang beendet ist.

`callback` ist im Wesentlichen eine dummy-Funktion die dem Zweck dient, Ähnlichkeiten mit der Node.js API beizubehalten. Es wird in den nächsten Tick asynchron aufgerufen, nachdem der `chunk` Inhalt auf der Chromium Netzwerkebene geliefert worden ist. Im Gegensatz zu der Node.js Implementierung, ist es nicht Garantiert das der `chunk` Inhalt hochgeladen worden ist, vor dem Aufrufen von `callback`.

Fügt einen Teil der Daten zum request body. Der erste Schreiboperation könnte das hochladen des request headers einleiten. Nach der ersten Schreiboperation, ist es nicht mehr erlaubt, Benutzerdefinierte Header hinzuzufügen oder zu entfernen.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Funktion (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Bricht die laufende HTTP-Interaktion ab. Falls die Anfrage bereits das `close` Event ausgegeben hat, hat der Abbruch-Aktion keinen Effekt. Ansonsten wird ein laufendes Event `abort` und `close` Events ausgeben. Zusätzlich, falls es ein laufendes response-Objekt gibt, wir dieses ein `aborted` Event ausgeben.

#### `request.followRedirect()`

Setzt alle aufgeschobenen Weiterleitungsanfragen fort, falls der Weiterleitung Modus `manual` ist.

#### `request.getUploadProgress()`

Gibt das `Object` zurück:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - Die Anzahl der bereits hochgeladenen Bytes
* `total` Integer - Die Anzahl der Bytes, die für diese Anforderung hochgeladen werden

Sie können diese Methode in Verbindung mit `POST`-Anfragen verwenden, um den Fortschritt von einem Datei-Upload oder einer anderen Datenübertragung abzurufen.
