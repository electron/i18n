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
  * `positioningItem` Number (opsyonal) *macOS* - Ang indise ng mga aytem ng menu upang maging nakaposisyon sa ilalim ng cursor ng mouse sa tinukoy na pagkakatugma. Ang default ay -1.

Pasulputin ang menu na ito bilang isang menu ng konteksto sa `browserWindow`.

#### `menu.closePopup([browserWindow])`

* `browserWindow` BrowserWindow (opsyonal) - default ang nakatuong window.

Isinasara ang konteksto ng menu sa `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` Ang MenuItem

Idinagdag ang `menuItem` sa menu.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem`MenuItem

Ipasok sa`menuItem`papunta sa posisyon ng`pos`ng menu.

### Katangian ng mga pag-aari

Ang mga bagay sa `menu` ay mayroon ding mga sumusunod na katangian:

#### `menu.items`

Ang hanay ng `MenuItem[]` na naglalaman ng mag aytem ng menu.

Bawat `Menu` ay binubuo ng maramihang [`MenuItem`](menu-item.md) at bawat `MenuItem` ay mayroong isang submenu.

## Mga halimbawa

Ang klase ng `Menu` ay magagamit lamang sa pangunahing proseso, ngunit maaari mo rin itong magamit sa prosesong tagabigay sa pamamagitan ng modyul ng [`remote`](remote.md).

### Pangunahing proseso

Isang halimbawa ng paglikha ng aplikasyon ng menu sa pangunahing proseso ay sa simpleng template ng API:

```javascript
const {app, Menu} = kailangan('electron')

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

kung (process.platform === 'darwin') {
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

  // I-edit ang menu
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

  // Menu ng window
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

### Prosesong tagabigay

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
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

## Ang mga tala sa Menu ng Aplikasyon sa macOS

ang macOS ay may kompletong naiibang istilo ng aplikasyon ng menu mula saWindows at Linux. Narito ang ilang mga tala kung paanong ang menu ng iyong app ay maging mas natural.

### Mga pamantayan ng Menu

Sa macOS ay maraming tukoy na sistema ng standard na menu, tulad ng `Services` at mga menu ng `Window`. Para gawin ang iyong menu na standard na menu, dapat mong i-set ang iyong menu sa `role` sa isa sa mga sumusunod at ang Electron ay makikilala sila at gagawin silang mga standard na menu:

* `ang window`
* `tulong`
* `mga serbisyo`

### Mga Aksyon ng Standard Menu

ang macOS ay nagbigay ng standard na mga aksyon para sa ilang mga item ng menu, katulad ng `About xxx`, `Hide xxx`, at ` Hide Others`. Para itakda ang aksyon ng isang item ng menu sa isang standard na aksyon, dapat mong itakda ang katangian ng `role` ng item ng menu.

### Pangalan ng Pangunahing Menu

Sa macOS ang tatak ng unang item ng aplikasyon ng menu ay laging ang pangalan ng iyong app, hindi mahalaga kung anong tatak ang iyong itakda. Para baguhin ito, baguhin ang bungkos ng file ng iyong app sa `info.plist`. Tingnan ang [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) para sa karagdagang impormasyon.

## Itinatakda ang Menu para sa Specific Browser Window ng (*Linux* *Windows*)

Ang [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) ng browser windows ay kayang itakda ang menu ng tiyak na browser windows.

## Posisyon ng Item ng Menu

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### Mga halimbawa

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