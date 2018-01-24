## Class: menu

> Lumikha ng katutubong menu ng application at menu ng konteksto.

Proseso: [Main](../glossary.md#main-process)

### `bagong menu()`

Gumawa ng bagong menu.

### Mga paraan ng static

Ang `menu` na object ay mga sumusunod na paraan ng static:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu

Nagtatakda ng `menu` bilang paggamit ng menu sa mascOs. Para sa Windows at Linux, ang `menu<0/> ang magtatakda sa bawat window's sa taas ng menu.</p>

<p>Pagpasa sa <code>null` para alisin ang menu bar sa Widows at Linux pero wala itong epekto sa Masco.

**Note:** itong API ang dapat tawagin pagkatapos ng `handa` kaganapan ng `app` module.

#### `Menu.getApplicationMenu()`

Nagbabalik ang `Menu` - Ang menu ng application, kung nakatakda o`null`, kung hindi nakatakda.

**Note:** Ng nakauwi na halimbawa ng `Menu` ay hindi suportado ng dinamikong Pagdagdag o pagtanggal ng mga item sa menu. [mga katangian ng pagkakataon ](#instance-properties) na maaring dynamic na binago.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Ipadala ang mga `Pagkilos` Sa mga unang responder ng aplikasyon. Ito ay ginagamit para sa pagtulad sa default macOS menu ng pag-uugali. Karaniwan mong ginagamit ang [`papel`](menu-item.md#roles)pag-aari ng isang[`Menultem`](menu-item.md).

Tingnan ang [mascOS Cocoa kaganapan sa pag-aasikso ng paggabay](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) Para sa mga karagdagang impormasyon sa mascOS' katutubong pagkilos.

#### `Menu.buildFromTemplate(template)`

* `ang template` [MenuItemConstructorOptions]

Nagbabalik ang `Menu`

Sa pangkalahatan, ang `template` ay lamang ng isang hanay ng mga `pagpipilian` para sa pagpapagawa ng isang [MenuItem](menu-item.md). Ang paggamit ay maaaring binanggit sa itaas.

Makakabitan mo din ang iba pang mga patlang sa mga elemento ng mga `template` at sila ay magiging mga katangian ng mga constructed menu item.

### Mga pamamaraan ng pagkakataon

Ang `Menu`Na object ay ang mga sumusunod na pamamaraan ng pagkakataon:

#### `menu.popup([browserWindow, options])`

* `browserWindow` BrowserWindow (opsyonal) - default ang nakatuong window.
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `x` Number (opsyonal) - Ang default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ipahayag kung ang `y` ay naipahayag na.
  * `y` (opsyonal) - bilang Default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ipahayag kung `x` ay ipinahayag.
  * `async` Boolean (opsyonal) - Itinakda sa `true` upang maibalik agad ang pamamaraang ito ay tinawag, `false` upang maibalik pagkatapos na ang menu ay mapili o maisara. Ang mga default para sa `false`.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.

Pops up this menu as a context menu in the `browserWindow`.

#### `menu.closePopup([browserWindow])`

* `browserWindow` BrowserWindow (opsyonal) - default ang nakatuong window.

Closes the context menu in the `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` MenuItem

Appends the `menuItem` to the menu.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem`MenuItem

Ipasok sa`menuItem`papunta sa posisyon ng`pos`ng menu.

### Katangian ng mga pag-aari

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

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

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