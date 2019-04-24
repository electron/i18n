# jalan pintas global

> Deteksi kejadian keyboard saat aplikasi tidak memiliki fokus keyboard.

Proses: [Main](../glossary.md#main-process)

The ` globalShortcut </ 0> modul dapat mendaftarkan / unregister shortcut keyboard global dengan sistem operasi sehingga Anda dapat menyesuaikan operasi untuk berbagai cara pintas.</p>

<p><strong> Catatan: </ 0> Jalan pintas bersifat global; itu akan bekerja bahkan jika aplikasi tidak memiliki fokus keyboard. Anda tidak boleh menggunakan modul ini sampai event <code> ready </ 0>
 dari modul aplikasi dipancarkan.</p>

<pre><code class="javascript">const { app, globalShortcut } = memerlukan ('elektron') app.on ('siap', () = & gt; {
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

* ` akselerator </ 0>  <a href="accelerator.md"> Akselerator </ 1></li>
<li><code>callback ` Fungsi

Returns `Boolean` - Whether or not the shortcut was registered successfully.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback ` Fungsi

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* ` akselerator </ 0>  <a href="accelerator.md"> Akselerator </ 1></li>
</ul>

<p>Returns <code>Boolean` - Whether this application has registered `accelerator`.</p> 
    When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.
    
    ### `globalShortcut.unregister(accelerator)`
    
    * ` akselerator </ 0>  <a href="accelerator.md"> Akselerator </ 1></li>
</ul>

<p>Unregisters the global shortcut of <code>accelerator`.</p> 
        ### `globalShortcut.unregisterAll()`
        
        Unregisters all of the global shortcuts.