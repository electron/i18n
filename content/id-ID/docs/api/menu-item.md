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
  * `peran` String (opsional) - menentukan tindakan menu item, bila ditentukan `Klik` properti akan diabaikan. Melihat [peran](#roles).
  * `jenis` String (opsional) - dapat `normal`, `pemisah`, `submenu`, `kotak centang` atau `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `Accelerator` [Accelerator](accelerator.md) (opsional)
  * `ikon` ([NativeImage](native-image.md) | String) (opsional)
  * `diaktifkan` Boolean (opsional) - jika palsu, menu item akan diklik keluar dan unclickable.
  * `terlihat` Boolean (opsional) - jika palsu, menu item akan sepenuhnya tersembunyi.
  * `memeriksa` Boolean (opsional) - harus hanya ditentukan untuk `centang` atau `radio` jenis item menu.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. Jika `submenu` ditetapkan, `jenis: 'submenu'` dapat diabaikan. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (opsional) - unik dalam menu tunggal. Jika ditentukan kemudian dapat digunakan sebagai referensi untuk item ini oleh posisi atribut.
  * `posisi` String (opsional) - bidang ini memungkinkan definisi yang halus lokasi tertentu dalam menu tertentu.

### Peran

Peran memungkinkan item menu untuk memiliki standar perilaku.

Terbaik untuk menetapkan `peran` untuk setiap item menu yang sesuai peran standar, daripada berusaha untuk secara manual menerapkan perilaku dalam fungsi `Klik`. Perilaku internal `peran` akan memberikan pengalaman asli terbaik.

Nilai-nilai `label` dan `akselerator` opsional ketika menggunakan `peran` dan akan default ke nilai-nilai yang sesuai untuk setiap platform.

Properti `peran` dapat memiliki nilai-nilai berikut:

* `membatalkan`
* `mengulang`
* `memotong`
* `salinan`
* `pasta`
* `pasteAndMatchStyle`
* `selectAll`
* `menghapus`
* `minimize` - Minimize current window.
* `close` - Close current window.
* `quit`- Quit the application.
* `reload` - Reload the current window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen`- Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

The following additional roles are available on *macOS*:

* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
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

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.