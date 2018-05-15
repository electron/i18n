## 菜单

> 创建原生应用菜单和上下文菜单。

进程：[主进程](../glossary.md#main-process)

### `new Menu()`

创建新菜单。

### 静态方法

menu类有以下静态方法：

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

当在MacOS、Windows、Linux中使用`menu`设置程序菜单时，会设置在各个程序窗体的顶层。

在windows和Linux系统中，使用`null`参数将会移除菜单栏, 但在MacOS系统中则不会有任何效果；

注意：这个**API**调用要在程序的`ready`事件模块之后；

#### `Menu.getApplicationMenu()`

返回 `Menu | null` - 如果有设置, 则返回应用程序菜单， 如果没设置，则返回 ` null `。

** 注意: **返回的 ` menu ` 实例不支持动态添加或删除菜单项。 但仍然可以动态修改 [ 实例属性 ](#instance-properties)。

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

将 ` action ` 发送到应用程序的第一个响应方。 这用于模拟默认的 macOS 菜单行为。 通常, 您只用到 [` MenuItem `](menu-item.md) 的 [` role `](menu-item.md#roles) 属性。

有关 macOS 的本地操作的详细信息, 请参阅 [ macOS Cocoa Event Handling Guide ](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)。

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

返回 ` Menu `

通常, ` template ` 只是 ` option ` 的一选项, 用于构造 [ MenuItem ](menu-item.md)。可以在上面引用该用法。

还可以将其他字段附加到 ` template ` 的元素中, 它们将成为构造的菜单项的属性。

### 实例方法

` menu ` 对象具有以下实例方法:

#### `menu.popup(options)`

* `选项` Object 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * ` x ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` y `, 则必须声明。
  * ` y ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` x `, 则必须声明。
  * ` positioningItem `数字 (可选) * macOS *-要在指定坐标下的鼠标光标下定位的菜单项的索引。默认值为-1。
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

关闭 ` browserWindow ` 中的上下文菜单。

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

将 ` menuItem ` 追加到菜单。

#### `menu.getMenuItemById(id)`

* `id` String

返回具有指定`id`项的`MenuItem`

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

将 ` menuItem ` 插入菜单的 ` pos ` 位置。

### 实例事件

Objects created with `new Menu` emit the following events:

** 注意: **某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。

#### Event: 'menu-will-show'

返回:

* `event` Event

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

返回:

* `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### 实例属性

` menu ` 对象还具有以下属性:

#### `menu.items`

包含菜单项的 ` MenuItem [] ` 数组。

每个 ` 菜单 ` 由多个 [` MenuItem `](menu-item.md) 组成, 每个 ` MenuItem `可以有子菜单。

### 实例事件

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## 示例

` Menu ` 仅在主进程（ main process）中可用, 但您也可以在渲染进程（render process）中通过 [` remote `](remote.md) 模块使用它。

### Main process

在主进程中创建程序菜单的简单API模版示例:

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

### 渲染进程

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
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## MacOS中应用菜单注意事项

MacOS中的应用程序有着和windows，linux完全不同风格的菜单样式。这里有一些说明，可以让你的程序菜单看起来更贴合原生系统。

### 标准菜单

在MacOS有一些系统自定的标准菜单，像`Services`和`Windows`。 让你的菜单更像MacOS标准菜单，只需设置菜单`role`值为如下示之一，Electron便会自动认出并设置成标准菜单，：

* `window`
* `help`
* `services`

### 标准菜单项操作

macOS 已经为某些菜单项提供了标准操作, 如 ` about xxx `、` Hide xxx ` 和 ` Hide Others `。 若要将菜单项的操作设置为标准操作, 应设置菜单项的 `  role` 属性。

### 主菜单的名称

在 macOS 中应用程序菜单的第一个项目的标签总是你的应用程序的名字, 无论你设置什么标签。 如要更改它, 请修改应用程序包的 ` Info. plist ` 文件。 有关详细信息, 请参阅 [ About Information Property List Files ](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html)。

## 设置特定浏览器窗口的菜单 (* Linux * * Windows *)

浏览器窗口的 [ ` setMenu ` 方法 ](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) 可以设置特定浏览器窗口的菜单。

## 菜单项位置

您在使用`Menu.buildFromTemplate  `生成菜单时，可以用` position ` 和 ` id ` 来控制定位菜单项的位置。

`MenuItem`中的`[placement]=[id]`属性，其中` placement`值可以是` before`、`after`、和 `endof`之一，`id`值则是现有菜单项的唯一ID

* ` before `-在匹配的菜单项id 之前插入此项。如果匹配的项不存在, 则将在菜单的末尾插入该项。
* ` after `-在匹配菜单项id 之后插入此项。如果匹配的项不存在, 则将在菜单的末尾插入该项。
* ` endof `-在匹配的菜单项id 的逻辑组的末尾插入此项 (由分隔符项创建组)。 如果匹配的项不存在, 则使用给定 id 创建新的分隔符组, 并在该分隔符之后插入此项。

当在菜单项中有一项有位置信息, 其后面所有未定位的项将紧跟其后, 直到后面出现新的菜单项有的位置。 因此, 如果要在同一位置放置一组菜单项, 则只需指定第一项的位置信息。

### 示例

模板：

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

菜单:

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

模板：

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

菜单:

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