## Kelas: Menu

> Buat menu aplikasi asli dan menu konteks.

Proses:  Utama </ 0></p> 

### `Menu baru ()`

Membuat menu baru.

### Metode Statis

Kelas ` menu </ 0> memiliki metode statis berikut:</p>

<h4><code>Menu.set Aaplikasi Menu (menu)`</h4> 

* ` menu </ 0> Menu</li>
</ul>

<p>Set <code> menu </ 0> sebagai menu aplikasi pada macOS . Pada Windows dan Linux,
 <code> menu </ 0> akan ditetapkan sebagai menu atas setiap jendela.</p>

<p>Melewati<code> null </ 0> akan menghapus menu bar pada Windows dan Linux namun tidak berpengaruh pada macos .</p>

<p><strong> Catatan: </ 0> ini API harus dipanggil setelah <code> siap </ 1>  acara dari <code> aplikasi </ 1> modul.</p>

<h4><code>Menu.dapatkan aplikasi Menu ()`</h4> 
  Mengembalikan ` Menu </ 0> - Menu aplikasi, jika diatur, atau <code> null </ 0> , jika tidak disetel.</p>

<p><strong> Catatan: </ 0> Contoh <code> Menu </ 1> yang dikembalikan tidak mendukung penambahan atau penghapusan item menu secara dinamis. <a href="#instance-properties"> Instance properti </ 0> masih dapat dimodifikasi secara dinamis.</p>

<h4><code> Menu.kirim aksi pertama ke Responder (tindakan) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code> aksi </ 0>  String</li>
</ul>

<p>Mengirimkan <code> action </ 0> ke responder pertama dari aplikasi. Ini digunakan untuk meniru perilaku menu macos default . Biasanya Anda hanya akan menggunakan
 <a href="menu-item.md#roles"><code> peran </ 0> properti dari <a href="menu-item.md"><code> MenuItem </ 1> .</p>

<p>Lihat <a href="https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7"> MacOS Kakao Acara Penanganan Panduan </ 0> 
untuk informasi lebih lanjut tentang MacOS tindakan asli '.</p>

<h4><code>Menu.membangun dari Template (template)`</h4> 
  
  * ` template </ 0> MenuItemConstructorOptions []</li>
</ul>

<p>Mengembalikan <code> Menu </ 0></p>

<p>Umumnya, <code> template </ 0> hanyalah sebuah array dari <code> options </ 0> untuk membangun a
<a href="menu-item.md"> MenuItem </ 1>. Penggunaannya bisa diacu di atas.</p>

<p>You can also attach other fields to the element of the <code>template` and they will become properties of the constructed menu items.</p> 
    ### Metode Instance
    
    The `menu` object has the following instance methods:
    
    #### `menu.popup([browserWindow, options])`
    
    * `browserWindow` BrowserWindow (optional) - Default is the focused window.
    * `pilihan` Objek (opsional) 
      * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
      * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
      * `async` Boolean (optional) - Set to `true` to have this method return immediately called, `false` to return after the menu has been selected or closed. Default ke ` false </ 0> .</li>
<li><code>positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
    
    Pops up this menu as a context menu in the `browserWindow`.
    
    #### `menu.closePopup([browserWindow])`
    
    * `browserWindow` BrowserWindow (optional) - Default is the focused window.
    
    Closes the context menu in the `browserWindow`.
    
    #### `menu.append(menuItem)`
    
    * ` menuItem </ 0> MenuItem</li>
</ul>

<p>Appends the <code>menuItem` to the menu.</p> 
      #### `menu.insert(pos, menuItem)`
      
      * `pos` Integer
      * ` menuItem </ 0> MenuItem</li>
</ul>

<p>Inserts the <code>menuItem` to the `pos` position of the menu.</p> 
        ### Instance Properties
        
        `menu` objects also have the following properties:
        
        #### `menu.items`
        
        A `MenuItem[]` array containing the menu's items.
        
        Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.
        
        ## Examples
        
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
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
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
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

## Notes on macOS Application Menu

macos memiliki gaya menu aplikasi yang sama sekali berbeda dari Windows dan Linux. Berikut adalah beberapa catatan tentang cara membuat menu aplikasi Anda lebih mirip dengan asli.

### Menu Standar

Di macos terdapat banyak menu standar yang ditentukan oleh sistem, seperti menu ` Services </ 0> dan
 <code> Windows </ 0> . Untuk membuat menu Anda menu standar, Anda harus mengatur menu Anda
 <code> peran </ 0> ke salah satu dari berikut dan elektron akan mengenali mereka dan membuat mereka menjadi menu standar:</p>

<ul>
<li><code>jendela`</li> 

* `membantu`
* `jasa`</ul> 

### Tindakan Item Menu Standar

macos telah memberikan tindakan standar untuk beberapa item menu, seperti ` Tentang xxx </ 0> ,
 <code> Sembunyikan xxx </ 0> , dan <code> Sembunyikan Lainnya </ 0> . Untuk mengatur tindakan item menu ke tindakan standar, Anda harus mengatur atribut <code> role </ 0> dari item menu.</p>

<h3>Nama Menu Utama</h3>

<p>Pada macos label item pertama menu aplikasi selalu nama aplikasi Anda, tidak peduli label apa yang Anda tetapkan. Untuk mengubahnya, modifikasi berkas <code> Info.plist < file > aplikasi Anda
 . Lihat
 <a href="https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html"> About Information Property List Files </ 0> 
untuk informasi lebih lanjut.</p>

<h2>Setting Menu for Specific Browser Window (<em>Linux</em> <em>Windows</em>)</h2>

<p>The <a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows"><code>setMenu` method</a> of browser windows can set the menu of certain browser windows.

## Menu Item Position

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### Examples

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

    <br />- 1
    - 2
    - 3
    - 4
    - 5
    

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

    <br />- ---
    - a
    - b
    - c
    - ---
    - 1
    - 2
    - 3