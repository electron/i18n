## Sınıf: Webİsteği

> HTTP/HTTPS isteklerini yap.

Süreç: [Ana](../glossary.md#main-process)

`ClientRequest` [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface'ini implement eder, bu yüzden de o bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dır.

### `new ClientRequest(options)`

* `seçenekler` (Object | String) - Eğer `seçenekler` bir String ise o, bir istek URL olarak yorumlanır. Eğer bir object ise bir HTTP isteğini aşağıdaki özellikler ile tam olarak belirtmesi beklenir: 
  * `method` String (isteğe bağlı) - HTTP istek metodu. Varsayılan GET metodudur.
  * `url` String (isteğe bağlı) - İstek URL'si. Belirtilen http veya https protokol şeması ile mutlak formunda kesinlikle sağlanmalıdır.
  * `session` Object (isteğe bağlı) - İlişkili olduğu istek ile [`Session`](session.md) örneği.
  * `partition` String (isteğe bağlı) - İlişkili olduğu istek ile [`partition`](session.md)'nın ismi. Varsayılan boş string. `session` seçeneği `partition`'da hakimdir. Böylelikle `session` açıkça belirtilmedikçe, `partition` yoksayılır.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'
  * `hostname` String (optional) - The server host name.
  * `port` Integer (optional) - The server's listening port number.
  * `path` Dize (opsiyonel) - İstek URL'sinin yolu.
  * `redirect` String (optional) - The redirect mode for this request. Should be one of `follow`, `error` or `manual`. `follow`'a varsayılan olarak belirler. Mod `error` olduğunda bütün yönlendirmeler iptal edilecektir. When mode is `manual` the redirection will be deferred until [`request.followRedirect`](#requestfollowRedirect) is invoked. Listen for the [`redirect`](#event-redirect) event in this mode to get more details about the redirect request.

`protocol`, `host`, `hostname`, `port` ve `path` gibi `options` özellikleri, [URL](https://nodejs.org/api/url.html) modülünde açıklandığı gibi Node.js modeline kesinlikle uyar.

Örneğin, 'github.com' için aşağıdaki gibi aynı isteği oluşturabiliriz:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Örnek etkinlikler

#### Etkinlik: 'tepki'

Dönüşler:

* `response` IncomingMessage - An object representing the HTTP response message.

#### Etkinlik: 'giriş'

Dönüşler:

* `authInfo` Nesne 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Fonksiyon 
  * `username` String
  * `password` String

Kimlik doğrulaması yapan bir proxy, kullanıcı bilgilerini istendiğinde yayınlar.

`callback` fonksiyonunun kullanıcı bilgileri ile geri çağırılması bekleniyor:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Boş kimlik bilgileri sağlanması isteği iptal eder ve yanıt nesnesinde bir kimlik doğrulama hatası rapor eder:

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

#### Etkinlik: 'bitiş'

Emitted just after the last chunk of the `request`'s data has been written into the `request` object.

#### Etkinlik: 'iptal etmek'

`request` iptal edildiğinde yayınlanır. Eğer `request` zaten kapatıldıysa `abort` etkinliği tetiklenmeyecektir.

#### Event: 'error'

Dönüşler:

* `error` Hata - sorun hakkında bazı bilgileri sağlayan hata nesnesi.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Etkinlik: 'kapalı'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Etkinlik: 'yönlendirme'

Dönüşler:

* `statusCode` Tamsayı
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowRedirect) will continue with the redirection.

### Örnek özellikleri

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Varsayılan yanlış. Telefon üzerinde mülkiyet okunabilir ve yazılabilir, ancak HTTP başlıkları henüz koyulmadığından bu işlem yalnızca yazmadan önce ayarlanabilir. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Örnek yöntemleri

#### `request.setHeader(name, value)`

* `name` String - An extra HTTP header name.
* `value` Object - An extra HTTP header value.

İlave bir HTTP başlığı ekler. Başlık adı, karakter küçültmesi yapmadan verilir. Sadece ilk yazmadan önce çağrılabilir. Bu yöntemi ilk yazmadan sonra aramak hata atacaktır. Verilen değer `String` değil ise, `toString()` metoduyla son değer elde edilir.

#### `request.getHeader(name)`

* `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` Dize - İlave bir başlık adı belirtin.

Daha önceden belirlenmiş olan ilave başlığı kaldırır. Bu yöntem yalnızca ilk yazma işleminden önce yapılabilir. İlk yazma işleminden sonra yapmaya çalışmak bir hata oluşturacaktır.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Fonksiyon (opsiyonel) - Yazma işlemi bittikten sonra çağırılır.

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Contrary to the Node.js implementation, it is not guaranteed that `chunk` content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on the wire. İlk yazma işlemi sonrasında kişisel bir başlık eklemeye veya kaldırmaya izin verilmez.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Fonksiyonu (opsiyonel)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Devam eden bir HTTP işlemini iptal eder. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Yeniden yönlendirme modu `manuel olduğunda` ertelenen yeniden yönlendirme isteğini sürdürür.