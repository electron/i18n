## Bölüm: Menü

> Yerel uygulama menüleri ve bağlam menüleri oluşturun.

İşlem: [Ana](../glossary.md#main-process)

### `yeni Menü()`

Yeni bir menü oluşturun.

### Statik Metodlar

`menu` sınıfı aşağıdaki statik yöntemlere sahiptir:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menü | boş

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

Döner `Menu | null` - Uygulama menüsü, ayarlanmışsa veya `null` ayarlanmamışsa.

**Note:** Döndürülen `Menu` örneği dinamik eklemeyi veya menü öğelerinin kaldırılmasını desteklemez. [Instance properties](#instance-properties) hala kullanılabilir dinamik olarak değiştirilebilir.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` Dizisi

`action` ilk yanıtın sahibine gönderir. Bu, varsayılan macOS menü davranışlarını taklit etmek için kullanılır. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

MacOS'un yerel eylemleri hakkında daha fazla bilgi için macOS [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) bakın.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

`Menu` 'ye Dön

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### Örnek Metodlar

`menu` nesnesi aşağıdaki örnek yöntemlerine sahiptir:

#### `menu.popup(options)`

* `options` Object (optional)
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Bu menüyü [` BrowserWindow `](browser-window.md) 'de bir içerik menüsü olarak açar.

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

`browserWindow` 'nde bağlam menüsünü kapatır.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Menüye `menuItem` ekler.

#### `menu.getMenuItemById(id)`

* `kimlik` dizesi

Belirtilen `MenuItem`'ye sahip öğeyi `id` döndürür

#### `menu.insert(pos, menuItem)`

* `pos` Tamsayı
* `menuItem` [MenuItem](menu-item.md)

`menuItem` 'ı menünün `pos` konumuna yerleştirir.

### Örnek Events

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Event: 'menu-will-show'

Dönüşler:

* `event` Olay

` menu.popup () ` çağrıldığında verilir.

#### Event: 'menu-will-close'

Dönüşler:

* `event` Olay

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Örnek Özellikleri

`menu` nesneleri aşağıdaki özelliklere de sahiptir:

#### `menu.items`

`MenuItem[]` Menünün Öğelerini içeren bir dizidir.

Her `Menu` birden fazla [`MenuItem`](menu-item.md) den oluşur ve her `MenuItem` bir alt menüye sahip olabilir.

## Örnekler

`Menu` sınıfı yalnızca ana işlemde kullanılabilir, ancak [`remote`](remote.md) modül vasıtasıyla oluşturma işleminde de kullanabilirsiniz.

### Ana süreç

Ana süreçte uygulama menüsünü basit şablon API'si ile oluşturmak için bir örnek:

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

### İşleme süreci

Aşağıda, [`remote`](remote.md) modülü kullanarak bir web sayfasında (işleme süreci) dinamik olarak bir menü oluşturmak ve kullanıcı sayfayı sağ tıklattığında oluşturmak için bir örnek görünmektedir:

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

## MacOS Uygulama Menüleri Hakkında Notlar

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Standart Menüler

On macOS there are many system-defined standard menus, like the [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) and `Windows` menus. Menünüzü standart bir menü yapmak için menünüzün `role` aşağıdakilerden birine ayarlamanız gerekir ve Electron bunları tanır ve onları standart menüler haline getirir:

* `pencere`
* `yardım`
* `hizmetler`

### Standart Menü Öğesi İşlemleri

macOS, `About xxx`, `Hide xxx` ve `Hide Others` gibi bazı menü öğeleri için standart eylemler önermiştir. Bir menü öğesinin eylemini standart bir eylem olarak ayarlamak için, menü öğesinin `role` özniteliğini ayarlamanız gerekir.

### Ana Menünün Adı

MacOS'da hangi etiketi ayarlarsanız ayarlayın uygulama menüsünün ilk öğesinin etiketi daima uygulamanızın adıdır. Bunu değiştirmek için uygulama paketinin `Info.plist` dosyasını geliştirin. Daha fazla bilgi için [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) bakın.

## Belirli Tarayıcı Penceresi için Menü Ayarlama (*Linux* *Windows*)

Tarayıcı pencerelerinin [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows), belirli tarayıcı pencerelerinin menüsünü ayarlayabilir.

## Menü Öğesi Konumu

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### Örnekler

Şablonlar:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menü:

```sh
- 1
- 2
- 3
- 4
```

Şablonlar:

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

Menü:

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

Şablonlar:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menü:

```sh
- ---
- 3
- 2
- 1
```
