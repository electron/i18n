## Klasse: ClientRequest

> Tätigen von HTTP/HTTPS anfragen.

Prozess: [Haupt](../glossary.md#main-process)

`ClientRequest` implementiert die [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)-Schnittstelle und ist somit eine [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(optionen)`

* `optionen` (Object | String) - Wenn `optionen` ein String ist, wird dieser als die request URL interpretiert. Wenn es ein Objekt ist, wird erwartet das dieses ein HTTP anfrage komplett spezifiziert, mittels den folgenden Eigenschaften: 
  * `method` String (optional) - The HTTP anfrage Methode. Der Standardwert ist die GET Methode.
  * `url` String (optional) - Die Angefragte URL. Muss in der absoluten Form angegeben werden, welche den Protokoll Schema von HTTP oder HTTPS entspricht.
  * `session` Object (optional) - Der [`Session`](session.md) Fall, welcher mit der Anfrage zusammenhängt.
  * `partition` String (optional) - Der name der [`partition`](session.md) mit welcher der Anfrage in Verbindung steht. Standard ist ein leerer String. Die `session` option überwiegt `partition`. Somit, falls eine `session` explizit angegeben wird, wird `partition` ignoriert.
  * `protocol` String (optional) - Das Protokoll Schema im 'scheme' Formular:. Die momentan unterstützten Werte sind 'http:' oder 'https:' Der Standardwert ist 'http:'.
  * `host` String (optional) - Der Server Host angegeben als eine Zusammensetzung von dem Hostnamen und der Port Nummer 'hostname:port'
  * `hostname` String (optional) - Der Server Host Name.
  * `port` Integer (optional) - Die Port Nummer des Servers.
  * `path` String (optional) - Der Pfad teil der URL Anfrage.
  * `redirect` String (optional) - Der Umleitung-Modus für die Anfrage. Sollte eins der folgenden sein: `follow`, `error` or `manual`. Der Standardwert ist `follow`. Falls der Modus `error` ist, werden alle Weiterleitungen abgebrochen. Wenn der Modus `manual` ist, werden alle Weiterleitungen aufgeschoben bis [`request.followRedirect`](#requestfollowRedirect) aufgerufen wird. Höre nach dem [`redirect`](#event-redirect) Event in diesem Modus um mehr Informationen über die Weiterleitungs-Anforderungen zu erhalten.

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

### Beispiel Events

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
* `callback` Funktion 
  * `username` String
  * `password` String

Ausgegeben, wenn ein Authentifizierung Proxy die Benutzeranmeldeinformationen anfragt.

The `callback` Funktion erwartet zurückgerufen zu werden mit den Benutzerdaten:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Das nicht angeben von Anmeldeinformationen wird die Anfrage abbrechen und einen Authentifizierungsfehler auf das Response-Objekt melden:

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

Ausgesendet, wenn `request` abgebrochen wird. Das `abort` Event wird nicht ausgelöst, wenn `request` bereits geschlossen ist.

#### Event: 'error'

Rückgabewert:

* `error` Fehler - Ein Fehler Objekt, welches Informationen über den Fehler enthält.

Ausgegeben, wenn das `net` Modul es nicht schaft eine Netzwerkanfrage zu senden. In der Regel wenn das `request` Objekt ein `error` Event auslöst, folgt ein `close` Event und es wird kein response Objekt zur Verfügung gestellt.

#### Event: 'close'

Ausgelöst als letztes Event in der HTTP request-response Interaktion. Das `close` Event gibt an, dass keine weiteren Events mehr auf die `request` oder `response` Objekte ausgelöst werden.

#### Event: 'redirect'

Rückgabewert:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Ausgelöst, wenn es eine Weiterleitung gibt und der Modus `manual` ist. Der Aufruf von [`request.followRedirect`](#requestfollowRedirect) wird die Weiterleitung fortsetzen.

### Fall Eigenschaften

#### `request.chunkedEncoding`

Ein `Boolean` gibt an, ob die HTTP Anfrage eine segmentierte Übertragungscodierung nutzt oder nicht. Der Standardwert ist false. Die Eigenschaft ist lesbar und beschreibbar, jedoch kann dies nur eingestellt werden, bevor der ersten Schreib-Operation, da die HTTP headers noch nicht abgeschickt worden sind. Der Versuch die `chunkedEncoding` Eigenschaft nach der ersten Übertragung zu ändern, wird einen Fehler verursachen.

Das Benutzen von segmentierter Codierung wird dringend empfohlen, wenn du einen großen request body senden möchtest, da die Daten in kleinen Stücken gestreamt wird, anstatt das diese intern im Electron Prozess Speicher gebufferd werden.

### Beispiel Methoden

#### `request.setHeader(name, value)`

* `name` String - Ein extra HTTP header Name.
* `value` Object - Ein extra HTTP header Wert.

Fügt einen extra HTTP header hinzu. Der Header-Name wird ausgestellt, da es ohne Standardspeicherort ist. Es kann nur vor dem ersten Schreiben aufgerufen werden. Das Aufrufen der Methode nachdem das erste Schreiben erfolgte, wird einen Fehler erzeugen. If the passed value is not a `String`, its `toString()` method will be called to obtain the final value.

#### `request.getHeader(name)`

* `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Specify an extra header name.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (optional) - Called after the write operation ends.

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Contrary to the Node.js implementation, it is not guaranteed that `chunk` content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on the wire. After the first write operation, it is not allowed to add or remove a custom header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Cancels an ongoing HTTP transaction. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Continues any deferred redirection request when the redirection mode is `manual`.