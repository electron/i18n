## Klase: ClientRequest

> Gawin ang mga kahilingan ng HTTP/HTTPS

I-process: [Main](../glossary.md#main-process)

`ClientRequest`ipinatupad ng mga [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface at samakatuwid ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Context | Request Context

### `bagong ClientRequest(options)
 
Context | Request Context
`

* `options` (Object | String) - Kung `options` ay isang String, nangangahulugang hiling ng URL. Kung ito ay isang object, inaasahang ganap na tumutukoy ang isang HTTP mag-request sa pamamagitan ng sumusunod na: 
  * `method` String (opsyonal) - Paraan ng HTTP request. Mga defaults sa GET na paraan.
  * `url` String (opsyonal) - Ang request ng URL. Dapat maibigay ang ganap na anyo ng pamamaraan ng protocol na tinutukoy bilang http or https. 
  * `session` Object (opsyonal) - Ang [`Session`](session.md) halimbawa kung saan nauugnay ang request.
  * `partition` String (opsyonal) - Ang pangalan ng [`partition`](session.md) kung saan nauunay ang request. Defaults ng mga walang laman na string. Ang `session` opsyon na mananaig sa `partition`. Kaya kung ang isang `session` ay maliwanag na tinutukoy, ang `partition` ay binabalewala.
  * `protocol` String (opsyonal) - Ang pamamaraan ng protocol sa 'scheme:' form. Kasalukuyang suportadong values ay 'http:' o 'https:'. Defaults sa 'http:'.
  * `host` String (opsyonal) - Ang server sa host ay ibinigay upnag pagdugtungin ang hostname at ang port number bilang 'hostname:port' 
  * `hostname` String (opsyonal) - Ang host name ng server.
  * `port` Integer (opsyonal) - Ang listening port number ng server.
  * `path` String (opsyonal) - Ang path na parte sa request URL.
  * `redirect` String (opsyonal) - Ang redirect mode para sa request na ito. Nararapat na isa sa `follow`, `error` o `manual`. Ang defaults sa `follow`. Kapag mode ay `error`, anumang redirection ay mauudlot. Kapag mode ay `manual` ang redirection ay ipinagpaliban hanggang [`request.followRedirect`](#requestfollowRedirect) ay mapakiusapan. Pakinggan ang [`redirect`](#event-redirect) na event sa mode na ito upang makakakuha ng nmga detalye tungkol sa redirect na request.

`options` properties gaya ng `protocol`, `host`, `hostname`, `port` at `path` mahigpit na sundan ang Node.js na model gaya ng inilarawan sa [URL](https://nodejs.org/api/url.html) module.

Halimbawa, maaaring lumikha tayo ng kaparehong request sa 'github.com' gaya ng:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Halimbawa ng mga Events

#### Event: 'response'

Magbabalik ng:

* `response` IncomingMessage - Isang bagay na kumakatawan ng HTTP response message.

#### Event: 'login'

Magbabalik ng:

* `authInfo` Bagay 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Ang pinalabas kapag ang isang proxy na nagpapatunay ay humihiling ng mga kredensyal ng gumagamit.

Ang `callback` function ay inaasahang tatawagan ulit para sa mga kredensyal ng user:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Ang pagbibigay ng walang laman na mga kredensyal ay maaaring magka-cancel ng request at ma-iulat ang isang authentication error sa response object:

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

#### Event: 'finish'

Naalis pagkatapos ng huling tipak sa `request` ng mga data na isinulat para sa `request` object.

#### Event: 'abort'

Matatanggal kapag ang `request` ay naudlot. Ang `abort` event ay hindi matitiwalag kung ang `request` ay nakasara na.

#### Event: 'error'

Magbabalik ng:

* `error` Error - isang error object na nagbibigay impormasyon tungkol sa kabiguan.

Matatanggal kapag nabigo ang `net` na module sa pag-issue ng network request. Karaniwan kapag ang `request` object ay nagtanggal ng `error` na event, isang `close` na event na sumusubaybay at walang response na object ang ilalaan.

#### Event: 'close'

Tinatanggal bilang panghuling event sa HTTP request-response transaction. Ang `close` na event ay nagsasaad na walang tatanggalin na events alinman sa `request` o `response` na mga object.

#### Event: 'redirect'

Magbabalik ng:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Tinatanggal kapag mayroong redirection at ang mode ay `manual`. Pagtatawag sa [`request.followRedirect`](#requestfollowRedirect) ay magpapatuloy sa redirection.

### Instance Properties

#### `request.chunkedEncoding`

Ang `Boolean` ay ang pagtitiyak kung ang request ay gagamit ng HTTP chunked transfer encoding o hindi. I-default sa false The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Instance Methods

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