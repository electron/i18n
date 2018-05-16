## Class: Tray

> Tambahkan ikon dan menu konteks ke area pemberitahuan sistem.

Proses: [Main](../glossary.md#main-process)

`Tray` adalah [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = require('electron') Biarkan nampan = null app.on ('siap', () = > {nampan = baru Tray('/path/to/my/icon') const contextMenu = tray.setToolTip Menu.buildFromTemplate ([{label: 'Item1', type: 'radio'}, {label: 'Item2', type: 'radio'}, {label: 'Item3', type: 'radio', checked: true}, {label: 'Item4', type: 'radio'}]) (' Inilah saya  aplikasi.')   tray.setContextMenu(contextMenu)})
```

**Keterbatasan platform:**

* Pada Linux indikator app akan digunakan jika didukung, sebaliknya `GtkStatusIcon` akan digunakan sebagai gantinya.
* Pada distribusi Linux yang hanya memiliki indikator app mendukung, Anda harus menginstal `libappindicator1` untuk membuat ikon tray yang bekerja.
* Indikator App akan hanya ditampilkan ketika itu mempunyai menu konteks.
* Ketika app indikator yang digunakan pada Linux, acara `Klik` akan diabaikan.
* Pada Linux dalam rangka untuk perubahan yang dibuat ke setiap `MenuItem` s untuk mengambil efek, Anda harus memanggil `setContextMenu` lagi. Sebagai contoh:

```javascript
const {app, Menu, Tray} = require('electron') Biarkan appIcon = null app.on ('siap', () = > {appIcon = baru Tray('/path/to/my/icon') const contextMenu = Menu.buildFromTemplate ([{label: 'Item1', type: 'radio'}, {label: 'Item2', type: 'radio'}]) / / membuat perubahan konteks menu contextMenu.items[1].checked = false / / menyebutnya lagi untuk Linux karena kami diubah konteks menu appIcon.setContextMenu(contextMenu)})
```

* Pada Windows disarankan untuk menggunakan ikon `ICO` untuk mendapatkan efek visual terbaik.

Jika Anda ingin menyimpan tepat perilaku yang sama pada semua platform, Anda tidak harus bergantung pada acara `Klik` dan selalu lampirkan menu konteks ke tray icon.

### `tray baru(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Buatlah sebuah ikon tray baru yang terkait dengan `image`.

### Contoh peristiwa

Modul `Tray` memancarkan peristiwa berikut:

#### Acara : 'klik'

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

Emitted saat ikon baki diklik.

#### Event: klik 'kanan' *macOS* *Windows*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Dibunyikan ketika ikon tray benar diklik.

#### Event: 'Klik dua kali' *macOS* *Windows*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Dipancarkan saat ikon baki diklik dua kali.

#### Event: 'balon-show' *Windows*

Emitted saat balon baki menunjukkan.

#### Event: 'klik-balloon' *Windows*

Emitted saat balon nampan diklik.

#### Event: 'balon-tertutup' *Windows*

Dipancarkan ketika balon nampan ditutup karena timeout atau pengguna secara manual menutup itu.

#### Event: 'turun' *macOS*

Emitted bila ada item yang diseret dijatuhkan pada ikon baki.

#### Event: 'drop-file' *macOS*

* `event` Acara
* `file` String [] - path file menjatuhkan.

Disuarakan saat file terseret dijatuhkan di ikon baki.

#### Event: 'drop-teks' *macOS*

* `event` Acara
* `text` String - the dropped text string.

Dibunyikan apabila menyeret teks jatuh dalam ikon tray.

#### Event: 'Masukkan tarik' *macOS*

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Event: 'drag-meninggalkan' *macOS*

Dibunyikan apabila operasi tarik keluar ikon tray.

#### Event: 'drag-end' *macOS*

Dipancarkan ketika operasi drag yang berakhir di baki atau berakhir di lokasi lain.

#### Event: 'masuk mouse' *macOS*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Acara: 'pindah' *macOS*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Event: 'mouse-move' *macOS*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse moves in the tray icon.

### Metode Instance

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul>

<p>Sets the <code>image` associated with this tray icon when pressed on macOS.</p> 
  #### `tray.setToolTip(toolTip)`
  
  * `toolTip` String
  
  Sets the hover text for this tray icon.
  
  #### `tray.setTitle(title)` *macOS*
  
  * ` judul</ 0>  String</li>
</ul>

<p>Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).</p>

<h4><code>tray.setHighlightMode(mode)` *macOS*</h4> 
    * `modus` String - Highlight mode with one of the following values: 
      * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
      * `always` - Always highlight the tray icon.
      * `never` - Never highlight the tray icon.
    
    Sets when the tray's icon background becomes highlighted (in blue).
    
    **Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.
    
    ```javascript
    const {BrowserWindow, Tray} = require ('electron')
    
    const win = new BrowserWindow ({width: 800, height: 600})
    const tray = new Tray ('/ path / to / my / icon')
    
    tray.on ('klik', () = > {
      win.isVisible ()? win.hide (): win.show ()
    })
    win.on ('show', () = > {
      tray.setHighlightMode ('selalu')
    })
    win.on ('hide', () = > {
      tray.setHighlightMode ('tidak pernah')
    })
    ```
    
    #### `tray.displayBalloon(options)` *Windows*
    
    * `pilihan` Sasaran 
      * `icon` ([NativeImage](native-image.md) | String) (optional) -
      * ` judul</ 0>  String</li>
<li><code>content` String
    
    Displays a tray balloon.
    
    #### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*
    
    * `menu` Menu (optional)
    * `position` [Point](structures/point.md) (optional) - The pop up position.
    
    Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.
    
    The `position` is only available on Windows, and it is (0, 0) by default.
    
    #### `tray.setContextMenu(menu)`
    
    * `menu` Menu
    
    Sets the context menu for this icon.
    
    #### `tray.getBounds()` *macOS* *Windows*
    
    Kembali [`Rectangle`](structures/rectangle.md)
    
    The `bounds` of this tray icon as `Object`.
    
    #### `tray.isDestroyed()`
    
    Returns `Boolean` - Whether the tray icon is destroyed.