# session

> Pamahalaan ang mga sesyon ng browser, mga cookie, cache, mga setting ng proxy, atbp.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `session` na modyul ay maaaring gamitin para gumawa ng bagong `session` ng mga bagay.

Maaari mo rin ma-akses ang `session` ng umiiral na mga pahina sa pamamagitan ng paggamit ng `session` na katangian ng [`Webcontents`](web-contents.md), o galing sa `session` na modyul.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Mga Pamamaraan

Ang `session` na modyul ay ang mga sumusunod na pamamaraan:

### `sesyon.galingPartisyon(partisyon[, mga opsyon])`

* `partisyon` na String
* `mga opsyon` Bagay 
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
const {session} = require('electron')
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
const {session} = require('electron')
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

* `callback` Function - Called when operation is done

Inaalis ang HTTP na cache ng sesyon.

#### `ses.clearStorageData([options, callback])`

* `mga opsyon` Bagay (opsyonal) 
  * `origin` String - (optional) Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] - (optional) The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (optional) The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
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

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

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

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
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

* `path` String - The download location

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
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Hindi pinapagana ang anumang network na pag-emulate na aktibo na para sa `sesyon`. Nagrereset para sa orihinal na konfigurasyon ng network.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `kahilingan` Bagay 
    * `hostname` na String
    * `certificate` na [Sertipiko](structures/certificate.md)
    * `error` String - Verification result from chromium.
  * `callback` Function 
    * `verificationResult` Integer - Ang halaga ay maaring isa sa mga error na code ng sertipiko na mula [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)Bukod sa mga error na code sa sertipiko, ang mga sumusunod na mga espesyal na code ay magagamit. 
      * `` - Indicates success and disables Certificate Transperancy verification.
      * `-2` - Nagpapahiwatig sa kabiguan.
      * `-3` - Gumagamit ng resulta ng pagpapatunay galing sa chromium.

Nagtatakda ng sertipikong verify proc para sa `session`, ang `proc` ay tinatawag na may `proc(request, callback)` sa tuwing ang pagpapatunay ng sertipiko ng server ay hinihiling. Ang pagtawag sa `callback(0)` ay tumatanggap sa sertipiko, pagtawag sa `callback(-2)` ang magtatanggi nito.

Ang pagtawag sa `setCertificateVerifyProc(null)` ay magbabalik sa certificate verify proc sa default.

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

* `tagahawak` Function 
  * `webContents` na [WebContents](web-contents.md) - WebContents na naghihingi ng pahintulot.
  * `pahintulot` na String - Enum ng 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function 
    * `permissionGranted` Boolean - Allow or deny the permission

Nagtatakda sa tagahawak na magagamit upang tumugon sa mga kahilingan sa pahintulot para sa `session`. Ang pagtawag sa `callback(true)` ay maaring magbigay ng pahintulot at ang `callback(false)` ay magtatanggi ito.

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

Nililinis ang cache ng tagalutas ng host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dinamikong itinatakda kung lagi bang magpadala ng mga kredensyal para sa HTTP NTLM o makipagpulungan para pagpapatunay.

```javascript
const {session} = require('electron')
// isaalang-alang ang kahit anong url na nagtatapos sa `example.com`, `foobar.com`, `baz`
// para sa naka-integrate na pagpapatunay.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// isaalang-alang ang lahat ng mga url para sa naka-integrate na pagpapatunay.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` na String
* `acceptLanguages` na String (opsyonal)

Nag-override sa `userAgent` at `acceptLanguages` para sa sesyong ito.

Ang `acceptLanguages` ay dapat pinaghiwalay ng kuwit na isinaayos na listahan ng mga code ng lengwahe, bilang halimbawa `"en-US,fr,de,ko,zh-CN,ja"`.

Ito ay hindi makakapekto sa umiiral na `WebContents`, at ang bawat `WebContents` ay makakagamit ng `webContents.setUserAgent` para i-override ang malawakang-sesyon na tagagamit na ahente.

#### `ses.getUserAgent()`

Nagbabalik ng `String` - Ang tagagamit na ahente para sa sesyong ito.

#### `ses.getBlobData(identifier, callback)`

* `identifier` na String - Tamang UUID.
* `callback` Function 
  * `result` na Buffer - Blob na datos.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `options` Bagay 
  * `path` na String - Ganap na path ng download.
  * `urlChain` na String[] - kompletong URL na chain para sa download.
  * `mimeType` na String (opsyonal)
  * `offset` na Integer - Pagsimulang saklaw para sa download.
  * `length` na Integer - Kabuuang haba ng download.
  * `lastModified` na String - Last-Modified na halaga ng header.
  * `eTag` na String - ETag na halaga ng header.
  * `startTime` na Doble (opsyonal) - Ang oras kung kailan sinimulan ang download sa segundong bilang simula sa UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `mga opsyon` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (optional) - Called when operation is done

Clears the session’s HTTP authentication cache.

### Mga Katangian ng Instance

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

```javascript
onst {app, session} = require('electron')
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