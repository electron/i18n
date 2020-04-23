## Class: Menu

> Membuat menu native aplikasi dan menu konteks.

Proses: [Main](../glossary.md#main-process)

### `new Menu()`

Membuat menu baru.

### Metode Statis

The `Menu` class has the following static methods:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

Hasil returns `Menu | null` - menu aplikasi, jika di set, atau `null`, jika tidak di set.

**Note:** The returned `Menu` instance doesn't support dynamic addition or removal of menu items. Instance properti </ 0> masih dapat dimodifikasi secara dinamis.</p> 



#### `Menu.sendActionToFirstResponder(action)` _macOS_

* ` aksi </ 0>  Tali</li>
</ul>

<p spaces-before="0">Mengirimkan <code> action </ 0> ke responder pertama dari aplikasi. Ini digunakan untuk meniru perilaku menu macos default. Usually you would use the
<a href="menu-item.md#roles"><code>role`</a> property of a [`MenuItem`](menu-item.md).</p> 
  Lihat  MacOS Kakao Acara Penanganan Panduan </ 0> untuk informasi lebih lanjut tentang MacOS tindakan asli '.</p> 
  
  

#### `Menu.membangun dari Template (template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Mengembalikan `menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.



### Методы экземпляра

The `menu` object has the following instance methods:



#### `menu.popup([options])`

* `options` Object (optional) 
    * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).



#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Menutup menu konteks di `browserWindow`.



#### `menu.append(menuItem) menuItem`

* `menuItem` [MenuItem](menu-item.md)

Appends the `menuItem` to the menu.



#### `menu.getMenuItemById(id)`

* `id` String

Returns `MenuItem` the item with the specified `id`



#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Sisipkan `menuItem` ke posisi `pos` pada menu.



### Contoh peristiwa

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

** Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p> 



#### Event: 'menu-will-show'

Mengembalikan:

* `event` Sinyal

Emitted when `menu.popup()` is called.



#### Event: 'menu-will-close'

Mengembalikan:

* `event` Sinyal

Emitted when a popup is closed either manually or with `menu.closePopup()`.



### Instance Properties

`menu` objek juga memiliki properti berikut:



#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Setiap `Menu` terdiri dari beberapa [`MenuItem`](menu-item.md)s dan masing-masing `MenuItem` bisa punya submenu.



## Contoh

Kelas `Utama` hanya tersedia dalam proses utama, namun Anda juga dapat menggunakannya dalam proses render melalui modul[`remote`](remote.md).



### Proses utama

Contoh pembuatan menu aplikasi pada proses utama dengan API template sederhana:



```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```




### Proses renderer

Dibawah ini adalah contoh membuat menu di halaman web secara dinamis (render proses) dengan menggunakan modul [`remote`](remote.md), dan menunjukkan kapan pengguna menggunakan klik kanan pada halaman:



```html
<!-- index.html -->
<script>
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
</script>
```




## Catatan pada Menu Aplikasi MacOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.



### Menu Standar

On macOS there are many system-defined standard menus, like the [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) and `Windows` menus. Untuk membuat menu Anda menu standar, Anda harus mengatur menu Anda ` peran </ 0> ke salah satu dari berikut dan elektron akan mengenali mereka dan membuat mereka menjadi menu standar:</p>

<ul>
<li><code>jendela`</li> 

* `bantuan`
* `layanan`</ul> 



### Tindakan Item Menu Standar

macos telah memberikan tindakan standar untuk beberapa item menu, seperti ` Tentang xxx </ 0> ,
 <code> Sembunyikan xxx </ 0> , dan <code> Sembunyikan Lainnya </ 0> . Untuk mengatur tindakan item menu ke tindakan standar, Anda harus mengatur atribut <code> role </ 0> dari item menu.</p>

<h3 spaces-before="0">Nama Menu Utama</h3>

<p spaces-before="0">Pada macos label item pertama menu aplikasi selalu nama aplikasi Anda, tidak peduli label apa yang Anda tetapkan. Untuk mengubahnya, modifikasi berkas <code> Info.plist < file > aplikasi Anda. Lihat <a href="https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html">Mengaktifkan dokumentasi Akses Jaringan</a> untuk lebih jelasnya.</p>

<h2 spaces-before="0">Setting Menu for Specific Browser Window (<em x-id="3">Linux</em> <em x-id="3">Windows</em>)</h2>

<p spaces-before="0">Metode <a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows"><code> setMenu`metode </a> pencarian windows dapat mengatur menu tertentu Pencarian windows.



## Posisi Item Menu

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.

* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.

* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.

* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.



### Contoh

Template:



```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```


Menu:



```sh
- 1
- 2
- 3
- 4
```


Template:



```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```


Menu:



```sh
- 3
- 4
- ---
- 1
- ---
- 2
```


Template:



```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```


Menu:



```sh
- ---
- 3
- 2
- 1
```
