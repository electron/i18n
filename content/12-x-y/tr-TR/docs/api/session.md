# session

> Tarayıcı oturumları, çerezler, önbellek, proxy ayarlarını, vb. yönetin.

Süreç: [Ana](../glossary.md#main-process)

`oturum` modülü, yeni `Oturum` nesneleri oluşturmak için kullanılabilir.

Ayrıca mevcut sayfaların `oturum`larına `oturum` [`Webİçeriği`](web-contents.md) özelliğinden, yada `oturum` modülünden ulaşabilirsiniz.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Metodlar

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

Süreç: [Ana](../glossary.md#main-process)

`oturum` modülünde bir `Oturum` nesnesi oluşturabilirsiniz:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Örnek Events

Aşağıdaki olaylar `Session` durumun da kullanılabilir:

#### Etkinlik: 'indirilecek'

Dönüşler:

* `event` Event
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

#### Event: 'extension-loaded'

Dönüşler:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded. This occurs whenever an extension is added to the "enabled" set of extensions. This includes:

- Extensions being loaded from `Session.loadExtension`.
- Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

Dönüşler:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

#### Event: 'extension-ready'

Dönüşler:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

#### Event: 'preconnect'

Dönüşler:

* `event` Event
* `preconnectUrl` String - The URL being requested for preconnection by the renderer.
* `allowCredentials` Boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

#### Event: 'spellcheck-dictionary-initialized'

Dönüşler:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Event: 'spellcheck-dictionary-download-begin'

Dönüşler:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Event: 'spellcheck-dictionary-download-success'

Dönüşler:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

#### Event: 'spellcheck-dictionary-download-failure'

Dönüşler:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails.  For details on the failure you should collect a netlog and inspect the download request.

#### Event: 'select-serial-port' _Experimental_

Dönüşler:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [webİçerikleri](web-contents.md)
* `callback` Fonksiyon
  * `portId` String

Emitted when a serial port needs to be selected when a call to `navigator.serial.requestPort` is made. `callback` should be called with `portId` to be selected, passing an empty string to `callback` will cancel the request.  Additionally, permissioning on `navigator.serial` can be managed by using [ses.setPermissionCheckHandler(handler)](#sessetpermissioncheckhandlerhandler) with the `serial` permission.

Because this is an experimental feature it is disabled by default.  To enable this feature, you will need to use the `--enable-features=ElectronSerialChooser` command line switch.  Additionally because this is an experimental Chromium feature you will need to set `enableBlinkFeatures: 'Serial'` on the `webPreferences` property when opening a BrowserWindow.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (event, portList, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === 0x2341 && device.productId === 0x0043
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(result1.portId)
    }
  })
})
```

#### Event: 'serial-port-added' _Experimental_

Dönüşler:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [webİçerikleri](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available.  For example, this event will fire when a new USB device is plugged in.

#### Event: 'serial-port-removed' _Experimental_

Dönüşler:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [webİçerikleri](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed.  For example, this event will fire when a USB device is unplugged.

### Örnek yöntemleri

Aşağıdaki yöntemler `Oturum` örnekleri üzerinde mevcuttur:

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Oturumun HTTP önbelleğini temizler.

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. If not specified, clear all storage types.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`. If not specified, clear all quotas.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Yazılı olmayan herhangi bir DOM depolama verisini diske yazar.

#### `ses.setProxy(config)`

* `config` Object
  * `mode` String (optional) - The proxy mode. Should be one of `direct`, `auto_detect`, `pac_script`, `fixed_servers` or `system`. If it's unspecified, it will be automatically determined based on other specified options.
    * `direct` In direct mode all connections are created directly, without any proxy involved.
    * `auto_detect` In auto_detect mode the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat.
    * `pac_script` In pac_script mode the proxy configuration is determined by a PAC script that is retrieved from the URL specified in the `pacScript`. This is the default mode if `pacScript` is specified.
    * `fixed_servers` In fixed_servers mode the proxy configuration is specified in `proxyRules`. This is the default mode if `proxyRules` is specified.
    * `system` In system mode the proxy configuration is taken from the operating system. Note that the system mode is different from setting no proxy configuration. In the latter case, Electron falls back to the system settings only if no command-line options influence the proxy configuration.
  * `pacScript` String (optional) - The URL associated with the PAC file.
  * `proxyRules` String (optional) - Rules indicating which proxies to use.
  * `proxyBypassRules` String (optional) - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Proxy ayarlarını yap.

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

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

   Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   IP adresi değişmez olan URL'leri eşleştirin.

   Örnekler:  "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Örnekler: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<String>` - Resolves with the proxy information for `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. The pac script will be fetched from `pacScript` again if the proxy mode is `pac_script`.

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

#### `ses.preconnect(options)`

* `options` Object
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

#### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

**Note:** It will terminate / fail all requests currently in flight.

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` Dizgi
    * `certificate` [sertifika](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `verificationResult` Dizgi - Kromdan doğrulama sonucu.
    * `errorCode` Tamsayı - Hata kodu.
  * `callback` Fonksiyon
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Sertifika hata kodlarından ayrı aşağıdaki özel kodlar da kullanılabilir.
      * `0` - Sonucu gösterir ve Sertifika Şeffaflığı doğrulamasını devre dışı bırakır.
      * `-2` - Arızayı gösterir.
      * `-3` - Doğrulama sonucunu Chromium'dan kullanır.

`session` için sertifika doğrulama proc'unu ayarlar, `proc` ne zaman sunucu sertifika doğrulaması istenirse`proc(request, callback)` ile çağırılacak. Arama `geri çağırma(0)` sertfikayı kabul eder, arama `geri çağırma(-2)` reddeder.

`setCertificateVerifyProc(null)` çağırmak varsayılan sertifika doğrulama işlemine döner.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

> **NOTE:** The result of this procedure is cached by the network service.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - WebContents izin istiyor.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - The type of requested permission.
    * `clipboard-read` - Request access to read from the clipboard.
    * `media` -  Request access to media devices such as camera, microphone and speakers.
    * `mediaKeySystem` - Request access to DRM protected content.
    * `geolocation` - Request access to user's current location.
    * `notifications` - Request notification creation and the ability to display them in the user's system tray.
    * `midi` - Request MIDI access in the `webmidi` API.
    * `midiSysex` - Request the use of system exclusive messages in the `webmidi` API.
    * `pointerLock` - Request to directly interpret mouse movements as an input method. Click [here](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) to know more.
    * `fullscreen` - Request for the app to enter fullscreen mode.
    * `openExternal` - Request to open links in external applications.
  * `callback` Fonksiyon
    * `permissionGranted` Boolean - İzin verme veya reddetme.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
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

* `handler` Function\<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - The security origin of the `media` check.
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

#### `ses.isPersistent()`

Returns `Boolean` - Whether or not this session is a persistent one. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

#### `ses.getUserAgent()`

`String` döndürür - Bu oturum için kullanıcı aracısı.

#### `ses.setSSLConfig(config)`

* `config` Object
  * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. Defaults to `tls1`.
  * `maxVersion` String (optional) - Can be `tls1.2` or `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Defaults to `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

#### `ses.getBlobData(identifier)`

* `identifier` Dizgi - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `yol` String - İndirmenin kesin yolu.
  * `urlChain` String[] - Karşıdan yükleme için tam URL zinciri.
  * `mimeType` String (isteğe bağlı)
  * `offset` Integer - Karşıdan yükleme için başlangıç aralığı.
  * `uzunluk` Integer - Karşıdan yükleme toplam uzunluk.
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` Çift (isteğe bağlı) - indirmenin UNİX epoch'tan sonraki birkaç saniye içinde başlama zamanı.

Önceki `oturumdan` `iptal edilen` ya da `kesilen` indirmelerin devam etmesine izin verir. API [will-download](#event-will-download) eventi ile erişilebilecek bir [DownloadItem](download-item.md) oluşturacak. [DownloadItem](download-item.md) ile ilişkili herhangi bir `WebContents` yok ve başlangıç durumu `interrupted` olacak. Yükleme yalnızca [DownloadItem](download-item.md) üzerinde `resume` API'ı çağırıldığında başlayacaktır.

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Boolean

Sets whether to enable the builtin spell checker.

#### `ses.isSpellCheckerEnabled()`

Returns `Boolean` - Whether the builtin spell checker is enabled.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in.  In order for the spell checker to correctly check their words you must call this API with an array of language codes.  You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically.  This API is a no-op on macOS.

#### `ses.getSpellCheckerLanguages()`

Returns `String[]` - An array of language codes the spellchecker is enabled for.  If this list is empty the spellchecker will fallback to using `en-US`.  By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale.  This setting is persisted across restarts.

**Note:** On macOS the OS spellchecker is used and has its own list of languages.  This API is a no-op on macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN.  If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries.  We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here, the file server must be **case insensitive** you must upload each file twice, once with the case it has in the ZIP file and once with the filename as all lower case.

` hunspell_dictionaries.zip ` içerisinde mevcut olan dosyalar ` https://example.com/dictionaries/language-code.bdic ` adresinde mevcutsa bu Api'yı ` ses.setSpellCheckerDictionaryDownloadURL ('https://example.com/dictionaries/') ` ile çağırmalısınız.  Lütfen sondaki eğik çizgiye dikkat edin.  Sözlüklerin URL'si ` ${url} ${filename} ` olarak oluşturulur.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<String[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

`Boolean` değerini döndürür - Kelimenin özel sözlüğe başarıyla yazılıp yazılmadığı. This API will not work on non-persistent (in-memory) sessions.

**Note:** MacOS ve Windows 10'da bu kelime OS özel sözlüğüne de yazılacak

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - The word you want to remove from the dictionary

Returns `Boolean` - Whether the word was successfully removed from the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be removed from the OS custom dictionary as well

#### `ses.loadExtension(path)`

* `path` String - Path to a directory containing an unpacked Chrome extension

Returns `Promise<Extension>` - resolves when the extension is loaded.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. See [Supported Extensions APIs](extensions.md#supported-extensions-apis) for more details on what is supported.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(path.join(__dirname, 'react-devtools'))
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```

This API does not support loading packed (.crx) extensions.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Returns `Extension` | `null` - The loaded extension with the given ID.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `ses.getAllExtensions()`

Returns `Extension[]` - A list of all loaded extensions.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

### Örnek özellikleri

Aşağıdaki özellikler `Oturum` örnekleri üzerinde mevcuttur:

#### `ses.availableSpellCheckerLanguages` _Readonly_

Bilinen tüm yazım denetleyici dillerinden oluşan bir `String[]` dizisi.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.

#### `ses.cookies` _Readonly_

Bu oturum için bir [`Cookies`](cookies.md) nesnesi.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

Bu oturum için bir [`WebRequest`](web-request.md) nesnesi.

#### `ses.protocol` _Readonly_

Bu oturum için bir [`Protocol`](protocol.md) nesnesi.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _Readonly_

Bu oturum için bir [`NetLog`](net-log.md) nesnesi.

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
