## Kelas: MenuItem

> Menambahkan item ke menu aplikasi asli dan menu konteks.

Proses: [Main](../glossary.md#main-process)

Melihat [`Menu`](menu.md) untuk contoh.

### `MenuItem baru (pilihan)`

* `pilihan` Benda 
  * `klik` Fungsi (opsional) - akan dipanggil dengan `klik (menuItem, jendela browser, acara )` saat item menu diklik. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `acara` Acara
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom` or `front` - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `jenis` String (opsional) - dapat `normal`, `pemisah`, `submenu`, `kotak centang` atau `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `Accelerator` [Accelerator](accelerator.md) (opsional)
  * `ikon` ([NativeImage](native-image.md) | String) (opsional)
  * `diaktifkan` Boolean (opsional) - jika palsu, menu item akan diklik keluar dan unclickable.
  * `terlihat` Boolean (opsional) - jika palsu, menu item akan sepenuhnya tersembunyi.
  * `memeriksa` Boolean (opsional) - harus hanya ditentukan untuk `centang` atau `radio` jenis item menu.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (opsional) - unik dalam menu tunggal. Jika ditentukan kemudian dapat digunakan sebagai referensi untuk item ini oleh posisi atribut.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### Peran

Peran memungkinkan item menu untuk memiliki standar perilaku.

Terbaik untuk menetapkan `peran` untuk setiap item menu yang sesuai peran standar, daripada berusaha untuk secara manual menerapkan perilaku dalam fungsi `Klik`. Perilaku internal `peran` akan memberikan pengalaman asli terbaik.

Nilai-nilai `label` dan `akselerator` opsional ketika menggunakan `peran` dan akan default ke nilai-nilai yang sesuai untuk setiap platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

Properti `peran` dapat memiliki nilai-nilai berikut:

* `membatalkan`
* `mengulang`
* `memotong`
* `salinan`
* `pasta`
* `pasteAndMatchStyle`
* `selectAll`
* `menghapus`
* ` minimize </ 0> - Minimalkan jendela saat ini.</li>
<li><code> tutup </ 0> - Tutup jendela saat ini.</li>
<li><code>quit` - Quit the application.
* ` reload </ 0> - Muat ulang jendela aktif.</li>
<li><code>forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu` - default seluruh "Edit" menu (Undo, salin, dsb.).
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

The following additional roles are available on *macOS*:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
* `tentang` - peta tindakan `orderFrontStandardAboutPanel`.
* `menyembunyikan` - peta untuk `menyembunyikan` tindakan.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - peta tindakan `unhideAllApplications`.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `depan` - peta tindakan `arrangeInFront`.
* `zoom` - peta tindakan `performZoom`.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `MenuItem`:

#### `menuItem.enabled`

`Boolean` menunjukkan apakah item diaktifkan, properti ini dapat secara dinamis berubah.

#### `menuItem.visible`

`Boolean` menunjukkan item Apakah terlihat, properti ini dapat secara dinamis berubah.

#### `menuItem.checked`

`Boolean` menunjukkan apakah item dicentang, properti ini dapat secara dinamis berubah.

Item menu `kotak centang` akan beralih `memeriksa` properti on dan off ketika dipilih.

`Radio` menu item akan menyala `memeriksa` properti ketika diklik, dan akan menonaktifkan properti itu untuk semua item yang berdekatan di menu yang sama.

Anda dapat menambahkan sebuah `klik` fungsi untuk perilaku tambahan.

#### `menuItem.label`

Sebuah `String` yang mewakili label terlihat item menu.

#### `menuItem.click`

`Fungsi` yang dipecat ketika MenuItem menerima event klik.