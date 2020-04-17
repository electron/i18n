# webBingkai

> Sesuaikan render halaman web saat ini.

Processo: [Renderizador](../glossary.md#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Contoh dari halaman saat ini pembesaran 200%.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Methods

The `WebFrame` class has the following instance methods:

### `webBingkai.tetapkanFaktorZoom(faktor)`

* `faktor` Angka - Faktor zoom.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `webBingkai.tetapkanFaktorZoom()`

Kembali `nomor` - faktor zoom saat ini.

### `webBingkai.tetapkanFaktorZoom(level)`

* `level` Angka - level zoom.

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan.

### `webBingkai.dapatkanLevelZoom()`

Kembali `nomor` - tingkat zoom saat ini.

### `webBingkai.setBatasLevelVisualZoom(minimalLevel, maksimalLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  webFrame.setVisualZoomLevelLimits(1, 3)`

### `webBingkai.tetapkanBatasLevelZoomTataletak(minimalLevel, maksimaLevel)`

* `minimumLevel` Nomor
* `minimumLevel` Nomor

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

### `webFrame.setSpellCheckProvider(language, provider)`

* `bahasa` String
* `provider` Object
  * `spellCheck` Function.
    * `words` String[]
    * `callback ` Fungsi
      * `misspeltWords` String[]

Menetapkan penyedia pemeriksaan ejaan di bidang masukan dan area teks.

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

Contoh menggunakan [node-cekEjaan](https://github.com/atom/node-spellchecker) sebagai penyedia:

```javascript
const { webFrame } = require('electron')
const spellChecker = require('spellchecker')
webFrame.setSpellCheckProvider('en-US', {
  spellCheck (words, callback) {
    setTimeout(() => {
      const spellchecker = require('spellchecker')
      const misspelled = words.filter(x => spellchecker.isMisspelled(x))
      callback(misspelled)
    }, 0)
  }
})
```

### `webFrame.insertCSS(css)`

* `css` String - CSS source code.

Inserts `css` as a style sheet in the document.

### `webFrame.insertText(text)`

* `teks` String

Sisipan `teks` ke elemen yang terfokus.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `id` String
* `userGesture` Boolean (opsional) - Default adalah `false`.
* `callback` Function (optional) - Called after script has been executed.
  * `hasil` Ada

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

**[Deprecated Soon](modernization/promisification.md)**

### `webFrame.executeJavaScript(code[, userGesture])`

* `id` String
* `userGesture` Boolean (opsional) - Default adalah `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsional) - Default adalah `false`.
* `callback` Function (optional) - Called after script has been executed.
  * `hasil` Ada

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

**[Deprecated Soon](modernization/promisification.md)**

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsional) - Default adalah `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)` _(Deprecated)_

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)` _(Deprecated)_

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Set the name of the isolated world. Useful in devtools.</p>

<h3 spaces-before="0"><code>webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)` _(Deprecated)_</h3>

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.setIsolatedWorldInfo(worldId, info)`
* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `info` Object
  * `securityOrigin` String (optional) - Security origin for the isolated world.
  * `csp` String (optional) - Content Security Policy for the isolated world.
  * `name` String (optional) - Name for isolated world. Useful in devtools.

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

### `webFrame.getResourceUsage()`

Mengembalikan `Objek`:

* `gambar` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `xslStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `Huruf` [DetailPemakaianMemori](structures/memory-usage-details.md)
* `lain` [DetailPemakaianMemori](structures/memory-usage-details.md)

Mengembalikan objek yang menjelaskan informasi penggunaan memori internal Blink cache.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

Ini akan menghasilkan:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Upaya untuk membebaskan memori yang tidak lagi digunakan (seperti gambar dari a navigasi sebelumnya).

Perhatikan bahwa secara membabi buta memanggil metode ini mungkin membuat Electron lebih lambat sejak itu harus mengisi ulang cache yang dikosongkan ini, sebaiknya Anda hanya menelponnya jika sebuah acara di aplikasi Anda telah terjadi yang membuat Anda menganggap halaman Anda benar-benar menggunakan lebih sedikit memori (yaitu Anda telah menavigasi dari halaman super berat ke yang kebanyakan kosong, dan berniat untuk tinggal di sana).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - CSS selector for a frame element.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Returns <code>WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.</p>

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - An `Integer` representing the unique frame id in the current renderer process. Routing IDs can be retrieved from `WebFrame` instances (`webFrame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## Properti/peralatan

### `webFrame.top`

A `WebFrame` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener`

A `WebFrame` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent`

A `WebFrame` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild`

A `WebFrame` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling`

A `WebFrame` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId`

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.
