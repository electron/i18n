# Elektron Dokumentasi Styleguide

Ini adalah pedoman untuk menulis dokumentasi Elektron.

## judul

* Setiap halaman harus memiliki satu ` # ` judul-tingkat di bagian atas.
* Bab dalam halaman yang sama harus memiliki ` ## ` judul-tingkat.
* Sub-bab perlu meningkatkan jumlah dari `#` pada judul sesuai kedalaman nesting mereka.
* Semua kata-kata dalam judul halaman harus dikapitalisasi, kecuali konjungsi seperti "dari" dan "dan".
* Hanya kata pertama dari judul bab harus dikapitalisasi.

Menggunakan `Quick Start` sebagai contoh:

```markdown
# Quick Start

...

## Proses Utama

...

## Proses renderer

...

## Jalankan app anda

...

### Jalankan sebagai distribusi

...

### Download binary secara manual

...
```

Untuk API referensi, ada pengecualian untuk aturan ini.

## aturan penurunan harga

* Gunakan `sh` dari pada `cmd` di blok kode (karena stabilo sintaks).
* Garis harus dibungkus pada 80 kolom.
* Tidak ada daftar nesting lebih dari 2 tingkat (karena penyajian penurunan harga).
* Semua `js` dan `javascript` blok kode yang dibatasi dengan [standar-penurunan harga](http://npm.im/standard-markdown).

## Pemetikan kata-kata

* Gunakan "will" lebih "would" ketika menggambarkan hasil.
* Memilih "in the ___ process" lebih "on".

## API referensi

Aturan berikut hanya berlaku untuk dokumentasi API.

### Judul halaman

Setiap halaman harus menggunakan nama objek yang sebenarnya dikembalikan oleh `membutuhkan('elektron')` sebagai judul, seperti `BrowserWindow`, `AutoUpdater`, dan `session`.

Di bawah judul halaman harus menjadi deskripsi satu baris dimulai dengan `>`.

Menggunakan `session` sebagai contoh:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Metode modul dan acara

Untuk modul yang tidak berkelas, metode, dan acara mereka harus terdaftar di bawah `## Metode` dan `## Events` bagian.

Menggunakan `AutoUpdater` sebagai contoh:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Kelas-kelas

* API kelas atau kelas yang merupakan bagian dari modul harus terdaftar di bawah `## Class: TheClassName` bagian.
* Satu halaman dapat memiliki beberapa kelas.
* Konstruktor harus terdaftar dengan `###`-tingkat judul.
* [Metode Statis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) harus terdaftar di bawah `### Static Methods` bagian.
* [Metode Instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) harus terdaftar di bawah `### Instance Methods` bagian.
* Semua metode yang memiliki nilai kembali harus mulai deskripsi mereka dengan "Pengembalian `[TYPE]` - Return description" 
  * Jika metode mengembalikan sebuah `Object`, struktur dapat ditentukan dengan menggunakan titik dua diikuti dengan baris baru kemudian daftar unordered properti dalam gaya yang sama sebagai parameter fungsi.
* Misalnya Acara harus terdaftar di bawah `### Instance Events` bagian.
* Misalnya Properti harus terdaftar di bawah `### Contoh properti` bagian. 
  * Sifat misalnya harus dimulai dengan "A [Property Type] ..."

Menggunakan `Session` dan `Cookies` kelas sebagai contoh:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods

Metode Bab harus dalam bentuk berikut:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Judul bisa `###` atau `####`-levels tergantung pada apakah itu adalah metode modul atau kelas.

Untuk modul, `objectName` adalah nama modul. Untuk kelas, itu harus nama instance dari kelas, dan tidak harus sama dengan nama modul.

Sebagai contoh, metode dari `Session` kelas bawah `session` modul harus menggunakan `ses` sebagai `objectName`.

Argumen opsional dinotasikan oleh tanda kurung `[]` sekitarnya argumen opsional serta koma diperlukan jika argumen opsional ini berikut argumen lain:

```sh
diperlukan [, opsional]
```

Berikut metode ini informasi lebih rinci tentang masing-masing argumen. Jenis argumen dinotasikan oleh salah satu jenis umum:

* [`Tali`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Jumlah`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Sasaran`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`susunan`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Atau jenis kustom seperti Electron [`webcontent`](api/web-contents.md)

Jika argumen atau metode unik untuk platform tertentu, platform tersebut dilambangkan menggunakan daftar dicetak miring ruang-delimited berikut datatype. Nilai bisa saja `MacOS`, `Windows`, atau `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Susunan` ketik argumen harus menentukan elemen susunan yang mungkin termasuk dalam deskripsi di bawah ini.

Deskripsi untuk `Fungsi` ketik argumen harus menjelaskan bagaimana hal itu dapat disebut dan daftar jenis parameter yang akan dikirimkan ke sana.

### Events

Peristiwa Bab harus dalam bentuk berikut:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Judul bisa `###` atau `####`-levels tergantung pada apakah itu adalah acara dari modul atau kelas.

Argumen dari suatu acara mengikuti aturan yang sama seperti metode.

### Properti/peralatan

Sifat Bab harus dalam bentuk berikut:

```markdown
### session.defaultSession

...
```

Judul bisa `###` atau `####`-levels tergantung pada apakah itu adalah properti dari modul atau kelas.

## Dokumentasi Penerjemahan

Lihat [electron/i18n](https://github.com/electron/i18n#readme)