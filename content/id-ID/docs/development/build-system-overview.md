# Membangun Sistem Tinjauan

Menggunakan Electron [gyp](https://gyp.gsrc.io/) proyek generasi dan [ninja](https://ninja-build.org/) untuk bangunan. Proyek konfigurasi dapat ditemukan di `.gyp` dan `.gypi` file.

## File Gyp

Setelah `gyp` file berisi aturan utama untuk membangun Electron:

* `electron.gyp` Definisikan bagaimana Electron itu sendiri dibangun.
* `common.gypi` menyesuaikan konfigurasi membangun Node untuk membuatnya dibangun bersama dengan Chromium.
* `brightray/brightray.gyp` mendefinisikan bagaimana `brightray` dibuat dan mencakup konfigurasi default untuk menghubungkan dengan Chromium.
* `brightray/brightray.gypi` termasuk konfigurasi umum membangun tentang bangunan.

## Membangun Komponen

Karena Chromium cukup merupakan proyek besar, tahap penghubung terakhir bisa terjadi cukup beberapa menit, yang membuat sulit untuk pembangunan. Untuk memecahkannya Ini, Chromium memperkenalkan "komponen bangunan", yang membangun setiap komponen sebagai perpustakaan bersama yang terpisah, membuat hubungan sangat cepat namun mengorbankan ukuran file dan kinerja.

Di Electron kami mengambil pendekatan yang sangat mirip: untuk `Debug` membangun, binari akan dikaitkan dengan versi komponen Chromium bersama untuk dikembangkan bersama waktu menghubungkan cepat; untuk `melepaskan` membangun, binari akan dihubungkan ke static versi perpustakaan, jadi kita bisa memiliki ukuran dan kinerja bineri sebaik mungkin.

## Minimal Bootstrapping

Semua binari masa membangun Chromium (`libchromiumcontent`) diunduh saat menjalankan skrip bootstrap. Secara sederhana kedua perpustakaan statis dan pembagian perpustakaan akan didownload dan ukuran akhirnya harus antara 800MB dan 2GB tergantung pada platform.

Secara sederhana, `libchromiumcontent` diunduh dari Amazon Web Services. Jika `LIBCHROMIUMCONTENT_MIRROR` variabel lingkungan disetel, bootstrap script akan mendownload dari itu. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) adalah kaca untuk `libchromiumcontent`. Jika Anda kesulitan mengakses AWS, Anda bisa ganti alamat downloadnya via `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

Jika Anda hanya ingin membangun Electron dengan cepat untuk pengujian atau pengembangan, Anda dapat mendownload hanya versi pembagian pustaka dengan melewatkan `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Generasi Proyek Dua Tahap

Electron links with different sets of libraries in `Release` and `Debug` builds. `gyp`, however, doesn't support configuring different link settings for different configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Target Names

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are just building Electron for rebranding you are not affected.

## Pengujian

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Just append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm test -- -R
```