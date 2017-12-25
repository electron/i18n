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
npm run prepare-release -- beta
```

### Promote beta to stable

```sh
npm run prepare-release -- --stable
```

## Wait for builds :hourglass_flowing_sand:

The `prepare-release` script will trigger the builds via API calls. To monitor the build progress, see the following pages:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) for Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) for OS X
- [circleci.com/gh/electron](https://circleci.com/gh/electron) for Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows

## Compile release notes

Writing release notes is a good way to keep yourself busy while the builds are running. For prior art, see existing releases on [the releases page](https://github.com/electron/electron/releases).

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch releases

For a `patch` release, use the following format:

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

### Minor releases

For a `minor` release, e.g. `1.8.0`, use this format:

```sh
## Upgrades

- Upgraded from Node `oldVersion` to `newVersion`. #123

## API Changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123
```

### Major releases

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. #123
- Upgraded from Node `oldVersion` to `newVersion`. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123

## Other Changes

- Some other change. #123
```

### Beta releases

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some instability and/or regressions.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron) under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Edit the release draft

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Wait for all builds to pass before proceeding.
6. You can run `npm run release --validateRelease` to verify that all of the required files have been created for the release.

## Merge temporary branch

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## Publish the release

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Fix missing binaries of a release manually

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite
```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```