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

### Sınıf Örneği Olayları

Aşağıdaki olaylar `Cookies` sınıfından türeyen objelerde mevcuttur:

#### Olay: 'changed'

* `event` Event
* `cookie` [Çerez](structures/cookie.md) - Değişen çerez.
* `cause` Katar - Olan değışimin nedeni (Aşağıdaki değerlerle): 
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

* `Filtre` Object 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * `name` Katar (opsiyonel) - Çerezleri isme göre filtrele.
  * `domain` Katar (opsiyonel) - `domains` ile eşleşen domain'lerin çerezlerini çeker.
  * `path` Katar (opsiyonel) - `path` ile eşleşen çerezleri çeker.
  * `secure` Boolean (opsiyonel) - Secure özelliği olan çerezleri çeker.
  * `session` Boolean (opsiyonel) - Oturumu ya da kalıcı çerezleri filtreler.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `details` Obje 
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` Katar (opsiyonel) - Çerezin ismi. Değer girilmezse boş atanır.
  * `name` Katar (opsiyonel) - Çerezin ismi. Değer girilmezse boş atanır.
  * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
  * `path` Katar (opsiyonel) - Çerezin geçerli olduğu dizin. Değer girilmezse boş atanır.
  * `secure` Katar (opsiyonel) - Çerez güvenli olarak işaretlensin mi? Varsayılan değeri False.
  * `httpOnly` Boolean (opsiyonel) - Çerez httpOnly olarak işaretlensin mi? Varsayılan değeri False.
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