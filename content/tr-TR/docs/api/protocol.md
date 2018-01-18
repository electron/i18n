# protokol

> Özel bir protokol kaydettirin ve mevcut protokol isteklerini engelleyin.

Süreç: [Ana](../glossary.md#main-process)

Şebeke sunucusu ile aynı etkiye sahip bir protokol uygulamak için bir örnek. `dosya://` protokolü:

```javascript
const {app, protocol} = require('electron')
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

Not: Belirtilmedikçe tüm yöntemler yalnızca uygulama modülünün hazır durumu yayınlandıktan sonra kullanılabilir.

## Metodlar

`protokol` modülünde aşağıdaki yöntemler bulunur:

### `protocol.registerStandardSchemes(schemes[, options])`

* `schemes` String[] - Standart şema olarak kaydedilecek özel şemalar.
* `ayarlar` Obje (isteğe bağlı) 
  * `güvenli` Boolean (isteğe bağlı) - `True` şemasını güvenli olarak kaydetmek için. Varsayılan `false`.

Standart bir şema, RFC 3986'ın çağırdığı [genel URL'ye uygun sözdizimi](https://tools.ietf.org/html/rfc3986#section-3). Örneğin `http` ve `https` standart şemalardır; `dosyası` ise değildir.

Bir planı standart olarak kaydetmek, göreceli ve mutlak kaynakların sunulduğunda doğru bir şekilde çözülmesini sağlayacaktır. Aksi takdirde şema `file` protokolu gibi davranır, ancak belirsiz URL' leri çözme becerisine sahip değildir.

Örneğin, özel protokollü aşağıdaki sayfayı yüklediğinizde, standart şema olarak kaydettiğinizde, resim yüklenmeyecektir çünkü standart olmayan şemalar göreceli URL'leri tanımlayamaz:

```html
<body>
  <img src='test.png'>
</body>
```

Kayıt şeması [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) aracılığıyla dosyalara ulaşım sağlar. Aksi takdirde rendercı şema için güvenlik hatası verir.

Varsayılan olarak, standart olmayan şemalar için web depolama apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) devre dışı bırakılmıştır. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme:

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**Note:** Bu yöntem sadece `app` modülünün `ready` olayını yayımlamasından önce kullanabilir.

### `protocol.registerServiceWorkerSchemes(schemes)`

* `şemalar` String[] - Hizmet çalışanlarını işlemek üzere kaydedilecek özel şemalar.

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `filePath` String (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Dosyayı yanıt olarak gönderecek `şema` protokolünü kaydeder. The `handler` will be called with `handler(request, callback)` when a `request` is going to be created with `scheme`. `completion` will be called with `completion(null)` when `scheme` is successfully registered or `completion(error)` when failed.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({path: filePath})`.

When `callback` is called with nothing, a number, or an object that has an `error` property, the `request` will fail with the `error` number you specified. Mevcut hata numaraları için lütfen bakın [net hataların listesi](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Varsayılan olarak, `scheme`, `http:` gibi işlem görür,ki bu "jenerik URI söz dizimini" izleyen protokollerden farklı olarak ayrıştırılır "` dosyası gibi: `, bu nedenle, şemanızın standart bir şema olarak işlenmesi için muhtemelen `protocol.registerStandardSchemes` 'i çağırmak istiyorsunuz.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

`Buffer`'ı yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `Buffer` nesnesi veya `data`,`mimeType` ve `charset` özelliklerine sahip bir nesneyle çağrılması gerekir.

Örnek:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `data` String (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

`String`'i yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `String` veya `data` olan bir nesne ile çağrılmalıdır, `mimeType` ve `charset` özelliklerine sahiptir.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `talebi yönlendir` Nesne 
      * `url` Dize
      * `method` Dizi
      * `session` Obje isteğe bağlı
      * `bilgiyi yükle` Obje (isteğe bağlı) 
        * `contentType` Dize - İçeriğin MIME türünü gösterir.
        * `data` Dize - Gönderilecek içerik.
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Yanıt olarak bir HTTP isteği göndererek `scheme` protokolünü kaydeder.

`callback`, `url` olan bir `redirectRequest` nesnesi ile çağrılması dışında, `registerFileProtocol` ile kullanımı aynıdır. `method`, url ` referrer `, `uploadData` ve `session` özelliklerine sahiptir.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

POST istekleri için `uploadData` nesnesi sağlanmalıdır.

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` Dizi
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

`şemanın` özel protokol kaydını iptal eder.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` Dizi
* `geri arama` Fonksiyon 
  * `error` Hata 

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `filePath` Dizi
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `data` String (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `buffer` Buffer (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Fonksiyon 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` String
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri arama` Fonksiyon 
    * `talebi yönlendir` Nesne 
      * `url` Dize
      * `method` Dizi
      * `session` Obje isteğe bağlı
      * `bilgiyi yükle` Obje (isteğe bağlı) 
        * `contentType` Dize - İçeriğin MIME türünü gösterir.
        * `data` Dize - Gönderilecek içerik.
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` Dizi
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Hata 

`Şema` için kurulmuş olan önleyiciyi kaldırın ve orijinal işleyicisini geri yükleyin.