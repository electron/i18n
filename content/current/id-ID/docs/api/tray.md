## Class: Tray

> Tambahkan ikon dan menu konteks ke area pemberitahuan sistem.

Proses: [Main](../glossary.md#main-process)

`Tray` adalah [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = require('electron') Biarkan nampan = null app.on ('siap', () = > {nampan = baru Tray('/path/to/my/icon') const contextMenu = tray.setToolTip Menu.buildFromTemplate ([{ label: 'Item1', type: 'radio' }, { label: 'Item2', type: 'radio' }, { label: 'Item3', type: 'radio', checked: true }, { label: 'Item4', type: 'radio' }]) (' Inilah saya  aplikasi.')   tray.setContextMenu(contextMenu)})
```

__Keterbatasan platform:__

* Pada Linux indikator app akan digunakan jika didukung, sebaliknya `GtkStatusIcon` akan digunakan sebagai gantinya.
* Pada distribusi Linux yang hanya memiliki indikator app mendukung, Anda harus menginstal `libappindicator1` untuk membuat ikon tray yang bekerja.
* Indikator App akan hanya ditampilkan ketika itu mempunyai menu konteks.
* Ketika app indikator yang digunakan pada Linux, acara `Klik` akan diabaikan.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Sebagai contoh:

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

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted saat ikon baki diklik.

#### Event: klik 'kanan' _macOS_ _Windows_

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

Dibunyikan ketika ikon tray benar diklik.

#### Event: 'Klik dua kali' _macOS_ _Windows_

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `batas` [Persegi panjang](structures/rectangle.md) - batas-batas ikon tray.

Dipancarkan saat ikon baki diklik dua kali.

#### Event: 'balon-show' _Windows_

Emitted saat balon baki menunjukkan.

#### Event: 'klik-balloon' _Windows_

Emitted saat balon nampan diklik.

#### Event: 'balon-tertutup' _Windows_

Dipancarkan ketika balon nampan ditutup karena timeout atau pengguna secara manual menutup itu.

#### Event: 'turun' _macOS_

Emitted bila ada item yang diseret dijatuhkan pada ikon baki.

#### Event: 'drop-file' _macOS_

Pengembalian:

* `event` Acara
* `file` String [] - path file menjatuhkan.

Disuarakan saat file terseret dijatuhkan di ikon baki.

#### Event: 'drop-teks' _macOS_

Pengembalian:

* `acara` Acara
* `teks` String - string teks menjatuhkan.

Dibunyikan apabila menyeret teks jatuh dalam ikon tray.

#### Event: 'Masukkan tarik' _macOS_

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Event: 'drag-meninggalkan' _macOS_

Dibunyikan apabila operasi tarik keluar ikon tray.

#### Event: 'drag-end' _macOS_

Dipancarkan ketika operasi drag yang berakhir di baki atau berakhir di lokasi lain.

#### Event: 'masuk mouse' _macOS_

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Acara: 'pindah' _macOS_

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Dibunyikan apabila operasi drag yang memasuki ikon tray.

#### Event: 'mouse-move' _macOS_ _Windows_

Pengembalian:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisi` [Point](structures/point.md) - posisi acara.

Emitted when the mouse moves in the tray icon.

### Metode Instance

Itu `net` modul memiliki metode berikut:

#### `tray.destroy ()`

Segera hancurkan ikon baki.

#### `tray.setImage(image)`

* `gambar` ([NativeImage](native-image.md) | String)

Mengatur `gambar` yang terkait dengan ikon baki ini.

#### `tray.setPressedImage(gambar) ` _macos_

* `gambar` ([NativeImage](native-image.md) | String)

Mengatur ` gambar ` yang terkait dengan ikon baki ini saat ditekan pada macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Menyetel teks hover untuk ikon baki ini.

#### `tray.setTitle(judul) ` _macos_

* ` judul </ 0> String</li>
</ul>

<p spaces-before="0">Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).</p>

<h4 spaces-before="0"><code> tray.getTitle () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>String` - the title displayed next to the tray icon in the status bar</p>

#### `tray.setIgnoreDoubleClickEvents(ignore)` Linux _macOS_

* `mengabaikan` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### ` tray.getIgnoreDoubleClickEvents () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Boolean` - Whether double click events will be ignored.</p>

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * ` judul </ 0> String</li>
<li><code>content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. Defaultnya adalah `true`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Defaultnya adalah ` false </ 0> . Maps to <a href="https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010"><code>NIIF_NOSOUND`</a>.
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Defaultnya adalah ` false </ 0> . Maps to <a href="https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080"><code>NIIF_RESPECT_QUIET_TIME`</a>.

Menampilkan balon baki.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* ` teks ` String (opsional)
* `posisi` [Titik](structures/point.md) (opsional) - Posisi pop up.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

Posisi `` hanya tersedia di Windows, dan ini adalah (0, 0) secara default.

#### `tray.setContextMenu (menu)`

* `menu` Menu | batal

Menetapkan menu konteks untuk ikon ini.

#### `tray.getBounds()` _macOS _ _ Windows_

Kembali [`Rectangle`](structures/rectangle.md)

`Batas` dari ikon baki ini sebagai `Objek`.

#### `tray.isDestroyed()`

Mengembalikan `Boolean` - Apakah ikon baki rusak.
