## Klasse: ClientRequest

> Tätigen von HTTP/HTTPS anfragen.

Prozess: [Haupt](../glossary.md#main-process)

`ClientRequest` implementiert die [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)-Schnittstelle und ist somit ein [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - Wenn `options` ein String ist, wird dieser als die request URL interpretiert. Wenn es ein Objekt ist, wird erwartet das dieses ein HTTP anfrage komplett spezifiziert, mittels den folgenden Eigenschaften: 
  * `method` String (optional) - Die HTTP Anfrage Methode. Standardwert ist die GET Methode.
  * `url` String (optional) - Die angefragte URL. Muss in der absoluten Form angegeben werden, welche dem Protokoll Schema von HTTP oder HTTPS entspricht.
  * `session` Session (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partition` String (optional) - Der Name der zur Anfrage gehörenden [`partition`](session.md). Standard ist ein leerer String. Die `session` Option überwiegt `partition`. Somit, falls eine `session` explizit angegeben wird, wird `partition` ignoriert.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session. This will make the `net` request's cookie behavior match a `fetch` request. Standard ist `false`.
  * `protocol` String (optional) - Das Protokoll Schema im 'scheme:' Format. Die momentan unterstützten Werte sind 'http:' oder 'https:'. Standardwert ist 'http:'.
  * `host` String (optional) - Der Server Host angegeben als eine Zusammensetzung aus Hostnamen und der Port Nummer 'hostname:port'.
  * `hostname` String (optional) - Der Server Host Name.
  * `port` Integer (optional) - Die Port Nummer des Servers.
  * `path` String (optional) - Der Pfad Teil der Anfrage URL.
  * `redirect` String (optional) - Der Umleitungs-Modus für die Anfrage. Sollte eines der Folgenden sein: `follow`, `error` oder `manual`. Standardwert ist `follow`. Falls der Modus `error` ist, werden alle Weiterleitungen abgebrochen. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.

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

### Instanz Events

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
  * `username` String (optional)
  * `password` String (optional)

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

Ausgesendet, wenn `request` abgebrochen wird. Das `abort` Event wird nicht ausgelöst, wenn `request` bereits geschlossen ist.

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
* `responseHeaders` Record<String, String[]>

Emitted when the server returns a redirect response (e.g. 301 Moved Permanently). Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection. If this event is handled, [`request.followRedirect`](#requestfollowredirect) must be called **synchronously**, otherwise the request will be cancelled.

### Instanz Eigenschaften

#### `request.chunkedEncoding`

Ein `Boolean` gibt an, ob die HTTP Anfrage eine segmentierte Übertragungscodierung nutzt oder nicht. Der Standardwert ist false. Die Eigenschaft ist lesbar und beschreibbar, jedoch kann dies nur eingestellt werden, bevor der ersten Schreib-Operation, da die HTTP headers noch nicht abgeschickt worden sind. Der Versuch die `chunkedEncoding` Eigenschaft nach der ersten Übertragung zu ändern, wird einen Fehler verursachen.

Das Benutzen von segmentierter Codierung wird dringend empfohlen, wenn du einen großen request body senden möchtest, da die Daten in kleinen Stücken gestreamt wird, anstatt das diese intern im Electron Prozess Speicher gebufferd werden.

### Beispiel Methoden

#### `request.setHeader(name, value)`

* `name` String - Ein extra HTTP header Name.
* `value` String - An extra HTTP header value.

Fügt einen extra HTTP header hinzu. The header name will be issued as-is without lowercasing. Es kann nur vor dem ersten Schreiben aufgerufen werden. Das Aufrufen der Methode nachdem das erste Schreiben erfolgte, wird einen Fehler erzeugen. Falls der übergebene wert kein `String` ist, wird die `toString()` Methode aufgerufen, um den Finalen wert zu erhalten.

#### `request.getHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Returns `String` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Entfernt den zuvor gesetzten extra Header Namen. Diese Methode kann nur vor dem ersten Schreiben aufgerufen werden. Der Versuch diese Methode danach Aufzurufen, wird einen Fehler erzeugen.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - Ein Teil der Requests body Daten. Falls der wert ein String ist, wird dieser in einen Buffer konvertiert, mittels einer spezifischen Codierung.
* `encoding` String (optional) - Wird benutzt um einen String chunk in ein Buffer Objekt zu konvertieren. Der Standardwert ist 'utf-8'.
* `callback` Function (optional) - Wird aufgerufen, nachdem der Schreibvorgang beendet ist.

`callback` ist im Wesentlichen eine dummy-Funktion die dem Zweck dient, Ähnlichkeiten mit der Node.js API beizubehalten. Es wird in den nächsten Tick asynchron aufgerufen, nachdem der `chunk` Inhalt auf der Chromium Netzwerkebene geliefert worden ist. Im Gegensatz zu der Node.js Implementierung, ist es nicht Garantiert das der `chunk` Inhalt hochgeladen worden ist, vor dem Aufrufen von `callback`.

Fügt einen Teil der Daten zum request body. Der erste Schreiboperation könnte das hochladen des request headers einleiten. Nach der ersten Schreiboperation, ist es nicht mehr erlaubt, Benutzerdefinierte Header hinzuzufügen oder zu entfernen.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Funktion (optional)

Sendet den letzten Teil der request Daten. Nachfolgende Schreib- oder End Vorgänge sind nicht mehr erlaubt. Das `finish` Event wird nach dem End Vorgang aufgerufen.

#### `request.abort()`

Bricht die laufende HTTP-Interaktion ab. Falls die Anfrage bereits das `close` Event ausgegeben hat, hat der Abbruch-Aktion keinen Effekt. Ansonsten wird ein laufendes Event `abort` und `close` Events ausgeben. Zusätzlich, falls es ein laufendes response-Objekt gibt, wir dieses ein `aborted` Event ausgeben.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Gibt das `Object` zurück:

* `active` Boolean - Ob die Anfrage gerade aktiv ist. Wenn das falsch ist, werden keine anderen Eigenschaften festgelegt
* `started` Boolean - Ob der Upload gestartet wurde. Wenn dies falsch ist, werden `current` und `total` auf 0 gesetzt werden.
* `current` Integer - Die Anzahl der bereits hochgeladenen Bytes
* `total` Integer - Die Anzahl der Bytes, die für diese Anforderung hochgeladen werden

Sie können diese Methode in Verbindung mit `POST`-Anfragen verwenden, um den Fortschritt von einem Datei-Upload oder einer anderen Datenübertragung abzurufen.