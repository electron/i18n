# jalan pintas global

> Deteksi kejadian keyboard saat aplikasi tidak memiliki fokus keyboard.

Proses:  Utama </ 0></p> 

The ` globalShortcut </ 0> modul dapat mendaftarkan / unregister shortcut keyboard global dengan sistem operasi sehingga Anda dapat menyesuaikan operasi untuk berbagai cara pintas.</p>

<p><strong> Catatan: </ 0> Jalan pintas bersifat global; itu akan bekerja bahkan jika aplikasi tidak memiliki fokus keyboard. Anda tidak boleh menggunakan modul ini sampai event <code> ready </ 0>
 dari modul aplikasi dipancarkan.</p>

<pre><code class="javascript">const {app, globalShortcut} = memerlukan ('elektron') app.on ('siap', () = & gt; {
   // Daftarkan pendatang jalan pintas 'CommandOrControl + X'.
  const (= perintah) = ()perintah atau Control + X ', () = & gt; {
     console.log (' perintah atau Control + X ditekan ')
   })

   if (! ret) {
     console.log (' registrasi gagal ')
   }

   / / Periksa apakah jalan pintas sudah terdaftar.
  console.log (globalShortcut.isRegistered ('CommandOrControl+X'))
})

app.on ('will-quit', () => {
  // Unregister shortcut.
  globalShortcut.unregister ('CommandOrControl + X')

  // Unregister semua jalan pintas.
  globalShortcut.unregisterAll ()
})
`</pre> 

## Methods

Modul ` globalShortcut ` memiliki metode berikut:

### `globalShortcut.register (akselerator, callback)`

* ` akselerator ` [ Accelerator ](accelerator.md)
* `callback ` Fungsi

Mendaftarkan pintasan global ` akselerator </ 0> . The <code> callback </ 0> disebut ketika shortcut yang terdaftar ditekan oleh pengguna.</p>

<p>Bila akselerator sudah diambil oleh aplikasi lain, panggilan ini akan diam-diam gagal. Perilaku ini dimaksudkan oleh sistem operasi, karena mereka tidak ingin aplikasi berjuang untuk jalan pintas global.</p>

<h3><code>globalShortcut.isRegistered (akselerator)`</h3> 

* ` akselerator </ 0>  <a href="accelerator.md"> Akselerator </ 1></li>
</ul>

<p>Mengembalikan <code> Boolean </ 0> - Apakah aplikasi ini telah terdaftar <code> akselerator </ 0> .</p>

<p>Bila akselerator sudah diambil oleh aplikasi lain, panggilan ini tetap akan kembali <code> salah</ 0> . Perilaku ini dimaksudkan oleh sistem operasi, karena mereka tidak ingin aplikasi berjuang untuk jalan pintas global.</p>

<h3><code>globalShortcut.unregister (akselerator)`</h3> 
    * ` akselerator ` [ Accelerator ](accelerator.md)
    
    Unregisters jalan pintas global ` akselerator </ 0> .</p>

<h3><code>globalShortcut.unregisterAll ()`</h3> 
    
    Unregisters semua jalan pintas global.