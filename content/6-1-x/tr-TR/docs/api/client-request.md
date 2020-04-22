## Sınıf: Webİsteği

> HTTP/HTTPS isteklerini yap.

İşlem: [Ana](../glossary.md#main-process)

`ClientRequest` [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface'ini implement eder, bu yüzden de o bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dır.

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Object (isteğe bağlı) - İlişkili olduğu istek ile [`Session`](session.md) örneği.
  * `partition` String (isteğe bağlı) - İlişkili olduğu istek ile [`partition`](session.md)'nın ismi. Varsayılan boş string. `session` seçeneği `partition`'da hakimdir. Böylelikle `session` açıkça belirtilmedikçe, `partition` yoksayılır.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `hostname` String (isteğe bağlı) - Sunucu ana bilgisayar adı.
  * `port` Integer (isteğe bağlı) - Sunucunun dinlenen port numarası.
  * `path` String (isteğe bağlı) - İstek URL'sinin yolu.
  * `redirect` String (isteğe bağlı) - Bu istek için yönlendirme modu. `follow`, `error` veya `manual`'den birisi olmalıdır. `follow`'a varsayılan olarak belirler. Mod `error` olduğunda bütün yönlendirmeler iptal edilecektir. Mod `manual` olduğu zaman [`request.followRedirect`](#requestfollowredirect) çağırılana kadar yönlendirme ertelenir. [`redirect`](#event-redirect) olayı için bu modda yönlendirme isteği hakkında daha fazla bilgi almak için dinleyin.

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

### Örnek Events

#### Etkinlik: 'tepki'

Dönüşler:

* `response` IncomingMessage - HTTP yanıt mesajını temsil eden bir nesne.

#### Etkinlik: 'giriş'

Dönüşler:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` Dizi

Kimlik doğrulaması yapan bir proxy, kullanıcı bilgilerini istendiğinde yayınlar.

`callback` fonksiyonunun kullanıcı bilgileri ile geri çağırılması bekleniyor:

* `username` Dizi
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

`request`'in verisinin son parçası `request` nesnesine yazıldıktan hemen sonra yayılır.

#### Etkinlik: 'iptal etmek'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Event: 'error'

Dönüşler:

* `error` Hata - sorun hakkında bazı bilgileri sağlayan hata nesnesi.

`net` modulü bir ağ isteği göndermediği zaman yayılır. Tipik olarak `request` nesnesi `error` olayını yaydığı zaman `close` olayı daha sonra takip edecek ve cevap nesnesi sağlanmayacaktır.

#### Etkinlik: 'kapalı'

HTTP istek-cevap hareketindeki son olay olarak yayınlanır. `close` olayı, `request` ve `response` nesneleri üzerinde daha fazla olay yayınlanmayacağını belirtir.


#### Etkinlik: 'yönlendirme'

Dönüşler:

* `statusCode` Tamsayı
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Örnek özellikleri

#### `request.chunkedEncoding`

Bir `Boolean` isteğin HTTP yığınlı aktarım kodlamasını kullanıp kullanmayacağını belirtir. Varsayılan yanlış. Telefon üzerinde mülkiyet okunabilir ve yazılabilir, ancak HTTP başlıkları henüz koyulmadığından bu işlem yalnızca yazmadan önce ayarlanabilir. İlk yazma bir hata oluşturduktan sonra `chunkedEncoding` özelliğini ayarlamaya çalışır.

Eğer büyük bir istek parçası göndermeniz gerekiyorsa veri, Electron işlem belleği içerisinde dahili olarak ara belleğe yazdırmak yerine küçük yığınlar içinde akar bu yüzden parçalanmış kodlamanın şiddetle kullanılması önerilir.

### Sınıf örneği metodları

#### `request.setHeader(name, value)`

* `name` String - İlave HTTP başlık adı.
* `value` Object - İlave HTTP başlık adı.

İlave bir HTTP başlığı ekler. Başlık adı, karakter küçültmesi yapmadan verilir. Sadece ilk yazmadan önce çağrılabilir. Bu yöntemi ilk yazmadan sonra aramak hata atacaktır. Verilen değer `String` değil ise, `toString()` metoduyla son değer elde edilir.

#### `request.getHeader(name)`

* `name` String - İlave bir başık adını belirtir.

Returns `Object` - Öncesinde ilave olarak ayarlanan başlık adının değeri.

#### `request.removeHeader(name)`

* `name` Dize - İlave bir başlık adı belirtin.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Fonksiyon (opsiyonel) - Yazma işlemi bittikten sonra çağırılır.

`callback` aslında Node.js API ile benzerliğin korunması amacıyla sahte fonksiyon olarak tanıtılır. `chunk` içeriği Chromium ağ katmanına teslim edildikten sonra bir sonraki onay işareti içerisinde asenkron olarak çağırılır. Node.js uygulamasının aksine `callback` çağırılmadan önce `chunk` içeriğinin hat üzerinde hızla akacağının garantisi yoktur.

İstek gövdesine verinin bir parçasını ekler. İlk yazma işlemi talebin üstbilgilerinin kablosunda yayınlanmasına neden olabilmektedir. İlk yazma işlemi sonrasında kişisel bir başlık eklemeye veya kaldırmaya izin verilmez.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (isteğe bağlı)
* `encoding` String (isteğe bağlı)
* `callback` Fonksiyonu (opsiyonel)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Devam eden bir HTTP işlemini iptal eder. Eğer istek `close` olayını önceden yayınlamışsa zorunlu sonlandırma operasyonunun hiçbir etkisi olmayacaktır. Aksi durumda devam eden olay, `abort` ve `close` olaylarını yayar. Buna ek olarak, eğer hali hazırda bir cevap nesnesi varsa, o da `aborted` olayını yayar.

#### `request.followRedirect()`

Yeniden yönlendirme modu `manuel olduğunda` ertelenen yeniden yönlendirme isteğini sürdürür.

#### `request.getUploadProgress()`

`Object` 'i geri getirir:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.
