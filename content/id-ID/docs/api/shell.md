# kulit

> Kelola file dan URL menggunakan aplikasi bawaan mereka.

Proses:  Utama </ 0> ,  Renderer </ 1></p> 

The ` shell </ 0> modul menyediakan fungsi yang berkaitan dengan integrasi desktop.</p>

<p>Contoh membuka URL di browser default pengguna:</p>

<pre><code class="javascript">const {shell} = require('electron')

shell.openExternal('https://github.com')
`</pre> 

## Metode

The ` shell </ 0> modul memiliki metode berikut:</p>

<h3><code>shell.showItemInFolder(fullPath)`</h3> 

* `fullPath` String

Mengembalikan ` Boolean </ 0> - Apakah item berhasil ditampilkan</p>

<p>Tampilkan file yang diberikan di file manager. Jika memungkinkan, pilih file.</p>

<h3><code>shell.openItem(fullPath)`</h3> 

* `fullPath` String

Mengembalikan ` Boolean </ 0> - Apakah item berhasil dibuka</p>

<p>Buka file yang diberikan dengan cara default desktop.</p>

<h3><code>shell.openExternal(url[, options, callback])`</h3> 

* ` url </ 0>  String</li>
<li><code>pilihan` Objek (opsional) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Returns <code>Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.</p> 
    Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).
    
    ### `shell.moveItemToTrash(fullPath)`
    
    * `fullPath` String
    
    Returns `Boolean` - Whether the item was successfully moved to the trash
    
    Move the given file to trash and returns a boolean status for the operation.
    
    ### `shell.beep()`
    
    Play the beep sound.
    
    ### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*
    
    * `shortcutPath` String
    * `operation` String (optional) - Default is `create`, can be one of following: 
      * `create` - Creates a new shortcut, overwriting if necessary.
      * `update` - Updates specified properties only on an existing shortcut.
      * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
    * `options` [ShortcutDetails](structures/shortcut-details.md)
    
    Returns `Boolean` - Whether the shortcut was created successfully
    
    Creates or updates a shortcut link at `shortcutPath`.
    
    ### `shell.readShortcutLink(shortcutPath)` *Windows*
    
    * `shortcutPath` String
    
    Returns [`ShortcutDetails`](structures/shortcut-details.md)
    
    Resolves the shortcut link at `shortcutPath`.
    
    An exception will be thrown when any error happens.