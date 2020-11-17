# Sakelar Baris Perintah yang Didukung

> Saklar baris perintah yang didukung oleh elektron.

Anda dapat menggunakan [app.commandLine.appendSwitch][append-switch] untuk menambahkan mereka di app's script utama sebelum acara [siap][ready] modul [app][app] dibunyikan:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

### --auth-server-whitelist =`url`

Daftar server yang dipisahkan koma yang otentikasinya telah diaktifkan.

Sebagai contoh:

```sh
--auth-server-whitelist='*example.com, * foobar.com, * baz'
```

kemudian setiap `url` yang berakhir dengan `example.com`, `foobar.com`, `baz` akan dipertimbangkan untuk otentikasi Terpadu. Without `*` prefix the URL has to match exactly.

### --auth-negotiate-delegate-whitelist =`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --menonaktifkan-http-cache

Menonaktifkan disk cache untuk permintaan HTTP.

### --menonaktifkan-http2

Menonaktifkan protokol HTTP/2 dan SPDY 3.1.

### -disable-renderer-backgrounding

Mencegah Kromium menurunkan prioritas proses renderer kelihatan halaman.

Bendera ini global untuk semua proses renderer, jika Anda hanya ingin menonaktifkan throttling dalam satu jendela, Anda dapat mengambil hack bermain [diam audio][play-silent-audio].

### --ukuran disk cache = `ukuran`

Pasukan ruang disk maksimum yang akan digunakan oleh cache disk, dalam bytes.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Cetakan Kromium login ke konsol.

Switch ini tidak dapat digunakan di `app.commandLine.appendSwitch` karena parsing lebih awal dari pengguna aplikasi dimuat, tetapi Anda dapat mengatur variabel lingkungan `ELECTRON_ENABLE_LOGGING` untuk mencapai efek yang sama.

### --host-aturan = `aturan`

Dipisahkan dengan koma daftar `aturan` yang mengontrol bagaimana hostname dipetakan.

Sebagai contoh:

* ` MAP * 127.0.0.1`Memaksa semua nama host yang akan dipetakan ke 127.0.0.1
* `MAP *.google.com proxy ` Memaksa semua subdomain google.com untuk dipecahkan "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com`Kembalikan semuanya ke "baz", kecuali untuk "www.google.com".

Pemetaan ini berlaku untuk host titik akhir dalam permintaan bersih (koneksi TCP dan resolver host dalam koneksi langsung, dan ` CONNECT ` di proxy HTTP koneksi, dan host titik akhir dalam koneksi proxy ` SOCKS `).

### aturan host-resolver = ``

Seperti `--host-aturan` tetapi `aturan` ini hanya berlaku untuk pemisah tuan rumah.

### --mengabaikan-sertifikat-kesalahan

Mengabaikan sertifikat terkait kesalahan.

### --ignore-connections-limit = ` domain `

Mengabaikan batas koneksi untuk daftar `domain` yang dipisahkan oleh `,`.

### --js-bendera `bendera` =

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ elektron--js-bendera = "--harmony_proxies--harmony_collections" Anda-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log = `path`

Memungkinkan bersih log peristiwa untuk diselamatkan dan menulis mereka ke `jalan`.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list =`host`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Sebagai contoh:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch ('proxy-bypass-list', '<local>; * google.com; * foo.com; 1.2.3.4: 5678')
```

Akan menggunakan proxy server untuk semua host kecuali alamat lokal (`localhost`, `127.0.0.1` dll), `google.com` subdomain, host yang mengandung akhiran `foo.com` dan apa-apa di `1.2.3.4:5678`.

### --proxy-pac-url = `url`

Menggunakan PAC script ditentukan `url`.

### --proxy-server =`alamat: port`

Menggunakan server proxy tertentu, yang menimpa pengaturan sistem. Switch ini hanya mempengaruhi permintaan dengan protokol HTTP, termasuk HTTPS dan WebSocket permintaan. Hal ini juga perlu dicatat bahwa tidak semua server proxy dukungan HTTPS dan WebSocket permintaan. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port = ` port `

Memungkinkan remote debugging atas HTTP pada `port` tertentu.

### --ppapi-flash-jalan = `path`

Set `path` plugin flash lada.

### --ppapi-flash-version=`versi`

Menetapkan `Versi` plugin flash lada.

### --v = `log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

### -vmodule = `pola`

Memberikan setiap modul tingkat V-logging maksimal untuk menimpa nilai yang diberikan oleh `-v`. Misalnya `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Misalnya `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

### --force_high_performance_gpu

Force using discrete GPU when there are multiple GPUs available.

### --force_low_power_gpu

Force using integrated GPU when there are multiple GPUs available.

## Node.js Flags

Electron supports some of the [CLI flags][node-cli] supported by Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspect-brk[=[host:]port]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Activate inspector on `host:port`. Default is `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

See the [Debugging the Main Process][debugging-main-process] guide for more details.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http
Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.

[app]: app.md
[append-switch]: app.md#appcommandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
