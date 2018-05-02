## Class: IncomingMessage

> Handle responses to HTTP/HTTPS requests.

Processo: [Main](../glossary.md#main-process)

`IncomingMessage` implements the [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) interface and is therefore an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### Eventos de instância

#### Event: 'data'

Retorna:

* `chunk` Buffer - A chunk of response body's data.

The `data` event is the usual method of transferring response data into applicative code.

#### Event: 'end'

Indicates that response body has ended.

#### Event: 'aborted'

Emitido quando uma solicitação foi cancelada durante uma transação HTTP em curso.

#### Evento: 'error'

Retorna:

`error` Error - Typically holds an error string identifying failure root cause.

Emitido quando ocorreu um erro ao transmitir eventos de dados de resposta. For instance, if the server closes the underlying while the response is still streaming, an `error` event will be emitted on the response object and a `close` event will subsequently follow on the request object.

### Propriedades da Instância

An `IncomingMessage` instance has the following readable properties:

#### `response.statusCode`

Um `Integer` indica o estado do código de resposta HTTP.

#### `response.statusMessage`

Uma `String` representa a mensagem de estado HTTP.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* Todos os nomes de cabeçalho são em minúsculas.
* Cada nome de cabeçalho produz uma propriedade de valor de matriz no objeto de cabeçalho.
* Cada valor do cabeçalho é inserido na matriz associada ao nome do cabeçalho.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.