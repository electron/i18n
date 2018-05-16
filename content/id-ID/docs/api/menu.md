## Kelas: Utama

> Buat menu aplikasi asli dan menu konteks.

Proses: [Main](../glossary.md#main-process)

### `menu Menu()`

Membuat menu baru.

### Metode Statis

Kelas ` BrowserWindow ` memiliki metode statis berikut:

#### `Menu.set Aaplikasi Menu (menu)`

* `menu` Menu | batal

Set ` menu </ 0> sebagai menu aplikasi pada macOS. Pada Windows dan Linux,
 <code> menu </ 0> akan ditetapkan sebagai menu atas setiap jendela.</p>

<p>Melewati <code>null` akan menghapus menu bar pada Windows dan Linux tetapi tidak memiliki efek pada macOS.

** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app `dipancarkan.

#### `Menu.getApplicationMenu()`

Returns `Menu | null` - The application menu, if set, or `null`, if not set.

**Catatan:** Contoh `Menu` kembali tidak mendukung dinamis penambahan atau penghapusan item menu.  Instance properti </ 0> masih dapat dimodifikasi secara dinamis.</p> 

#### ` Menu.kirim aksi pertama ke Responder (tindakan) </ 0> <em> macos </ 1></h4>

<ul>
<li><code> aksi </ 0>  Tali</li>
</ul>

<p>Mengirimkan <code> action </ 0> ke responder pertama dari aplikasi. Ini digunakan untuk meniru perilaku menu macos default. Biasanya Anda hanya akan menggunakan
 <a href="menu-item.md#roles"><code> peran </ 0> properti dari <a href="menu-item.md"><code> MenuItem </ 1>.</p>

<p>Lihat <a href="https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7"> MacOS Kakao Acara Penanganan Panduan </ 0> 
untuk informasi lebih lanjut tentang MacOS tindakan asli '.</p>

<h4><code>Menu.membangun dari Template (template)`

* `template` MenuItemConstructorOptions[]

Mengembalikan `menu`

Umumnya, `template` hanyalah sebuah array dari `options` untuk membangun a [MenuItem](menu-item.md). Penggunaannya bisa diacu di atas.

Anda juga bisa melampirkan bidang lain ke elemen `template` dan mereka akan menjadi properti dari item menu yang dibangun.

### Metode Instance

The `menu` object has the following instance methods:

#### `menu.popup(options)`

* `pilihan` Sasaran 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
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

Inserts the `menuItem` to the `pos` position of the menu.

### Contoh peristiwa

Objects created with `new Menu` emit the following events:

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

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

### Contoh peristiwa

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## Contoh

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### Main process

An example of creating the application menu in the main process with the simple template API:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Render process

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## Catatan pada Menu Aplikasi MacOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Standard Menus

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### Standard Menu Item Actions

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Main Menu's Name

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Setting Menu untuk Jendela Peramban Tertentu (* Linux * * Windows *)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Posisi Item Menu

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### Contoh

Template:

```javascript
[   {label: '4', id: '4'},   {label: '5', id: '5'},   {label: '1', id: '1', position: 'before=4'},   {label: '2', id: '2'},   {label: '3', id: '3'} ]
```

Menu:

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

Template:

```javascript
[
  {label: 'a', posisi: 'endof = letters'},
  {label: '1', posisi: 'endof = numbers'},
  {label: 'b', posisi: 'endof = letters'},
  {label: '2', posisi: 'endof = numbers'},
  {label: 'c', posisi: 'endof = letters'},
  {label: '3', posisi: 'endof = numbers'}
]
```

Menu:

```sh
<br />- ---
- a
- b
- c
- ---
- 1
- 2
- 3
```