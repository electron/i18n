# sesi

> Mengelola sesi browser, cookies, cache, pengaturan proxy, dll.

Proses: [Utama](../glossary.md#main-process)

Modul ` sesi ` dapat digunakan untuk membuat objek ` Sesi ` baru.

Anda juga dapat mengakses `sesi</> dari halaman yang ada dengan menggunakan properti <code>sesi` dari [` WebContents `](web-contents.md), atau dari modul `sesi`.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Metode

Modul ` sesi ` memiliki metode berikut:

### `sesi.daripartisi(partisi[, pilihan])`

* `partisi` Tali
* `pilihan` Sasaran 
  * `cache` Boolean - Baik untuk mengaktifkan cache.

Kembali ` Sesi </ 0> - Contoh sesi dari <code> partisi </ 0> senar. Bila sudah ada
<code> Sesi </ 0> dengan yang sama <code> partisi </ 0>, maka akan dikembalikan; jika tidak baru
<code> Sesi </ 0> contohnya akan dibuat dengan <code> pilihan </ 0>.</p>

<p>Jika <code> partisi ` dimulai dengan ` bertahan: `, halaman akan menggunakan sesi persisten tersedia untuk semua halaman di aplikasi dengan yang sama ` partisi `. jika tidak ada `bertahan:` awalan, halaman akan menggunakan sesi dalam penyimpanan. Jika `partisi` kosong maka sesi dasar aplikasi akan dikembalikan.

Untuk membuat sebuah `Sesi` dengan `pilihan`, Anda harus memastikan `Sesi` dengan `partisi` yang tidak pernah digunakan sebelumnya. Tidak ada cara untuk mengubah `pilihan` yang sudah ada `Sesi` sasaran.

## Properti/peralatan

Modul `sesi` terdapat properti sebagai berikut:

### `sesi.sisibawaan`

Sebuah `Sesi` objek, objek sesi bawaan pada aplikasi.

## Tingkat: Sesi

> Dapatkan dan atur peralatan dari sebuah sesi.

Process: [Main](../glossary.md#main-process)

You can create a `Session` object in the `session` module:

```javascript
const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Instance Events

The following events are available on instances of `Session`:

#### Event: 'will-download'

* `event` Event
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

### Instance Methods

The following methods are available on instances of `Session`:

#### `ses.getCacheSize(callback)`

* `callback` Function 
  * `size` Integer - Cache size used in bytes.

Callback is invoked with the session's current cache size.

#### `ses.clearCache(callback)`

* `callback` Function - Called when operation is done

Clears the session’s HTTP cache.

#### `ses.clearStorageData([options, callback])`

* `options` Object (optional) 
  * `origin` String - (optional) Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] - (optional) The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (optional) The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (optional) - Called when operation is done.

Clears the data of web storages.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config, callback)`

* `config` Object 
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
    

For example:

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
    
    Cocokkan akhiran domain tertentu.
    
    Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Mencocokkan URL yang literal alamat IP.
  
  Contoh: "127.0.1", "[0:0::1]", "[:: 1]", "http://[::1]:99"

* `IP_LITERAL PREFIX_LENGHT_IN_BITS "/"`
  
  Cocokkan URL yang ada pada literatur IP yang ada di kisaran yang diberikan Kisaran IP ditentukan dengan menggunakan notasi CIDR.
  
  Contoh: "192.168.1.1/16", "fefe:13::abc / 33".

* `<local>`
  
  Perhitingan lokal address. Pengertian dari `<local>` adalah diantaranya perhitungan host satu: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy (url, callback)`

* ` url </ 0> URL</li>
<li><code>callback` Fungsi 
  * `proxy` String

Menyelesaikan informasi proksi untuk `url`. `Callback` akan dipanggil dengan `callback(proxy)` ketika permintaan dilakukan.

#### `ses.setDownloadPath(path)`

* `jalan` String - lokasi download

Set download menyimpan direktori. Secara default, direktori download akan `Download` di bawah folder app masing-masing.

#### `ses.enableNetworkEmulation(options)`

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
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Nonaktifkan emulasi jaringan yang sudah aktif untuk `sesi`. Turun ke konfigurasi jaringan asli.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Fungsi 
  * `permintaan` Obyek 
    * `hostname` String
    * ` sertifikat </ 0>  <a href="structures/certificate.md"> Sertifikat </ 1></li>
<li><code>error` String - Verification result from chromium.
  * `callback` Fungsi 
    * `verificationResult` Integer - Nilai bisa menjadi salah satu kode kesalahan sertifikat dari [di sini](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)Terlepas dari kode kesalahan sertifikat, kode khusus berikut dapat digunakan. 
      * `` - menunjukkan keberhasilan dan menonaktifkan verifikasi sertifikat Transperancy.
      * `-2` - menunjukkan kegagalan.
      * `-3` - menggunakan hasil verifikasi dari kromium.

Sets sertifikat verifikasi proc untuk `sesi`, `proc` akan dipanggil dengan `proc(request, callback)` setiap kali ada sertifikat server verifikasi diminta. Memanggil `callback(0)` menerima sertifikat, panggilan `callback(-2)` menolak itu.

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

* `handler` Fungsi 
  * `webContents` [WebContents](web-contents.md) - WebContents meminta izin.
  * `izin` String - Enum 'media', 'geolocation', 'pemberitahuan', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Fungsi 
    * `permissionGranted` Boolean - mengizinkan atau menolak izin

Menetapkan handler yang dapat digunakan untuk menanggapi permintaan izin untuk `sesi`. Memanggil `callback(true)` akan memungkinkan izin dan `callback(false)` akan menolaknya.

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

Menghapus cache resolver host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domain` String - daftar dipisahkan koma server untuk otentikasi Terpadu yang diaktifkan.

Secara dinamis tetapkan apakah akan selalu mengirim kredensial untuk HTTP NTLM atau Negotiate otentikasi.

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
* `callback` Fungsi 
  * `result` Buffer - Blob data.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `pilihan` Obyek 
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

### Instance Properties

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