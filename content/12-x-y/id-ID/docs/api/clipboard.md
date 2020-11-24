# clipboard

> Lakukan operasi copy dan paste pada clipboard sistem.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Methods

The ` clipboard </ 0> modul memiliki metode berikut:</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> Experimental APIs are marked as such and could be removed in future.</p>

<h3 spaces-before="0"><code>clipboard.readText ( [type] )`</h3>

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai teks biasa.</p>

<pre><code class="js">const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
`</pre>

### `clipboard.menulis tek (teks [, tipe])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Menuliskan ` teks </ 0> ke clipboard sebagai teks biasa.</p>

<pre><code class="js">const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
`</pre>

### `clipboard.readHTML ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai markup.</p>

<pre><code class="js">const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
`</pre>

### `clipboard.menulisHTML (markup [, tipe])`

* ` markup </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Menulis ` markup </ 0> ke clipboard.</p>

<pre><code class="js">const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
`</pre>

### `clipboard.readImage ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Mengembalikan

` NativeImage </ 0> - Konten gambar di clipboard.</p>

<h3 spaces-before="0"><code>clipboard.writeImage (gambar [, tipe])`</h3> 

* ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Menulis ` gambar </ 0> ke clipboard.</p>

<h3 spaces-before="0"><code>clipboard.readRTF ( [type] )`</h3> 

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Mengembalikan ` String </ 0> - Konten di clipboard sebagai RTF.</p>

<pre><code class="js">const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
`</pre> 



### `clipboard.writeRTF (teks [, jenis])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Menuliskan ` teks </ 0> ke clipboard di RTF.</p>

<pre><code class="js">const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
`</pre> 



### `clipboard.readBookmark()` _macOS_ _Windows_

Mengembalikan `Objek`:

* ` judul</ 0>  String</li>
<li><code> url </ 0> String</li>
</ul>

<p spaces-before="0">Mengembalikan objek yang berisi <code> judul </ 0> dan <code> url </ 0> yang mewakili penanda di clipboard. Nilai <code> judul</ 0> dan <code> url </ 0> akan menjadi string kosong bila bookmark tidak tersedia.</p>

<h3 spaces-before="0"><code>clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_</h3> 
  * ` judul</ 0>  String</li>
<li><code> url </ 0> String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.
Menulis ` judul </ 0> dan <code> url </ 0> ke clipboard sebagai bookmark.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> Most apps on Windows don't support pasting bookmarks into them so
you can use <code>clipboard.write` to write both a bookmark and fallback text to the clipboard.



```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```




### `clipboard.readFindText()` _macOS_

Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.

This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.



### `clipboard.writeFindText(text)` _macOS_

* `teks` String
Writes the `text` into the find pasteboard (the pasteboard that holds information about the current state of the active application’s find panel) as plain text. This method uses synchronous IPC when called from the renderer process.



### `clipboard.clear ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.
Membersihkan konten clipboard.



### `clipboard.availableFormats ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.
Mengembalikan ` String [] </ 0> - Kumpulan format yang didukung untuk clipboard <code> ketik </ 0> .</p>

<pre><code class="js">const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
`</pre> 



### `clipboard.has(format[, type])` _Experimental_

* ` format </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pengembalian ` Boolean </ 0> - Apakah clipboard mendukung ditentukan <code> Format </ 0> .</p>

<pre><code class="js">const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
`</pre> 



### `clipboard.read(format)` _Experimental_

* ` format </ 0>  String</li>
</ul>

<p spaces-before="0">Mengembalikan <code> String </ 0> - Membaca <code> format </ 0> ketik dari clipboard.</p>

<h3 spaces-before="0"><code>clipboard.readBuffer(format)` _Experimental_</h3> 
  * ` format </ 0>  String</li>
</ul>

<p spaces-before="0">Mengembalikan <code> Buffer </ 0> - Membaca <code> format </ 0> ketik dari clipboard.</p>

<pre><code class="js">const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
`</pre> 

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* ` format </ 0>  String</li>
<li><code>penyangga` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.
Menulis ` penyangga </ 0> ke clipboard sebagai <code> Format </ 0> .</p>

<pre><code class="js">const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
`</pre> 



### `clipboard.write (data [, type])`

* `data` Object 
    * ` teks </ 0>  String (opsional)</li>
<li><code> html </ 0>  String (opsional)</li>
<li><code> gambar </ 0>  <a href="native-image.md"> NativeImage </ 1> (opsional)</li>
<li><code> rtf </ 0>  String (opsional)</li>
<li><code>bookmark` String (optional) - The title of the URL at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Menulis ` data </ 0> ke clipboard.</p>

<pre><code class="js">const { clipboard } = require('electron')

clipboard.write({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  bookmark: 'a title'
})

console.log(clipboard.readText())
// 'test'

console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
`</pre>
