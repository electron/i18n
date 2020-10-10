# Membangun Sistem Tinjauan

Electron menggunakan [GN](https://gn.googlesource.com/gn) untuk proyek generasi dan [ninja](https://ninja-build.org/) untuk membangun. Project configurations can be found in the `.gn` and `.gni` files.

## Berkas GN

` `

* `BUILD.gn` defines how Electron itself is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Component Build

Since Chromium is quite a large project, the final linking stage can take quite a few minutes, which makes it hard for development. In order to solve this, Chromium introduced the "component build", which builds each component as a separate shared library, making linking very quick but sacrificing file size and performance.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Tests

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm tes
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

Anda dapat membuat test suite berjalan lebih cepat dengan mengisolasi tes atau blok tertentu Anda sedang mengerjakan penggunaan Mocha's [tes eksklusif](https://mochajs.org/#exclusive-tests) fitur. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
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
