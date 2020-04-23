## Klase: ClientRequest

> Gawin ang mga kahilingan ng HTTP/HTTPS.

Proseso:[Pangunahi](../glossary.md#main-process)

`ClientRequest`ipinatupad ng mga [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface at samakatuwid ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `bagong ClientRequest(options)
 
Context | Request Context
`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Session (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partition` String (opsyonal) - Ang pangalan ng [`partition`](session.md) kung saan nauunay ang request. Defaults ng mga walang laman na string. Ang `session` opsyon na mananaig sa `partition`. Kaya kung ang isang `session` ay maliwanag na tinutukoy, ang `partition` ay binabalewala.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session.  This will make the `net` request's cookie behavior match a `fetch` request. Ang default ay `false`.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `hostname` String (opsyonal) - Ang host name ng server.
  * `port` Integer (opsyonal) - Ang listening port number ng server.
  * `path` String (opsyonal) - Ang path na parte sa request URL.
  * `redirect` String (opsyonal) - Ang redirect mode para sa request na ito. Nararapat na isa sa `follow`, `error` o `manual`. Ang defaults sa `follow`. Kapag mode ay `error`, anumang redirection ay mauudlot. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.

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

### Halimbawa ng mga Event

#### Event: 'response'

Pagbabalik:

* `response` IncomingMessage - Isang bagay na kumakatawan ng HTTP response message.

#### Event: 'login'

Pagbabalik:

* `authInfo` Object
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` na Function
  * `username` String (optional)
  * `password` String (optional)

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

Naalis pagkatapos ng huling tipak sa  `request` ng mga data na isinulat para sa `request` object.

#### Event: 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Pangyayari: 'error'

Pagbabalik:

* `error` Error - isang error object na nagbibigay impormasyon tungkol sa kabiguan.

Matatanggal kapag nabigo ang  `net` na module sa pag-issue ng network request. Karaniwan kapag ang  `request` object ay nagtanggal ng `error` na event, isang `close` na event na sumusubaybay at walang response na object ang ilalaan.

#### Event: 'isara'

Tinatanggal bilang panghuling event sa HTTP request-response transaction. Ang  `close` na event ay nagsasaad na walang tatanggalin na events alinman sa `request` o `response` na mga object.


#### Event: 'redirect'

Pagbabalik:

* `statusCode` Integer
* `method` na String
* `redirectUrl` String
* `responseHeaders` Record<String, String[]>

Emitted when the server returns a redirect response (e.g. 301 Moved Permanently). Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.  If this event is handled, [`request.followRedirect`](#requestfollowredirect) must be called **synchronously**, otherwise the request will be cancelled.

### Katangian ng pagkakataon

#### `request.chunkedEncoding`

Ang `Boolean` ay ang pagtitiyak kung ang request ay gagamit ng HTTP chunked transfer encoding o hindi. Ang default na mali. Ang property ay nababasa at nasusulat, ngunit ito ay mai-set lamang kapag hindi pa nailagay sa wire ang first write operation bilang HTTP headers. Subukang i-set ang `chunkedEncoding` property matapos ang first write ay magiging isang error.

Ang paggamit ng chunked encoding ay mahalagang inirerekumenda kung kailangan mag-send ng large request body bilang data ay mai-steam sa small chunks sa halip na mag-buffer sa loob ng Electron process memory.

### Mga Halimbawa ng Sistematikong Paraan

#### `request.setHeader(name, value)`

* `name` String - Isang extra na HTTP header name.
* `value` String - An extra HTTP header value.

Nagdadagdag ng extra HTTP header. The header name will be issued as-is without lowercasing. Ito ay maaaring lamang tawagin bago ang first write. Ang pagtatawag ng method na ito matapos ang first write ay magiging error. KUng ang napasa na value ay hindi `String`, ang `toString()` na method ay tatawagin para kumuha ng huling value.

#### `request.getHeader(name)`

* `name` String - Tumukoy ng dugtong na pangalan ng header.

Returns `String` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Tumukoy ng dugtong na pangalan ng header.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (opsyonal) - Tinatawag matapos magtatapos ang write operation.

`callback` ay mahalagang manika na function may layuning ipinakilala upang matupad ang pagkapareho ng Node.js API. Ito ay tinatawag na asynchronous sa susunod na tik matapos maihatid ang `chunk` na nilalaman sa Chromium na networking layer. Kasalungat sa pagpapatupad ng Node.js, hindi garantisado na ang `chunk` na nilalaman ay na-flush sa wire bago itinawag ang  `callback`.

Nagdaragdag ng tipak na data sa katawan ng request. Ang first write na operation ay maaaring maging sanhi na ma-issue sa wire ang request na mga headers. Matapos ang first write operation, hindi na pwedeng magdagdag o magalis ng custom na header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (opsyonal)
* `encoding` String (opsyonal)
* `callback` Function (opsyonal)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Nagkakansela ng isang patuloy na HTTP na transaksyon. Kung ang request ay nagtanggal na ng `close` na event, ang na-abort na operation ay wala ng bisa. Kung hindi, ang patuloy na event ay nagtatanggal ng `abort` at `close` na mga event. Bukod nito, kung may patuloy na response object, itoo ay tinatanggal ng `aborted` na event.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Returns `Object`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.
