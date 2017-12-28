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
memasang npm --lengkungan = dia32 elektron
```

Selain mengubah arsitektur, Anda juga dapat menentukan platform (misalnya, ` win32 </ 0>, <code> linux </ 0>, dll.) Dengan menggunakan flag<code> --platform</ 0>:</p>

<pre><code class="shell">memasang npm --peron = win32 elektron
`</pre> 

## Proxy

Jika Anda perlu menggunakan proxy HTTP, Anda dapat [ menetapkan variabel lingkungan ini ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Penyelesaian masalah

Saat menjalankan ` npm menginstal elektron ` , beberapa pengguna terkadang mengalami kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan bukan masalah aktual dengan paket ` elektron </ 0>  npm . Kesalahan seperti <code> ELIFECYCLE </ 0> , <code> EAI_AGAIN </ 0> , <code> ECONNRESET </ 0> , dan <code> ETIMEDOUT </ 0> adalah semua indikasi 
masalah jaringan tersebut. 
  Resolusi terbaik adalah mencoba jaringan switching, atau  
tunggu sebentar dan coba instal lagi.</p>

<p>Anda juga dapat mencoba mendownload Elektron langsung dari <a href="https://github.com/electron/electron/releases"> elektron / elektron / pelepasan </ 0> 
jika memasang melalui <code> npm </ 1> gagal. 
 </p>

<p>Jika penginstalan gagal dengan kesalahan <code> EACCESS </ 0> Anda mungkin perlu <a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions"> memperbaiki izin npm </ 1> . 
</p>

<p>Jika kesalahan di atas terus berlanjut, flag <a href="https://docs.npmjs.com/misc/config#unsafe-perm">unsafe-perm</a> mungkin perlu disetel ke true:</p>

<pre><code class="sh">sudo npm install electron --unsafe-perm=true
`</pre> 

Pada jaringan yang lebih lambat, disarankan untuk menggunakan flag `--verbose` untuk menunjukkan kemajuan download:

```sh
memasang npm --verbose electron
```

Jika Anda perlu memaksa download ulang aset tersebut dan file SHASUM menyetel variabel lingkungan  force_no_cache </ 0> ke <code> true </ 0> .</p>