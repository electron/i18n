# Pilihan `sandbox`

> Membuat sebuah peramban dengan perender yang dapat beroperasi di dalam OS sandbox Chromium. Dengan opsi ini diaktifkan, perender harus berkomunikasi melalui IPC ke proses utama untuk mengakses simpul API. However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

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
app.on('ready', () => {
   win = new BrowserWindow({     
     webPreferences: {       
        sandbox: true     
      }   
    })   
   win.loadURL('http://google.com') 
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Penting untuk dicatat bahwa opsi ini saja sendiri tidak akan mengaktifkan sanbox yang dipaksa oleh OS. Untuk mengaktifkan fitur ini, argumen baris perintah `--enable-sandbox` harus dilewatkan ke electron, yang akan memaksa `sandbox: true` untuk semua kejadian `BrowserWindow`.

```js
let win
app.on('ready', () => {
  // tidak perlu untuk melewatkan `sandbox: true` karena `--enable-sandbox` diaktifkan.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
electron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

Sebuah aplikasi dapat membuat penyesuaian pada perender yang disandbox menggunakan skrip pramuat. Berikut adalah contohnya:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

dan preload.js:

```js
// File ini dimuat kapanpun sebuah konteks javascript diciptakan. It runs in a
// private scope that can access a subset of Electron renderer APIs. Kita harus // berhati-hati untuk tidak membocorkan obyek apapun ke dalam lingkup global!
const fs = require('fs')
const { ipcRenderer } = require('electron')

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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- Skrip pramuat dapat mengakses secara langsung seluruh API dari proses utama melalui modul `remote` dan `ipcRenderer`. Ini adalah bagaimana `fs` (yang digunakan di atas) dan modul-modul lain diimplementasikan. Mereka adalah proxy-proxy untuk mengendalikan rekanan dalam proses utama.
- Skrip pramuat harus dimuat dalam satu skrip tunggal, namun memungkinkan untuk memiliki kode pramuat kompleks yang disusun dengan beberapa modul dengan menggunakan alat seperti browserify, seperti yang dijelaskan di bawah ini. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

Untuk membuat bundel browserify dan menggunakannya sebagai skrip pramuat, sesuatu seperti berikut ini harus digunakan:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Bendera `-x` harus digunakan bersama modul yang dibutuhkan yang sudah terekspos dalam lingkup pramuat, dan memberitahukan browserify untuk menggunakan fungsi `require` terlampir, untuknya. `--insert-global-vars` akan memastikan bahwa `proses`, `Buffer` dan `setImmediate` juga diambil dari lingkup yang melekat (biasanya browserify menyuntikkan kode untuk mereka).

Saat ini fungsi `require` yang disediakan dalam lingkup pramuat memaparkan modul sebagai berikut:

- `child_process`
- `electron` 
  - `kerusakanReporter`
  - `remot`
  - `ipcRenderer`
  - `webBingkai`
- `fs`
- `os`
- `timer`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Silahkan gunakan opsi `sandbox` dengan hati-hati, karena fitur ini masih fitur percobaan. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code.
- Beberapa bug pada mesin V8 memungkinkan kode berbahaya mengakses API pramuat perender, yang secara efektif memberikan akses penuh ke sistem melalui modul `remote`.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

Satu peningkatan yang direncanakan yang akan sangat meningkatkan keamanan adalah dengan memblokir pesan IPC dari perender yang disandbox secara bawaan, memungkinkan proses utama menentukan secara eksplisit serangkaian pesan yang diizinkan dikirim oleh perender.