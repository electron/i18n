## Class: Menu

> Создает меню приложения и контекстное меню.

Process: [Main](../glossary.md#main-process)

### `new Menu()`

Создает новое меню.

### Статические методы

Класс `menu` имеет следующие статические методы:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Задает `menu` в качестве меню приложения в macOS. В Windows и Linux `menu` будет задан как верхнее меню для каждого окна.

Передача `null` удалит строку меню на Windows и Linux, но ничего не сделает на на macOS.

**Примечание:** Этот метод должен вызываться только после события `ready` модуля `app`.

#### `Menu.getApplicationMenu()`

Возвращает `Menu | null` - меню приложения, если значение задано, в противном случае `null`.

**Примечание:** Возвращенный экземпляр `Menu` не поддерживает динамическое добавление или удаление пунктов меню. [Параметры экземпляра](#instance-properties) все ещё могут быть динамически изменены.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Посылает `action` первому ответчику приложения. Это используется для эмуляции поведения меню macOS. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

Для дополнительной информации по нативным действиям в macOS смотрите [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7).

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

Возвращает `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### Методы экземпляра

Объект `меню` имеет следующие методы экземпляра:

#### `menu.popup(options)`

* `options` Object 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Закрывает контекстное меню в `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Appends the `menuItem` to the menu.

#### `menu.getMenuItemById(id)`

* `id` String

Returns `MenuItem` the item with the specified `id`

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Inserts the `menuItem` to the `pos` position of the menu.

### События экземпляра

Objects created with `new Menu` emit the following events:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Event: 'menu-will-show'

Возвращает:

* `event` Event

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Возвращает:

* `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Свойства экземпляра

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

### События экземпляра

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## Примеры

Класс `Menu` доступен только в главном процессе, но вы также можете использовать его в рендер-процессе через модуль [`remote`](remote.md).

### Главный процесс

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
      {role: 'services'},
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
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## Замечания о меню приложения в macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Стандартные меню

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### Standard Menu Item Actions

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Имя главного меню

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Позиция элемента меню

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### Примеры

Шаблон:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Меню:

```sh
<br />- 1
- 2
- 3
- 4
```

Шаблон:

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

Меню:

```sh
<br />- 3
- 4
- ---
- 1
- ---
- 2
```

Шаблон:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Меню:

```sh
<br />- ---
- 3
- 2
- 1
```