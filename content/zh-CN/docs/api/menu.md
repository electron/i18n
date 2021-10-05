# Menu

## 菜单

> 创建原生应用菜单和上下文菜单。

进程：[主进程](../glossary.md#main-process)

### `new Menu()`

创建新菜单。

### 静态方法

`Menu`类有以下方法:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

在macOS上将 `menu`设置成应用内菜单 在windows和Linux上，`menu` 将会被设置成窗口顶部菜单

在Windows和Linux中，可以在菜单的顶层标签的某个字母前添加`&`以绑定快捷键。 例如，使用`&File`后可以使用`Alt-F`呼出File的子选项。 按钮标签中指定的字符会出现下划线， `&` 字符不会显示在按钮标签上。

要转义并在项名中显示 `&` 字符, 可以添加字符 `&`. 比如, `&&File` 将在按钮标签上出现 `&File`

传递 `null` 值可以禁用默认菜单。 在 Windows 和 Linux 上，使用此方法移除窗口上的菜单栏可能会有额外的效果。

**注释:**如果应用没有设置菜单的话，系统会生成一个默认菜单。 默认生成的菜单中包含了一些初始选项，例如 `文件`,`编辑`, `视图`,`窗口`,`帮助`。

#### `Menu.getApplicationMenu()`

返回 `Menu | null` - 如果有设置, 则返回应用程序菜单， 如果没设置，则返回 ` null `。

**注释:**返回的 `Menu`实例不支持动态添加或删除菜单项， 但仍然可以动态修改 [ 实例属性 ](#instance-properties)。

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

将 ` action ` 发送到应用程序的第一个响应方。 这用于模拟默认的 macOS 菜单行为。 通常你可以使用[`MenuItem`](menu-item.md#roles)的[`role`](menu-item.md)属性

有关 macOS 的本地操作的详细信息, 请参阅 [ macOS Cocoa Event Handling Guide ](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)。

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

返回 ` Menu `

一般来说， `template`是一个`options`类型的数组，用于构建[MenuItem](menu-item.md)。 使用方法可参考前文。

您还可以将其他字段附加到`template`，它们将成为菜单项的属性。

### 实例方法

` menu ` 对象具有以下实例方法:

#### `menu.popup([options])`

* `options` Object (可选)
  * `window` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.
  * `x` Number (可选) - 默认为当前鼠标的位置。 如果指定了`y`，则该选项必选。
  * `y` Number (可选) - 默认为当前鼠标的位置。 如果指定了`x`，则该选项必选。
  * `positioningItem` Number (可选) _macOS_ - 在指定鼠标光标下定位的菜单项的索引。 默认值为 -1。
  * `callback` Function (optional) - 会在菜单关闭后被调用.

弹出此菜单作为上下文菜单在 [`BrowserWindow`](browser-window.md)。

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.

关闭 ` browserWindow ` 中的上下文菜单。

#### `menu.append(menuItem)`

* `menuItem` [菜单项](menu-item.md)

将 ` menuItem ` 追加到菜单。

#### `menu.getMenuItemById(id)`

* `id` String

返回具有指定`id`项的`MenuItem | null`

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [菜单项](menu-item.md)

将 ` menuItem ` 插入菜单的 ` pos ` 位置。

### 实例事件

使用 `new Menu` 创建对象或通过 `Menu.buildFromTemplate`返回对象均会触发下列事件：

** 注意: **某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。

#### 事件: 'menu-will-show'

返回:

* `event` Event

调用`menu.popup()`事件时触发该事件。

#### 事件: 'menu-will-close'

返回:

* `event` Event

手动关闭弹出，或使用 `menu.closePopup()`方法关闭弹出时，触发该事件。

### 实例属性

` menu ` 对象还具有以下属性:

#### `menu.items`

包含菜单项的 ` MenuItem [] ` 数组。

每个 ` 菜单 ` 由多个 [` MenuItem `](menu-item.md)  组成, 每个 ` MenuItem `可以有子菜单。

## 示例

使用简单模板API创建 application menu 的示例代码：

```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
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
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
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
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
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

### 渲染进程

要创建由渲染器启动的菜单，请通过 IPC 发送所需的信息到主过程，并让主过程代替渲染器显示菜单。

以下是用户右键单击页面时显示菜单的示例：

```js
// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
  // ...
})

// main
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'Menu Item 1',
      click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
```

## MacOS中应用菜单注意事项

macOS 相比于 Windows 和 Linux 有着完全不同的应用程序菜单。 以下是一些有关使应用菜单更像原生应用菜单的注意事项。

### 标准菜单

MacOS有一些系统预定义的菜单，像是[`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) and `Windows`。 让你的菜单更像MacOS标准菜单，只需设置菜单`role`值为如下示之一，Electron便会自动认出并设置成标准菜单，：

* `window`
* `help`
* `services`

### 标准菜单项操作

macOS 已经为某些菜单项提供了标准操作, 如 ` about xxx `、` Hide xxx ` 和 ` Hide Others `。 若要将菜单项的操作设置为标准操作, 应设置菜单项的 `  role` 属性。

### 主菜单的名称

在 macOS 中应用程序菜单的第一个项目的标签总是你的应用程序的名字, 无论你设置什么标签。 如要更改它, 请修改应用程序包的 ` Info. plist ` 文件。 详情参阅：[About Information Property List Files][AboutInformationPropertyListFiles]

## 设置特定浏览器窗口的菜单 (* Linux * * Windows *)

浏览器窗口的 [ ` setMenu ` 方法 ][setMenu] 可以设置特定浏览器窗口的菜单。

## 菜单项位置

你可以使用 `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` 和 `id` 来控制由 `Menu.buildFromTemplate` 生成的菜单项的位置.

* `before` - 在指定的标签之前插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
* `after` - 在指定的标签之后插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
* `beforeGroupContaining` - 为单个上下文菜单提供一种方法，用于在具有指定标签项的包含组之前声明其包含组的位置
* `afterGroupContaining` - 为单个上下文菜单提供一种方法，用于在具有指定标签项的包含组之后声明其包含组的位置

默认情况下，除非有位置相关的属性，所有的菜单项会按照模板中的顺序排放。

### 示例

模板：

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

菜单:

```sh
- 1
- 2
- 3
- 4
```

模板：

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

菜单:

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

模板：

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

菜单:

```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: browser-window.md#winsetmenumenu-linux-windows
