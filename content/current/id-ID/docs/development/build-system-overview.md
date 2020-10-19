# Membangun Sistem Tinjauan

Electron menggunakan [GN](https://gn.googlesource.com/gn) untuk proyek generasi dan [ninja](https://ninja-build.org/) untuk membangun. Project configurations can be found in the `.gn` and `.gni` files.

## Berkas GN

` `

* 0> BUILD.gn </code> mendefinisikan bagaimana Electron itu sendiri dibangun dan menyertakan konfigurasi perangkat utama untuk menautkan dengan Chromium.
* ` membangun / args / {debug, rilis, semua}.gn ` berisi argumen membangun perangkat utama untuk membangun Electron.

## Membangun Komponen

Karena Chromium cukup merupakan proyek besar, tahap penghubung terakhir bisa terjadi cukup beberapa menit, yang membuat sulit untuk pembangunan. Untuk memecahkannya Ini, Chromium memperkenalkan "komponen bangunan", yang membangun setiap komponen sebagai perpustakaan bersama yang terpisah, membuat hubungan sangat cepat namun mengorbankan ukuran file dan kinerja.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Uji

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

Menguji perubahan sesuai dengan proyek gaya pengkodean menggunakan:

```sh
$ npm run lint
```

Menguji fungsionalitas menggunakan:

```sh
$ npm test
```

Kapan pun Anda membuat perubahan pada kode sumber Electron, Anda harus menjalankan kembali membangun sebelum tes:

```sh
$ npm run build && npm test
```

Anda dapat membuat test suite berjalan lebih cepat dengan mengisolasi tes atau blok tertentu Anda sedang mengerjakan penggunaan Mocha's [tes eksklusif](https://mochajs.org/#exclusive-tests) fitur. ` .hanya ` untuk pemanggilan fungsi ` deskripsikan ` atau ` fungsinya itu`:

```js
describe.only('some feature', () => {
  // ... only tests in this block will be run
})
```

Sebagai alternatif, Anda bisa menggunakan opsi mocha's `grep` untuk hanya menjalankan tes yang sesuai dengan memberi ekspresi pola reguler:

```sh
$ npm test -- --grep child_process
```

Pengujian yang menyertakan modul asli (misalnya `runas`) tidak dapat dijalankan dengan membangun debug (lihat [#2558](https://github.com/electron/electron/issues/2558) untuk rincian), tapi mereka akan bekerja dengan membangun rilis.

Untuk menjalankan tes dengan menggunakan membangun rilis:

```sh
$ npm test -- -R
```
