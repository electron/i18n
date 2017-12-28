# Keamanan, Kemampuan asli, dan Tanggung Jawab Anda

Sebagai pengembang web, kita biasanya menikmati bersih keamanan yang kuat dari browser - risiko yang terkait dengan kode kita menulis relatif kecil. website kami diberikan kekuasaan terbatas di bak pasir, dan kami percaya bahwa pengguna kami menikmati browser dibangun oleh tim besar insinyur yang mampu cepat merespon ancaman keamanan yang baru ditemukan.

Ketika bekerja dengan Electron , penting untuk memahami bahwa elektron tidak web browser. Hal ini memungkinkan Anda untuk membangun aplikasi desktop kaya fitur dengan teknologi web akrab, tapi kode Anda memiliki kekuasaan jauh lebih besar. JavaScript dapat mengakses file , keamanan pengguna, dan banyak lagi. Hal ini memungkinkan Anda untuk membangun aplikasi asli berkualitas tinggi, tetapi risiko keamanan yang melekat skala dengan kekuatan tambahan yang diberikan kepada kode Anda.

Dengan itu dalam pikiran, menyadari bahwa menampilkan konten sewenang-wenang dari sumber terpercaya memiliki resiko keamanan parah yang Elektron tidak dimaksudkan untuk menangani. Bahkan, yang paling populer Elektron aplikasi ( Atom , Slack, Visual Studio Code, dll) display terutama lokal konten (atau terpercaya, konten jauh aman tanpa Node integrasi) - jika aplikasi Anda mengeksekusi kode dari sumber online, itu adalah tanggung jawab Anda untuk memastikan bahwa kode ini tidak berbahaya.

## Pelaporan Masalah Keamanan

Untuk informasi tentang cara untuk benar mengungkapkan sebuah Elektron kerentanan, lihat  SECURITY.md </ 0></p> 

## Chromium Masalah Keamanan dan Upgrade

Sementara Elektron berusaha untuk mendukung versi baru dari Chromium sesegera mungkin, pengembang harus menyadari bahwa upgrade adalah usaha yang serius - yang melibatkan puluhan tangan-mengedit atau bahkan ratusan file. Mengingat sumber daya dan kontribusi tersedia saat ini, elektron mungkin tidak berada di versi yang sangat terbaru dari Chromium , lebih awal satu hari atau minggu.

Kami merasa bahwa sistem kami saat memperbarui Chromium komponen menyerang keseimbangan yang tepat antara sumber daya yang kita miliki dan kebutuhan mayoritas aplikasi yang dibangun di atas kerangka. Kami pasti tertarik untuk mendengar lebih banyak tentang kasus penggunaan khusus dari orang-orang yang membangun hal-hal di atas Elektron . permintaan tarik dan kontribusi yang mendukung usaha ini selalu sangat mendukung.

## Mengabaikan atas Saran

Masalah keamanan ada setiap kali Anda menerima kode dari tujuan remote dan mengeksekusi secara lokal. Sebagai contoh, pertimbangkan sebuah situs web terpencil yang ditampilkan di dalam jendela browser. Jika penyerang entah bagaimana berhasil mengubah konten kata (baik dengan menyerang sumber langsung, atau dengan duduk di antara aplikasi dan tujuan yang sebenarnya), mereka akan dapat mengeksekusi kode asli pada mesin pengguna.

> : peringatan: Dalam situasi yang harus Anda memuat dan mengeksekusi kode jauh dengan Node integrasi diaktifkan. Sebaliknya, gunakan hanya lokal file (dikemas bersama-sama dengan aplikasi Anda) untuk mengeksekusi Node kode. Untuk menampilkan konten jauh, gunakan `tampilan web` tag dan pastikan untuk menonaktifkan `nodeIntegrasi` . 

#### daftar pembanding

Ini bukan peluru, tapi setidaknya, Anda harus mencoba yang berikut ini:

* Hanya menampilkan aman (https) konten
* Nonaktifkan Node integrasi dalam semua penyaji yang menampilkan konten jauh (pengaturan ` nodeintergrasi </ 0> ke <code> palsu </ 0> di <code> Preperensi Web </ 0> )</li>
<li>Aktifkan isolasi konteks dalam semua penyaji yang menampilkan konten jauh (pengaturan <code> isolasiconteks </ 0> ke <code> benar </ 0> di <code> preperensiweb </ 0> )</li>
<li>Gunakan <code>ses.setPermissionRequestHandler ()</ 0> di semua sesi yang memuat konten jauh</li>
<li>Jangan menonaktifkan <code>keamananweb` . Nonaktifkan akan menonaktifkan kebijakan yang sama-asal.
* Tentukan [`Content-Security-Kebijakan`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , dan menggunakan aturan ketat (yaitu `naskah-src 'diri'` )
* [Selama Perjalanan dan menonaktifkan ` eval `](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , yang memungkinkan string akan dieksekusi sebagai kode.
* Jangan mengatur `allowRunningInsecureContent ` true.
* Jangan aktifkan `experimentalFeatures` atau `experimentalCanvasFeatures ` kecuali Anda tahu apa yang Anda lakukan.
* Jangan gunakan `blinkFeatures` kecuali Anda tahu apa yang Anda lakukan.
* Tampilan Web: Jangan tambahkan `nodeintegration` atribut.
* Tampilan Web: Jangan gunakan ` disablewebsecurity </ 0></li>
<li>Tampilan Web: Jangan gunakan <code>allowpopups`
* TampilanWeb: Jangan gunakan `insertCSS` or `executeJavaScript` with remote CSS/JS.
* Tampilan Web: Verifikasi pilihan dan params dari semua `<webview>` tag sebelum mereka terikat menggunakan `akan melampirkan tampilan web` acara :

```js
app.on ( 'web-isi-dibuat', ( acara , isi) = & gt; {
   contents.on ( 'akan melampirkan tampilan web', ( acara , webPreferences, params) = & gt; {
     // Strip pergi script preload jika tidak digunakan atau memverifikasi lokasi mereka adalah sah
     webPreferences.preload delete
     hapus webPreferences.preloadURL

     // Disable simpul integrasi
     webPreferences.nodeIntegration = false

     // Verifikasi URL yang dimuat
     if (! params.src.startsWith ( 'https://yourapp.com/ ')) {
 event .preventDefault ()
 }
 })})            
```

Sekali lagi, daftar ini hanya meminimalkan risiko, tidak menghapusnya. Jika tujuan Anda adalah untuk menampilkan sebuah situs web, browser akan menjadi lebih aman pilihan .