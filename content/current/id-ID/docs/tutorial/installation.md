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

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Custom Mirrors and Caches
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Ini juga dapat dilakukan dengan menghubungi GitHub's halaman download yang dirilis (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

Jika Anda tidak dapat mengakses GitHub atau Anda memerlukan penyediaan kustom build, Anda dapat melakukannya dengan menyediakan mirror atau direktori cache yang ada.

#### Mirror
Anda dapat menggunakan variabel lingkungan untuk mengganti URL dasar, jalan di mana untuk memeriksa biner elektron, dan nama berkas biner. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_NAMABERKAS
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache
Sebagai alternatif, Anda dapat mengganti cache lokal. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. Anda dapat memakai folder cache itu untuk menyediakan custom build Electron atau untuk menghindari sentuhan sama sekali dengan jaringan.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Pada lingkungan yang telah menggunakan Elektron versi lama, Anda mungkin juga menemukan cache di ` ~ /.electron `.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Mengabaikan download binari
Saat menginstall paket NPM `electron`, binari electron otomatis di download.

Terkadang binari electron tidak digunakan, misal di lingkungan CI, saat melakukan pengetesan komponen lain.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Penyelesaian masalah

Saat menjalankan `npm install electron`, beberapa pengguna sesekali menemui kesalahan pada instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah dengan paket npm `electron`. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari masalah jaringan. Solusi terbaik adalah untuk mencoba mengganti jaringan, atau menunggu sebentar dan mencoba menginstall lagi.

Anda juga dapat mencoba mendownload Electron langsung dari [electron/electron/release](https://github.com/electron/electron/releases) Jika gagal menginstall melalui `npm`.

Jika penginstalan gagal dengan kesalahan ` EACCESS </ 0> Anda mungkin memerlukan <a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions"> perbaiki izin npm anda </ 1>.</p>

<p spaces-before="0">Jika error diatas masih ada, <a href="https://docs.npmjs.com/misc/config#unsafe-perm">unsafe-perm</a> flag mungkin harus di set true:</p>

<pre><code class="sh">sudo npm menginstal elektron--tidak aman-perm = true
`</pre>

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
memasang npm --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.
