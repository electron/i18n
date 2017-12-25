# Pilihan `sandbox`

> Membuat sebuah peramban dengan perender yang dapat beroperasi di dalam OS sandbox Chromium. Dengan opsi ini diaktifkan, perender harus berkomunikasi melalui IPC ke proses utama untuk mengakses simpul API. Namun, untuk mengaktifkan OS sandbox Chromium, elektron harus dijalankan dengan argumen baris perintah ` - enable-sandbox `.

Salah satu fitur keamanan Chromium adalah bahwa semua kode rendering / JavaScript yang berkedip dijalankan di dalam sandbox. Sanbox (Kotak pasir) ini menggunakan fitur khusus OS untuk memastikan bahwa eksploitasi di dalam proses perender tidak dapat membahayakan sistem.

Dengan kata lain, ketika sadbox diaktifkan, perender hanya dapat melakukan perubahan pada sistem dengan mendelegasikan tugas ke proses utama melalui IPC. [Berikut](https://www.chromium.org/developers/design-documents/sandbox) adalah informasi lebih lanjut tentang sandbox.

Karena fitur utama dalam elektron adalah kemampuan untuk menjalankan node.js dalam proses perender (membuatnya lebih mudah untuk mengembangkan aplikasi desktop dengan menggunakan teknologi web), sandbox dinonaktifkan oleh elektron. Hal ini karena sebagian besar API node.js memerlukan akses sistem. ` require()` misalnya, tidak mungkin tanpa izin sistem file, yang mana tidak tersedia di dalam sebuah lingkungan yang disandbox.

Biasanya ini bukan masalah untuk aplikasi desktop karena kode selalu bisa dipercaya, namun ini membuat elektron kurang aman dibanding chromium untuk menampilkan konten web yang tidak tepercaya. Untuk aplikasi yang membutuhkan keamanan lebih, bendera ` sandbox ` akan memaksa elektron memunculkan perender chromium klasik yang kompatibel dengan sandbox.

Perender sandbox tidak memiliki sebuah lingkungan node.js yang berjalan dan tidak mengekspos API node.js JavaScript ke kode klien. Satu-satunya pengecualian adalah skrip yang sudah termuat (preload), yang memiliki akses ke sebuah subset dari API perender elektron.

Perbedaan lainnya adalah perender yang disanbox tidak memodifikasi API bawaan JavaScript yang manapun. Konsekwensinya, beberapa API seperti `window.open` akan bekerja sebagaimana mereka lakukan di chromium (contohnya mereka tidak mengembalikan nilai `BrowserWindowProxy`).

## Contoh

Untuk membuat jendela yang disanbox, secara sederhana saja lewatkan nilai `sandbox: true` ke `webPreferences`:

```js
let win 
app.on('ready', () => {
   win = new BrowserWindow({     
     webPreferences: {       
        sandbox: true     
      }   
    })   
   w.loadURL('http://google.com') 
})
```

Dalam kode di atas `BrowserWindow` yang dibuat mempunyai node.js yang tidak aktif dan berkomunikasi hanya melalui IPC. Kegunaan dari opsi ini adalah menghentikan electron dari membuat sebuah runtime node.js di dalam perender. Juga, di jendela baru ini `window.open` mengikuti perilaku asli (secara bawaan electron menciptakan sebuah `BrowserWindow` dan mengembalikan nilai proxy kepadanya melalui `window.open`).

Penting untuk dicatat bahwa opsi ini saja sendiri tidak akan mengaktifkan sanbox yang dipaksa oleh OS. Untuk mengaktifkan fitur ini, argumen baris perintah `--enable-sandbox` harus dilewatkan ke electron, yang akan memaksa `sandbox: true` untuk semua kejadian `BrowserWindow`.

Untuk mengaktifkan sandbox yang dipaksa oleh OS pada `BrowserWindow` atau `webview` yang diproses dengan `sandbox:true` tanpa menyebabkan keseluruhan aplikasi untuk berada di sandbox, `--enable-mixed-sandbox` argumen baris perintah harus dilewatkan ke electron. Opsi tersebut pada saat sekarang hanya didukung pada platform macOS dan Windows.

```js
let win
app.on('ready', () => {
  // tidak perlu untuk melewatkan `sandbox: true` karena `--enable-sandbox` diaktifkan.
  win = new BrowserWindow()
  w.loadURL('http://google.com')
})
```

Perhatikan bahwa tidak cukup untuk memanggil `app.commandLine.appendSwitch('--enable-sandbox')`, karena kode startup elektron/node yang berjalan setelahnya memungkinkan untuk melakukan perubahan pada pengaturan kotak sandbox chromium. Pergantian harus dilewatkan ke elektron pada baris-perintah:

    electron --enable-sandbox app.js
    

Adalah tidak mungkin untuk memiliki OS sandbox yang aktif hanya untuk beberapa perender, jika `--enable-sandbox` diaktifkan, jendela elektron normal tidak dapat dibuat.

Jika Anda perlu mencampur peranti yang disandbox dan yang tidak-disandboxed dalam satu aplikasi, cukup hilangkan argumen `--enable-sandbox`. Without this argument, windows created with `sandbox: true` will still have node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  w.loadURL('http://google.com')
})
```

and preload.js:

```js
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of electron renderer APIs. We must be
// careful to not leak any objects into the global scope!
const fs = require('fs')
const {ipcRenderer} = require('electron')

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

Important things to notice in the preload script:

- Even though the sandboxed renderer doesn't have node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like browserify, as explained below. In fact, browserify is already used by electron to provide a node-like environment to the preload script.

To create a browserify bundle and use it as a preload script, something like the following should be used:

    browserify preload/index.js \
      -x electron \
      -x fs \
      --insert-global-vars=__filename,__dirname -o preload.js
    

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `child_process`
- `electron` (crashReporter, remote and ipcRenderer)
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.