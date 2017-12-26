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
* `callback` Fungsi (opsional) - Jika ditentukan akan tampil terbuka secara asinkron. *macOS* 
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mengembalikan <code> Boolean </ 0> - Apakah sebuah aplikasi tersedia untuk membuka URL. Jika callback ditentukan, selalu mengembalikan true.</p>

<p>Buka URL protokol eksternal yang diberikan dengan cara default desktop. (Misalnya, mailto: URL di agen email default pengguna).</p>

<h3><code>shell.moveItemToTrash(fullPath)`</h3> 
    * `fullPath` String
    
    Returns `Boolean` - Whether the item was successfully moved to the trash
    
    Pindahkan file yang diberikan ke sampah dan mengembalikan status boolean untuk pengoperasiannya.
    
    ### `shell.beep()`
    
    Play the beep sound.
    
    ### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*
    
    * `shortcutPath` String
    * `operation` String (optional) - Default is `create`, bisa jadi salah satu dari berikut ini: 
      * `create` - Creates a new shortcut, overwriting if necessary.
      * `update` - Updates specified properties only on an existing shortcut.
      * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
    * `options` [ShortcutDetails](structures/shortcut-details.md)
    
    Returns `Boolean` - Whether the shortcut was created successfully
    
    Membuat atau memperbarui tautan pintasan di ` shortcutPath </ 0> .</p>

<h3><code>shell.readShortcutLink(shortcutPath)` *Windows*</h3> 
    
    * `shortcutPath` String
    
    Returns [`ShortcutDetails`](structures/shortcut-details.md)
    
    Resolves the shortcut link at `shortcutPath`.
    
    Pengecualian akan dilemparkan saat terjadi kesalahan.