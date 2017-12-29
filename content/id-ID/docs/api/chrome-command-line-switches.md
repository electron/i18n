# Didukung saklar baris perintah Chrome

> Saklar baris perintah yang didukung oleh elektron.

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

Mengabaikan batas koneksi untuk daftar `domain` yang dipisahkan oleh `,`.

## --menonaktifkan-http-cache

Menonaktifkan disk cache untuk permintaan HTTP.

## --menonaktifkan-http2

Menonaktifkan protokol HTTP/2 dan SPDY 3.1.

## --memeriksa = `port` dan--memeriksa-brk = `port`

Bendera terkait debug, lihat panduan [Debugging proses utama](../tutorial/debugging-main-process.md) untuk rincian.

## --remote-debugging-port = ` port `

Memungkinkan remote debugging atas HTTP pada `port` tertentu.

## --ukuran disk cache = `ukuran`

Pasukan ruang disk maksimum yang akan digunakan oleh cache disk, dalam bytes.

## --js-bendera `bendera` =

Menentukan bendera dilewatkan ke mesin Node JS. Itu harus disampaikan ketika mulai elektron jika Anda ingin mengaktifkan `bendera` dalam proses utama.

```bash
$ elektron--js-bendera = "--harmony_proxies--harmony_collections" Anda-app
```

Lihat [dokumentasi Node](https://nodejs.org/api/cli.html) atau menjalankan `simpul--bantuan` di terminal Anda untuk daftar tersedia bendera. Selain itu, menjalankan `simpul--v8-opsi` untuk melihat daftar bendera yang secara khusus mengacu pada mesin V8 JavaScript Node.

## --proxy-server =`alamat: port`

Menggunakan server proxy tertentu, yang menimpa pengaturan sistem. Switch ini hanya mempengaruhi permintaan dengan protokol HTTP, termasuk HTTPS dan WebSocket permintaan. Hal ini juga perlu dicatat bahwa tidak semua server proxy dukungan HTTPS dan WebSocket permintaan.

## --proxy-bypass-list =`host`

Memerintahkan elektron untuk mem-bypass server proxy untuk daftar dipisahkan semi-auto-colon tertentu semesta alam. Bendera ini memiliki efek hanya jika digunakan bersamaan dengan `--proxy server`.

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

Seperti `--host-aturan` tetapi `aturan` ini hanya berlaku untuk pemisah tuan rumah.

## --auth-server-whitelist =`url`

Daftar server yang dipisahkan koma yang otentikasinya telah diaktifkan.

Sebagai contoh:

    --auth-server-whitelist = '* example.com, * foobar.com, * baz'
    

maka setiap`url` yang diakhiri dengan `example.com `,` foobar.com `,` baz`akan dipertimbangkan untuk otentikasi terpadu. Tanpa awalan`*`url harus sesuai persis.  .

## --auth-negotiate-delegate-whitelist=`url`

Daftar server yang dipisahkan koma yang diperlukan oleh pendelegasian mandat pengguna. Tanpa awalan `*` url harus sesuai persis.

## -- kesalahan sertifikat-kesalahan

Mengabaikan kesalahan terkait sertifikat

## --ppapi-flash-jalan = `path`

Set `path` plugin flash lada.

## --ppapi-flash-version=`version`

Menetapkan `Versi` plugin flash lada.

## --log-net-log = `path`

Mengaktifkan aktivitas log bersih untuk disimpan dan menuliskannya ke ` path </ 0> .</p>

<h2>--disable-renderer-backgrounding</h2>

<p>Mencegah Chromium menurunkan prioritas proses perender halaman yang tak terlihat.</p>

<p>Flag ini bersifat global untuk semua proses renderer, jika Anda hanya ingin menonaktifkan throttling dalam satu jendela, Anda bisa melakukan hack
 <a href="https://github.com/atom/atom/pull/9485/files"> bermain audio sunyi </ 0> .</p>

<h2>--enable-logging</h2>

<p>Mencetak Chrome masuk ke konsol.</p>

<p>Peralihan ini tidak dapat digunakan di <code> app.commandLine.appendSwitch </ 0> karena diurai lebih awal dari aplikasi pengguna yang dimuat, namun Anda dapat mengatur 
variabel lingkungan <code> ELECTRON_ENABLE_LOGGING </ 0> untuk mencapai efek yang sama. .</p>

<h2>--v = <code>log_level`</h2> 

Memberikan level maximum V-logging default maksimal; 0 adalah default Biasanya nilai positif digunakan untuk tingkat V-logging.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

## -vmodule = `pola`

Memberikan level maksimal V-logging per modul untuk mengesampingkan nilai yang diberikan oleh `-v `. Misalnya `my_module = 2, foo * = 3` akan mengubah tingkat pendataan untuk semua kode dalam sumber file `my_module.*` dan `foo *. *`.

Setiap pola yang mengandung garis miring ke depan atau ke belakang akan diuji terhadap seluruh pathname dan bukan hanya modulnya. Misalnya `* / foo/bar / * = 2` akan mengubah tingkat pendataan untuk semua kode dalam sumber file di bawah direktori `foo bar`.

Peralihan ini hanya berfungsi saat`- enable-logging `juga dilewatkan.