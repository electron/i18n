# Keamanan, kemampuan asli, dan tanggung jawab Anda

Sebagai web developer, kita biasanya menikmati keamanan yang kuat bersih browser - risiko yang terkait dengan kode kita menulis relatif kecil. website kami diberikan kekuasaan terbatas di bak pasir, dan kami percaya bahwa pengguna kami menikmati browser dibangun oleh tim besar insinyur yang mampu cepat merespon ancaman keamanan yang baru ditemukan.

Ketika bekerja dengan elektron, penting untuk memahami bahwa elektron tidak web browser. Hal ini memungkinkan Anda untuk membangun aplikasi desktop kaya fitur dengan teknologi web yang akrab, tapi kode wields banyak kekuatan yang lebih besar. JavaScript dapat mengakses filesystem, user shell, dan banyak lagi. Hal ini memungkinkan Anda untuk membangun aplikasi asli berkualitas tinggi, tetapi risiko keamanan yang melekat skala dengan kekuatan tambahan yang diberikan kepada kode Anda.

Dengan itu dalam pikiran, menyadari bahwa menampilkan konten yang sewenang-wenang dari sumber untrusted pose risiko keamanan parah elektron yang tidak dimaksudkan untuk menangani. Pada kenyataannya, aplikasi elektron yang paling populer (Atom, kendur, Visual Studio kode, dll) menampilkan terutama konten lokal (atau konten terpencil yang terpercaya, aman tanpa integrasi Node) – jika aplikasi Anda mengeksekusi kode dari sumber online, itu adalah tanggung jawab Anda untuk Pastikan bahwa kode ini tidak berbahaya.

## Melaporkan Issue Baru

Untuk informasi tentang cara untuk benar mengungkapkan kerentanan elektron, lihat [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Masalah keamanan Kromium dan upgrade

Electron keeps up to date with alternating Chromium releases. For more information, see the [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## Security Is Everyone's Responsibility

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (*Chromium*, *Node.js*), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

* **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you’re also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as *nodeIntegration bypasses*) are already patched and cannot be exploited in your application. For more information, see "[Use a current version of Electron](#17-use-a-current-version-of-electron)".

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.


## Isolation For Untrusted Content

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> : peringatan: Dalam situasi yang harus Anda memuat dan mengeksekusi kode jauh dengan Node integrasi diaktifkan. Sebaliknya, gunakan hanya lokal file (dikemas bersama-sama dengan aplikasi Anda) untuk mengeksekusi Node kode. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Peringatan Keamanan Elektron

Dari Electron 2.0, pengembang akan melihat peringatan dan rekomendasi yang dicetak ke konsol pengembang. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

Anda dapat memaksa atau menonaktifkan peringatan ini dengan menyetel ` ELECTRON_ENABLE_SECURITY_WARNINGS </ code> atau <code> ELECTRON_DISABLE_SECURITY_WARNINGS </ code> pada
objek <code> process.env </ code> atau <code>> </ code>.</p>

<h2 spaces-before="0">Daftar Periksa: Rekomendasi keamanan</h2>

<p spaces-before="0">You should at least follow these steps to improve the security of your application:</p>

<ol start="1">
<li><a href="#1-only-load-secure-content">Hanya memuat konten aman</a></li>
<li><a href="#2-do-not-enable-nodejs-integration-for-remote-content">Mengaktifkan konteks isolasi di semua penyaji yang menampilkan konten secara terpencil</a></li>
<li><a href="#3-enable-context-isolation-for-remote-content">Mengaktifkan konteks isolasi di semua penyaji yang menampilkan konten secara terpencil</a></li>
<li><a href="#4-handle-session-permission-requests-from-remote-content">Gunakan <code>ses.setPermissionRequestHandler ()</ 0> di semua sesi yang memuat konten jauh</a></li>
<li><a href="#5-do-not-disable-websecurity">Jangan menonaktifkan <code>Keamanan web`</a></li>
6 [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7 [Tidak ditetapkan `mengizinkan menjalankan konten yang tidak aman` `yang benar`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8 [Tidak mengaktifkan fitur eksperimental](#8-do-not-enable-experimental-features)
9 [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10 [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11 [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
12 [Disable or limit navigation](#12-disable-or-limit-navigation)
13 [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
14 [Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)
15 [Disable the `remote` module](#15-disable-the-remote-module)
16 [Filter the `remote` module](#16-filter-the-remote-module)
17 [Use a current version of Electron](#17-use-a-current-version-of-electron)</ol>

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
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```


## 2) Do not enable Node.js Integration for Remote Content

_This recommendation is the default behavior in Electron since 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. Tujuannya adalah untuk membatasi kekuatan yang anda berikan untuk konten terpencil, sehingga membuatnya jauh lebih sulit bagi penyerang membahayakan pengguna harus memperoleh kemampuan mereka untuk menjalankan JavaScript pada situs web anda.

Setelah ini, anda dapat memberikan izin tambahan untuk host tertentu. For example, if you are opening a BrowserWindow pointed at `https://example.com/`, you can give that website exactly the abilities it needs, but no more.

### Mengapa?

Cross-site scripting (XSS) serangan yang lebih berbahaya jika seorang penyerang dapat melompat keluar dari proses penyaji dan mengeksekusi kode pada komputer pengguna. Cross-site scripting serangan yang cukup umum - dan masalah sementara, kekuatan mereka biasanya terbatas untuk bermain-main dengan situs web yang mereka jalankan. Menonaktifkan integrasi Node.js membantu mencegah XSS dari yang meningkat menjadi serangan "Eksekusi Kode Jarak Jauh "(RCE).

### Bagaimana?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
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

Konteks isolasi adalah fitur Electron yang memungkinkan pengembang untuk menjalankan kode di script preload dan API Electron dalam konteks JavaScript yang berdedikasi. Di praktek itu berarti itu global benda seperti `Array.prototype.push`  atau`JSON.parse` tidak dapat dimodifikasi oleh skrip berjalan dalam renderer proses.

Elektron menggunakan sama teknologi seperti Chromium [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) untuk mengaktifkan perilaku ini.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### Why & How?

For more information on what `contextIsolation` is and how to enable it please see our dedicated [Context Isolation](context-isolation.md) document.


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

_Recommendation is Electron's default_

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
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


## 6) Tentukan Kebijakan Keamanan Konten

Kebijakan kemanan konten (CSP) adalah lapisan perlindungan tambahan terhadap serangan cross-site scripting dan serangan injeksi data. Kami merekomendasikan bahwa mereka dapat diaktifkan oleh setiap situs web yang anda muat dalam Electron.

### Mengapa?

CSP memungkinkan server yang menyajikan konten untuk membatasi dan mengontrol sumber daya Electron dapat dimuat untuk halaman web yang diberikan. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

CSP berikut akan memungkinkan Electron untuk mengeksekusi script dari situs web saat ini dan dari `apis.example.com`.

```plaintext
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


## 7) Do Not Set `allowRunningInsecureContent` to `true`

_Recommendation is Electron's default_

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

_Recommendation is Electron's default_

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

_Recommendation is Electron's default_

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Mengapa?

Secara umum, ada kemungkinan alasan yang baik jika fitur ini tidak diaktifkan secara default. Legitimate use cases for enabling specific features exist. Sebagai pengembang, anda harus tahu persis mengapa anda perlu mengaktifkan fitur ini, apa percabangannya, dan bagaimana pengaruhnya terhadap keamanan dari aplikasi anda. Dalam keadaan apa pun harus Anda mengaktifkan fitur speculatively.

### Bagaimana?
```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
Baik const mainWindow = BrowserWindow() baru
```


## 10) Jangan Gunakan ` allowpopups </ code></h2>

<p spaces-before="0"><em x-id="4">Recommendation is Electron's default</em></p>

<p spaces-before="0">If you are using <a href="../api/webview-tag.md"><code><webview>`</a>, you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.</p>

### Mengapa?

Jika Anda tidak perlu popup, Anda akan lebih baik tidak memungkinkan penciptaan baru [`BrowserWindows`](../api/browser-window.md) secara default. Ini mengikuti prinsip dari jumlah minimal akses yang diperlukan: Jangan biarkan situs web membuat popup baru kecuali anda tahu kebutuhan fitur ini.

### Bagaimana?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
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

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.

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
  contents.on('new-window', async (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    await shell.openExternal(navigationUrl)
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

## 15) Disable the `remote` module

The `remote` module provides a way for the renderer processes to access APIs normally only available in the main process. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

However, if your app can run untrusted content and even if you [sandbox](../api/sandbox-option.md) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Therefore, it should be disabled in such circumstances.

### Mengapa?

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### Bagaimana?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16) Filter the `remote` module

If you cannot disable the `remote` module, you should filter the globals, Node, and Electron modules (so-called built-ins) accessible via `remote` that your application does not require. This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.

### Mengapa?

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### Bagaimana?

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Use a current version of Electron

You should strive for always using the latest available version of Electron. Whenever a new major version is released, you should attempt to update your app as quickly as possible.

### Mengapa?

An application built with an older version of Electron, Chromium, and Node.js is an easier target than an application that is using more recent versions of those components. Generally speaking, security issues and exploits for older versions of Chromium and Node.js are more widely available.

Both Chromium and Node.js are impressive feats of engineering built by thousands of talented developers. Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers [disclose vulnerabilities responsibly](https://en.wikipedia.org/wiki/Responsible_disclosure), which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Your application will be more secure if it is running a recent version of Electron (and thus, Chromium and Node.js) for which potential security issues are not as widely known.
