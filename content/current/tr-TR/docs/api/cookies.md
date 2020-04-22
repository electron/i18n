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
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * `name` Katar (opsiyonel) - Çerezleri isme göre filtrele.
  * `domain` Katar (opsiyonel) - `domains` ile eşleşen domain'lerin çerezlerini çeker.
  * `path` Katar (opsiyonel) - `path` ile eşleşen çerezleri çeker.
  * `secure` Boolean (opsiyonel) - Secure özelliği olan çerezleri çeker.
  * `session` Boolean (opsiyonel) - Oturumu ya da kalıcı çerezleri filtreler.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `details` Object
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` Karakter (opsiyonel) - Çerezin alan adı; bu, önceki bir nokta ile normalleştirilir, böylece alt alanlar için de geçerlidir. Empty by default if omitted.
  * `path` Dize (opsiyonel) - Çerezin yolu. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Varsayılan olarak değer false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Varsayılan yanlış.
  * `expirationDate` Double (opsiyonel) - UNIX epoch başlangıcından itibaren saniyeler cinsinden çerezin geçerliliğini yitirme süresi. Eğer boş geçilirse, çerez bir oturum çerezi olarak algılanır ve farklı oturumlar arasında kalıcı olmaz.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.remove(url, name)`

* `url` String - URL ile ilişkilendirilen çerez.
* `name` Katar - Silinecek çerezin ismi.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Yazılmamış çerezlerı disk'e yazar.
