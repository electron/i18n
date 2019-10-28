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

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as plain text.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.menulis tek (teks [, tipe])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Writes the `text` into the clipboard as plain text.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as markup.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.menulisHTML (markup [, tipe])`

* ` markup </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Writes `markup` to the clipboard.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage (gambar [, tipe])`

* ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Writes `image` to the clipboard.

### `clipboard.readRTF ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as RTF.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF (teks [, jenis])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Writes the `text` into the clipboard in RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` *macOS* *Windows*

Mengembalikan `Objek`:

* ` judul</ 0>  String</li>
<li><code> url </ 0> Tali</li>
</ul>

<p>Returns an Object containing <code>title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.</p> 
  ### ` clipboard.menulisBookmark (judul, url [, tipe]) </ 0>  <em> macos </ 1>  <em> jendela </ 1></h3>

<ul>
<li><code> judul </ 0> String</li>
<li><code>url` Tali</li> 
  
  * `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.</ul> 
  
  Writes the `title` and `url` into the clipboard as a bookmark.
  
  **Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.
  
  ```js
  const { clipboard } = require('electron')
  
  clipboard.writeBookmark({
    text: 'https://electronjs.org',
    bookmark: 'Electron Homepage'
  })
  ```
  
  ### `clipboard.readFindText()` *macOS*
  
  Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.
  
  This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.
  
  ### `clipboard.writeFindText(text)` * macos*
  
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
  
  ### ` clipboard.has (format [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.</li> </ul> 
  
  Pengembalian ` Boolean </ 0> - Apakah clipboard mendukung ditentukan <code> Format </ 0> .</p>

<pre><code class="js">const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
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

<pre><code class="js">const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
`</pre> 
  
  ### ` clipboard.writeBuffer (format, buffer [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>penyangga` Buffer</li> 
  
  * `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.</ul> 
  
  Menulis ` penyangga </ 0> ke clipboard sebagai <code> Format </ 0> .</p>

<pre><code class="js">const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
`</pre> 
  
  ### `clipboard.write (data [, type])`
  
  * `data` Obyek 
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