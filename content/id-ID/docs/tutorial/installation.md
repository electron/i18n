# Instalasi

> Tip untuk memasang Elektron

Untuk memasang binari elektron prebuilt , gunakan ` npm </ 0> . Metode yang disukai adalah menginstal Elektron sebagai ketergantungan pengembangan di aplikasi Anda:</p>

<pre><code class="sh">npm menginstal elektron - menyimpan-dev
`</pre> 

Lihat [ Dokumentasi versi elektron ](electron-versioning.md) untuk info tentang cara mengelola versi Elektron di aplikasi Anda.

## Instalasi global

Anda juga dapat menginstal perintah ` elektron ` secara global di `$PATH` Anda:

```sh
npm memasang elektron -g
```

## Kustomisasi

Jika Anda ingin mengubah arsitektur yang diunduh (misalnya ` ia32 ` pada mesin ` x64 `), Anda dapat menggunakan flag ` --arch ` dengan npm pasang atau setel variabel lingkungan ` npm _config_arch `:

```shell
npm install --arch=ia32 electron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

Jika Anda perlu menggunakan proxy HTTP, Anda dapat [ menetapkan variabel lingkungan ini ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Penyelesaian masalah

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Jika kesalahan di atas terus berlanjut, flag [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) mungkin perlu disetel ke true:

```sh
sudo npm install electron --unsafe-perm=true
```

Pada jaringan yang lebih lambat, disarankan untuk menggunakan flag `--verbose` untuk menunjukkan kemajuan download:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.