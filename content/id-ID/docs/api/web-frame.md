# webBingkai

> Sesuaikan render halaman web saat ini.

Proses:[Renderer](../glossary.md#renderer-process)

`webFrame` export of the electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Contoh dari halaman saat ini pembesaran 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Methods

The `WebFrame` class has the following instance methods:

### `webBingkai.tetapkanFaktorZoom(faktor)`

* `faktor` Angka - Faktor zoom.

Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.

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

Menetapkan penyedia pemeriksaan ejaan di bidang masukan dan area teks.

Dengan `penyedia` harus menjadi objek yang memiliki metode `cekEjaan`yang kembali apakah kata yang dilewati benar dieja.

Contoh menggunakan [node-cekEjaan](https://github.com/atom/node-spellchecker) sebagai penyedia:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `skema` String

Sumber daya akan dimuat dari skema `ini` terlepas dari halaman sekarang Kebijakan Keamanan Konten.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `skema` String
* `pilihan` Objek (opsional) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Mendaftarkan `skema` sebagai aman, bypass kebijakan keamanan konten untuk sumber daya, memungkinkan mendaftarkan ServiceWorker dan mendukung pengambilan API.

Tentukan pilihan dengan nilai `palsu` untuk menghilangkan itu dari pendaftaran. Contoh mendaftar skema istimewa, tanpa melewati Kebijakan Keamanan Konten:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* ` teks </ 0>  String</li>
</ul>

<p>Sisipan <code>teks` ke elemen yang terfokus.</p> 
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
    
    * `gambar` [DetailPemakaianMemori](structures/memory-usage-details.md)
    * `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
    * `cssStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
    * `xslStyleSheets` [DetailPemakaianMemori](structures/memory-usage-details.md)
    * `Huruf` [DetailPemakaianMemori](structures/memory-usage-details.md)
    * `lain` [DetailPemakaianMemori](structures/memory-usage-details.md)
    
    Mengembalikan objek yang menjelaskan informasi penggunaan memori internal Blink cache.
    
    ```javascript
    onst {webFrame} = require('electron')
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

<p>Returns <code>WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.</p> 
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