# session

> Pamahalaan ang mga sesyon ng browser, mga cookie, cache, mga setting ng proxy, atbp.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `session` na modyul ay maaaring gamitin para gumawa ng bagong `session` ng mga bagay.

Maaari mo rin ma-akses ang `session` ng umiiral na mga pahina sa pamamagitan ng paggamit ng `session` na katangian ng [`Webcontents`](web-contents.md), o galing sa `session` na modyul.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Mga Paraan

Ang `session` na modyul ay ang mga sumusunod na pamamaraan:

### `sesyon.galingPartisyon(partisyon[, mga opsyon])`

* `partisyon` na String
* `options` Object (optional)
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

### Halimbawa ng mga Event

Ang sumusunod na mga kaganapan ay magagamit para sa mga instance ng `Sesyon`:

#### Kaganapan: 'will-download'

Pagbabalik:

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

#### Event: 'preconnect'

Pagbabalik:

* `event` na Kaganapan
* `preconnectUrl` String - The URL being requested for preconnection by the renderer.
* `allowCredentials` Boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

#### Event: 'spellcheck-dictionary-initialized'

Pagbabalik:

* `event` na Kaganapan
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Event: 'spellcheck-dictionary-download-begin'

Pagbabalik:

* `event` na Kaganapan
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Event: 'spellcheck-dictionary-download-success'

Pagbabalik:

* `event` na Kaganapan
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

#### Event: 'spellcheck-dictionary-download-failure'

Pagbabalik:

* `event` na Kaganapan
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails.  For details on the failure you should collect a netlog and inspect the download request.

### Mga Halimbawa ng Sistematikong Paraan

Ang sumusunod na pamamaraan ay magagamit para sa mga instance ng `session`:

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Inaalis ang HTTP na cache ng sesyon.

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. If not specified, clear all storage types.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`. If not specified, clear all quotas.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Nagsusulat ng anumang di-nakusulat na DOMStorage na datos sa disk.

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String (optional) - The URL associated with the PAC file.
  * `proxyRules` String (optional) - Rules indicating which proxies to use.
  * `proxyBypassRules` String (optional) - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

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

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Mga Halimbawa: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` Ang URL

Returns `Promise<String>` - Resolves with the proxy information for `url`.

#### `ses.setDownloadPath(path)`

* `path` na String - Ang lokasyon ng pag-download.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. Ang mga default para sa false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

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

#### `ses.preconnect(options)`

* `options` Object
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` na String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `verificationResult` na String - Resulta ng pagpapatunay mula sa chromium.
    * `errorCode` na Integer - code ng kamalian.
  * `callback` na Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Nagpapahiwatig ng tagumpay at nagpapatigil sa pagpapatunay ng Certificate Transparency.
      * `-2` - Nagpapahiwatig sa kabiguan.
      * `-3` - Gumagamit ng resulta ng pagpapatunay galing sa chromium.

Nagtatakda ng sertipikong verify proc para sa `session`, ang `proc` ay tinatawag na may `proc(request, callback)` sa tuwing ang pagpapatunay ng sertipiko ng server ay hinihiling. Ang pagtawag sa `callback(0)` ay tumatanggap sa sertipiko, pagtawag sa `callback(-2)` ang magtatanggi nito.

Ang pagtawag sa `setCertificateVerifyProc(null)` ay magbabalik sa certificate verify proc sa default.

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

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` na [WebContents](web-contents.md) - WebContents na naghihingi ng pahintulot.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
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
  * `callback` na Function
    * `permissionGranted` na Boolean - Pagpayag o pagtanggi sa pahintulot.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

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

* `handler` Function\<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media'.
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

Nililinis ang cache ng tagalutas ng host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dinamikong itinatakda kung lagi bang magpadala ng mga kredensyal para sa HTTP NTLM o makipagpulungan para pagpapatunay.

```javascript
const { session } = require('electron')
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

#### `ses.isPersistent()`

Returns `Boolean` - Whether or not this session is a persistent one. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

#### `ses.getUserAgent()`

Nagbabalik ng `String` - Ang tagagamit na ahente para sa sesyong ito.

#### `ses.getBlobData(identifier)`

* `identifier` na String - Tamang UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.downloadURL(url)`

* `url` Tali

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` na String - Ganap na path ng download.
  * `urlChain` na String[] - kompletong URL na chain para sa download.
  * `mimeType` na String (opsyonal)
  * `offset` na Integer - Pagsimulang saklaw para sa download.
  * `length` na Integer - Kabuuang haba ng download.
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` na Doble (opsyonal) - Ang oras kung kailan sinimulan ang download sa segundong bilang simula sa UNIX epoch.

Nagpapahintulot ng pagpapatuloy sa `nakansela` o `napahintong` mga download galing sa nakaraang `Sesyon`. Ang API ay maglilikha ng isang [DownloadItem](download-item.md) na maaring ma-access gamit ang [will-download](#event-will-download) na pangyayari. Ang [DownloadItem](download-item.md) ay hindi magkakaroon ng anumang `WebContents` nauugnay rito at ang paunang estado ay `maaantala`. Ang download ay magsisimula kung ang `resume` na API ay tinawag sa [DownloadItem](download-item.md).

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

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

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Please note the trailing slash.  The URL to the dictionaries is formed as `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<String[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

Returns `Boolean` - Whether the word was successfully written to the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be written to the OS custom dictionary as well

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

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Returns `Extension` | `null` - The loaded extension with the given ID.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `ses.getAllExtensions()`

Returns `Extension[]` - A list of all loaded extensions.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

### Katangian ng pagkakataon

Ang mga sumusunod na katangian ay magagamit sa mga instance ng `session`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

A `String[]` array which consists of all the known available spell checker languages.  Providing a language code to the `setSpellCheckerLanaguages` API that isn't in this array will result in an error.

#### `ses.cookies` _Readonly_

A [`Cookies`](cookies.md) object for this session.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

A [`WebRequest`](web-request.md) object for this session.

#### `ses.protocol` _Readonly_

A [`Protocol`](protocol.md) object for this session.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

#### `ses.netLog` _Readonly_

A [`NetLog`](net-log.md) object for this session.

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
