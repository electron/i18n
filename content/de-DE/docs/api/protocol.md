# protocol

> Registrieren Sie ein benutzerdefiniertes Protokoll, und fangen Sie vorhandene Protokollanforderungen ab.

Prozess: [Main](../glossary.md#main-process)

Ein Beispiel für die Implementierung eines Protokolls, das die gleiche Wirkung wie das `file://` Protokoll hat:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.whenReady().then()=> '
  protocol.registerFileProtocol('atom', (request, callback) => '
    const url = request.url.substr(7)
    callback(' path.normalize('${__dirname}/${url}

  )
```

**Hinweis:** Alle Methoden, sofern nicht angegeben, können nur verwendet werden, nachdem das `ready` Ereignis des `app` Moduls ausgesendet wird.

## Verwenden von `protocol` mit einem benutzerdefinierten `partition` oder `session`

Ein Protokoll wird für ein bestimmtes Electron [`session`](./session.md) -Objekt registriert. Wenn Sie keine Sitzung angeben, wird Ihr `protocol` auf die von Electron verwendete Standardsitzung angewendet. Wenn Sie jedoch eine `partition` oder `session` auf dem `webPreferences`ihres `browserWindow`definieren, wird dieses Fenster einer anderen Sitzung verwendet, und Ihr benutzerdefiniertes Protokoll funktioniert nicht, wenn Sie nur `electron.protocol.XXX`verwenden.

Damit Ihr benutzerdefiniertes Protokoll in Kombination mit einer benutzerdefinierten Sitzung funktioniert, müssen Sie es explizit für diese Sitzung registrieren.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.whenReady().then()=> '
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) =>
    const url = request.url.substr(7)
    callback(' path: path.normalize('${__dirname}/${url}')
  ' )

  mainWindow = new BrowserWindow(' webPreferences: { partition } ')
)
```

## Methoden

Das `protocol` Modul verfügt über die folgenden Methoden:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Hinweis:** Diese Methode kann nur verwendet werden, bevor das `ready` Ereignis des `app` Moduls ausgesendet wird und nur einmal aufgerufen werden kann.

Registriert die `scheme` als standardsicher, umgeht die Inhaltssicherheitsrichtlinie für Ressourcen, ermöglicht die Registrierung von ServiceWorker, unterstützt die Abruf-API und streaming Video/Audio. Geben Sie eine Berechtigung mit dem Wert `true` an, um die Funktion zu aktivieren.

Ein Beispiel für die Registrierung eines privilegierten Schemas, das die Content Security -Richtlinie umgeht:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  'scheme: 'foo', privileges: { bypassCSP: true } '
])
```

Ein Standardschema entspricht dem, was RFC 3986 [generische URI- -Syntax](https://tools.ietf.org/html/rfc3986#section-3)bezeichnet. Beispielsweise sind `http` und `https` Standardschemata, `file` nicht.

Wenn Sie ein Schema standardmäßig registrieren, können relative und absolute Ressourcen ordnungsgemäß aufgelöst werden, wenn sie bereitgestellt werden. Andernfalls verhält sich das Schema wie das `file` Protokolls, jedoch ohne die Möglichkeit, relative URLs aufzulösen.

Wenn Sie z. B. die folgende Seite mit einem benutzerdefinierten Protokoll laden, ohne , es als Standardschema zu registrieren, wird das Abbild nicht geladen, da nicht standardmäßige Schemas relative URLs nicht erkennen können:

```html
<body>
  <img src='test.png'>
</body>
```

Wenn Sie ein Schema standardmäßig registrieren, können Sie über die [FileSystem-API][file-system-api]auf Dateien zugreifen. Andernfalls löst der Renderer einen Sicherheitsfehler aus, für das Schema.

Standardmäßig sind Webspeicher-APis (localStorage, sessionStorage, webSQL, indexedDB, Cookies) für nicht standardmäßige Schemata deaktiviert. Wenn Sie also ein benutzerdefiniertes Protokoll registrieren möchten, um das `http` Protokoll zu ersetzen, müssen Sie sich es als Standardschema registrieren.

Protokolle, die Streams (http und Streamprotokolle) verwenden, sollten `stream: true`festlegen. Die `<video>` - und `<audio>` -HTML-Elemente erwarten, dass Protokolle standardmäßig ihre -Antworten puffern. Das `stream` -Flag konfiguriert diese Elemente so, dass sie korrekt Streaming-Antworten erwarten.

### `protocol.registerFileProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich registriert wurde

Registriert ein Protokoll mit `scheme` , das eine Datei als Antwort sendet. Die `handler` wird mit `request` und `callback` aufgerufen, bei dem `request` eine eingehende Anforderung für die `scheme` .

Um die `request`zu behandeln, sollte die `callback` entweder mit dem Pfad der Datei oder einem Objekt aufgerufen werden, das über eine `path` -Eigenschaft verfügt, z. B. `callback(filePath)` oder `callback({ path: filePath })`. Die `filePath` muss ein absoluter Weg sein.

Standardmäßig wird die `scheme` wie `http:`behandelt, die anders von Protokollen analysiert wird, die der "generischen URI-Syntax" wie `file:`folgen.

### `protocol.registerBufferProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (| [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich registriert wurde

Registriert ein Protokoll mit `scheme` , das eine `Buffer` als Antwort sendet.

Die Verwendung ist bei `registerFileProtocol`identisch, mit der Ausnahme, dass die `callback` entweder mit einem `Buffer` Objekt oder einem Objekt mit der `data` -Eigenschaft aufgerufen werden soll.

Beispiel:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => '
  callback(' mimeType: 'text/html', daten: Buffer.from('<h5>Response</h5>')

```

### `protocol.registerStringProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich registriert wurde

Registriert ein Protokoll mit `scheme` , das eine `String` als Antwort sendet.

Die Verwendung ist bei `registerFileProtocol`identisch, mit der Ausnahme, dass die `callback` entweder mit einem `String` oder einem Objekt aufgerufen werden sollten, das über die `data` -Eigenschaft verfügt.

### `protocol.registerHttpProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` ProtocolResponse

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich registriert wurde

Registriert ein Protokoll mit `scheme` , das eine HTTP-Anforderung als Antwort sendet.

Die Verwendung ist bei `registerFileProtocol`identisch, mit der Ausnahme, dass die `callback` mit einem Objekt aufgerufen werden soll, das über die `url` -Eigenschaft verfügt.

### `protocol.registerStreamProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich registriert wurde

Registriert ein Protokoll mit `scheme` , das einen Stream als Antwort sendet.

Die Verwendung ist bei `registerFileProtocol`identisch, mit der Ausnahme, dass die `callback` entweder mit einem [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) Objekt oder einem Objekt aufgerufen werden soll, das über die `data` -Eigenschaft verfügt.

Beispiel:

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

-Funktion createStream (text) -
  const rv = new PassThrough() / / PassThrough ist auch ein lesbarer Stream
  rv.push(text)
  rv.push(null)
  return rv
.

protocol.registerStreamProtocol('atom', (Request, callback) => -
  -Callback(-
    statusCode: 200,
    -Header:
      'content-type': 'text/html'
    ,
    Daten: createStream('<h5>Response</h5>')
  ')
')
```

Es ist möglich, jedes Objekt zu übergeben, das die lesbare Stream-API implementiert (emittiert `data`/`end`/`error` Ereignisse). So konnte z. B. eine Datei zurückgegeben werden:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => '
  callback(fs.createReadStream('index.html'))

```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgemeldet wurde

Entregistriert das benutzerdefinierte Protokoll von `scheme`.

### `protocol.isProtocolRegistered(schema)`

* `scheme` String

Gibt `Boolean` zurück - Gibt an, ob `scheme` bereits registriert ist.

### `protocol.interceptFileProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Fängt `scheme` Protokoll ab und verwendet `handler` als neuen Handler des Protokolls der eine Datei als Antwort sendet.

### `protocol.interceptStringProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Fängt `scheme` Protokoll ab und verwendet `handler` als neue des Protokolls, die eine `String` als Antwort sendet.

### `protocol.interceptBufferProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (| [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Fängt `scheme` Protokoll ab und verwendet `handler` als neue des Protokolls, die eine `Buffer` als Antwort sendet.

### `protocol.interceptHttpProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` [ProtocolResponse](structures/protocol-response.md)

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Fängt `scheme` Protokoll ab und verwendet `handler` als neuen Handler des Protokolls der eine neue HTTP-Anforderung als Antwort sendet.

### `protocol.interceptStreamProtocol(schema, Handler)`

* `scheme` String
* `handler` -Funktion
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Genauso wie `protocol.registerStreamProtocol`, mit der Ausnahme, dass ein vorhandener Protokollhandler ersetzt wird.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Gibt `Boolean` zurück - Gibt an, ob das Protokoll erfolgreich abgefangen wurde

Entfernen Sie den für `scheme` installierten Interceptor, und stellen Sie den ursprünglichen Handler wieder her.

### `protocol.isProtocolIntercepted(schema)`

* `scheme` String

Gibt `Boolean` zurück - Gibt an, ob `scheme` bereits abgefangen wurde.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
