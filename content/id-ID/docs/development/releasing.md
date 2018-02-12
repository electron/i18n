# Melepaskan

Dokumen ini menjelaskan proses pelepasan versi baru Electron.

## Tentukan cabang mana yang akan dilepaskan

- **Jika merilis beta,** jalankan skrip di bawah ini dari `master`.
- **Jika merilis versi stabil,** jalankan skrip di bawah ini dari `1-7-x` atau `1-6-x`, tergantung versi yang anda nyatakan untuk.

## Cari tahu perubahan versi apa yang dibutuhkan

Jalankan `npm run prepare-release -- --notesOnly` untuk melihat rilis yang dihasilkan secara otomatis catatan. Catatan yang dihasilkan akan membantu Anda menentukan apakah ini adalah masalah besar, kecil, patch, atau versi beta berubah. Membaca [Aturan Perubahan Versi](../tutorial/electron-versioning.md#semver) untuk informasi lebih lanjut.

## Jalankan skrip persiapan-rilis

Script persiapan rilis akan melakukan hal berikut: 1. Periksa apakah sebuah pelepasan sudah dalam proses dan jika demikian akan berhenti. 2. Buat cabang rilis. 3. Bump nomor versi di beberapa file. Lihat [benjolan ini komit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) untuk sebuah contoh. 4. Buat draf rilis di GitHub dengan catatan rilis yang dihasilkan secara otomatis. 5. Dorong cabang pelepasan. 6. Panggil APIs untuk menjalankan rilis.

Setelah Anda menentukan jenis perubahan versi yang diperlukan, jalankan `siapkan rilis` dengan argumen sesuai kebutuhan Anda: - `[major |minor|patch|beta]` untuk menambah salah satu nomor versi, atau - `--stabil` untuk menunjukkan bahwa ini adalah versi stabil

Sebagai contoh:

### Perubahan versi mayor

```sh
npm menjalankan mempersiapkan-release -- utama
```

### Perubahan versi minor

```sh
npm menjalankan mempersiapkan-release -- kecil
```

### Perubahan versi patch

```sh
npm menjalankan mempersiapkan-release -- patch
```

### Perubahan versi beta

```sh
npm menjalankan mempersiapkan-release -- beta
```

### Promosikan beta untuk stabil

```sh
npm menjalankan mempersiapkan-release -- --stabil
```

## Tunggu untuk membangun :hourglass_flowing_sand:

Itu `persiapan-release` akan memicu pembuatan melalui panggilan API. Untuk memantau kemajuan pembuatan, lihat halaman berikut:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) untuk Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) untuk OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) untuk Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) untuk Windows

## Kompilasi catatan rilis

Menulis catatan rilis adalah cara yang baik untuk membuat diri Anda sibuk sementara membangun berjalan. Untuk prior art, lihat rilis yang ada di [halaman rilis](https://github.com/electron/electron/releases).

Tips: Setiap item yang terdaftar harus mereferensikan PR pada electron/electron, bukan masalah, juga PR dari repo lain seperti libcc. - Tidak perlu menggunakan markup tautan saat mereferensikan PRs. String seperti `#123` akan otomatis dikonversi menjadi tautan di github.com. - Untuk melihat versi Chromium, V8, dan Node di setiap versi Electron, kunjungi [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Rilis patch

Untuk rilis `patch`, gunakan format berikut:

```sh
## Bug Fixes

* Fixed a cross-platform thing. #123

### Linux

* Fixed a Linux thing. #123

### macOS

* Fixed a macOS thing. #123

### Windows

* Fixed a Windows thing. #1234
```

### Rilis kecil

Untuk sebuah `minor` rilis, misalnya. `1.8.0`, gunakan format ini:

```sh
## Upgrade

- Upgrade dari Node `oldVersion` ke` newVersion`. #123

## API Changes

* Sesuatu yang berubah. #123

### Linux

* Mengubah Linux. #123

### macOS

* Mengubah hal macOS. #123

### Windows

* Mengubah hal Windows. #123
```

### Rilis utama

```sh
## Upgrades

- Diupgrade dari Chromium `oldVersion` ke` newVersion`. #123
- Diupgrade dari Node `oldVersion` ke` newVersion`. #123

## Breaking API berubah

* Berubah sesuatu. #123

### Linux

* Mengubah Linux. #123

### macOS

* Mengubah hal macOS. #123

### Windows

* Mengubah hal Windows. #123

## Perubahan lainnya

- Beberapa perubahan lainnya. #123
```

### Rilis beta

Gunakan format yang sama dengan yang disarankan di atas, tapi tambahkan catatan berikut di awal changelog:

```sh
**Catatan:** Ini adalah rilis beta dan kemungkinan besar akan memiliki beberapa ketidakstabilan dan/atau regresi.

Silakan mengajukan masalah baru untuk bug yang Anda temukan di dalamnya.

Rilis ini dipublikasikan ke [npm](https://www.npmjs.com/package/electron) di bawah tag `beta` dan dapat diinstal melalui
`npm install electron@beta`.
```

## Mengedit rancangan konsep

1. Kunjungi [halaman rilis](https://github.com/electron/electron/releases) dan anda akan melihat draf rilis baru dengan dengan catatan rilis placeholder.
2. Edit rilis dan tambahkan catatan rilis.
3. Hapus tanda centang pada `prerelease` kotak centang jika anda menerbitkan rilis stabil; biarkan diperiksa untuk rilis beta.
4. Klik 'Simpan draf'. **Jangan klik 'Publikasikan rilis'!**
5. Tunggu sampai semua bangunan berlalu sebelum melanjutkan.
6. You can run `npm run release -- --validateRelease` to verify that all of the required files have been created for the release.

## Publikasikan rilisnya

Once the release builds have finished, run the `release` script via `npm run release` to finish the release process. Script ini akan melakukan berikut: 1. Bangun proyek untuk memvalidasi bahwa nomor versi yang benar sedang dilepaskan. 2. Download binari dan buat header simpul dan linker .lib yang digunakan pada Windows oleh node-gyp untuk membangun modul asli. 3. Buat dan upload file SHASUMS yang tersimpan di S3 untuk file simpul. 4. Buat dan upload file SHASUMS256.txt yang tersimpan di rilis GitHub. 5. Validasi semua file yang dibutuhkan ada di GitHub dan S3 dan miliki checksum yang benar seperti yang ditentukan dalam file SHASUMS. 6. Publikasikan rilis di GitHub 7. Menghapus `rilis` cabang.

## Publikasikan ke npm

Setelah mempublikasikan berhasil, jalankan `npm run publish-to-npm` untuk menerbitkan lepaskan ke npm.

## Perbaiki binari yang hilang dari pelepasan secara manual

Dalam kasus pelepasan yang rusak dengan mesin CI rusak, mungkin kita harus melakukannya upload ulang binari untuk rilis yang sudah diterbitkan.

Langkah pertama adalah pergi ke [Releases](https://github.com/electron/electron/releases) halaman dan hapus binari yang rusak dengan `SHASUMS256.txt` file checksum.

Kemudian buat distribusi secara manual untuk setiap platform dan unggah:

```sh
# Checkout versi untuk diunggah ulang.
git checkout vTHE.RELEASE.VERSION
# Apakah rilis membangun, menentukan satu target arsitektur.
./script/bootstrap.py --target_arch [arm | x64 | ia32]
./script/build.py -c R
./script/create-dist.py

# Secara eksplisit mengizinkan untuk menimpa rilis yang dipublikasikan.
./script/upload.py --overwrite
```

Setelah mengunggah ulang semua distro, publikasikan lagi untuk mengupload berkas checksum:

```sh
npm menjalankan rilis
```