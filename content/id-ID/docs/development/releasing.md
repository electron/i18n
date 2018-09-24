# Melepaskan

Dokumen ini menjelaskan proses pelepasan versi baru Electron.

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

- `ELECTRON_GITHUB_TOKEN`: Create this by visiting https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you.
- `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api
- `VSTS_TOKEN`: Create a Personal Access Token at https://github.visualstudio.com/_usersSettings/tokens or https://github.visualstudio.com/_details/security/tokens with the scope of `Build (read and execute)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## Tentukan cabang mana yang akan dilepaskan

- **Jika merilis beta,** jalankan skrip di bawah ini dari `master`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Cari tahu perubahan versi apa yang dibutuhkan

Jalankan `npm run prepare-release -- --notesOnly` untuk melihat rilis yang dihasilkan secara otomatis catatan. Catatan yang dihasilkan akan membantu Anda menentukan apakah ini adalah masalah besar, kecil, patch, atau versi beta berubah. Membaca [Aturan Perubahan Versi](../tutorial/electron-versioning.md#semver) untuk informasi lebih lanjut.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

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
npm run prepare-release -- patch --stable
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

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

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
3. Klik 'Simpan draf'. **Jangan klik 'Publikasikan rilis'!**
4. Tunggu sampai semua bangunan berlalu sebelum melanjutkan.
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## Publikasikan rilisnya

Setelah penggabungan selesai dengan sukses, jalankan `release` naskah melalui `npm run release` untuk menyelesaikan proses pelepasan. Script ini akan melakukan berikut: 1. Bangun proyek untuk memvalidasi bahwa nomor versi yang benar sedang dilepaskan. 2. Download binari dan buat header simpul dan linker .lib yang digunakan pada Windows oleh node-gyp untuk membangun modul asli. 3. Buat dan upload file SHASUMS yang tersimpan di S3 untuk file simpul. 4. Buat dan upload file SHASUMS256.txt yang tersimpan di rilis GitHub. 5. Validasi semua file yang dibutuhkan ada di GitHub dan S3 dan miliki checksum yang benar seperti yang ditentukan dalam file SHASUMS. 6. Publikasikan rilis di GitHub

## Publikasikan ke npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

```sh
$ npm login
Username: electron-nightly
Password: <This can be found under NPM Electron Nightly on LastPass>
Email: (this IS public) electron@github.com
```

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

```sh
$ npm whoami
electron-nightly
$ npm run publish-to-npm
```

After publishing, you can check the `latest` release:

```sh
$ npm dist-tag ls electron
```

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

```sh
$ npm dist-tag add electron@<version> <tag>
```

e.g.:

```sh
$ npm dist-tag add electron@2.0.0 latest
```

# Penyelesaian masalah

## Rerun broken builds

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### Rerun all linux builds:

```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all macOS builds:

```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all Windows builds:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

Additionally you can pass a job name to the script to run an individual job, eg:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH
```

## Perbaiki binari yang hilang dari pelepasan secara manual

Dalam kasus pelepasan yang rusak dengan mesin CI rusak, mungkin kita harus melakukannya upload ulang binari untuk rilis yang sudah diterbitkan.

Langkah pertama adalah pergi ke [Releases](https://github.com/electron/electron/releases) halaman dan hapus binari yang rusak dengan `SHASUMS256.txt` file checksum.

Kemudian buat distribusi secara manual untuk setiap platform dan unggah:

```sh
# Checkout versi untuk diunggah ulang.
git checkout vX.Y.Z

# Create release build
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# To compile for specific arch, instead set
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# Build by running ninja with the electron target
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# Explicitly allow overwriting a published release.
./script/upload.py --overwrite
```

Allowable values for [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

Setelah mengunggah ulang semua distro, publikasikan lagi untuk mengupload berkas checksum:

```sh
npm menjalankan rilis
```