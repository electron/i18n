# webBingkai

> Sesuaikan render halaman web saat ini.

Proses:[Renderer](../glossary.md#renderer-process)

An example of zooming current page to 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Methods

The `webFrame` module has the following methods:

### `webBingkai.tetapkanFaktorZoom(faktor)`

* `faktor` Angka - Faktor zoom.

Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.

### `webBingkai.tetapkanFaktorZoom()`

Returns `Number` - The current zoom factor.

### `webBingkai.tetapkanFaktorZoom(level)`

* `level` Angka - level zoom.

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan.

### `webBingkai.dapatkanLevelZoom()`

Returns `Number` - The current zoom level.

### `webBingkai.setBatasLevelVisualZoom(minimalLevel, maksimalLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

### `webBingkai.tetapkanBatasLevelZoomTataletak(minimalLevel, maksimaLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

### `webBingkai.setPenyediaPeriksaEjaan(bahasa, otomatisBenarkanKata, penyedia)`

* `bahasa` String
* `otomatisBenarkanKata` Boolean
* `penyedia` Obyek 
  * `cekEjaan` Fungsi - kembali `boolean`. 
    * `teks` String

Sets a provider for spell checking in input fields and text areas.

The `provider` must be an object that has a `spellCheck` method that returns whether the word passed is correctly spelled.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `skema` String

Registers the `scheme` as secure scheme.

Secure schemes do not trigger mixed content warnings. For example, `https` and `data` are secure schemes because they cannot be corrupted by active network attackers.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `skema` String

Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `skema` String
* `pilihan` Objek (pilihan) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `teks` String

Sisipan `teks` ke elemen yang terfokus.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (opsional) - Default adalah `false`.
* `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
  * `hasil` Ada

Mengembalikan `Janji` - Janji yang diselesaikan dengan hasil kode yang dijalankan atau ditolak jika hasil dari kode tersebut adalah janji yang ditolak.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsional) - Default adalah `false`.
* `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
  * `hasil` Ada

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* ` nama </ 0>  String</li>
</ul>

<p>Set the name of the isolated world. Useful in devtools.</p>

<h3><code>webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`</h3> 
  * `worldId` Integer
  * `securityOrigin` String
  
  Set the security origin of the isolated world.
  
  ### `webFrame.getResourceUsage()`
  
  Mengembalikan `Objek`:
  
  * `images` [MemoryUsageDetails](structures/memory-usage-details.md)
  * `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
  * `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
  * `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
  * `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
  * `other` [MemoryUsageDetails](structures/memory-usage-details.md)
  
  Returns an object describing usage information of Blink's internal memory caches.
  
  ```javascript
  onst {webFrame} = require('electron')
  console.log(webFrame.getResourceUsage())
  ```
  
  This will generate:
  
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
  
  Attempts to free memory that is no longer being used (like images from a previous navigation).
  
  Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).