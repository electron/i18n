## Class: WebRequest

> Intercept and modify the contents of a request at various stages of its lifetime.

Processo: [Main](../glossary.md#main-process)

Instances of the `WebRequest` class are accessed by using the `webRequest` property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The `listener` will be called with `listener(details)` when the API's event has happened. The `details` object describes the request.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

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

### Métodos de Instância

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * objeto `response`
      * `cancel` Booleano (opcional)
      * `redirectURL` String (opcional) - A solicitação original é impedida de ser enviada ou concluída e, em vez disso, é redirecionada para a URL dada.

O `listener` será chamado com `listener(details, callback)` quando uma solicitação estiver prestes a ocorrer.

O `uploadData` é uma matriz de objetos `UploadData` .

O `callback` tem que ser chamado com um objeto `response`.

Alguns exemplos de `urls` válidas:

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

#### `webRequest.onBeforeSendHeaders([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * Registro `requestHeaders`<string, string>
  * `callback` Function
    * objeto `beforeSendResponse`
      * `cancel` Booleano (opcional)
      * `requestHeaders` Record<string, string | string[]> (opcional) - Quando fornecido, a solicitação será feita com esses cabeçalhos.

O `listener` será chamado com `listener(details, callback)` antes de enviar uma solicitação HTTP, uma vez que os cabeçalhos de solicitação estejam disponíveis. Isto pode ocorrer após uma conexão TCP ser feita ao servidor, mas antes que qualquer dado http seja enviado.

O `callback` tem que ser chamado com um objeto `response` .

#### `webRequest.onSendHeaders([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * Registro `requestHeaders`<string, string>

O `listener` será chamado com `listener(details)` pouco antes de uma solicitação será enviada ao servidor, modificações de resposta `onBeforeSendHeaders` anteriores são visíveis no momento em que este ouvinte for demitido.

#### `webRequest.onHeadersReceived([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` Cordas
    * `statusCode` Integer
    * Registro `requestHeaders`<string, string>
    * `responseHeaders` Record<string, string[]> (opcional)
  * `callback` Function
    * objeto `headersReceivedResponse`
      * `cancel` Booleano (opcional)
      * `responseHeaders` Record<string, string | string[]> (opcional) - Quando fornecido, o servidor é assumido ter respondido com esses cabeçalhos.
      * `statusLine` String (opcional) - Deve ser fornecido ao substituir `responseHeaders` para alterar o status do cabeçalho, caso contrário, a resposta original o status do cabeçalho será usado.

O `listener` será chamado com `listener(details, callback)` quando os cabeçalhos de resposta http de uma solicitação foram recebidos.

O `callback` tem que ser chamado com um objeto `response` .

#### `webRequest.onResponseStarted([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (opcional)
    * `fromCache` Boolean - Indica se a resposta foi buscada do cache de de disco.
    * `statusCode` Integer
    * `statusLine` Cordas

O `listener` será chamado com `listener(details)` quando o primeiro byte do corpo de resposta for recebido. Para solicitações HTTP, isso significa que a linha de status e os cabeçalhos de resposta estão disponíveis.

#### `webRequest.onBeforeRedirect([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` Cordas
    * `statusCode` Integer
    * `statusLine` Cordas
    * `ip` String (opcional) - O endereço IP do servidor para o enviado.
    * `fromCache` Booleano
    * `responseHeaders` Record<string, string[]> (opcional)

O `listener` será chamado com `listener(details)` quando um servidor iniciado redirecionamento está prestes a ocorrer.

#### `webRequest.onCompleted ([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (opcional)
    * `fromCache` Booleano
    * `statusCode` Integer
    * `statusLine` Cordas
    * `error` Cordas

O `listener` será chamado com `listener(details)` quando uma solicitação for concluída .

#### `webRequest.onErrorOccurred ([filtro, ]ouvinte)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Booleano
    * `error` String - A descrição do erro.

O `listener` será chamado com `listener(details)` quando ocorrer um erro.
