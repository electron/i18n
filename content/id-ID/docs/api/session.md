# sesi

> Mengelola sesi browser, cookies, cache, pengaturan proxy, dll.

Proses: [Main](../glossary.md#main-process)

Modul ` sesi ` dapat digunakan untuk membuat objek ` Sesi ` baru.

Anda juga dapat mengakses `sesi` laman yang ada dengan menggunakan properti `sesi` [`WebContents`](web-contents.md), atau dari modul `sesi`.

```javascript
const { BrowserWindow } = require('electron') membiarkan memenangkan = BrowserWindow({ width: 800, height: 600 }) baru win.loadURL ('http://github.com') const ses = win.webContents.session console.log(ses.getUserAgent())
```

## Metode

Modul ` sesi ` memiliki metode berikut:

### `sesi.daripartisi(partisi[, pilihan])`

* `partisi` Tali
* `pilihan` Objek (pilihan) 
  * `cache` Boolean - Baik untuk mengaktifkan cache.

Kembali ` Sesi </ 0> - Contoh sesi dari <code> partisi </ 0> senar. Bila sudah ada
<code> Sesi ` dengan partisi ` yang sama `, maka akan dikembalikan; jika tidak baru Sesi ` Sesi ` akan dibuat dengan ` pilihan `.

Jika ` partisi ` dimulai dengan ` bertahan: `, halaman akan menggunakan sesi persisten tersedia untuk semua halaman di app dengan partisi ` ` yang sama. `awist:` awalan, halaman akan menggunakan sesi in-memory. Jika `partisi` adalah kosong maka sesi default aplikasi akan dikembalikan.

Untuk membuat sebuah `Sesi` dengan `pilihan`, Anda harus memastikan `Sesi` dengan `partisi` yang tidak pernah digunakan sebelumnya. Tidak ada cara untuk mengubah `pilihan` yang sudah ada `Sesi` sasaran.

## properti

Modul `sesi` terdapat properti sebagai berikut:

### `sesi.sisibawaan`

Sebuah `Sesi` objek, objek sesi bawaan pada aplikasi.

## Tingkat: Sesi

> Dapatkan dan atur peralatan dari sebuah sesi.

Proses: [Main](../glossary.md#main-process)

Kamu bisa membuat sebuah `Sesi` objek di `sesi` modul:

```javascript
const { session } = require('electron') const ses = session.fromPartition('persist:name') console.log(ses.getUserAgent())
```

### Contoh peristiwa

Peristiwa berikut tersedia pada contoh `Sesi`:

#### Perihan: 'akan-terunduh'

Pengembalian:

* `event` Sinyal
* `barang` [unduhbarang](download-item.md)
* `webContents` [WebContents](web-contents.md)

Terpencar ketika Elektron akan men-download `barang` di `webContents`.

Memanggil `peristiwa.mencegahDefault()` akan membatalkan download dan `barang` tidak akan tersedia dari tikungan berikutnya prosesnya.

```javascript
const { session } = require('electron') session.defaultSession.on (' akan-download', (acara, item, webContents) = > {event.preventDefault() require('request')(item.getURL(), (data) = > {require('fs').writeFileSync ('/ di suatu tempat', data)})})
```

#### Event: 'preconnect'

Pengembalian:

* `peristiwa` Peristiwa
* `preconnectUrl` String - The URL being requested for preconnection by the renderer.
* `allowCredentials` Boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

### Metode contoh

Metode berikut tersedia pada contoh `Sesi`:

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Membersihkan sesi-sesi HTTP cache.

#### `ses.clearStorageData([options])`

* `pilihan` Objek (opsional) 
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Menulis data DOMStorage yang tidak tertulis ke disk.

#### `ses.setProxy(config)`

* `konfigurasi` Obyek 
  * `pacScript` String (optional) - The URL associated with the PAC file.
  * `proxyRules` String (optional) - Rules indicating which proxies to use.
  * `proxyBypassRules` String (optional) - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Mengatur pengaturan proxy.

Ketika `pacScript` dan `proxyRules` disediakan bersama, `proxyRules` pilihan diabaikan dan `pacScript` konfigurasi diterapkan.

`proxyRules` harus mengikuti aturan di bawah ini:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Sebagai contoh:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - GunakanHTTP proxy `foopy:80` untuk semua URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` untuk semua URLs, gagal untuk `bar` if `foopy:80` tidak tersedia, dan setelah itu tidak menggunakan proxy.
* `socks4://foopy` - Gunakan SOCKS v4 proxy `foopy:1080` untuk semua URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

The `proxyBypassRules` is a comma separated list of rules described below:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  Match all hostnames that match the pattern HOSTNAME_PATTERN.
  
  Examples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Cocokkan akhiran domain tertentu.
    
    Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Mencocokkan URL yang literal alamat IP.
  
  Contoh: "127.0.1", "[0:0::1]", "[:: 1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
  
  Cocokkan URL yang ada pada literatur IP yang ada di kisaran yang diberikan Kisaran IP ditentukan dengan menggunakan notasi CIDR.
  
  Contoh: "192.168.1.1/16", "fefe:13::abc / 33".

* `<local>`
  
  Perhitingan lokal address. Pengertian dari `<local>` adalah diantaranya perhitungan host satu: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<String>` - Resolves with the proxy information for `url`.

#### `ses.setDownloadPath(path)`

* `jalan` String - lokasi download.

Set download menyimpan direktori. Secara default, direktori download akan `Download` di bawah folder app masing-masing.

#### `ses.enableNetworkEmulation (pilihan)`

* `pilihan` Obyek 
  * `offline` Boolean (opsional) - Apakah untuk meniru jaringan listrik. Default ke false.
  * `latensi` Kamar Double (opsional) - RTT di ms. default untuk 0 yang akan menonaktifkan latency throttling.
  * `downloadThroughput` Double (opsional) - Kecepatan download di Bps. Default ke 0 yang akan menonaktifkan download throttling.
  * `uploadThroughput` Kamar Double (opsional) - Upload tingkat di Bps. defaultnya adalah 0 yang akan menonaktifkan upload throttling.

Emulasikan jaringan dengan konfigurasi yang diberikan untuk `sesi`.

```javascript
Untuk meniru sambungan GPRS dengan 50kbps throughput dan 500 ms latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
}) / / untuk meniru pemadaman jaringan.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.preconnect(options)`

* `pilihan` Obyek 
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

#### `ses.disableNetworkEmulation()`

Nonaktifkan emulasi jaringan yang sudah aktif untuk `sesi`. Turun ke konfigurasi jaringan asli.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null 
  * `permintaan` Obyek 
    * `nama host` String
    * `sertifikat` [Sertifikat](structures/certificate.md)
    * `verificationResult` String - Verification result from chromium.
    * `errorCode` Integer - Error code.
  * `callback` Fungsi 
    * `verificationResult` Bulat - nilai dapat menjadi salah satu kode kesalahan sertifikat dari [di sini](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)Terlepas dari kode kesalahan sertifikat, kode khusus berikut dapat digunakan. 
      * `0` - Indicates success and disables Certificate Transparency verification.
      * `-2` - menunjukkan kegagalan.
      * `-3` - menggunakan hasil verifikasi dari kromium.

Sets sertifikat verifikasi proc untuk `sesi`, `proc` akan dipanggil dengan `proc(request, callback)` setiap kali ada sertifikat server verifikasi diminta. Memanggil `callback(0)` menerima sertifikat, panggilan `callback(-2)` menolak itu.

Memanggil `setCertificateVerifyProc(null)` akan kembali kembali ke default sertifikat verifikasi proc.

```javascript
const { BrowserWindow } = require('electron') membiarkan memenangkan = win.webContents.session.setCertificateVerifyProc BrowserWindow() baru ((request, callback) = > {const { hostname } = permintaan jika (hostname === 'github.com') {callback(0)} lain {callback(-2)}})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null 
  * `webContents` [WebContents](web-contents.md) - WebContents meminta izin. Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `izin` String - Enum 'media', 'geolocation', 'pemberitahuan', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Fungsi 
    * `permissionGranted` Boolean - mengizinkan atau menolak izin.
  * `rincian` Object - Some properties are only available on certain permission types. 
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Menetapkan handler yang dapat digunakan untuk menanggapi permintaan izin untuk `sesi`. Memanggil `callback(true)` akan memungkinkan izin dan `callback(false)` akan menolaknya. To clear the handler, call `setPermissionRequestHandler(null)`.

```javascript
const { session } = require('electron') session.fromPartition('some-partition').setPermissionRequestHandler ((webContents, izin, callback) = > {jika (webContents.getURL() === 'beberapa-host' & & izin === 'pemberitahuan') {}     kembali callback(false) / / ditolak.
  } callback(true)})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Fungsi<boolean> | null 
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission. Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `rincian` Object - Some properties are only available on certain permission types. 
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

#### `ses.clearHostResolverCache ()`

Returns `Promise<void>` - Resolves when the operation is complete.

Menghapus cache resolver host.

#### `ses.allowNTLMCredentialsForDomains(domain)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Secara dinamis tetapkan apakah akan selalu mengirim kredensial untuk HTTP NTLM atau Negotiate otentikasi.

```javascript
const { session } = require('electron') / / mempertimbangkan setiap url yang diakhiri dengan 'example.com', 'foobar.com', 'baz' / / untuk otentikasi Terpadu.
session.defaultSession.allowNTLMCredentialsForDomains ('* example.com, * foobar.com, * baz') / / mempertimbangkan semua Url untuk otentikasi Terpadu.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent (userAgent [, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (opsional)

Menggantikan `userAgent` dan `acceptLanguages` untuk sesi ini.

`AcceptLanguages` harus koma terpisah daftar bahasa kode, misalnya `"En-US, fr, de, ko, zh-CN, ja"`.

Ini tidak akan mempengaruhi yang ada `WebContents`, dan setiap `WebContents` dapat menggunakan `webContents.setUserAgent` untuk menimpa agen sesi pengguna.

#### `ses.getUserAgent()`

Mengembalikan `String` - user agent untuk sesi ini.

#### `ses.getBlobData(identifier)`

* `pengenal` String - UUID berlaku.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `pilihan` Obyek 
  * `jalan` String - path absolut download.
  * `urlChain` String [] - URL lengkap jaringan untuk men-download.
  * `mimeType` String (opsional)
  * `offset` Bulat - rentang mulai untuk men-download.
  * `panjang` Bulat - panjang Total download.
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` Kamar Double (opsional) - waktu download mulai dalam jumlah detik sejak zaman UNIX.

Memungkinkan melanjutkan `dibatalkan` atau `terganggu` download dari `sesi` sebelumnya. API akan menghasilkan [DownloadItem](download-item.md) yang dapat diakses dengan acara [akan-download](#event-will-download). [DownloadItem](download-item.md) tidak akan memiliki apapun `WebContents` terkait dengan itu dan keadaan awal akan `terganggu`. Download akan mulai hanya ketika `melanjutkan` API disebut di [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options)`

* `pilihan` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in. In order for the spell checker to correctly check their words you must call this API with an array of language codes. You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically. This API is a no-op on macOS.

#### `ses.getSpellCheckerLanguages()`

Returns `String[]` - An array of language codes the spellchecker is enabled for. If this list is empty the spellchecker will fallback to using `en-US`. By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale. This setting is persisted across restarts.

**Note:** On macOS the OS spellchecker is used and has it's own list of languages. This API is a no-op on macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN. If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries. We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here.

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`. Please note the trailing slash. The URL to the dictionaries is formed as `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files. This API is a no-op on macOS.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

Returns `Boolean` - Whether the word was successfully written to the custom dictionary.

**Note:** On macOS and Windows 10 this word will be written to the OS custom dictionary as well

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `sesi`:

#### `ses.availableSpellCheckerLanguages` *Readonly*

A `String[]` array which consists of all the known available spell checker languages. Providing a language code to the `setSpellCheckerLanaguages` API that isn't in this array will result in an error.

#### `ses.cookies` *Readonly*

A [`Cookies`](cookies.md) object for this session.

#### `ses.webRequest` *Readonly*

A [`WebRequest`](web-request.md) object for this session.

#### `ses.protocol` *Readonly*

A [`Protocol`](protocol.md) object for this session.

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

#### `ses.netLog` *Readonly*

A [`NetLog`](net-log.md) object for this session.

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