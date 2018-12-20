# clipboard

> Lakukan operasi copy dan paste pada clipboard sistem.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

The following example shows how to write a string to the clipboard:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String')
```

On X Window systems, there is also a selection clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Methods

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.baca teks ( [tipe] )`

* ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String` - The content in the clipboard as plain text.</p> 
  ### `clipboard.menulis tek (teks [, tipe])`
  
  * `teks` String
  * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>text` into the clipboard as plain text.</p> 
    ### `clipboard.readHTML ( [type] )`
    
    * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String` - The content in the clipboard as markup.</p> 
      ### `clipboard.menulisHTML (markup [, tipe])`
      
      * ` markup </ 0>  String</li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes <code>markup` to the clipboard.</p> 
        ### `clipboard.readImage ( [type] )`
        
        * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <a href="native-image.md"><code>NativeImage`</a> - The image content in the clipboard.</p> 
          ### `clipboard.writeImage (gambar [, tipe])`
          
          * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes <code>image` to the clipboard.</p> 
            ### `clipboard.readRTF ( [type] )`
            
            * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String` - The content in the clipboard as RTF.</p> 
              ### `clipboard.writeRTF (teks [, jenis])`
              
              * `teks` String
              * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>text` into the clipboard in RTF.</p> 
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
                  
                  * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>title` and `url` into the clipboard as a bookmark.</p> 
                    **Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.
                    
                    ```js
                    clipboard.write({
                      text: 'https://electronjs.org',
                      bookmark: 'Electron Homepage'
                    })
                    ```
                    
                    ### `clipboard.readFindText()` *macOS*
                    
                    Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.
                    
                    ### `clipboard.writeFindText(text)` *macOS*
                    
                    * `teks` String
                    
                    Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.
                    
                    ### `clipboard.clear ( [type] )`
                    
                    * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Clears the clipboard content.</p>

<h3><code>clipboard.availableFormats ( [type] )`</h3> 
                      * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>String[]` - An array of supported formats for the clipboard `type`.</p> 
                        ### ` clipboard.has (format [, tipe]) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code> format </ 0>  String</li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<p>Returns <code>Boolean` - Whether the clipboard supports the specified `format`.</p> 
                        
                        ```javascript
                        const { clipboard } = require('electron')
                        console.log(clipboard.has('<p>selection</p>'))
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
                        
                        * ` ketik </ 0>  String (opsional)</li>
</ul>

<p>Writes the <code>buffer` into the clipboard as `format`.</p> 
                          ### `clipboard.write (data [, type])`
                          
                          * `data` Obyek 
                            * ` teks </ 0>  String (opsional)</li>
<li><code> html </ 0>  String (opsional)</li>
<li><code> gambar </ 0>  <a href="native-image.md"> NativeImage </ 1> (opsional)</li>
<li><code> rtf </ 0>  String (opsional)</li>
<li><code> bookmark </ 0>  String (opsional) - Judul url di <code> teks </ 0> .</li>
</ul></li>
<li><code> ketik </ 0>  String (opsional)</li>
</ul>

<pre><code class="javascript">const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
`</pre> 
                              Writes `data` to the clipboard.