# clipboard

> Lakukan operasi copy dan paste pada clipboard sistem.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

The following example shows how to write a string to the clipboard:

```javascript
const { clipboard } = require ('electron') clipboard.writeText (' String Contoh ')
```

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require ('electron') clipboard.writeText ('Example String ', 'selection') console.log (clipboard.readText ('selection'))
```

## Methods

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as plain text.

### `clipboard.menulis tek (teks [, tipe])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as markup.

### `clipboard.menulisHTML (markup [, tipe])`

* ` markup </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Writes `markup` to the clipboard.

### `clipboard.readImage ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage (gambar [, tipe])`

* ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Writes `image` to the clipboard.

### `clipboard.readRTF ( [type] )`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF (teks [, jenis])`

* `teks` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Writes the `text` into the clipboard in RTF.

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
  
  * `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.</ul> 
  
  Writes the `title` and `url` into the clipboard as a bookmark.
  
  **Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.
  
  ```js
  clipboard.write({
    text: 'https://electronjs.org',
    bookmark: 'Electron Homepage'
  })
  ```
  
  ### `clipboard.readFindText()` *macOS*
  
  Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.
  
  ### `clipboard.writeFindText(text)` * macos*
  
  * `teks` String
  
  Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.
  
  ### `clipboard.clear ( [type] )`
  
  * `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.
  
  Clears the clipboard content.
  
  ### `clipboard.availableFormats ( [type] )`
  
  * `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.
  
  Returns `String[]` - An array of supported formats for the clipboard `type`.
  
  ### ` clipboard.has (format [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.</li> </ul> 
  
  Returns `Boolean` - Whether the clipboard supports the specified `format`.
  
  ```javascript
  const { clipboard } = require ('electron') console.log (clipboard.has (' &lt;p&gt; selection </ 0> '))
  ```
  
  ### ` clipboard.read (format) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
</ul>

<p>Returns <code>String` - Reads `format` type from the clipboard.</p> 
  
  ### ` clipboard.readBuffer (format) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
</ul>

<p>Returns <code>Buffer` - Reads `format` type from the clipboard.</p> 
  
  ### ` clipboard.writeBuffer (format, buffer [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code>penyangga` Buffer</li> 
  
  * `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.</ul> 
  
  Writes the `buffer` into the clipboard as `format`.
  
  ### `clipboard.write (data [, type])`
  
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
    
    Writes `data` to the clipboard.