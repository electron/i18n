# Saklar Baris Perintah Chrome yang Didukung

> Beralih baris perintah yang didukung oleh Elektron .

Anda dapat menggunakan [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) untuk menambahkan mereka di app's script utama sebelum acara [siap](app.md#event-ready) modul [app](app.md) dibunyikan:

```javascript
const {app} = require ('electron')
app.commandLine.appendSwitch ('remote-debugging-port', '8315')
app.commandLine.appendSwitch ('host-rules', 'MAP * 127.0.0.1')

app.on ('siap', () = > {
   // kode kamu disini
})
```

## --ignore-connections-limit = ` domain `

Abaikan batas koneksi untuk ` domain ` yang dipisahkan oleh `, `.

## --disable-http-cache

Menonaktifkan cache disk untuk permintaan HTTP.

## --disable-http2

Nonaktifkan protokol HTTP / 2 dan SPDY / 3.1.

## periksa =` port ` dan --inspect-brk =` port `</0>

Bendera yang terkait dengan Debug, lihat panduan [ Debugging Main Process ](../tutorial/debugging-main-process.md) untuk rinciannya.

## --remote-debugging-port = ` port `

Mengaktifkan debugging jarak jauh melalui HTTP pada port ` yang ditentukan `.

## --disk-cache-size =`ukuran`

Memaksa ruang disk maksimum yang akan digunakan oleh cache disk, dalam bytes.

## --js-flags =`flags`

Menentukan bendera yang dilewatkan ke mesin Node JS. Itu harus berlalu ketika mulai Electron jika Anda ingin mengaktifkan ` bendera </ 0> dalam proses utama.</p>

<pre><code class="bash">$ electron --js-flags = "- harmony_proxies --harmony_collections" your-app
`</pre> 

Lihat dokumentasi[Node](https://nodejs.org/api/cli.html)atau jalankan`node --help `di terminal Anda untuk daftar flag yang tersedia. Selain itu, jalan `node --v8-options`untuk melihat daftar flag yang secara khusus merujuk ke mesin JavaScript Vtp Node.

## --proxy-server =`alamat: port`

Gunakan server proxy tertentu, yang menggantikan pengaturan sistem. Saklar ini hanya memengaruhi permintaan dengan protokol HTTP, termasuk HTTPS dan WebSocket permintaan. Perlu dicatat juga bahwa tidak semua server proxy mendukung HTTPS dan Permintaan WebSocket.

## --proxy-bypass-list =`host`

Instruksikan Elektron untuk memotong server proxy untuk semi-colon-separated yang diberikan daftar host Bendera ini hanya memiliki efek jika digunakan bersamaan ` - proxy-server `.

Sebagai contoh:

```javascript
const {app} = require ('electron')
app.commandLine.appendSwitch ('proxy-bypass-list', '<local>; * google.com; * foo.com; 1.2.3.4: 5678')
```

Akan menggunakan server proxy untuk semua host kecuali untuk alamat lokal (` localhost `, ` 127.0.0.1` dll.), ` google.com` subdomain, host yang berisi akhiran ` foo.com ` dan apa saja di `1.2.3.4:5678`.

## --proxy-pac-url =`url`

Menggunakan script PAC di`url`yang ditentukan.

## --no-proxy-server

Jangan menggunakan server proxy dan selalu melakukan koneksi langsung. Menimpa yang lain flag server proxy yang dilewatkan.

## --host-rules =` rules `

Daftar aturan`yang dipisahkan koma yang mengontrol bagaimana nama host dipetakan.
 .</p>

<p>Sebagai contoh:</p>

<ul>
<li><code> MAP * 127.0.0.1`Memaksa semua nama host yang akan dipetakan ke 127.0.0.1</li> 

* `MAP *.google.com proxy ` Memaksa semua subdomain google.com untuk dipecahkan "proxy".
* `MAP test.com [:: 1]: 77 ` Memaksa "test.com" untuk mengatasi loopback IPv6. Akan Juga paksa port dari alamat soket yang dihasilkan menjadi 77.
* `MAP * baz, EXCLUDE www.google.com`Kembalikan semuanya ke "baz", kecuali untuk "www.google.com".</ul> 

Pemetaan ini berlaku untuk host titik akhir dalam permintaan bersih (koneksi TCP dan resolver host dalam koneksi langsung, dan ` CONNECT ` di proxy HTTP koneksi, dan host titik akhir dalam koneksi proxy ` SOCKS `).

## aturan host-resolver = ``

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist =`url`

Daftar server yang dipisahkan koma yang otentikasinya telah diaktifkan.

Sebagai contoh:

    --auth-server-whitelist = '* example.com, * foobar.com, * baz'
    

maka setiap`url` yang diakhiri dengan `example.com `,` foobar.com `,` baz`akan dipertimbangkan untuk otentikasi terpadu. Tanpa awalan`*`url harus sesuai persis.  .

## --auth-negotiate-delegate-whitelist=`url`

Daftar server yang dipisahkan koma yang diperlukan oleh pendelegasian mandat pengguna. Tanpa awalan `*` url harus sesuai persis.

## -- kesalahan sertifikat-kesalahan

Mengabaikan kesalahan terkait sertifikat

## --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`path`

Mengaktifkan aktivitas log bersih untuk disimpan dan menuliskannya ke ` path </ 0> .</p>

<h2>--disable-renderer-backgrounding</h2>

<p>Mencegah Chromium menurunkan prioritas proses perender halaman yang tak terlihat.</p>

<p>Flag ini bersifat global untuk semua proses renderer, jika Anda hanya ingin menonaktifkan throttling dalam satu jendela, Anda bisa melakukan hack
 <a href="https://github.com/atom/atom/pull/9485/files"> bermain audio sunyi </ 0> .</p>

<h2>--enable-logging</h2>

<p>Mencetak Chrome masuk ke konsol.</p>

<p>Peralihan ini tidak dapat digunakan di <code> app.commandLine.appendSwitch </ 0> karena diurai lebih awal dari aplikasi pengguna yang dimuat, namun Anda dapat mengatur 
variabel lingkungan <code> ELECTRON_ENABLE_LOGGING </ 0> untuk mencapai efek yang sama. .</p>

<h2>--v=<code>log_level`</h2> 

Memberikan level maximum V-logging default maksimal; 0 adalah default Biasanya nilai positif digunakan untuk tingkat V-logging.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`pattern`

Memberikan level maksimal V-logging per modul untuk mengesampingkan nilai yang diberikan oleh `-v `. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Setiap pola yang mengandung garis miring ke depan atau ke belakang akan diuji terhadap seluruh pathname dan bukan hanya modulnya. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Peralihan ini hanya berfungsi saat`- enable-logging `juga dilewatkan.