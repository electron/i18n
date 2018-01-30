## Class: IncomingMessage

> Pamamahala ng pagtugon sa hiling ng "HTTP/HTTPS".

Ang proseso: [Main](../glossary.md#main-process)

Ang `IncomingMessage` ay ginagamit ang "interface" na [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams), at samakatuwid ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### Mga Halimbawa ng "Events"

#### Event: 'data'

Pagbabalik sa:

* `chunk` Buffer - Ang "chunk" ng pagtugon sa katawan ng datos.

Ang "`data` event" ay ang karaniwang paraan sa pagsasalin ng "response data" bilang "applicative code".

#### Event: 'end'

Nagpapahiwatig na ang "response body" ay tapos na.

#### Event: 'aborted'

Lumalabas kapag ang kahilingan ay biglang itinigil habang nagaganap ang transaksyon ng HTTP.

#### Event: 'error'

Pagbabalik:

`error` Error - Typically holds an error string identifying failure root cause.

Emitted when an error was encountered while streaming response data events. For instance, if the server closes the underlying while the response is still streaming, an `error` event will be emitted on the response object and a `close` event will subsequently follow on the request object.

### Humahalimbawa sa bahagi nito

An `IncomingMessage` instance has the following readable properties:

#### `response.statusCode`

An `Integer` indicating the HTTP response status code.

#### `response.statusMessage`

A `String` representing the HTTP status message.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* All header names are lowercased.
* Each header name produces an array-valued property on the headers object.
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.