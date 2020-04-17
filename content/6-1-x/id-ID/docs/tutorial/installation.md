# Instalasi

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

Lihat [Electron versioning documentation ](./electron-versioning.md) untuk informasi mengenai bagaimana mengatur versi Electron aplikasi anda.

## Instalasi global

Anda juga dapat menginstal perintah ` electron` secara global di `$PATH` Anda:

```sh
npm install electron -g
```

## Kustomisasi

Jika Anda ingin mengubah arsitektur yang diunduh (misalnya ` ia32 ` pada mesin ` x64 `), Anda dapat menggunakan flag ` --arch ` dengan npm pasang atau setel variabel lingkungan ` npm _config_arch `:

```shell
npm install --arch=ia32 electron
```

Selain mengubah arsitektur, Anda juga bisa menentukan platformnya (misalnya, `win32`, `linux`, dll.) dengan menggunakan `--platform ` flag:

```shell
npm install --platform=win32 electron
```

## Proxy

Jika Anda perlu menggunakan proxy HTTP, Anda dapat [ menetapkan variabel lingkungan ini ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches
Selama instalasi, modul `electron ` akan melakukan [`electron-download `](https://github.com/electron-userland/electron-download) untuk mendownload prebuilt Electron binari platform anda. Ini juga dapat dilakukan dengan menghubungi GitHub's halaman download yang dirilis (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

Jika Anda tidak dapat mengakses GitHub atau Anda memerlukan penyediaan kustom build, Anda dapat melakukannya dengan menyediakan mirror atau direktori cache yang ada.

#### Mirror
Anda dapat menggunakan variabel lingkungan untuk mengganti URL dasar, jalan di mana untuk memeriksa biner elektron, dan nama berkas biner. Url yang digunakan oleh ` electron-download ` disusun sebagai berikut:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_NAMABERKAS
```

Misalnya, untuk menggunakan mirror China:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache
Sebagai alternatif, Anda dapat mengganti cache lokal. `elektron-download` akan cache download binari di direktori lokal agar tidak memberatkan jaringan Anda. Anda dapat memakai folder cache itu untuk menyediakan custom build Electron atau untuk menghindari sentuhan sama sekali dengan jaringan.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Pada lingkungan yang telah menggunakan Elektron versi lama, Anda mungkin juga menemukan cache di ` ~ /.electron `.

Anda juga dapat mengganti lokasi cache lokal dengan menyediakan ` ELECTRON_CACHE ` di environment variabel.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── elektron-v1.7.9-darwin-x64.zip
├── elektron-v1.8.1-darwin-x64.zip
├── elektron-v1.8.2-beta.1-darwin-x64.zip
├── elektron-v1.8.2-beta.2-darwin-x64.zip
├── elektron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Mengabaikan download binari
Saat menginstall paket NPM `electron`, binari electron otomatis di download.

Terkadang binari electron tidak digunakan, misal di lingkungan CI, saat melakukan pengetesan komponen lain.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Penyelesaian masalah

Saat menjalankan `npm install electron`, beberapa pengguna sesekali menemuinya kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah dengan paket npm `electron`. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari masalah jaringan. Solusi terbaik adalah untuk mencoba beralih jaringan, atau menunggu sebentar dan mencoba memasang lagi.

Anda juga dapat mencoba mendownload Electron langsung dari [electron/electron/release](https://github.com/electron/electron/releases) Jika memasang melalui `npm`gagal.

Jika penginstalan gagal dengan kesalahan ` EACCESS ` Anda mungkin perlu [memperbaiki izin npm anda](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Jika error diatas masih ada, [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag mungkin harus di set true:

```sh
sudo npm menginstal elektron--tidak aman-perm = true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
memasang npm --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.
