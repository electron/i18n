# Melepaskan

Dokumen ini menjelaskan proses pelepasan versi baru Electron.

## Tentukan cabang mana yang akan dilepaskan

- **Jika merilis beta,** jalankan skrip di bawah ini dari `master`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Cari tahu perubahan versi apa yang dibutuhkan

Jalankan `npm run prepare-release -- --notesOnly` untuk melihat rilis yang dihasilkan secara otomatis catatan. Catatan yang dihasilkan akan membantu Anda menentukan apakah ini adalah masalah besar, kecil, patch, atau versi beta berubah. Membaca [Aturan Perubahan Versi](../tutorial/electron-versioning.md#semver) untuk informasi lebih lanjut.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts. Once you've generated these per-user tokens, you may want to keep them in a local file that you can `source` when starting a release. * `ELECTRON_GITHUB_TOKEN`: Create as described at https://github.com/settings/tokens/new, giving the token repo access scope. * `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you. * `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api

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

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## Tunggu untuk membangun :hourglass_flowing_sand:

Itu `persiapan-release` akan memicu pembuatan melalui panggilan API. Untuk memantau kemajuan pembuatan, lihat halaman berikut:

- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for OS X and Linux
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

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Silakan mengajukan masalah baru untuk bug yang Anda temukan di dalamnya.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Mengedit rancangan konsep

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit rilis dan tambahkan catatan rilis.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Klik 'Simpan draf'. **Jangan klik 'Publikasikan rilis'!**
5. Tunggu sampai semua bangunan berlalu sebelum melanjutkan.
6. In the `release` branch, verify that the release's files have been created:

```sh
$ git rev-parse --abbrev-ref HEAD
release
$ npm run release -- --validateRelease
```

## Merge temporary branch (pre-2-0-x branches only)

Setelah rilis selesai, gabungkan cabang `release` kembali cabang pelepasan sumber menggunakan `merge-release` naskah. Jika cabang tidak berhasil digabung kembali script ini akan otomatis rebase cabang `release` dan dorong perubahan yang akan memicu pelepasan membangun lagi, yang berarti Anda harus menunggu rilis dibangun untuk dijalankan lagi sebelum melanjutkan.

### Bergabung kembali ke master

```sh
npm menjalankan mempersiapkan-release -- master
```

### Bergabung kembali ke cabang pelepasan lama

```sh
npm run merge-release -- 1-7-x
```

## Publikasikan rilisnya

Setelah penggabungan selesai dengan sukses, jalankan `release` naskah melalui `npm run release` untuk menyelesaikan proses pelepasan. Script ini akan melakukan berikut: 1. Bangun proyek untuk memvalidasi bahwa nomor versi yang benar sedang dilepaskan. 2. Download binari dan buat header simpul dan linker .lib yang digunakan pada Windows oleh node-gyp untuk membangun modul asli. 3. Buat dan upload file SHASUMS yang tersimpan di S3 untuk file simpul. 4. Buat dan upload file SHASUMS256.txt yang tersimpan di rilis GitHub. 5. Validasi semua file yang dibutuhkan ada di GitHub dan S3 dan miliki checksum yang benar seperti yang ditentukan dalam file SHASUMS. 6. Publikasikan rilis di GitHub 7. Menghapus `rilis` cabang.

## Publikasikan ke npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub. "Electron - NPM" for the URL "https://www.npmjs.com/login".

```sh
$ npm login
Username: electron
Password:
Email: (this IS public) electron@github.com
```

Publish the release to npm.

```sh
$ npm whoami
electron
$ npm run publish-to-npm
```

Note: In general you should be using the latest Node during this process; however, older versions of the `publish-to-npm` script may have trouble with Node 7 or higher. If you have trouble with this in an older branch, try running with an older version of Node, e.g. a 6.x LTS.

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