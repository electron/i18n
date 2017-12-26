# Mengupgrade Chromium

Ini adalah ikhtisar langkah-langkah yang diperlukan untuk meningkatkan Chromium di Elektron.

- Tingkatkan versi beta ke versi Chromium baru
- Buat kode Elektron yang kompatibel dengan libcc baru
- Update Elektron dependensi (crashpad, NodeJS, dll) jika diperlukan
- Buatlah build internal dari libcc dan elektron
- Update Electron docs jika perlu

## Tingkatkan versi `libcc` ke versi Chromium baru

1. Dapatkan kode dan inisialisasi proyek: 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. Perbarui snapshot Chromium 
  - Pilih nomor versi dari [Proxy Omaha](https://omahaproxy.appspot.com/) dan perbarui `VERSI` berkas dengan itu 
    - Ini bisa dilakukan secara manual dengan mengunjungi OmahaProxy di browser, atau secara otomatis:
    - Satu-baris untuk versi mac terbaru yang stabil: `curl -so- https://omahaproxy.appspot.com/mac > VERSI`
    - Satu-baris untuk versi beta win64 terbaru: `curl -so- https://omahaproxy.appspot.com/all | grep "win64, beta" | awk -F, 'NR == 1{print $3}' > VERSI`
  - jalankan `$ ./script/perbarui` 
    - Siapkan teh - ini bisa berlangsung 30m atau lebih.
    - Mungkin akan gagal menerapkan patch.
3. Perbaiki berkas`*patch` di folder` patches /` dan `patches-mas/`.
4. (Opsional) `script/perbarui` berlaku tambalan, namun jika beberapa kali mencoba diperlukan Anda bisa menjalankan skrip yang sama secara manual `memperbarui` panggilan: `$ ./script/menerapkan-tambalan` 
  - Ada skrip kedua, `script/patch.py` yang mungkin berguna. Baca `./script/patch.py ​​-h` untuk informasi lebih lanjut.
5. Jalankan build ketika semua patch bisa diaplikasikan tanpa kesalahan 
  - `$ ./script/membangun`
  - Jika beberapa tambalan tidak lagi kompatibel dengan kode Chromium, perbaiki kesalahan kompilasi.
6. Saat build berhasil, buat a `dist` untuk Elektron 
  - `$ ./script/membuat-dist --tidak ada-zip` 
    - Ini akan membuat folder `dist/main` di akar repo libcc. Anda akan membutuhkan ini untuk membangun Elektron.
7. (Opsional) Memperbarui konten script jika terjadi kesalahan akibat berkas  yang telah dihapus atau diganti namanya. (`--no_zip` mencegah skrip membuat `dist`  arsip. Anda tidak membutuhkannya.)

## Perbarui kode Elektron

1. Dapatkan kodenya: 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. Jika Anda memiliki libcc yang ada di komputer Anda dengan repo sendiri,  beritahu Elektron untuk menggunakannya: 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. Jika Anda belum membangun libcc tapi sudah seharusnya diupgrade  ke Chromium baru, bootstrap Elektron seperti biasa  `$ ./script/bootstrap.py -v`
  
  - Ensure that libcc submodule (`vendor/libchromiumcontent`) points to the right revision

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  
  - Located in `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Checkout Chromium if you haven't already:
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (Replace the `{VERSION}` placeholder in the url above to the Chromium version libcc uses.)
6. Build Electron. 
  - Try to build Debug version first: `$ ./script/build.py -c D`
  - You will need it to run tests
7. Fix compilation and linking errors
8. Ensure that Release build can be built too 
  - `$ ./script/build.py -c R`
  - Often the Release build will have different linking errors that you'll need to fix.
  - Some compilation and linking errors are caused by missing source/object files in the libcc `dist`
9. Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### Tips for fixing compilation errors

- Fix build config errors first
- Fix fatal errors first, like missing files and errors related to compiler flags or defines
- Cobalah untuk mengidentifikasi kesalahan kompleks sesegera mungkin. 
  - Mintalah bantuan jika Anda tidak yakin bagaimana memperbaikinya
- Nonaktifkan semua fitur Elektron, perbaiki build, lalu aktifkan satu per satu
- Tambahkan lebih banyak flag untuk menonaktifkan fitur build-time.

When a Debug build of Electron succeeds, run the tests: `$ ./script/test.py` Fix the failing tests.

Ikuti semua langkah di atas untuk memperbaiki kode Elektron pada semua platform yang didukung.

## Updating Crashpad

Jika ada kesalahan kompilasi yang terkait dengan Crashpad, mungkin ini berarti Anda perlu memperbarui garpu ke revisi yang lebih baru. See [Upgrading Crashpad](https://github.com/electron/electron/tree/master/docs/development/upgrading-crashpad.md) for instructions on how to do that.

## Updating NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](https://github.com/electron/electron/tree/master/docs/development/upgrading-node.md) for instructions on this.

## Verify ffmpeg support

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

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
      video.addEventListener('error', ({target}) => {
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

## Useful links

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)
- [Proxy Omaha](http://omahaproxy.appspot.com)
- [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)