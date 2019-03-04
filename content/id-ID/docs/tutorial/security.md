# Keamanan, kemampuan asli, dan tanggung jawab Anda

Sebagai web developer, kita biasanya menikmati keamanan yang kuat bersih browser - risiko yang terkait dengan kode kita menulis relatif kecil. website kami diberikan kekuasaan terbatas di bak pasir, dan kami percaya bahwa pengguna kami menikmati browser dibangun oleh tim besar insinyur yang mampu cepat merespon ancaman keamanan yang baru ditemukan.

Ketika bekerja dengan elektron, penting untuk memahami bahwa elektron tidak web browser. Hal ini memungkinkan Anda untuk membangun aplikasi desktop kaya fitur dengan teknologi web yang akrab, tapi kode wields banyak kekuatan yang lebih besar. JavaScript dapat mengakses filesystem, user shell, dan banyak lagi. Hal ini memungkinkan Anda untuk membangun aplikasi asli berkualitas tinggi, tetapi risiko keamanan yang melekat skala dengan kekuatan tambahan yang diberikan kepada kode Anda.

Dengan itu dalam pikiran, menyadari bahwa menampilkan konten yang sewenang-wenang dari sumber untrusted pose risiko keamanan parah elektron yang tidak dimaksudkan untuk menangani. Pada kenyataannya, aplikasi elektron yang paling populer (Atom, kendur, Visual Studio kode, dll) menampilkan terutama konten lokal (atau konten terpencil yang terpercaya, aman tanpa integrasi Node) – jika aplikasi Anda mengeksekusi kode dari sumber online, itu adalah tanggung jawab Anda untuk Pastikan bahwa kode ini tidak berbahaya.

## Melaporkan Issue Baru

Untuk informasi tentang cara untuk benar mengungkapkan kerentanan elektron, lihat [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Masalah keamanan Kromium dan upgrade

Sementara elektron berusaha untuk mendukung versi baru dari kromium sesegera mungkin, pengembang harus menyadari bahwa upgrade adalah usaha yang serius - melibatkan pengeditan lusinan atau bahkan ratusan file. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by several weeks or a few months.

Kami merasa bahwa sistem kami saat memperbarui Chromium komponen menyerang keseimbangan yang tepat antara sumber daya yang kita miliki dan kebutuhan mayoritas aplikasi yang dibangun di atas kerangka. Kami benar-benar tertarik untuk mendengar lebih lanjut tentang kasus-kasus penggunaan tertentu dari orang-orang yang membangun hal-hal di atas elektron. Permintaan tarik dan kontribusi yang mendukung upaya ini yang selalu sangat welcome.

## Security Is Everyone's Responsibility

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (*Chromium*, *Node.js*), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

* **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you’re also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as *nodeIntegration bypasses*) are already patched and cannot be exploited in your application.

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.

## Isolation For Untrusted Content

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> : peringatan: Dalam situasi yang harus Anda memuat dan mengeksekusi kode jauh dengan Node integrasi diaktifkan. Sebaliknya, gunakan hanya lokal file (dikemas bersama-sama dengan aplikasi Anda) untuk mengeksekusi Node kode. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Peringatan Keamanan Elektronika

Dari Electron 2.0, pengembang akan melihat peringatan dan rekomendasi yang dicetak ke konsol pengembang. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

Anda dapat memaksa atau menonaktifkan peringatan ini dengan menyetel ` ELECTRON_ENABLE_SECURITY_WARNINGS </ code> atau <code> ELECTRON_DISABLE_SECURITY_WARNINGS </ code> pada
objek <code> process.env </ code> atau <code>> </ code>.</p>

<h2>Daftar Periksa: Rekomendasi keamanan</h2>

<p>You should at least follow these steps to improve the security of your application:</p>

<ol>
<li><a href="#1-only-load-secure-content">Hanya memuat konten aman</a></li>
<li><a href="#2-disable-nodejs-integration-for-remote-content">Mengaktifkan konteks isolasi di semua penyaji yang menampilkan konten secara terpencil</a></li>
<li><a href="#3-enable-context-isolation-for-remote-content">Mengaktifkan konteks isolasi di semua penyaji yang menampilkan konten secara terpencil</a></li>
<li><a href="#4-handle-session-permission-requests-from-remote-content">Gunakan <code>ses.setPermissionRequestHandler ()</ 0> di semua sesi yang memuat konten jauh</a></li>
<li><a href="#5-do-not-disable-websecurity">Jangan menonaktifkan <code>Keamanan web`</a></li> 

* [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
* [Tidak ditetapkan `mengizinkan menjalankan konten yang tidak aman` `yang benar`](#7-do-not-set-allowrunninginsecurecontent-to-true)
* [Tidak mengaktifkan fitur eksperimental](#8-do-not-enable-experimental-features)
* [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
* [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
* [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
* [Disable or limit navigation](#12-disable-or-limit-navigation)
* [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
* [Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)</ol> 

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Hanya memuat konten aman

Setiap sumber daya yang tidak disertakan dengan aplikasi anda harus dimuat dengan menggunakan protokol yang aman seperti `HTTPS`. Dengan kata lain, jangan gunakan tidak aman protokol seperti `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### Mengapa?

`HTTPS` memiliki tiga manfaat utama:

1) Mengotentikasi server terpencil, membuat aplikasi anda terhubung dengan benar Ke host bukan peniru. 2) Memastikan integritas data, menyatakan bahwa data tidak diubah saat di transit antara aplikasi anda dan host. 3) Mengenkripsi lalu lintas antara pengguna dan tujuan host, sehingga lebih sulit untuk menyadap informasi yang dikirim antara ponsel anda dengan aplikasi dan host.

### Bagaimana?

```js
Buruk browserWindow.loadURL ('http://example.com') / / baik browserWindow.loadURL ('https://example.com')
```

```html
<!--buruk--> <script crossorigin src="http://example.com/react.js"></script> <link rel="stylesheet" href="http://example.com/style.css"><!--baik--> <script crossorigin src="https://example.com/react.js"></script> <link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Nonaktifkan Integrasi Node.js untuk Konten Jarak Jauh

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. Tujuannya adalah untuk membatasi kekuatan yang anda berikan untuk konten terpencil, sehingga membuatnya jauh lebih sulit bagi penyerang membahayakan pengguna harus memperoleh kemampuan mereka untuk menjalankan JavaScript pada situs web anda.

Setelah ini, anda dapat memberikan izin tambahan untuk host tertentu. Misalnya, jika anda membuka BrowserWindow menunjuk pada`https://example.com/", anda dapat memberikan situs web yang tepat dengan kemampuan yang dibutuhkan, tapi tidak lebih.

### Mengapa?

Cross-site scripting (XSS) serangan yang lebih berbahaya jika seorang penyerang dapat melompat keluar dari proses penyaji dan mengeksekusi kode pada komputer pengguna. Cross-site scripting serangan yang cukup umum - dan masalah sementara, kekuatan mereka biasanya terbatas untuk bermain-main dengan situs web yang mereka jalankan. Menonaktifkan integrasi Node.js membantu mencegah XSS dari yang meningkat menjadi serangan "Eksekusi Kode Jarak Jauh "(RCE).

### Bagaimana?

```js
// Buruk
const mainWindow = baru BrowserWindow()
mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    nodeIntegrationInWorker: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!--buruk--> <webview nodeIntegration src="page.html"></webview> <!--baik--> <webview src="page.html"></webview>
```

Ketika menonaktifkan integrasi Node.js,anda masih dapat mengekspos Api untuk situs web anda yang mengkonsumsi modul atau fitur Node.js. Script pramuat terus memiliki akses untuk `meminta` dan fitur Node.js lainnya, yang memungkinkan pengembang untuk mengekspos custom API untuk memuat konten yang terpencil.

Dalam contoh berikut script preload, kemudian memuat situs web akan memiliki akses untuk `jendela.readConfig()` metode, tetapi tidak ada fitur Node.js.

```js
const { bacaFileSync } = wajib('fs')

window.bacaConfig = fungsi () {
  const data = bacaFileSync('./config.json')
  kembali data
}
```

## 3) Aktifkan Isolasi Konteks untuk Konten Jarak Jauh

Konteks isolasi adalah fitur Electron yang memungkinkan pengembang untuk menjalankan kode di script preload dan API Electron dalam konteks JavaScript yang berdedikasi. Di praktek itu berarti itu global benda seperti `Array.prototype.push` atau`JSON.parse` tidak dapat dimodifikasi oleh skrip berjalan dalam renderer proses.

Elektron menggunakan sama teknologi seperti Chromium [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) untuk mengaktifkan perilaku ini.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### Mengapa?

Konteks isolasi memungkinkan setiap script yang berjalan di penyaji untuk membuat perubahan lingkungan JavaScript tanpa khawatir tentang yang bertentangan dengan script API Electron atau script preload.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts, which mitigates so-called "Prototype Pollution" attacks.

Pada waktu yang sama, script preload masih memiliki akses ke `dokumen` dan `jendela` objek. Dengan kata lain, anda mendapatkan pengembalian yang layak atas kemungkinan investasi yang sangat kecil.

### Bagaimana?

```js
// Main proses
const mainWindow = baru BrowserWindow({
  webPreferensi: {
    kontextIsolation: benar,
    pramuat: 'pramuat.js'
  }
})
```

```js
// Pramuat script

// Tetapkan variabel di halaman sebelum dimuat
webFrame.executeJavaScript('window.foo = "foo";')

// Yang dimuat halaman tidak akan bisa untuk mengakses ini, itu hanya tersedia
// di dalam konteks
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Akan log out 'bar' sejak window.bar tersedia dalam konteks ini
  console.log(window.foo)


  // 
  console.log(window.bar)
})
```

## 4) Menangani permintaan izin sesi dari konten jauh

Anda mungkin telah melihat permintaan izin saat menggunakan Chrome: Mereka muncul setiap kali situs web mencoba untuk menggunakan fitur yang harus disetujui pengguna secara manual (seperti pemberitahuan).

API didasarkan pada [perizinan API Chromium](https://developer.chrome.com/extensions/permissions) dan menerapkan jenis yang sama dari perizinan.

### Mengapa?

Secara default, Electron akan secara otomatis menyetujui semua permintaan izin kecuali pengembang telah secara manual mengkonfigurasi penangan kustom. Sementara padat default, pengembang yang sadar akan keamanan mungkin ingin menganggap sangat berlawanan.

### Bagaimana?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Jangan Nonaktifkan Keamanan Web

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

Tidak menonaktifkan `webSecurity` dalam aplikasi produksi.

### Mengapa?

Menonaktifkan `webSecurity` akan menonaktifkan kebijakan asal yang sama dan mengatur properti `allowRunningInsecureContent` ke `true`. Dengan kata lain, hal ini memungkinkan eksekusi kode yang tidak aman dari domain yang berbeda.

### Bagaimana?

```js
Buruk const mainWindow = BrowserWindow baru ({webPreferences: {
    webSecurity: false
  }})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!--buruk--> <webview disablewebsecurity src="page.html"></webview> <!--baik--> <webview src="page.html"></webview>
```

## 6) Tentukan Kebijakan Keamanan Konten

Kebijakan kemanan konten (CSP) adalah lapisan perlindungan tambahan terhadap serangan cross-site scripting dan serangan injeksi data. Kami merekomendasikan bahwa mereka dapat diaktifkan oleh setiap situs web yang anda muat dalam Electron.

### Mengapa?

CSP memungkinkan server yang menyajikan konten untuk membatasi dan mengontrol sumber daya Electron dapat dimuat untuk halaman web yang diberikan. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

CSP berikut akan memungkinkan Electron untuk mengeksekusi script dari situs web saat ini dan dari `apis.example.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Mengapa?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### Bagaimana?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 8) Tidak Mengaktifkan Fitur Eksperimental

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### Mengapa?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Ada kasus penggunaan yang sah, tapi kecuali anda tahu apa yang anda lakukan, sebaiknya anda tidak mengaktifkan properti ini.

### Bagaimana?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Use `enableBlinkFeatures`

*Rekomendasi adalah elektron 's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Mengapa?

Secara umum, ada kemungkinan alasan yang baik jika fitur ini tidak diaktifkan secara default. Legitimate use cases for enabling specific features exist. Sebagai pengembang, anda harus tahu persis mengapa anda perlu mengaktifkan fitur ini, apa percabangannya, dan bagaimana pengaruhnya terhadap keamanan dari aplikasi anda. Dalam keadaan apa pun harus Anda mengaktifkan fitur speculatively.

### Bagaimana?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
Baik const mainWindow = BrowserWindow() baru
```

## 10) Jangan Gunakan ` allowpopups </ code></h2>

<p><em>Recommendation is Electron's default</em></p>

<p>If you are using <a href="../api/webview-tag.md"><code><webview>`</a>, you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.</p> 

### Mengapa?

Jika Anda tidak perlu popup, Anda akan lebih baik tidak memungkinkan penciptaan baru [`BrowserWindows`](../api/browser-window.md) secara default. Ini mengikuti prinsip dari jumlah minimal akses yang diperlukan: Jangan biarkan situs web membuat popup baru kecuali anda tahu kebutuhan fitur ini.

### Bagaimana?

```html
<!--buruk--> <webview allowpopups src="page.html"></webview> <!--baik--> <webview src="page.html"></webview>
```

## 11) Verifikasi Pilihan WebView Sebelum Penciptaan

Tampilan Web yang dibuat dalam sebuah proses penyaji yang tidak memiliki integrasi Node.js diaktifkan tidak akan dapat mengaktifkan integrasi itu sendiri. Namun, WebView akan selalu membuat proses renderer independen dengan sendiri `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### Mengapa?

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Elektron memungkinkan pengembang untuk menonaktifkan berbagai fitur keamanan kontrol proses renderer. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### Bagaimana?

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Sekali lagi, daftar ini hanya meminimalkan risiko, tidak menghapusnya. Jika tujuan Anda adalah untuk menampilkan sebuah situs web, browser akan menjadi lebih aman pilihan .

## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### Mengapa?

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### Bagaimana?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### Mengapa?

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### Bagaimana?

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    shell.openExternalSync(navigationUrl)
  })
})
```

## 14) Do not use `openExternal` with untrusted content

Shell's [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### Mengapa?

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### Bagaimana?

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```