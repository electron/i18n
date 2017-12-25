# Melepaskan

Dokumen ini menjelaskan proses pelepasan versi baru Electron.

## Tentukan cabang mana yang akan dilepaskan

- **Jika merilis beta, ** jalankan skrip di bawah ini dari `master`.
- **Jika merilis versi stabil, ** jalankan skrip di bawah ini dari `1-7-x` atau `1-6-x`, tergantung pada versi yang Anda nyalakan untuk.

## Cari tahu perubahan versi apa yang dibutuhkan

Jalankan `npm run prepare-release -- --notesOnly` untuk melihat rilis yang dihasilkan secara otomatis. catatan. Catatan yang dihasilkan akan membantu Anda menentukan apakah ini adalah masalah besar, kecil, patch, atau versi beta berubah. Membaca [Aturan Perubahan Versi](../tutorial/electron-versioning.md#semver) untuk informasi lebih lanjut.

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
npm menjalankan mempersiapkan-release -- -- stabil
```

## Tunggu untuk membangun :hourglass_flowing_sand:

Itu `persiapan-release` akan memicu pembuatan melalui panggilan API. Untuk memantau kemajuan pembuatan, lihat halaman berikut:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) untuk Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) untuk OS X
- [circleci.com/gh/electron](https://circleci.com/gh/electron) untuk Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) untuk Windows

## Kompilasi catatan rilis

Menulis catatan rilis adalah cara yang baik untuk membuat diri Anda sibuk sementara membangun berjalan. Untuk prior art, lihat rilis yang ada di [halaman rilis](https://github.com/electron/electron/releases).

Tips: - Setiap item yang terdaftar harus merujuk PR pada elektron / elektron, bukan masalah, atau PR dari repo lain seperti libcc. - Tidak perlu menggunakan markup tautan saat mereferensikan PRs. String seperti `#123` akan otomatis dikonversi menjadi tautan di github.com. - Untuk melihat versi Chromium, V8, dan Node di setiap versi Elektron, kunjungi [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

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
**Catatan:** Ini adalah rilis beta dan kemungkinan besar akan memiliki beberapa ketidakstabilan dan / atau regresi.

Silakan mengajukan masalah baru untuk bug yang Anda temukan di dalamnya.

Rilis ini dipublikasikan ke [npm] (https://www.npmjs.com/package/electron) di bawah tag `beta` dan dapat diinstal melalui` npm install electron @ beta`.
```

## Mengedit rancangan konsep

1. Kunjungi [halaman rilis ](https://github.com/electron/electron/releases) dan Anda akan melihat draf rilis baru dengan dengan catatan rilis placeholder.
2. Edit rilis dan tambahkan catatan rilis.
3. Hapus tanda centang pada `prerelease` kotak centang jika Anda menerbitkan rilis stabil; biarkan diperiksa untuk rilis beta.
4. Klik 'Simpan draf'. **Jangan klik 'Publikasikan rilis'!**
5. Tunggu sampai semua bangunan berlalu sebelum melanjutkan.
6. Anda dapat menjalankan `npm run release --validateRelease` untuk memverifikasi semua file yang dibutuhkan telah dibuat untuk rilis.

## Gabungkan cabang sementara

Setelah rilis selesai, gabungkan cabang `release` kembali cabang pelepasan sumber menggunakan skrip `merge-release`. Jika cabang tidak berhasil digabung kembali script ini akan otomatis rebase cabang `release` dan dorong perubahan yang akan memicu pelepasan membangun lagi, yang berarti Anda harus menunggu rilis dibangun untuk dijalankan lagi sebelum melanjutkan.

### Bergabung kembali ke master

```sh
npm menjalankan mempersiapkan-release -- master
```

### Bergabung kembali ke cabang pelepasan lama

```sh
npm run merge-release -- 1-7-x
```

## Publikasikan rilisnya

Setelah penggabungan selesai dengan sukses, jalankan skrip `release` via `npm run release` untuk menyelesaikan proses pelepasan. Script ini akan melakukan berikut: 1. Bangun proyek untuk memvalidasi bahwa nomor versi yang benar sedang dilepaskan. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Perbaiki binari yang hilang dari pelepasan secara manual

Dalam kasus pelepasan yang rusak dengan mesin CI rusak, mungkin kita harus melakukannya upload ulang binari untuk rilis yang sudah diterbitkan.

Langkah pertama adalah pergi ke [Rilis](https://github.com/electron/electron/releases) halaman dan hapus binari yang rusak dengan berkas checksum `SHASUMS256.txt`.

Kemudian buat distribusi secara manual untuk setiap platform dan unggah:

```sh
# Checkout versi untuk diunggah ulang.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite
```

Setelah mengunggah ulang semua distro, publikasikan lagi untuk mengupload berkas checksum:

```sh
npm menjalankan rilis
```