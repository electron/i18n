# session

> Tarayıcı oturumları, çerezler, önbellek, proxy ayarlarını, vb. yönetin.

İşlem: [Ana](../glossary.md#main-process)

`oturum` modülü, yeni `Oturum` nesneleri oluşturmak için kullanılabilir.

Ayrıca mevcut sayfaların `oturum`larına `oturum` [`Webİçeriği`](web-contents.md) özelliğinden, yada `oturum` modülünden ulaşabilirsiniz.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Yöntemler

`oturum` modülü aşağıdaki yöntemleri içerir:

### `session.fromPartition(partition[, options])`

* `partition` Dizgi
* `options` Object (optional)
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
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Örnek Olaylar

Aşağıdaki olaylar `Session` durumun da kullanılabilir:

#### Etkinlik: 'indirilecek'

* `olay` Olay
* `item` [DownloadItem](download-item.md)
* `webContents` [webİçerikleri](web-contents.md)

Elektron indirmek üzereyken ortaya çıkar `item` in `webContents`.

`event.preventDefault()` çağırmak indirmeyi iptal edecektir ve `item` işlemin bir sonraki işaretine kadar uygun olmayacaktır.

```javascript
const { session } = require('electron')
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

* `callback` Function
  * `boyut` Integer - Önbellek boyutu bayt cinsinden kullanılır.
  * `error` Integer - The error code corresponding to the failure.

Geri arama oturumun geçerli önbellek boyutu ile çağrılır.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache(callback)`

* `geri çağırma` Fonksiyonu - İşlem tamamlandığında çağırılır.
  * `error` Integer - The error code corresponding to the failure.

Oturumun HTTP önbelleğini temizler.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Oturumun HTTP önbelleğini temizler.

#### `ses.clearStorageData([options,] callback)`

* `options` Object (optional)
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (isteğe bağlı) - İşlem bittiğinde çağırıldı.

Clears the storage data for the current session.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Yazılı olmayan herhangi bir DOM depolama verisini diske yazar.

#### `ses.setProxy(config, callback)`

* `config` Object
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

   Örnekler:  "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Örnekler: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String - PAC dosyasıyla ilişkilendirilmiş URL.
  * `proxyRules` String - Hangi proxy'lerin kullanılacağını belirten kurallar.
  * `proxyBypassRules` Dizesi - Hangi URL'lerin proxy ayarlarını atlaması gerektiğini belirten kurallar.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

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

   Örnekler:  "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Örnekler: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function
  * `proxy` Dizgi

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

#### `ses.setDownloadPath(path)`

* `yol` String - İndirme konumu.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. Varsayılanı false olarak belirler.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates ağı için verilen yapılandırmayla `session`.

```javascript
// GPRS bağlantısını 50kbps çıkış ve 500 ms gecikme ile taklit etmek.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` Dizgi
    * `certificate` [sertifika](structures/certificate.md)
    * `verificationResult` Dizgi - Kromdan doğrulama sonucu.
    * `errorCode` Tamsayı - Hata kodu.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Sertifika hata kodlarından ayrı aşağıdaki özel kodlar da kullanılabilir.
      * `0` - Sonucu gösterir ve Sertifika Şeffaflığı doğrulamasını devre dışı bırakır.
      * `-2` - Arızayı gösterir.
      * `-3` - Doğrulama sonucunu Chromium'dan kullanır.

`session` için sertifika doğrulama proc'unu ayarlar, `proc` ne zaman sunucu sertifika doğrulaması istenirse`proc(request, callback)` ile çağırılacak. Arama `geri çağırma(0)` sertfikayı kabul eder, arama `geri çağırma(-2)` reddeder.

`setCertificateVerifyProc(null)` çağırmak varsayılan sertifika doğrulama işlemine döner.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - WebContents izin istiyor.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function
    * `permissionGranted` Boolean - İzin verme veya reddetme.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (Optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (Optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Hallediciyi `session` tepki verecek şekilde ayarlar. Arama `geri çağırma(true)` izin verir ve `geri çağırma(false)` reddeder. İşleyiciyi temizlemek için `setPermissionRequestHandler(null)`'i çağırın.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - The security orign of the `media` check.
    * `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. To clear the handler, call `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // denied
  }

  return true
})
```

#### `ses.clearHostResolverCache(callback)`

* Fonksiyon `geri çağırma` (isteğe bağlı) - İşlem tamamlandığında çağrılır.

Ana çözümleyici önbelleğini temizler.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

Ana çözümleyici önbelleğini temizler.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dinamik olarak, HTTP, NTLM veya Müzakere kimlik doğrulaması için kimlik bilgilerini göndermeyi veya göndermemeyi ayarlar.

```javascript
const { session } = require('electron')
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
* `callback` Function
  * `result` Tampon - Blob verileri.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identifier` Dizgi - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `yol` String - İndirmenin kesin yolu.
  * `urlChain` String[] - Karşıdan yükleme için tam URL zinciri.
  * `mimeType` String (isteğe bağlı)
  * `offset` Integer - Karşıdan yükleme için başlangıç aralığı.
  * `uzunluk` Integer - Karşıdan yükleme toplam uzunluk.
  * `lastModified` String - Son değiştirilen başlık değeri.
  * `eTag` String - ETag başlık değeri.
  * `startTime` Çift (isteğe bağlı) - indirmenin UNİX epoch'tan sonraki birkaç saniye içinde başlama zamanı.

Önceki `oturumdan` `iptal edilen` ya da `kesilen` indirmelerin devam etmesine izin verir. API [will-download](#event-will-download) eventi ile erişilebilecek bir [DownloadItem](download-item.md) oluşturacak. [DownloadItem](download-item.md) ile ilişkili herhangi bir `WebContents` yok ve başlangıç durumu `interrupted` olacak. Yükleme yalnızca [DownloadItem](download-item.md) üzerinde `resume` API'ı çağırıldığında başlayacaktır.

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `geri çağırma` Fonksiyonu - İşlem tamamlandığında çağırılır.

Kullanıcı oturumunun HTTP kimlik doğrulama önbelleğini temizler.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(deprecated)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

### Örnek Özellikleri

Aşağıdaki özellikler `Oturum` örnekleri üzerinde mevcuttur:

#### `ses.cookies`

Bu oturum için [çerezler](cookies.md) nesnesi.

#### `ses.webRequest`

Bu oturum için [Webistek](web-request.md) nesnesi.

#### `ses.protocol`

Bu oturum için bir [Protokol](protocol.md) nesnesi.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```

#### `ses.netLog`

A [NetLog](net-log.md) object for this session.

```javascript
const { app, session } = require('electron')

app.on('ready', async function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
