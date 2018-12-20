# remot

> Gunakan modul proses utama dari proses renderer.

Proses:[Renderer](../glossary.md#renderer-process)

The `remote` Modul menyediakan cara sederhana untuk melakukan komunikasi antar proses (IPC) antara proses renderer (halaman web) dan proses utama.

Di Elektron, modul yang berhubungan dengan GUI (seperti `dialog`,`menu` etc.) hanya tersedia dalam proses utama, bukan dalam proses renderer. Untuk menggunakannya Dari proses renderer, `ipc` modul diperlukan untuk mengirim antar proses pesan ke proses utama. Dengan `remote` modul, Anda dapat memanggil metode dari objek proses utama tanpa secara eksplisit mengirim pesan antar proses, mirip dengan Java [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). Contoh membuat jendela browser dari a Proses renderer:

```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Note:** For the reverse (access the renderer process from the main process), you can use [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

**Note:** The remote module can be disabled for security reasons in the following contexts:

* [`BrowserWindow`](browser-window.md) - by setting the `enableRemoteModule` option to `false`.
* [`<webview>`](webview-tag.md) - by setting the `enableremotemodule` attribute to `false`.

## Objek Jarak Jauh

Each object (including functions) returned by the `remote` module represents an object in the main process (we call it a remote object or remote function). When you invoke methods of a remote object, call a remote function, or create a new object with the remote constructor (function), you are actually sending synchronous inter-process messages.

In the example above, both [`BrowserWindow`](browser-window.md) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Instead, it created a `BrowserWindow` object in the main process and returned the corresponding remote object in the renderer process, namely the `win` object.

**Note:** Only [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) which are present when the remote object is first referenced are accessible via remote.

**Note:** Arrays and Buffers are copied over IPC when accessed via the `remote` module. Modifying them in the renderer process does not modify them in the main process and vice versa.

## Lifetime dari Remote Objects

Electron makes sure that as long as the remote object in the renderer process lives (in other words, has not been garbage collected), the corresponding object in the main process will not be released. When the remote object has been garbage collected, the corresponding object in the main process will be dereferenced.

If the remote object is leaked in the renderer process (e.g. stored in a map but never freed), the corresponding object in the main process will also be leaked, so you should be very careful not to leak remote objects.

Primary value types like strings and numbers, however, are sent by copy.

## Melewati callback ke proses utama

Code in the main process can accept callbacks from the renderer - for instance the `remote` module - but you should be extremely careful when using this feature.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

For instance you can't use a function from the renderer process in an `Array.map` called in the main process:

```javascript
// peta proses utamaNumbers.js
export.withRendererCallback = (mapper) => {
  kembali [1, 2, 3] .map(mapper)
}

export.withLocalCallback = () = > {
  kembali [1, 2, 3] .map(x => x + 1)
}
```

```javascript
// renderer proses
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [terdefinidi, terdefinisi, terdefinisi], [2, 3, 4]
```

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
membutuhkan ('elektron'). remote.getCurrentWindow().pada ('close', () => {
  // jendela ditutup ...
})
```

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## Mengakses modul built-in dalam proses utama

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require ('elektron'). remote.app
console.log (app)
```

## Metode

The `remote` module has the following methods:

### `remote.require (modul)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

```sh
proyek/
├── utama
│ ├── foo.js
│ └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// main process: main/index.js
const { app } = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// beberapa modul relatif: main/foo.js
module.exports = 'bar'
```

```js
// proses renderer: renderer/index.js
const foo = require ('electron'). remote.require ('./ foo') // bar
```

### `remote.getCurrentWindow ()`

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

**Note:** Do not use `removeAllListeners` on [`BrowserWindow`](browser-window.md). Use of this can remove all [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) listeners, disable click events on touch bar buttons, and other unintended consequences.

### `remote.getCurrentWebContents ()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* ` nama </ 0>  Deretan</li>
</ul>

<p>Returns <code>any` - The global variable of `name` (e.g. `global[name]`) in the main process.</p> 
    ## properti
    
    ### `remote.process`
    
    The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.