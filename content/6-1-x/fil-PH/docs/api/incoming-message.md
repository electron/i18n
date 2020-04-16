## Class: Paparating na Mensahe

> Pamamahala ng pagtugon sa hiling ng "HTTP/HTTPS".

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `IncomingMessage` ay ginagamit ang "interface" na [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams), at samakatuwid ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### Mga Halimbawa ng "Events"

#### Event: 'data'

Ibinabalik ang:

* `chunk` Buffer - Ang "chunk" ng pagtugon sa katawan ng datos.

Ang "`data` event" ay karaniwang paraan sa pagsasalin ng pagtugon sa datos bilang "applicative code".

#### Event: 'end'

Nagpapahiwatig na ang "response body" ay tapos na.

#### Event: 'aborted'

Lumalabas kapag ang kahilingan ay biglang itinigil habang nagaganap ang transaksyon ng HTTP.

#### Event: 'error'

Ibinabalik ang:

`error` Error - Karaniwang hinahawakan ang maling "string" at tutukuyin ang sanhi kung bakit ito hindi nagtagumpay.

Lumalabas kapag nakatagpo ng mali habang patuloy ang pagtugon sa datos ng "events". Halimbawa, kung ang "server" ay malapit sa pinagbabatayan nito habang ang proseso ng pagtugon ay nagpapatuloy, ang "`error` event" ay lalabas sa "response object" at ang "`close` event" ay susunod pagkatapos nito.

### Katangian ng pagkakataon

Isang `IncomingMessage` na may mga sumusunod na katangian na maaaring basahin:

#### `response.statusCode`

Ang `Integer` ay tinutukoy ang partikular na katayuan ng "code" ng pagtugon ng "HTTP".

#### `response.statusMessage`

Isang `String` na kumakatawan sa lagay ng posisyon ng mensahe ng "HTTP".

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* Ang lahat ng pangalan ng "header" ay dapat gumamit ng maliliit na titik.
* Ang bawat pangalan ng "header" ay gagawa ng katangian ng "array-valued" sa "header's object".
* Ang bawat halaga ng "header" na bahagi ay sapilitan na ipupunta sa "array" na kaugnay sa pangalan nito.

#### `response.httpVersion`

Isang `String` na tumutukoy sa "HTTP protocol version number". Mga karinawang halaga ay '1.0' o '1.1'. Bukod dito, ang `httpVersionMajor` at `httpVersionMinor` ay parehong "integer-valued" kung saan ang kanila mga katangian ay maaaring makita, at babalik sa "HTTP major" at "minor version numbers".

#### `response.httpVersionMajor`

Isang `Integer` na tumutukoy sa protokol ng "HTTP" na pangunahing bersyon ng numero.

#### `response.httpVersionMinor`

Isang `Integer` na tumutukoy sa protokol ng "HTTP" na menor na bersyon ng numero.
