# session

> Tarayıcı oturumu, Çerezler, önbellek, proxy ayarlarını yönetin.

Süreç: [Ana](../glossary.md#main-process)

The `session` module can be used to create new `Session` objects.

You can also access the `session` of existing pages by using the `session` property of [`WebContents`](web-contents.md), or from the `session` module.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Metodlar

`session` modülü aşağıdaki yöntemleri içerir:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Nesne 
  * `cache` Boolean - Whether to enable cache.

Returns `Session` - A session instance from `partition` string. When there is an existing `Session` with the same `partition`, it will be returned; otherwise a new `Session` instance will be created with `options`.

If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. If the `partition` is empty then default session of the app will be returned.

To create a `Session` with `options`, you have to ensure the `Session` with the `partition` has never been used before. There is no way to change the `options` of an existing `Session` object.

## Özellikler

`session` modülü aşağıdaki yöntemleri içerir:

### `session.defaultSession`

Bir `Session` nesnesi, uygulamanın varsayılan oturum nesnesidir.

## Sınıf: oturum

> Get and set properties of a session.

Süreç: [Ana](../glossary.md#main-process)

You can create a `Session` object in the `session` module:

```javascript
const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Örnek Olaylar

Aşağıdaki olaylar `Session` durumun da kullanılabilir:

#### Etkinlik: 'indirilecek'

* `olay` Olay
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Emitted when Electron is about to download `item` in `webContents`.

Calling `event.preventDefault()` will cancel the download and `item` will not be available from next tick of the process.

```javascript
const {session} = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Örnek yöntemler

The following methods are available on instances of `Session`:

#### `ses.getCacheSize(callback)`

* `callback` Fonksiyon 
  * `size` Integer - Cache size used in bytes.

Geri arama oturumun geçerli önbellek boyutu ile çağrılır.

#### `ses.clearCache(callback)`

* `callback` Function - Called when operation is done

Clears the session’s HTTP cache.

#### `ses.clearStorageData([options, callback])`

* `options` Obje (isteğe bağlı) 
  * `origin` String - (optional) Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] - (optional) Temizlenecek depo türleri, aşağıdakileri içerebilir: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (optional) The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (optional) - Called when operation is done.

Clears the data of web storages.

#### `ses.flushStorageData()`

Yazılı olmayan herhangi bir DOM depolama verisini diske yazar.

#### `ses.setProxy(config, callback)`

* `config` Nesne 
  * `pacScript` String - The URL associated with the PAC file.
  * `proxyRules` String - Rules indicating which proxies to use.
  * `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.
* `callback` Function - Called when operation is done.

Proxy ayarlarını yap.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

The `proxyRules` has to follow the rules below:

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

Örneğin:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

`proxyBypassRules` yapısı aşşağıda açıklanan virgülle ayrılmış kurallar listesidir:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  Match all hostnames that match the pattern HOSTNAME_PATTERN.
  
  Examples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Match a particular domain suffix.
    
    Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Match URLs which are IP address literals.
  
  Examples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
  Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.
  
  Examples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Fonksiyon 
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

#### `ses.setDownloadPath(path)`

* `path` String - The download location

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Nesne 
  * `offline` Boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates network with the given configuration for the `session`.

```javascript
// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Fonksiyon 
  * `istek` Nesne 
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `error` String - Verification result from chromium.
  * `callback` Fonksiyon 
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used. 
      * `` - Indicates success and disables Certificate Transperancy verification.
      * `-2` - Indicates failure.
      * `-3` - Uses the verification result from chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

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

* `handler` Fonksiyon 
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Fonksiyon 
    * `permissionGranted` Boolean - Allow or deny the permission

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it.

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

* `callback` Function (optional) - Called when operation is done.

Ana çözümleyici önbelleğini temizler.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dinamik olarak, HTTP, NTLM veya Müzakere kimlik doğrulaması için kimlik bilgilerini göndermeyi veya göndermemeyi ayarlar.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (optional)

`userAgent` ve `acceptLanguages` modülünü bu oturum için geçersiz kılar.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

Bu mevcut `WebContents` yapısını etkilemez ve her `WebContents` yapısı `webContents.setUserAgent` yapısını oturum genelinde kullanıcı aracısını geçersiz kılmak için kullanabilir.

#### `ses.getUserAgent()`

`String` döndürür - Bu oturum için kullanıcı aracısı.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `callback` Fonksiyon 
  * `result` Buffer - Blob data.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `options` Nesne 
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
* `callback` Function (optional) - Called when operation is done

Kullanıcı oturumunun HTTP kimlik doğrulama önbelleğini temizler.

### Örnek özellikleri

The following properties are available on instances of `Session`:

#### `ses.cookies`

Bu oturum için [çerezler](cookies.md) nesnesi.

#### `ses.webRequest`

Bu oturum için [Webistek](web-request.md) nesnesi.

#### `ses.protocol`

Bu oturum için bir [Protokol](protocol.md) nesnesi.

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