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

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

Ibinabalik ang `Menu | null` - Ang menu ng aplikasyon, kapag naitakda, o `null` kapag hindi naitakda.

**Tandaan:** Ang ibinalik na instance ng `Menu` ay hindi suportado ang dinamikong pagdadagdag o pagtatanggal ng mga aytem ng menu. [Ang mga instance na katangian ](#instance-properties) ay maaring baguhin sa dinamikong paraan.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` na String

Ipinapadala ang `aksyon` sa unang tagaresponde ng aplikasyon. Ito ay ginagamit para sa paggaya sa default na mga paggalaw ng macOS na menu. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

Tingnan ang [Gabay sa Paghahawak ng Kaganapang macOS Cocoa](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para sa karagdagang impormasyon sa mga natibong aksyon ng macOS.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Ibinabalik ang `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### Mga Pamamaraan ng Instance

Ang `Menu` na bagay ay may sumusunod na mga pamamaraan ng instance:

#### `menu.popup(options)`

* `mga opsyon` Na Bagay (opsyonal) 
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

Ipasok sa`menuItem`papunta sa posisyon ng`pos`ng menu.

### Halimbawa ng Mga Kaganapan

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

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

## Mga Halimbawa

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### Main process

An example of creating the application menu in the main process with the simple template API:

```javascript
const { app, Menu } = require('electron')

const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
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

### Render process

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

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

## Ang mga tala sa Menu ng Aplikasyon ng macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Standard Menus

On macOS there are many system-defined standard menus, like the [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `ang window`
* `tulong`
* `mga serbisyo`

### Standard Menu Item Actions

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Main Menu's Name

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Pagtatakda ang Menu para sa Tiyak na Browser Window ng (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Posisyon ng Item ng Menu

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### Mga Halimbawa

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