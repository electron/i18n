# session

> Tarayıcı oturumları, çerezler, önbellek, proxy ayarlarını, vb. yönetin.

İşlem: [Ana](../glossary.md#main-process)

`oturum` modülü, yeni `Oturum` nesneleri oluşturmak için kullanılabilir.

Ayrıca mevcut sayfaların `oturum`larına `oturum` [`Webİçeriği`](web-contents.md) özelliğinden, yada `oturum` modülünden ulaşabilirsiniz.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Yöntemler

`oturum` modülü aşağıdaki yöntemleri içerir:

### `session.fromPartition(partition[, options])`

* `partition` Dizgi
* `seçenekler` Nesne (isteğe bağlı) 
  * `cache` Mantıksal - Önbelleği etkinleştirip etkinleştirmeyeceğini belirtir.

`Oturum` Döndürür - `bölümden` bir oturum örneği metini. Aynı `partition`'a sahip olan `Session` varsa, döndürülecektir; aksi taktirde `Session` örneği `options` ile yaratılacaktır.

Eğer `bölüm`ile başla`sürdür`ile başlarsa, sayfa kalıcı bir oturum kullanacaktır uygulamanın tüm sayfalarına aynı şekilde erişilebilir `bölüm`. yoksa `sürdür` önekini kullandığınızda, sayfa bir bellek içi oturum kullanacaktır. Eğer `bölüm` boş ise, uygulamanın varsayılan oturumu kullanılıcaktır.

`options` ile bir `Session` yaratmadan önce `partition`'lı `Session`'ın daha önce hiç kullanılmadığından emin olmalısınız. Var olan bir `Session` nesnesinin `options`'ını değiştirmenin bir yolu yoktur.

## Özellikler

`session` modülü aşağıdaki yöntemleri içerir:

### `session.defaultSession`

Bir `Session` nesnesi, uygulamanın varsayılan oturum nesnesidir.

## Sınıf: oturum

> Bir oturumun özelliklerini alın ve ayarlayın.

İşlem: [Ana](../glossary.md#main-process)

`oturum` modülünde bir `Oturum` nesnesi oluşturabilirsiniz:

```javascript
const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Örnek Events

Aşağıdaki olaylar `Session` durumun da kullanılabilir:

#### Etkinlik: 'indirilecek'

* `olay` Olay
* `item` [DownloadItem](download-item.md)
* `webContents` [webİçerikleri](web-contents.md)

Elektron indirmek üzereyken ortaya çıkar `item` in `webContents`.

`event.preventDefault()` çağırmak indirmeyi iptal edecektir ve `item` işlemin bir sonraki işaretine kadar uygun olmayacaktır.

```javascript
const {session} = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Sınıf örneği metodları

Aşağıdaki yöntemler `Oturum` örnekleri üzerinde mevcuttur:

#### `ses.getCacheSize(callback)`

* `geri aramak` Function 
  * `boyut` Integer - Önbellek boyutu bayt cinsinden kullanılır.

Geri arama oturumun geçerli önbellek boyutu ile çağrılır.

#### `ses.clearCache(callback)`

* `geri çağırma` Fonksiyonu - İşlem tamamlandığında çağırılır.

Oturumun HTTP önbelleğini temizler.

#### `ses.clearStorageData([options, callback])`

* `seçenekler` Obje (opsiyonel) 
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* Fonksiyon `geri çağırma` (isteğe bağlı) - İşlem tamamlandığında çağrılır.

Web depolama alanları verilerini siler.

#### `ses.flushStorageData()`

Yazılı olmayan herhangi bir DOM depolama verisini diske yazar.

#### `ses.setProxy(config, callback)`

* `konfigurasyon` Nesne 
  * `pacScript` String - PAC dosyasıyla ilişkilendirilmiş URL.
  * `proxyRules` String - Hangi proxy'lerin kullanılacağını belirten kurallar.
  * `proxyBypassRules` Dizesi - Hangi URL'lerin proxy ayarlarını atlaması gerektiğini belirten kurallar.
* `geri çağırma` Fonksiyonu - İşlem tamamlandığında çağırılır.

Proxy ayarlarını yap.

`pacScript` ve `proxyRules` birlikte sağlandığında `proxyRules` seçeceği göz ardı edilir ve `pacScript` yapılandırması uygulanır.

`proxyRules` aşağıdaki kurallara uymak zorundadır:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Örneğin:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, ve HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Tüm URL'ler için HTTP proxy `foopy:80`'yi kullanın.
* `foopy:80,bar,direct://` - tüm URL'ler için HTTP proxy `foopy:80` kullanın, `foopy:80` kullanılamıyorsa `bar`'e kadar başarısız olur ve bundan sonra proxy kullanamaz.
* `socks4://foopy` - Tüm URL'ler için SOCKS v4 proxy `foopy:1080`'yi kullanın.
* `http=foopy,socks5://bar.com` - http URL'leri için HTTP proxy `foopy`'yi kullanın ve `foopy` yoksa SOCKS5 proxy `bar.com`'e başarısız olunur.
* `http=foopy,direct://` - http URL'leri için HTTP proxy `foopy`'yi kullanın ve `foopy` kullanılamazsa proxy kullanmayın.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

`proxyBypassRules` yapısı aşşağıda açıklanan virgülle ayrılmış kurallar listesidir:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  HOSTNAME_PATTERN kalıbıyla eşleşen tüm ana makine adlarını eşleştirin.
  
  Örnekler: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Belirli bir alanın son ekiyle eşleşir.
    
    Örnekler: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  IP adresi değişmez olan URL'leri eşleştirin.
  
  Örnekler: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
  
  Belirtilen aralık arasında kalan bir IP sabiti olan herhangi bir URL'yi eşleştirin. IP aralığı CIDR gösterimi kullanılarak belirtilir.
  
  Örnekler: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `geri aramak` Function 
  * `proxy` Dizgi

`url` Urlsinin proksi bilgisini çözümler. `callback`, `callback(proxy)` istek geldiğinde çağrılacaktır.

#### `ses.setDownloadPath(path)`

* `path` String - The download location.

İndirme, kaydetme dizini ayarlar. Varsayılan olarak, karşıdan yükleme dizini `İndirilenler` uygulama klasörü altındadır.

#### `ses.enableNetworkEmulation(options)`

* `seçenekler` Nesne 
  * `offline` Boolean (İsteğe Bağlı) - Ağ bağlantısının kopmasını taklit eder. Varsayılan değer False.
  * `latency` Double (İsteğe Bağlı) - RTT (ms cinsinden) Varsayılan değer 0, gecikmenin azaltılmasını devre dışı bırakır.
  * `downloadThroughput` Double (isteğe bağlı) - Bps' de indirme hızı. Varsayılan değer 0, indirme hız sınırlamalarını devre dışı bırakır.
  * `uploadThroughput` Double (isteğe bağlı) - Bps' de yükleme hızı. Varsayılan değer 0, yükleme sınırlamalarını devre dışı bırakır.

Emulates ağı için verilen yapılandırmayla `session`.

```javascript
// GPRS bağlantısını 50kbps çıkış ve 500 ms gecikme ile taklit etmek.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Ağbağlantısı emulasyonu `session` için zaten aktiftir. Orjinal ağ yapılandırmasını sıfırlar.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `istek` Nesne 
    * `hostname` Dizgi
    * `certificate` [sertifika](structures/certificate.md)
    * `verificationResult` String - Verification result from chromium.
    * `errorCode` Integer - Error code.
  * `geri aramak` Function 
    * `doğrulama Sonucu` Tamsayı: Değer sertifika hata kodlarından olabilir [buraya](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Sertifika hata kodlarından ayrı aşağıdaki özel kodlar da kullanılabilir. 
      * `` - Indicates success and disables Certificate Transparency verification.
      * `-2` - Arızayı gösterir.
      * `-3` - Doğrulama sonucunu Chromium'dan kullanır.

`session` için sertifika doğrulama proc'unu ayarlar, `proc` ne zaman sunucu sertifika doğrulaması istenirse`proc(request, callback)` ile çağırılacak. Arama `geri çağırma(0)` sertfikayı kabul eder, arama `geri çağırma(-2)` reddeder.

`setCertificateVerifyProc(null)` çağırmak varsayılan sertifika doğrulama işlemine döner.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const {hostname} = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `halledici` Function | null 
  * `webContents` [WebContents](web-contents.md) - WebContents izin istiyor.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `geri aramak` Function 
    * `permissionGranted` Boolean - Allow or deny the permission.
  * `details` Object - Some properties are only available on certain permission types. 
    * `externalURL` String - The url of the `openExternal` request.

Hallediciyi `session` tepki verecek şekilde ayarlar. Arama `geri çağırma(true)` izin verir ve `geri çağırma(false)` reddeder. To clear the handler, call `setPermissionRequestHandler(null)`.

```javascript
const {session} = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.clearHostResolverCache([callback])`

* `callback` Function (isteğe bağlı) - İşlem bittiğinde çağırıldı.

Ana çözümleyici önbelleğini temizler.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dinamik olarak, HTTP, NTLM veya Müzakere kimlik doğrulaması için kimlik bilgilerini göndermeyi veya göndermemeyi ayarlar.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains ('* example.com, * foobar.com, * baz')

// entegre kimlik doğrulama için tüm Url'lerin doğruluğunu kanıtlar.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` Dizgi
* `acceptLanguages` Dize (isteğe bağlı)

`userAgent` ve `acceptLanguages` modülünü bu oturum için geçersiz kılar.

`acceptLanguages` virgülle ayrılmış dil kodlarının sıralı bir listesi olmalıdır, örneğin `"en-US,fr,de,ko,zh-CN,ja"`.

Bu mevcut `WebContents` yapısını etkilemez ve her `WebContents` yapısı `webContents.setUserAgent` yapısını oturum genelinde kullanıcı aracısını geçersiz kılmak için kullanabilir.

#### `ses.getUserAgent()`

`String` döndürür - Bu oturum için kullanıcı aracısı.

#### `ses.getBlobData(identifier, callback)`

* `identifier` Dizgi - Valid UUID.
* `geri aramak` Function 
  * `result` Tampon - Blob verileri.

#### `ses.createInterruptedDownload(options)`

* `seçenekler` Nesne 
  * `yol` String - İndirmenin kesin yolu.
  * `urlChain` String[] - Karşıdan yükleme için tam URL zinciri.
  * `mimeType` String (isteğe bağlı)
  * `offset` Integer - Karşıdan yükleme için başlangıç aralığı.
  * `uzunluk` Integer - Karşıdan yükleme toplam uzunluk.
  * `lastModified` String - Son değiştirilen başlık değeri.
  * `eTag` String - ETag başlık değeri.
  * `startTime` Çift (isteğe bağlı) - indirmenin UNİX epoch'tan sonraki birkaç saniye içinde başlama zamanı.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* Fonksiyon `geri çağırma` (isteğe bağlı) - İşlem tamamlandığında çağrılır.

Clears the session’s HTTP authentication cache.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

### Örnek Özellikler

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

```javascript
const {app, session} = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```