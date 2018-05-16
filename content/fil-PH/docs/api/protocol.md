# ang protokol

> Irehistro ang isang karaniwang protokol at harangin ang umiiral na kahilingang protokol.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang isang halimbawa ng pagpapatupad ng isang protokol na may kaparehas na epekto katulad ng `file://` na protokol:

```javascript
const {app, protocol} = kailangan('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

**Note:** Ang lahat ng mga pamamaraan maliban sa mga tinukoy ay maaari lamang gamitin pagkatapos ng paglabas ng event na `ready` ng modyul ng `app`.

## Mga Paraan

Ang `protocol` na modyul ay mayroong mga sumusunod na mga pamamaraan:

### `protocol.registerStandardSchemes(schemes[, options])`

* `schemes` na String[] - Ang karaniwang panukala na irerehistro bilang mga istandard na iskema.
* `mga pagpipilian` Na Bagay (opsyonal) 
  * `secure` na Boolean (opsyonal) - `true` upang irehistro ang iskema bilang ligtas. Ang default ay `false`.

Ang isang standard na iskema ay sumasang-ayon sa kung tawagin ng RFC 3986 ay [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). Halimbawa ang `http` at ang `https` ay mga istandard na iskema, samantalang ang `file` ay hindi.

Ang pagpaparehistro ng iskema bilang standard, ay papayagan ang may kaugnayan at tiyak na mapagkukunan na malulutas nang tama kapag isinilbi. Kung hindi man, ang panukala ay kikilos ng kagaya ng `file` na protokol, ngunit walang kakayahang lutasin ang may kaugnayang mga URL.

Halimbawa kapag ini-load mo ang mga sumusunod na pahina na may karaniwang protokol na hindi inirerehistro ito bilang standard na iskema, ang imahe ay hindi mailoload sapagkat ang hindi istandard na mga iskema ay hindi makakakilala ng may kaugnayang mga URL:

```html
<body>
  <img src='test.png'>
</body>
```

Ang pagrerehistro sa isang iskema bilang standard ay pinapayagan ang pagpunta sa mga file sa pamamagitan ng [FileSystemAPI](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Kung hindi man, ang taga-render ay magbabato ng isang pang-seguridad na pagkakamali para sa iskema.

Sa default, ang mga api ng imbakan ng web (localStorage, sessionStorage, webSQL, indexedDB, cookies) ay hindi pinagana para sa hindi istandard na mga iskema. Kaya sa pangkalahatan kung gusto mong irehistro ang isang karaniwang protokol para palitan ng `http` na protokol, kailangan mo itong irehistro bilang isang istandard na iskema:

```javascript
const {app, protocol} = kailangan('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**Tandaan:** Ang pamamaraan na ito ay maaari lamang gamitin bago lumabas ang ang `ready` na event ng `app` na modyul.

### `protocol.registerServiceWorkerSchemes(mga panukala)`

* `schemes` String[] - Ang karaniwang mga iskema na irerehistro para hawakan ang mga panserbisyong mga manggagawa.

### `protocol.registerFileProtocol(panukala, tagahawak[,pagkumpleto])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` String
    * ang `uploadData` sa [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `filePath` na String (opsyonal)
* `ang pagkumpleto` Function (opsyonal) 
  * `error` Error

Nagrerehistro ang isang protokol ng `scheme` na magpapadala sa file bilang isang tugon. Ang `handler` ay tatawagin kasama ang `handler(request, callback)` kapag ang isang `request` ay lilikhain kasama ang `scheme`. Ang `completion` ay tatawagin kasama ang `completion(null)` kapag ang `scheme` ay matagumpay na nairehistro o ang `completion(error)` kapag nabigo.

Para hawakan ang `request`, ang `callback` ay dapat tawagin na may alinman sa landas ng file o isang bagay na may katangian ng `path`, halimbawa. ang `callback(filePath)` o ang `callback({path: filePath})`.

Kapag ang `callback` ay tinawag ng walang kasama na isang numero, o isang bagay na may katangian ng `error`, ang `request` ay mabibigo kasama ang `error` na numero na iyong tinukoy. Para sa magagamit na mga maling numero na iyong gagamitin, pakiusap tingnan ang [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Batay sa default ang `scheme` ay tinatrato katulad ng `http`, na sinusuri ng kakaiba sa mga protokol na sinusundan ang "generic URI syntax" katulad ng `file:`, kaya marahil gusto mong tawagin ang `protocol.registerStandardSchemes` para ang iyong iskema ay itrato bilang isang istandard na iskema.

### `protocol.registerBufferProtocol(iskema, tagahawak[, pagkumpleto])`

* `scheme` na String
* `tagahawak` Punsyon 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (opsyonal)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Nagrerehistro ng isang protokol ng `scheme` na magpapadala ng isang `Buffer` bilang isang tugon.

Ang paggamit ay katulad din ng `registerFileProtocol`, maliban lang na ang `callback` ay dapat tawagin na may isang bagay ng `Buffer` o isang bagay na may mga katangian ng `data`, `mimeType`, at `charset`.

Halimbawa:

```javascript
const {protocol} = kailangan('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.regiterStringProtocol(panukala, tagahwak[, pagkumpleto])`

* `scheme` na String
* `tagahawak` Punsyon 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `data` na String (opsyonal)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Nagrerehistro ng isang protokol ng `scheme` na magpapadala ng isang `String` bilang isang tugon.

Ang paggamit ay katulad din nang `registerFileProtocol`, maliban kung ang `callback` ay dapat tawagin na may isang bagay ng `String` o isang bagay na may mga katangian ng `data`, `mimeType`, at `charset`.

### `ang protocol.registerHttpProtocol(panukala, tagahawak[, pagkumpleto])`

* `scheme` na String
* `tagahawak` Ang Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `ang redirectRequest` Bagay 
      * `url` Tali
      * `method` na String
      * `session` Bagay (opsyonal)
      * `ang uploadData` Bagay (opsyonal) 
        * `contentType` String - Ang uri ng MIME ng mga nilalaman.
        * `data` String - Mga nilalaman na ipapadala.
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Nagrerehistro ng isang protokol ng `scheme` na magpapadala ng isang HTTP na kahilingan bilang isang tugon.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

For POST requests the `uploadData` object must be provided.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `headers` Objek
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

Halimbawa:

```javascript
const {protocol} = require('electron')
const {PassThrough} = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const {protocol} = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` na String
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` na String
* `callback` Function 
  * `error` Error

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `filePath` String
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `data` na String (opsyonal)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Punsyon 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `buffer` Buffer (optional)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `ang redirectRequest` Bagay 
      * `url` Tali
      * `method` na String
      * `session` Bagay (opsyonal)
      * `ang uploadData` Na Bagay (opsyonal) 
        * `contentType` String - Ang uri ng MIME ng mga nilalaman.
        * `data` String - Mga nilalaman na ipapadala.
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` na String
* `tagahawak` Function 
  * `kahilingan` Bagay 
    * `url` Tali
    * `headers` Objek
    * `referer` String
    * `method` na String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` na String
* `pagkumpleto` Function (opsyonal) 
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.