## Sınıf: Cookies

> Oturumdaki çerezleri sorgulayın veya değiştirin.

İşlem: [Ana](../glossary.md#main-process)

`Cookies`'den türeyen objecler `Session'ın` `cookies` sembolü ile erişilir.

Örneğin:

```javascript
const { session } = require('electron')

// Tüm çerezleri sorgula.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### Örnek olayları

Aşağıdaki olaylar `Cookies` sınıfından türeyen objelerde mevcuttur:

#### Olay: 'changed'

* `event` Olay
* `cookie` [Çerez](structures/cookie.md) - Değişen çerez.
* `cause` String - The cause of the change with one of the following values:
  * `explicit` - Çerez direkt olarak kullanıcının bir aksiyonu tarafından değiştirildi.
  * `overwrite` - Çerez, aynı isimde yeni bir çerez eklendiği için silindi.
  * `expired` - Çerez, süresi dolduğu için otomatik olarak silindi.
  * `evicted` - Çerez, çöp toplama sürecinde otomatik olarak tahliye edildi.
  * `expired-overwrite` - Zaten zamanı dolmuş çerez tarafından üzerine yazma işlemi yapıldı.
* `removed` Boolean - Çerez silinmişse `true`, aksi halde `false` döner.

Herhangi bir çerez eklenmiş, silinmiş, düzenlenmiş veya süresi bitmiş olduğunda gönderilir.

### Örnek yöntemler

Aşağıdaki metodlar `Cookies` sınıfının örneklerinde mevcut:

#### `cookies.get(filter)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` Katar (opsiyonel) - Çerezleri isme göre filtrele.
  * `domain` Katar (opsiyonel) - `domains` ile eşleşen domain'lerin çerezlerini çeker.
  * `path` Katar (opsiyonel) - `path` ile eşleşen çerezleri çeker.
  * `secure` Boolean (opsiyonel) - Secure özelliği olan çerezleri çeker.
  * `session` Boolean (opsiyonel) - Oturumu ya da kalıcı çerezleri filtreler.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.get(filter, callback)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` Katar (opsiyonel) - Çerezleri isme göre filtrele.
  * `domain` Katar (opsiyonel) - `domains` ile eşleşen domain'lerin çerezlerini çeker.
  * `path` Katar (opsiyonel) - `path` ile eşleşen çerezleri çeker.
  * `secure` Boolean (opsiyonel) - Secure özelliği olan çerezleri çeker.
  * `session` Boolean (opsiyonel) - Oturumu ya da kalıcı çerezleri filtreler.
* `callback` Function
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - Çerez objeleri dizisi.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` Katar - Çerezin ilişkilendirileceği url. The promise will be rejected if the url is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` Karakter (opsiyonel) - Çerezin alan adı; bu, önceki bir nokta ile normalleştirilir, böylece alt alanlar için de geçerlidir. Empty by default if omitted.
  * `path` Dize (opsiyonel) - Çerezin yolu. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Varsayılan olarak değer false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Varsayılan yanlış.
  * `expirationDate` Double (opsiyonel) - UNIX epoch başlangıcından itibaren saniyeler cinsinden çerezin geçerliliğini yitirme süresi. Eğer boş geçilirse, çerez bir oturum çerezi olarak algılanır ve farklı oturumlar arasında kalıcı olmaz.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.set(details, callback)`

* `details` Object
  * `url` Katar - Çerezin ilişkilendirileceği url.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` Dize (opsiyonel) - Çerezin alan adı. Empty by default if omitted.
  * `path` Dize (opsiyonel) - Çerezin yolu. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Varsayılan olarak değer false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Varsayılan yanlış.
  * `expirationDate` Double (opsiyonel) - UNIX epoch başlangıcından itibaren saniyeler cinsinden çerezin geçerliliğini yitirme süresi. Eğer boş geçilirse, çerez bir oturum çerezi olarak algılanır ve farklı oturumlar arasında kalıcı olmaz.
* `callback` Function
  * `error` Error

`details<code> ile bir çerez ataması yapar, tamamlandığında <code>callback(error)` çağırılır.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - URL ile ilişkilendirilen çerez.
* `name` Katar - Silinecek çerezin ismi.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, name, callback)`

* `url` String - URL ile ilişkilendirilen çerez.
* `name` Katar - Silinecek çerezin ismi.
* `callback` Function

`url` ve `name` ile eşleşen çerezleri siler, işlem tamamlandığında `callback`, `callback()` şeklinde çağırılır.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Yazılmamış çerezlerı disk'e yazar.

#### `cookies.flushStore(callback)`

* `callback` Function

Yazılmamış çerezlerı disk'e yazar.

**[Deprecated Soon](modernization/promisification.md)**
