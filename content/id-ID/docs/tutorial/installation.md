# Instalasi

> Tip untuk memasang Elektron

Untuk memasang binari elektron prebuilt , gunakan ` npm </ 0> . Metode yang disukai adalah menginstal Elektron sebagai ketergantungan pengembangan di aplikasi Anda:</p>

<pre><code class="sh">npm menginstal elektron - menyimpan-dev
`</pre> 

Lihat  Dokumentasi versi elektron </ 0> untuk info tentang cara mengelola versi Elektron di aplikasi Anda. </p> 

## Instalasi global

Anda juga dapat menginstal perintah ` elektron </ 0> secara global di <code> $ PATH </ 0> Anda :</p>

<pre><code class="sh">npm memasang elektron -g
`</pre> 

## Kustomisasi

Jika Anda ingin mengubah arsitektur yang diunduh (misalnya ` ia32 </ 0> pada mesin
 <code> x64 </ 0> ), Anda dapat menggunakan flag < 0> --arch </ 0> dengan npm pasang atau setel
 variabel lingkungan <code> npm _config_arch </ 0> :</p>

<pre><code class="shell">npm install --arch=ia32 electron
`</pre> 

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

Jika Anda perlu menggunakan proxy HTTP, Anda dapat  menetapkan variabel lingkungan ini </ 0> .</p> 

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