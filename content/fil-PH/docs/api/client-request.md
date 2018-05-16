## Klase: ClientRequest

> Gawin ang mga kahilingan ng HTTP/HTTPS.

Proseso:[Pangunahi](../glossary.md#main-process)

`ClientRequest`ipinatupad ng mga [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface at samakatuwid ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `bagong ClientRequest(options)
 
Context | Request Context
`

* `pagpipilian` (Object | String) - Kung `mga opsyon` ay isang String, nangangahulugang hiling ng URL. Kung ito ay isang object, inaasahang ganap na tumutukoy ang isang HTTP mag-request sa pamamagitan ng sumusunod na: 
  * `method` String (opsyonal) - Paraan ng HTTP request. Mga defaults sa GET na paraan.
  * `url` String (opsyonal) - Ang request ng URL. Dapat maibigay ang ganap na anyo ng pamamaraan ng protocol na tinutukoy bilang http or https. 
  * `session` Object (opsyonal) - Ang [`Session`](session.md) halimbawa kung saan nauugnay ang request.
  * `partition` String (opsyonal) - Ang pangalan ng [`partition`](session.md) kung saan nauunay ang request. Defaults ng mga walang laman na string. Ang `session` opsyon na mananaig sa `partition`. Kaya kung ang isang `session` ay maliwanag na tinutukoy, ang `partition` ay binabalewala.
  * `protocol` String (opsyonal) - Ang pamamaraan ng protocol sa 'scheme:' form. Kasalukuyang suportadong values ay 'http:' o 'https:'. Defaults sa 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `hostname` String (opsyonal) - Ang host name ng server.
  * `port` Integer (opsyonal) - Ang listening port number ng server.
  * `path` String (opsyonal) - Ang path na parte sa request URL.
  * `redirect` String (opsyonal) - Ang redirect mode para sa request na ito. Nararapat na isa sa `follow`, `error` o `manual`. Ang defaults sa `follow`. Kapag mode ay `error`, anumang redirection ay mauudlot. Kapag mode ay `manual` ang redirection ay ipinagpaliban hanggang [`request.followRedirect`](#requestfollowredirect) ay mapakiusapan. Pakinggan ang [`redirect`](#event-redirect) na event sa mode na ito upang makakakuha ng nmga detalye tungkol sa redirect na request.

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

Ibinabalik ang:

* `response` IncomingMessage - Isang bagay na kumakatawan ng HTTP response message.

#### Event: 'login'

Pagbabalik:

* `ang authInfo` Bagay 
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Punsyon 
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

#### Pangyayari: 'error'

Ibinabalik ang:

* `error` Error - isang error object na nagbibigay impormasyon tungkol sa kabiguan.

Matatanggal kapag nabigo ang `net` na module sa pag-issue ng network request. Karaniwan kapag ang `request` object ay nagtanggal ng `error` na event, isang `close` na event na sumusubaybay at walang response na object ang ilalaan.

#### Event: 'isara'

Tinatanggal bilang panghuling event sa HTTP request-response transaction. Ang `close` na event ay nagsasaad na walang tatanggalin na events alinman sa `request` o `response` na mga object.

#### Event: 'redirect'

Ibinabalik ang:

* `statusCode` Integer
* `method` na String
* `redirectUrl` String
* `responseHeaders` Object

Tinatanggal kapag mayroong redirection at ang mode ay `manual`. Pagtatawag sa [`request.followRedirect`](#requestfollowredirect) ay magpapatuloy sa redirection.

### Mga Katangian ng Instansya

#### `request.chunkedEncoding`

Ang `Boolean` ay ang pagtitiyak kung ang request ay gagamit ng HTTP chunked transfer encoding o hindi. Naka-default sa false. Ang property ay nababasa at nasusulat, ngunit ito ay mai-set lamang kapag hindi pa nailagay sa wire ang first write operation bilang HTTP headers. Subukang i-set ang `chunkedEncoding` property matapos ang first write ay magiging isang error.

Ang paggamit ng chunked encoding ay mahalagang inirerekumenda kung kailangan mag-send ng large request body bilang data ay mai-steam sa small chunks sa halip na mag-buffer sa loob ng Electron process memory.

### Mga pamamaraan ng pagkakataon

#### `request.setHeader(name, value)`

* `name` String - Isang extra na HTTP header name.
* `value` Object - Isang extra na HTTP header value.

Nagdadagdag ng extra HTTP header. Ang header name ay iniisyu na parang walang lowercasing. Ito ay maaaring lamang tawagin bago ang first write. Ang pagtatawag ng method na ito matapos ang first write ay magiging error. KUng ang napasa na value ay hindi `String`, ang `toString()` na method ay tatawagin para kumuha ng huling value.

#### `request.getHeader(name)`

* `name` String - Tumukoy ng dugtong na pangalan ng header.

Returns `Object` - Ang value ng nauunang dugtong na pangalan ng header.

#### `request.removeHeader(name)`

* `name` String - Tumukoy ng dugtong na pangalan ng header.

Nagtatanggal ng nauunang itinakda na dugtong na pangalan ng header. Ang method na ito ay matatawag lamang bago ang first write. Subukang tumawag matapos ang first write ay magiging error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - Isang tipak sa data ng katawan ng request. Kung ito ay isang string, ito ay mai-convert sa Buffer gamit ang tinutukoy na encoding.
* `encoding` String (opsyonal) - Ginagamit para ma-convert ang mga tipak ng string sa Buffer objects. I-default sa 'utf-8'.
* `callback` Function (opsyonal) - Tinatawag matapos magtatapos ang write operation.

`callback` ay mahalagang manika na function may layuning ipinakilala upang matupad ang pagkapareho ng Node.js API. Ito ay tinatawag na asynchronous sa susunod na tik matapos maihatid ang `chunk` na nilalaman sa Chromium na networking layer. Kasalungat sa pagpapatupad ng Node.js, hindi garantisado na ang `chunk` na nilalaman ay na-flush sa wire bago itinawag ang `callback`.

Nagdaragdag ng tipak na data sa katawan ng request. Ang first write na operation ay maaaring maging sanhi na ma-issue sa wire ang request na mga headers. Matapos ang first write operation, hindi na pwedeng magdagdag o magalis ng custom na header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (opsyonal)
* `encoding` String (opsyonal)
* `callback` Function (opsyonal)

Ipinapapadala ang huling tipak sa request na data. Kasunod na sulat o patapos na operations ay hindi maaari. Ang `finish` na event ay tinatanggal matapos magtapos ang operation.

#### `request.abort()`

Nagkakansela ng isang patuloy na HTTP na transaksyon. Kung ang request ay nagtanggal na ng `close` na event, ang na-abort na operation ay wala ng bisa. Kung hindi, ang patuloy na event ay nagtatanggal ng `abort` at `close` na mga event. Bukod nito, kung may patuloy na response object, itoo ay tinatanggal ng `aborted` na event.

#### `request.followRedirect()`

Pinapatuloy ang alinmang pinapaliban na redirection request kung ang redirection mode ay 0>manual</code>.