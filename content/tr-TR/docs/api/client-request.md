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
  * `protocol` String (isteğe bağlı) - 'scheme:' formunda protokol şeması. Şu anda desteklenen değerler 'http:' veya 'https:'dir. Varsayılan 'http:'.
  * `host` String (isteğe bağlı) - Sunucu ana bilgisayar, ana makine adı ve 'hostname:port' port numarasının birleşimi olarak sağlanır
  * `hostname` String (isteğe bağlı) - Sunucu ana bilgisayar adı.
  * `port` Integer (isteğe bağlı) - Sunucunun dinlenen port numarası.
  * `path` String (isteğe bağlı) - İstek URL'sinin yolu.
  * `redirect` String (isteğe bağlı) - Bu istek için yönlendirme modu. `follow`, `error` veya `manual`'den birisi olmalıdır. `follow`'a varsayılan olarak belirler. Mod `error` olduğunda bütün yönlendirmeler iptal edilecektir. Mod `manual` olduğu zaman [`request.followRedirect`](#requestfollowRedirect) çağırılana kadar yönlendirme ertelenir. [`redirect`](#event-redirect) olayı için bu modda yönlendirme isteği hakkında daha fazla bilgi almak için dinleyin.

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

* `response` IncomingMessage - HTTP yanıt mesajını temsil eden bir nesne.

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

`request`'in verisinin son parçası `request` nesnesine yazıldıktan hemen sonra yayılır.

#### Etkinlik: 'iptal etmek'

`request` iptal edildiğinde yayınlanır. Eğer `request` zaten kapatıldıysa `abort` etkinliği tetiklenmeyecektir.

#### Event: 'error'

Dönüşler:

* `error` Hata - sorun hakkında bazı bilgileri sağlayan hata nesnesi.

`net` modulü bir ağ isteği göndermediği zaman yayılır. Tipik olarak `request` nesnesi `error` olayıtını yaydığı zaman `close` olayı daha sonra takip edecek ve cevap nesnesi sağlanmayacaktır.

#### Etkinlik: 'kapalı'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Etkinlik: 'yönlendirme'

Dönüşler:

* `statusCode` Tamsayı
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Bir yönlendirme ve mod `manual` olduğunda yayılır. [`request.followRedirect`](#requestfollowRedirect)'i çağırmak yönlendirme ile devam edecektir.

### Örnek özellikleri

#### `request.chunkedEncoding`

Bir `Boolean` isteğin HTTP yığınlı aktarım kodlamasını kullanıp kullanmayacağını belirtir. Varsayılan yanlış. Telefon üzerinde mülkiyet okunabilir ve yazılabilir, ancak HTTP başlıkları henüz koyulmadığından bu işlem yalnızca yazmadan önce ayarlanabilir. İlk yazma bir hata oluşturduktan sonra `chunkedEncoding` özelliğini ayarlamaya çalışır.

Eğer büyük bir istek parçası göndermeniz gerekiyorsa veri, Electron işlem belleği içerisinde dahili olarak ara belleğe yazdırmak yerine küçük yığınlar içinde akar bu yüzden parçalanmış kodlamanın şiddetle kullanılması önerilir.

### Örnek Metodlar

#### `request.setHeader(name, value)`

* `name` String - İlave HTTP başlık adı.
* `value` Object - İlave HTTP başlık adı.

İlave bir HTTP başlığı ekler. Başlık adı, karakter küçültmesi yapmadan verilir. Sadece ilk yazmadan önce çağrılabilir. Bu yöntemi ilk yazmadan sonra aramak hata atacaktır. Verilen değer `String` değil ise, `toString()` metoduyla son değer elde edilir.

#### `request.getHeader(name)`

* `name` String - İlave bir başık adını belirtir.

Returns `Object` - Öncesinde ilave olarak ayarlanan başlık adının değeri.

#### `request.removeHeader(name)`

* `name` Dize - İlave bir başlık adı belirtin.

Daha önceden belirlenmiş olan ilave başlığı kaldırır. Bu yöntem yalnızca ilk yazma işleminden önce yapılabilir. İlk yazma işleminden sonra yapmaya çalışmak bir hata oluşturacaktır.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - istek gövdesinin verisinin bir parçası. Eğer bir string ise belirtilen kodlama kullanılarak bir Buffer içerisine dönüştürülür.
* `encoding` String (isteğe bağlı) - String parçalarını Buffer nesneleri içine dönüştürmek için kullanılır. Varsayılan 'utf-8'.
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