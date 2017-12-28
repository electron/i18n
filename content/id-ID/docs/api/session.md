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

Proses: [Utama](../glossary.md#main-process)

Kamu bisa membuat sebuah `Sesi` objek di `sesi` modul:

```javascript
const {sesi} = memerlukan('electron')
const ses = sesi.daripartisi('pertahanan:nama')
console.log(ses.getUserAgent())
```

### Perihal contoh

Peristiwa berikut tersedia pada contoh `Sesi`:

#### Perihan: 'akan-terunduh'

* `acara` Acara
* `barang` [unduhbarang](download-item.md)
* `webContents` [WebContents](web-contents.md)

Terpencar ketika Elektron akan men-download `barang` di `webContents`.

Memanggil `peristiwa.mencegahDefault()` akan membatalkan download dan `barang` tidak akan tersedia dari tikungan berikutnya prosesnya.

```javascript
const {sesi} = memerlukan('electron')
sesi.defaultSesi.pada('akan-mendownload', (agenda, barang, webContents) => {
  peristiwa.mencegahDefault()
  memerlukan('permintaan')(barang.getURL(), (data) => {
    memerlukan('fs').writeFileSync('/ehtahdimana', data)
  })
})
```

### Metode Contoh

Metode berikut tersedia pada contoh `Sesi`:

#### `ses.getCacheSize(panggilanbalik)`

* `panggilan balik` Fungsi 
  * `ukuran`Bilangan Bulat - Ukuran cache yang digunakan dalam bytes.

Callback dipanggil dengan ukuran cache sesi saat ini.

#### `ses.clearCache(callback)`

* `memanggil kembali` Fungsi - terpanggil ketika operasi selesai

Membersihkan sesi-sesi HTTP cache.

#### `ses.clearStorageData([pilihan-pilihan, panggilan kembali])`

* `pilihan-pilihan` Objek (pilihan) 
  * `asal` Senar - (pilihan) Harus mengikuti `jendela.lokasi.asal`’s representasi `scheme://host:port`.
  * `penyimpanan` Senar[] - (pilihan) Jenis penyimpanan yang bisa dihapus, bisa berisi: `chacheaplikasi`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `kuota` Senar[] - (pilihan) Jenis kuota untuk menghapus, dapat berisi: `sementara`, `gigih`, `syncable`.
* `panggilan kembali` Fungsi (pilihan) - Disebut saat operasi selesai.

Menghapus data penyimpanan web.

#### `ses.flushStorageData()`

Menulis data DOMStorage yang tidak tertulis ke disk.

#### `ses.setProxy(config, panggilan kembali)`

* `konfigurasi` Objek 
  * `pacScript` Senar - URL yang terkait dengan file PAC.
  * `proxyRules` Senar - Aturan yang menunjukkan proxy mana yang akan digunakan.
  * `proxyBypassRules` Senar - Aturan yang menunjukkan URL mana yang seharusnya dengan melewati pengaturan proxy.
* `callback` Fungsi - Disebut saat operasi selesai.

Mengatur pengaturan proxy.

Ketika `pacScript` dan `proxyRules` disediakan bersama, `proxyRules` pilihan diabaikan dan `pacScript` konfigurasi diterapkan.

`proxyRules` harus mengikuti aturan di bawah ini:

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

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
}) / / untuk meniru pemadaman jaringan.
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

Memanggil `setCertificateVerifyProc(null)` akan kembali kembali ke default sertifikat verifikasi proc.

```javascript
const {BrowserWindow} = require('electron') membiarkan memenangkan = win.webContents.session.setCertificateVerifyProc BrowserWindow() baru ((request, callback) = > {const {hostname} = permintaan jika (hostname === 'github.com') {callback(0)} lain {callback(-2)}})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Fungsi 
  * `webContents` [WebContents](web-contents.md) - WebContents meminta izin.
  * `izin` String - Enum 'media', 'geolocation', 'pemberitahuan', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Fungsi 
    * `permissionGranted` Boolean - mengizinkan atau menolak izin

Menetapkan handler yang dapat digunakan untuk menanggapi permintaan izin untuk `sesi`. Memanggil `callback(true)` akan memungkinkan izin dan `callback(false)` akan menolaknya.

```javascript
const {session} = require('electron') session.fromPartition('some-partition').setPermissionRequestHandler ((webContents, izin, callback) = > {jika (webContents.getURL() === 'beberapa-host' & & izin === 'pemberitahuan') {}     kembali callback(false) / / ditolak.
  } callback(true)})
```

#### `ses.clearHostResolverCache([callback])`

* `panggilan kembali` Fungsi (pilihan) - Disebut saat operasi selesai.

Menghapus cache resolver host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domain` String - daftar dipisahkan koma server untuk otentikasi Terpadu yang diaktifkan.

Secara dinamis tetapkan apakah akan selalu mengirim kredensial untuk HTTP NTLM atau Negotiate otentikasi.

```javascript
const {session} = require('electron') / / mempertimbangkan setiap url yang diakhiri dengan 'example.com', 'foobar.com', 'baz' / / untuk otentikasi Terpadu.
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

#### `ses.getBlobData (pengenal, callback)`

* `pengenal` String - UUID berlaku.
* `callback` Fungsi 
  * `hasil` Luapan penyangga - gumpalan data.

Mengembalikan `gumpalan` - gumpalan data yang terkait dengan `pengenal`.

#### `ses.createInterruptedDownload(options)`

* `pilihan` Obyek 
  * `jalan` String - path absolut download.
  * `urlChain` String [] - URL lengkap jaringan untuk men-download.
  * `mimeType` String (opsional)
  * `offset` Bulat - rentang mulai untuk men-download.
  * `panjang` Bulat - panjang Total download.
  * `lastModified` String - header Last-Modified nilai.
  * `eTag` String - ETag header nilai.
  * `startTime` Kamar Double (opsional) - waktu download mulai dalam jumlah detik sejak zaman UNIX.

Memungkinkan melanjutkan `dibatalkan` atau `terganggu` download dari `sesi` sebelumnya. API akan menghasilkan [DownloadItem](download-item.md) yang dapat diakses dengan acara [akan-download](#event-will-download). [DownloadItem](download-item.md) tidak akan memiliki apapun `WebContents` terkait dengan itu dan keadaan awal akan `terganggu`. Download akan mulai hanya ketika `melanjutkan` API disebut di [DownloadItem](download-item.md).

#### `ses.clearAuthCache (pilihan [, callback])`

* `pilihan` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Fungsi (opsional) - disebut ketika operasi dilakukan

Membersihkan cache otentikasi HTTP sesi.

### Instance Properties

Properti berikut tersedia pada contoh-contoh dari `sesi`:

#### `ses.cookies`

Sebuah objek [cookie](cookies.md) sesi ini.

#### `ses.webRequest`

Sebuah objek [WebRequest](web-request.md) sesi ini.

#### `ses.protocol`

Sebuah objek [protokol](protocol.md) untuk sesi ini.

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