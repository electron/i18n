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
* `seçenekler` Obje (opsiyonel) 
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

### Örnek Events

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

* `geri aramak` Function 
  * `boyut` Integer - Önbellek boyutu bayt cinsinden kullanılır.

Geri arama oturumun geçerli önbellek boyutu ile çağrılır.

#### `ses.clearCache(callback)`

* `geri çağırma` Fonksiyonu - İşlem tamamlandığında çağırılır.

Oturumun HTTP önbelleğini temizler.

#### `ses.clearStorageData([options, callback])`

* `seçenekler` Obje (opsiyonel) 
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
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

* `yol` String - İndirme konumu.

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
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Ağbağlantısı emulasyonu `session` için zaten aktiftir. Orjinal ağ yapılandırmasını sıfırlar.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `istek` Nesne 
    * `hostname` Dizgi
    * `certificate` [sertifika](structures/certificate.md)
    * `verificationResult` Dizgi - Kromdan doğrulama sonucu.
    * `errorCode` Tamsayı - Hata kodu.
  * `geri aramak` Function 
    * `doğrulama Sonucu` Tamsayı: Değer sertifika hata kodlarından olabilir [buraya](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Sertifika hata kodlarından ayrı aşağıdaki özel kodlar da kullanılabilir. 
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

* `halledici` İşlev | boş 
  * `webContents` [WebContents](web-contents.md) - WebContents izin istiyor.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `geri aramak` Function 
    * `permissionGranted` Boolean - İzin verme veya reddetme.
  * `details` Object - Some properties are only available on certain permission types. 
    * `externalURL` String - The url of the `openExternal` request.
    * `mediaTypes` String[] - The types of media access being requested, elements can be `video` or `audio`

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

* `halledici` Fonksiyon<boolean> | null 
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types. 
    * `securityOrigin` String - The security orign of the `media` check.
    * `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`

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

#### `ses.clearHostResolverCache([callback])`

* Fonksiyon `geri çağırma` (isteğe bağlı) - İşlem tamamlandığında çağrılır.

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

```javascript
const { session } = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` Dizgi
* `acceptLanguages` String (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `geri aramak` Fonksiyon 
  * `result` Buffer - Blob data.

#### `ses.createInterruptedDownload(options)`

* `seçenekler` Nesne 
  * `path` String - Absolute path of the download.
  * `urlChain` String[] - Complete URL chain for the download.
  * `mimeType` String (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` String - Last-Modified header value.
  * `eTag` String - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

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

app.on('ready', function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  netLog.stopLogging(path => {
    console.log('Net-logs written to', path)
  })
})
```