# webBingkai

> Sesuaikan render halaman web saat ini.

Proses: [Renderer](../glossary.md#renderer-process)

Contoh dari halaman saat ini pembesaran 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Metode

Modul `webBingkai` memiliki metode berikut:

### `webBingkai.tetapkanFaktorZoom(faktor)`

* `faktor` Angka - Faktor zoom.

Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.

### `webBingkai.tetapkanFaktorZoom()`

Kembali `nomor` - faktor zoom saat ini.

### `webBingkai.tetapkanFaktorZoom(level)`

* `level` Angka - level zoom

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan.

### `webBingkai.dapatkanLevelZoom()`

Kembali `nomor` - tingkat zoom saat ini.

### `webBingkai.tetapkanBatasLevelZoom(minimalLevel, maksimalLevel)`

* `minimumLevel` Nomor
* `minimumLevel` Nomor

**Tidak berlaku lagi:**Panggil`setVisualZoomLevelLimits` untuk mengatur zoom visual batas tingkat Metode ini akan dihapus di Electron 2.0.

### `webBingkai.setBatasLevelVisualZoom(minimalLevel, maksimalLevel)`

* `minimumLevel` Nomor
* `minimumLevel` Nomor

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

### `webBingkai.tetapkanBatasLevelZoomTataletak(minimalLevel, maksimaLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

### `webBingkai.setPenyediaPeriksaEjaan(bahasa, otomatisBenarkanKata, penyedia)`

* `bahasa` String
* `otomatisBenarkanKata` Boolean
* `penyedia` Objek 
  * `cekEjaan` Fungsi - kembali `Boolean` 
    * `teks` String

Menetapkan penyedia pemeriksaan ejaan di bidang masukan dan area teks.

Dengan `penyedia` harus menjadi objek yang memiliki metode `cekEjaan`yang kembali apakah kata yang dilewati benar dieja.

Contoh menggunakan [node-cekEjaan](https://github.com/atom/node-spellchecker) sebagai penyedia:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `skema` String

Register `skema` sebagai skema aman.

Skema yang aman tidak memicu peringatan konten campuran. Misalnya, `https` dan `data` adalah skema aman karena tidak dapat rusak oleh jaringan aktif penyerang.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `skema` String

Sumber daya akan dimuat dari skema `ini` terlepas dari halaman sekarang Kebijakan Keamanan Konten.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `skema` String
* `pilihan` Objek (opsional) 
  * `aman` Boolean - (opsional) Default benar.
  * `bypassCSP` Boolean - (opsional) Default benar.
  * `allowServiceWorkers` Boolean - (opsional) Default benar.
  * `supportFetchAPI` Boolean - (opsional) Default benar.
  * `corsEnabled` Boolean - (opsional) Default benar.

Mendaftarkan `skema` sebagai aman, bypass kebijakan keamanan konten untuk sumber daya, memungkinkan mendaftarkan ServiceWorker dan mendukung pengambilan API.

Tentukan pilihan dengan nilai `palsu` untuk menghilangkan itu dari pendaftaran. Contoh mendaftar skema istimewa, tanpa melewati Kebijakan Keamanan Konten:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `teks` String

Sisipan `teks` ke elemen yang terfokus.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `kode` String
* `userGesture` Boolean (opsional) - Default adalah `false`.
* `panggilkembali` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
  * `hasil` Ada

Mengembalikan `Janji` - Janji yang diselesaikan dengan hasil kode yang dijalankan atau ditolak jika hasil dari kode tersebut adalah janji yang ditolak.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

### `webFrame.getResourceUsage()`

Mengembalikan `Boolean`:

* `gambar` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `cssStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `xslStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `Huruf` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `lain` [DetailPemakaianMemori](structures/memory-usage-details.md)

Mengembalikan objek yang menjelaskan informasi penggunaan memori internal Blink cache.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

Ini akan menghasilkan:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Upaya untuk membebaskan memori yang tidak lagi digunakan (seperti gambar dari a navigasi sebelumnya).

Perhatikan bahwa secara membabi buta memanggil metode ini mungkin membuat Electron lebih lambat sejak itu harus mengisi ulang cache yang dikosongkan ini, sebaiknya Anda hanya menelponnya jika sebuah acara di aplikasi Anda telah terjadi yang membuat Anda menganggap halaman Anda benar-benar menggunakan lebih sedikit memori (yaitu Anda telah menavigasi dari halaman super berat ke yang kebanyakan kosong, dan berniat untuk tinggal di sana).