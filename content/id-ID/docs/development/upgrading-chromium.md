# Mengupgrade Chromium

Ini adalah ikhtisar langkah-langkah yang diperlukan untuk meningkatkan Chromium di Elektron.

- Tingkatkan versi libcc ke versi Chromium baru
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
  - jalankan `$ ./script/update` 
    - Siapkan teh - ini bisa berlangsung 30m atau lebih.
    - Mungkin akan gagal menerapkan patch.
3. Perbaiki berkas`*patch` di folder` patches /` dan `patches-mas/`.
4. (Opsional) `script/update` berlaku tambalan, namun jika beberapa kali mencoba diperlukan Anda bisa menjalankan skrip yang sama secara manual `memperbarui` panggilan: `$ ./script/menerapkan-tambalan` 
  - Ada skrip kedua, `script/patch.py` yang mungkin berguna. Baca `./script/patch.py ​​-h` untuk informasi lebih lanjut.
5. Jalankan build ketika semua patch bisa diaplikasikan tanpa kesalahan 
  - `$ ./script/membangun`
  - Jika beberapa tambalan tidak lagi kompatibel dengan kode Chromium, perbaiki kesalahan kompilasi.
6. Saat build berhasil, buat a `dist` untuk Elektron 
  - `$ ./script/create-dist --no_zip` 
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
  
  - Pastikan submodule libcc (`vendor/libchromiumcontent`) menunjuk ke revisi benar

4. Set `CLANG_REVISION` di `script/update-clang.sh` untuk mencocokkan versi  Kromium sedang digunakan.
  
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

Jika ada kesalahan kompilasi yang terkait dengan Crashpad, mungkin ini berarti Anda perlu memperbarui garpu ke revisi yang lebih baru. Lihat [Upgrade Crashpad](upgrading-crashpad.md) untuk petunjuk bagaimana melakukan itu.

## Memperbarui NodeJS

Meningkatkan `vendor/node` ke rilis Node yang sesuai dengan versi v8 digunakan dalam rilis kromium baru. Lihat versi v8 di Node aktif

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