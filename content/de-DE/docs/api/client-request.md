## Klasse: ClientRequest

> Tätigen von HTTP/HTTPS anfragen.

Prozess: [Main](../glossary.md#main-process)

`ClientRequest` implementiert die [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)-Schnittstelle und ist somit ein [EventEmitter][event-emitter].

### `new ClientRequest(options)`

* `options` (Objekt-| String) - Wenn `options` eine Zeichenfolge ist, wird sie als der Anforderungs-URL interpretiert. Wenn es sich um ein Objekt handelt, wird erwartet, dass es eine HTTP-Anforderung vollständig über die folgenden eigenschaften :
  * `method` String (optional) - Die HTTP-Anforderungsmethode. Standardmäßig wird die GET -Methode verwendet.
  * `url` String (optional) - Die Anforderungs-URL. Muss in der absoluten Form mit dem Protokollschema angegeben als http oder https angegeben werden.
  * `session` Session (optional) - Die [`Session`](session.md) Instanz mit denen die Anforderung zugeordnet ist.
  * `partition` String (optional) - Der Name der zur Anfrage gehörenden [`partition`](session.md). Standard ist ein leerer String. Die Option `session` ersetzt `partition`. Somit, falls eine `session` explizit angegeben wird, wird `partition` ignoriert.
  * `credentials` String (optional) - Kann `include` oder `omit`werden. Gibt an, ob mit dieser Anforderung [Anmeldeinformationen](https://fetch.spec.whatwg.org/#credentials) gesendet werden soll. Wenn auf `include`festgelegt, werden Anmeldeinformationen aus der Sitzung verwendet, die der Anforderung zugeordnet ist. Wenn auf `omit`festgelegt, werden Anmeldeinformationen nicht mit der Anforderung gesendet (und das `'login'` -Ereignis wird im Ereignis von 401 nicht ausgelöst). Dies entspricht dem Verhalten der [](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) Option gleichen Namens abrufen. Wenn diese Option nicht angegeben ist, werden authentifizierungs- Daten aus der Sitzung gesendet, und Cookies werden nicht gesendet (es sei denn, `useSessionCookies` festgelegt ist).
  * `useSessionCookies` boolesch (optional) - Ob Cookies mit diesem Anfrage aus der bereitgestellten Sitzung gesendet werden sollen. Wenn `credentials` angegeben ist, hat diese Option keine Auswirkungen. Standard ist `false`.
  * `protocol` String (optional) - Kann `http:` oder `https:`werden. Das Protokoll Schema in der Form "scheme:". Standardmäßig ist 'http:'.
  * `host` String (optional) - Der Server Host angegeben als eine Zusammensetzung aus Hostnamen und der Port Nummer 'hostname:port'.
  * `hostname` String (optional) - Der Server Host Name.
  * `port` Integer (optional) - Die Port Nummer des Servers.
  * `path` String (optional) - Der Pfad Teil der Anfrage URL.
  * `redirect` String (optional) - Kann `follow`, `error` oder `manual`sein. Der Umleitungsmodus für diese Anforderung. Wenn der Modus `error`ist, wird jede Umleitung abgebrochen. Wenn der Modus `manual` wird die Umleitung abgebrochen, es sei denn, [`request.followRedirect`](#requestfollowredirect) während des [`redirect`](#event-redirect) -Ereignisses synchron aufgerufen wird.  Standardwert ist `follow`.
  * `origin` String (optional) - Die Ursprungs-URL der Anforderung.

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

* `authInfo` -Objekt
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
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

Emittiert, wenn die `request` abgebrochen wird. Das `abort` -Ereignis wird nicht ausgelöst, wenn die `request` bereits geschlossen ist.

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
* `responseHeaders` -Rekord<String, String[]>

Emittiert, wenn der Server eine Umleitungsantwort zurückgibt (z. B. 301 Moved Permanently). Wenn [`request.followRedirect`](#requestfollowredirect) aufrufen, wird die Umleitung fortgesetzt.  Wenn dieses Ereignis behandelt wird, muss [`request.followRedirect`](#requestfollowredirect) **synchron**aufgerufen werden, andernfalls wird die Anforderung abgebrochen.

### Instanz Eigenschaften

#### `request.chunkedEncoding`

Ein `Boolean` gibt an, ob die HTTP Anfrage eine segmentierte Übertragungscodierung nutzt oder nicht. Der Standardwert ist false. Die Eigenschaft ist lesbar und beschreibbar, jedoch kann dies nur eingestellt werden, bevor der ersten Schreib-Operation, da die HTTP headers noch nicht abgeschickt worden sind. Der Versuch die `chunkedEncoding` Eigenschaft nach der ersten Übertragung zu ändern, wird einen Fehler verursachen.

Das Benutzen von segmentierter Codierung wird dringend empfohlen, wenn du einen großen request body senden möchtest, da die Daten in kleinen Stücken gestreamt wird, anstatt das diese intern im Electron Prozess Speicher gebufferd werden.

### Instanz Methoden

#### `request.setHeader(name, value)`

* `name` String - Ein extra HTTP header Name.
* `value` String - Ein zusätzlicher HTTP-Headerwert.

Fügt einen extra HTTP header hinzu. Der Headername wird wie nicht niedriger ausgegeben. Es kann nur vor dem ersten Schreiben aufgerufen werden. Das Aufrufen der Methode nachdem das erste Schreiben erfolgte, wird einen Fehler erzeugen. Falls der übergebene wert kein `String` ist, wird die `toString()` Methode aufgerufen, um den Finalen wert zu erhalten.

Bestimmte Header dürfen nicht von Apps festgelegt werden. Diese Header sind unten aufgeführt. Weitere Informationen zu eingeschränkten Headern finden Sie in [Chromium-Header-](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22).

* `Content-Länge`
* `Host`
* `Trailer` oder `Te`
* `Upgrade`
* `Cookie2`
* `Keep-Alive`
* `Transfer-Codierung`

Darüber hinaus ist das Festlegen des `Connection` -Headers auf den Wert `upgrade` ebenfalls nicht zulässig.

#### `request.getHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Gibt `String` zurück - Der Wert eines zuvor festgelegten zusätzlichen Headernamens.

#### `request.removeHeader(name)`

* `name` String - Spezifiziert einen extra Header Namen.

Entfernt einen zuvor festgelegten zusätzlichen Headernamen. Diese Methode kann nur vor dem ersten Schreiben aufgerufen werden. Der Versuch, es nach dem ersten Schreiben aufzurufen, löst einen Fehler aus.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Puffer) - Ein Teil der Daten des Anforderungstextes. Wenn es sich um eine Zeichenfolge handelt, wird sie mithilfe der angegebenen Codierung in einen Puffer konvertiert.
* `encoding` String (optional) - Wird verwendet, um Zeichenfolgenblöcke in Buffer -Objekte zu konvertieren. Standardwert für 'utf-8'.
* `callback` Function (optional) - Wird aufgerufen, nachdem der Schreibvorgang beendet ist.

`callback` ist im Wesentlichen eine dummy-Funktion die dem Zweck dient, Ähnlichkeiten mit der Node.js API beizubehalten. Es wird in den nächsten Tick asynchron aufgerufen, nachdem der `chunk` Inhalt auf der Chromium Netzwerkebene geliefert worden ist. Im Gegensatz zu der Node.js Implementierung, ist es nicht Garantiert das der `chunk` Inhalt hochgeladen worden ist, vor dem Aufrufen von `callback`.

Fügt einen Teil der Daten zum request body. Der erste Schreiboperation könnte das hochladen des request headers einleiten. Nach der ersten Schreiboperation, ist es nicht mehr erlaubt, Benutzerdefinierte Header hinzuzufügen oder zu entfernen.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Funktion (optional)

Sendet den letzten Teil der Anforderungsdaten. Nachfolgende Schreib- oder Endvorgänge sind nicht zulässig. Das `finish` -Ereignis wird unmittelbar nach dem Endvorgang abgegeben.

#### `request.abort()`

Bricht die laufende HTTP-Interaktion ab. Falls die Anfrage bereits das `close` Event ausgegeben hat, hat der Abbruch-Aktion keinen Effekt. Ansonsten wird ein laufendes Event `abort` und `close` Events ausgeben. Zusätzlich, falls es ein laufendes response-Objekt gibt, wir dieses ein `aborted` Event ausgeben.

#### `request.followRedirect()`

Setzt alle ausstehenden Umleitungen fort. Kann nur während eines `'redirect'` -Ereignisses aufgerufen werden.

#### `request.getUploadProgress()`

Gibt das `Object` zurück:

* `active` Boolean - Gibt an, ob die Anforderung derzeit aktiv ist. Wenn dies false ist werden keine anderen Eigenschaften festgelegt.
* `started` Boolean - Gibt an, ob der Upload gestartet wurde. Wenn dies falsch ist, werden sowohl `current` als auch `total` auf 0 gesetzt.
* `current` Integer - Die Anzahl der bereits hochgeladenen Bytes
* `total` Integer - Die Anzahl der Bytes, die für diese Anforderung hochgeladen werden

Sie können diese Methode in Verbindung mit `POST`-Anfragen verwenden, um den Fortschritt von einem Datei-Upload oder einer anderen Datenübertragung abzurufen.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
