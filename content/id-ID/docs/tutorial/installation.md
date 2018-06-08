# Instalasi

Untuk memasang binari elektron prebuilt , gunakan ` npm </ 0> . Metode yang disukai adalah menginstal Elektron sebagai ketergantungan pengembangan di aplikasi Anda:</p>

<pre><code class="sh">npm menginstal elektron - menyimpan-dev
`</pre> 

See the [Electron versioning doc](./electron-versioning.md) for info on how to manage Electron versions in your apps.

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

Selain mengubah arsitektur, Anda juga bisa menentukan platformnya (misalnya, ` win32 </ 0>, <code> linux </ 0>, dll.) dengan menggunakan <code>--platform </ 0> flag:</p>

<pre><code class="shell">memasang npm --peron = win32 elektron
`</pre> 

## Proxy

Jika Anda perlu menggunakan proxy HTTP, Anda dapat [ menetapkan variabel lingkungan ini ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. Ini juga dapat dilakukan dengan menghubungi GitHub's halaman download yang dirilis (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

Jika Anda tidak dapat mengakses GitHub atau Anda memerlukan penyediaan kustom build, Anda dapat melakukannya dengan menyediakan mirror atau direktori cache yang ada.

#### Mirror

Anda dapat menggunakan variabel lingkungan untuk mengganti URL dasar, jalan di mana untuk memeriksa biner elektron, dan nama berkas biner. Url yang digunakan oleh ` elektron-download </ 0>
disusun sebagai berikut:</p>

<pre><code class="txt">url = ELEKTRON_MIRROR + ELECTRON_KUSTOM_DIR + '/' + ELEKTRON_KUSTOM_NAMABERKAS
`</pre> 

Misalnya, untuk menggunakan mirror China:

```txt
ELEKTRON_MIRROR="https://npm.taobao.org/mirrors/elektron/"
```

#### Cache

Sebagai alternatif, Anda dapat mengganti cache lokal. `elektron-download` akan cache download binari di direktori lokal agar tidak memberatkan jaringan Anda. Anda dapat memakai folder cache itu untuk menyediakan custom build Electron atau untuk menghindari sentuhan sama sekali dengan jaringan.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/elektron/`
* MacOS: `~/Library/Caches/elektron/`
* Windows: `$LOCALAPPDATA/elektron/Cache` or `~/AppData/Local/elektron/Cache/`

Pada lingkungan yang telah menggunakan Elektron versi lama, Anda mungkin juga menemukan cache di ` ~ /.elektron </ 0>.</p>

<p>Anda juga dapat mengganti lokasi cache lokal dengan menyediakan <code> ELEKTRON_CACHE </ 0>
variabel lingkungan.</p>

<p>Cache berisi file zip yang baik seperti versi checksum, yang disimpan sebagai
sebuah file teks. Sebuah tipikal Cache mungkin terlihat seperti ini:</p>

<pre><code class="sh">├── elektron-v1.7.9-darwin-x64.zip
├── elektron-v1.8.1-darwin-x64.zip
├── elektron-v1.8.2-beta.1-darwin-x64.zip
├── elektron-v1.8.2-beta.2-darwin-x64.zip
├── elektron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
`</pre> 

## Penyelesaian masalah

Saat menjalankan `npm menginstal elektron`, beberapa pengguna sesekali menemuinya kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah aktual dengan `electron` paket npm. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari hal tersebut. masalah jaringan. Resolusi terbaik adalah untuk mencoba beralih jaringan, atau menunggu sebentar dan mencoba memasang lagi.

Anda juga dapat mencoba mendownload Electron langsung dari [Electron/Electron/pelepasan](https://github.com/electron/electron/releases) Jika memasang melalui `npm`gagal.

Jika penginstalan gagal dengan kesalahan ` EACCESS </ 0> Anda mungkin memerlukan <a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions"> perbaiki izin npm anda </ 1>.</p>

<p>If the above error persists, the <a href="https://docs.npmjs.com/misc/config#unsafe-perm">unsafe-perm</a> flag may need to be
set to true:</p>

<pre><code class="sh">sudo npm menginstal elektron--tidak aman-perm = true
`</pre> 

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
memasang npm --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.