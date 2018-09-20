## Klase: Menu

> Lumikha ng natibong mga menu ng aplikasyon at mga menu ng konteksto.

Proseso:[Main](../glossary.md#main-process)

### `new Menu()`

Lumilikha ng isang bagong menu.

### Mga istatikong pamamaraan

Ang klaseng `menu` ay mayroong mga sumusunod na mga istatikong pamamaraan:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Nagtatakda ng `menu` bilang aplikasyon ng menu sa macOS. Sa Windows at Linux, ang `menu` ay itatakda sa ibabaw ng menu ng bawat window.

Ang pagpasa ng `null` ay magtatanggal ng menu bar sa Windows at sa Linux ngunit walang epekto sa macOS.

**Tandaan:** Ang API na ito ay dapat tawagin pagkatapos ng `ready`na event ng `app` na modyul.

#### `Menu.getApplicationMenu()`

Ibinabalik ang `Menu | null` - Ang menu ng aplikasyon, kapag naitakda, o `null` kapag hindi naitakda.

**Tandaan:** Ang ibinalik na instance ng `Menu` ay hindi suportado ang dinamikong pagdadagdag o pagtatanggal ng mga aytem ng menu. [Ang mga instance na katangian ](#instance-properties) ay maaring baguhin sa dinamikong paraan.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` na String

Ipinapadala ang `aksyon` sa unang tagaresponde ng aplikasyon. Ito ay ginagamit para sa paggaya sa default na mga paggalaw ng macOS na menu. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

Tingnan ang [Gabay sa Paghahawak ng Kaganapang macOS Cocoa](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para sa karagdagang impormasyon sa mga natibong aksyon ng macOS.

#### `Menu.buildFromTemplate(template)`

* `template` na [MenuItemConstructorOptions]

Ibinabalik ang `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

Mailalakip mo rin ang iba pang mga patlang sa mga elemento ng mga `template` at sila ay magiging mga katangian ng mga naggawang mga aytem ng menu.

### Mga Pamamaraan ng Instance

Ang `Menu` na bagay ay may sumusunod na mga pamamaraan ng instance:

#### `menu.popup(options)`

* `options` Bagay 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` na numero (opsyonal) - Ang default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ideklara kung ang `y` ay naideklara na.
  * `y` na numero (opsyonal) - ang default ay ang kasalukuyang posisyon ng cursor ng mouse. Dapat ideklara kung `x` ay naideklara na.
  * `positioningItem` na numero (opsyonal) *macOS* - Ang index ng aytem ng menu na ipoposisyon sa ilalim ng cursor ng mouse sa tinukoy na mga coordinate. Ang default ay -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Isinasara ang konteksto ng menu sa `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Idinagdag ang `menuItem` sa menu.

#### `menu.getMenuItemById(id)`

* `id` na String

Ibinabalik ang `MenuItem` ang aytem na may tiyak na `id`

#### `menu.insert(pos, menuItem)`

* `pos` na Integer
* `menuItem` [MenuItem](menu-item.md)

Ipinapasok ang `menuItem` sa posisyon ng`pos` ng menu.

### Halimbawa ng mga Event

Objects created with `new Menu` emit the following events:

**Tandaan:** Ang ilang mga kaganapan ay magagamit lamang sa partikular na mga operating system at na may label na.

#### Event: 'menu-will-show'

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Mga Katangian ng Instance

Ang mga bagay sa `menu` ay mayroon ding mga sumusunod na katangian:

#### `menu.items`

Ang hanay ng `MenuItem[]` na naglalaman ng mag aytem ng menu.

Bawat `Menu` ay binubuo ng maramihang [`MenuItem`](menu-item.md) at bawat `MenuItem` ay mayroong isang submenu.

### Halimbawa ng mga Event

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## Mga Halimbawa

Ang klase ng `Menu` ay magagamit lamang sa pangunahing proseso, ngunit maaari mo rin itong magamit sa prosesong tagabigay sa pamamagitan ng modyul ng [`remote`](remote.md).

### Pangunahing proseso

Isang halimbawa ng paglikha ng aplikasyon ng menu sa pangunahing proseso ay sa simpleng template ng API:

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

### Prosesong Render

Ang nasa ibaba ay isang halimbawa ng paglikha ng isang dinamikong menu sa isang pahina ng web (prosesong tagabigay) sa pamamagitan ng paggamit ng modyul ng [`remote`](remote.md), at ipinapakita ito kapag ang user ay nira-right click ang pahina:

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

## Ang mga tala sa Menu ng Aplikasyon ng macOS

ang macOS ay may kompletong naiibang istilo ng aplikasyon ng menu mula saWindows at Linux. Narito ang ilang mga tala kung paanong ang menu ng iyong app ay maging mas natural.

### Mga Istandard na Menu

Sa macOS ay maraming tukoy na sistema ng standard na menu, tulad ng `Services` at mga menu ng `Window`. Para gawin ang iyong menu na standard na menu, dapat mong i-set ang iyong menu sa `role` sa isa sa mga sumusunod at ang Electron ay makikilala sila at gagawin silang mga standard na menu:

* `ang window`
* `tulong`
* `mga serbisyo`

### Mga Aytem na Aksyon ng Istandard na Menu

ang macOS ay nagbigay ng standard na mga aksyon para sa ilang mga item ng menu, katulad ng `About xxx`, `Hide xxx`, at ` Hide Others`. Para itakda ang aksyon ng isang item ng menu sa isang standard na aksyon, dapat mong itakda ang katangian ng `role` ng item ng menu.

### Pangalan ng Pangunahing Menu

Sa macOS ang tatak ng unang item ng aplikasyon ng menu ay laging ang pangalan ng iyong app, hindi mahalaga kung anong tatak ang iyong itakda. Para baguhin ito, baguhin ang bungkos ng file ng iyong app sa `info.plist`. Tingnan ang [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) para sa karagdagang impormasyon.

## Pagtatakda ang Menu para sa Tiyak na Browser Window ng (*Linux* *Windows*)

Ang [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) ng browser windows ay kayang itakda ang menu ng tiyak na browser windows.

## Posisyon ng Item ng Menu

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### Halimbawa

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
<br />- 1
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
<br />- 3
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
<br />- ---
- 3
- 2
- 1
```