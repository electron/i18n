# Pilihan `sandbox`

> Create a browser window with a sandboxed renderer. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

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

[`app.enableSandbox`](app.md#appenablesandbox-experimental) can be used to force `sandbox: true` for all `BrowserWindow` instances.

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

and preload.js:

```js
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of Electron renderer APIs. We must be
// careful to not leak any objects into the global scope!
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

Important things to notice in the preload script:

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules.
- Skrip pramuat harus dimuat dalam satu skrip tunggal, namun memungkinkan untuk memiliki kode pramuat kompleks yang disusun dengan beberapa modul dengan menggunakan alat seperti browserify, seperti yang dijelaskan di bawah ini. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

To create a browserify bundle and use it as a preload script, something like the following should be used:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `electron` 
  - `kerusakanReporter`
  - `penangkapDesktop`
  - `ipcRenderer`
  - `gambarasli`
  - `remot`
  - `webBingkai`
- `events`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code.
- Beberapa bug pada mesin V8 memungkinkan kode berbahaya mengakses API pramuat perender, yang secara efektif memberikan akses penuh ke sistem melalui modul `remote`.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.