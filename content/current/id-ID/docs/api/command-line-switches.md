# Supported Command Line Switches

> Saklar baris perintah yang didukung oleh elektron.

Anda dapat menggunakan [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) untuk menambahkan mereka di app's script utama sebelum acara [siap](app.md#event-ready) modul [app](app.md) dibunyikan:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch ('remote-debugging-port', '8315')
app.commandLine.appendSwitch ('host-rules', 'MAP * 127.0.0.1')

app.on ('siap', () = > {
   // kode kamu disini
})
```

## --ignore-connections-limit = ` domain `

Mengabaikan batas koneksi untuk daftar `domain` yang dipisahkan oleh `,`.

## --menonaktifkan-http-cache

Menonaktifkan disk cache untuk permintaan HTTP.

## --menonaktifkan-http2

Menonaktifkan protokol HTTP/2 dan SPDY 3.1.

## --lang

Set a custom locale.

## --memeriksa = `port` dan--memeriksa-brk = `port`

Bendera terkait debug, lihat panduan [Debugging proses utama](../tutorial/debugging-main-process.md) untuk rincian.

## --remote-debugging-port = ` port `

Memungkinkan remote debugging atas HTTP pada `port` tertentu.

## --ukuran disk cache = `ukuran`

Pasukan ruang disk maksimum yang akan digunakan oleh cache disk, dalam bytes.

## --js-bendera `bendera` =

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ elektron--js-bendera = "--harmony_proxies--harmony_collections" Anda-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server =`alamat: port`

Menggunakan server proxy tertentu, yang menimpa pengaturan sistem. Switch ini hanya mempengaruhi permintaan dengan protokol HTTP, termasuk HTTPS dan WebSocket permintaan. Hal ini juga perlu dicatat bahwa tidak semua server proxy dukungan HTTPS dan WebSocket permintaan. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list =`host`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Sebagai contoh:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch ('proxy-bypass-list', '<local>; * google.com; * foo.com; 1.2.3.4: 5678')
```

Akan menggunakan proxy server untuk semua host kecuali alamat lokal (`localhost`, `127.0.0.1` dll), `google.com` subdomain, host yang mengandung akhiran `foo.com` dan apa-apa di `1.2.3.4:5678`.

## --proxy-pac-url = `url`

Menggunakan PAC script ditentukan `url`.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-aturan = `aturan`

Dipisahkan dengan koma daftar `aturan` yang mengontrol bagaimana hostname dipetakan.

Sebagai contoh:

* ` MAP * 127.0.0.1`Memaksa semua nama host yang akan dipetakan ke 127.0.0.1
* `MAP *.google.com proxy ` Memaksa semua subdomain google.com untuk dipecahkan "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com`Kembalikan semuanya ke "baz", kecuali untuk "www.google.com".

Pemetaan ini berlaku untuk host titik akhir dalam permintaan bersih (koneksi TCP dan resolver host dalam koneksi langsung, dan ` CONNECT ` di proxy HTTP koneksi, dan host titik akhir dalam koneksi proxy ` SOCKS `).

## aturan host-resolver = ``

Seperti `--host-aturan` tetapi `aturan` ini hanya berlaku untuk pemisah tuan rumah.

## --auth-server-whitelist =`url`

Daftar server yang dipisahkan koma yang otentikasinya telah diaktifkan.

Sebagai contoh:

```sh
--auth-server-whitelist='*example.com, * foobar.com, * baz'
```

kemudian setiap `url` yang berakhir dengan `example.com`, `foobar.com`, `baz` akan dipertimbangkan untuk otentikasi Terpadu. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist =`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

## --mengabaikan-sertifikat-kesalahan

Mengabaikan sertifikat terkait kesalahan.

## --ppapi-flash-jalan = `path`

Set `path` plugin flash lada.

## --ppapi-flash-version=`versi`

Menetapkan `Versi` plugin flash lada.

## --log-net-log = `path`

Memungkinkan bersih log peristiwa untuk diselamatkan dan menulis mereka ke `jalan`.

## -disable-renderer-backgrounding

Mencegah Kromium menurunkan prioritas proses renderer kelihatan halaman.

Bendera ini global untuk semua proses renderer, jika Anda hanya ingin menonaktifkan throttling dalam satu jendela, Anda dapat mengambil hack bermain [diam audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Cetakan Kromium login ke konsol.

Switch ini tidak dapat digunakan di `app.commandLine.appendSwitch` karena parsing lebih awal dari pengguna aplikasi dimuat, tetapi Anda dapat mengatur variabel lingkungan `ELECTRON_ENABLE_LOGGING` untuk mencapai efek yang sama.

## --v = `log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

## -vmodule = `pola`

Memberikan setiap modul tingkat V-logging maksimal untuk menimpa nilai yang diberikan oleh `-v`. Misalnya `my_module = 2, foo * = 3` akan mengubah tingkat pendataan untuk semua kode dalam sumber file `my_module.*` dan `foo *. *`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Misalnya `* / foo/bar / * = 2` akan mengubah tingkat pendataan untuk semua kode dalam sumber file di bawah direktori `foo bar`.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

## --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`
- `remote.getGuestWebContents()` / `remote-get-guest-web-contents`

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.
