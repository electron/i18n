# Mengupgrade Chromium

Ini adalah ikhtisar langkah-langkah yang diperlukan untuk meningkatkan Chromium di Elektron.

- Tingkatkan versi beta ke versi Chromium baru
- Buat kode Elektron yang kompatibel dengan libcc baru
- Update Elektron dependensi (crashpad, NodeJS, dll) jika diperlukan
- Buatlah build internal dari libcc dan elektron
- Update Electron docs jika perlu


## Tingkatkan versi `libcc` ke versi Chromium baru

1. Dapatkan kode dan inisialisasi proyek:
  ```sh
  $ git clone git@github.com:electron/libchromiumcontent.git
  $ cd libchromiumcontent
  $ ./script/bootstrap -v
  ```
2. Perbarui snapshot Chromium
  - Choose a version number from [OmahaProxy](https://omahaproxy.appspot.com/) and update the `VERSION` file with it
    - Ini bisa dilakukan secara manual dengan mengunjungi OmahaProxy di browser, atau secara otomatis:
    - Satu-baris untuk versi mac terbaru yang stabil: `curl -so- https://omahaproxy.appspot.com/mac > VERSI`
    - Satu-baris untuk versi beta win64 terbaru: `curl -so- https://omahaproxy.appspot.com/all | grep "win64, beta" | awk -F, 'NR == 1{print $3}' > VERSI`
  - run `$ ./script/update`
    - Siapkan teh - ini bisa berlangsung 30m atau lebih.
    - Mungkin akan gagal menerapkan patch.
3. Perbaiki berkas`*patch` di folder` patches /` dan `patches-mas/`.
4. (Optional) `script/update` applies patches, but if multiple tries are needed you can manually run the same script that `update` calls: `$ ./script/apply-patches`
  - There is a second script, `script/patch.py` that may be useful. Read `./script/patch.py -h` for more information.
5. Jalankan build ketika semua patch bisa diaplikasikan tanpa kesalahan
  - `$ ./script/membangun`
  - If some patches are no longer compatible with the Chromium code, fix compilation errors.
6. When the build succeeds, create a `dist` for Electron
  - `$ ./script/create-dist --no_zip`
    - It will create a `dist/main` folder in the libcc repo's root. You will need this to build Electron.
7. (Optional) Update script contents if there are errors resulting from files that were removed or renamed. (`--no_zip` prevents script from create `dist` archives. Anda tidak membutuhkannya.)


## Perbarui kode Elektron

1. Dapatkan kodenya:
  ```sh
  $ git clone git@github.com:electron/electron.git
  $ cd electron
  ```
2. If you have libcc built on your machine in its own repo, tell Electron to use it:
  ```sh
  $ ./script/bootstrap.py -v \
    --libcc_source_path <libcc_folder>/src \
    --libcc_shared_library_path <libcc_folder>/shared_library \
    --libcc_static_library_path <libcc_folder>/static_library
  ```
3. If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  - Pastikan submodule libcc (`vendor/libchromiumcontent`) menunjuk ke revisi benar

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  - Terletak di `elektron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Periksa Chromium jika Anda belum melakukannya:
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py
    - (Ganti placeholder `{VERSION}` di url di atas ke Chromium versi menggunakan libcc.)
6. Bangun Elektron.
  - Cobalah untuk membangun versi Debug terlebih dahulu:`$ ./script/build.py -c D`
  - Anda akan membutuhkannya untuk menjalankan tes
7. Perbaiki kesalahan kompilasi dan keterkaitan
8. Pastikan bahwa Rilis bangunan bisa dibangun juga
  - `$ ./script/build.py -c R`
  - Seringkali bangunan Rilis akan memiliki kesalahan penautan yang berbeda yang Anda inginkan perlu diperbaiki.
  - Beberapa kesalahan kompilasi dan penghubungan disebabkan oleh sumber/objek yang hilang berkas di libcc `dist`
9. Memperbarui `./ script/ membuat-dist` di repo libcc, buat ulang`dist`, dan  Jalankan skrip bootstrap Elektron sekali lagi.

### Tip untuk memperbaiki kesalahan kompilasi
- Perbaiki bangunan kesalahan konfigurasi terlebih dahulu
- Perbaiki kesalahan fatal dulu, seperti berkas yang hilang dan kesalahan yang berhubungan dengan penyusun bendera atau mendefinisikan
- Cobalah untuk mengidentifikasi kesalahan kompleks sesegera mungkin.
  - Mintalah bantuan jika Anda tidak yakin bagaimana memperbaikinya
- Nonaktifkan semua fitur Elektron, perbaiki build, lalu aktifkan satu per satu
- Tambahkan lebih banyak flag untuk menonaktifkan fitur build-time.

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

Ikuti semua langkah di atas untuk memperbaiki kode Elektron pada semua platform yang didukung.


## Memperbarui Crashpad

Jika ada kesalahan kompilasi yang terkait dengan Crashpad, mungkin ini berarti Anda perlu memperbarui garpu ke revisi yang lebih baru. See [Upgrading Crashpad](upgrading-crashpad.md) for instructions on how to do that.


## Memperbarui NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

Lihat [Upgrade Node](upgrading-node.md) untuk petunjuk tentang ini.

## Verifikasi dukungan ffmpeg

Elektron kapal dengan versi `ffmpeg` yang mencakup codec proprietary oleh default. Versi tanpa codec ini dibuat dan didistribusikan bersama masing-masing dilepaskan juga. Setiap peningkatan Chrome harus memverifikasi bahwa mengganti versi ini masih didukung.

Anda dapat memverifikasi dukungan Elektron untuk beberapa `ffmpeg` yang dibuat dengan memuat halaman berikut. Ini harus bekerja dengan perpustakaan default `ffmpeg` yang didistribusikan dengan Elektron dan tidak bekerja dengan perpustakaan `ffmpeg` yang dibuat tanpa hak kepemilikan codec.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({ target }) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## Tautan yang berguna

- [Jadwal Peluncuran Chrome](https://www.chromium.org/developers/calendar)
- [Proxy Omaha](http://omahaproxy.appspot.com)
- [Pelacak Masalah Chromium](https://bugs.chromium.org/p/chromium)
