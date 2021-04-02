## Class: WebRequest

> Fangen und ändern Sie den Inhalt einer Anforderung in verschiedenen Phasen ihrer Lebensdauer.

Prozess: [Main](../glossary.md#main-process)

Auf Instances der `WebRequest` -Klasse wird mithilfe der `webRequest` -Eigenschaft eines `Session`zugegriffen.

Die Methoden `WebRequest` akzeptieren eine optionale `filter` und eine `listener`. Die `listener` werden mit `listener(details)` aufgerufen, wenn das Ereignis der API eingetreten ist. Das `details` Objekt s. beschreibt die Anforderung.

⚠️ Nur die zuletzt angefügten `listener` werden verwendet. Wenn Sie `null` als `listener` übergeben, wird das Ereignis abgemeldet.

Das `filter` -Objekt verfügt über eine `urls` -Eigenschaft, die ein Array von URL- -Mustern ist, die verwendet werden, um die Anforderungen herauszufiltern, die nicht mit der URL Mustern übereinstimmen. Wenn die `filter` weggelassen wird, werden alle Anforderungen abgeglichen.

Bei bestimmten Ereignissen wird die `listener` mit einem `callback`übergeben, der mit einem `response` Objekt aufgerufen werden sollte, wenn `listener` seine Arbeit erledigt hat.

Ein Beispiel zum hinzufügen von `User-Agent` Headern für Requests:

```javascript
const { session } = require('electron')

// Modifiziert den user agent für alle requests zu den folgenden Urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
}){ requestHeaders: details.requestHeaders }
```

### Instanz Methoden

Die folgenden Methoden sind verfügbar in Instanzen von `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` -Objekt
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - Die ursprüngliche Anforderung wird daran gehindert, gesendet oder abgeschlossen zu werden, und wird stattdessen an die angegebene URL umgeleitet.

Die `listener` wird mit `listener(details, callback)` aufgerufen, wenn eine Anforderung auferstehen.

`uploadData` ist ein Array mit `UploadData` Objekten.

Der `callback` muss aufgerufen werden mit einem `response` Objekt.

Einige Beispiele für gültige `urls`:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/*'
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` -Rekord<string, string>
  * `callback` Function
    * `beforeSendResponse` -Objekt
      * `cancel` Boolean (optional)
      * `requestHeaders` Record<string, string | string[]> (optional) - Wenn angegeben, wird die Anforderung mit diesen Headern gestellt.

Die `listener` werden mit `listener(details, callback)` aufgerufen, bevor eine HTTP-Anforderung gesendet wird, sobald die Anforderungsheader verfügbar sind. Dies kann auftreten, nachdem eine TCP-Verbindung mit dem Server hergestellt wurde, aber bevor http-Daten gesendet werden.

Die `callback` muss mit einem `response` Objekt aufgerufen werden.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` -Rekord<string, string>

Die `listener` mit `listener(details)` aufgerufen werden, kurz bevor eine Anforderung an den Server gesendet wird, werden Änderungen der vorherigen `onBeforeSendHeaders` Antwort zum Zeitpunkt der Anzeige dieses Listeners sichtbar.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `requestHeaders` -Rekord<string, string>
    * `responseHeaders` Datensatz<string, string[]> (optional)
  * `callback` Function
    * `headersReceivedResponse` -Objekt
      * `cancel` Boolean (optional)
      * `responseHeaders` Record<string, string | string[]> (optional) - Wenn angegeben, wird davon ausgegangen, dass der Server mit diesen Headern geantwortet hat.
      * `statusLine` String (optional) - Sollte beim Überschreiben `responseHeaders` angegeben werden, um den Headerstatus zu ändern, andernfalls wird die ursprüngliche Antwort -Headerverwendet werden.

Die `listener` werden mit `listener(details, callback)` aufgerufen, wenn HTTP Antwortheader einer Anforderung empfangen wurden.

Die `callback` muss mit einem `response` Objekt aufgerufen werden.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Datensatz<string, string[]> (optional)
    * `fromCache` Boolean - Gibt an, ob die Antwort vom Datenträger Cache abgerufen wurde.
    * `statusCode` Integer
    * `statusLine` String

Die `listener` wird mit `listener(details)` aufgerufen, wenn das erste Byte des Antwortgremiums empfangen wird. Bei HTTP-Anforderungen bedeutet dies, dass die Statuszeile und Antwortheader verfügbar sind.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (optional) - Die Server IP Adresse an den der Request ursprünglich gesendet wurde.
    * `fromCache` Boolean
    * `responseHeaders` Datensatz<string, string[]> (optional)

Die `listener` wird mit `listener(details)` aufgerufen, wenn ein Server, der Umleitung initiiert wird, im Begriff ist, zu erfolgen.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Datensatz<string, string[]> (optional)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String
    * `error` String

Die `listener` wird mit `listener(details)` aufgerufen, wenn eine Anforderung abgeschlossen ist.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Objekt (optional)
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Funktion | Null
  * `details` -Objekt
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

Die `listener` wird mit `listener(details)` aufgerufen, wenn ein Fehler auftritt.
