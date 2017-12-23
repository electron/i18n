# clipboard

> Lakukan operasi copy dan paste pada clipboard sistem.

Proses:  Utama </ 0> ,  Renderer </ 1></p> 

Contoh berikut menunjukkan cara menulis string ke clipboard:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

Pada sistem X Window, ada juga clipboard pilihan. Untuk memanipulasinya, Anda harus melewati ` pilihan </ 0> untuk setiap metode:</p>

<pre><code class="javascript">const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
`</pre> 

## Metode

The ` clipboard </ 0> modul memiliki metode berikut:</p>

<p><strong> Catatan: </ 0> API Eksperimental ditandai seperti itu dan dapat dihapus di masa mendatang.</p>

<h3><code>clipboard.baca teks ( [tipe] )`</h3> 

* ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Mengembalikan <code> String </ 0> - Konten di clipboard sebagai teks biasa.</p>

<h3><code>clipboard.menulis tek (teks [, tipe])`</h3> 
  * ` teks </ 0>  String</li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Menuliskan <code> teks </ 0> ke clipboard sebagai teks biasa.</p>

<h3><code>clipboard.readHTML ( [type] )`</h3> 
    * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Mengembalikan <code> String </ 0> - Konten di clipboard sebagai markup.</p>

<h3><code>clipboard.menulisHTML (markup [, tipe])`</h3> 
      * ` markup </ 0>  String</li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes <code>markup` to the clipboard.</p> 
        ### `clipboard.readImage([type])`
        
        * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Mengembalikan <a href="native-image.md"><code> NativeImage </ 0> - Konten gambar di clipboard.</p>

<h3><code>clipboard.writeImage (gambar [, tipe])`</h3> 
          * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Menulis <code> gambar </ 0> ke clipboard.</p>

<h3><code>clipboard.readRTF ( [type] )`</h3> 
            * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String` - The content in the clipboard as RTF.</p> 
              ### `clipboard.writeRTF(text[, type])`
              
              * `text` String
              * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Menuliskan <code> teks </ 0> ke clipboard di RTF.</p>

<h3><code> clipboard.readBookmark () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h3>

<p>Mengembalikan <code> Objek </ 0> :</p>

<ul>
<li><code> judul </ 0> String</li>
<li><code> url </ 0>  String</li>
</ul>

<p>Mengembalikan objek yang berisi <code> judul </ 0> dan <code> url </ 0> yang mewakili penanda di clipboard. Nilai <code> judul</ 0> dan <code> url </ 0> akan menjadi string kosong bila bookmark tidak tersedia.</p>

<h3><code> clipboard.menulisBookmark (judul, url [, tipe]) </ 0>  <em> macos </ 1>  <em> jendela </ 1></h3>

<ul>
<li><code> judul</ 0>  String</li>
<li><code> url </ 0>  String</li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>title` and `url` into the clipboard as a bookmark.</p> 
                **Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.
                
                ```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```
            
            ### `clipboard.readFindText()` *macOS*
            
            Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.
            
            ### `clipboard.writeFindText(text)` *macOS*
            
            * `text` String
            
            Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.
            
            ### `clipboard.clear([type])`
            
            * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Membersihkan konten clipboard.</p>

<h3><code>clipboard.availableFormats([type])`</h3> 
              * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String[]` - An array of supported formats for the clipboard `type`.</p> 
                ### `clipboard.has(format[, type])` *Experimental*
                
                * `format` String
                * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>Boolean` - Whether the clipboard supports the specified `format`.</p> 
                  ```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```
              
              ### `clipboard.read(format)` *Experimental*
              
              * `format` String
              
              Returns `String` - Reads `format` type from the clipboard.
              
              ### `clipboard.readBuffer(format)` *Experimental*
              
              * `format` String
              
              Returns `Buffer` - Reads `format` type from the clipboard.
              
              ### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*
              
              * `format` String
              * `buffer` Buffer
              * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>buffer` into the clipboard as `format`.</p> 
                ### `clipboard.write(data[, type])`
                
                * `data` Obyek 
                  * `text` String (optional)
                  * `html` String (optional)
                  * `image` [NativeImage](native-image.md) (optional)
                  * `rtf` String (optional)
                  * `bookmark` String (optional) - The title of the url at `text`.
                * ` ketik </ 0>  String (opsional)</li>
</ul>

<pre><code class="javascript">const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
`</pre> 
                  Writes `data` to the clipboard.