## Class: ClientRequest

> Realiza requisições HTTP/HTTPS.

Processo: [Main](../glossary.md#main-process)

`ClientRequest` implementa a interface [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) e deste modo um [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(opções)`

* `opções` (Object | String) - Se `opções` for uma String, ela é interpretada como a URL da requisição. Caso seja um objeto, é esperado que ela especifique totalmente a requisição HTTP através das seguintes propriedades: 
  * `method` String (opcional) - O método de requisição HTTP, sendo GET o método padrão.
  * `url` String (opcional) - A URL da requisição. Precisa ser informada na forma absoluta com protocolo http ou https especificado.
  * `session` Object (opcional) - A instância da [`Sessão`](session.md) com a qual a requisição está associada.
  * `partition` String (opcional) - O nome da [`partição`](session.md) com a qual a requisição está associada. O padrão é uma string vazia. A opção `sessão` prevalece sobre a `partição`. Assim, se a `sessão` é explicitamente especificada, a `partição` é ignorada.
  * `protocol` String (opcional) - O esquema do protocolo, na forma 'scheme:'. O valores atualmente suportados são 'http:' ou 'https:', sendo 'http:' o padrão.
  * `host` String (opcional) - O servidor, definido como a concatenação do nome com a porta: 'nome:porta'.
  * `hostname` String (opcional) - O nome do servidor.
  * `port` Integer (opcional) - O número da porta do servidor.
  * `path` String (opcional) - A parte do caminho da URL de requisição.
  * `redirect` String (opcional) - O modo de redirecionamento para esta requisição. Deve ser um dos modos: `follow`, `error` ou `manual`. O padrão é `follow`. Quando o modo é `error`, qualquer redirecionamento será abortado. Quando o modo é `manual` o redirecionamento será deferido até que [`request.followRedirect`](#requestfollowredirect) seja invocado. Escute o evento [`redirect`](#event-redirect) neste modo para obter mais detalhes sobre a requisição de redirecionamento.

As propriedades em `options`, como `protocol`, `host`, `hostname`, `port` e `path` seguem estritamente o modelo Node.js, como descrito no módulo [URL](https://nodejs.org/api/url.html).

Por exemplo, nós poderíamos criar a mesma requisição para 'github.com' da seguinte forma:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Eventos de instância

#### Evento: 'response'

Retorna:

* `response` IncomingMessage - Um objeto representando a resposta HTTP.

#### Evento: 'login'

Retorna:

* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Emitido quando um proxy de autenticação está solicitando as credenciais de usuário.

A função de `callback` é esperada para chamar de volta as credenciais do usuário:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Informar credenciais vazias irá cancelar a requisição e reportar um erro de autenticação no objeto de resposta:

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

#### Evento: 'finish'

Emitido logo após o último pedaço dos dados de `request` for escrito no objeto `request`.

#### Evento: 'abort'

Emitido quando `request` é abortado. O evento `abort` não vai ser disparado se `request` já estiver fechado.

#### Evento: 'error'

Retorna:

* `error` Error - um objeto de erro que provê informações sobre a falha.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Evento: 'close'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Event: 'redirect'

Retorna:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Propriedades da Instância

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false. The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Métodos de Instância

#### `request.setHeader(name, value)`

* `name` String - An extra HTTP header name.
* `value` Object - An extra HTTP header value.

Adds an extra HTTP header. The header name will issued as it is without lowercasing. It can be called only before first write. Calling this method after the first write will throw an error. If the passed value is not a `String`, its `toString()` method will be called to obtain the final value.

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

#### `request.getUploadProgress()`

Retorna `Object`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.