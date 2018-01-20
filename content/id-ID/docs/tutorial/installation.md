# Instalasi

> Tip untuk memasang Elektron

Untuk memasang binari elektron prebuilt , gunakan ` npm </ 0> . Metode yang disukai adalah menginstal Elektron sebagai ketergantungan pengembangan di aplikasi Anda:</p>

<pre><code class="sh">npm menginstal elektron - menyimpan-dev
`</pre> 

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## Instalasi global

Anda juga dapat menginstal perintah ` elektron ` secara global di `$PATH` Anda:

```sh
npm memasang elektron -g
```

## Kustomisasi

Jika Anda ingin mengubah arsitektur yang diunduh (misalnya ` ia32 ` pada mesin ` x64 `), Anda dapat menggunakan flag ` --arch ` dengan npm pasang atau setel variabel lingkungan ` npm _config_arch `:

```shell
memasang npm --lengkungan = dia32 elektron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
memasang npm --peron = win32 elektron
```

## Proxy

Jika Anda perlu menggunakan proxy HTTP, Anda dapat [ menetapkan variabel lingkungan ini ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### Mirror

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Penyelesaian masalah

Saat menjalankan `npm menginstal elektron`, beberapa pengguna sesekali menemuinya kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah aktual dengan `electron` paket npm. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari hal tersebut. masalah jaringan. Resolusi terbaik adalah untuk mencoba beralih jaringan, atau hanya menunggu sedikit dan mencoba menginstal lagi.

Anda juga dapat mencoba mendownload Electron langsung dari [Electron/Electron/pelepasan](https://github.com/electron/electron/releases) Jika memasang melalui `npm`gagal.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Jika kesalahan di atas terus berlanjut, flag [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) mungkin perlu disetel ke true:

```sh
sudo npm menginstal elektron--tidak aman-perm = true
```

Pada jaringan yang lebih lambat, disarankan untuk menggunakan flag `--verbose` untuk menunjukkan kemajuan download:

```sh
memasang npm --verbose electron
```

Jika Anda perlu memaksa download ulang aset tersebut dan file SHASUM menyetel variabel lingkungan  force_no_cache </ 0> ke <code> true </ 0> .</p>