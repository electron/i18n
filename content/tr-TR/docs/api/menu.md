## Bölüm: Menü

> Yerel uygulama menüleri ve bağlam menüleri oluşturun.

Süreç: [Ana](../glossary.md#main-process)

### `yeni Menü()`

Yeni bir menü oluşturun.

### Statik Yöntemler

`Menü` sınıfı aşağıdaki statik yöntemlere sahiptir:

#### `Menü.ayarlaUygulamaMenü(menü)`

* `menü` Menü

MacOS'ta uygulama `menüsünü` ayarlar. Windows ve Linux'ta `menü`, her pencerenin üst menüsü olarak ayarlanır.

`Boş` geçilmesi, Windows ve Linux'ta menü çubuğunu kaldırır, ancak macOS üzerinde hiçbir etkisi yoktur.

**Not:** Bu API `uygulama` modülü `hazır` olduktan sonra çağrılmalıdır.

#### `Menü.alUygulamaMenüsü()`

`Menü` Döndürülür - Uygulama menüsü, ayarlanmışsa veya `boşsa`, ayarlanmamışsa.

**Not:** Döndürülen `Menu` örneği dinamik eklemeyi veya menü öğelerinin kaldırılmasını desteklemez. [Örnek özellikleri](#instance-properties) hala kullanılabilir dinamik olarak değiştirilebilir.

#### `Menü.gönderİlkYanıtlayıcıEylemi(eylem)`*macOS*

* `eylem` Dizisi

`Eylemi` ilk yanıtın sahibine gönderir. Bu, varsayılan macOS menü davranışlarını taklit etmek için kullanılır. Genellikle sadece [`MenüÖğesinin`](menu-item.md) [`rol`](menu-item.md#roles) özelliğini kullanırsınız.

MacOS'un yerel eylemleri hakkında daha fazla bilgi için macOS [Kakao İşleme Kılavuzu'na](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) bakın.

#### `Menü.yapılandırŞablondan(şablon)`

* `şablon` MenüÖğesiOluşturucuSeçenekleri[]

`Menüye` Dön

Genellikle `şablon` yalnızca bir [MenüÖğesi](menu-item.md) oluşturmak için bir dizi `seçenektir`. Kullanım, yukarıdaki referanslar olabilir.

Ayrıca, `şablonun` elementlerine başka alanlar da ekleyebilirsiniz ve bunlar oluşturulan menü öğelerinin özellikleri olacaktır.

### Örnek Yöntemleri

`Menü` nesnesi aşağıdaki örnek yöntemlerine sahiptir:

#### `menu.popup([tarayıcıPenceresi, seçenekler])`

* `tarayıcıPenceresi` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.
* `seçenekler` Hedef (isteğe bağlı) 
  * `x` Sayı (isteğe bağlı) - Varsayılan, geçerli fare imleci konumudur. Eğer `y` bildirilmişse, bildirilmelidir.
  * `y` Sayı (isteğe bağlı) Varsayılan geçerli fare imleci konumudur. Eğer `x` bildirilmişse, bildirilmelidir.
  * `async` Boolean (optional) - Set to `true` to have this method return immediately called, `false` to return after the menu has been selected or closed. Defaults to `false`.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.

Pops up this menu as a context menu in the `browserWindow`.

#### `menu.closePopup([browserWindow])`

* `tarayıcıPenceresi` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.

Closes the context menu in the `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` MenuItem

Appends the `menuItem` to the menu.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` MenuItem

Inserts the `menuItem` to the `pos` position of the menu.

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