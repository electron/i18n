# protokol

> Özel bir protokol kaydettirin ve mevcut protokol isteklerini engelleyin.

İşlem: [Ana](../glossary.md#main-process)

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

## Yöntemler

`protokol` modülünde aşağıdaki yöntemler bulunur:

### `protocol.registerStandardSchemes(schemes[, options])`

* `schemes` String[] - Standart şema olarak kaydedilecek özel şemalar.
* `seçenekler` Obje (opsiyonel) 
  * `güvenli` Boolean (isteğe bağlı) - `True` şemasını güvenli olarak kaydetmek için. Varsayılan `false`.

Standart bir şema, RFC 3986'ın çağırdığı [genel URL'ye uygun sözdizimi](https://tools.ietf.org/html/rfc3986#section-3). Örneğin `http` ve `https` standart şemalardır; `dosyası` ise değildir.

Bir planı standart olarak kaydetmek, göreceli ve mutlak kaynakların sunulduğunda doğru bir şekilde çözülmesini sağlayacaktır. Aksi takdirde şema `file` protokolu gibi davranır, ancak belirsiz URL' leri çözme becerisine sahip değildir.

Örneğin, özel protokollü aşağıdaki sayfayı yüklediğinizde, standart şema olarak kaydettiğinizde, resim yüklenmeyecektir çünkü standart olmayan şemalar göreceli URL'leri tanımlayamaz:

```html<body>
  <img src='test. png'>
</body>
```

Kayıt şeması [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) aracılığıyla dosyalara ulaşım sağlar. Aksi takdirde rendercı şema için güvenlik hatası verir.

Varsayılan olarak, standart olmayan şemalar için web depolama apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) devre dışı bırakılmıştır. Yani çoğu zaman `http` protokolünün yerine özel bir protokol kaydetmek istiyorsanız standart düzeni kaydeder gibi kaydetmelisiniz:

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
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `execPath` Dizgi (isteğe bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

Dosyayı yanıt olarak gönderecek `şema` protokolünü kaydeder. `handler`, bir `request``scheme` ile oluşturulacağı zaman `handler(request, callback)` ile çağırılacak. `completion`, `scheme` başarılı bir şekilde kaydolduğunda `completion(null)` ile veya başarısız olduğunda `completion(error)` ile çağırılacak.

`request`'i işleyebilmek için `callback` ya dosyanın yoluyla ya da `path` özelliği olan bir obje ile çağırılmalıdır, örneğin `callback(filePath)` veya `callback({path: filePath})`.

`callback` hiçbir şeyle, bir sayıyla ya da `error` özelliği olan bir nesneyle çağırıldığı zaman `request` belirttiğiniz ` error` numarası ile başarısız olacaktır. Mevcut hata numaraları için lütfen bakın [net hataların listesi](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Varsayılan olarak, `scheme`, `http:` gibi işlem görür,ki bu "jenerik URI söz dizimini" izleyen protokollerden farklı olarak ayrıştırılır "` dosyası gibi: `, bu nedenle, şemanızın standart bir şema olarak işlenmesi için muhtemelen `protocol.registerStandardSchemes` 'i çağırmak istiyorsunuz.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (isteğe bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`Buffer`'ı yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `Buffer` nesnesi veya `data`,`mimeType` ve `charset` özelliklerine sahip bir nesneyle çağrılması gerekir.

Örneğin:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `data` Dizge (İsteğe Bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`String`'i yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `String` veya `data` olan bir nesne ile çağrılmalıdır, `mimeType` ve `charset` özelliklerine sahiptir.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `talebi yönlendir` Nesne 
      * `url` Dize
      * `method` String
      * `session` Obje isteğe bağlı
      * `bilgiyi yükle` Obje (opsiyonel) 
        * `contentType` Dize - İçeriğin MIME türünü gösterir.
        * `data` Dize - Gönderilecek içerik.
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

Yanıt olarak bir HTTP isteği göndererek `scheme` protokolünü kaydeder.

`callback`, `url` olan bir `redirectRequest` nesnesi ile çağrılması dışında, `registerFileProtocol` ile kullanımı aynıdır. `method`, url ` referrer `, `uploadData` ve `session` özelliklerine sahiptir.

Varsayılan olarak HTTP isteği geçerli oturumu tekrar kullanır. İsteğin farklı bir oturuma sahip olmasını isterseniz `session`' ı `null` olarak ayarlamanız gerekir.

POST istekleri için `uploadData` nesnesi sağlanmalıdır.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `headers` Nesne
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

Yanıt olarak `Readable` gönderen bir `scheme` protokolünü kaydeder.

Kullanımı, diğer `register{Any}Protocol`'e benzer, ancak `callback`'nin bir `Readable` nesne veya `data`, `statusCode` ve `headers` özelliklere sahip bir nesneyle çağrılması gerekir.

Örnek:

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

Okunabilir akış API (emits`data`/`end`/`error` events)'ı uygulayan herhangi bir nesneyi iletmek mümkündür. Örneğin, bir dosyanın nasıl geri gönderilebileceği aşağıda açıklanmıştır:

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

* `scheme` String
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`şemanın` özel protokol kaydını iptal eder.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `geri aramak` Function 
  * `error` Error

`callback`, `scheme` için zaten halihazırda bir işleyici olup olmadığını gösteren bir boolean ile çağrılır.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `filePath` Dizi
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir dosya yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `data` Dizge (İsteğe Bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir `String` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `buffer` Arabellek (isteğe bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir `Buffer` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `referrer` Dize
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `talebi yönlendir` Nesne 
      * `url` Dize
      * `method` Dizi
      * `session` Obje isteğe bağlı
      * `bilgiyi yükle` Obje (opsiyonel) 
        * `contentType` Dize - İçeriğin MIME türünü gösterir.
        * `data` Dize - Gönderilecek içerik.
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`scheme` protokolünü böler ve cevap olarak yeni bir HTTP isteği yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `halledici` Function 
  * `istek` Nesne 
    * `url` Dize
    * `headers` Nesne
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (isteğe bağlı)
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

Mevcut bir protokol işlecinin yerini alması dışında, `protocol.registerStreamProtocol` ile aynı.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `tamamlanış` Fonksiyon (isteğe bağlı) 
  * `error` Error

`Şema` için kurulmuş olan önleyiciyi kaldırın ve orijinal işleyicisini geri yükleyin.