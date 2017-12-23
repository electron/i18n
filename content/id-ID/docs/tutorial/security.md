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

> : peringatan: Dalam situasi yang harus Anda memuat dan mengeksekusi kode jauh dengan Node integrasi diaktifkan. Sebaliknya, gunakan hanya lokal file (dikemas bersama-sama dengan aplikasi Anda) untuk mengeksekusi Node kode. Untuk menampilkan konten jauh, gunakan ` tampilan web </ 0> tag dan pastikan untuk menonaktifkan <code> nodeIntegration </ 0> .  </p>
</blockquote>

<h4>daftar pembanding</h4>

<p>Ini bukan peluru, tapi setidaknya, Anda harus mencoba yang berikut ini:</p>

<ul>
<li>Hanya menampilkan aman (https) konten</li>
<li>Nonaktifkan Node integrasi dalam semua penyaji yang menampilkan konten jauh (pengaturan <code> nodeintergrasi </ 0> ke <code> palsu </ 0> di <code> Preperensi Web </ 0> )</li>
<li>Enable context isolation in all renderers that display remote content
(setting <code>contextIsolation` to `true` in `webPreferences`)</li> 
> 
> * Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
> * Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
> * Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
> * [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
> * Do not set `allowRunningInsecureContent` to true.
> * Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
> * Do not use `blinkFeatures` unless you know what you're doing.
> * WebViews: Do not add the `nodeintegration` attribute.
> * WebViews: Do not use `disablewebsecurity`
> * WebViews: Do not use `allowpopups`
> * WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.
> * WebViews: Verify the options and params of all `<webview>` tags before they get attached using the `will-attach-webview` event:</ul> 
> 
> ```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.