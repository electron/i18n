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

Ipinapadala ang `aksyon` sa unang tagaresponde ng aplikasyon. Ito ay ginagamit para sa paggaya sa default na mga paggalaw ng macOS na menu. Kadalasan ginagamit mo lang ang katangiang [`role`](menu-item.md#roles) ng isang [`Menultem`](menu-item.md).

Tingnan ang [Gabay sa Paghahawak ng Kaganapang macOS Cocoa](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para sa karagdagang impormasyon sa mga natibong aksyon ng macOS.

#### `Menu.buildFromTemplate(template)`

* `template` na [MenuItemConstructorOptions]

Ibinabalik ang `Menu`

Sa pangkalahatan, ang `template` ay isang hanay lamang ng mga `pagpipilian` para sa paggawa ng isang [MenuItem](menu-item.md). Ang paggamit ay maaaring ibabatay sa itaas.

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

**Note:** Ang ilang mga event ay magagamit lamang sapartikular na mga operating system at ay tinatakan tulad nito.

#### Event: 'menu-will-show'

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Katangian ng pagkakataon

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

Maaari kang gumamit ng `position` at `id` para makontrol kung paano ilalagay ang mga item kapag bumubuo ng isang menu sa pamamagitan ng `Menu.buildFromTemplate`.

Ang katangian ng `position` ng `MenuItem` ay may anyo na `[placement]=[id]`, kung saan `placement` ay isa sa `before`, `after`, o `endof` at `id` ay ang natatanging ID ng isang umiiral na item sa menu:

* `before` - Isisingit ang item na ito bago ang id ng isinangguning item. Kung ang isinangguning item ay hindi umiiral ang item ay ilalagay sa hulihan ng menu.
* `after` - Isisingit ang item na ito pagkatapos ng id ng isinangguning item, Kung ang isinangguning item ay hindi umiiral ang item ay ilalagay sa hulihan ng menu.
* `endof` - Isisingit ang item na ito sa hulihan ng lohikal na grupo na naglalaman ng id ng isinangguning item (ang mga grupo ay ginawa nang taga-hiwalay ng mga item). Kung ang isinangguning aytem ay hindi umiiral, isang bagong grupo ng taga-hiwalay ay lilikhain kasama ang ibinigay na id at ang aytem na ito ay ilalagay pagkatapos nang taga-hiwalay.

Kapag ang aytem ay naka-posisyon na, lahat ng hindi naka-posisyon na mga aytem ay ilalagay pagkatapos nito hanggang ang isang bagong aytem ay nai-posisyon na. Kaya kung gusto mong i-posisyon ang isang grupo ng mga aytem ng menu sa kaparehas na lokasyon kailangan mo lang tukuyin ang posisyon para sa unang aytem.

### Mga Halimbawa

Ang Template:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', posisyon: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

Ang Menu:

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

Ang Template:

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

Ang Menu:

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