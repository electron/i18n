# clipboard

> Lakukan operasi copy dan paste pada clipboard sistem.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

Contoh berikut menunjukkan cara menulis string ke clipboard:

```javascript
const { clipboard } = require ('electron') clipboard.writeText (' String Contoh ')
```

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require ('electron') clipboard.writeText ('Example String ', 'selection') console.log (clipboard.readText ('selection'))
```

## Methods

The ` clipboard </ 0> modul memiliki metode berikut:</p>

<p><strong> Catatan: </ 0> API Eksperimental ditandai seperti itu dan dapat dihapus di masa mendatang.</p>

<h3><code>clipboard.readText ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai teks biasa.</p>

<h3><code>clipboard.menulis tek (teks [, tipe])`</h3> 

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Menuliskan ` teks </ 0> ke clipboard sebagai teks biasa.</p>

<h3><code>clipboard.readHTML ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai markup.</p>

<h3><code>clipboard.menulisHTML (markup [, tipe])`</h3> 

* ` markup </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Menulis ` markup </ 0> ke clipboard.</p>

<h3><code>clipboard.readImage ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Mengembalikan ` NativeImage </ 0> - Konten gambar di clipboard.</p>

<h3><code>clipboard.writeImage (gambar [, tipe])`</h3> 

* ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Menulis ` gambar </ 0> ke clipboard.</p>

<h3><code>clipboard.readRTF ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai RTF.</p>

<h3><code>clipboard.writeRTF (teks [, jenis])`</h3> 

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Menuliskan ` teks </ 0> ke clipboard di RTF.</p>

<h3><code>clipboard.readBookmark()` *macOS* *Windows*</h3> 

Mengembalikan `Objek`:

* ` judul</ 0>  String</li>
<li><code> url </ 0> Tali</li>
</ul>

<p>Mengembalikan objek yang berisi <code> judul </ 0> dan <code> url </ 0> yang mewakili penanda di clipboard. Nilai <code> judul</ 0> dan <code> url </ 0> akan menjadi string kosong bila bookmark tidak tersedia.</p>

<h3><code> clipboard.menulisBookmark (judul, url [, tipe]) </ 0>  <em> macos </ 1>  <em> jendela </ 1></h3>

<ul>
<li><code> judul </ 0> String</li>
<li><code>url` Tali
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Menulis ` judul </ 0> dan <code> url </ 0> ke clipboard sebagai bookmark.</p>

<p><strong> Catatan: </ 0> Sebagian besar aplikasi di Windows tidak mendukung penandaan bookmark ke dalamnya sehingga Anda dapat menggunakan <code> clipboard.write </ 1> untuk menulis teks bookmark dan fallback ke clipboard.</p>

<pre><code class="js">clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
`</pre> 

### `clipboard.readFindText()` *macOS*

Mengembalikan ` String </ 0> - Teks pada papan gambar yang ditemukan. Metode ini menggunakan synchronous IPC saat dipanggil dari proses renderer. Nilai cache dibaca ulang dari papan gambar anyar setiap kali aplikasi diaktifkan.</p>

<h3><code>clipboard.writeFindText(text)` * macos*</h3> 

* `teks` String

Menuliskan ` teks </ 0> ke dalam papan tulis yang ditemukan sebagai teks biasa. Metode ini menggunakan synchronous IPC saat dipanggil dari proses renderer.</p>

<h3><code>clipboard.clear ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Membersihkan konten clipboard.

### `clipboard.availableFormats ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Mengembalikan ` String [] </ 0> - Kumpulan format yang didukung untuk clipboard <code> ketik </ 0> .</p>

<h3><code> clipboard.has (format [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.</li> </ul> 

Pengembalian ` Boolean </ 0> - Apakah clipboard mendukung ditentukan <code> Format </ 0> .</p>

<pre><code class="javascript">const { clipboard } = require ('electron') console.log (clipboard.has (' &lt;p&gt; selection </ 0> '))
`</pre> 

### ` clipboard.read (format) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
</ul>

<p>Mengembalikan <code> String </ 0> - Membaca <code> format </ 0> ketik dari clipboard.</p>

<h3><code> clipboard.readBuffer (format) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
</ul>

<p>Mengembalikan <code> Buffer </ 0> - Membaca <code> format </ 0> ketik dari clipboard.</p>

<h3><code> clipboard.writeBuffer (format, buffer [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>penyangga` Buffer</li> 

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.</ul> 

Menulis ` penyangga </ 0> ke clipboard sebagai <code> Format </ 0> .</p>

<h3><code>clipboard.write (data [, type])`</h3> 

* `data` Obyek 
  * ` teks </ 0>  String (opsional)</li>
<li><code> html </ 0>  String (opsional)</li>
<li><code> gambar </ 0>  <a href="native-image.md"> NativeImage </ 1> (opsional)</li>
<li><code> rtf </ 0>  String (opsional)</li>
<li><code> bookmark </ 0>  String (opsional) - Judul url di <code> teks </ 0> .</li>
</ul></li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.
  ```javascript
  const { clipboard } = require('electron')
  clipboard.write({ text: 'test', html: '<b>test</b>' })
  ```
  
  Menulis  data </ 0> ke clipboard.</p>