# kulit

> Kelola file dan URL menggunakan aplikasi bawaan mereka.

Proses:  Utama </ 0> ,  Renderer </ 1></p> 

The ` shell </ 0> modul menyediakan fungsi yang berkaitan dengan integrasi desktop.</p>

<p>Contoh membuka URL di browser default pengguna:</p>

<pre><code class="javascript">const {shell} = require('electron') shell.openExternal ('https://github.com')
`</pre> 

## Metode

The ` shell </ 0> modul memiliki metode berikut:</p>

<h3><code>shell.showItemInFolder(fullPath)`</h3> 

* `fullPath` String

Mengembalikan ` Boolean </ 0> - Apakah item berhasil ditampilkan</p>

<p>Tampilkan file yang diberikan di file manager. Jika memungkinkan, pilih file.</p>

<h3><code>shell.openItem(fullPath)`</h3> 

* `fullPath` String

Mengembalikan ` Boolean </ 0> - Apakah item berhasil dibuka.</p>

<p>Buka file yang diberikan dengan cara default desktop.</p>

<h3><code>shell.openExternal (url [, pilihan, callback])`</h3> 

* ` url </ 0> String</li>
<li><code>pilihan` Objek (opsional) *macOS* 
  * `Aktifkan` Aljabar Boolean - `benar` untuk membawa aplikasi dibuka latar depan. Default adalah `benar`.
* `callback` Fungsi (opsional) - Jika ditentukan akan tampil terbuka secara asinkron. *macOS* 
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mengembalikan <code> Boolean </ 0> - Apakah sebuah aplikasi tersedia untuk membuka URL. Jika callback ditentukan, selalu mengembalikan true.</p>

<p>Buka URL protokol eksternal yang diberikan dengan cara default desktop. (Misalnya, mailto: URL di agen email default pengguna).</p>

<h3><code>shell.moveItemToTrash(fullPath)`</h3> 
    * `fullPath` String
    
    Kembali `Boolean` - Apakah item berhasil dipindahkan ke tempat sampah
    
    Pindahkan file yang diberikan ke sampah dan mengembalikan status boolean untuk pengoperasiannya.
    
    ### `Shell.beep()`
    
    Bermain suara bip.
    
    ### `shell.writeShortcutLink (shortcutPath [, operasi], pilihan)` *Windows*
    
    * `shortcutPath` String
    * `operasi` String (opsional) - Default adalah `membuat`, bisa jadi salah satu dari berikut ini: 
      * `buat` - membuat shortcut baru, Timpa jika diperlukan.
      * `update` - update ditentukan properti hanya pada tombol cepat yang ada.
      * `menggantikan` - menimpa tombol cepat yang ada, gagal jika tidak ada jalan pintas.
    * `pilihan` [ShortcutDetails](structures/shortcut-details.md)
    
    Kembali `Boolean` - Apakah cara pintas telah dibuat berhasil
    
    Menciptakan atau update link pintasan di `shortcutPath`.
    
    ### `shell.readShortcutLink(shortcutPath)` *Windows*
    
    * `shortcutPath` String
    
    Kembali [`ShortcutDetails`](structures/shortcut-details.md)
    
    Menyelesaikan link pintasan di `shortcutPath`.
    
    Pengecualian akan dilemparkan ketika terjadi kesalahan.