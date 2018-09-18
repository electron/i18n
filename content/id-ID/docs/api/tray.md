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
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted saat ikon baki diklik.

#### Event: klik 'kanan' *macOS* *Windows*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

Dibunyikan ketika ikon tray benar diklik.

#### Event: 'Klik dua kali' *macOS* *Windows*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

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

* `acara` Acara
* `teks` String - string teks menjatuhkan.

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
* `posisi` [Point](structures/point.md) - posisi acara.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Acara: 'pindah' *macOS*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `posisi` [Point](structures/point.md) - posisi acara.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Event: 'mouse-move' *macOS*

* `peristiwa` Peristiwa 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the mouse moves in the tray icon.

### Metode Instance

Itu `net` modul memiliki metode berikut:

#### `tray.destroy ()`

Segera hancurkan ikon baki.

#### `tray.setImage(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Mengatur `gambar` yang terkait dengan ikon baki ini.

#### `tray.setPressedImage(gambar) ` *macos*

* `gambar` ([NativeImage](native-image.md) | String)

Mengatur ` gambar ` yang terkait dengan ikon baki ini saat ditekan pada macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Menyetel teks hover untuk ikon baki ini.

#### `tray.setTitle(judul) ` *macos*

* ` judul </ 0> String</li>
</ul>

<p>Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).</p>

<h4><code>tray.setHighlightMode(mode)` * macos*</h4> 
  * `modus` String - Sorot mode dengan salah satu dari nilai berikut: 
    * `selection` - Sorot ikon baki saat diklik dan juga kapan Menu konteksnya terbuka. Ini adalah defaultnya.
    * `selalu` - Selalu sorot ikon baki.
    * `tidak pernah` - Jangan menyorot ikon baki.
  
  Menyetel saat latar belakang ikon baki disorot (berwarna biru).
  
  **Catatan:** Anda dapat menggunakan `highlightMode` dengan [`BrowserWindow`](browser-window.md) dengan Toggling antara `'never'` dan `'always'` saat jendela melihat visibilitas berubah.
  
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
  
  #### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*
  
  * `mengabaikan` Boolean
  
  Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.
  
  This value is set to false by default.
  
  #### `tray.getIgnoreDoubleClickEvents()` *macOS*
  
  Returns `Boolean` - Whether double click events will be ignored.
  
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
  
  * `menu` Menu | batal
  
  Sets the context menu for this icon.
  
  #### `tray.getBounds()` *macOS* *Windows*
  
  Kembali [`Rectangle`](structures/rectangle.md)
  
  The `bounds` of this tray icon as `Object`.
  
  #### `tray.isDestroyed()`
  
  Returns `Boolean` - Whether the tray icon is destroyed.