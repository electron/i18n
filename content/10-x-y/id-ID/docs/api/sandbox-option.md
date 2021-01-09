# Pilihan `sandbox`

> Create a browser window with a sandboxed renderer. Dengan opsi ini diaktifkan, perender harus berkomunikasi melalui IPC ke proses utama untuk mengakses simpul API.

Salah satu fitur keamanan Chromium adalah bahwa semua kode rendering / JavaScript yang berkedip dijalankan di dalam sandbox. Sanbox (Kotak pasir) ini menggunakan fitur khusus OS untuk memastikan bahwa eksploitasi di dalam proses perender tidak dapat membahayakan sistem.

Dengan kata lain, ketika sadbox diaktifkan, perender hanya dapat melakukan perubahan pada sistem dengan mendelegasikan tugas ke proses utama melalui IPC. [Berikut](https://www.chromium.org/developers/design-documents/sandbox) adalah informasi lebih lanjut tentang sandbox.

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. ` require()` misalnya, tidak mungkin tanpa izin sistem file, yang mana tidak tersedia di dalam sebuah lingkungan yang disandbox.

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

Perbedaan lainnya adalah perender yang disanbox tidak memodifikasi API bawaan JavaScript yang manapun. Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Contoh

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behavior (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) can be used to force `sandbox: true` for all `BrowserWindow` instances.

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

dan preload.js:

```js
// File ini dimuat kapanpun sebuah konteks javascript diciptakan. It runs in a
// private scope that can access a subset of Electron renderer APIs. Kita harus // berhati-hati untuk tidak membocorkan obyek apapun ke dalam lingkup global!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Hal penting untuk dicatat dalam skrip pramuat:

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate`, `clearImmediate` and `require` are available.
- Skrip pramuat dapat mengakses secara langsung seluruh API dari proses utama melalui modul `remote` dan `ipcRenderer`.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like webpack or browserify. An example of using browserify is below.

Untuk membuat bundel browserify dan menggunakannya sebagai skrip pramuat, sesuatu seperti berikut ini harus digunakan:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Bendera `-x` harus digunakan bersama modul yang dibutuhkan yang sudah terekspos dalam lingkup pramuat, dan memberitahukan browserify untuk menggunakan fungsi `require` terlampir, untuknya. `--insert-global-vars` akan memastikan bahwa `proses`, `Buffer` dan `setImmediate` juga diambil dari lingkup yang melekat (biasanya browserify menyuntikkan kode untuk mereka).

Saat ini fungsi `require` yang disediakan dalam lingkup pramuat memaparkan modul sebagai berikut:

- `electron`
  - `kerusakanReporter`
  - `penangkapDesktop`
  - `ipcRenderer`
  - `gambarasli`
  - `remot`
  - `webBingkai`
- `acara`
- `timer`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. Beaker Browser). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code, unless [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) is also enabled.
- Some bug in the V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).
- While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.
