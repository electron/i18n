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

`error` Error - Karaniwang hinahawakan ang maling "string" at tutukuyin ang sanhi kung bakit ito hindi nagtagumpay.

Lumalabas kapag nakatagpo ng mali habang patuloy ang "response data events". For instance, if the server closes the underlying while the response is still streaming, an `error` event will be emitted on the response object and a `close` event will subsequently follow on the request object.

### Mga Halimbawa ng Katangian

Ang `IncomingMessage` ay may mga sumusunod na katangian na maaaring basahin:

#### `response.statusCode`

Ang `Integer` ay tinutukoy ang partikular na katayuan ng "code" ng pagtugon ng "HTTP".

#### `response.statusMessage`

Ang `String` na kumakatawan sa lagay ng posisyon ng mensahe ng "HTTP".

#### `response.headers`

Ang `Object` na syang kumakatawan sa tugon ng "HTTP headers". Ang "`headers` object" ay nakaayos ayon sa mga sumusunod:

* Ang lahat ng pangalan na nasa itaas ay dapat gumamit ng maliliit na titik.
* Ang bawat panganlan na nasa itaas ay gagawa ng katangian ng "array-valued" sa "header's object".
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.