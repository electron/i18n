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
  * `bypassCSP` Boolean - (optional) Default true.
  * `allowServiceWorkers` Boolean - (optional) Default true.
  * `supportFetchAPI` Boolean - (optional) Default true.
  * `corsEnabled` Boolean - (optional) Default true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Inserts `text` to the focused element.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* ` kode </ 0> String</li>
<li><code>userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### `webFrame.getResourceUsage()`

Mengembalikan ` Objek </ 0> :</p>

<ul>
<li><code>images` [MemoryUsageDetails](structures/memory-usage-details.md)</li> 

* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)</ul> 

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

This will generate:

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

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).