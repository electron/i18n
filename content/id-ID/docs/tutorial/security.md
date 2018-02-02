# Keamanan, Kemampuan asli, dan Tanggung Jawab Anda

Sebagai pengembang web, biasanya kita menikmati keamanan yang kuat bersih dari browser - risiko yang terkait dengan kode yang kita tulis adalah relatif kecil. Situs web kami diberikan kekuasaan terbatas dalam sandbox, dan kami percaya bahwa pengguna kami menikmati browser yang dibangun oleh sebuah tim besar yang terdiri dari insinyur yang mampu menanggapi dengan cepat ancaman keamanan yang baru ditemukan.

Ketika bekerja dengan Electron , penting untuk memahami bahwa elektron tidak web browser. Hal ini memungkinkan Anda untuk membangun aplikasi desktop kaya fitur dengan teknologi web akrab, tapi kode Anda memiliki kekuasaan jauh lebih besar. JavaScript dapat mengakses file , keamanan pengguna, dan banyak lagi. Hal ini memungkinkan anda untuk membangun aplikasi asli yang berkualitas tinggi, tapi skala risiko keamanan yang melekat dengan kekuatan tambahan yang diberikan untuk kode anda.

Dengan itu dalam pikiran, menyadari bahwa menampilkan konten sewenang-wenang dari sumber terpercaya memiliki resiko keamanan parah yang Elektron tidak dimaksudkan untuk menangani. Bahkan, yang paling populer Elektron aplikasi ( Atom , Slack, Visual Studio Code, dll) display terutama lokal konten (atau terpercaya, konten jauh aman tanpa Node integrasi) - jika aplikasi Anda mengeksekusi kode dari sumber online, itu adalah tanggung jawab Anda untuk memastikan bahwa kode ini tidak berbahaya.

## Pelaporan Masalah Keamanan

Untuk informasi tentang cara untuk benar mengungkapkan sebuah Elektron kerentanan, lihat  SECURITY.md </ 0></p> 

## Chromium Masalah Keamanan dan Upgrade

Sementara Elektron berusaha untuk mendukung versi baru dari Chromium sesegera mungkin, pengembang harus menyadari bahwa upgrade adalah usaha yang serius - yang melibatkan puluhan tangan-mengedit atau bahkan ratusan file. Mengingat sumber daya dan kontribusi tersedia saat ini, elektron mungkin tidak berada di versi yang sangat terbaru dari Chromium , lebih awal satu hari atau minggu.

Kami merasa bahwa sistem kami saat ini memperbarui komponen Chromium yang menyerang keseimbangan dengan tepat antara sumber daya yang kita miliki dan kebutuhan sebagian besar aplikasi yang dibangun di atas kerangka kerja. Kami pasti tertarik untuk mendengar lebih banyak tentang kasus penggunaan khusus dari orang-orang yang membangun hal-hal di atas Elektron . permintaan tarik dan kontribusi yang mendukung usaha ini selalu sangat mendukung.

## Mengabaikan atas Saran

Masalah keamanan ada setiap kali Anda menerima kode dari tujuan remote dan mengeksekusi secara lokal. Sebagai contoh, pertimbangkan sebuah remote web yang sedang ditampilkan di dalam [`BrowserWindow`](browser-window). Jika penyerang berhasil mengubah kata konten (baik dengan menyerang sumber secara langsung, atau dengan duduk di antara aplikasi anda dan tujuan yang sebenarnya), mereka akan mampu menjalankan kode asli pada mesin pengguna.

> :warning: Dalam situasi yang harus anda memuat dan menjalankan kode jauh dengan Node.js integrasi diaktifkan. Sebaliknya, hanya menggunakan file lokal (dikemas bersama-sama dengan aplikasi anda) untuk menjalankan Node.js kode. Untuk menampilkan konten secara jauh, menggunakan [`webview`](web-view) tag dan pastikan untuk menonaktifkan `nodeIntegration`.

#### Daftar periksa: Rekomendasi Keamanan

Ini bukan peluru, tapi setidaknya, Anda harus mencoba yang berikut ini:

* [Hanya memuat konten yang aman](#only-load-secure-content)
* [Menonaktifkan integrasi Node.js di semua penyaji yang menampilkan konten secara terpencil](#disable-node.js-integration-for-remote-content)
* [Mengaktifkan konteks isolasi di semua penyaji yang menampilkan konten secara terpencil](#enable-context-isolation-for-remote-content)
* [Gunakan `ses.setPermissionRequestHandler ()</ 0> di semua sesi yang memuat konten jauh</a></li>
<li><a href="#do-not-disable-websecurity">Jangan menonaktifkan <code>Keamanan web`](#handle-session-permission-requests-from-remote-content)
* [Menentukan sebuah `Kebijakan-konten-keamanan`](#define-a-content-security-policy) dan menggunakan aturan ketat (yaitu `script-src 'diri'`)
* [Override and disable `eval`](#override-and-disable-eval) , which allows strings to be executed as code.
* [Do not set `allowRunningInsecureContent` to `true`](#do-not-set-allowRunningInsecureContent-to-true)
* [Do not enable experimental features](#do-not-enable-experimental-features)
* [Do not use `blinkFeatures`](#do-not-use-blinkfeatures)
* [Tampilan Web: Jangan gunakan `allowpopups`](#do-not-use-allowpopups)
* [WebViews: Verify the options and params of all `<webview>` tags](#verify-webview-options-before-creation)

## Only Load Secure Content

Any resources not included with your application should be loaded using a secure protocol like `HTTPS`. In other words, do not use insecure protocols like `HTTP`. Similarly, we recommed the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### Why?

`HTTPS` has three main benefits:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### How?

```js
// Bad
browserWindow.loadURL('http://my-website.com')

// Good
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Good -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), or [`WebView`](web-view)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://my-website.com/", you can give that website exactly the abilities it needs, but no more.

### Why?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### How?

```js
// Bad
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## Enable Context Isolation for Remote Content

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### Why?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### How?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```

## Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Why?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### How?

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

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Why?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### How?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Why?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### How?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will now allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Why?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

### How?

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

## Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### Why?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Futhermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### How?

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

## Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### Why?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### How?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), or [`WebView`](web-view)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Why?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### How?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
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

## Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](web-view), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](browser-window) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Why?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### How?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](web-view) from the main process and to verify that their webPreferences do not disable security features.

### Why?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](web-view) tags.

### How?

Before a [`<WebView>`](web-view) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Sekali lagi, daftar ini hanya meminimalkan risiko, tidak menghapusnya. Jika tujuan Anda adalah untuk menampilkan sebuah situs web, browser akan menjadi lebih aman pilihan .