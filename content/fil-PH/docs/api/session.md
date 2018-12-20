# session

> Pamahalaan ang mga sesyon ng browser, mga cookie, cache, mga setting ng proxy, atbp.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `session` na modyul ay maaaring gamitin para gumawa ng bagong `session` ng mga bagay.

Maaari mo rin ma-akses ang `session` ng umiiral na mga pahina sa pamamagitan ng paggamit ng `session` na katangian ng [`Webcontents`](web-contents.md), o galing sa `session` na modyul.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Mga Pamamaraan

Ang `session` na modyul ay ang mga sumusunod na pamamaraan:

### `sesyon.galingPartisyon(partisyon[, mga opsyon])`

* `partisyon` na String
* `mga opsyon` Na Bagay (opsyonal) 
  * `cache` na Boolean - Kung pagaganahin ang cache.

Ibinabalik ang `session` - Isang instance ng sesyon mula sa `partisyon` na string. Kapag merong umiiral sa `session` ng may kaparehong `partisyon`, ito ay ibabalik: sa kabilang banda ang isang bagong `session` na instance ay malilikha kasama ang `options`.

Kung ang `partition` ay nagsisimula sa `persist:`, ang pahina ay gagamit ng isang nagpupumilit na sesyon na magagamit sa lahat ng mga pahina sa app na may kaparehong `partition`. kapag walang `persist:` na prefix, ang pahina ay gagamit ng isang in-memory na sesyon. Kung ang `partition` ay walang laman kung gayoon ang sesyong default ng app ay ibabalik.

Upang makagawa ng isang `session` kasama ng `mga opsyon`, siguraduhin mo na ang `Session` kasama ang `partition` ay hindi pa ginamit noon. Walang paraan para baguhin ang `options` ng isang umiiiral na `Sesyon` na bagay.

## Mga Katangian

Ang `sesyon` na module ay may sumusunod na mga katangian:

### `session.defaultSession`

Isang `session` na bagay, ang default na sesyon na bagay ng app.

## Klase: Sesyon

> Kumuha at magtakda ng mga katangian ng isang sesyon.

Proseso:[Pangunahi](../glossary.md#main-process)

Maaari kang gumawa ng isang `Sesyon` na bagay sa `session` na modyul:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Mga Instance na Kaganapan

Ang sumusunod na mga kaganapan ay magagamit para sa mga instance ng `Sesyon`:

#### Kaganapan: 'will-download'

* `event` na Kaganapan
* `item` na [DownloadItem](download-item.md)
* `webContents` na [WebContents](web-contents.md)

Inilalabas kung ang Electron ay magda-download ng `item` sa `webContents`.

Ang pagtawag sa `event.preventDefault()` ay magkakansela sa download at ang `aytem` ay hindi maaaring magamit hanggang sa susunod na tik ng proseso.

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Mga Pamamaraan ng Instance

Ang sumusunod na pamamaraan ay magagamit para sa mga instance ng `session`:

#### `ses.getCacheSize(callback)`

* `callback` Function 
  * `size` na Integer - Sukat ng cache ginagamit sa byte.

Ang callback ay tinatawag sa kasalukuyang sukat ng cache ng sesyon.

#### `ses.clearCache(callback)`

* `callback` na Function - Tinatawag kung ang operason ay tapos na.

Inaalis ang HTTP na cache ng sesyon.

#### `ses.clearStorageData([options, callback])`

* `mga opsyon` Bagay (opsyonal) 
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na.

Inaalis ang datos ng mga web na imbakan.

#### `ses.flushStorageData()`

Nagsusulat ng anumang di-nakusulat na DOMStorage na datos sa disk.

#### `ses.setProxy(config, callback)`

* `config` Bagay 
  * `pacScript` na String - Ang URL na may kaugnayan sa PAC na file.
  * `proxyRules` na String - Mga panuntunan na nagsasad kung aling mga proxy ang gagamitin.
  * `proxyBypassRules` na String - Mga panuntunan na nagpapahiwatig kung aling mga URL ay dapat mag-bypass ang mga setting ng proxy.
* `callback` na Function - Tinatawag kung ang operason ay tapos na.

Nagtatakda ng mga settings ng proxy.

Kung ang `pacScript` at `proxyRules` ay kasabay na ibinigay, ang `proxyRules` na opsyon ay hindi pinansin at `pacScript` na konpigurasyon ay inilalapat.

Ang `proxyRules` ay dapat sumunod sa mga panuntunan sa ibaba:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Halimbawa:

* `http=foopy:80;ftp=foopy2` - Gamitin ang HTTP proxy `foopy:80` para sa `http://` na mga URL, at HTTP proxy `foopy2:80` para sa `ftp://` na mga URL.
* `foopy:80` - Gamitin ang HTTP proxy `foopy:80` para sa lahat ng mga URL.
* `foopy:80,bar,direct://` - Gamitin ang HTTP proxy `foopy:80` para sa lahat ng mga URL, pumunta sa `bar` kapag ang `foopy:80` ay hindi magagamit, at pagkatapos, gamitin nang walang proxy.
* `socks4://foopy` - Gamitin ang SOCKS v4 proxy `foopy:1080` sa lahat ng mga URL.
* `http=foopy,socks5://bar.com` - Gamitin ang HTTP na proxy `foopy` para sa http na mga URL, at pumunta sa SOCKS5 proxy na `bar.com` kung ang `foopy` ay hindi magagamit.
* `http=foopy,direct://` - Gamitin ang HTTP na proxy `foopy` para sa http Una mga URL, at gamitin nang walang proxy kung ang `foopy` ay hindi magagamit.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

Ang `proxyBypassRules` ay isang listahan ng panuntunan na pinaghihiwalay ng kuwit na inilirawan sa ibaba:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  Itugma ang lahat ng mga hostname na tumugma sa pattern ng HOSTNAME_PATTERN.
  
  Mga halimbawa: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Itugma ang isang partikular na domain suffix.
    
    Mga halimbawa: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Itugma ang mga URL na mga IP address na literal.
  
  Mga halimbawa: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
  
  Itugma ang anumang URL na para sa IP literal na nabibilang sa pagitan ng binigay na saklaw. Ang saklaw ng IP ay tinukoy gamit ang CIDR na notasyon.
  
  Mga Halimbawa: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Itugma ang mga lokal na mga address. Ang ibig sabihin ng `<local>` ay kung ang host ay tumutugma sa isa sa: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` na URL
* `callback` Function 
  * `proxy` na String

Naglulutas ng impormasyon sa proxy para sa `url`. Ang `callback` ay tatawagin nang may `callback(proxy)` kung ang kahilingan ay ginaganap.

#### `ses.setDownloadPath(path)`

* `path` na String - Ang lokasyon ng pag-download.

Nagtatakda ng download saving na direktoryo. Bilang default, ang download na direktoryo ay ang`Downloads` sa ilalim ng kaukulang app na folder.

#### `ses.enableNetworkEmulation(options)`

* `mga opsyon` Bagay 
  * `offline` na Boolean (opsyonal) - Kung tularan ba ang network outage. Naka-default sa false.
  * `latency` na Doble (opsyonal) - RTT sa ms. Naka-default sa 0 na siyang magpapatigil sa latency throttling.
  * `downloadThroughput` na Doble (opsyonal) - Bilis ng pag-download sa Bps. Naka-default sa 0 na siyang magpapatigil sa download throttling.
  * `uploadThroughput` na Doble (opsyonal) - Bilis ng upload sa Bps. Naka-default sa 0 na siyang magpapatigil sa upload throttling.

Ginagaya ang network na may nakalaang konfigurasyon para sa `sesyon`.

```javascript
// Para i-emulate ang GPRS na koneksyon na may 50kbps na throughput at 500 ms na latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Para i-emulate ang network na outage.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Hindi pinapagana ang anumang network na pag-emulate na aktibo na para sa `sesyon`. Nagrereset para sa orihinal na konfigurasyon ng network.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `kahilingan` Bagay 
    * `hostname` na String
    * `certificate` na [Sertipiko](structures/certificate.md)
    * `verificationResult` na String - Resulta ng pagpapatunay mula sa chromium.
    * `errorCode` na Integer - code ng kamalian.
  * `callback` Function 
    * `verificationResult` Integer - Ang halaga ay maaring isa sa mga error na code ng sertipiko na mula [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)Bukod sa mga error na code sa sertipiko, ang mga sumusunod na mga espesyal na code ay magagamit. 
      * `0` - Nagpapahiwatig ng tagumpay at nagpapatigil sa pagpapatunay ng Certificate Transparency.
      * `-2` - Nagpapahiwatig sa kabiguan.
      * `-3` - Gumagamit ng resulta ng pagpapatunay galing sa chromium.

Nagtatakda ng sertipikong verify proc para sa `session`, ang `proc` ay tinatawag na may `proc(request, callback)` sa tuwing ang pagpapatunay ng sertipiko ng server ay hinihiling. Ang pagtawag sa `callback(0)` ay tumatanggap sa sertipiko, pagtawag sa `callback(-2)` ang magtatanggi nito.

Ang pagtawag sa `setCertificateVerifyProc(null)` ay magbabalik sa certificate verify proc sa default.

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

* `tagahawak` Function | null 
  * `webContents` na [WebContents](web-contents.md) - WebContents na naghihingi ng pahintulot.
  * `pahintulot` na String - Enum ng 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function 
    * `permissionGranted` na Boolean - Pagpayag o pagtanggi sa pahintulot.
  * `ang mga detalye` Object - Some properties are only available on certain permission types. 
    * `externalURL` String - The url of the `openExternal` request.
    * `mediaTypes` String[] - The types of media access being requested, elements can be `video` or `audio`

Nagtatakda sa tagahawak na magagamit upang tumugon sa mga kahilingan sa pahintulot para sa `session`. Ang pagtawag sa `callback(true)` ay maaring magbigay ng pahintulot at ang `callback(false)` ay magtatanggi ito. Upang linisin ang tagahawak, tawagin ang `setPermissionRequestHandler(null)`.

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

* `tagahawak` Punsyon<boolean> | null 
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `ang mga detalye` Object - Some properties are only available on certain permission types. 
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

* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na.

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

* `userAgent` na String
* `acceptLanguages` String (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `callback` Punsyon 
  * `result` Buffer - Blob data.

#### `ses.createInterruptedDownload(options)`

* `pagpipilian` Bagay 
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
* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na.

Clears the session’s HTTP authentication cache.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

### Mga Katangian ng Instance

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