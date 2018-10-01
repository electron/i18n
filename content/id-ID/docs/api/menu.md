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

<p>Mengirimkan <code> action </ 0> ke responder pertama dari aplikasi. Ini digunakan untuk meniru perilaku menu macos default. Usually you would just use the
<a href="menu-item.md#roles"><code>role`</a> property of a [`MenuItem`](menu-item.md).</p> 

Lihat  MacOS Kakao Acara Penanganan Panduan </ 0> untuk informasi lebih lanjut tentang MacOS tindakan asli '.</p> 

#### `Menu.membangun dari Template (template)`

* `template` MenuItemConstructorOptions[]

Mengembalikan `menu`

Generally, the `template` is just an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

Anda juga bisa melampirkan bidang lain ke elemen `template` dan mereka akan menjadi properti dari item menu yang dibangun.

### Metode Contoh

The `menu` object has the following instance methods:

#### `menu.popup(options)`

* `pilihan` Obyek 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` minor (options) - Default adalah posisi kursor mouse saat ini. harus dinyatakan jika `y<\0> dinyatakan.</li>
<li><code>y` Nomor (opsional) - Default adalah posisi kursor mouse saat ini. Harus dinyatakan jika `x` dinyatakan.
  * `positioningItem`Nomor (opsional) *macOS* - Indeks item menu ke diposisikan di bawah kursor mouse pada koordinat yang ditentukan. Default adalah -1.
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

### Perihal contoh

Objects created with `new Menu` emit the following events:

** Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p> 

#### Event: 'menu-will-show'

Pengembalian:

* `acara` Acara

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Pengembalian:

* `acara` Acara

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Contoh properti

`menu` objek juga memiliki properti berikut:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Setiap `Menu` terdiri dari beberapa [`MenuItem`](menu-item.md)s dan masing-masing `MenuItem` bisa punya submenu.

### Contoh peristiwa

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## Contoh

Kelas `Utama` hanya tersedia dalam proses utama, namun Anda juga dapat menggunakannya dalam proses render melalui modul[`remote`](remote.md).

### Proses utama

Contoh pembuatan menu aplikasi pada proses utama dengan API template sederhana:

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

### Proses renderer

Dibawah ini adalah contoh membuat menu di halaman web secara dinamis (render proses) dengan menggunakan modul [`remote`](remote.md), dan menunjukkan kapan pengguna menggunakan klik kanan pada halaman:

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

macos memiliki gaya menu aplikasi yang sama sekali berbeda dari Windows dan Linux. Berikut adalah beberapa catatan tentang cara membuat menu aplikasi Anda lebih mirip dengan asli.

### Menu Standar

Di macos terdapat banyak menu standar yang ditentukan oleh sistem, seperti menu ` Services </ 0> dan
 <code> Windows </ 0>. Untuk membuat menu Anda menu standar, Anda harus mengatur menu Anda
 <code> peran </ 0> ke salah satu dari berikut dan elektron akan mengenali mereka dan membuat mereka menjadi menu standar:</p>

<ul>
<li><code>jendela`</li> 

* `bantuan`
* `layanan`</ul> 

### Tindakan Item Menu Standar

macos telah memberikan tindakan standar untuk beberapa item menu, seperti ` Tentang xxx </ 0> ,
 <code> Sembunyikan xxx </ 0> , dan <code> Sembunyikan Lainnya </ 0> . Untuk mengatur tindakan item menu ke tindakan standar, Anda harus mengatur atribut <code> role </ 0> dari item menu.</p>

<h3>Nama Menu Utama</h3>

<p>Pada macos label item pertama menu aplikasi selalu nama aplikasi Anda, tidak peduli label apa yang Anda tetapkan. Untuk mengubahnya, modifikasi berkas <code> Info.plist < file > aplikasi Anda. Lihat <a href="https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html">Mengaktifkan dokumentasi Akses Jaringan</a> untuk lebih jelasnya.</p>

<h2>Setting Menu untuk Jendela Peramban Tertentu (<em> Linux </em> <em> Windows </em>)</h2>

<p>Metode <a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows"><code> setMenu`metode </a> pencarian windows dapat mengatur menu tertentu Pencarian windows.

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
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
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
  {label: 'a', position: 'endof=letters'},
  {label: '1', position: 'endof=numbers'},
  {label: 'b', position: 'endof=letters'},
  {label: '2', position: 'endof=numbers'},
  {label: 'c', position: 'endof=letters'},
  {label: '3', position: 'endof=numbers'}
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