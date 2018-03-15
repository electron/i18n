## Klase: Menu

> Lumikha ng natibong mga menu ng aplikasyon at mga menu ng konteksto.

Proseso:[Main](../glossary.md#main-process)

### `new Menu()`

Lumilikha ng isang bagong menu.

### Mga istatikong pamamaraan

Ang klaseng `menu` ay mayroong mga sumusunod na mga istatikong pamamaraan:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu

Nagtatakda ng `menu` bilang aplikasyon ng menu sa macOS. Sa Windows at Linux, ang `menu` ay itatakda sa ibabaw ng menu ng bawat window.

Ang pagpasa ng `null` ay magtatanggal ng menu bar sa Windows at sa Linux ngunit walang epekto sa macOS.

**Tandaan:** Ang API na ito ay dapat tawagin pagkatapos ng `ready`na event ng `app` na modyul.

#### `Menu.getApplicationMenu()`

Returns `Menu` - The application menu, if set, or `null`, if not set.

**Tandaan:** Ang ibinalik na instance ng `Menu` ay hindi suportado ang dinamikong pagdadagdag o pagtatanggal ng mga aytem ng menu. [Ang mga instance na katangian ](#instance-properties) ay maaring baguhin sa dinamikong paraan.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` na String

Ipinapadala ang `aksyon` sa unang tagaresponde ng aplikasyon. Ito ay ginagamit para sa paggaya sa default na mga paggalaw ng macOS na menu. Kadalasan ginagamit mo lang ang katangiang [`role`](menu-item.md#roles) ng isang [`Menultem`](menu-item.md).

Tingnan ang [Gabay sa Paghahawak ng Kaganapang macOS Cocoa](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para sa karagdagang impormasyon sa mga natibong aksyon ng macOS.

#### `Menu.buildFromTemplate(template)`

* `template` na [MenuItemConstructorOptions]

Ibinabalik ang `Menu`

Sa pangkalahatan, ang `template` ay isang hanay lamang ng mga `pagpipilian` para sa paggawa ng isang [MenuItem](menu-item.md). Ang paggamit ay maaaring ibabatay sa itaas.

Mailalakip mo rin ang iba pang mga patlang sa mga elemento ng mga `template` at sila ay magiging mga katangian ng mga naggawang mga aytem ng menu.

### Mga Pamamaraan ng Instance

Ang `Menu` na bagay ay may sumusunod na mga pamamaraan ng instance:

#### `menu.popup([browserWindow, options])`

* `browserWindow` na BrowserWindow (opsyonal) - ang default ay ang pinagtutuunang window.
* `mga opsyon` Bagay (opsyonal) 
  * `x` na numero (opsyonal) - Ang default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ideklara kung ang `y` ay naideklara na.
  * `y` na numero (opsyonal) - ang default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ideklara kung `x` ay naideklara na.
  * `async` na Boolean (opsyonal) - Itinakda sa `true` upang maibalik agad ang pamamaraang ito kapag tinawag, `false` upang maibalik pagkatapos na ang menu ay mapili o maisara. Naka-default sa `false`.
  * `positioningItem` na numero (opsyonal) *macOS* - Ang index ng aytem ng menu na ipoposisyon sa ilalim ng cursor ng mouse sa tinukoy na mga coordinate. Ang default ay -1.

Pasulputin ang menu na ito bilang isang menu ng konteksto sa `browserWindow`.

#### `menu.closePopup([browserWindow])`

* `browserWindow` na BrowserWindow (opsyonal) - ay default ang pinagtutuunang window.

Isinasara ang konteksto ng menu sa `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem`MenuItem

Idinagdag ang `menuItem` sa menu.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` MenuItem

Inserts the `menuItem` to the `pos` position of the menu.

### Mga Katangian ng Instance

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

## Mga Halimbawa

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### Pangunahing proseso

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

### Prosesong Render

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

## Ang mga tala sa Menu ng Aplikasyon ng macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Mga Istandard na Menu

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### Mga Aytem na Aksyon ng Istandard na Menu

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Pangalan ng Pangunahing Menu

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Pagtatakda ang Menu para sa Tiyak na Browser Window ng (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Posisyon ng Item ng Menu

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### Mga Halimbawa

Template:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', posisyon: 'before=4'},
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