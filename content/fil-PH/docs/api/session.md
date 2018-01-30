# sesyon

> Pamahalaan ang mga sesyon ng browser, mga cookie, cache, mga setting ng proxy, etc.

Ang Proseso: [Pangunahin](../glossary.md#main-process)

Ang `sesyon` modyul ay maaaring gamitin para gumawa ng bagong `Sesyon` ng mga layunin.

Maaari mo rin ma-akses ang `sesyon` ng umiiral na mga pahina sa pamamagitan ng paggamit ng `sesyon` uri ng [`NilalamanngmgaWeb`](web-contents.md), o galing sa `sesyon` na modyul.

```javascript
const {BrowserWindow} = require('electron')

let win = bagong BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Mga pamamaraan

Ang `sesyon` ng modyul ay ang mga sumusunod na pamamaraan:

### `sesyon.galingPartisyon(partisyon[, mga opsyon])`

* `partisyon` String
* `mga opsyon` Layunin 
  * `cache` Boolean - Maaaring paganahin ang cache.

Ibalik ang `Sesyon` - Isang mungkahi ng sesyon mula sa `partisyon` ng string. Kapag merong umiiral sa `sesyon` ng may kaparehong `partisyon`, ito ay maaaring bumalik: sa kabilang banda ay maging bago `Sesyon` ang instansya ay maaaring gumawa kasama ang `mga opsyon`.

Kung ang `partisyon` ay nagsisimula kasama ang `pananatili:`, ang pahina ay gumagamit ng isang sesyon sa pananatili Maaari magamit ito sa lahat ng mga pahina sa mga app na may kaparehong `partisyon`. kung walang ditong `paninindigan:` prefix, ang pahina ay magagamit bilang sesyon ng memorya. Kung ang `partisyon` ay walang laman kung gayoon ang sesyon ng default ng app ay ibabalik.

Para gumawa ng isang `sesyon` kasama ng `mga option`, siguraduhin mo rin ang `Sesyon` kasama ang `partisyon` na hindi pa ginamit nuon. Walang ibang paraan para baguhin ang `mga opsyon` bilang isang umiiiral na `Sesyon` ng layunin.

## Mga katangian

Ang `sesyon` ng module ay may sinusunod na katangian:

### `sesyon.defaultngsesyon`

Isang `sesyon` ng layunin, ang depult ng sesyon na layunin ng app.

## Klase: ng Sesyon

> Kumuwa at magtakda ng mga katangian ng isang sesyon.

Ang proseso ng: [Main](../glossary.md#main-process)

Maaari kang gumawa ng isang `Sesyon` ng layunin sa `sesyon` ng module:

```javascript
const {session} = kinakailangang('electron')
const ses = sesyon.galingpartisyon('persist:name')
console.log(ses.getUserAgent())
```

### Halimbawa ng mga Kaganapan

Ang mga sumusunod na mga kaganapan ay magagamit sa mga pagkakataon ng `Sesyon`:

#### Kaganapan: 'Ay-madadownload'

* `kaganapan` Kaganapan
* `aytem` [I-downloadangaytem](download-item.md)
* `mga nilalaman ng web` [Mga nilalaman ng Web](web-contents.md)

Kung saan ang electron ay napalabas tungkol sa download `aytem` sa `Mga nilalaman ng web`.

Pagtawag sa `event.preventDefault()` ay makakansela ang dinadownload at ang `aytem` ay hindi maaaring magamit hanggang sa susunod na tik ng proseso.

```javascript
const {session} = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Mga halimbawa ng pamamaraan

Nag sumusunod na pamamaraan ay magagamit para sa halimbawa ng `Session`:

#### `ses.getCacheSize(callback)`

* `tumawag muli` Function 
  * `size` Integer - Nagamit na laki cache sa bytes.

Pagwatag-muli ay nananawagan sa mga sesyons sa kasalukuyang laki ng cache.

#### `ses.clearCache(callback)`

* `callback` Function - Tinatawag kung ang operason ay tapos na

Nililimas ang sesyon ng HTTP cache.

#### `ses.clearStorageData([options, callback])`

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `origin` String - (optional) Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] - (optional) The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (optional) The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na.

Nililimas and datos ng web na imbikan.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config, callback)`

* `config` Bagay 
  * `pacScript` String - The URL associated with the PAC file.
  * `proxyRules` String - Rules indicating which proxies to use.
  * `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.
* `callback` Function - Called when operation is done.

Sets the proxy settings.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

The `proxyRules` has to follow the rules below:

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

Halimbawa:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

The `proxyBypassRules` is a comma separated list of rules described below:

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

* `url` Ang URL
* `tumawag muli` Punsyon 
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

#### `ses.setDownloadPath(path)`

* `path` String - The download location

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `mga pagpipilian` Bagay 
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

* `proc` Punsyon 
  * `kahilingan` Bagay 
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `error` String - Verification result from chromium.
  * `tumawag muli` Punsyon 
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

* `ang tagahawak` Punsyon 
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `tumawag muli` Punsyon 
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

* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na.

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

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

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `tumawag muli` Punsyon 
  * `result` Buffer - Blob data.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `mga pagpipilian` Bagay 
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

Clears the session’s HTTP authentication cache.

### Humahalimbawa sa bahagi nito

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