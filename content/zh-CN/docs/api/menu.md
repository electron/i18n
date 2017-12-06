## Class: Menu

> 创建原生菜单和环境菜单。

线程：[主线程](../glossary.md#main-process)

### `new Menu()`

创建新一个菜单

### 静态方法

menu类有以下静态方法：

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu

当在MacOS、Windows、Linux中使用`menu`设置程序菜单时，会设置在各个程序窗体的顶层。

在windows和Linux系统中，使用`null`参数将会移除菜单栏, 但在MacOS系统中则不会有任何效果；

注意：这个**API**调用要在程序的`ready`事件模块之后；

#### `Menu.getApplicationMenu()`

如果有设置, 则返回 ` Menu `-设置的应用程序菜单， 反之，则返回 ` null `。

** 注意: **返回的 ` menu ` 实例不支持动态添加或删除菜单项。 但仍然可以动态修改 [ 实例属性 ](#instance-properties)。

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

将 ` action ` 发送到应用程序的第一个响应方。 这用于模拟默认的 macOS 菜单行为。 通常, 您只用到 [` MenuItem `](menu-item.md) 的 [` role `](menu-item.md#roles) 属性。

有关 macOS 的本地操作的详细信息, 请参阅 [ macOS Cocoa Event Handling Guide ](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)。

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

Returns `Menu`

通常, ` template ` 只是 ` option ` 的一选项, 用于构造 [ MenuItem ](menu-item.md)。可以在上面引用该用法。

还可以将其他字段附加到 ` template ` 的元素中, 它们将成为构造的菜单项的属性。

### 实例方法

` menu ` 对象具有以下实例方法:

#### `menu.popup([browserWindow, options])`

* ` browserWindow `BrowserWindow (可选)-默认为焦点窗口。
* `options` Object (可选) 
  * ` x ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` y `, 则必须声明。
  * ` y ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` x `, 则必须声明。
  * `async` Boolean (optional) - Set to `true` to have this method return immediately called, `false` to return after the menu has been selected or closed. Defaults to `false`.
  * ` positioningItem `数字 (可选) * macOS *-要在指定坐标下的鼠标光标下定位的菜单项的索引。默认值为-1。

将此菜单作为 ` browserWindow ` 中的上下文菜单弹出。

#### `menu.closePopup([browserWindow])`

* ` browserWindow `BrowserWindow (可选)-默认为焦点窗口。

关闭 ` browserWindow ` 中的上下文菜单。

#### `menu.append(menuItem)`

* `menuItem` MenuItem

将 ` menuItem ` 追加到菜单。

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` MenuItem

将 ` menuItem ` 插入菜单的 ` pos ` 位置。

### 实例属性

` menu ` 对象还具有以下属性:

#### `menu.items`

包含菜单项的 ` MenuItem [] ` 数组。

每个 ` 菜单 ` 由多个 [` MenuItem `](menu-item.md) 组成, 每个 ` MenuItem `可以有子菜单。

## 实例

` Menu ` 仅在主进程中可用, 但您也可以通过 [` remote `](remote.md) 模块在渲染进程（render process）中使用它。

### Main process

使用简单模板 API 在主进程中创建应用程序菜单的示例:

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

下面是通过 [` remote `](remote.md) 模块在网页（render process）中动态创建右击菜单的示例:

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

## MacOS中应用菜单注意事项

MacOS中的应用程序有着和windows，linux完全不同风格的菜单样式。这里有一些说明，可以让你的程序菜单看起来更贴合原生系统。

### Standard Menus

在MacOS有一些系统自定的标准菜单，像`Services`和`Windows`。 让你的菜单更像MacOS标准菜单，只需设置菜单`role`为如下示之一，Electron便会自动认出并设置成标准菜单，：

* `window`
* `help`
* `services`

### Standard Menu Item Actions

macOS 已经为某些菜单项提供了标准操作, 如 ` about xxx `、` Hide xxx ` 和 ` Hide Others `。 若要将菜单项的操作设置为标准操作, 应设置菜单项的 `  role` 属性。

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

### 实例

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