# Gaya coding

Berikut adalah pedoman gaya untuk penulisan coding di Electron.

Anda dapat menjalankan `npm run lint` untuk menunjukkan macam gaya yang terdeteksi oleh `cpplint` dan `eslint`.

## C ++ dan Python

Untuk C ++ dan Python, kita mengikuti [Gaya coding](http://www.chromium.org/developers/coding-style) Chromium. Anda dapat menggunakan [clang-format](clang-format.md) untuk memformat kode C ++ secara otomatis. Ada juga script `script/cpplint.py` untuk memeriksa apakah semua file sesuai.

Versi Python yang kita gunakan sekarang adalah Python 2.7.

Kode C ++ menggunakan banyak abstraksi dan tipe Chromium, jadi disarankan untuk berkenalan dengan mereka. Tempat yang baik untuk memulai adalah dokumen Chromium 's [Struktur Data dan Abstraksi penting ](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures). Dokumen tersebut menyebutkan beberapa jenis khusus, lingkup jenis-jenis (yang secara otomatis melepaskan ingatan mereka saat berada diluar lingkup), mekanisme logging dll.

## JavaScript

* Menulis [standar](http://npm.im/standard) gaya JavaScript.
* Nama file harus dihubungkan dengan `-` bukan `_`, misalnya `nama-file.js` bukannya `nama_file.js`, karena di [github/atom](https://github.com/github/atom) nama-nama modul biasanya dalam bentuk berupa `nama-modul`. Aturan ini hanya berlaku untuk file-file `.js`.
* Gunakan sintaks ES6 / ES2015 yang lebih baru yang tepat 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) untuk persyaratan dan konstanta lainnya
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) untuk mendefinisikan variabel
  * [Fungsi panah](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) daripada fungsi `() { } `
  * [Template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) daripada penggabungan string menggunakan `+`

## Penamaan Sesuatu

API electron menggunakan skema kapitalisasi yang sama dengan Node.js:

* Ketika modul itu sendiri adalah sebuah kelas seperti `BrowserWindow`, menggunakan `CamelCase`.
* Ketika modul adalah seperangkat API, seperti `globalShortcut`, menggunakan `mixedCase`.
* Ketika API adalah sebuah properti dari objek, dan cukup kompleks untuk berada di bab terpisah seperti `win.webContents`, menggunakan `mixedCase`.
* Untuk API bukan-modul lain, menggunakan judul alami, seperti `<webview>Tag` atau `Objek Proses`.

Saat membuat API baru, lebih disukai menggunakan getter dan setter daripada gaya satu-fungsi jQuery. Sebagai contoh, `.getText()` dan `.setText(text)` lebih diutamakan untuk `.text([text])`. Demikianlah sebuah [diskusi](https://github.com/electron/electron/issues/46) pada hal ini.