# sesyon

> Pamahalaan ang mga sesyon ng browser, mga cookie, cache, mga setting ng proxy, atbp.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `sesyon` na modyul ay maaaring gamitin para gumawa ng bagong `Sesyon` ng mga bagay.

Maaari mo rin ma-akses ang `sesyon` ng umiiral na mga pahina sa pamamagitan ng paggamit ng `sesyon`na katangian ng [`Webcontents`](web-contents.md), o galing sa `sesyon` na modyul.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Mga Pamamaraan

Ang `sesyon` na modyul ay ang mga sumusunod na pamamaraan:

### `sesyon.galingPartisyon(partisyon[, mga opsyon])`

* `partisyon` na String
* `mga opsyon` Na Bagay (opsyonal) 
  * `cache` na Boolean - Kung pagaganahin ang cache.

Ibinabalik ang `Sesyon` - Isang instance ng sesyon mula sa `partisyon` na string. Kapag merong umiiral sa `sesyon` ng may kaparehong `partisyon`, ito ay ibabalik: sa kabilang banda ang isang bagong `Sesyon` na instance ay malilikha kasama ang `mga opsyon`.

Kung ang `partisyon` ay nagsisimula sa `persist:`, ang pahina ay gagamit ng isang nagpupumilit na sesyon na magagamit sa lahat ng mga pahina sa app na may kaparehong `partisyon`. kapag walang `persist:` na prefix, ang pahina ay gagamit ng isang in-memory na sesyon. Kung ang `partisyon` ay walang laman kung gayoon ang sesyong default ng app ay ibabalik.

Upang makagawa ng isang `sesyon` kasama ng `mga opsyon`, siguraduhin mo na ang `Sesyon` kasama ang `partisyon` ay hindi pa ginamit noon. Walang paraan para baguhin ang `mga opsyon` ng isang umiiiral na `Sesyon` na bagay.

## Mga Katangian

Ang `sesyon` na module ay may sumusunod na mga katangian:

### `session.defaultSession`

Isang `sesyon` na bagay, ang default na sesyon na bagay ng app.

## Klase: Sesyon

> Kumuha at magtakda ng mga katangian ng isang sesyon.

Proseso:[Pangunahi](../glossary.md#main-process)

Maaari kang gumawa ng isang `Sesyon` na bagay sa `sesyon` na modyul:

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

Ang sumusunod na pamamaraan ay magagamit para sa mga instance ng `Sesyon`:

#### `ses.getCacheSize(callback)`

* `callback` Function 
  * `size` na Integer - Sukat ng cache ginagamit sa byte.

Ang callback ay tinatawag sa kasalukuyang sukat ng cache ng sesyon.

#### `ses.clearCache(callback)`

* `callback` na Function - Tinatawag kung ang operasyon ay tapos na

Inaalis ang HTTP na cache ng sesyon.

#### `ses.clearStorageData([options, callback])`

* `mga opsyon` Bagay (opsyonal) 
  * `origin` na String - (opsyonal) dapat sinusunod ng representasyon ng `window.location.origin` `scheme://host:port`.
  * `storages` na String[] - (opsyonal) Ang uri ng mga imbakan na aalisin, maaaring maglalaman ng: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` na String[] - (opsyonal) Ang mga uri ng mga quota na aalisin, maaaring maglalaman ng: `temporary`, `persistent`, `syncable`.
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
* `http=foopy;socks=foopy2` - Gamitin ang HTTP na proxy na `foopy` para sa http na mga URL, at gamitin ang `socks4://foopy2` para sa lahat ng iba pang mga URL.

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

* `path` na String - Ang lokasyon ng pag-download

Nagtatakda ng download saving na direktoryo. Bilang default, ang download na direktoryo ay ang`Downloads` sa ilalim ng kaukulang app na folder.

#### `ses.enableNetworkEmulation(options)`

* `mga opsyon` Bagay 
  * `offline` na Boolean (opsyonal) - Kung tularan ba ang network outage. Naka-default sa false.
  * `latency` na Doble (opsyonal) - RTT sa ms. Naka-default sa 0 na siyang magpapatigil sa latency throttling.
  * `downloadThroughput` na Doble (opsyonal) - Bilis ng pag-download sa Bps. Naka-default sa 0 na siyang magpapatigil sa download throttling.
  * `uploadThroughput` Double (opsyonal) - Mag-upload ng rate sa Bps. Dafaults sa 0 kung saan hidni pinagana ang upload throttling.

Pag-emulate ng network na may nakabigay na konfigurasyon para sa `session`.

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

Hindi pinapagana ang anumang network emulation ay na aktibo para sa `session`. Ni-rereset para sa orihinal na network na konfigurasyon.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `kahilingan` Bagay 
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Verification result from chromium.
    * `errorCode` Integer - Error code.
  * `callback` Function 
    * `verificationResult` Integer - Balyo ay maaring isang sertipiko na error codes galing sa [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)Bukod sa sertifikong error codes, ang mga sumusunod na espesyal na codes ay magagamit. 
      * `` - Indicates success and disables Certificate Transparency verification.
      * `-2` - Nagpapahiwatig sa kabigu-an.
      * `-3` - Gumagamit ng pagpapatunay galing sa chromium.

Nagtatakda ng sertifikong verify proc para sa `session`, ang `proc` ay tinatawag na may `proc(request, callback)` sa tuwing ang server certificate ay hinihiling. Calling `callback(0)` tinatanggap ang sertifiko, calling `callback(-2)` tinatangihan ito.

Ang pagtawag `setCertificateVerifyProc(null)` ay i-rerevert pabalik sa default ang sertifiko verify proc.

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

* `ang tagahawak` Function | null 
  * `webContents` [WebContents](web-contents.md) - WebContents pag-request ng pahintulot.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function 
    * `permissionGranted` Boolean - Pagpayag o pag-tanggi sa pahintulot

Nagtatakda sa handler kung saan magagamit upang tumugon sa pahintulot na kahilingan para sa `session`. Calling `callback(true)` ay maaring bigyan pahintulot ang `callback(false)` ay tatangihan ito. To clear the handler, call `setPermissionRequestHandler(null)`.

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

Nililimas ang host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - Ang comma-separated na listahan ng servers para sa integrated authentication ay pinagana.

Dynamically ay nagtatakda kung para sa laging magpadala sa credentials para sa HTTP NTLM o Negotiate authentication.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// para sa pagsasama ng pagpapatunay.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// isa-alangalang ang lahat ng urls para sa pagsasama ng pagpapatunay.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (opsyonal)

I-override ang `userAgent` at `acceptLanguages` para sa sesyong ito.

Ang `acceptLanguages` ay dapat may kuwit na hiwalay na ordered list sa language codes, para sa halimbawa `"en-US,fr,de,ko,zh-CN,ja"`.

Ito ay hindi makakapekto sa umiiral `WebContents`, at bawat-isa `WebContents` ay magagamit `webContents.setUserAgent` para i-override ang sesyon-wide ng ahente na gumagamit.

#### `ses.getUserAgent()`

Nagbabalik `String` - Ang gugamit na ahente para sa sesyon na ito.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `callback` Function 
  * `result` Buffer - Blob data.

Nagbabalik `Blob` - The blob na datos ay na-uugnay na may `identifier`.

#### `ses.createInterruptedDownload(opsyons)`

* `options` Bagay 
  * `path` String - Ganap na path para sa download.
  * `urlChain` String[] - Completong URL chain para sa download.
  * `mimeType` String (opsyonal)
  * `offset` Integer - Pagsimula sa range para sa download.
  * `length` Integer - Kabuuhan ng haba para sa download.
  * `lastModified` String - Last-Modified header value.
  * `eTag` String - ETag header balyo.
  * `startTime` Double (opsyonal) - Ang oras kung saan ang download ay nagsimula na sa numero ng segundo since UNIX epoch.

Nagpapahintulot ng pagpapatuloy sa `cancelled` o `interrupted` downloads galing sa nakaraan na `Session`. Ang API ay mag-gegenerate ng [DownloadItem](download-item.md) na maaring ma-access na may [will-download](#event-will-download) na pangyayari. Ang [DownloadItem](download-item.md) ay hindi magkakaroon ng anumang `WebContents` kaugnay nito at ang inisyal na estado ay magiging `interrupted`. Ang download ay magsisimula kung ang `resume` API ay tinawag sa [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (opsyonal) - Tinatawag kung ang operasyon ay tapos na

Nililimas ang sesyon ng HTTP authentication cache.

### Mga Katangian ng Instance

Ang mga sumusunod na ari-arian ay magagamit sa mga pagkakataon ng `Session`:

#### `ses.cookies`

Ang [Cookies](cookies.md) mga objeyk para sa sesyon na ito.

#### `ses.webRequest`

Ang [WebRequest](web-request.md) mga objeyk para sa sesyon na ito.

#### `ses.protocol`

Ang [Protocol](protocol.md) mga objeyk para sa sesyon na ito.

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