# Keamanan, kemampuan asli, dan tanggung jawab Anda

Sebagai web developer, kita biasanya menikmati keamanan yang kuat bersih browser - risiko yang terkait dengan kode kita menulis relatif kecil. website kami diberikan kekuasaan terbatas di bak pasir, dan kami percaya bahwa pengguna kami menikmati browser dibangun oleh tim besar insinyur yang mampu cepat merespon ancaman keamanan yang baru ditemukan.

Ketika bekerja dengan elektron, penting untuk memahami bahwa elektron tidak web browser. Hal ini memungkinkan Anda untuk membangun aplikasi desktop kaya fitur dengan teknologi web yang akrab, tapi kode wields banyak kekuatan yang lebih besar. JavaScript dapat mengakses filesystem, user shell, dan banyak lagi. Hal ini memungkinkan Anda untuk membangun aplikasi asli berkualitas tinggi, tetapi risiko keamanan yang melekat skala dengan kekuatan tambahan yang diberikan kepada kode Anda.

Dengan itu dalam pikiran, menyadari bahwa menampilkan konten yang sewenang-wenang dari sumber untrusted pose risiko keamanan parah elektron yang tidak dimaksudkan untuk menangani. Pada kenyataannya, aplikasi elektron yang paling populer (Atom, kendur, Visual Studio kode, dll) menampilkan terutama konten lokal (atau konten terpencil yang terpercaya, aman tanpa integrasi Node) – jika aplikasi Anda mengeksekusi kode dari sumber online, itu adalah tanggung jawab Anda untuk Pastikan bahwa kode ini tidak berbahaya.

## Melaporkan Issue Baru

Untuk informasi tentang cara untuk benar mengungkapkan kerentanan elektron, lihat [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Masalah keamanan Kromium dan upgrade

Sementara elektron berusaha untuk mendukung versi baru dari kromium sesegera mungkin, pengembang harus menyadari bahwa upgrade adalah usaha yang serius - melibatkan pengeditan lusinan atau bahkan ratusan file. Mengingat sumber daya dan kontribusi yang tersedia saat ini, elektron akan sering tidak pada versi yang sangat terbaru dari kromium, tertinggal oleh hari atau minggu.

Kami merasa bahwa sistem kami saat memperbarui Chromium komponen menyerang keseimbangan yang tepat antara sumber daya yang kita miliki dan kebutuhan mayoritas aplikasi yang dibangun di atas kerangka. Kami benar-benar tertarik untuk mendengar lebih lanjut tentang kasus-kasus penggunaan tertentu dari orang-orang yang membangun hal-hal di atas elektron. Permintaan tarik dan kontribusi yang mendukung upaya ini yang selalu sangat welcome.

## Mengabaikan di atas saran

Masalah keamanan ada setiap kali Anda menerima kode dari remote tujuan dan menjalankannya secara lokal. As an example, consider a remote website being displayed inside a [`BrowserWindow`](../api/browser-window.md). Jika penyerang entah bagaimana berhasil mengubah konten kata (baik dengan menyerang sumber langsung, atau dengan duduk di antara aplikasi dan tujuan yang sebenarnya), mereka akan dapat mengeksekusi kode asli pada mesin pengguna.

> : peringatan: Dalam situasi yang harus Anda memuat dan mengeksekusi kode jauh dengan Node integrasi diaktifkan. Sebaliknya, gunakan hanya lokal file (dikemas bersama-sama dengan aplikasi Anda) untuk mengeksekusi Node kode. To display remote content, use the [`webview`](../api/web-view) tag and make sure to disable the `nodeIntegration`.

## Electron Security Warnings

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show op when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: Security Recommendations

This is not bulletproof, but at the least, you should follow these steps to improve the security of your application.

1) [Only load secure content](#only-load-secure-content) 2) [Disable the Node.js integration in all renderers that display remote content](#disable-node.js-integration-for-remote-content) 3) [Enable context isolation in all renderers that display remote content](#enable-context-isolation-for-remote-content) 4) [Use `ses.setPermissionRequestHandler()` in all sessions that load remote content](#handle-session-permission-requests-from-remote-content) 5) [Do not disable `webSecurity`](#do-not-disable-websecurity) 6) [Define a `Content-Security-Policy`](#define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`) 7) [Override and disable `eval`](#override-and-disable-eval) , which allows strings to be executed as code. 8) [Do not set `allowRunningInsecureContent` to `true`](#do-not-set-allowRunningInsecureContent-to-true) 9) [Do not enable experimental features](#do-not-enable-experimental-features) 10) [Do not use `blinkFeatures`](#do-not-use-blinkfeatures) 11) [WebViews: Do not use `allowpopups`](#do-not-use-allowpopups) 12) [WebViews: Verify the options and params of all `<webview>` tags](#verify-webview-options-before-creation)

## 1) Only Load Secure Content

Any resources not included with your application should be loaded using a secure protocol like `HTTPS`. In other words, do not use insecure protocols like `HTTP`. Similarly, we recommed the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### Mengapa?

`HTTPS` has three main benefits:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### Bagaimana?

```js
Buruk browserWindow.loadURL ('http://my-website.com') / / baik browserWindow.loadURL ('https://my-website.com')
```

```html
<!--buruk--> <script crossorigin src="http://cdn.com/react.js"></script> <link rel="stylesheet" href="http://cdn.com/style.css"><!--baik--> <script crossorigin src="https://cdn.com/react.js"></script> <link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://my-website.com/", you can give that website exactly the abilities it needs, but no more.

### Mengapa?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### Bagaimana?

```js
// Buruk
const mainWindow = baru BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Bagus
const mainWindow = baru BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<webview nodeIntegration src="page.html"></webview> <webview src="page.html"></webview>
```

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { bacaFileSync } = wajib('fs')

window.bacaConfig = fungsi () {
  const data = bacaFileSync('./config.json')
  kembali data
}
```

## 3) Enable Context Isolation for Remote Content

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### Mengapa?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

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

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Mengapa?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

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

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Mengapa?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Bagaimana?

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

## 6) Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Mengapa?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### Bagaimana?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Mengapa?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### Bagaimana?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will now allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Mengapa?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

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

## 9) Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### Mengapa?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Futhermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

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

## 10) Do Not Use `blinkFeatures`

*Rekomendasi adalah elektron 's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### Mengapa?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### Bagaimana?

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

## 11) Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](web-view), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](browser-window) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Mengapa?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Bagaimana?

```html
<!--buruk--> <webview allowpopups src="page.html"></webview> <!--baik--> <webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](web-view) from the main process and to verify that their webPreferences do not disable security features.

### Mengapa?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](web-view) tags.

### Bagaimana?

Before a [`<WebView>`](web-view) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

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

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.