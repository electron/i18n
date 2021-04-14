## Classe : WebRequest

> Intercepte et modifie le contenu d'une requête à différents stades de son existence.

Processus : [Main](../glossary.md#main-process)

Les instances de la classe `WebRequest` sont accessibles à l'aide de la propriété `WebRequest` d'une `Session`.

Les méthodes de `WebRequest` acceptent un `filter` et un `listener` optionnels. Le `listener` va être appelé avec `listener(details)` quand l'événement de l'API est émis. L'objet `details` représente la requête.

⚠️ seul le dernier `listener` joint sera utilisé. Passer `null` comme `listener` se désabonner de l’événement.

L'objet `filter` a une propriété `url` qui est un tableau de modèles d'URL qui seront utilisés pour filtrer les requêtes qui ne satisfont pas aux modèles. . Si `filter` est omis, toutes les requêtes seront jugées comme conformes.

Pour certains événements, le `listener` est passé accompagné d'une `callback`, qui devrait être appelée avec un objet `response`lorsque le `listener` a fini son travail.

Un exemple d'ajout de l'en-tête `User-Agent` pour les requêtes :

```javascript
const { session } = exiger ('electron')

// Modifier l’agent utilisateur pour toutes les demandes vers les urls suivantes.
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

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` objet
      * `cancel` Boolean)
      * `redirectURL` String (facultatif) - Empêche la requête originale d'être envoyée ou complétée et à la place celle ci est redirigée vers l'URL donnée.

Le `listener` sera appelé avec `listener(détails, callback)` lorsqu'une requête est sur le point de se produire.

Le `uploadData` est un tableau d'objets `UploadData`.

La `callback` doit être appelé avec un objet `response`.

Quelques exemples de `urls`:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` record<string, string>
  * `callback` Function
    * `beforeSendResponse` objet
      * `cancel` Boolean)
      * `requestHeaders` enregistrement<string, string | string[]> (facultatif) - Lorsqu’il est fourni, la demande sera faite ces en-têtes.

Le `listener` sera appelé avec le `listener(details, callback)` l’envoi d une demande HTTP, une fois que les en-têtes de demande sont disponibles. Cela peut se produire après une connexion TCP est faite au serveur, mais avant toute donnée http est envoyé.

Le `callback` doit être appelé avec un objet `response` objet.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` record<string, string>

Le `listener` sera appelé avec `listener(details)` juste avant qu’une demande ne soit va être envoyé au serveur, les modifications de la réponse `onBeforeSendHeaders` précédente sont visibles au moment où cet auditeur est tiré.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `requestHeaders` record<string, string>
    * `responseHeaders` record<string, string[]> (facultatif)
  * `callback` Function
    * `headersReceivedResponse` objet
      * `cancel` Boolean)
      * `responseHeaders` enregistrement<string, string | string[]> (facultatif) - Lorsqu’il est fourni, le serveur est supposé 'avoir répondu avec ces en-têtes.
      * `statusLine` string (facultatif) - Doit être fourni lors de la `responseHeaders` de prépondérante pour changer l’état de l’en-tête sinon la réponse originale statut de l’en-tête sera utilisée.

Le `listener` sera appelé avec `listener(details, callback)` lorsque http de réponse d’une demande ont été reçus.

Le `callback` doit être appelé avec un objet `response` objet.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` record<string, string[]> (facultatif)
    * `fromCache` Boolean - Indique si la réponse a été récupérée à partir du disque cache.
    * `statusCode` Integer
    * `statusLine` String

Le `listener` sera appelé avec `listener(details)` premier byte de l' d’intervention est reçu. Pour les demandes HTTP, cela signifie que la ligne d’état des et des en-têtes de réponse sont disponibles.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (facultatif) - L’adresse IP du serveur à qui la demande a été envoyée.
    * `fromCache` Boolean
    * `responseHeaders` record<string, string[]> (facultatif)

Le `listener` sera appelé avec un `listener(details)` un serveur initié et redirection est sur le point de se produire.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` record<string, string[]> (facultatif)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String
    * `error` String

Le `listener` sera appelé avec `listener(details)` lorsqu’une demande terminée.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` objet (facultatif)
  * `urls` String[] - Tableau de modèles d'URL qui sera utilisé pour filtrer les requêtes qui ne correspondent pas aux modèles.
* `listener` fonction | Null
  * `details` objet
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (facultatif)
    * `webContents` WebContents (facultatif)
    * `frame` WebFrameMain (facultatif)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - La description de l'erreur.

Le `listener` sera appelé avec `listener(details)` une erreur se produit.
