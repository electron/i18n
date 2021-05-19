## Classe : WebRequest

> Intercepte et modifie le contenu d'une requête à différents stades de son existence.

Processus : [Main](../glossary.md#main-process)

Les instances de la classe `WebRequest` sont accessibles à l'aide de la propriété `WebRequest` d'une `Session`.

Les méthodes de `WebRequest` acceptent un `filter` et un `listener` optionnels. Le `listener` va être appelé avec `listener(details)` quand l'événement de l'API est émis. L'objet `details` représente la requête.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

L'objet `filter` a une propriété `url` qui est un tableau de modèles d'URL qui seront utilisés pour filtrer les requêtes qui ne satisfont pas aux modèles. . Si `filter` est omis, toutes les requêtes seront jugées comme conformes.

Pour certains événements, le `listener` est passé accompagné d'une `callback`, qui devrait être appelée avec un objet `response`lorsque le `listener` a fini son travail.

Un exemple d'ajout de l'en-tête `User-Agent` pour les requêtes :

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### Méthodes d’instance

Les méthodes suivantes sont disponibles pour les instances de `WebRequest` :

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` Object
      * `cancel` Boolean)
      * `redirectURL` String (facultatif) - Empêche la requête originale d'être envoyée ou complétée et à la place celle ci est redirigée vers l'URL donnée.

Le `listener` sera appelé avec `listener(détails, callback)` lorsqu'une requête est sur le point de se produire.

Le `uploadData` est un tableau d'objets `UploadData`.

La `callback` doit être appelé avec un objet `response`.

Some examples of valid `urls`:

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

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>
  * `callback` Function
    * `beforeSendResponse` Object
      * `cancel` Boolean)
      * `requestHeaders` Record<string, string | string[]> (optional) - When provided, request will be made with these headers.

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

The `callback` has to be called with a `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `requestHeaders` Record<string, string>
    * `responseHeaders` Record<string, string[]> (optional)
  * `callback` Function
    * `headersReceivedResponse` Object
      * `cancel` Boolean)
      * `responseHeaders` Record<string, string | string[]> (optional) - When provided, the server is assumed to have responded with these headers.
      * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

The `callback` has to be called with a `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (optional)
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Record<string, string[]> (optional)

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (optional)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String
    * `error` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` Function | null
  * Objet `details`
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - La description de l'erreur.

The `listener` will be called with `listener(details)` when an error occurs.
