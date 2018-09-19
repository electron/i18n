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

## --lang

Set a custom locale.

## --memeriksa = `port` dan--memeriksa-brk = `port`

Bendera terkait debug, lihat panduan [Debugging proses utama](../tutorial/debugging-main-process.md) untuk rincian.

## --remote-debugging-port = ` port `

Memungkinkan remote debugging atas HTTP pada `port` tertentu.

## --ukuran disk cache = `ukuran`

Pasukan ruang disk maksimum yang akan digunakan oleh cache disk, dalam bytes.

## --js-bendera `bendera` =

Menentukan bendera dilewatkan ke mesin Node JS. Itu harus disampaikan ketika mulai elektron jika Anda ingin mengaktifkan `bendera` dalam proses utama.

```sh
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

Akan menggunakan proxy server untuk semua host kecuali alamat lokal (`localhost`, `127.0.0.1` dll), `google.com` subdomain, host yang mengandung akhiran `foo.com` dan apa-apa di `1.2.3.4:5678`.

## --proxy-pac-url = `url`

Menggunakan PAC script ditentukan `url`.

## --no-proxy-server

Jangan menggunakan proxy server dan selalu membuat koneksi langsung. Mengabaikan setiap bendera server proxy lain yang disampaikan.

## --host-aturan = `aturan`

Dipisahkan dengan koma daftar `aturan` yang mengontrol bagaimana hostname dipetakan.

Sebagai contoh:

* ` MAP * 127.0.0.1`Memaksa semua nama host yang akan dipetakan ke 127.0.0.1
* `MAP *.google.com proxy ` Memaksa semua subdomain google.com untuk dipecahkan "proxy".
* `MAP test.com [:: 1]: 77 ` Memaksa "test.com" untuk mengatasi loopback IPv6. Akan Juga paksa port dari alamat soket yang dihasilkan menjadi 77.
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

kemudian setiap `url` yang berakhir dengan `example.com`, `foobar.com`, `baz` akan dipertimbangkan untuk otentikasi Terpadu. Tanpa `*` awalan url yang sama persis.

## --auth-negotiate-delegate-whitelist =`url`

Dipisahkan dengan koma daftar server yang delegasi kredensial pengguna diperlukan. Tanpa `*` awalan url yang sama persis.

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

Memberikan standar maksimal aktif V-tingkat pendataan; 0 adalah default. Nilai-nilai positif biasanya digunakan untuk tingkat V-logging.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.

## -vmodule = `pola`

Memberikan setiap modul tingkat V-logging maksimal untuk menimpa nilai yang diberikan oleh `-v`. Misalnya `my_module = 2, foo * = 3` akan mengubah tingkat pendataan untuk semua kode dalam sumber file `my_module.*` dan `foo *. *`.

Setiap pola yang mengandung garis miring maju atau mundur akan diuji terhadap seluruh nama path dan tidak hanya modul. Misalnya `* / foo/bar / * = 2` akan mengubah tingkat pendataan untuk semua kode dalam sumber file di bawah direktori `foo bar`.

Switch ini hanya bekerja ketika `--enable-logging` ini juga dilalui.