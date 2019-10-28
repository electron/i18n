## Class: Tray

> Tambahkan ikon dan menu konteks ke area pemberitahuan sistem.

Proses: [Main](../glossary.md#main-process)

`Tray` adalah [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = require('electron') Biarkan nampan = null app.on ('siap', () = > {nampan = baru Tray('/path/to/my/icon') const contextMenu = tray.setToolTip Menu.buildFromTemplate ([{ label: 'Item1', type: 'radio' }, { label: 'Item2', type: 'radio' }, { label: 'Item3', type: 'radio', checked: true }, { label: 'Item4', type: 'radio' }]) (' Inilah saya  aplikasi.')   tray.setContextMenu(contextMenu)})
```

**Keterbatasan platform:**

* Pada Linux indikator app akan digunakan jika didukung, sebaliknya `GtkStatusIcon` akan digunakan sebagai gantinya.
* Pada distribusi Linux yang hanya memiliki indikator app mendukung, Anda harus menginstal `libappindicator1` untuk membuat ikon tray yang bekerja.
* Indikator App akan hanya ditampilkan ketika itu mempunyai menu konteks.
* Ketika app indikator yang digunakan pada Linux, acara `Klik` akan diabaikan.
* Pada Linux dalam rangka untuk perubahan yang dibuat ke setiap `MenuItem` s untuk mengambil efek, Anda harus memanggil `setContextMenu` lagi. Sebagai contoh:

```javascript
const { app, Menu, Tray } = require('electron') Biarkan appIcon = null app.on ('siap', () = > {appIcon = baru Tray('/path/to/my/icon') const contextMenu = Menu.buildFromTemplate ([{ label: 'Item1', type: 'radio' }, { label: 'Item2', type: 'radio' }]) / / membuat perubahan konteks menu contextMenu.items[1].checked = false / / menyebutnya lagi untuk Linux karena kami diubah konteks menu appIcon.setContextMenu(contextMenu)})
```

* Pada Windows disarankan untuk menggunakan ikon `ICO` untuk mendapatkan efek visual terbaik.

Jika Anda ingin menyimpan tepat perilaku yang sama pada semua platform, Anda tidak harus bergantung pada acara `Klik` dan selalu lampirkan menu konteks ke tray icon.

### `tray baru(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Buatlah sebuah ikon tray baru yang terkait dengan `image`.

### Contoh peristiwa

Modul `Tray` memancarkan peristiwa berikut:

#### Acara : 'klik'

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the tray icon is clicked.

#### Event: klik 'kanan' *macOS* *Windows*

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

Emitted when the tray icon is right clicked.

#### Event: 'Klik dua kali' *macOS* *Windows*

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

Emitted when the tray icon is double clicked.

#### Event: 'balon-show' *Windows*

Emitted when the tray balloon shows.

#### Event: 'klik-balloon' *Windows*

Emitted when the tray balloon is clicked.

#### Event: 'balon-tertutup' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Event: 'turun' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Event: 'drop-file' *macOS*

Mengembalikan:

* `event` Acara
* `file` String [] - path file menjatuhkan.

Emitted when dragged files are dropped in the tray icon.

#### Event: 'drop-teks' *macOS*

Mengembalikan:

* `acara` Acara
* `teks` String - string teks menjatuhkan.

Emitted when dragged text is dropped in the tray icon.

#### Event: 'Masukkan tarik' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-meninggalkan' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'masuk mouse' *macOS*

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the mouse enters the tray icon.

#### Acara: 'pindah' *macOS*

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

Mengembalikan:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the mouse moves in the tray icon.

### Metode Instance

The `Tray` class has the following methods:

#### `tray.destroy ()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(gambar) ` *macos*

* `gambar` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(judul) ` *macos*

* ` judul</ 0>  String</li>
</ul>

<p>Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).</p>

<h4><code> tray.getTitle () </ 0>  <em> macos </ 1></h4>

<p>Returns <code>String` - the title displayed next to the tray icon in the status bar</p> 
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
  
  * `menu` Menu | null
  
  Sets the context menu for this icon.
  
  #### `tray.getBounds()` *macOS* *Windows*
  
  Kembali [`Rectangle`](structures/rectangle.md)
  
  The `bounds` of this tray icon as `Object`.
  
  #### `tray.isDestroyed()`
  
  Returns `Boolean` - Whether the tray icon is destroyed.